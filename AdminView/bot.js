// socker.io client wrapper for the creation of bots that interact with chat

var io = require("socket.io-client");

function Bot(params) {
    this.name = params.name;

    this.secret = params.secret;
    this.owner = params.owner;

    this.host = params.host;
    this.port = params.port;

    this.socket = io(this.host+":"+this.port, {timeout: params.timeout, reconnectionAttempts: 10, reconnectionDelay: 2000});
}

Bot.prototype.connect = function (callback) {
    this.socket.on("connect", function () {
        this.socket.emit("new bot", {username: this.name, userAvatar: 'avatar1.jpg', secret: this.secret, owner: this.owner}, function (result) {

            callback(result);

        });
    }.bind(this));

};

Bot.prototype.disconnect = function () {

};

Bot.prototype.on = function (event, callback) {
    this.socket.on(event, callback);
};

Bot.prototype.emit = function (event, data) {
    this.socket.emit(event, data);
};

Bot.prototype.join = function (roomName, callback) {
    this.socket.emit("join-room", {roomId: roomName}, function (result) {
        callback(result);
    })
};



module.exports = Bot;