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

    this.owner = owner;

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
                    if (callback) callback(null, result);
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

    }.bind(this));
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

LectureNsp.prototype.listen = function () {
    this.nsp.on("connection", function (socket) {

        for (var e in this.binds) {
            socket.on(e, binds[e](socket));
        }

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

        socket.on("new user", function (data, callback) {
            data.roomId = data.roomId.toLowerCase();

            this.findRoom(data.roomId, function (err, classroom) {
                if (!classroom) return callback({success: false, message: "Room does not exist"});
                if (this.findClient(data.roomId, data.username)) {
                    callback({success: false, message: "Use different username."});
                } else {
                    if (data.token) {
                        retrieveStudent(data, function (err, student) {
                            if (err) return callback({success: false, message: "Invalid id"}, null);
                            setSessionVar("utorid", student.utorid);
                        })

                    } else if (data.isJoin && classroom.invite) {
                        return callback({success: false, message: "Room is invite only"});
                    }
                    if (socket.handshake.session.userAvatar) data.userAvatar = socket.handshake.session.userAvatar;
                    setSessionVars({username: data.username, userAvatar: data.userAvatar, initials: data.initials});

                    callback({success: true});
                }
            }.bind(this));
            //if (!data.isJoin) clients = {sockets:[]};
        }.bind(this));

        socket.on("join-room", function (data, callback) {

                if (!data.roomId) return socket.disconnect();
                data.roomId = data.roomId.toLowerCase();

                this.findRoom(data.roomId, function (err, room) {
                    if (!room) return callback({success: false, message: "Room does not exist"});
                    var nameExists = this.findClient(data.roomName, data.username);
                    if (nameExists && !socket.handshake.session.isInstructor && !socket.handshake.session.isAdmin) {
                        destroySession();
                        return callback({success: false, message: "Use different username."});
                    }
                    if (socket.handshake.session.username) {
                        if (room && room.invite && !socket.handshake.session.isInstructor && !socket.handshake.session.utorid && !socket.handshake.session.isAdmin) {
                            destroySession();
                            return callback({success: false, message: "Room is invite only."});
                        }

                        socket.join(data.roomId, function () {

                            this.sendMessage(data.roomId, {
                                username: "[System]",
                                msg: socket.handshake.session.username + " has joined the room.",
                                timestamp: moment().valueOf(),
                                type: "system",
                                hidden: true
                            });

                            room = this.findRoomAdapter(data.roomId);
                            socket.connectedRoom = data.roomId;

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

            var isRoomAdmin = false;
            if (data.roomName && session.settings) {
                isRoomAdmin = (session.settings.chat.roomName === data.roomName);
            }
            var username = session.username;
            if (!username) callback({});
            else callback({username: username, avatar: session.userAvatar, isAdmin: session.isAdmin, isRoomAdmin: isRoomAdmin});
        });


        socket.on('get-online-members', function(data){
            var online_member = [];
            var i = this.findRoomAdapter(data.roomName);
            if (!i) return socket.emit('online-members', online_member);

            for (var clientId in i.sockets) {
                temp1 = {"username": this.nsp.connected[clientId].handshake.session.username, "userAvatar":this.nsp.connected[clientId].handshake.session.userAvatar};

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
        socket.on('send-message', function(data, callback){
            data.type = "chat";
            if (socket.handshake.session.username) {
                data.username = socket.handshake.session.username;
                data.userAvatar = socket.handshake.session.userAvatar;
                data.initials = socket.handshake.session.initials;
                data.msgTime = moment().format('LT');
                data.timestamp = moment().valueOf();
                data.isInstructor = false;

                data.isInstructor = socket.handshake.session.isAdmin || socket.handshake.session.isInstructor;
                this.findRoomAdapter(socket.connectedRoom).messageHistory.push(data);
                if(data.hasMsg){
                    this.sendMessage(socket.connectedRoom, data, function (err, result) {

                        if (callback) callback({success:!!result});
                    });

                }else if(data.hasFile){
                    if(data.istype == "image"){
                        this.nsp.to(socket.connectedRoom).emit('new message image', data);
                        callback({success:true});
                    } else if(data.istype == "music"){
                        this.nsp.to(socket.connectedRoom).emit('new message music', data);
                        callback({success:true});
                    } else if(data.istype == "PDF"){
                        this.nsp.to(socket.connectedRoom).emit('new message PDF', data);
                        callback({success:true});
                    }
                }else{
                    socket.disconnect();
                }
            }
        }.bind(this));

        socket.on("logout", function (callback) {
            destroySession();

            callback({});
        });

        // disconnect user handling
        socket.on('disconnect', function () {

            if (!socket.connectedRoom) return;

            if (socket.connectedRoom) socket.leave(socket.connectedRoom, function () {
                this.sendMessage(socket.connectedRoom, {
                    username: "[System]",
                    msg: socket.handshake.session.username + " has left the room.",
                    timestamp: moment().valueOf(),
                    type: "system",
                    hidden: true
                });

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

        socket.on('delete-message', function(data, callback){
            var history = findRoom(socket.connectedRoom).messageHistory;
            var index = history.findIndex(function(item, i) {
                return (item.msgTime === data.msgTime && item.username === data.username && item.msg === data.msg);
            });
            if (index > -1)
                history.splice(index, 1);
            ios.sockets.to(socket.connectedRoom).emit('delete message', data);
            callback({success:true});
        });

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
    MongoClient.connect(constants.dbUrl, function (err, db) {
        db.collection("classrooms").find({owner: this.owner}).toArray(function (err, classrooms) {
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
    }.bind(this));
};

module.exports = {ChatNsp: ChatNsp, LectureNsp: LectureNsp};