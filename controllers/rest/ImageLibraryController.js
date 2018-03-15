const config = require('../../config/config');

module.exports = {
    getAllAccredited: function(req, res){
        res.send(config.accreditedImageLibraries);
    }
}
