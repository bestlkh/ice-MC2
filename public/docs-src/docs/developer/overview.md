# MC^2 Project Developer Documentation

```
Author: Jun Zheng (junthehacker)
```

This documentation is aimed to provide developer a better understanding of the project. It also includes some very important API documentation.

Full source of the project in available at [https://github.com/bestlkh/ice-MC2](https://github.com/bestlkh/ice-MC2).

## Project Layout

```
+ AdminView/       - Self explaintory
+ public/          - Everything that will be served with Node.js
| ---+ app/        - Controllers, libs etc.
| ---+ docs-src/   - Documentation source
| ---+ docs/       - Compiled documentation
| ---+ landing/    - Landing page
| ---+ lib/        - External libs
| ---+ login/      - Login page
| ---+ register/   - Register page
| ---+ index.html  - Angular enterence point
+ app.js           - Primary Node.js script
```