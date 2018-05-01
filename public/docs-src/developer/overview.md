# Developer Documentation

??? "Authors"
    Jun Zheng (junthehacker), Daniel Hugh (hughdani)

This documentation is aimed to provide developers a better understanding of the project. It also includes some very important API documentation.

## Requirements

You must have the following installed:

* npm
* Node.js
* MongoDB

## Running the Application Locally

1. Download the source code at [https://github.com/bestlkh/ice-MC2](https://github.com/bestlkh/ice-MC2).
2. Run `npm install`.
3. Start MongoDB.
4. Run `npm run dev`.

!!! caution "Windows Developers"
    Instead run `node app.js & gulp dev`. To fully exit from the application, you will need to kill the background task `node app.js`.


This will start up a development server that will watch for file changes. A browser window will open to the default server hosted on [http://localhost:3000](http://localhost:3000).

## Project Layout

```
+ AdminView/       - Self explaintory
+ public/          - Everything that will be served with Node.js
| ---+ app/        - Controllers, libs etc.
| ---|---+ dist/   - Gulp's destination for compiled files 
| ---+ docs-src/   - Documentation source
| ---+ docs/       - Compiled documentation
| ---+ landing/    - Landing page
| ---+ lib/        - External libs
| ---+ login/      - Login page
| ---+ register/   - Register page
| ---+ index.html  - Angular enterence point
+ app.js           - Primary Node.js script
+ gulp.js          - Gulp task file
```