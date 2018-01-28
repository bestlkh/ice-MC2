var MongoClient = require('mongodb').MongoClient;
var constants = require("./constants.js");
var csv = require('csv');

// For old chat message data structure

function Session(data, date, lec) {
    this.name = data.roomName;
    this.date = date;
    this.lec = lec;
    this.students = [];

}

function Student(data) {
    this.username = data.username;
    this.utorid = data.utorid;
    this.messages = [];

}

Student.prototype.getTotalMessages = function () {
    return this.messages.length;
};

function findOne(list, params) {
    var result;
    list.every(function (user) {
        var accepted = Object.keys(params).every(function (item) {
            return (user[item] === params[item])
        });
        if (accepted) {
            result = (user);
            return false;
        }
        return true;
    });
    return result;
}

MongoClient.connect(constants.dbUrl, function (err, db) {
    db.collection("chatHistory").find({}).toArray(function (err, history) {
        let sessions = [];
        let reg = /(.*)lec0?([1-9])/;
        history.forEach(function (session) {
            let match = reg.exec(session.roomName);
            if (match) {

                let sess = new Session(session, match[1], match[2]);
                sessions.push(sess);


                session.messages.forEach(function (message) {
                    if (!findOne(sess.students, {utorid: message.utorid})) sess.students.push(new Student(message));

                    let student = findOne(sess.students, {utorid: message.utorid});


                    student.messages.push(message);
                });




            }

        });

        sessions.forEach(function (session) {
            console.log("Session: "+session.name);

            session.students.forEach(function (student) {
                console.log("\tutorid: "+student.utorid+", messages: "+student.getTotalMessages());
            });
        });

    });
});