var constants = require("./constants.js");
var prompt = require("prompt");
var MongoClient = require("mongodb").MongoClient;

const sequelize = require("../datasource.js");
const Urls = require("./models/urls.js");

var CustomUrl = function (data) {
  this.redirect = "/#/v1/{roomName}?nsp={nsp}";
  this.redirect = this.redirect
    .replace("{roomName}", data.roomName)
    .replace("{nsp}", data.nsp);

  this.name = data.name;
};

var schema = {
  properties: {
    name: {
      validator: /^[a-zA-Z0-9]+$/,
      warning: "Url code must be only letters, numbers",
      description: "Enter the custom url code:",
      required: true,
    },
    roomName: {
      required: true,
      validator: /^[a-zA-Z0-9]+$/,
      warning: "Room name must be only letters, numbers",
      description: "Enter the room name:",
    },
    nsp: {
      required: true,
      validator: /^[a-zA-Z0-9]+$/,
      warning: "Namespace must be only letters, numbers",
      description: "Enter the namespace:",
    },
  },
};

prompt.message = "";
prompt.delimiter = "";

console.log("Creating a custom url for a classroom in MC2.");
prompt.start();

prompt.get(schema, function (err, result) {
  sequelize
    .authenticate()
    .then(function (err) {
      console.log("Connection has been established successfully.");
    })
    .catch(function (err) {
      console.log("Unable to connect to the database:", err);
    });
  var url = new CustomUrl(result);
  const urlModel = Urls.create({ name: url.name, redirect: url.redirect });
});
