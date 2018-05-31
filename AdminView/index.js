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
var mimeMap = require("mime-types");
var fs = require("fs");

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
        if (err) return console.log("Could not connect to database.");
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
    this.token = student.token ? student.token : uuidv4();
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

var filter = function(req, file, cb) {
    if (file.mimetype.indexOf("image/") == -1) {
        cb(null, false);
    } else {
        cb(null, true);
    }
};

var naming = function(req, file, cb) {
    var ext = mimeMap.extensions[file.mimetype][0];
    cb(null, req.params.id+"."+ext);
};

var multer  = require("multer");
var storage = multer.diskStorage({
    filename: naming,
    destination: "./public/app/css/dist/img"
});

var upload = multer({fileFilter: filter, storage: storage});

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

                this.db.collection("classrooms").findOne({owner: req.session.user.username, name: req.params.name}, function (err, classroom) {
                    res.writeHead(200, {
                        'Content-Type': 'application/csv',
                        'Access-Control-Allow-Origin': '*',
                        'Content-Disposition': 'attachment; filename=tokens.csv'
                    });
                    result.students.forEach(function (student) {
                        student.url = "/#/v1/"+classroom.roomName+"?nsp="+result.owner+"&token="+student.token;
                    });

                    return csv.stringify(result.students, {header: true}).pipe(res);
                });

            }
            else res.send('No Tokens');
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
        this.sessionId = moment().valueOf();
    }

    this.app.patch("/v1/api/classrooms", checkAuth, function (req, res) {
        var classroom = new Classroom(req.body);

        this.db.collection("classrooms").findOne({roomName: classroom.roomName, owner: req.session.user.username}, function (err, cr) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            if (cr && cr.name !== classroom.name) return res.status(400).json({status: 400, message: "Classroom with room name already exist"});
            this.db.collection("classrooms").updateOne({
                owner: req.session.user.username,
                name: req.body.name
            }, {$set: classroom}, function (err, cr) {

                if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
                else if (!cr) return res.status(400).json({status: 400, message: "Classroom with name does not exist"});

                res.json({});
            });
        }.bind(this));



    }.bind(this));

    this.app.post("/v1/api/classrooms", checkAuth, function (req, res) {
        var classroom = new Classroom(req.body);

        classroom.owner = req.session.user.username;

        this.db.collection("classrooms").findOne({
            owner: req.session.user.username,
            $or: [
                {name: classroom.name},
                {roomName: classroom.roomName}
            ]
        }, function (err, cr) {

            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            else if (cr) return res.status(400).json({status: 400, message: "Classroom with that name/room name already exists"});
            this.db.collection("classrooms").insertOne(classroom, function (err, result) {
                if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
                res.json({});
            });
        }.bind(this));


    }.bind(this));


    this.app.delete("/v1/api/classrooms/:name", checkAuth, function (req, res) {
        this.db.collection("classrooms").removeOne({
            name: req.params.name,
            owner: req.session.user.username
        }, function (err, result) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            this.db.collection("students").removeOne({
                owner: req.session.user.username,
                className: req.params.name
            }, function (err, result) {
                if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
                this.db.collection("chatHistory").update({className: req.params.name, owner: req.session.user.username}, {$set: {deleted: true}}, {multi: true}, function (err, result) {
                    if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
                    res.json({});
                });


            }.bind(this));

        }.bind(this));
    }.bind(this));

    this.app.get("/v1/api/classrooms/:name/students", checkAuth, function (req, res) {

        this.db.collection("students").findOne({
            owner: req.session.user.username,
            className: req.params.name
        }, function (err, students) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            if (!students) return res.json([]);
            this.db.collection("classrooms").findOne({owner: req.session.user.username, name: req.params.name}, function (err, classroom) {
                students.students.forEach(function (student) {
                    student.url = "/#/v1/"+classroom.roomName+"?nsp="+students.owner+"&token="+student.token;
                });

                res.json(students.students);
            });


        }.bind(this));

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

    this.app.post("/v1/api/classrooms/:name/students", checkAuth, function (req, res) {
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

    function TA(ta, owner) {
        this.name = ta.name;
        this.token = ta.token ? ta.token : uuidv4().substring(0, 8);
        this.owner = owner;
        this.avatar = ta.avatar ? ta.avatar : "Avatar1.jpg";
    }

    this.app.post("/v1/api/ta", checkAuth, function (req, res) {
        var ta = new TA(req.body, req.session.user.username);
        if (!ta.name || ta.name === "") return res.status(400).json({status: 400, message: "Invalid TA name"});

        this.db.collection("ta").findOne({owner: ta.owner, name: ta.name}, function (err, result) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            if (result) return res.status(400).json({status: 400, message: "Name already exists"});
            this.db.collection("ta").insertOne(ta, function (err, result) {
                if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});


                res.json({});

            });
        }.bind(this));

    }.bind(this));

    this.app.get("/v1/api/ta", checkAuth, function (req, res) {


        this.db.collection("ta").find({owner: req.session.user.username}, {avatar: 0, owner: 0}).toArray(function (err, result) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});

            res.json(result);

        });

    }.bind(this));

    this.app.patch("/v1/api/ta/:id", checkAuth, upload.single("image"), function (req, res) {
        var ta = new TA(req.body, req.session.user.username);

        var r = Math.random();
        if (req.file) ta.avatar = req.file.filename+"?"+r;

        if (!ta.name || ta.name === "") return res.status(400).json({status: 400, message: "Invalid TA name"});

        this.db.collection("ta").findOne({
            owner: ta.owner,
            $or: [
                {token: ta.token},
                {name: ta.name}
                ]
        }, function (err, originalTA) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            if (originalTA && (originalTA._id.toString() !== req.params.id)) return res.status(400).json({
                status: 400,
                message: "Token or Name already exists"
            });
            this.db.collection("ta").updateOne({
                _id: new ObjectID(req.params.id),
                owner: req.session.user.username
            }, ta, function (err, result) {
                if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});

                if (originalTA && (originalTA.avatar !== ta.avatar)) {
                    if (originalTA.avatar.indexOf("_custom.") !== -1) return fs.unlink("./public/app/css/dist/img/"+originalTA.avatar, function () {
                        res.json({});
                    });

                }
                res.json({});

            });
        }.bind(this));

    }.bind(this));

    this.app.delete("/v1/api/ta/:id", checkAuth, function (req, res) {
        this.db.collection("ta").removeOne({owner: req.session.user.username, _id: new ObjectID(req.params.id)}, function (err, result) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            res.json({});
        });
    }.bind(this));

    this.app.post("/v1/api/ta/:id/avatar", checkAuth, upload.single("image"), function (req, res) {
        if (!req.file) return res.status(400).json({status: 400, message: "Invalid image"});

        res.json({avatar: req.file.filename});
    }.bind(this));

    this.app.get("/v1/api/ta/:id", checkAuth, function (req, res) {
        this.db.collection("ta").findOne({owner: req.session.user.username, _id: new ObjectID(req.params.id)}, function (err, ta) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});

            if (!ta) return res.status(404).json({status: 404, message: "No such TA exists"});
            res.json(ta);
        });
    }.bind(this));

    this.app.get("/v1/api/classrooms/:name/sessions", checkAuth, function (req, res) {
        this.db.collection("chatHistory").find({owner: req.session.user.username, className: req.params.name, deleted: null}, {messages: 0, _id: 0}).toArray(function (err, sessions) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});

            res.json(sessions);
        });
    }.bind(this));

    this.app.get("/v1/api/classrooms/:name/sessions/:id/messages", checkAuth, function (req, res) {
        if (isNaN(req.params.id)) return res.status(400).json({status: 400, message: "Invalid id"});
        this.db.collection("chatHistory").findOne({owner: req.session.user.username, className: req.params.name, sessionId: parseInt(req.params.id), deleted: null}, {_id: 0}, function (err, session) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});

            replaceImages(session.messages);
            replaceTimestamp(session.messages);
            res.json(session);
        });
    }.bind(this));

    var parseStudent = require("./message-parser");

    this.app.get("/v1/api/classrooms/:name/sessions/:id/students", checkAuth, function (req, res) {
        if (isNaN(req.params.id)) return res.status(400).json({status: 400, message: "Invalid id"});
        parseStudent(this.db, parseInt(req.params.id), function (err, result) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            res.json(result);
        });
    }.bind(this));

    this.app.get("/v1/api/classrooms/:name/sessions/messages.csv", checkAuth, function (req, res) {
        this.db.collection("chatHistory").find({owner: req.session.user.username, className: req.params.name, deleted: null}, {_id: 0}).toArray(function (err, sessions) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});

            var messages = [];
            sessions.forEach(function (item) {
                if (!item.sessionId) return;
                var m = item.messages.map(function (message) {
                    message.roomName = item.roomName;
                    return message;
                });
                messages = messages.concat(m);
            });
            res.writeHead(200, {
                'Content-Type': 'application/csv',
                'Access-Control-Allow-Origin': '*',
                'Content-Disposition': 'attachment; filename=messages-'+req.params.name+'.csv'
            });
            replaceImages(messages);
            replaceTimestamp(messages);
            return csv.stringify(messages, {columns: messageColumns, header: true}).pipe(res);
        })
    }.bind(this));

    var messageColumns = ["username", "msg", "timestamp", "isTA", "isInstructor", "type", "utorid"];

    this.app.get("/v1/api/classrooms/:name/sessions/:id/messages.csv", checkAuth, function (req, res) {
        if (isNaN(req.params.id)) return res.status(400).json({status: 400, message: "Invalid id"});
        this.db.collection("chatHistory").findOne({owner: req.session.user.username, className: req.params.name, sessionId: parseInt(req.params.id), deleted: null}, {_id: 0}, function (err, session) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});

            res.writeHead(200, {
                'Content-Type': 'application/csv',
                'Access-Control-Allow-Origin': '*',
                'Content-Disposition': 'attachment; filename=messages-'+session.roomName+'-'+session.sessionId+'.csv'
            });
            replaceImages(session.messages);
            replaceTimestamp(session.messages);
            return csv.stringify(session.messages, {columns: messageColumns, header: true}).pipe(res);
        })
    }.bind(this));

    var replaceImages = function (messages) {
        messages.forEach(function (message) {
            if (message.msg.startsWith("[mc2-image]"))
                message.msg = "[mc2-image]";
        });
    };

    var replaceTimestamp = function (messages) {
        messages.forEach(function (message) {
            message.timestamp = moment(message.timestamp).format("MM/DD/YYYY hh:mm:ss");
        });
    };

    this.app.get("/v1/api/classrooms/:name/sessions/students.csv", checkAuth, function (req, res) {
        this.db.collection("chatHistory").find({owner: req.session.user.username, className: req.params.name, deleted: null}, {_id: 0}).toArray(function (err, sessions) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});

            var students = [];

            Promise.all(sessions.map(function (session) {
                return new Promise(function (resolve, rej) {
                    if (!session.sessionId) return resolve();
                    parseStudent(this.db, session.sessionId, function (err, result) {
                        if (err) return rej();

                        students = students.concat(result);
                        resolve();
                    });
                }.bind(this));

            }.bind(this))).then(function () {
                res.writeHead(200, {
                    'Content-Type': 'application/csv',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Disposition': 'attachment; filename=students-'+req.params.name+'.csv'
                });
                return csv.stringify(students, {header: true}).pipe(res);
            }).catch(function () {
                return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            });

        }.bind(this))
    }.bind(this));

    this.app.get("/v1/api/classrooms/:name/sessions/:id/students.csv", checkAuth, function (req, res) {
        if (isNaN(req.params.id)) return res.status(400).json({status: 400, message: "Invalid id"});
        parseStudent(this.db, parseInt(req.params.id), function (err, result) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});

            res.writeHead(200, {
                'Content-Type': 'application/csv',
                'Access-Control-Allow-Origin': '*',
                'Content-Disposition': 'attachment; filename=students-'+req.params.id+'.csv'
            });
            return csv.stringify(result, {header: true}).pipe(res);
        })
    }.bind(this));

    this.app.get("/join/:name", function (req, res) {
        this.db.collection("urls").findOne({name: req.params.name}, function (err, result) {
            if (err) return res.status(500).json({status: 500, message: "Server error, could not resolve request"});
            if (result) return res.redirect(result.redirect);
            res.redirect("/");
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
