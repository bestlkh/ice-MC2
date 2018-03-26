const config = require('../../config/config');

module.exports = {
    /**
     * Get basic system information route
     * GET /v1
     */
    getBasicSystemInformation: function(req, res){
        res.send({
            'name': 'MC^2',
            'version': config.version
        })
    }
}
