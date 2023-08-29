const { DataTypes } = require('sequelize');
const sequelize = require('../datasource.js');
const { Student } = require('./student.js');

const Settings = sequelize.define('Settings', {
    username: {
        type: DataTypes.STRING,
    },
});

module.exports = Settings;
