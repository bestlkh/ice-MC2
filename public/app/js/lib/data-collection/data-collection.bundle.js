!(function e(n, t, r) {
  function i(u, a) {
    if (!t[u]) {
      if (!n[u]) {
        var f = "function" == typeof require && require;
        if (!a && f) return f(u, !0);
        if (o) return o(u, !0);
        var c = new Error("Cannot find module '" + u + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      var l = (t[u] = { exports: {} });
      n[u][0].call(
        l.exports,
        function (e) {
          var t = n[u][1][e];
          return i(t || e);
        },
        l,
        l.exports,
        e,
        n,
        t,
        r,
      );
    }
    return t[u].exports;
  }
  for (
    var o = "function" == typeof require && require, u = 0;
    u < r.length;
    u++
  )
    i(r[u]);
  return i;
})(
  {
    1: [
      function (e, n, t) {
        var r =
          /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
        ((t = n.exports =
          function () {
            for (var e, n = "", r = 0; r < 32; r++)
              (e = (16 * t.random()) | 0),
                r > 4 && r < 21 && !(r % 4) && (n += "-"),
                (n += (12 === r ? 4 : 16 === r ? (3 & e) | 8 : e).toString(16));
            return n;
          }).isUUID = function (e) {
          return r.test(e);
        }),
          (t.random = function () {
            return Math.random();
          });
      },
      {},
    ],
    2: [
      function (e, n, t) {
        "use strict";
        window.DataCollection = { Logger: e("./logger/Logger") };
      },
      { "./logger/Logger": 3 },
    ],
    3: [
      function (e, n, t) {
        "use strict";
        var r = (function () {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })();
        var i = e("../util/User"),
          o = (function () {
            function e() {
              !(function (e, n) {
                if (!(e instanceof n))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
                (this._user = new i()),
                (this._logs = []);
            }
            return (
              r(e, [
                {
                  key: "log",
                  value: function (e) {
                    var n = { data: e, time: new Date().toLocaleString() };
                    console.log("New log pushed"),
                      console.log(JSON.stringify(n, null, null, 2)),
                      this._logs.push(n);
                  },
                },
                {
                  key: "logAction",
                  value: function (e) {
                    var n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : null;
                    this.log({ action: e, extra: n });
                  },
                },
              ]),
              e
            );
          })();
        n.exports = o;
      },
      { "../util/User": 4 },
    ],
    4: [
      function (e, n, t) {
        "use strict";
        var r = (function () {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })();
        var i = e("uuid-v4");
        function o(e) {
          for (
            var n = e + "=",
              t = decodeURIComponent(document.cookie).split(";"),
              r = 0;
            r < t.length;
            r++
          ) {
            for (var i = t[r]; " " == i.charAt(0); ) i = i.substring(1);
            if (0 == i.indexOf(n)) return i.substring(n.length, i.length);
          }
          return "";
        }
        var u = (function () {
          function e() {
            !(function (e, n) {
              if (!(e instanceof n))
                throw new TypeError("Cannot call a class as a function");
            })(this, e),
              o("mc2-dc-identifier")
                ? (this._identifier = o("mc2-dc-identifier"))
                : ((this._identifier = i()),
                  (function (e, n, t) {
                    var r = new Date();
                    r.setTime(r.getTime() + 24 * t * 60 * 60 * 1e3);
                    var i = "expires=" + r.toUTCString();
                    document.cookie = e + "=" + n + ";" + i + ";path=/";
                  })("mc2-dc-identifier", this._identifier, 365)),
              console.log(
                "Data collection identifier generated " + this._identifier,
              );
          }
          return (
            r(e, [
              {
                key: "getIdentifier",
                value: function () {
                  return this._identifier;
                },
              },
            ]),
            e
          );
        })();
        n.exports = u;
      },
      { "uuid-v4": 1 },
    ],
  },
  {},
  [2],
);
