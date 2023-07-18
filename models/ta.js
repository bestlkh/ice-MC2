const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Ta = sequelize.define('Ta', {
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
module.exports = Ta;
