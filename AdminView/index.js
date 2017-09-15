var constants = require("./constants.js");
var crypto = require("crypto");

var bodyParser = require("body-parser");
const uuidv4 = require('uuid/v4');
const moment = require('moment');
var csv = require('csv');

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require("mongodb").ObjectID;
const nodemailer = require('nodemailer');

var passport = require("passport");
OutlookStrategy = require('passport-outlook').Strategy;

var sessionRedirect = function (req, res, next) {
    if (!req.session.user && req.originalUrl !== "/favicon.ico") {
        req.session.redirectTo = req.originalUrl;
        return res.redirect("/login");
    }
    return next();
};

var transporter = nodemailer.createTransport({
    host: constants.smtp.host,
    secure: true,
    requireTLS: true,
    auth: {
        user: constants.smtp.username,
        pass: constants.smtp.password
    }
});

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


function AdminView(socketController, expressApp) {
    this.ios = socketController;
    this.app = expressApp;

    // switch to redis at some point to prevent memory leaks
    this.controllers = {};
    this.ios.tracking = {};
    this.oauthTokens = {};

    this.app.use(bodyParser.json());


    passport.use(new OutlookStrategy({
            clientID: constants.oauth.appId,
            clientSecret: constants.oauth.secret,
            callbackURL: 'https://127.0.0.1:8080/api/admin/auth/outlook/callback'
        },
        function(accessToken, refreshToken, profile, done) {
            var user = {
                outlookId: profile.id,
                name: profile.DisplayName,
                email: profile.EmailAddress,
                accessToken:  accessToken
            };
            if (refreshToken)
                user.refreshToken = refreshToken;
            if (profile.MailboxGuid)
                user.mailboxGuid = profile.MailboxGuid;
            if (profile.Alias)
                user.alias = profile.Alias;
            done(err, user);
        }
    ));

    this.app.use(passport.initialize());
    this.app.use(passport.session());


    this.setupRoute();
    this.setupApi();
    this.setupSocket();
}

AdminView.prototype.setupRoute = function () {
    this.app.get("/admin/:view", sessionRedirect, function (req, res, next) {
        if (constants.views.indexOf(req.params.view) !== -1)
            return res.sendfile(constants.adminIndexPath);
        else return next();
    });


};

var Student = function (student) {
    this.utorid = student.utorid;
    this.email = student.email;
};

var ChatSetting = function (settings) {
    if (!settings) {
        this.roomName = null;
        this.invite = false;
    }
    else {
        this.roomName = settings.roomName;
        this.invite = settings.invite;
    }

};

// var user = new User({username: "test", password: "test"});
// var settings = {
//     user: user.username,
//     chat: new ChatSetting()
// };
//
// MongoClient.connect(constants.dbUrl, function (err, db) {
//         db.collection("users").insertOne(user, function (err2, newUser) {
//             db.close();
//         });
// });
//
//     MongoClient.connect(constants.dbUrl, function (err, db) {
//         db.collection("settings").insertOne(settings, function (err2, newUser) {
//             db.close();
//         });
//     });

AdminView.prototype.setupApi = function () {
    this.app.get('/admin/auth/outlook',
        passport.authenticate('windowslive', {
            scope: [
                'https://outlook.office.com/Mail.Send'
            ]
        }),
        function(req, res){
            // The request will be redirected to Outlook for authentication, so
            // this function will not be called.
        }
    );

    this.app.get('/api/admin/auth/outlook/callback',
        passport.authenticate('windowslive'),
        function(req, res) {
            res.redirect('/');
        });

    this.app.post("/v1/api/login", function (req, res) {
        MongoClient.connect(constants.dbUrl, function (err, db) {
            db.collection("users").findOne({username: req.body.username}, function (err, user) {
                if (err) return res.status(500).end("Server error, could not resolve request");
                    db.collection("settings").findOne({user: user.username}, function (err, settings) {
                        if (err) return res.status(500).end("Server error, could not resolve request");
                        if (!user || !checkPassword(user, req.body.password)) return res.status(403).json({
                            message: "Invalid username or password",
                            status: 403
                        });

                        req.session.user = user;
                        req.session.userAvatar = user.userAvatar ? user.userAvatar : "avatar1.jpg";
                        req.session.username = user.username;
                        req.session.settings = settings ? settings : {};


                        if (req.body.token) {
                            var info = this.oauthTokens[req.body.token];
                            if (info) {
                                req.session.redirectTo = "/#/v1/"+info.roomName;
                                req.session.isInstructor = true;
                                delete this.oauthTokens[req.body.token];
                            }
                        }

                        res.json({username: user.username, redirect: req.session.redirectTo});
                        delete req.session.redirectTo;

                    }.bind(this));
            }.bind(this));
        }.bind(this));
    }.bind(this));

    this.app.get("/v1/api/session/current", function (req, res) {
        return res.json({username: req.session.user ? req.session.user.username : null, connected: req.session.connected});
    });

    this.app.get("/logout", function (req, res) {
        req.session.destroy(function (err) {
            if (err) return res.status(err.code).end(err);

            return res.redirect("/");

        });
    });

    function generateURLs(list) {
        var urls = {};
        list.forEach(function (item, i) {
            var rand = uuidv4();
            urls[rand] = item;
        });
        return urls;
    }

    var checkAuth = function (req, res, next) {
        var denied = {code: 401, message: "You do not have access to this resource"};
        if (!req.session.user) return res.status(401).json(denied);
        else return next();
    };

    this.app.get("/v1/api/admin/sendEmail", checkAuth, function(req, res) {
        MongoClient.connect(constants.dbUrl, function (err, db) {
            db.collection("settings").findOne({user: req.session.user.username}, function (err, settings) {
                db.collection("students").findOne({owner: req.session.user.username}, function (err, list) {
                    var urls = generateURLs(list.students);
                    console.log(urls);
                    this.ios.tracking[settings.chat.roomName] = {trackingIds: urls};

                            Promise.all(Object.keys(urls).map(function (id) {
                                return new Promise(function (resolve, rej) {
                                    var mailOptions = {
                                        from: '"Test" <'+constants.smtp.username+'>', // sender address
                                        to: urls[id].email, // list of receivers
                                        subject: 'test', // Subject line
                                        text: "test confirmation: http://127.0.0.1:8080/#/v1/"+settings.chat.roomName+"?trackId=" + id // plain text body
                                    };
                                    transporter.sendMail(mailOptions, function (err, info) {
                                        if (err) return rej(err);
                                        resolve(info);
                                    });
                                });

                            })).then(function (details) {
                                res.json({success: true, details: details});
                            }).catch(function (err) {
                                res.status(500).json({});
                            });



                }.bind(this));
            }.bind(this));

        }.bind(this));
    }.bind(this));

    this.app.get("/v1/api/room/:roomName/track/:code", function (req, res) {
        if (!this.ios.tracking[req.params.roomName]) return res.status(404).json({status: 404, message: "Requested registration id cannot be found."});
        else if (!this.ios.tracking[req.params.roomName].trackingIds) return res.status(404).json({status: 404, message: "Requested registration id cannot be found."});
        var resp = this.ios.tracking[req.params.roomName].trackingIds[req.params.code];
        if (!resp) return res.status(404).json({status: 404, message: "Requested registration id cannot be found."});
        res.json(resp);
    }.bind(this));

    this.app.get("/v1/api/chat/start", checkAuth, function (req, res) {
        MongoClient.connect(constants.dbUrl, function (err, db) {
            db.collection("settings").findOne({user: req.session.user.username}, function (err, settings) {
                if (!settings || !settings.chat || !settings.chat.roomName) return res.status(400).json({status: 400, message: "Invalid chat room settings."});
                //req.session.user.roomName = settings.chat.roomName;
                req.session.username = req.session.user.username;
                req.session.settings = settings;
                req.session.connected = true;
                req.session.isInstructor = false;
                req.session.isAdmin = true;
                res.json({connected: true});
            });
        });
    }.bind(this));

    this.app.get("/v1/api/students", checkAuth, function (req, res) {
        MongoClient.connect(constants.dbUrl, function (err, db) {
            db.collection("students").findOne({owner: req.session.user.username}, function (err, list) {
                if (!list) return res.json([]);
                res.json(list.students);
                db.close();
            });

        });
    });

    this.app.patch("/v1/api/students", checkAuth, function (req, res) {
        var student = new Student(req.body);

        MongoClient.connect(constants.dbUrl, function (err, db) {
            db.collection("students").update({owner: req.session.user.username}, {$push: {students: student}}, {upsert: true}, function (err, list) {
                res.json({});
                db.close();
            });

        });
    });

    this.app.put("/v1/api/students", checkAuth, function (req, res) {
        csv.parse(Buffer.from(req.body.csv, "base64"), {columns: true}, function(err, data) {
            MongoClient.connect(constants.dbUrl, function (err, db) {


                        db.collection("students").updateOne({owner: req.session.user.username}, {
                            $set: {students: data}
                        }, {upsert: true}, function (err, result) {
                            res.json(data);
                            db.close();
                        });

                });


        });
    });

    this.app.get("/v1/api/settings/:type", checkAuth, function (req, res) {
        MongoClient.connect(constants.dbUrl, function (err, db) {
            db.collection("settings").findOne({user: req.session.user.username}, function (err, settings) {
                if (!settings) return res.json({});
                res.json(settings[req.params.type]);
            });
        });

    });

    this.app.post("/v1/api/settings/:type", checkAuth, function (req, res) {
        MongoClient.connect(constants.dbUrl, function (err, db) {

                try {
                    switch (req.params.type) {
                        case "chat":
                            var newSettings = new ChatSetting(req.body.settings);
                            db.collection("settings").updateOne({user: req.session.user.username}, {$set: {chat: newSettings}}, {upsert: true}, function (err, result) {
                                if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
                                req.session.settings.chat = newSettings;

                                res.json(newSettings);

                            });
                            break;
                        default:
                            return res.status(404).json({status: 404, message: "No such settings"});
                    }
                } catch (e) {
                    return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
                }

            });

    });
};

AdminView.prototype.setupSocket = function () {
    var findRoom = function(roomId) {
        return this.ios.sockets.adapter.rooms[roomId];
    }.bind(this);

    this.ios.on('connection', function(socket){

        function setSessionVar(variable, value) {
            socket.handshake.session[variable] = value;
            socket.handshake.session.save();
        }

        function setSessionVars(object) {
            for (var variable in object) {
                socket.handshake.session[variable] = object[variable];
            }
            socket.handshake.session.save();
        }

        socket.on('send-message', function(data, callback) {
            var room = findRoom(socket.handshake.session.connectedRoom);
            data.type = "chat";
            if (socket.handshake.session.username && room.admin) {
                if (socket.handshake.session.utorid) data.utorid = socket.handshake.session.utorid;
                MongoClient.connect(constants.dbUrl, function (err, db) {
                    db.collection("chatHistory").updateOne({sessionId: room.sessionId, owner: room.admin.handshake.session.username, roomName: socket.handshake.session.connectedRoom}, {$push: {messages: data}}, {upsert: true}, function (err, result) {

                    });
                });

            }
        });

        socket.on("logout", function () {
            var room = findRoom(socket.handshake.session.connectedRoom);
            if (!room) return;
            room.admin = null;
            var session = socket.handshake.session;
            if (this.controllers[session.id])
                this.controllers[session.id].emit("stop_controller");
        }.bind(this));

        socket.on("instructor_login", function (data, callback) {
            var session = socket.handshake.session;
            // if (!session.user) return socket.disconnect();
            // setSessionVars({isInstructor: true, username: session.user.username});
            if (session.user) {
                setSessionVars({isInstructor: true, username: session.user.username, isAdmin: false});
                callback({});
            } else {
                var token = uuidv4();
                this.oauthTokens[token] = {roomName: data.roomName};
                callback({token: token});
            }

        }.bind(this));

        socket.on("admin_get_status", function (data, callback) {

            socket.handshake.session.reload(function (err) {
                if (err) return callback();
                if (socket.handshake.session.isAdmin) {
                    var session = socket.handshake.session;
                    this.controllers[session.id] = socket;
                    if (!this.ios.sockets.adapter.rooms[session.settings.chat.roomName]) return callback({status: "Offline", online: 0});
                    callback({online: this.ios.sockets.adapter.rooms[session.settings.chat.roomName].length, status: "Online"})
                } else callback({});
            }.bind(this));

        }.bind(this));
    }.bind(this));
};

var checkPassword = function (user, password) {
    var hash = crypto.createHmac('sha512', user.salt);
    hash.update(password);
    var value = hash.digest('base64');
    return (user.saltedHash === value);
};

module.exports = AdminView;