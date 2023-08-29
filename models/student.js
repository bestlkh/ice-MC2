const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../datasource.js");

const Student = sequelize.define("Student", {
  utorid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
});
module.exports = Student;
