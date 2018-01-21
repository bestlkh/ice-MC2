var Bot = require("./bot");
var moment = require("moment");
var request = require("request");
var wolfram = require('wolfram-alpha').createClient("H4UG6P-RQ7VPWX6EW");
var domtoimage = require('dom-to-image');
const JSDOM = require("jsdom").JSDOM;


var wolfbot = new Bot({name: "wolfbot", host: "http://ice.trentu.ca", port: 8080, timeout: 5000, nsp: ""});
var api = "http://api.wolframalpha.com/v2/query?input={query}&appid=";
var cmdRe = /!wolf\s(.+)/;
var imgTemplate = "[mc2-image]{url}";

const Datauri = require('datauri');
const datauri = new Datauri();
var webshot = require('webshot');

wolfbot.connect({username: wolfbot.name, initials: "wb", userAvatar: 'Avatar1.jpg', roomId: "test", isJoin:true}, function (result) {

    wolfbot.join('test', function (result) {


        wolfbot.emit("send-message", {msg: "hello world!", hasMsg: true}, function (result) {

        });

    });

    wolfbot.on("new message", function (data) {
        console.log("received message: ["+moment(data.timestamp).format("LT")+"] "+data.username+": "+data.msg);
        var match = cmdRe.exec(data.msg);

        if (match) {

            wolfram.query(match[1].replace(/\$+/g, "")).then(function (result) {

                var options = {
                    screenSize: {
                        width: 320
                        , height: 480
                    }
                    , shotSize: {
                        width: 320
                        , height: 'all'
                    },
                    siteType:'html'
                };
                var renderStream = webshot(parseResult(result), options);


                var streamToBuffer = require('stream-to-buffer');

                streamToBuffer(renderStream, function (err, buffer) {
                    datauri.format('.png', buffer);
                    wolfbot.emit("send-message", {msg: imgTemplate.replace("{url}", datauri.content), hasMsg: true}, function (result) {

                    });
                });


            });




        }

    });


});

var parseResult = function (result) {
    var html = "";

    result.forEach(function (pod) {
        html += "<p style='color: #909090; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;'>"+pod.title+"</p>";
        pod.subpods.forEach(function (sub) {
            if (sub.image) html += "<img style='max-width: 290px;' src='"+sub.image+"'/><p></p>";

        })
    });

    html = "<div style='background-color: #fff; padding: 5px; margin: auto;'>"+html+"</div>";
    return html;
};
