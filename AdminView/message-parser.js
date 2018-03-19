var MongoClient = require('mongodb').MongoClient;
var constants = require("./constants.js");
var csv = require('csv');
var fs = require("fs");

function Session(data) {
    this.name = data.roomName;
    this.students = [];

}

function Student(data) {
    this.username = data.username;
    this.utorid = data.utorid;
    this.messages = [];
    this.isInstructor = data.isInstructor;
    this.isTA = data.isTA;
}

Student.prototype.getTotalMessages = function () {
    return this.messages.length;
};

Student.prototype.toCSV = function () {
    return {username: this.username, utorid: this.utorid, "total messages": this.getTotalMessages(), "isInstructor": this.isInstructor, "isTA": this.isTA};
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

var parseStudents = function (db, sessionId, callback) {
    db.collection("chatHistory").findOne({sessionId: sessionId, deleted: null}, function (err, history) {
        let sessions = [];
        let reg = /(.*)/;
        var session = history;

        let sess = new Session(session);
        sessions.push(sess);

        session.messages.forEach(function (message) {
            if (!message.utorid) return;
            if (!findOne(sess.students, {utorid: message.utorid})) sess.students.push(new Student(message));

            let student = findOne(sess.students, {utorid: message.utorid});


            student.messages.push(message);
        });


        var csvStruct = [];
        sessions.forEach(function (session) {

            session.students.forEach(function (student) {

                var s = student.toCSV();
                s.session = session.name;
                csvStruct.push(s);

            });
        });

        callback(null, csvStruct);




    });
};

module.exports = parseStudents;