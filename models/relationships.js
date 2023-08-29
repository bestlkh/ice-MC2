const Room = require("./rooms.js");
const Message = require("./messages.js");
const Student = require("./student.js");
const Ta = require("./ta.js");

Room.hasMany(Message);
Message.belongsTo(Room);
Student.belongsTo(Room);
Room.hasMany(Student);
Ta.belongsTo(Room);
Room.hasMany(Ta);