const sequelize = require("../datasource.js");
const DataTypes = require("sequelize").DataTypes;

const Room = sequelize.define("Room", {
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = Room;
