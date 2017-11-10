// class for the creation/management of a dynamic namespace in socket io
// the default chatnsp will replace existing code in the main app.js
// lecturensp will be used for created classrooms
var constants = require("./AdminView/constants");
var MongoClient = require('mongodb').MongoClient;
var moment = require("moment");

function ChatNsp(name, io) {
    this.name = name;

    this.io = io;

    this.nsp = io.of("/"+this.name);

    this.binds = [];

    this.onLogin = null;

    this.onJoin = null;

}

ChatNsp.prototype.listen = function () {
    if (!(this.onLogin && this.onJoin)) return console.log("Failed to start listening: need onLogin and onJoin functions set");
    this.nsp.on("connection", function (socket) {
        socket.on("join-room", this.onJoin(socket));

        socket.on('new user', this.onLogin(socket));

        for (var e in this.binds) {
            socket.on(e, binds[e](socket));
        }
    }.bind(this));

};

ChatNsp.prototype.on = function (event, callback) {
    this.nsp.on(event, callback);
};

ChatNsp.prototype.emit = function (event, callback) {
    this.nsp.emit(event, callback);
};


ChatNsp.prototype.bindToSocket = function (event, callback) {
    this.binds.push({e: event, cb: callback})
};



ChatNsp.prototype.findRoom = function (roomName) {
    // find room in classroom need to wait for classroom implementation
};


//Admin version of chatnsp, more auth/features
function LectureNsp(name, owner, io) {
    ChatNsp.call(name, io);

    this.owner = owner;

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

    function destroySession() {
        setSessionVars({username: null, connectedRoom: null});
    }


    function retrieveStudent(data, callback) {
        MongoClient.connect(constants.dbUrl, function (err, db) {
            db.collection('settings').findOne({'chat.roomName': data.roomId}, function (err, setting) {
                var owner = setting.user;
                db.collection("students").findOne({owner: owner}, function (err, students) {
                    var student = findOne(students.students, {token: data.token});
                    if (!student) return callback({success: false, message: "Invalid id."}, null);

                    callback(null, student);
                })
            });
        });
    }

    this.onJoin = function (socket) {
        return function (data, callback) {
            if (!data.roomId) return socket.disconnect();
            data.roomId = data.roomId.toLowerCase();
            var room = this.findRoom(data.roomId, function (err, room) {
                if (!room) return callback({success: false, message: "Room does not exist"});
                var nameExists = this.findClient(room, data.username);
                if (nameExists && !socket.handshake.session.isInstructor && !socket.handshake.session.isAdmin) {
                    destroySession();
                    return callback({success: false, message: "Use different username."});
                }
                if (socket.handshake.session.username) {
                    if (room && room.invite && !socket.handshake.session.isInstructor && !socket.handshake.session.utorid && !socket.handshake.session.isAdmin) {
                        destroySession();
                        return callback({success: false, message: "Room is invite only."});
                    }
                    //TODO: remove leave room and remove connected room, simply check if user in room
                    //socket.leave(socket.handshake.session.connectedRoom, function () {
                        this.sendMessage(data.roomId, {
                            username: "[System]",
                            msg: socket.handshake.session.username + " has joined the room.",
                            timestamp: moment().valueOf(),
                            type: "system",
                            hidden: true
                        });
                        socket.join(data.roomId, function () {

                            //console.log(socket.username+" joined room "+ data.roomId);

                            room = this.findRoomAdapter(data.roomId);

                            if (socket.handshake.session.settings && socket.handshake.session.settings.chat)
                                socket.handshake.session.isInstructor = (socket.handshake.session.settings.chat.roomName !== data.roomId);
                            else socket.handshake.session.isInstructor = false;

                            if (!room.messageHistory) room.messageHistory = [];

                            var history = room.messageHistory.slice();
                            history.push({
                                msg: "You have joined room " + data.roomId + ".",
                                type: "system",
                                timestamp: moment().valueOf()
                            });
                            socket.emit('new message multi', history);
                            callback({success: true});
                        }.bind(this));
                    //});

                } else {
                    socket.emit('new message', {
                        msg: "Error failed to joined room " + data.roomId + ".",
                        type: "system",
                        timestamp: moment().valueOf()
                    });
                    destroySession();
                    callback({success: false});
                }
            }.bind(this));

        };
    };


    this.onLogin = function (socket) {
        return function (data, callback) {
            data.roomId = data.roomId.toLowerCase();
            var room = findRoom(data.roomId);

            if (!room && data.isJoin) return callback({success: false, message: "Room does not exist."});
            else if (room && !data.isJoin) return callback({success: false, message: "Room already exists."});
            //if (!data.isJoin) clients = {sockets:[]};
            if (this.findClient(room, data.username)) {
                callback({success: false, message: "Use different username."});
            } else {
                if (data.token) {
                    retrieveStudent(data, function (err, student) {
                        if (err) return callback({success: false, message: "Invalid id."}, null);
                        setSessionVar("utorid", student.utorid);
                    })

                } else if (data.isJoin && clients.inviteOnly) {
                    return callback({success: false, message: "Room is invite only"});
                }
                if (socket.handshake.session.userAvatar) data.userAvatar = socket.handshake.session.userAvatar;
                setSessionVars({username: data.username, userAvatar: data.userAvatar});

                callback({success: true});
            }
        };
    };

}

LectureNsp.prototype.sendMessage = function (roomName, message, callback) {
    this.nsp.to(roomName).emit("new message", message);

    this.findRoom(roomName, function (err, room) {
        if (err) return callback(err, null);

            MongoClient.connect(constants.dbUrl, function (err, db) {
                db.collection("chatHistory").updateOne({
                    owner: this.owner,
                    roomName: roomName
                }, {$push: {messages: message}}, {upsert: true}, function (err, result) {
                    callback(null, result);
                });
            });

    });

};

LectureNsp.prototype.findRoom = function (roomName, callback) {
    MongoClient.connect(constants.dbUrl, function (err, db) {
        db.collection("classrooms").findOne({owner: this.owner, roomName: roomName}, function (err, classroom) {
            if (err) return callback(err, null);
            callback(null, classroom);
        });

    });
};

LectureNsp.prototype.findRoomAdapter = function (roomName) {
    return this.nsp.adapter.rooms[roomName];
};

LectureNsp.prototype.findClient = function (roomName, username) {
   var room = this.findRoomAdapter(roomName);
    if (!room) return null;
    for (var clientId in room.sockets) {

        if (this.nsp.connected[clientId].handshake.session.username === username) {
            return this.nsp.connected[clientId];
        }
    }
    return null;
};

module.exports = {ChatNsp: ChatNsp, LectureNsp: LectureNsp};