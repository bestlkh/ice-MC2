var constants = {
    adminIndexPath: "./public/app/views/admin/index.html",
    views: ["mail", "chat", "students", "chatSettings"],
    dbUrl: "mongodb://127.0.0.1:27017/control",
    smtp: {
        username: "",
        password: "",
        host: "smtp-mail.outlook.com",
        port: 587
    }

};
module.exports = constants;