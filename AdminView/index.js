var constants = require("./constants.js");
var crypto = require("crypto");

var bodyParser = require("body-parser");
const uuidv4 = require('uuid/v4');
const moment = require('moment');
var csv = require('csv');

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require("mongodb").ObjectID;

var sessionRedirect = function (req, res, next) {
    if (!req.session.user && req.originalUrl !== "/favicon.ico") {
        req.session.redirectTo = req.originalUrl;
        return res.redirect("/login");
    }
    return next();
};

const SMTPConnection = require('nodemailer/lib/smtp-connection');
var connection = new SMTPConnection({host: constants.smtp.host, secure: true, requireTLS: true});

function AdminView(socketController, expressApp) {
    this.ios = socketController;
    this.app = expressApp;

    this.controlSessionIds = {};
    this.ios.tracking = {};

    this.app.use(bodyParser.json());


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

var User = function(user){
    var salt = crypto.randomBytes(16).toString('base64');
    var hash = crypto.createHmac('sha512', salt);
    hash.update(user.password);
    this.username = user.username;
    this.salt = salt;
    this.saltedHash = hash.digest('base64');
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
    this.app.post("/v1/api/login", function (req, res) {
        MongoClient.connect(constants.dbUrl, function (err, db) {
            db.collection("users").findOne({username: req.body.username}, function (err, user) {
                if (err) return res.status(500).end("Server error, could not resolve request");
                if (!user || !checkPassword(user, req.body.password)) return res.status(403).json({message: "Invalid username or password", status: 403});
                req.session.user = user;

                res.cookie('username', user.username, {httpOnly: false});

                res.json({username: user.username, redirect: req.session.redirectTo});
                delete req.session.redirectTo;

            });
        });
    });

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
                    this.ios.tracking[settings.chat.roomName] = {trackingIds: urls};
                    connection.connect(function () {
                        connection.login({
                            credentials: {
                                user: constants.smtp.username,
                                pass: constants.smtp.password
                            }
                        }, function (err) {
                            Promise.all(Object.keys(urls).map(function (id) {
                                return new Promise(function (resolve, rej) {
                                    connection.send({
                                        from: constants.smtp.username,
                                        to: urls[id].email
                                    }, "test confirmation: http://127.0.0.1:8080/#/v1/"+settings.chat.roomName+"?trackId=" + id, function (err, info) {
                                        resolve(info);
                                    });
                                });

                            })).then(function (details) {
                                connection.quit();
                                res.json({success: true, details: details});
                            });

                        });
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
                req.session.user.roomName = settings.chat.roomName;
                req.session.username = req.session.user.username;
                req.session.settings = settings;
                req.session.connected = true;
                req.session.isAdmin = true;
                req.session.userAvatar = 'avatar1.jpg';
                res.json({roomName: settings.chat.roomName});
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

    this.app.post("/v1/api/students", checkAuth, function (req, res) {
        csv.parse(Buffer.from(req.body.csv, "base64"), {columns: true}, function(err, data) {
            MongoClient.connect(constants.dbUrl, function (err, db) {

                db.collection("students").findOne({owner: req.session.user.username}, function (err, list) {
                    if (list) {
                        db.collection("students").updateOne({owner: req.session.user.username}, {
                            $set: {students: data}
                        }, function (err, result) {
                            res.json(data);
                            db.close();
                        })
                    }
                    else {
                        var entry = {
                            owner: req.session.user.username,
                            students: data
                        };
                        db.collection("students").insertOne(entry, function (err, result) {
                            res.json(data);
                            db.close();
                        });
                    }
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
                            console.log(req.body.settings);
                            console.log(newSettings);
                            db.collection("settings").updateOne({user: req.session.user.username}, {$set: {chat: newSettings}}, {upsert: true}, function (err, result) {
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
                MongoClient.connect(constants.dbUrl, function (err, db) {
                    db.collection("chatHistory").updateOne({sessionId: room.sessionId, owner: room.admin.handshake.session.username}, {$push: {messages: data}}, {upsert: true}, function (err, result) {

                    });
                });

            }
        });

        socket.on("admin_get_status", function (data, callback) {
            socket.handshake.session.reload(function (err) {
                if (err) return callback();
                if (socket.handshake.session.isAdmin) {
                    var user = socket.handshake.session.user;
                    if (!this.ios.sockets.adapter.rooms[user.roomName]) return callback({status: "Offline", online: 0});
                    callback({online: this.ios.sockets.adapter.rooms[user.roomName].length, status: "Online"})
                } else callback({status: "Offline", online: "0"});
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