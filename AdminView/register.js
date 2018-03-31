var constants = require("./constants.js");
var crypto = require("crypto");
var prompt = require("prompt");
var MongoClient = require('mongodb').MongoClient;


var User = function(user){
    var salt = crypto.randomBytes(16).toString('base64');
    var hash = crypto.createHmac('sha512', salt);
    hash.update(user.password);
    this.username = user.username;
    this.salt = salt;
    this.saltedHash = hash.digest('base64');
    this.userAvatar = user.userAvatar;
};

var schema = {
    properties: {
        username: {
            validator: /^[a-zA-Z0-9\-]+$/,
            warning: 'Username must be only letters, numbers or dashes',
            description: "Enter username:"
        },
        password: {
            hidden: true,
            replace: '*',
            required: true
        },
        userAvatar: {

        }
    }
};

prompt.message = "";
prompt.delimiter = "";

console.log("Creating account for AdminView in MC2.");
prompt.start();

prompt.get(schema, function (err, result) {
    MongoClient.connect(constants.dbUrl, function (err, db) {
        var user = new User(result);
        db.collection("users").insertOne(user, function (err, result) {
            console.log("Successfully created admin account.");
            db.close();
        })
    });
});
