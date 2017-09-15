var constants = {
    adminIndexPath: "./public/app/views/admin/index.html",
    views: ["dashboard", "chat", "students", "chatSettings"],
    dbUrl: "mongodb://127.0.0.1:27017/control",
    smtp: {
        username: "",
        password: "",
        host: "smtp.gmail.com"
    },
    // oauth information can be found on the application portal for microsoft stuff except for the secret
    // DO NOT commit this stuff to git
    oauth: {
        secret: "",
        appId: ""
    }
};

module.exports = constants;