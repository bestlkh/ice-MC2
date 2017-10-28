var express = require('express');			// express module
var app = express();						// initiating express app
var http = require('http');					// http module
http.globalAgent.maxSockets = 100;			// limiting socket connections to 100
var bodyParser = require('body-parser');	// body-parser module for reading request body
var fs = require('fs');						// fs module for handling file operations
var server = http.createServer(app);		// creating server
var io = require('socket.io');				// using sockets
var ios = io.listen(server);				// listening sockets
var formidable = require('formidable');		// file upload module
var util = require('util');
const uuidv4 = require('uuid-v4');
var moment = require("moment");

const AdminView = require("./AdminView");

var MongoClient = require('mongodb').MongoClient;

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

var session = require('express-session')({
    secret: 'AdminView',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false,
        sameSite: false
    }
});
app.use(session);
var sharedsession = require("express-socket.io-session");
ios.use(sharedsession(session, {
    autoSave:true
}));

var AdminController =  new AdminView(ios, app);


// Initializing Variables
//var nickname = [];
var i = [];
var x = [];
var online_member = [];
var temp1;
var socket_id;
var socket_data;
var files_array  = [];
var expiryTime = 8;
var routineTime = 1;

var port = process.env.PORT || 8080;
server.listen(port);		// server starting on port '8080'

// cofiguring body-parser
app.use(bodyParser.json({	// setting json limit 	
    limit: 1024 * 10000
}));
app.use(bodyParser.text({ 	// setting text limit
    limit: 1024 * 10000
}));
app.use(bodyParser.raw({ 	// setting raw limit
    limit: 1024 * 10000
}));
app.use(bodyParser.urlencoded({		// setting url encoding
        extended: true
}));
//static file configuration
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/app/upload/images'));
app.use(express.static(__dirname + '/public/app/upload/music'));
app.use(express.static(__dirname + '/public/app/upload/doc'));
app.use(express.static(__dirname + '/public/app/views/*'));

// CORS Issue Fix
app.use(function(req, res, next) {														
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function findClient(clients, username) {
	if (!clients) return null;
	for (var clientId in clients.sockets) {

		if (ios.sockets.connected[clientId].handshake.session.username === username) {
			return ios.sockets.connected[clientId];
		}
	}
	return null;
}

function findRoom(roomId) {
	return ios.sockets.adapter.rooms[roomId];
}

ios.timeOuts = {};

//sockets handling
ios.on('connection', function(socket){

    // if (socket.handshake.session.id) {
    // 	console.log("clearing timeout: "+socket.handshake.session.id);
    // 	clearTimeout(ios.timeOuts[socket.handshake.session.id]);
    // }

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

	socket.on("check-session", function (data, callback) {

        var session = socket.handshake.session;
        var isRoomAdmin = false;
        if (data.roomName && session.settings) {
			isRoomAdmin = (session.settings.chat.roomName === data.roomName);
		}
		var username = session.username;
		if (!username) callback({});
		else callback({username: username, avatar: session.userAvatar, room: session.connectedRoom, isAdmin: session.isAdmin, isRoomAdmin: isRoomAdmin});
    });

    function sendMessage(roomName, message) {
        ios.sockets.to(roomName).emit("new message", message);

        var room = findRoom(roomName);
		if (room && room.admin) {
            MongoClient.connect("mongodb://127.0.0.1:27017/control", function (err, db) {
            	var admin = room.admin;
            	if (!admin) return;
                db.collection("chatHistory").updateOne({
                    sessionId: room.sessionId,
                    owner: admin.handshake.session.username,
                    roomName: roomName
                }, {$push: {messages: message}}, {upsert: true}, function (err, result) {

                });
            });
        }
    }



	socket.on("join-room", function(data, callback) {
		if (!data.roomId) return socket.disconnect();
        data.roomId = data.roomId.toLowerCase();
        var room = findRoom(data.roomId);
        var nameExists = findClient(room, data.username);
        if (nameExists && !socket.handshake.session.isInstructor && !socket.handshake.session.isAdmin) {
        	destroySession();
        	return callback({success:false, message: "Use different username."});
		}
		if (socket.handshake.session.username) {
            if (room && room.inviteOnly && !socket.handshake.session.isInstructor && !socket.handshake.session.utorid && !socket.handshake.session.isAdmin) {
                destroySession();
                return callback({success: false, message: "Room is invite only."});
            }
			socket.leave(socket.handshake.session.connectedRoom, function () {
                sendMessage(data.roomId, {username: "[System]", msg: socket.handshake.session.username+ " has joined the room.", timestamp: moment().valueOf(), type: "system", hidden: true});
                socket.join(data.roomId, function () {

                    //console.log(socket.username+" joined room "+ data.roomId);

                    room = findRoom(data.roomId);

                    if (socket.handshake.session.settings && socket.handshake.session.settings.chat)
                    	socket.handshake.session.isInstructor = (socket.handshake.session.settings.chat.roomName !== data.roomId);
					else socket.handshake.session.isInstructor = false;

					if (socket.handshake.session.isAdmin && !socket.handshake.session.isInstructor) {
                        ios.sockets.adapter.rooms[data.roomId].admin = socket;
						if (!room.sessionId) room.sessionId = uuidv4();
						room.inviteOnly = socket.handshake.session.settings.chat.invite;
						if (socket.handshake.session.connectedRoom && findRoom(socket.handshake.session.connectedRoom)) {
							findRoom(socket.handshake.session.connectedRoom).admin = null;
						}

					}



                    setSessionVar('connectedRoom', data.roomId);

					if (!room.messageHistory) room.messageHistory = [];

					var history = room.messageHistory.slice();
					history.push({msg: "You have joined room "+ data.roomId+".", type: "system", timestamp: moment().valueOf()});
					socket.emit('new message multi', history);
					callback({success: true});
                });
            });

		} else {
            socket.emit('new message', {msg: "Error failed to joined room "+ data.roomId+".", type: "system", timestamp: moment().valueOf()});
            destroySession();
            callback({success: false});
		}
    });


	//TODO: verify username is alphanumeric
	socket.on('new user', function(data, callback){
		data.roomId = data.roomId.toLowerCase();
        var clients = ios.sockets.adapter.rooms[data.roomId];

        if (!clients && data.isJoin) return callback({success: false, message: "Room does not exist."});
        else if (clients && !data.isJoin) return callback({success: false, message: "Room already exists."});
		//if (!data.isJoin) clients = {sockets:[]};
		if(findClient(clients, data.username))
			{
				callback({success:false, message: "Use different username."});
			} else {
				if (data.token) {
                    MongoClient.connect("mongodb://127.0.0.1:27017/control", function (err, db) {
                        db.collection('settings').findOne({'chat.roomName': data.roomId}, function (err, setting) {
                            var owner = setting.user;
                            db.collection("students").findOne({owner: owner}, function (err, students) {
                                var student = findOne(students.students, {token: data.token});
                                if (!student) return callback({success: false, message: "Invalid id."});

                                setSessionVar("utorid", student.utorid);
                                setSessionVar("isTA", student.isTA);
                            })
                        });
                    });

				} else if (data.isJoin && clients.inviteOnly) {
					return callback({success: false, message: "Room is invite only"});
				}
            	if (socket.handshake.session.userAvatar) data.userAvatar = socket.handshake.session.userAvatar;
				setSessionVars({username: data.username, userAvatar: data.userAvatar});

            	callback({success:true});
			}
	});

	// sending online members list
	socket.on('get-online-members', function(data){
		var online_member = [];
		var i = ios.sockets.adapter.rooms[socket.handshake.session.connectedRoom];
		if (!i) return ios.sockets.emit('online-members', online_member);

		for (var clientId in i.sockets) {
            temp1 = {"username": ios.sockets.connected[clientId].handshake.session.username, "userAvatar":ios.sockets.connected[clientId].handshake.session.userAvatar};

            if (socket.handshake.session.isAdmin) {
            	temp1.utorid = ios.sockets.connected[clientId].handshake.session.utorid;
			}
			if (ios.sockets.connected[clientId].handshake.session.isAdmin || ios.sockets.connected[clientId].handshake.session.isInstructor) {
            	temp1.isInstructor = true;
			}
            online_member.push(temp1);
		}
		socket.emit('online-members', online_member);
	});

	// sending new message
	socket.on('send-message', function(data, callback){
		data.type = "chat";
		if (socket.handshake.session.username) {
			data.username = socket.handshake.session.username;
			data.userAvatar = socket.handshake.session.userAvatar;
			data.initials = data.username.slice(0, 2);
			data.msgTime = moment().format('LT');
			data.isTA = socket.handshake.session.isTA;
			data.isInstructor = false;

            data.isInstructor = socket.handshake.session.isAdmin || socket.handshake.session.isInstructor;
			findRoom(socket.handshake.session.connectedRoom).messageHistory.push(data);
			if(data.hasMsg){
                ios.sockets.to(socket.handshake.session.connectedRoom).emit('new message', data);
				callback({success:true});
			}else if(data.hasFile){
				if(data.istype == "image"){
                    ios.sockets.to(socket.handshake.session.connectedRoom).emit('new message image', data);
					callback({success:true});
				} else if(data.istype == "music"){
                    ios.sockets.to(socket.handshake.session.connectedRoom).emit('new message music', data);
					callback({success:true});
				} else if(data.istype == "PDF"){
                    ios.sockets.to(socket.handshake.session.connectedRoom).emit('new message PDF', data);
					callback({success:true});
				}
			}else{
				socket.disconnect();
			}
		}
	});

	socket.on("logout", function (callback) {
		setSessionVars({username: null, connected: null, connectedRoom: null});

		callback({});
    });
	
	// disconnect user handling 
	socket.on('disconnect', function () {
		//delete nickname[socket.username];

        //delete socket.username;



		sendMessage(socket.handshake.session.connectedRoom, {username: "[System]", msg: socket.handshake.session.username+ " has left the room.", timestamp: moment().valueOf(), type: "system", hidden: true});

		//logout user after gone for 5min
		// TODO: Maybe implement this but removed due to buggy

        // clearTimeout(ios.timeOuts[socket.handshake.session.id]);
        // ios.timeOuts[socket.handshake.session.id] = setTimeout(function () {
			// console.log("deleting session: "+socket.handshake.session.id);
			// setSessionVars({username: null, userAvatar: null, connectedRoom: null, connected: false});
        // }, 300000);

        var online_member = [];
        var i = ios.sockets.adapter.rooms[socket.handshake.session.connectedRoom];
        if (!i) return ios.sockets.emit('online-members', online_member);
        for (var clientId in i.sockets) {
            temp1 = {"username": ios.sockets.connected[clientId].username, "userAvatar":ios.sockets.connected[clientId].userAvatar};
            online_member.push(temp1);
        }
        ios.sockets.to(socket.handshake.session.connectedRoom).emit('online-members', online_member);
    });
});

// route for uploading images asynchronously
app.post('/v1/uploadImage',function (req, res){
	var imgdatetimenow = Date.now();
	var form = new formidable.IncomingForm({
      	uploadDir: __dirname + '/public/app/upload/images',
      	keepExtensions: true
      });

	form.on('end', function() {
      res.end();
    });
    
    form.parse(req,function(err,fields,files){
		var data = { 
				username : fields.username,
				userAvatar : fields.userAvatar, 
				repeatMsg : true, 
				hasFile : fields.hasFile, 
				isImageFile : fields.isImageFile, 
				istype : fields.istype, 
				showme : fields.showme, 
				dwimgsrc : fields.dwimgsrc, 
				dwid : fields.dwid,
				serverfilename : baseName(files.file.path), 
				msgTime : fields.msgTime,
				filename : files.file.name,
				size : bytesToSize(files.file.size)
		};
	    var image_file = { 
		        dwid : fields.dwid,
		        filename : files.file.name,
		        filetype : fields.istype,
		        serverfilename : baseName(files.file.path),
		        serverfilepath : files.file.path,
		        expirytime : imgdatetimenow + (3600000 * expiryTime)           
		};
		files_array.push(image_file);
		ios.sockets.emit('new message image', data);
    });
});

// route for uploading audio asynchronously
app.post('/v1/uploadAudio',function (req, res){
	var userName, useravatar, hasfile, ismusicfile, isType, showMe, DWimgsrc, DWid, msgtime;
	var imgdatetimenow = Date.now();
	var form = new formidable.IncomingForm({
      	uploadDir: __dirname + '/public/app/upload/music',
      	keepExtensions: true
      });


	form.on('end', function() {
      res.end();
    });
    form.parse(req,function(err,fields,files){
		console.log("files : ",files);
		console.log("fields : ", fields);
		var data = { 
				username : fields.username, 
				userAvatar : fields.userAvatar, 
				repeatMsg : true, 
				hasFile : fields.hasFile, 
				isMusicFile : fields.isMusicFile, 
				istype : fields.istype, 
				showme : fields.showme, 
				dwimgsrc : fields.dwimgsrc, 
				dwid : fields.dwid,
				serverfilename : baseName(files.file.path), 
				msgTime : fields.msgTime,
				filename : files.file.name,
				size : bytesToSize(files.file.size)
		};
	    var audio_file = { 
		        dwid : fields.dwid,
		        filename : files.file.name,
		        filetype : fields.istype,
		        serverfilename : baseName(files.file.path),
		        serverfilepath : files.file.path,
		        expirytime : imgdatetimenow + (3600000 * expiryTime)           
	    };
	    files_array.push(audio_file);
		ios.sockets.emit('new message music', data);
    });
});

// route for uploading document asynchronously
app.post('/v1/uploadPDF',function (req, res){
	var imgdatetimenow = Date.now();
	var form = new formidable.IncomingForm({
      	uploadDir: __dirname + '/public/app/upload/doc',
      	keepExtensions: true
      });

	form.on('end', function() {
      res.end();
    });
    form.parse(req,function(err,fields,files){
		var data = { 
				username : fields.username, 
				userAvatar : fields.userAvatar, 
				repeatMsg : true, 
				hasFile : fields.hasFile, 
				isPDFFile : fields.isPDFFile, 
				istype : fields.istype, 
				showme : fields.showme, 
				dwimgsrc : fields.dwimgsrc, 
				dwid : fields.dwid,
				serverfilename : baseName(files.file.path), 
				msgTime : fields.msgTime,
				filename : files.file.name,
				size : bytesToSize(files.file.size)
		};
	    var pdf_file = { 
		        dwid : fields.dwid,
		        filename : files.file.name,
		        filetype : fields.istype,
		        serverfilename : baseName(files.file.path),
		        serverfilepath : files.file.path,
		        expirytime : imgdatetimenow + (3600000 * expiryTime)           
	    };
	    files_array.push(pdf_file);
		ios.sockets.emit('new message PDF', data);
    });
});

// route for checking requested file , does exist on server or not
app.post('/v1/getfile', function(req, res){
    var data = req.body.dwid;
    var filenm = req.body.filename;
    var dwidexist = false;
    var req_file_data;
    for(var i = 0; i<files_array.length; i++)
    {
        if(files_array[i].dwid == data)
        {
            dwidexist = true;
            req_file_data = files_array[i];
        }
    }

    // CASE 1 : File Exists
    if(dwidexist == true)
    {
    	//CASE 2 : File Expired and Deleted
        if(req_file_data.expirytime < Date.now())
        {
	        var deletedfileinfo = { 
                isExpired : true,
	            expmsg : "File has beed removed."
	        	};
	            fs.unlink(req_file_data.serverfilepath, function(err){
	               	if (err) {
	                   	return console.error(err);
	                }
	    				res.send(deletedfileinfo);           
	            });
               var index = files_array.indexOf(req_file_data);
               files_array.splice(index,1);           
        }else{
        	// CASE 3 : File Exist and returned serverfilename in response
            var fileinfo = {
            	isExpired : false, 
            	filename : req_file_data.filename,            
            	serverfilename : req_file_data.serverfilename };
            res.send(fileinfo);
        }
    }else{  
    		// CASE 4 : File Doesn't Exists.       
	    	var deletedfileinfo = { 
	                isExpired : true,
	                expmsg : "File has beed removed."
	        };
	        res.send(deletedfileinfo);       
        }
});

// Routine Clean up call
setInterval(function() {routine_cleanup();}, (3600000 * routineTime));

// Size Conversion
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i]; 
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}
//get file name from server file path
function baseName(str)
{
   var base = new String(str).substring(str.lastIndexOf('/') + 1);
   return base;
}

// Routine cleanup function (files delete after specific interval)
function routine_cleanup()
{
    for(var i=0; i<files_array.length; i++)
    {
            if(Date.now() > files_array[i].expirytime)
            {
                fs.unlink(files_array[i].serverfilepath, function(err) 
                          {
                   if (err) {
                       return console.error(err);
                            }
                            });
                   files_array.splice(i,1);
            }
    }
}
