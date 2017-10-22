# MC^2=E

A collaborative math equation editing software.

### Setup Your Environment

Software needed:

* Node.js / NPM
* Less.js `npm install less -g`
* Less.js clean CSS plugin `npm install less-plugin-clean-css -g`

#### Less.js CSS Pre-processor

**Old CSS files are still linked for compatibility. But please start using LESS.**

Less.js is used for development, make sure you have Less.js CLI installed using NPM.

```bash
$ npm install less -g
```

All less files are located under `app/styles`.

You must compile two files:
* `app/styles/chatroom/main.less` compile to `app/styles/chatroom/main.min.css`
* `app/styles/ice/main.less` compile to `app/styles/ice/main.min.css`

I highly recommend using JetBrains WebStorm as your IDE, simply add a Less file watcher, and you are done.

Example file watcher setup (if you are using Windows, locate `lessc.cmd` and use that as `Program`):

![](https://i.imgur.com/DTFarw3.png)