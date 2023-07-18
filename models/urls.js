const sequelize = require('../datasource.js');
const DataTypes = require('sequelize').DataTypes;

const Url = sequelize.define('Urls', {
    name: {
        type: DataTypes.STRING,
    },
    redirect: {
        type: DataTypes.STRING,
    }
});

module.exports = Url;
