var constants = require("./constants.js");
var crypto = require("crypto");

var bodyParser = require("body-parser");
const uuidv4 = require('uuid/v4');
const moment = require('moment');
var csv = require('csv');

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require("mongodb").ObjectID;
const nodemailer = require('nodemailer');
var request = require('request');
var outlook = require("node-outlook");

outlook.base.setApiEndpoint("https://outlook.office.com/api/v2.0");

//TODO: More rror handling both on frontend and backend

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

function AdminView(socketController, expressApp) {
    this.ios = socketController;
    this.app = expressApp;

    // TODO:
    // switch to redis at some point to prevent memory leaks
    this.controllers = {};
    this.ios.tracking = {};
    this.callbacks = {};
	this.oauthTokens = {};

    this.app.use(bodyParser.json());

    this.setupRoute();
    this.setupApi();
    this.setupSocket();
}

AdminView.prototype.setupRoute = function () {
    this.app.get("/admin/:view", sessionRedirect, function (req, res, next) {

        return res.sendfile(constants.adminIndexPath);
    });

    this.app.get("/admin", sessionRedirect, function (req, res, next) {
        res.sendfile(constants.adminIndexPath);
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

AdminView.prototype.setupApi = function () {


    this.app.post("/v1/api/login", function (req, res) {
        MongoClient.connect(constants.dbUrl, function (err, db) {
            if (err) return res.status(500).end("Server error, could not resolve request");
            db.collection("users").findOne({username: req.body.username}, function (err, user) {


                    if (err) return res.status(500).end("Server error, could not resolve request");
                    if (!user || !checkPassword(user, req.body.password)) return res.status(403).json({
                        message: "Invalid username or password",
                        status: 403
                    });
                db.collection("settings").findOne({user: user.username}, function (err, settings) {
                    if (err) return res.status(500).end("Server error, could not resolve request");
                    req.session.user = user;
                    req.session.userAvatar = user.userAvatar ? user.userAvatar : "avatar1.jpg";
                    req.session.username = user.username;
                    req.session.settings = settings ? settings : {};


                    if (req.body.token) {
                        var info = this.oauthTokens[req.body.token];
                        if (info) {
                            req.session.redirectTo = "/#/v1/" + info.roomName;
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
        var token;
        if (req.session.user && req.session.user.outlook) {
            token = req.session.user.outlook["access_token"];
        }
        return res.json({
            username: req.session.user ? req.session.user.username : null,
            connected: req.session.connected,
            oauth: token
        });
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

    // TODO: Potentially spoof token so client doesnt get real/full token
    this.app.get("/v1/api/admin/auth/start", checkAuth, function (req, res) {
        req.session.callbackId = uuidv4();
        this.callbacks[req.session.callbackId] = function (err, json) {
            if (err) return res.status(400).json({status: 400, message: "Oauth failed due to user input."});
            request({
                    url: "https://outlook.office.com/api/v2.0/me",
                    headers: {
                        'Authorization': "Bearer " + json["access_token"]
                    }
                }, function (err, http, body) {
                    body = JSON.parse(body);
                    if (!body || body.error) return res.status(500).json({
                        status: 500,
                        message: "Server could not resolve request."
                    });

                    req.session.user.outlook = json;
                    req.session.user.outlook.email = body['EmailAddress'];
                    req.session.user.outlook.name = body['Display'];
                    return res.json(req.session.user.outlook);
                }
            );

        };
        req.session.save();
    }.bind(this));

    this.app.get("/admin/auth/outlook", checkAuth,
        function (req, res) {
            res.redirect(constants.oauth.authURL);
        }
    );

    this.app.get("/v1/api/admin/auth/outlook/callback", checkAuth,
        function (req, res) {
            if (req.query.error) {
                this.callbacks[req.session.callbackId](req.query.error, null);
            }
            if (!req.query.code) return res.status(400).json({status: 400, message: "Invalide parameters."});
            request.post({
                url: constants.oauth.tokenURL, form: {
                    "client_id": constants.oauth.appId,
                    "client_secret": constants.oauth.secret,
                    "code": req.query.code,
                    "redirect_uri": constants.oauth.callbackURL,
                    "grant_type": "authorization_code"
                }
            }, function (err, httpResponse, body) {
                body = JSON.parse(body);
                console.log(body.error);
                if (body.error) return res.status(500).json({
                    status: 500,
                    message: "Server could not resolve request."
                });

                console.log(req.session.callbackId);
                this.callbacks[req.session.callbackId](null, body);
                delete this.callbacks[req.session.callbackId];
                res.end("<html><script>window.close()</script><body>Successfully authenticated, you can close this window</body></html>");

            }.bind(this))
        }.bind(this));




    // TODO: Add email/password login to admin view mail settings
    this.app.get("/v1/api/admin/sendEmail", checkAuth, function (req, res) {
        if (!req.session.user.outlook || !req.session.user.outlook["access_token"]) return res.status(400).json({
            status: 400,
            message: "Invalid outlook access token"
        });
        MongoClient.connect(constants.dbUrl, function (err, db) {
            db.collection("settings").findOne({user: req.session.user.username}, function (err, settings) {
                db.collection("students").findOne({owner: req.session.user.username}, function (err, list) {
                    var urls = generateURLs(list.students);
                    console.log(urls);
                    this.ios.tracking[settings.chat.roomName] = {trackingIds: urls};
                    outlook.base.setAnchorMailbox(req.session.user.outlook.email);
                    // transporter = nodemailer.createTransport({
                    //     host: constants.smtp.host,
                    //     secureConnection: false,
                    //     port: 587,
                    //     auth: {
                    //         type: 'OAuth2',
                    //         user: req.session.user.outlook.email,
                    //         accessToken: req.session.user.outlook["access_token"]
                    //     },
                    //     tls: {
                    //         ciphers:'SSLv3'
                    //     }
                    // });


                    var userInfo = {
                        email: req.session.user.outlook.email
                    };

                    var count = 0;
                    var ids = Object.keys(urls);

                    var results = {};

                    function sendMail(id, callback) {
                        var mailOptions = {
                            Importance: "High",
                            Subject: 'MC2 Invitation', // Subject line
                            Body: {
                                Content: constants.emailTemplate.replace("{link}", "https://ice.trentu.ca/#/v1/" + settings.chat.roomName + "?trackId=" + id)
                            },
                            ToRecipients: [
                                {
                                    EmailAddress: {
                                        Address: urls[id].email
                                    }
                                }
                            ]
                        };

                        outlook.mail.sendNewMessage({
                            token: req.session.user.outlook["access_token"],
                            message: mailOptions,
                            user: userInfo
                        }, function (err, result) {
                            if (err)  {
                                results[urls[id].utorid] = err;
                            } else results[urls[id].utorid] = result;
                            count++;
                            if (count === ids.length) {
                                return callback(null, results);
                            }
                            sendMail(ids[count], callback)
                        });
                    }


                    sendMail(ids[count], function (err, data) {
                        if (err) res.status(500).json({status: 500, message: "Server could not resolve request."});
                        res.json({success: true, details: data});
                    });


                    // Promise.all(Object.keys(urls).map(function (id) {
                    //     return new Promise(function (resolve, rej) {
                    //         var mailOptions = {
                    //             Importance: "High",
                    //             Subject: 'MC2 Invitation', // Subject line
                    //             Body: {
                    //                 Content: constants.emailTemplate.replace("{link}", "https://ice.trentu.ca/#/v1/" + settings.chat.roomName + "?trackId=" + id)
                    //             },
                    //             ToRecipients: [
                    //                 {
                    //                     EmailAddress: {
                    //                         Address: urls[id].email
                    //                     }
                    //                 }
                    //             ]
                    //         };
                    //
                    //         outlook.mail.sendNewMessage({
                    //             token: req.session.user.outlook["access_token"],
                    //             message: mailOptions,
                    //             user: userInfo
                    //         }, function (err, result) {
                    //
                    //             if (err && err.indexOf("503") === -1) return rej(err);
                    //             resolve(result);
                    //         });
                    //
                    //         // transporter.sendMail(mailOptions, function (err, info) {
                    //         //     console.log(err);
                    //         //     if (err) return rej(err);
                    //         //     resolve(info);
                    //         // });
                    //     });

                    // })).then(function (details) {
                    //     res.json({success: true, details: details});
                    // }).catch(function (err) {
                    //     res.status(500).json({status: 500, message: "Server could not resolve request."});
                    // });


                }.bind(this));
            }.bind(this));

        }.bind(this));
    }.bind(this));

    this.app.get("/v1/api/room/:roomName/track/:code", function (req, res) {

        if (!this.ios.tracking[req.params.roomName] || !this.ios.tracking[req.params.roomName].trackingIds) return res.status(404).json({
            status: 404,
            message: "Requested registration id cannot be found."
        });

        var resp = this.ios.tracking[req.params.roomName].trackingIds[req.params.code];
        if (!resp) return res.status(404).json({status: 404, message: "Requested registration id cannot be found."});
        res.json(resp);
    }.bind(this));

    this.app.get("/v1/api/chat/start", checkAuth, function (req, res) {
        MongoClient.connect(constants.dbUrl, function (err, db) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            db.collection("settings").findOne({user: req.session.user.username}, function (err, settings) {
                if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
                if (!settings || !settings.chat || !settings.chat.roomName) return res.status(400).json({
                    status: 400,
                    message: "Invalid chat room settings."
                });
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
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            db.collection("students").findOne({owner: req.session.user.username}, function (err, list) {
                if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
                if (!list) return res.json([]);
                res.json(list.students);
                db.close();
            });

        });
    });

    //TODO: verify student list

    this.app.patch("/v1/api/students", checkAuth, function (req, res) {
        var student = new Student(req.body);

        MongoClient.connect(constants.dbUrl, function (err, db) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            db.collection("students").update({owner: req.session.user.username}, {$push: {students: student}}, {upsert: true}, function (err, list) {
                if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
                res.json({});
                db.close();
            });

        });
    });

    //TODO: verify student list

    this.app.put("/v1/api/students", checkAuth, function (req, res) {
        csv.parse(Buffer.from(req.body.csv, "base64"), {columns: true}, function (err, data) {
            if (err) return res.status(400).json({status: 400, message: err});
            MongoClient.connect(constants.dbUrl, function (err, db) {

                if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
                db.collection("students").updateOne({owner: req.session.user.username}, {
                    $set: {students: data}
                }, {upsert: true}, function (err, result) {
                    if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
                    res.json(data);
                    db.close();
                });

            });


        });
    });

    this.app.get("/v1/api/settings/:type", checkAuth, function (req, res) {
        MongoClient.connect(constants.dbUrl, function (err, db) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            db.collection("settings").findOne({user: req.session.user.username}, function (err, settings) {
                if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
                if (!settings) return res.json({});
                res.json(settings[req.params.type]);
            });
        });

    });

    this.app.post("/v1/api/settings/:type", checkAuth, function (req, res) {
        MongoClient.connect(constants.dbUrl, function (err, db) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            try {
                switch (req.params.type) {
                    case "chat":
                        var newSettings = new ChatSetting(req.body.settings);
                        db.collection("settings").updateOne({user: req.session.user.username}, {$set: {chat: newSettings}}, {upsert: true}, function (err, result) {
                            if (err) return res.status(500).json({
                                status: 500,
                                message: "Server error, could not resolve request"
                            });
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

    this.app.get("/v1/api/admin/students/generate", checkAuth, function (req, res) {
        MongoClient.connect(constants.dbUrl, function (err, db) {
            db.collection("students").findOne({owner: req.session.user.username}, function (err, students) {
                var newStudents = [];
                var urls = {};
                students.students.forEach(function (student) {
                    student.token = uuidv4();
                    newStudents.push(student);
                    urls[student.token] = student;
                });
                db.collection("students").updateOne({owner: req.session.user.username}, {$set: {students: newStudents}}, function (err, result) {
                    if (err) return;
                    this.ios.tracking[req.session.settings.chat.roomName] = {trackingIds: urls};
                    return csv.stringify(newStudents).pipe(res);
                }.bind(this));
            }.bind(this));

        }.bind(this));
    }.bind(this))

};

AdminView.prototype.setupSocket = function () {
    var findRoom = function (roomId) {
        return this.ios.sockets.adapter.rooms[roomId];
    }.bind(this);

    this.ios.on('connection', function (socket) {

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

        // TODO: Pontentially implement a frontend for chat history
        socket.on('send-message', function (data, callback) {
            var room = findRoom(socket.handshake.session.connectedRoom);
            data.type = "chat";
            if (socket.handshake.session.username && room.admin) {
                data.username = socket.handshake.session.username;
                data.userAvatar = socket.handshake.session.userAvatar;
                data.initials = data.username.slice(0, 2);
                data.timestamp = moment().valueOf();
                if (socket.handshake.session.utorid) data.utorid = socket.handshake.session.utorid;
                MongoClient.connect(constants.dbUrl, function (err, db) {
                    db.collection("chatHistory").updateOne({
                        sessionId: room.sessionId,
                        owner: room.admin.handshake.session.username,
                        roomName: socket.handshake.session.connectedRoom
                    }, {$push: {messages: data}}, {upsert: true}, function (err, result) {

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
            var isInstructor = false;
            if (socket.handshake.session.settings)
                 isInstructor = (socket.handshake.session.settings.chat.roomName !== data.roomId);
            if (session.user) {
                setSessionVars({isInstructor: isInstructor, username: session.user.username, isAdmin: !isInstructor});
                callback({username: session.user.username});
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
                    if (!this.ios.sockets.adapter.rooms[session.settings.chat.roomName]) return callback({
                        status: "Offline",
                        online: 0
                    });
                    callback({
                        online: this.ios.sockets.adapter.rooms[session.settings.chat.roomName].length,
                        status: "Online"
                    })
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