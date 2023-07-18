
const sequelize = require('../datasource.js');
const DataTypes = require('sequelize').DataTypes;

const Message = sequelize.define('Message', {
    content: {
        type: DataTypes.STRING,
    },
});
module.exports = Message;
