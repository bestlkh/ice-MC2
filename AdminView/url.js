var constants = require("./constants.js");
var prompt = require("prompt");
var MongoClient = require('mongodb').MongoClient;

var CustomUrl = function (data) {
    this.redirect = "/#/v1/{roomName}?nsp={nsp}";
    this.redirect = this.redirect.replace("{roomName}", data.roomName).replace("{nsp}", data.nsp);

    this.name = data.name;
};

var schema = {
    properties: {
        name: {
            validator: /^[a-zA-Z0-9]+$/,
            warning: 'Url code must be only letters, numbers',
            description: "Enter the custom url code:",
            required: true
        },
        roomName: {
            required: true,
            validator: /^[a-zA-Z0-9]+$/,
            warning: 'Room name must be only letters, numbers',
            description: "Enter the room name:",
        },
        nsp: {
            required: true,
            validator: /^[a-zA-Z0-9]+$/,
            warning: 'Namespace must be only letters, numbers',
            description: "Enter the namespace:",
        }
    }
};

prompt.message = "";
prompt.delimiter = "";

console.log("Creating a custom url for a classroom in MC2.");
prompt.start();

prompt.get(schema, function (err, result) {
    MongoClient.connect(constants.dbUrl, function (err, db) {
        var url = new CustomUrl(result);
        db.collection("urls").insertOne(url, function (err, result) {
            console.log("Successfully created a custom link at: /join/"+url.name+".");
            db.close();
        })
    });
});