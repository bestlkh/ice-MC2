let express = require("express"); // express module
let app = express(); // initiating express app
let http = require("http"); // http module
http.globalAgent.maxSockets = 100; // limiting socket connections to 100
let bodyParser = require("body-parser"); // body-parser module for reading request body
let fs = require("fs"); // fs module for handling file operations
let server = http.createServer(app); // creating server
let io = require("socket.io"); // using sockets
let ios = io.listen(server); // listening sockets
let formidable = require("formidable"); // file upload module
let moment = require("moment");
let Message = require("./message");

const sequelize = require("./datasource.js");
const AdminView = require("./AdminView");
const DbMessage = require("./models/messages.js");
const ChatNsp = require("./chatNsp").ChatNsp;
const constants = require("./AdminView/constants");
const Mc2Bot = require("./chatBot.js");


function findOne(list, params) {
  let result;
  list.every(function (user) {
    let accepted = Object.keys(params).every(function (item) {
      return user[item] === params[item];
    });
    if (accepted) {
      result = user;
      return false;
    }
    return true;
  });
  return result;
}

let session = require("express-session")({
  secret: "AdminView",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: false,
    secure: false,
    sameSite: false,
  },
});
app.use(session);
let sharedsession = require("express-socket.io-session");
ios.use(
  sharedsession(session, {
    autoSave: true,
  }),
);

let AdminController = new AdminView(ios, app, session);
//const BotController = new Mc2Bot(ios, app);

const Controllers = {
  SystemInfoController: require("./controllers/rest/SystemInfoController"),
  ImageLibraryController: require("./controllers/rest/ImageLibraryController"),
};

app.get("/api/v1", Controllers.SystemInfoController.getBasicSystemInformation);
app.get(
  "/api/v1/image-libraries",
  Controllers.ImageLibraryController.getAllAccredited,
);

// Initializing Variables
//var nickname = [];
let i = [];
let x = [];
let online_member = [];
let temp1;
let socket_id;
let socket_data;
let files_array = [];
let expiryTime = 8;
let routineTime = 1;

const useDatabase = process.env.DB_SAVE || false;
if(useDatabase) {
  connectToDb().then();
  console.log("Using database\n");
} else {
  console.log("Not using database, will not keep info on \n ");
}

let port = process.env.PORT || 8080;
server.listen(port, function () {
  // server starting on port '8080'
  console.log("Server listening at port %d", port);
});

// cofiguring body-parser
app.use(
  bodyParser.json({
    // setting json limit
    limit: 1024 * 10000,
  }),
);
app.use(
  bodyParser.text({
    // setting text limit
    limit: 1024 * 10000,
  }),
);
app.use(
  bodyParser.raw({
    // setting raw limit
    limit: 1024 * 10000,
  }),
);
app.use(
  bodyParser.urlencoded({
    // setting url encoding
    extended: true,
  }),
);
//static file configuration
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/app/upload/images"));
app.use(express.static(__dirname + "/public/app/upload/music"));
app.use(express.static(__dirname + "/public/app/upload/doc"));
app.use(express.static(__dirname + "/public/app/views/*"));

// CORS Issue Fix
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

function findClient(clients, username) {
  if (!clients) return null;
  for (let clientId in clients.sockets) {
    if (
      ios.sockets.connected[clientId].handshake.session.username === username
    ) {
      return ios.sockets.connected[clientId];
    }
  }
  return null;
}

function findRoom(roomId) {
  return ios.sockets.adapter.rooms[roomId];
}

let chat = new ChatNsp("", ios);

//sockets handling

chat.on("connection", function (socket) {

  function setSessionVar(variable, value) {
    socket.handshake.session[variable] = value;
    socket.handshake.session.save();
  }

  function setSessionVars(object) {
    for (let variable in object) {
      socket.handshake.session[variable] = object[variable];
    }
    socket.handshake.session.save();
  }

  function destroySession() {
    setSessionVars({ username: null, userAvatar: null });
  }

  socket.on("check-session", function (data, callback) {
    let session = socket.handshake.session;
    let username = session.username;
    if (!username) callback({});
    else callback({ username: username, avatar: session.userAvatar });
  });

  socket.on("join-room", function (data, callback) {
    if (!data.roomId) return socket.disconnect();
    data.roomId = data.roomId.toLowerCase();
    let room = findRoom(data.roomId);
    let nameExists = findClient(room, data.username);
    if (nameExists) {
      destroySession();
      return callback({ success: false, message: "Use different username." });
    }
    if (socket.handshake.session.username) {
      socket.leave(socket.connectedRoom, function () {
        ios.sockets.to(socket.connectedRoom).emit("new message", {
          username: "[System]",
          msg: socket.handshake.session.username + " has joined the room.",
          timestamp: moment().valueOf(),
          type: "system",
          hidden: true,
        });
        socket.join(data.roomId, function () {
          room = findRoom(data.roomId);
          socket.connectedRoom = data.roomId;

          if (!room.messageHistory) room.messageHistory = [];

          let history = room.messageHistory.slice();
          history.push({
            msg: "You have joined room " + data.roomId + ".",
            type: "system",
            timestamp: moment().valueOf(),
          });
          socket.emit("new message multi", history);
          callback({ success: true });
        });
      });
    } else {
      socket.emit("new message", {
        msg: "Error failed to joined room " + data.roomId + ".",
        type: "system",
        timestamp: moment().valueOf(),
      });
      destroySession();
      callback({ success: false });
    }
  });

  //TODO: verify username is alphanumeric
  socket.on("new user", function (data, callback) {
    data.roomId = data.roomId.toLowerCase();
    let clients = ios.sockets.adapter.rooms[data.roomId];

    if (!clients && data.isJoin)
      return callback({
        success: false,
        message: "Room does not exist.",
        issue: "noRoomExists",
      });
    else if (clients && !data.isJoin)
      return callback({
        success: false,
        message: "Room already exists.",
        issue: "roomExists",
      });
    //if (!data.isJoin) clients = {sockets:[]};
    if (findClient(clients, data.username)) {
      callback({
        success: false,
        message: "Use a different username.",
        issue: "userExists",
      });
    } else {
      if (data.userAvatar && isNaN(data.userAvatar))
        return callback({ success: false });
      else data.userAvatar = "Avatar" + data.userAvatar + ".jpg";

      if (socket.handshake.session.userAvatar && !data.userAvatar) {
        data.userAvatar = socket.handshake.session.userAvatar;
      }

      setSessionVars({ username: data.username, userAvatar: data.userAvatar });

      callback({ success: true });
    }
  });

  // sending online members list
  socket.on("get-online-members", function (data) {
    let online_member = [];
    let i = ios.sockets.adapter.rooms[socket.connectedRoom];
    if (!i) return ios.sockets.emit("online-members", online_member);

    for (let clientId in i.sockets) {
      temp1 = {
        username: ios.sockets.connected[clientId].handshake.session.username,
        userAvatar:
          ios.sockets.connected[clientId].handshake.session.userAvatar,
      };
      online_member.push(temp1);
    }
    socket.emit("online-members", online_member);
  });

  // sending new message
  socket.on("send-message", function (data, callback) {
    data.type = "chat";
    if (socket.handshake.session.username) {
      let message = new Message.Message(data, socket.handshake.session);
      if(useDatabase) {
        addMessage(socket.handshake.session.username, socket.connectedRoom, message);
      }
      findRoom(socket.connectedRoom).messageHistory.push(message);

      ios.sockets.to(socket.connectedRoom).emit("new message", message);
      callback({ success: true });
    } else {
      socket.disconnect();
    }
  });

  socket.on("send-image", function (data, callback) {
    data.type = "chat";
    if (socket.handshake.session.username) {
      if (!Message.ImageMessage.validate(data))
        return callback({ success: false });
      let message = new Message.ImageMessage(data, socket.handshake.session);

      findRoom(socket.connectedRoom).messageHistory.push(message);
      ios.sockets.to(socket.connectedRoom).emit("new message", message);
      callback({ success: true });
    }
  });

  socket.on("logout", function (callback) {
    destroySession();

    callback({});
  });

  // disconnect user handling
  socket.on("disconnect", function () {
    //delete nickname[socket.username];

    //delete socket.username;

    ios.sockets.to(socket.connectedRoom).emit("new message", {
      username: "[System]",
      msg: socket.handshake.session.username + " has left the room.",
      timestamp: moment().valueOf(),
      type: "system",
      hidden: true,
    });
    if (socket.connectedRoom)
      socket.leave(socket.connectedRoom, function () {
        //logout user after gone for 5min
        // TODO: Maybe implement this but removed due to buggy

        // clearTimeout(ios.timeOuts[socket.handshake.session.id]);
        // ios.timeOuts[socket.handshake.session.id] = setTimeout(function () {
        // console.log("deleting session: "+socket.handshake.session.id);
        // setSessionVars({username: null, userAvatar: null, connectedRoom: null, connected: false});
        // }, 300000);

        let online_member = [];
        let i = ios.sockets.adapter.rooms[socket.connectedRoom];
        if (!i) return ios.sockets.emit("online-members", online_member);
        for (let clientId in i.sockets) {
          temp1 = {
            username: ios.sockets.connected[clientId].username,
            userAvatar: ios.sockets.connected[clientId].userAvatar,
          };
          online_member.push(temp1);
        }
        ios.sockets
          .to(socket.connectedRoom)
          .emit("online-members", online_member);
      });
  });
});

// route for uploading images asynchronously
app.post("/v1/uploadImage", function (req, res) {
  let imgdatetimenow = Date.now();
  let form = new formidable.IncomingForm({
    uploadDir: __dirname + "/public/app/upload/images",
    keepExtensions: true,
  });

  form.on("end", function () {
    res.end();
  });

  form.parse(req, function (err, fields, files) {
    let data = {
      username: fields.username,
      userAvatar: fields.userAvatar,
      repeatMsg: true,
      hasFile: fields.hasFile,
      isImageFile: fields.isImageFile,
      istype: fields.istype,
      showme: fields.showme,
      dwimgsrc: fields.dwimgsrc,
      dwid: fields.dwid,
      serverfilename: baseName(files.file.path),
      msgTime: fields.msgTime,
      filename: files.file.name,
      size: bytesToSize(files.file.size),
    };
    let image_file = {
      dwid: fields.dwid,
      filename: files.file.name,
      filetype: fields.istype,
      serverfilename: baseName(files.file.path),
      serverfilepath: files.file.path,
      expirytime: imgdatetimenow + 3600000 * expiryTime,
    };
    files_array.push(image_file);
    ios.sockets.emit("new message image", data);
  });
});

// route for uploading audio asynchronously
app.post("/v1/uploadAudio", function (req, res) {
  let userName,
    useravatar,
    hasfile,
    ismusicfile,
    isType,
    showMe,
    DWimgsrc,
    DWid,
    msgtime;
  let imgdatetimenow = Date.now();
  let form = new formidable.IncomingForm({
    uploadDir: __dirname + "/public/app/upload/music",
    keepExtensions: true,
  });

  form.on("end", function () {
    res.end();
  });
  form.parse(req, function (err, fields, files) {
    console.log("files : ", files);
    console.log("fields : ", fields);
    let data = {
      username: fields.username,
      userAvatar: fields.userAvatar,
      repeatMsg: true,
      hasFile: fields.hasFile,
      isMusicFile: fields.isMusicFile,
      istype: fields.istype,
      showme: fields.showme,
      dwimgsrc: fields.dwimgsrc,
      dwid: fields.dwid,
      serverfilename: baseName(files.file.path),
      msgTime: fields.msgTime,
      filename: files.file.name,
      size: bytesToSize(files.file.size),
    };
    let audio_file = {
      dwid: fields.dwid,
      filename: files.file.name,
      filetype: fields.istype,
      serverfilename: baseName(files.file.path),
      serverfilepath: files.file.path,
      expirytime: imgdatetimenow + 3600000 * expiryTime,
    };
    files_array.push(audio_file);
    ios.sockets.emit("new message music", data);
  });
});

// route for uploading document asynchronously
app.post("/v1/uploadPDF", function (req, res) {
  let imgdatetimenow = Date.now();
  let form = new formidable.IncomingForm({
    uploadDir: __dirname + "/public/app/upload/doc",
    keepExtensions: true,
  });

  form.on("end", function () {
    res.end();
  });
  form.parse(req, function (err, fields, files) {
    let data = {
      username: fields.username,
      userAvatar: fields.userAvatar,
      repeatMsg: true,
      hasFile: fields.hasFile,
      isPDFFile: fields.isPDFFile,
      istype: fields.istype,
      showme: fields.showme,
      dwimgsrc: fields.dwimgsrc,
      dwid: fields.dwid,
      serverfilename: baseName(files.file.path),
      msgTime: fields.msgTime,
      filename: files.file.name,
      size: bytesToSize(files.file.size),
    };
    let pdf_file = {
      dwid: fields.dwid,
      filename: files.file.name,
      filetype: fields.istype,
      serverfilename: baseName(files.file.path),
      serverfilepath: files.file.path,
      expirytime: imgdatetimenow + 3600000 * expiryTime,
    };
    files_array.push(pdf_file);
    ios.sockets.emit("new message PDF", data);
  });
});

// route for checking requested file , does exist on server or not
app.post("/v1/getfile", function (req, res) {
  let data = req.body.dwid;
  let filenm = req.body.filename;
  let dwidexist = false;
  let req_file_data;
  for (let i = 0; i < files_array.length; i++) {
    if (files_array[i].dwid == data) {
      dwidexist = true;
      req_file_data = files_array[i];
    }
  }

  // CASE 1 : File Exists
  if (dwidexist == true) {
    //CASE 2 : File Expired and Deleted
    if (req_file_data.expirytime < Date.now()) {
      var deletedfileinfo = {
        isExpired: true,
        expmsg: "File has beed removed.",
      };
      fs.unlink(req_file_data.serverfilepath, function (err) {
        if (err) {
          return console.error(err);
        }
        res.send(deletedfileinfo);
      });
      let index = files_array.indexOf(req_file_data);
      files_array.splice(index, 1);
    } else {
      // CASE 3 : File Exist and returned serverfilename in response
      let fileinfo = {
        isExpired: false,
        filename: req_file_data.filename,
        serverfilename: req_file_data.serverfilename,
      };
      res.send(fileinfo);
    }
  } else {
    // CASE 4 : File Doesn't Exists.
    var deletedfileinfo = {
      isExpired: true,
      expmsg: "File has beed removed.",
    };
    res.send(deletedfileinfo);
  }
});

async function connectToDb() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: { drop: false } });
    console.log("Database connected");
  } catch(error) {
    console.log("Unable to connect to database:", error);
  }
}

function addMessage(username, roomId, message) {
  try {
    const messageData = new DbMessage({
      username: username,
      roomId: roomId,
      message: message.msg,
    });
    messageData.save();

  } catch(error) {
    console.error("Unable to save message to database:", error);
  }
}

// Routine Clean up call
setInterval(function () {
  routine_cleanup();
}, 3600000 * routineTime);

// Size Conversion
function bytesToSize(bytes) {
  let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "n/a";
  let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  if (i == 0) return bytes + " " + sizes[i];
  return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}
//get file name from server file path
function baseName(str) {
  let base = new String(str).substring(str.lastIndexOf("/") + 1);
  return base;
}

// Routine cleanup function (files delete after specific interval)
function routine_cleanup() {
  for (let i = 0; i < files_array.length; i++) {
    if (Date.now() > files_array[i].expirytime) {
      fs.unlink(files_array[i].serverfilepath, function (err) {
        if (err) {
          return console.error(err);
        }
      });
      files_array.splice(i, 1);
    }
  }
}
