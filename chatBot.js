let Bot = require("./AdminView/bot.js");
const uuidv4 = require("uuid/v4");

let bot = new Bot(
  {
    name: "mc2bot", 
    host: "ws://localhost",
    port: 8081, 
    timeout: 5000, 
    nsp: "", 
  });

function Mc2Bot(socketController, expressApp, session) {
  this.ios = socketController;
  this.app = expressApp;
  this.session = session;

  this.init();
  console.log(bot.host + ":" + bot.port + bot.nsp);
}

Mc2Bot.prototype.init = function () {
  this.app.post("/v1/bot/joinRoom/:roomId", function (req, res) {
    console.log("POST /v1/bot/joinRoom/:roomId");
    let roomId = req.params.roomId.toLowerCase();
    bot.connect({
      username: "mc2bot",
      initials: "mb",
      roomId: roomId,
      userAvatar: '1',
    },
    function() {
      console.log("now joining room");
      bot.join(roomId, function () {
        bot.chat(roomId, "Hello, I am mc2bot");
      });
    });
    res.send("Bot join room");
  });
};

module.exports = Mc2Bot;