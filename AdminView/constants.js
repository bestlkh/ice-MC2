var constants = {
    adminIndexPath: "./public/app/views/admin/index.html",
    views: ["mail", "chat", "students", "chatSettings"],
    dbUrl: "mongodb://127.0.0.1:27017/control",
    smtp: {
        username: "",
        password: "",
        host: "smtp-mail.outlook.com",
        port: 587
    },
    // oauth information can be found on the application portal for microsoft stuff except for the secret
    // DO NOT commit this stuff to git
    oauth: {
        secret: "G6V9z9osCjrSD3JcnMmSjev",
        appId: "2ab8afcb-7dfe-429f-b5a6-a0a9f46e592f",
        scope: ["https://outlook.office.com/Mail.Send", "https://outlook.office.com/user.readbasic.all"],
        callbackURL: 'https://127.0.0.1:8080/v1/api/admin/auth/outlook/callback',

        tokenURL: "https://login.microsoftonline.com/common/oauth2/v2.0/token"
    },
    emailTemplate: "Dear STAB52 student,\n\nHere is a link to use MC2: {link}\nClick to access MC2.\n\nIf you have any technical problems, please send email to Wannie Chen(wannie.chen@mail.utoronto.ca) or Ryan Lee (khryan.lee@mail.utoronto.ca)"
};

constants.oauth.authURL = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id="+constants.oauth.appId+"&redirect_uri="+constants.oauth.callbackURL+"&response_type=code&scope="+constants.oauth.scope;
constants.oauth.authURL = constants.oauth.authURL.replace(/,/g, "+");
module.exports = constants;