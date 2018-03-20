# Developer Documentation

```
Authors: Jun Zheng (junthehacker), Daniel Hugh (hughdani)
```

This documentation is aimed to provide developer a better understanding of the project. It also includes some very important API documentation.

## Start Developing

1. Download the source code at [https://github.com/bestlkh/ice-MC2](https://github.com/bestlkh/ice-MC2).
2. Run `npm run dev`

This will start up a development server that will watch for file changes. By default the server will be hosted on [http://localhost:3000](http://localhost:3000).

!!! caution "Windows Developers"
    Instead run `node app.js & gulp dev`. To properly exit from the application, you may need to kill the background task `node app.js`.

## Project Layout

```
+ AdminView/       - Self explaintory
+ public/          - Everything that will be served with Node.js
| ---+ app/        - Controllers, libs etc.
| ------+ dist/    - destination for Gulp compiled files
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