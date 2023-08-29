const sequelize = require("../datasource.js");
const DataTypes = require("sequelize").DataTypes;

const Message = sequelize.define("Message", {
  username: DataTypes.STRING,
  message: DataTypes.STRING,
  roomId: DataTypes.STRING,
});
module.exports = Message;
