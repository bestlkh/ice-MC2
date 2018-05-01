// class for the creation/management of a dynamic namespace in socket io
// the default chatnsp will replace existing code in the main app.js
// lecturensp will be used for creating classrooms
var constants = require("./AdminView/constants");
var MongoClient = require('mongodb').MongoClient;
var moment = require("moment");
var Message = require("./message");
const uuidv4 = require('uuid/v4');

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

ChatNsp.prototype.emit = function (event, data, callback) {
    this.nsp.emit(event, data, callback);
};


ChatNsp.prototype.bindToSocket = function (event, callback) {
    this.binds.push({e: event, cb: callback})
};

ChatNsp.prototype.findRoom = function (roomName) {

};

//Admin version of chatnsp, more auth/features
function LectureNsp(name, owner, io) {
    this.name = name;

    this.io = io;

    this.nsp = io.of("/"+this.name);

    this.binds = [];

    this.oauthTokens = {};

    this.rooms = {};

    this.owner = owner;

    this.db = null;
}

LectureNsp.prototype.connectToDb = function (callback) {
    MongoClient.connect(constants.dbUrl, function (err, db) {
        this.db = db;

        callback();
    }.bind(this));
};

LectureNsp.prototype.sendMessage = function (roomName, message, callback) {
    if (!this.rooms[roomName]) {
        if (callback) return callback("Invalid room", null);
        return;
    }
    this.nsp.to(roomName).emit("new message", message);

    this.findRoom(roomName, function (err, room) {
        if (err) return callback(err, null);
                this.db.collection("chatHistory").updateOne({
                    owner: this.owner,
                    roomName: roomName,
                    sessionId: this.rooms[roomName].sessionId,
                    className: this.rooms[roomName].className
                }, {$push: {messages: message}}, {upsert: true}, function (err, result) {
                    if (callback) callback(null, result);
                });

    }.bind(this));

};

LectureNsp.prototype.findRoom = function (roomName, callback) {

        this.db.collection("classrooms").findOne({owner: this.owner, roomName: new RegExp("^" + roomName + "$", 'i')}, {}, function (err, classroom) {
            if (err) return callback(err, null);
            callback(null, classroom);
        });


};

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

LectureNsp.prototype.findStudent = function (data, callback) {
        this.db.collection("classrooms").findOne({owner: this.owner, roomName: new RegExp("^" + data.roomId + "$", 'i')}, function (err, classroom) {
            if (err) return callback(err, null);
            if (!classroom) return callback({}, null);

            this.db.collection("students").findOne({owner: this.owner, className: classroom.name}, function (err, students) {
                if (err) return callback(err, null);
                var student = findOne(students.students, {token: data.token});


                callback(null, student);
            });

        }.bind(this));
};

LectureNsp.prototype.findRoomAdapter = function (roomName) {
    return this.nsp.adapter.rooms[roomName.toLowerCase()];
};

LectureNsp.prototype.setRoomAdapterVars = function (roomName, vars) {
    if (!this.nsp.adapter.rooms[roomName.toLowerCase()]) return;
    for (var key in vars) {

        this.nsp.adapter.rooms[roomName.toLowerCase()][key] = vars[key];
    }
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

LectureNsp.prototype.findTa = function (data, callback) {
        this.db.collection("ta").findOne({owner: this.owner, token: data.secret}, function (err, ta) {
            if (err) return callback(err, null);

            callback(null, ta);
        });

};

LectureNsp.prototype.deleteMessage = function (roomName, message) {
    this.nsp.to(roomName).emit("delete message", message);
    var room = this.findRoomAdapter(roomName);
    if (room) {
        message.deleted = true;

            this.db.collection("chatHistory").updateOne({
                sessionId: room.sessionId,
                owner: this.owner,
                roomName: roomName
            }, {$push: {messages: message}}, {upsert: true}, function (err, result) {

            }.bind(this));

    }

};

LectureNsp.prototype.listen = function () {
    this.connectToDb(function () {

        this.nsp.on("connection", function (socket) {
            if (!socket.handshake.session.chatVars) setSessionVar("chatVars", []);

            for (var e in this.binds) {
                socket.on(e, binds[e](socket));
            }

            function setSessionVar(variable, value) {
                socket.handshake.session[variable] = value;

                if (socket.handshake.session.chatVars) socket.handshake.session.chatVars.push(variable);
                socket.handshake.session.save();

            }

            function setSessionVars(object) {
                for (var variable in object) {
                    socket.handshake.session[variable] = object[variable];
                    if (socket.handshake.session.chatVars) socket.handshake.session.chatVars.push(variable);
                }
                socket.handshake.session.save();
            }

            function destroySession() {
                //setSessionVars({username: null, connectedRoom: null, userAvatar: null, ta: null, utorid });
                socket.handshake.session.chatVars.forEach(function (variable) {
                    socket.handshake.session[variable] = null;
                });
                socket.handshake.session.save();
            }

            // delete message
            socket.on('delete-message', function (data, callback) {
                var history = this.findRoomAdapter(socket.connectedRoom).messageHistory;
                var index = history.findIndex(function (item, i) {
                    return (item.msgTime === data.msgTime && item.username === data.username && item.msg === data.msg);
                });
                if (index > -1)
                    history.splice(index, 1);
                this.nsp.to(socket.connectedRoom).emit('delete message', data);
                callback({success: true});
            }.bind(this));

            // announce message
            socket.on('announce-message', function (data, callback) {
                this.nsp.to(socket.connectedRoom).emit('announce message', data);
                callback({success: true});
            }.bind(this));

            socket.on("new user", function (data, callback) {
                data.roomId = data.roomId.toLowerCase();

                this.findRoom(data.roomId, function (err, classroom) {
                    if (!classroom) return callback({success: false, message: "Room does not exist"});
                    if (this.findClient(data.roomId, data.username)) {
                        callback({success: false, message: "Use different username."});
                    } else {
                        var login = function (data) {
                            if (data.userAvatar && isNaN(data.userAvatar)) return callback({success: false, message: "Invalid user avatar"});
                            else data.userAvatar = "Avatar" + data.userAvatar + ".jpg";
                            if (socket.handshake.session.userAvatar && !data.userAvatar) data.userAvatar = socket.handshake.session.userAvatar;
                            setSessionVars({username: data.username, userAvatar: data.userAvatar, initials: data.initials, connectedClass: data.roomId});
                            callback({success: true, username: data.username});
                        };
                        if (data.secret) {
                            this.findTa(data, function (err, ta) {
                                if (err || !ta) return callback({success: false, message: "Invalid secret"});

                                setSessionVar("ta", ta);

                                data.username = ta.name;
                                login(data);
                                setSessionVars({userAvatar: ta.avatar});
                            });
                        }
                        else if (data.token) {
                            this.findStudent(data, function (err, student) {
                                if (err) return callback({success: false, message: "Invalid id"});
                                setSessionVar("utorid", student.utorid);
                                login(data);
                            });
                        } else if (classroom.invite) {
                            return callback({success: false, message: "Room is invite only"});
                        } else login(data);



                    }
                }.bind(this));
                //if (!data.isJoin) clients = {sockets:[]};
            }.bind(this));

            socket.on("join-room", function (data, callback) {

                if (!data.roomId) return socket.disconnect();
                data.roomId = data.roomId.toLowerCase();

                this.findRoom(data.roomId, function (err, classroom) {
                    if (!classroom) return callback({success: false, message: "Room does not exist"});
                    var nameExists = this.findClient(data.roomId, data.username);
                    if (nameExists && !socket.handshake.session.isInstructor && !socket.handshake.session.isAdmin) {
                        destroySession();
                        return callback({success: false, message: "Use different username"});
                    }
                    if (socket.handshake.session.username) {

                        if (classroom && classroom.invite && !socket.handshake.session.ta && !socket.handshake.session.isInstructor && !socket.handshake.session.utorid && !socket.handshake.session.isAdmin) {
                            destroySession();
                            return callback({success: false, message: "Room is invite only"});
                        }

                        if (socket.handshake.session.utorid && socket.handshake.session.connectedClass) {
                            if (data.roomId !== socket.handshake.session.connectedClass) {
                                return callback({success: false, message: "Log in again to access room"});
                            }
                        }

                        socket.join(data.roomId, function () {

                            var room = this.findRoomAdapter(data.roomId);
                            socket.connectedRoom = data.roomId;

                            if (!room.sessionId) this.setRoomAdapterVars(data.roomId, {sessionId: classroom.sessionId, className: classroom.name});

                            if (!this.rooms[data.roomId]) this.rooms[data.roomId] = Object.assign({}, room);

                            this.sendMessage(data.roomId, {
                                username: "[System]",
                                msg: socket.handshake.session.username + " has joined the room.",
                                timestamp: moment().valueOf(),
                                type: "system",
                                hidden: true
                            });

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

            }.bind(this));

            socket.on("check-session", function (data, callback) {


                var session = socket.handshake.session;


                var username = session.username;
                if (session.user) {
                    username = session.user.username;
                    setSessionVars({
                        username: session.user.username,
                        avatar: session.user.userAvatar,
                        isAdmin: true,
                        isInstructor: true
                    });
                }
                if (!username) callback({});
                else callback({
                    username: username,
                    avatar: session.userAvatar || session.user.userAvatar,
                    isAdmin: session.isAdmin || session.user
                });
            });


            socket.on('get-online-members', function (data) {
                var online_member = [];
                var i = this.findRoomAdapter(data.roomName);
                if (!i) return socket.emit('online-members', online_member);

                for (var clientId in i.sockets) {
                    temp1 = {
                        "username": this.nsp.connected[clientId].handshake.session.username,
                        "userAvatar": this.nsp.connected[clientId].handshake.session.userAvatar
                    };

                    if (socket.handshake.session.isAdmin) {
                        temp1.utorid = this.nsp.connected[clientId].handshake.session.utorid;
                    }
                    if (this.nsp.connected[clientId].handshake.session.isAdmin || this.nsp.connected[clientId].handshake.session.isInstructor) {
                        temp1.isInstructor = true;
                    }
                    online_member.push(temp1);
                }
                socket.emit('online-members', online_member);
            }.bind(this));

            // sending new message
            socket.on('send-message', function (data, callback) {
                data.type = "chat";
                if (socket.handshake.session.username) {
                    var message = new Message.Message(data, socket.handshake.session);

                    message.isInstructor = socket.handshake.session.isAdmin || socket.handshake.session.isInstructor;
                    message.isTA = !!(socket.handshake.session.ta);
                    message.utorid = socket.handshake.session.utorid;

                    message.timestamp = moment().valueOf();

                    this.findRoomAdapter(socket.connectedRoom).messageHistory.push(message);

                    this.sendMessage(socket.connectedRoom, message, function (err, result) {
                        if (callback) callback({success: !!result});
                    });


                } else {
                    socket.disconnect();
                }
            }.bind(this));

            socket.on("send-image", function (data, callback) {
                data.type = "chat";
                if (socket.handshake.session.username) {
                    if (!Message.ImageMessage.validate(data)) return callback({success: false});
                    var message = new Message.ImageMessage(data, socket.handshake.session);

                    message.isInstructor = socket.handshake.session.isAdmin || socket.handshake.session.isInstructor;
                    message.isTA = !!(socket.handshake.session.ta);
                    message.timestamp = moment().valueOf();

                    this.findRoomAdapter(socket.connectedRoom).messageHistory.push(message);
                    this.sendMessage(socket.connectedRoom, message, function (err, result) {
                        if (callback) callback({success: !!result});
                    });
                }
            }.bind(this));

            socket.on("instructor_login", function (data, callback) {
                var session = socket.handshake.session;
                // if (!session.user) return socket.disconnect();
                // setSessionVars({isInstructor: true, username: session.user.username});
                var isInstructor = false;
                if (socket.handshake.session.settings)
                    isInstructor = (socket.handshake.session.settings.chat.roomName.toLowerCase() !== data.roomId);
                if (session.user) {
                    setSessionVars({isInstructor: isInstructor, username: session.user.username, isAdmin: !isInstructor});
                    callback({username: session.user.username, success: true});
                } else {
                    var token = uuidv4();
                    setSessionVar("redirectTo", "/#/v1/"+data.roomName+"?nsp="+this.owner);
                    callback({success: true});
                }

            }.bind(this));

            socket.on("logout", function (callback) {
                this.sendMessage(socket.connectedRoom, {
                    username: "[System]",
                    msg: socket.handshake.session.username + " has left the room.",
                    timestamp: moment().valueOf(),
                    type: "system",
                    hidden: true
                }, function (err, result) {
                    if (!this.findRoomAdapter(socket.connectedRoom)) delete this.rooms[socket.connectedRoom];
                }.bind(this));


                destroySession();

                callback({});
            }.bind(this));

            // disconnect user handling
            socket.on('disconnect', function () {

                if (!socket.connectedRoom) return;

                socket.leave(socket.connectedRoom, function () {
                    if (socket.handshake.session.username) this.sendMessage(socket.connectedRoom, {
                        username: "[System]",
                        msg: socket.handshake.session.username + " has left the room.",
                        timestamp: moment().valueOf(),
                        type: "system",
                        hidden: true
                    }, function (err, result) {
                        if (!this.findRoomAdapter(socket.connectedRoom)) delete this.rooms[socket.connectedRoom];
                    }.bind(this));

                    //logout user after gone for 5min
                    // TODO: Maybe implement this but removed due to buggy

                    // clearTimeout(ios.timeOuts[socket.handshake.session.id]);
                    // ios.timeOuts[socket.handshake.session.id] = setTimeout(function () {
                    // console.log("deleting session: "+socket.handshake.session.id);
                    // setSessionVars({username: null, userAvatar: null, connectedRoom: null, connected: false});
                    // }, 300000);

                    var online_member = [];
                    var i = this.findRoomAdapter(socket.connectedRoom);
                    if (!i) return this.nsp.to(socket.connectedRoom).emit('online-members', online_member);
                    for (var clientId in i.sockets) {
                        temp1 = {
                            "username": this.nsp.connected[clientId].username,
                            "userAvatar": this.nsp.connected[clientId].userAvatar
                        };
                        online_member.push(temp1);
                    }
                    this.nsp.to(socket.connectedRoom).emit('online-members', online_member);
                }.bind(this));

            }.bind(this));

            socket.on("get-status", function (callback) {
                this.getStatus(function (err, result) {
                    callback(result);
                });
            }.bind(this));

        }.bind(this));
    }.bind(this));

};

LectureNsp.prototype.on = function (event, callback) {
    this.nsp.on(event, callback);
};

LectureNsp.prototype.emit = function (event, data, callback) {
    this.nsp.emit(event, data, callback);
};


LectureNsp.prototype.bindToSocket = function (event, callback) {
    this.binds.push({e: event, cb: callback})
};

LectureNsp.prototype.getStatus = function (callback) {

        this.db.collection("classrooms").find({owner: this.owner}).toArray(function (err, classrooms) {
            if (err) return callback(err, null);
            var status = {};
            classrooms.forEach(function (room) {

                var adapter = this.findRoomAdapter(room.roomName);
                var count = 0;
                if (!adapter) count = 0;
                else count = Object.keys(adapter.sockets).length;

                status[room.roomName] = {
                    online: count
                };

            }.bind(this));

            callback(null, status);
        }.bind(this));

};

module.exports = {ChatNsp: ChatNsp, LectureNsp: LectureNsp};