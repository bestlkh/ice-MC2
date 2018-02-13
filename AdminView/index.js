var constants = require("./constants.js");
var crypto = require("crypto");

var bodyParser = require("body-parser");
const uuidv4 = require('uuid/v4');
const moment = require('moment');
var csv = require('csv');

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require("mongodb").ObjectID;
var request = require('request');
var outlook = require("node-outlook");

var Bot = require("./bot.js");
var LectureNsp = require("../chatNsp").LectureNsp;
var sharedsession = require("express-socket.io-session");

function findOne(list, params) {
    var result;
    list.every(function (user) {
        var accepted = Object.keys(params).every(function (item) {
            return (user[item] === params[item])
        });
        if (accepted) {
            result = (user);
            return false;
        }
        return true;
    });
    return result;
}


var sessionRedirect = function (req, res, next) {
    if (!req.session.user && req.originalUrl !== "/favicon.ico") {
        req.session.redirectTo = req.originalUrl;
        return res.redirect("/login");
    }
    return next();
};


function AdminView(socketController, expressApp, sessionObj) {
    this.ios = socketController;
    this.app = expressApp;
    this.session = sessionObj;

    this.controllers = {};
    this.ios.tracking = {};
    this.oauthTokens = {};

    this.secrets = [];
    this.nsps = [];

    this.app.use(bodyParser.json());

    this.db = null;

    this.nsps = [];

    this.connectToDb(function (err, db) {
        if (err) throw new Error("Could not connect to database.");
        this.db = db;

        this.setupNamespaces(function (err, nsps) {
            if (err) console.log("Failed to initialize namespaces.");
            this.nsps = nsps;
        });

        this.setupRoute();
        this.setupApi();
        this.setupSocket();
    }.bind(this));


}

AdminView.prototype.connectToDb = function (callback) {
    MongoClient.connect(constants.dbUrl, function (err, db) {
        this.db = db;

        callback(err, db);
    }.bind(this));
};

AdminView.prototype.setupNamespaces = function (callback) {


    this.db.collection("users").find({}).toArray(function (err, users) {
        if (err) return callback(err, null);
        var nsps = [];
        users.forEach(function (user) {
            console.log(user.username + " nsp added.");
            var nsp = new LectureNsp(user.username, user.username, this.ios);
            nsp.nsp.use(sharedsession(this.session, {
                autoSave: true
            }));
            nsp.listen();
            nsps.push(nsp);

            callback(null, nsps);
        }.bind(this));
    }.bind(this))


};


AdminView.prototype.setupRoute = function () {
    this.app.get("/admin/*", sessionRedirect, function (req, res, next) {

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
        this.roomName = settings.roomName.toLowerCase();
        this.invite = settings.invite;
    }

};

AdminView.prototype.setupApi = function () {


    this.app.post("/v1/api/login", function (req, res) {


        this.db.collection("users").findOne({username: req.body.username}, function (err, user) {
            if (err) return res.status(500).end("Server error, could not resolve request");
            if (!user || !checkPassword(user, req.body.password)) return res.status(403).json({
                message: "Invalid username or password",
                status: 403
            });
            this.db.collection("settings").findOne({user: user.username}, function (err, settings) {
                if (err) return res.status(500).end("Server error, could not resolve request");
                req.session.user = user;
                req.session.userAvatar = user.userAvatar ? user.userAvatar : "avatar1.jpg";
                //req.session.username = user.username;
                req.session.settings = settings ? settings : {};


                res.json({username: user.username, redirect: req.session.redirectTo});
                delete req.session.redirectTo;

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
            oauth: token,
            userAvatar: req.session.userAvatar
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


    this.app.get("/v1/api/admin/resetTokens", checkAuth, function (req, res) {

        this.db.collection("settings").findOne({user: req.session.user.username}, function (err, settings) {
            this.ios.tracking[settings.chat.roomName] = null;
            res.json({success: true})
        }.bind(this));

    }.bind(this));

    this.app.get("/v1/api/classrooms/:name/students/tokens.csv", checkAuth, function (req, res) {

        this.db.collection("students").findOne({
            owner: req.session.user.username,
            className: req.params.name
        }, function (err, result) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            if (result && result.students) {
                res.writeHead(200, {
                    'Content-Type': 'application/csv',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Disposition': 'attachment; filename=tokens.csv'
                });
                return csv.stringify(result.students, {header: true}).pipe(res);
            }
            else
                res.send('No Tokens');
        }.bind(this));

    }.bind(this));

    this.app.get("/v1/api/classrooms", checkAuth, function (req, res) {

        this.db.collection("classrooms").find({owner: req.session.user.username}).toArray(function (err, crs) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            res.json(crs);
        });


    }.bind(this));

    this.app.get("/v1/api/classrooms/:name", checkAuth, function (req, res) {

        this.db.collection("classrooms").findOne({
            owner: req.session.user.username,
            name: req.params.name
        }, function (err, room) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            res.json(room);
        });


    }.bind(this));

    function Classroom(data) {
        this.name = data.name;
        this.invite = !!(data.invite);
        this.roomName = data.roomName;
        this.sid = moment.valueOf();
    }

    this.app.patch("/v1/api/classrooms", checkAuth, function (req, res) {
        var classroom = new Classroom(req.body);

        this.db.collection("classrooms").updateOne({
            owner: req.session.user.username,
            name: req.body.name
        }, {$set: classroom}, function (err, cr) {

            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            else if (!cr) return res.status(400).json({status: 400, message: "Classroom with name does not exist"});

            res.json({});
        });


    }.bind(this));

    this.app.post("/v1/api/classrooms", checkAuth, function (req, res) {
        var classroom = new Classroom(req.body);

        classroom.owner = req.session.user.username;

        this.db.collection("classrooms").findOne({
            owner: req.session.user.username,
            name: classroom.name
        }, function (err, cr) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            else if (cr) return res.status(400).json({status: 400, message: "Classroom with that name already exists"});
            this.db.collection("classrooms").insertOne(classroom, function (err, result) {
                if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
                res.json({});
            });
        }.bind(this));


    }.bind(this));

    this.app.get("/v1/api/classrooms/:name/students", checkAuth, function (req, res) {

        this.db.collection("students").findOne({
            owner: req.session.user.username,
            className: req.params.name
        }, function (err, cr) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            if (!cr) return res.json([]);
            res.json(cr.students);
        });

    }.bind(this));


    this.app.patch("/v1/api/classrooms/:name/students", checkAuth, function (req, res) {
        var student = new Student(req.body);


        this.db.collection("students").updateOne({
            owner: req.session.user.username,
            className: req.params.name
        }, {$push: {students: student}}, {upsert: true}, function (err, list) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            res.json({});

        });


    }.bind(this));

    this.app.put("/v1/api/classrooms/:name/students", checkAuth, function (req, res) {
        csv.parse(Buffer.from(req.body.csv, "base64"), {columns: true}, function (err, data) {
            if (err) return res.status(400).json({status: 400, message: "Invalid csv format"});

            var operation = (req.body.mode == 0) ? {$set: {students: data}} : {$push: {students: {$each : data}}};
            this.db.collection("students").updateOne({owner: req.session.user.username, className: req.params.name},
                operation,
                {upsert: true},
                function (err, result) {
                    if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
                    var resp = {};
                    result = result.result;
                    resp["n_successful"] = data.length;
                    res.json(resp);

                }
            );

        }.bind(this));


    }.bind(this));

    // this.app.get("/admin/client/test", function (req, res) {
    //
    //     var secret = uuidv4();
    //     this.secrets.push(secret);
    //     var bot = new Bot({name: uuidv4(), host: "http://localhost", port: 8080, timeout: 5000, nsp: "/test"});
    //
    //     bot.connect({username: "BOT", initials: "bo", userAvatar: 'avatar1.jpg', roomId: "test2"}, function (result) {
    //         console.log(result);
    //
    //         bot.join('test2', function (result) {
    //             console.log(result);
    //
    //             bot.emit("send-message", {msg: "hello world!", hasMsg: true}, function (result) {
    //                 console.log(result);
    //             });
    //         });
    //
    //         bot.on("new message", function (data) {
    //             console.log("received message: [" + data.msgTime + "] " + data.username + ": " + data.msg);
    //         });
    //
    //
    //     });
    //
    //
    //     res.end("end");
    // }.bind(this));

    var getUserTracking = function (req, res, next) {

        this.db.collection("classrooms").findOne({
            owner: req.params.nsp,
            roomName: req.params.roomName
        }, function (err, classroom) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            else if (!classroom) return res.status(400).json({
                status: 400,
                message: "Classroom with name does not exist"
            });
            this.db.collection("students").findOne({
                owner: req.params.nsp,
                className: classroom.name
            }, function (err, students) {
                if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
                var student = findOne(students.students, {token: req.params.code});
                if (!student) return res.status(404).json({
                    status: 404,
                    message: "Requested registration id cannot be found."
                });

                req.student = student;
                return next();
            });
        }.bind(this));

    }.bind(this);

    this.app.get("/v1/api/namespace/:nsp", function (req, res) {
        if (findOne(this.nsps, {name: req.params.nsp})) return res.json({});
        else res.status(404).json({status: 404, message: "No such namespace"});
    });


    this.app.get("/v1/api/namespace/:nsp/room/:roomName/track/:code", getUserTracking, function (req, res) {

        var resp = req.student;

        res.json(resp);
    }.bind(this));

    this.app.get("/v1/api/chat/start", checkAuth, function (req, res) {


        this.db.collection("settings").findOne({user: req.session.user.username}, function (err, settings) {
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

    }.bind(this));

    this.app.get("/v1/api/students", checkAuth, function (req, res) {
        this.db.collection("students").findOne({owner: req.session.user.username}, function (err, list) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            if (!list) return res.json([]);
            res.json(list.students);
            db.close();
        });


    }.bind(this));

    this.app.patch("/v1/api/students", checkAuth, function (req, res) {
        var student = new Student(req.body);

        this.db.collection("students").update({owner: req.session.user.username}, {$push: {students: student}}, {upsert: true}, function (err, list) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            res.json({});
            db.close();
        });


    }.bind(this));

    this.app.put("/v1/api/students", checkAuth, function (req, res) {
        csv.parse(Buffer.from(req.body.csv, "base64"), {columns: true}, function (err, data) {
            if (err) return res.status(400).json({status: 400, message: err});

            this.db.collection("students").updateOne({owner: req.session.user.username}, {
                $set: {students: data}
            }, {upsert: true}, function (err, result) {
                if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
                var resp = {};
                result = result.result;
                resp.amount = result.n;
                resp["n_successful"] = result.ok;
                res.json(resp);
                db.close();
            });

        }.bind(this));

    }.bind(this));

    this.app.patch("/v1/api/classrooms/:name/students/generate", checkAuth, function (req, res) {

        this.db.collection("students").findOne({
            owner: req.session.user.username,
            className: req.params.name
        }, function (err, students) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            if (!students) return res.status(400).json({status: 400, message: "Invalid student list"});
            var newStudents = [];
            var urls = {};
            students.students.forEach(function (student) {
                student.token = uuidv4();
                newStudents.push(student);
                urls[student.token] = student;
            });

            this.db.collection("students").updateOne({
                owner: req.session.user.username,
                className: req.params.name
            }, {$set: {students: newStudents}}, function (err, result) {
                if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
                res.json({});

            }.bind(this));
        }.bind(this));


    }.bind(this));

    function TA(ta) {
        this.name = ta.name;
        this.token = ta.token ? ta.token : uuidv4().substring(0, 8);
    }

    this.app.post("/v1/api/ta", checkAuth, function (req, res) {
        var ta = new TA(req.body);


        this.db.collection("ta").updateOne({owner: req.session.user.username}, {$push: {tas: ta}}, {upsert: true}, function (err, result) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});

            res.json({});

        });

    }.bind(this));

    this.app.get("/v1/api/ta", checkAuth, function (req, res) {


        this.db.collection("ta").findOne({owner: req.session.user.username}, function (err, result) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});

            res.json(result ? result.tas : []);

        });

    }.bind(this));

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

        socket.on("logout", function () {
            var room = findRoom(socket.handshake.session.connectedRoom);
            if (!room) return;
            room.admin = null;
            var session = socket.handshake.session;
            if (this.controllers[session.id])
                this.controllers[session.id].emit("stop_controller");
        }.bind(this));



        socket.on("new bot", function (data, callback) {
            if (this.secrets.indexOf(data.secret) !== -1) {
                setSessionVars({
                    username: data.username,
                    userAvatar: data.userAvatar,
                    isAdmin: true,
                    isBot: true,
                    owner: data.owner
                });
                callback({success: true});
            } else {
                setSessionVars({username: data.username, userAvatar: data.userAvatar, isBot: true});
                callback({success: true});
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
