!(function e(t, n, r) {
  function i(a, s) {
    if (!n[a]) {
      if (!t[a]) {
        var u = "function" == typeof require && require;
        if (!s && u) return u(a, !0);
        if (o) return o(a, !0);
        var c = new Error("Cannot find module '" + a + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      var l = (n[a] = { exports: {} });
      t[a][0].call(
        l.exports,
        function (e) {
          var n = t[a][1][e];
          return i(n || e);
        },
        l,
        l.exports,
        e,
        t,
        n,
        r,
      );
    }
    return n[a].exports;
  }
  for (
    var o = "function" == typeof require && require, a = 0;
    a < r.length;
    a++
  )
    i(r[a]);
  return i;
})(
  {
    1: [
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function n(e, t) {
            var n = (65535 & e) + (65535 & t);
            return (((e >> 16) + (t >> 16) + (n >> 16)) << 16) | (65535 & n);
          }
          function r(e, t, r, i, o, a) {
            return n(
              ((s = n(n(t, e), n(i, a))) << (u = o)) | (s >>> (32 - u)),
              r,
            );
            var s, u;
          }
          function i(e, t, n, i, o, a, s) {
            return r((t & n) | (~t & i), e, t, o, a, s);
          }
          function o(e, t, n, i, o, a, s) {
            return r((t & i) | (n & ~i), e, t, o, a, s);
          }
          function a(e, t, n, i, o, a, s) {
            return r(t ^ n ^ i, e, t, o, a, s);
          }
          function s(e, t, n, i, o, a, s) {
            return r(n ^ (t | ~i), e, t, o, a, s);
          }
          function u(e, t) {
            var r, u, c, l, f;
            (e[t >> 5] |= 128 << t % 32), (e[14 + (((t + 64) >>> 9) << 4)] = t);
            var p = 1732584193,
              d = -271733879,
              h = -1732584194,
              g = 271733878;
            for (r = 0; r < e.length; r += 16)
              (u = p),
                (c = d),
                (l = h),
                (f = g),
                (d = s(
                  (d = s(
                    (d = s(
                      (d = s(
                        (d = a(
                          (d = a(
                            (d = a(
                              (d = a(
                                (d = o(
                                  (d = o(
                                    (d = o(
                                      (d = o(
                                        (d = i(
                                          (d = i(
                                            (d = i(
                                              (d = i(
                                                d,
                                                (h = i(
                                                  h,
                                                  (g = i(
                                                    g,
                                                    (p = i(
                                                      p,
                                                      d,
                                                      h,
                                                      g,
                                                      e[r],
                                                      7,
                                                      -680876936,
                                                    )),
                                                    d,
                                                    h,
                                                    e[r + 1],
                                                    12,
                                                    -389564586,
                                                  )),
                                                  p,
                                                  d,
                                                  e[r + 2],
                                                  17,
                                                  606105819,
                                                )),
                                                g,
                                                p,
                                                e[r + 3],
                                                22,
                                                -1044525330,
                                              )),
                                              (h = i(
                                                h,
                                                (g = i(
                                                  g,
                                                  (p = i(
                                                    p,
                                                    d,
                                                    h,
                                                    g,
                                                    e[r + 4],
                                                    7,
                                                    -176418897,
                                                  )),
                                                  d,
                                                  h,
                                                  e[r + 5],
                                                  12,
                                                  1200080426,
                                                )),
                                                p,
                                                d,
                                                e[r + 6],
                                                17,
                                                -1473231341,
                                              )),
                                              g,
                                              p,
                                              e[r + 7],
                                              22,
                                              -45705983,
                                            )),
                                            (h = i(
                                              h,
                                              (g = i(
                                                g,
                                                (p = i(
                                                  p,
                                                  d,
                                                  h,
                                                  g,
                                                  e[r + 8],
                                                  7,
                                                  1770035416,
                                                )),
                                                d,
                                                h,
                                                e[r + 9],
                                                12,
                                                -1958414417,
                                              )),
                                              p,
                                              d,
                                              e[r + 10],
                                              17,
                                              -42063,
                                            )),
                                            g,
                                            p,
                                            e[r + 11],
                                            22,
                                            -1990404162,
                                          )),
                                          (h = i(
                                            h,
                                            (g = i(
                                              g,
                                              (p = i(
                                                p,
                                                d,
                                                h,
                                                g,
                                                e[r + 12],
                                                7,
                                                1804603682,
                                              )),
                                              d,
                                              h,
                                              e[r + 13],
                                              12,
                                              -40341101,
                                            )),
                                            p,
                                            d,
                                            e[r + 14],
                                            17,
                                            -1502002290,
                                          )),
                                          g,
                                          p,
                                          e[r + 15],
                                          22,
                                          1236535329,
                                        )),
                                        (h = o(
                                          h,
                                          (g = o(
                                            g,
                                            (p = o(
                                              p,
                                              d,
                                              h,
                                              g,
                                              e[r + 1],
                                              5,
                                              -165796510,
                                            )),
                                            d,
                                            h,
                                            e[r + 6],
                                            9,
                                            -1069501632,
                                          )),
                                          p,
                                          d,
                                          e[r + 11],
                                          14,
                                          643717713,
                                        )),
                                        g,
                                        p,
                                        e[r],
                                        20,
                                        -373897302,
                                      )),
                                      (h = o(
                                        h,
                                        (g = o(
                                          g,
                                          (p = o(
                                            p,
                                            d,
                                            h,
                                            g,
                                            e[r + 5],
                                            5,
                                            -701558691,
                                          )),
                                          d,
                                          h,
                                          e[r + 10],
                                          9,
                                          38016083,
                                        )),
                                        p,
                                        d,
                                        e[r + 15],
                                        14,
                                        -660478335,
                                      )),
                                      g,
                                      p,
                                      e[r + 4],
                                      20,
                                      -405537848,
                                    )),
                                    (h = o(
                                      h,
                                      (g = o(
                                        g,
                                        (p = o(
                                          p,
                                          d,
                                          h,
                                          g,
                                          e[r + 9],
                                          5,
                                          568446438,
                                        )),
                                        d,
                                        h,
                                        e[r + 14],
                                        9,
                                        -1019803690,
                                      )),
                                      p,
                                      d,
                                      e[r + 3],
                                      14,
                                      -187363961,
                                    )),
                                    g,
                                    p,
                                    e[r + 8],
                                    20,
                                    1163531501,
                                  )),
                                  (h = o(
                                    h,
                                    (g = o(
                                      g,
                                      (p = o(
                                        p,
                                        d,
                                        h,
                                        g,
                                        e[r + 13],
                                        5,
                                        -1444681467,
                                      )),
                                      d,
                                      h,
                                      e[r + 2],
                                      9,
                                      -51403784,
                                    )),
                                    p,
                                    d,
                                    e[r + 7],
                                    14,
                                    1735328473,
                                  )),
                                  g,
                                  p,
                                  e[r + 12],
                                  20,
                                  -1926607734,
                                )),
                                (h = a(
                                  h,
                                  (g = a(
                                    g,
                                    (p = a(p, d, h, g, e[r + 5], 4, -378558)),
                                    d,
                                    h,
                                    e[r + 8],
                                    11,
                                    -2022574463,
                                  )),
                                  p,
                                  d,
                                  e[r + 11],
                                  16,
                                  1839030562,
                                )),
                                g,
                                p,
                                e[r + 14],
                                23,
                                -35309556,
                              )),
                              (h = a(
                                h,
                                (g = a(
                                  g,
                                  (p = a(p, d, h, g, e[r + 1], 4, -1530992060)),
                                  d,
                                  h,
                                  e[r + 4],
                                  11,
                                  1272893353,
                                )),
                                p,
                                d,
                                e[r + 7],
                                16,
                                -155497632,
                              )),
                              g,
                              p,
                              e[r + 10],
                              23,
                              -1094730640,
                            )),
                            (h = a(
                              h,
                              (g = a(
                                g,
                                (p = a(p, d, h, g, e[r + 13], 4, 681279174)),
                                d,
                                h,
                                e[r],
                                11,
                                -358537222,
                              )),
                              p,
                              d,
                              e[r + 3],
                              16,
                              -722521979,
                            )),
                            g,
                            p,
                            e[r + 6],
                            23,
                            76029189,
                          )),
                          (h = a(
                            h,
                            (g = a(
                              g,
                              (p = a(p, d, h, g, e[r + 9], 4, -640364487)),
                              d,
                              h,
                              e[r + 12],
                              11,
                              -421815835,
                            )),
                            p,
                            d,
                            e[r + 15],
                            16,
                            530742520,
                          )),
                          g,
                          p,
                          e[r + 2],
                          23,
                          -995338651,
                        )),
                        (h = s(
                          h,
                          (g = s(
                            g,
                            (p = s(p, d, h, g, e[r], 6, -198630844)),
                            d,
                            h,
                            e[r + 7],
                            10,
                            1126891415,
                          )),
                          p,
                          d,
                          e[r + 14],
                          15,
                          -1416354905,
                        )),
                        g,
                        p,
                        e[r + 5],
                        21,
                        -57434055,
                      )),
                      (h = s(
                        h,
                        (g = s(
                          g,
                          (p = s(p, d, h, g, e[r + 12], 6, 1700485571)),
                          d,
                          h,
                          e[r + 3],
                          10,
                          -1894986606,
                        )),
                        p,
                        d,
                        e[r + 10],
                        15,
                        -1051523,
                      )),
                      g,
                      p,
                      e[r + 1],
                      21,
                      -2054922799,
                    )),
                    (h = s(
                      h,
                      (g = s(
                        g,
                        (p = s(p, d, h, g, e[r + 8], 6, 1873313359)),
                        d,
                        h,
                        e[r + 15],
                        10,
                        -30611744,
                      )),
                      p,
                      d,
                      e[r + 6],
                      15,
                      -1560198380,
                    )),
                    g,
                    p,
                    e[r + 13],
                    21,
                    1309151649,
                  )),
                  (h = s(
                    h,
                    (g = s(
                      g,
                      (p = s(p, d, h, g, e[r + 4], 6, -145523070)),
                      d,
                      h,
                      e[r + 11],
                      10,
                      -1120210379,
                    )),
                    p,
                    d,
                    e[r + 2],
                    15,
                    718787259,
                  )),
                  g,
                  p,
                  e[r + 9],
                  21,
                  -343485551,
                )),
                (p = n(p, u)),
                (d = n(d, c)),
                (h = n(h, l)),
                (g = n(g, f));
            return [p, d, h, g];
          }
          function c(e) {
            var t,
              n = "",
              r = 32 * e.length;
            for (t = 0; t < r; t += 8)
              n += String.fromCharCode((e[t >> 5] >>> t % 32) & 255);
            return n;
          }
          function l(e) {
            var t,
              n = [];
            for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1)
              n[t] = 0;
            var r = 8 * e.length;
            for (t = 0; t < r; t += 8)
              n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
            return n;
          }
          function f(e) {
            var t,
              n,
              r = "";
            for (n = 0; n < e.length; n += 1)
              (t = e.charCodeAt(n)),
                (r +=
                  "0123456789abcdef".charAt((t >>> 4) & 15) +
                  "0123456789abcdef".charAt(15 & t));
            return r;
          }
          function p(e) {
            return unescape(encodeURIComponent(e));
          }
          function d(e) {
            return c(u(l((t = p(e))), 8 * t.length));
            var t;
          }
          function h(e, t) {
            return (function (e, t) {
              var n,
                r,
                i = l(e),
                o = [],
                a = [];
              for (
                o[15] = a[15] = void 0,
                  i.length > 16 && (i = u(i, 8 * e.length)),
                  n = 0;
                n < 16;
                n += 1
              )
                (o[n] = 909522486 ^ i[n]), (a[n] = 1549556828 ^ i[n]);
              return (
                (r = u(o.concat(l(t)), 512 + 8 * t.length)),
                c(u(a.concat(r), 640))
              );
            })(p(e), p(t));
          }
          function g(e, t, n) {
            return t ? (n ? h(t, e) : f(h(t, e))) : n ? d(e) : f(d(e));
          }
          "function" == typeof define && define.amd
            ? define(function () {
                return g;
              })
            : "object" == typeof t && t.exports
            ? (t.exports = g)
            : (e.md5 = g);
        })(this);
      },
      {},
    ],
    2: [
      function (e, t, n) {
        !(function (e, n) {
          "use strict";
          "object" == typeof t && "object" == typeof t.exports
            ? (t.exports = e.document
                ? n(e, !0)
                : function (e) {
                    if (!e.document)
                      throw new Error(
                        "jQuery requires a window with a document",
                      );
                    return n(e);
                  })
            : n(e);
        })("undefined" != typeof window ? window : this, function (e, t) {
          "use strict";
          var n = [],
            r = e.document,
            i = Object.getPrototypeOf,
            o = n.slice,
            a = n.concat,
            s = n.push,
            u = n.indexOf,
            c = {},
            l = c.toString,
            f = c.hasOwnProperty,
            p = f.toString,
            d = p.call(Object),
            h = {};
          function g(e, t) {
            var n = (t = t || r).createElement("script");
            (n.text = e), t.head.appendChild(n).parentNode.removeChild(n);
          }
          var v = function (e, t) {
              return new v.fn.init(e, t);
            },
            y = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            m = /^-ms-/,
            b = /-([a-z])/g,
            x = function (e, t) {
              return t.toUpperCase();
            };
          function w(e) {
            var t = !!e && "length" in e && e.length,
              n = v.type(e);
            return (
              "function" !== n &&
              !v.isWindow(e) &&
              ("array" === n ||
                0 === t ||
                ("number" == typeof t && t > 0 && t - 1 in e))
            );
          }
          (v.fn = v.prototype =
            {
              jquery: "3.2.1",
              constructor: v,
              length: 0,
              toArray: function () {
                return o.call(this);
              },
              get: function (e) {
                return null == e
                  ? o.call(this)
                  : e < 0
                  ? this[e + this.length]
                  : this[e];
              },
              pushStack: function (e) {
                var t = v.merge(this.constructor(), e);
                return (t.prevObject = this), t;
              },
              each: function (e) {
                return v.each(this, e);
              },
              map: function (e) {
                return this.pushStack(
                  v.map(this, function (t, n) {
                    return e.call(t, n, t);
                  }),
                );
              },
              slice: function () {
                return this.pushStack(o.apply(this, arguments));
              },
              first: function () {
                return this.eq(0);
              },
              last: function () {
                return this.eq(-1);
              },
              eq: function (e) {
                var t = this.length,
                  n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
              },
              end: function () {
                return this.prevObject || this.constructor();
              },
              push: s,
              sort: n.sort,
              splice: n.splice,
            }),
            (v.extend = v.fn.extend =
              function () {
                var e,
                  t,
                  n,
                  r,
                  i,
                  o,
                  a = arguments[0] || {},
                  s = 1,
                  u = arguments.length,
                  c = !1;
                for (
                  "boolean" == typeof a &&
                    ((c = a), (a = arguments[s] || {}), s++),
                    "object" == typeof a || v.isFunction(a) || (a = {}),
                    s === u && ((a = this), s--);
                  s < u;
                  s++
                )
                  if (null != (e = arguments[s]))
                    for (t in e)
                      (n = a[t]),
                        a !== (r = e[t]) &&
                          (c &&
                          r &&
                          (v.isPlainObject(r) || (i = Array.isArray(r)))
                            ? (i
                                ? ((i = !1),
                                  (o = n && Array.isArray(n) ? n : []))
                                : (o = n && v.isPlainObject(n) ? n : {}),
                              (a[t] = v.extend(c, o, r)))
                            : void 0 !== r && (a[t] = r));
                return a;
              }),
            v.extend({
              expando: "jQuery" + ("3.2.1" + Math.random()).replace(/\D/g, ""),
              isReady: !0,
              error: function (e) {
                throw new Error(e);
              },
              noop: function () {},
              isFunction: function (e) {
                return "function" === v.type(e);
              },
              isWindow: function (e) {
                return null != e && e === e.window;
              },
              isNumeric: function (e) {
                var t = v.type(e);
                return (
                  ("number" === t || "string" === t) &&
                  !isNaN(e - parseFloat(e))
                );
              },
              isPlainObject: function (e) {
                var t, n;
                return (
                  !(!e || "[object Object]" !== l.call(e)) &&
                  (!(t = i(e)) ||
                    ("function" ==
                      typeof (n = f.call(t, "constructor") && t.constructor) &&
                      p.call(n) === d))
                );
              },
              isEmptyObject: function (e) {
                var t;
                for (t in e) return !1;
                return !0;
              },
              type: function (e) {
                return null == e
                  ? e + ""
                  : "object" == typeof e || "function" == typeof e
                  ? c[l.call(e)] || "object"
                  : typeof e;
              },
              globalEval: function (e) {
                g(e);
              },
              camelCase: function (e) {
                return e.replace(m, "ms-").replace(b, x);
              },
              each: function (e, t) {
                var n,
                  r = 0;
                if (w(e))
                  for (
                    n = e.length;
                    r < n && !1 !== t.call(e[r], r, e[r]);
                    r++
                  );
                else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
                return e;
              },
              trim: function (e) {
                return null == e ? "" : (e + "").replace(y, "");
              },
              makeArray: function (e, t) {
                var n = t || [];
                return (
                  null != e &&
                    (w(Object(e))
                      ? v.merge(n, "string" == typeof e ? [e] : e)
                      : s.call(n, e)),
                  n
                );
              },
              inArray: function (e, t, n) {
                return null == t ? -1 : u.call(t, e, n);
              },
              merge: function (e, t) {
                for (var n = +t.length, r = 0, i = e.length; r < n; r++)
                  e[i++] = t[r];
                return (e.length = i), e;
              },
              grep: function (e, t, n) {
                for (var r = [], i = 0, o = e.length, a = !n; i < o; i++)
                  !t(e[i], i) !== a && r.push(e[i]);
                return r;
              },
              map: function (e, t, n) {
                var r,
                  i,
                  o = 0,
                  s = [];
                if (w(e))
                  for (r = e.length; o < r; o++)
                    null != (i = t(e[o], o, n)) && s.push(i);
                else for (o in e) null != (i = t(e[o], o, n)) && s.push(i);
                return a.apply([], s);
              },
              guid: 1,
              proxy: function (e, t) {
                var n, r, i;
                if (
                  ("string" == typeof t && ((n = e[t]), (t = e), (e = n)),
                  v.isFunction(e))
                )
                  return (
                    (r = o.call(arguments, 2)),
                    ((i = function () {
                      return e.apply(t || this, r.concat(o.call(arguments)));
                    }).guid = e.guid =
                      e.guid || v.guid++),
                    i
                  );
              },
              now: Date.now,
              support: h,
            }),
            "function" == typeof Symbol &&
              (v.fn[Symbol.iterator] = n[Symbol.iterator]),
            v.each(
              "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
                " ",
              ),
              function (e, t) {
                c["[object " + t + "]"] = t.toLowerCase();
              },
            );
          var T = (function (e) {
            var t,
              n,
              r,
              i,
              o,
              a,
              s,
              u,
              c,
              l,
              f,
              p,
              d,
              h,
              g,
              v,
              y,
              m,
              b,
              x = "sizzle" + 1 * new Date(),
              w = e.document,
              T = 0,
              C = 0,
              k = ae(),
              E = ae(),
              j = ae(),
              S = function (e, t) {
                return e === t && (f = !0), 0;
              },
              D = {}.hasOwnProperty,
              A = [],
              N = A.pop,
              q = A.push,
              _ = A.push,
              O = A.slice,
              L = function (e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                  if (e[n] === t) return n;
                return -1;
              },
              H =
                "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
              B = "[\\x20\\t\\r\\n\\f]",
              P = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
              F =
                "\\[" +
                B +
                "*(" +
                P +
                ")(?:" +
                B +
                "*([*^$|!~]?=)" +
                B +
                "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
                P +
                "))|)" +
                B +
                "*\\]",
              M =
                ":(" +
                P +
                ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
                F +
                ")*)|.*)\\)|)",
              R = new RegExp(B + "+", "g"),
              I = new RegExp(
                "^" + B + "+|((?:^|[^\\\\])(?:\\\\.)*)" + B + "+$",
                "g",
              ),
              W = new RegExp("^" + B + "*," + B + "*"),
              $ = new RegExp("^" + B + "*([>+~]|" + B + ")" + B + "*"),
              z = new RegExp("=" + B + "*([^\\]'\"]*?)" + B + "*\\]", "g"),
              U = new RegExp(M),
              X = new RegExp("^" + P + "$"),
              V = {
                ID: new RegExp("^#(" + P + ")"),
                CLASS: new RegExp("^\\.(" + P + ")"),
                TAG: new RegExp("^(" + P + "|[*])"),
                ATTR: new RegExp("^" + F),
                PSEUDO: new RegExp("^" + M),
                CHILD: new RegExp(
                  "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                    B +
                    "*(even|odd|(([+-]|)(\\d*)n|)" +
                    B +
                    "*(?:([+-]|)" +
                    B +
                    "*(\\d+)|))" +
                    B +
                    "*\\)|)",
                  "i",
                ),
                bool: new RegExp("^(?:" + H + ")$", "i"),
                needsContext: new RegExp(
                  "^" +
                    B +
                    "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                    B +
                    "*((?:-\\d)?\\d*)" +
                    B +
                    "*\\)|)(?=[^-]|$)",
                  "i",
                ),
              },
              G = /^(?:input|select|textarea|button)$/i,
              Y = /^h\d$/i,
              Q = /^[^{]+\{\s*\[native \w/,
              J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
              K = /[+~]/,
              Z = new RegExp(
                "\\\\([\\da-f]{1,6}" + B + "?|(" + B + ")|.)",
                "ig",
              ),
              ee = function (e, t, n) {
                var r = "0x" + t - 65536;
                return r != r || n
                  ? t
                  : r < 0
                  ? String.fromCharCode(r + 65536)
                  : String.fromCharCode((r >> 10) | 55296, (1023 & r) | 56320);
              },
              te = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
              ne = function (e, t) {
                return t
                  ? "\0" === e
                    ? "�"
                    : e.slice(0, -1) +
                      "\\" +
                      e.charCodeAt(e.length - 1).toString(16) +
                      " "
                  : "\\" + e;
              },
              re = function () {
                p();
              },
              ie = me(
                function (e) {
                  return !0 === e.disabled && ("form" in e || "label" in e);
                },
                { dir: "parentNode", next: "legend" },
              );
            try {
              _.apply((A = O.call(w.childNodes)), w.childNodes),
                A[w.childNodes.length].nodeType;
            } catch (e) {
              _ = {
                apply: A.length
                  ? function (e, t) {
                      q.apply(e, O.call(t));
                    }
                  : function (e, t) {
                      for (var n = e.length, r = 0; (e[n++] = t[r++]); );
                      e.length = n - 1;
                    },
              };
            }
            function oe(e, t, r, i) {
              var o,
                s,
                c,
                l,
                f,
                h,
                y,
                m = t && t.ownerDocument,
                T = t ? t.nodeType : 9;
              if (
                ((r = r || []),
                "string" != typeof e || !e || (1 !== T && 9 !== T && 11 !== T))
              )
                return r;
              if (
                !i &&
                ((t ? t.ownerDocument || t : w) !== d && p(t), (t = t || d), g)
              ) {
                if (11 !== T && (f = J.exec(e)))
                  if ((o = f[1])) {
                    if (9 === T) {
                      if (!(c = t.getElementById(o))) return r;
                      if (c.id === o) return r.push(c), r;
                    } else if (
                      m &&
                      (c = m.getElementById(o)) &&
                      b(t, c) &&
                      c.id === o
                    )
                      return r.push(c), r;
                  } else {
                    if (f[2]) return _.apply(r, t.getElementsByTagName(e)), r;
                    if (
                      (o = f[3]) &&
                      n.getElementsByClassName &&
                      t.getElementsByClassName
                    )
                      return _.apply(r, t.getElementsByClassName(o)), r;
                  }
                if (n.qsa && !j[e + " "] && (!v || !v.test(e))) {
                  if (1 !== T) (m = t), (y = e);
                  else if ("object" !== t.nodeName.toLowerCase()) {
                    for (
                      (l = t.getAttribute("id"))
                        ? (l = l.replace(te, ne))
                        : t.setAttribute("id", (l = x)),
                        s = (h = a(e)).length;
                      s--;

                    )
                      h[s] = "#" + l + " " + ye(h[s]);
                    (y = h.join(",")),
                      (m = (K.test(e) && ge(t.parentNode)) || t);
                  }
                  if (y)
                    try {
                      return _.apply(r, m.querySelectorAll(y)), r;
                    } catch (e) {
                    } finally {
                      l === x && t.removeAttribute("id");
                    }
                }
              }
              return u(e.replace(I, "$1"), t, r, i);
            }
            function ae() {
              var e = [];
              return function t(n, i) {
                return (
                  e.push(n + " ") > r.cacheLength && delete t[e.shift()],
                  (t[n + " "] = i)
                );
              };
            }
            function se(e) {
              return (e[x] = !0), e;
            }
            function ue(e) {
              var t = d.createElement("fieldset");
              try {
                return !!e(t);
              } catch (e) {
                return !1;
              } finally {
                t.parentNode && t.parentNode.removeChild(t), (t = null);
              }
            }
            function ce(e, t) {
              for (var n = e.split("|"), i = n.length; i--; )
                r.attrHandle[n[i]] = t;
            }
            function le(e, t) {
              var n = t && e,
                r =
                  n &&
                  1 === e.nodeType &&
                  1 === t.nodeType &&
                  e.sourceIndex - t.sourceIndex;
              if (r) return r;
              if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
              return e ? 1 : -1;
            }
            function fe(e) {
              return function (t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e;
              };
            }
            function pe(e) {
              return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e;
              };
            }
            function de(e) {
              return function (t) {
                return "form" in t
                  ? t.parentNode && !1 === t.disabled
                    ? "label" in t
                      ? "label" in t.parentNode
                        ? t.parentNode.disabled === e
                        : t.disabled === e
                      : t.isDisabled === e ||
                        (t.isDisabled !== !e && ie(t) === e)
                    : t.disabled === e
                  : "label" in t && t.disabled === e;
              };
            }
            function he(e) {
              return se(function (t) {
                return (
                  (t = +t),
                  se(function (n, r) {
                    for (var i, o = e([], n.length, t), a = o.length; a--; )
                      n[(i = o[a])] && (n[i] = !(r[i] = n[i]));
                  })
                );
              });
            }
            function ge(e) {
              return e && void 0 !== e.getElementsByTagName && e;
            }
            (n = oe.support = {}),
              (o = oe.isXML =
                function (e) {
                  var t = e && (e.ownerDocument || e).documentElement;
                  return !!t && "HTML" !== t.nodeName;
                }),
              (p = oe.setDocument =
                function (e) {
                  var t,
                    i,
                    a = e ? e.ownerDocument || e : w;
                  return a !== d && 9 === a.nodeType && a.documentElement
                    ? ((h = (d = a).documentElement),
                      (g = !o(d)),
                      w !== d &&
                        (i = d.defaultView) &&
                        i.top !== i &&
                        (i.addEventListener
                          ? i.addEventListener("unload", re, !1)
                          : i.attachEvent && i.attachEvent("onunload", re)),
                      (n.attributes = ue(function (e) {
                        return (
                          (e.className = "i"), !e.getAttribute("className")
                        );
                      })),
                      (n.getElementsByTagName = ue(function (e) {
                        return (
                          e.appendChild(d.createComment("")),
                          !e.getElementsByTagName("*").length
                        );
                      })),
                      (n.getElementsByClassName = Q.test(
                        d.getElementsByClassName,
                      )),
                      (n.getById = ue(function (e) {
                        return (
                          (h.appendChild(e).id = x),
                          !d.getElementsByName || !d.getElementsByName(x).length
                        );
                      })),
                      n.getById
                        ? ((r.filter.ID = function (e) {
                            var t = e.replace(Z, ee);
                            return function (e) {
                              return e.getAttribute("id") === t;
                            };
                          }),
                          (r.find.ID = function (e, t) {
                            if (void 0 !== t.getElementById && g) {
                              var n = t.getElementById(e);
                              return n ? [n] : [];
                            }
                          }))
                        : ((r.filter.ID = function (e) {
                            var t = e.replace(Z, ee);
                            return function (e) {
                              var n =
                                void 0 !== e.getAttributeNode &&
                                e.getAttributeNode("id");
                              return n && n.value === t;
                            };
                          }),
                          (r.find.ID = function (e, t) {
                            if (void 0 !== t.getElementById && g) {
                              var n,
                                r,
                                i,
                                o = t.getElementById(e);
                              if (o) {
                                if (
                                  (n = o.getAttributeNode("id")) &&
                                  n.value === e
                                )
                                  return [o];
                                for (
                                  i = t.getElementsByName(e), r = 0;
                                  (o = i[r++]);

                                )
                                  if (
                                    (n = o.getAttributeNode("id")) &&
                                    n.value === e
                                  )
                                    return [o];
                              }
                              return [];
                            }
                          })),
                      (r.find.TAG = n.getElementsByTagName
                        ? function (e, t) {
                            return void 0 !== t.getElementsByTagName
                              ? t.getElementsByTagName(e)
                              : n.qsa
                              ? t.querySelectorAll(e)
                              : void 0;
                          }
                        : function (e, t) {
                            var n,
                              r = [],
                              i = 0,
                              o = t.getElementsByTagName(e);
                            if ("*" === e) {
                              for (; (n = o[i++]); )
                                1 === n.nodeType && r.push(n);
                              return r;
                            }
                            return o;
                          }),
                      (r.find.CLASS =
                        n.getElementsByClassName &&
                        function (e, t) {
                          if (void 0 !== t.getElementsByClassName && g)
                            return t.getElementsByClassName(e);
                        }),
                      (y = []),
                      (v = []),
                      (n.qsa = Q.test(d.querySelectorAll)) &&
                        (ue(function (e) {
                          (h.appendChild(e).innerHTML =
                            "<a id='" +
                            x +
                            "'></a><select id='" +
                            x +
                            "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                            e.querySelectorAll("[msallowcapture^='']").length &&
                              v.push("[*^$]=" + B + "*(?:''|\"\")"),
                            e.querySelectorAll("[selected]").length ||
                              v.push("\\[" + B + "*(?:value|" + H + ")"),
                            e.querySelectorAll("[id~=" + x + "-]").length ||
                              v.push("~="),
                            e.querySelectorAll(":checked").length ||
                              v.push(":checked"),
                            e.querySelectorAll("a#" + x + "+*").length ||
                              v.push(".#.+[+~]");
                        }),
                        ue(function (e) {
                          e.innerHTML =
                            "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                          var t = d.createElement("input");
                          t.setAttribute("type", "hidden"),
                            e.appendChild(t).setAttribute("name", "D"),
                            e.querySelectorAll("[name=d]").length &&
                              v.push("name" + B + "*[*^$|!~]?="),
                            2 !== e.querySelectorAll(":enabled").length &&
                              v.push(":enabled", ":disabled"),
                            (h.appendChild(e).disabled = !0),
                            2 !== e.querySelectorAll(":disabled").length &&
                              v.push(":enabled", ":disabled"),
                            e.querySelectorAll("*,:x"),
                            v.push(",.*:");
                        })),
                      (n.matchesSelector = Q.test(
                        (m =
                          h.matches ||
                          h.webkitMatchesSelector ||
                          h.mozMatchesSelector ||
                          h.oMatchesSelector ||
                          h.msMatchesSelector),
                      )) &&
                        ue(function (e) {
                          (n.disconnectedMatch = m.call(e, "*")),
                            m.call(e, "[s!='']:x"),
                            y.push("!=", M);
                        }),
                      (v = v.length && new RegExp(v.join("|"))),
                      (y = y.length && new RegExp(y.join("|"))),
                      (t = Q.test(h.compareDocumentPosition)),
                      (b =
                        t || Q.test(h.contains)
                          ? function (e, t) {
                              var n = 9 === e.nodeType ? e.documentElement : e,
                                r = t && t.parentNode;
                              return (
                                e === r ||
                                !(
                                  !r ||
                                  1 !== r.nodeType ||
                                  !(n.contains
                                    ? n.contains(r)
                                    : e.compareDocumentPosition &&
                                      16 & e.compareDocumentPosition(r))
                                )
                              );
                            }
                          : function (e, t) {
                              if (t)
                                for (; (t = t.parentNode); )
                                  if (t === e) return !0;
                              return !1;
                            }),
                      (S = t
                        ? function (e, t) {
                            if (e === t) return (f = !0), 0;
                            var r =
                              !e.compareDocumentPosition -
                              !t.compareDocumentPosition;
                            return (
                              r ||
                              (1 &
                                (r =
                                  (e.ownerDocument || e) ===
                                  (t.ownerDocument || t)
                                    ? e.compareDocumentPosition(t)
                                    : 1) ||
                              (!n.sortDetached &&
                                t.compareDocumentPosition(e) === r)
                                ? e === d || (e.ownerDocument === w && b(w, e))
                                  ? -1
                                  : t === d ||
                                    (t.ownerDocument === w && b(w, t))
                                  ? 1
                                  : l
                                  ? L(l, e) - L(l, t)
                                  : 0
                                : 4 & r
                                ? -1
                                : 1)
                            );
                          }
                        : function (e, t) {
                            if (e === t) return (f = !0), 0;
                            var n,
                              r = 0,
                              i = e.parentNode,
                              o = t.parentNode,
                              a = [e],
                              s = [t];
                            if (!i || !o)
                              return e === d
                                ? -1
                                : t === d
                                ? 1
                                : i
                                ? -1
                                : o
                                ? 1
                                : l
                                ? L(l, e) - L(l, t)
                                : 0;
                            if (i === o) return le(e, t);
                            for (n = e; (n = n.parentNode); ) a.unshift(n);
                            for (n = t; (n = n.parentNode); ) s.unshift(n);
                            for (; a[r] === s[r]; ) r++;
                            return r
                              ? le(a[r], s[r])
                              : a[r] === w
                              ? -1
                              : s[r] === w
                              ? 1
                              : 0;
                          }),
                      d)
                    : d;
                }),
              (oe.matches = function (e, t) {
                return oe(e, null, null, t);
              }),
              (oe.matchesSelector = function (e, t) {
                if (
                  ((e.ownerDocument || e) !== d && p(e),
                  (t = t.replace(z, "='$1']")),
                  n.matchesSelector &&
                    g &&
                    !j[t + " "] &&
                    (!y || !y.test(t)) &&
                    (!v || !v.test(t)))
                )
                  try {
                    var r = m.call(e, t);
                    if (
                      r ||
                      n.disconnectedMatch ||
                      (e.document && 11 !== e.document.nodeType)
                    )
                      return r;
                  } catch (e) {}
                return oe(t, d, null, [e]).length > 0;
              }),
              (oe.contains = function (e, t) {
                return (e.ownerDocument || e) !== d && p(e), b(e, t);
              }),
              (oe.attr = function (e, t) {
                (e.ownerDocument || e) !== d && p(e);
                var i = r.attrHandle[t.toLowerCase()],
                  o =
                    i && D.call(r.attrHandle, t.toLowerCase())
                      ? i(e, t, !g)
                      : void 0;
                return void 0 !== o
                  ? o
                  : n.attributes || !g
                  ? e.getAttribute(t)
                  : (o = e.getAttributeNode(t)) && o.specified
                  ? o.value
                  : null;
              }),
              (oe.escape = function (e) {
                return (e + "").replace(te, ne);
              }),
              (oe.error = function (e) {
                throw new Error("Syntax error, unrecognized expression: " + e);
              }),
              (oe.uniqueSort = function (e) {
                var t,
                  r = [],
                  i = 0,
                  o = 0;
                if (
                  ((f = !n.detectDuplicates),
                  (l = !n.sortStable && e.slice(0)),
                  e.sort(S),
                  f)
                ) {
                  for (; (t = e[o++]); ) t === e[o] && (i = r.push(o));
                  for (; i--; ) e.splice(r[i], 1);
                }
                return (l = null), e;
              }),
              (i = oe.getText =
                function (e) {
                  var t,
                    n = "",
                    r = 0,
                    o = e.nodeType;
                  if (o) {
                    if (1 === o || 9 === o || 11 === o) {
                      if ("string" == typeof e.textContent)
                        return e.textContent;
                      for (e = e.firstChild; e; e = e.nextSibling) n += i(e);
                    } else if (3 === o || 4 === o) return e.nodeValue;
                  } else for (; (t = e[r++]); ) n += i(t);
                  return n;
                }),
              ((r = oe.selectors =
                {
                  cacheLength: 50,
                  createPseudo: se,
                  match: V,
                  attrHandle: {},
                  find: {},
                  relative: {
                    ">": { dir: "parentNode", first: !0 },
                    " ": { dir: "parentNode" },
                    "+": { dir: "previousSibling", first: !0 },
                    "~": { dir: "previousSibling" },
                  },
                  preFilter: {
                    ATTR: function (e) {
                      return (
                        (e[1] = e[1].replace(Z, ee)),
                        (e[3] = (e[3] || e[4] || e[5] || "").replace(Z, ee)),
                        "~=" === e[2] && (e[3] = " " + e[3] + " "),
                        e.slice(0, 4)
                      );
                    },
                    CHILD: function (e) {
                      return (
                        (e[1] = e[1].toLowerCase()),
                        "nth" === e[1].slice(0, 3)
                          ? (e[3] || oe.error(e[0]),
                            (e[4] = +(e[4]
                              ? e[5] + (e[6] || 1)
                              : 2 * ("even" === e[3] || "odd" === e[3]))),
                            (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                          : e[3] && oe.error(e[0]),
                        e
                      );
                    },
                    PSEUDO: function (e) {
                      var t,
                        n = !e[6] && e[2];
                      return V.CHILD.test(e[0])
                        ? null
                        : (e[3]
                            ? (e[2] = e[4] || e[5] || "")
                            : n &&
                              U.test(n) &&
                              (t = a(n, !0)) &&
                              (t = n.indexOf(")", n.length - t) - n.length) &&
                              ((e[0] = e[0].slice(0, t)),
                              (e[2] = n.slice(0, t))),
                          e.slice(0, 3));
                    },
                  },
                  filter: {
                    TAG: function (e) {
                      var t = e.replace(Z, ee).toLowerCase();
                      return "*" === e
                        ? function () {
                            return !0;
                          }
                        : function (e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t;
                          };
                    },
                    CLASS: function (e) {
                      var t = k[e + " "];
                      return (
                        t ||
                        ((t = new RegExp(
                          "(^|" + B + ")" + e + "(" + B + "|$)",
                        )) &&
                          k(e, function (e) {
                            return t.test(
                              ("string" == typeof e.className && e.className) ||
                                (void 0 !== e.getAttribute &&
                                  e.getAttribute("class")) ||
                                "",
                            );
                          }))
                      );
                    },
                    ATTR: function (e, t, n) {
                      return function (r) {
                        var i = oe.attr(r, e);
                        return null == i
                          ? "!=" === t
                          : !t ||
                              ((i += ""),
                              "=" === t
                                ? i === n
                                : "!=" === t
                                ? i !== n
                                : "^=" === t
                                ? n && 0 === i.indexOf(n)
                                : "*=" === t
                                ? n && i.indexOf(n) > -1
                                : "$=" === t
                                ? n && i.slice(-n.length) === n
                                : "~=" === t
                                ? (" " + i.replace(R, " ") + " ").indexOf(n) >
                                  -1
                                : "|=" === t &&
                                  (i === n ||
                                    i.slice(0, n.length + 1) === n + "-"));
                      };
                    },
                    CHILD: function (e, t, n, r, i) {
                      var o = "nth" !== e.slice(0, 3),
                        a = "last" !== e.slice(-4),
                        s = "of-type" === t;
                      return 1 === r && 0 === i
                        ? function (e) {
                            return !!e.parentNode;
                          }
                        : function (t, n, u) {
                            var c,
                              l,
                              f,
                              p,
                              d,
                              h,
                              g = o !== a ? "nextSibling" : "previousSibling",
                              v = t.parentNode,
                              y = s && t.nodeName.toLowerCase(),
                              m = !u && !s,
                              b = !1;
                            if (v) {
                              if (o) {
                                for (; g; ) {
                                  for (p = t; (p = p[g]); )
                                    if (
                                      s
                                        ? p.nodeName.toLowerCase() === y
                                        : 1 === p.nodeType
                                    )
                                      return !1;
                                  h = g = "only" === e && !h && "nextSibling";
                                }
                                return !0;
                              }
                              if (
                                ((h = [a ? v.firstChild : v.lastChild]), a && m)
                              ) {
                                for (
                                  b =
                                    (d =
                                      (c =
                                        (l =
                                          (f = (p = v)[x] || (p[x] = {}))[
                                            p.uniqueID
                                          ] || (f[p.uniqueID] = {}))[e] ||
                                        [])[0] === T && c[1]) && c[2],
                                    p = d && v.childNodes[d];
                                  (p =
                                    (++d && p && p[g]) ||
                                    (b = d = 0) ||
                                    h.pop());

                                )
                                  if (1 === p.nodeType && ++b && p === t) {
                                    l[e] = [T, d, b];
                                    break;
                                  }
                              } else if (
                                (m &&
                                  (b = d =
                                    (c =
                                      (l =
                                        (f = (p = t)[x] || (p[x] = {}))[
                                          p.uniqueID
                                        ] || (f[p.uniqueID] = {}))[e] ||
                                      [])[0] === T && c[1]),
                                !1 === b)
                              )
                                for (
                                  ;
                                  (p =
                                    (++d && p && p[g]) ||
                                    (b = d = 0) ||
                                    h.pop()) &&
                                  ((s
                                    ? p.nodeName.toLowerCase() !== y
                                    : 1 !== p.nodeType) ||
                                    !++b ||
                                    (m &&
                                      ((l =
                                        (f = p[x] || (p[x] = {}))[p.uniqueID] ||
                                        (f[p.uniqueID] = {}))[e] = [T, b]),
                                    p !== t));

                                );
                              return (
                                (b -= i) === r || (b % r == 0 && b / r >= 0)
                              );
                            }
                          };
                    },
                    PSEUDO: function (e, t) {
                      var n,
                        i =
                          r.pseudos[e] ||
                          r.setFilters[e.toLowerCase()] ||
                          oe.error("unsupported pseudo: " + e);
                      return i[x]
                        ? i(t)
                        : i.length > 1
                        ? ((n = [e, e, "", t]),
                          r.setFilters.hasOwnProperty(e.toLowerCase())
                            ? se(function (e, n) {
                                for (var r, o = i(e, t), a = o.length; a--; )
                                  e[(r = L(e, o[a]))] = !(n[r] = o[a]);
                              })
                            : function (e) {
                                return i(e, 0, n);
                              })
                        : i;
                    },
                  },
                  pseudos: {
                    not: se(function (e) {
                      var t = [],
                        n = [],
                        r = s(e.replace(I, "$1"));
                      return r[x]
                        ? se(function (e, t, n, i) {
                            for (
                              var o, a = r(e, null, i, []), s = e.length;
                              s--;

                            )
                              (o = a[s]) && (e[s] = !(t[s] = o));
                          })
                        : function (e, i, o) {
                            return (
                              (t[0] = e),
                              r(t, null, o, n),
                              (t[0] = null),
                              !n.pop()
                            );
                          };
                    }),
                    has: se(function (e) {
                      return function (t) {
                        return oe(e, t).length > 0;
                      };
                    }),
                    contains: se(function (e) {
                      return (
                        (e = e.replace(Z, ee)),
                        function (t) {
                          return (
                            (t.textContent || t.innerText || i(t)).indexOf(e) >
                            -1
                          );
                        }
                      );
                    }),
                    lang: se(function (e) {
                      return (
                        X.test(e || "") || oe.error("unsupported lang: " + e),
                        (e = e.replace(Z, ee).toLowerCase()),
                        function (t) {
                          var n;
                          do {
                            if (
                              (n = g
                                ? t.lang
                                : t.getAttribute("xml:lang") ||
                                  t.getAttribute("lang"))
                            )
                              return (
                                (n = n.toLowerCase()) === e ||
                                0 === n.indexOf(e + "-")
                              );
                          } while ((t = t.parentNode) && 1 === t.nodeType);
                          return !1;
                        }
                      );
                    }),
                    target: function (t) {
                      var n = e.location && e.location.hash;
                      return n && n.slice(1) === t.id;
                    },
                    root: function (e) {
                      return e === h;
                    },
                    focus: function (e) {
                      return (
                        e === d.activeElement &&
                        (!d.hasFocus || d.hasFocus()) &&
                        !!(e.type || e.href || ~e.tabIndex)
                      );
                    },
                    enabled: de(!1),
                    disabled: de(!0),
                    checked: function (e) {
                      var t = e.nodeName.toLowerCase();
                      return (
                        ("input" === t && !!e.checked) ||
                        ("option" === t && !!e.selected)
                      );
                    },
                    selected: function (e) {
                      return (
                        e.parentNode && e.parentNode.selectedIndex,
                        !0 === e.selected
                      );
                    },
                    empty: function (e) {
                      for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                      return !0;
                    },
                    parent: function (e) {
                      return !r.pseudos.empty(e);
                    },
                    header: function (e) {
                      return Y.test(e.nodeName);
                    },
                    input: function (e) {
                      return G.test(e.nodeName);
                    },
                    button: function (e) {
                      var t = e.nodeName.toLowerCase();
                      return (
                        ("input" === t && "button" === e.type) || "button" === t
                      );
                    },
                    text: function (e) {
                      var t;
                      return (
                        "input" === e.nodeName.toLowerCase() &&
                        "text" === e.type &&
                        (null == (t = e.getAttribute("type")) ||
                          "text" === t.toLowerCase())
                      );
                    },
                    first: he(function () {
                      return [0];
                    }),
                    last: he(function (e, t) {
                      return [t - 1];
                    }),
                    eq: he(function (e, t, n) {
                      return [n < 0 ? n + t : n];
                    }),
                    even: he(function (e, t) {
                      for (var n = 0; n < t; n += 2) e.push(n);
                      return e;
                    }),
                    odd: he(function (e, t) {
                      for (var n = 1; n < t; n += 2) e.push(n);
                      return e;
                    }),
                    lt: he(function (e, t, n) {
                      for (var r = n < 0 ? n + t : n; --r >= 0; ) e.push(r);
                      return e;
                    }),
                    gt: he(function (e, t, n) {
                      for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
                      return e;
                    }),
                  },
                }).pseudos.nth = r.pseudos.eq);
            for (t in {
              radio: !0,
              checkbox: !0,
              file: !0,
              password: !0,
              image: !0,
            })
              r.pseudos[t] = fe(t);
            for (t in { submit: !0, reset: !0 }) r.pseudos[t] = pe(t);
            function ve() {}
            function ye(e) {
              for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
              return r;
            }
            function me(e, t, n) {
              var r = t.dir,
                i = t.next,
                o = i || r,
                a = n && "parentNode" === o,
                s = C++;
              return t.first
                ? function (t, n, i) {
                    for (; (t = t[r]); )
                      if (1 === t.nodeType || a) return e(t, n, i);
                    return !1;
                  }
                : function (t, n, u) {
                    var c,
                      l,
                      f,
                      p = [T, s];
                    if (u) {
                      for (; (t = t[r]); )
                        if ((1 === t.nodeType || a) && e(t, n, u)) return !0;
                    } else
                      for (; (t = t[r]); )
                        if (1 === t.nodeType || a)
                          if (
                            ((l =
                              (f = t[x] || (t[x] = {}))[t.uniqueID] ||
                              (f[t.uniqueID] = {})),
                            i && i === t.nodeName.toLowerCase())
                          )
                            t = t[r] || t;
                          else {
                            if ((c = l[o]) && c[0] === T && c[1] === s)
                              return (p[2] = c[2]);
                            if (((l[o] = p), (p[2] = e(t, n, u)))) return !0;
                          }
                    return !1;
                  };
            }
            function be(e) {
              return e.length > 1
                ? function (t, n, r) {
                    for (var i = e.length; i--; ) if (!e[i](t, n, r)) return !1;
                    return !0;
                  }
                : e[0];
            }
            function xe(e, t, n, r, i) {
              for (
                var o, a = [], s = 0, u = e.length, c = null != t;
                s < u;
                s++
              )
                (o = e[s]) &&
                  ((n && !n(o, r, i)) || (a.push(o), c && t.push(s)));
              return a;
            }
            function we(e, t, n, r, i, o) {
              return (
                r && !r[x] && (r = we(r)),
                i && !i[x] && (i = we(i, o)),
                se(function (o, a, s, u) {
                  var c,
                    l,
                    f,
                    p = [],
                    d = [],
                    h = a.length,
                    g =
                      o ||
                      (function (e, t, n) {
                        for (var r = 0, i = t.length; r < i; r++)
                          oe(e, t[r], n);
                        return n;
                      })(t || "*", s.nodeType ? [s] : s, []),
                    v = !e || (!o && t) ? g : xe(g, p, e, s, u),
                    y = n ? (i || (o ? e : h || r) ? [] : a) : v;
                  if ((n && n(v, y, s, u), r))
                    for (c = xe(y, d), r(c, [], s, u), l = c.length; l--; )
                      (f = c[l]) && (y[d[l]] = !(v[d[l]] = f));
                  if (o) {
                    if (i || e) {
                      if (i) {
                        for (c = [], l = y.length; l--; )
                          (f = y[l]) && c.push((v[l] = f));
                        i(null, (y = []), c, u);
                      }
                      for (l = y.length; l--; )
                        (f = y[l]) &&
                          (c = i ? L(o, f) : p[l]) > -1 &&
                          (o[c] = !(a[c] = f));
                    }
                  } else
                    (y = xe(y === a ? y.splice(h, y.length) : y)),
                      i ? i(null, a, y, u) : _.apply(a, y);
                })
              );
            }
            function Te(e) {
              for (
                var t,
                  n,
                  i,
                  o = e.length,
                  a = r.relative[e[0].type],
                  s = a || r.relative[" "],
                  u = a ? 1 : 0,
                  l = me(
                    function (e) {
                      return e === t;
                    },
                    s,
                    !0,
                  ),
                  f = me(
                    function (e) {
                      return L(t, e) > -1;
                    },
                    s,
                    !0,
                  ),
                  p = [
                    function (e, n, r) {
                      var i =
                        (!a && (r || n !== c)) ||
                        ((t = n).nodeType ? l(e, n, r) : f(e, n, r));
                      return (t = null), i;
                    },
                  ];
                u < o;
                u++
              )
                if ((n = r.relative[e[u].type])) p = [me(be(p), n)];
                else {
                  if ((n = r.filter[e[u].type].apply(null, e[u].matches))[x]) {
                    for (i = ++u; i < o && !r.relative[e[i].type]; i++);
                    return we(
                      u > 1 && be(p),
                      u > 1 &&
                        ye(
                          e.slice(0, u - 1).concat({
                            value: " " === e[u - 2].type ? "*" : "",
                          }),
                        ).replace(I, "$1"),
                      n,
                      u < i && Te(e.slice(u, i)),
                      i < o && Te((e = e.slice(i))),
                      i < o && ye(e),
                    );
                  }
                  p.push(n);
                }
              return be(p);
            }
            return (
              (ve.prototype = r.filters = r.pseudos),
              (r.setFilters = new ve()),
              (a = oe.tokenize =
                function (e, t) {
                  var n,
                    i,
                    o,
                    a,
                    s,
                    u,
                    c,
                    l = E[e + " "];
                  if (l) return t ? 0 : l.slice(0);
                  for (s = e, u = [], c = r.preFilter; s; ) {
                    (n && !(i = W.exec(s))) ||
                      (i && (s = s.slice(i[0].length) || s), u.push((o = []))),
                      (n = !1),
                      (i = $.exec(s)) &&
                        ((n = i.shift()),
                        o.push({ value: n, type: i[0].replace(I, " ") }),
                        (s = s.slice(n.length)));
                    for (a in r.filter)
                      !(i = V[a].exec(s)) ||
                        (c[a] && !(i = c[a](i))) ||
                        ((n = i.shift()),
                        o.push({ value: n, type: a, matches: i }),
                        (s = s.slice(n.length)));
                    if (!n) break;
                  }
                  return t ? s.length : s ? oe.error(e) : E(e, u).slice(0);
                }),
              (s = oe.compile =
                function (e, t) {
                  var n,
                    i,
                    o,
                    s,
                    u,
                    l,
                    f = [],
                    h = [],
                    v = j[e + " "];
                  if (!v) {
                    for (t || (t = a(e)), n = t.length; n--; )
                      (v = Te(t[n]))[x] ? f.push(v) : h.push(v);
                    (v = j(
                      e,
                      ((i = h),
                      (s = (o = f).length > 0),
                      (u = i.length > 0),
                      (l = function (e, t, n, a, l) {
                        var f,
                          h,
                          v,
                          y = 0,
                          m = "0",
                          b = e && [],
                          x = [],
                          w = c,
                          C = e || (u && r.find.TAG("*", l)),
                          k = (T += null == w ? 1 : Math.random() || 0.1),
                          E = C.length;
                        for (
                          l && (c = t === d || t || l);
                          m !== E && null != (f = C[m]);
                          m++
                        ) {
                          if (u && f) {
                            for (
                              h = 0,
                                t || f.ownerDocument === d || (p(f), (n = !g));
                              (v = i[h++]);

                            )
                              if (v(f, t || d, n)) {
                                a.push(f);
                                break;
                              }
                            l && (T = k);
                          }
                          s && ((f = !v && f) && y--, e && b.push(f));
                        }
                        if (((y += m), s && m !== y)) {
                          for (h = 0; (v = o[h++]); ) v(b, x, t, n);
                          if (e) {
                            if (y > 0)
                              for (; m--; ) b[m] || x[m] || (x[m] = N.call(a));
                            x = xe(x);
                          }
                          _.apply(a, x),
                            l &&
                              !e &&
                              x.length > 0 &&
                              y + o.length > 1 &&
                              oe.uniqueSort(a);
                        }
                        return l && ((T = k), (c = w)), b;
                      }),
                      s ? se(l) : l),
                    )).selector = e;
                  }
                  return v;
                }),
              (u = oe.select =
                function (e, t, n, i) {
                  var o,
                    u,
                    c,
                    l,
                    f,
                    p = "function" == typeof e && e,
                    d = !i && a((e = p.selector || e));
                  if (((n = n || []), 1 === d.length)) {
                    if (
                      (u = d[0] = d[0].slice(0)).length > 2 &&
                      "ID" === (c = u[0]).type &&
                      9 === t.nodeType &&
                      g &&
                      r.relative[u[1].type]
                    ) {
                      if (
                        !(t = (r.find.ID(c.matches[0].replace(Z, ee), t) ||
                          [])[0])
                      )
                        return n;
                      p && (t = t.parentNode),
                        (e = e.slice(u.shift().value.length));
                    }
                    for (
                      o = V.needsContext.test(e) ? 0 : u.length;
                      o-- && ((c = u[o]), !r.relative[(l = c.type)]);

                    )
                      if (
                        (f = r.find[l]) &&
                        (i = f(
                          c.matches[0].replace(Z, ee),
                          (K.test(u[0].type) && ge(t.parentNode)) || t,
                        ))
                      ) {
                        if ((u.splice(o, 1), !(e = i.length && ye(u))))
                          return _.apply(n, i), n;
                        break;
                      }
                  }
                  return (
                    (p || s(e, d))(
                      i,
                      t,
                      !g,
                      n,
                      !t || (K.test(e) && ge(t.parentNode)) || t,
                    ),
                    n
                  );
                }),
              (n.sortStable = x.split("").sort(S).join("") === x),
              (n.detectDuplicates = !!f),
              p(),
              (n.sortDetached = ue(function (e) {
                return (
                  1 & e.compareDocumentPosition(d.createElement("fieldset"))
                );
              })),
              ue(function (e) {
                return (
                  (e.innerHTML = "<a href='#'></a>"),
                  "#" === e.firstChild.getAttribute("href")
                );
              }) ||
                ce("type|href|height|width", function (e, t, n) {
                  if (!n)
                    return e.getAttribute(
                      t,
                      "type" === t.toLowerCase() ? 1 : 2,
                    );
                }),
              (n.attributes &&
                ue(function (e) {
                  return (
                    (e.innerHTML = "<input/>"),
                    e.firstChild.setAttribute("value", ""),
                    "" === e.firstChild.getAttribute("value")
                  );
                })) ||
                ce("value", function (e, t, n) {
                  if (!n && "input" === e.nodeName.toLowerCase())
                    return e.defaultValue;
                }),
              ue(function (e) {
                return null == e.getAttribute("disabled");
              }) ||
                ce(H, function (e, t, n) {
                  var r;
                  if (!n)
                    return !0 === e[t]
                      ? t.toLowerCase()
                      : (r = e.getAttributeNode(t)) && r.specified
                      ? r.value
                      : null;
                }),
              oe
            );
          })(e);
          (v.find = T),
            (v.expr = T.selectors),
            (v.expr[":"] = v.expr.pseudos),
            (v.uniqueSort = v.unique = T.uniqueSort),
            (v.text = T.getText),
            (v.isXMLDoc = T.isXML),
            (v.contains = T.contains),
            (v.escapeSelector = T.escape);
          var C = function (e, t, n) {
              for (
                var r = [], i = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;

              )
                if (1 === e.nodeType) {
                  if (i && v(e).is(n)) break;
                  r.push(e);
                }
              return r;
            },
            k = function (e, t) {
              for (var n = []; e; e = e.nextSibling)
                1 === e.nodeType && e !== t && n.push(e);
              return n;
            },
            E = v.expr.match.needsContext;
          function j(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
          }
          var S =
              /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
            D = /^.[^:#\[\.,]*$/;
          function A(e, t, n) {
            return v.isFunction(t)
              ? v.grep(e, function (e, r) {
                  return !!t.call(e, r, e) !== n;
                })
              : t.nodeType
              ? v.grep(e, function (e) {
                  return (e === t) !== n;
                })
              : "string" != typeof t
              ? v.grep(e, function (e) {
                  return u.call(t, e) > -1 !== n;
                })
              : D.test(t)
              ? v.filter(t, e, n)
              : ((t = v.filter(t, e)),
                v.grep(e, function (e) {
                  return u.call(t, e) > -1 !== n && 1 === e.nodeType;
                }));
          }
          (v.filter = function (e, t, n) {
            var r = t[0];
            return (
              n && (e = ":not(" + e + ")"),
              1 === t.length && 1 === r.nodeType
                ? v.find.matchesSelector(r, e)
                  ? [r]
                  : []
                : v.find.matches(
                    e,
                    v.grep(t, function (e) {
                      return 1 === e.nodeType;
                    }),
                  )
            );
          }),
            v.fn.extend({
              find: function (e) {
                var t,
                  n,
                  r = this.length,
                  i = this;
                if ("string" != typeof e)
                  return this.pushStack(
                    v(e).filter(function () {
                      for (t = 0; t < r; t++)
                        if (v.contains(i[t], this)) return !0;
                    }),
                  );
                for (n = this.pushStack([]), t = 0; t < r; t++)
                  v.find(e, i[t], n);
                return r > 1 ? v.uniqueSort(n) : n;
              },
              filter: function (e) {
                return this.pushStack(A(this, e || [], !1));
              },
              not: function (e) {
                return this.pushStack(A(this, e || [], !0));
              },
              is: function (e) {
                return !!A(
                  this,
                  "string" == typeof e && E.test(e) ? v(e) : e || [],
                  !1,
                ).length;
              },
            });
          var N,
            q = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
          ((v.fn.init = function (e, t, n) {
            var i, o;
            if (!e) return this;
            if (((n = n || N), "string" == typeof e)) {
              if (
                !(i =
                  "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3
                    ? [null, e, null]
                    : q.exec(e)) ||
                (!i[1] && t)
              )
                return !t || t.jquery
                  ? (t || n).find(e)
                  : this.constructor(t).find(e);
              if (i[1]) {
                if (
                  ((t = t instanceof v ? t[0] : t),
                  v.merge(
                    this,
                    v.parseHTML(
                      i[1],
                      t && t.nodeType ? t.ownerDocument || t : r,
                      !0,
                    ),
                  ),
                  S.test(i[1]) && v.isPlainObject(t))
                )
                  for (i in t)
                    v.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                return this;
              }
              return (
                (o = r.getElementById(i[2])) &&
                  ((this[0] = o), (this.length = 1)),
                this
              );
            }
            return e.nodeType
              ? ((this[0] = e), (this.length = 1), this)
              : v.isFunction(e)
              ? void 0 !== n.ready
                ? n.ready(e)
                : e(v)
              : v.makeArray(e, this);
          }).prototype = v.fn),
            (N = v(r));
          var _ = /^(?:parents|prev(?:Until|All))/,
            O = { children: !0, contents: !0, next: !0, prev: !0 };
          function L(e, t) {
            for (; (e = e[t]) && 1 !== e.nodeType; );
            return e;
          }
          v.fn.extend({
            has: function (e) {
              var t = v(e, this),
                n = t.length;
              return this.filter(function () {
                for (var e = 0; e < n; e++)
                  if (v.contains(this, t[e])) return !0;
              });
            },
            closest: function (e, t) {
              var n,
                r = 0,
                i = this.length,
                o = [],
                a = "string" != typeof e && v(e);
              if (!E.test(e))
                for (; r < i; r++)
                  for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (
                      n.nodeType < 11 &&
                      (a
                        ? a.index(n) > -1
                        : 1 === n.nodeType && v.find.matchesSelector(n, e))
                    ) {
                      o.push(n);
                      break;
                    }
              return this.pushStack(o.length > 1 ? v.uniqueSort(o) : o);
            },
            index: function (e) {
              return e
                ? "string" == typeof e
                  ? u.call(v(e), this[0])
                  : u.call(this, e.jquery ? e[0] : e)
                : this[0] && this[0].parentNode
                ? this.first().prevAll().length
                : -1;
            },
            add: function (e, t) {
              return this.pushStack(v.uniqueSort(v.merge(this.get(), v(e, t))));
            },
            addBack: function (e) {
              return this.add(
                null == e ? this.prevObject : this.prevObject.filter(e),
              );
            },
          }),
            v.each(
              {
                parent: function (e) {
                  var t = e.parentNode;
                  return t && 11 !== t.nodeType ? t : null;
                },
                parents: function (e) {
                  return C(e, "parentNode");
                },
                parentsUntil: function (e, t, n) {
                  return C(e, "parentNode", n);
                },
                next: function (e) {
                  return L(e, "nextSibling");
                },
                prev: function (e) {
                  return L(e, "previousSibling");
                },
                nextAll: function (e) {
                  return C(e, "nextSibling");
                },
                prevAll: function (e) {
                  return C(e, "previousSibling");
                },
                nextUntil: function (e, t, n) {
                  return C(e, "nextSibling", n);
                },
                prevUntil: function (e, t, n) {
                  return C(e, "previousSibling", n);
                },
                siblings: function (e) {
                  return k((e.parentNode || {}).firstChild, e);
                },
                children: function (e) {
                  return k(e.firstChild);
                },
                contents: function (e) {
                  return j(e, "iframe")
                    ? e.contentDocument
                    : (j(e, "template") && (e = e.content || e),
                      v.merge([], e.childNodes));
                },
              },
              function (e, t) {
                v.fn[e] = function (n, r) {
                  var i = v.map(this, t, n);
                  return (
                    "Until" !== e.slice(-5) && (r = n),
                    r && "string" == typeof r && (i = v.filter(r, i)),
                    this.length > 1 &&
                      (O[e] || v.uniqueSort(i), _.test(e) && i.reverse()),
                    this.pushStack(i)
                  );
                };
              },
            );
          var H = /[^\x20\t\r\n\f]+/g;
          function B(e) {
            return e;
          }
          function P(e) {
            throw e;
          }
          function F(e, t, n, r) {
            var i;
            try {
              e && v.isFunction((i = e.promise))
                ? i.call(e).done(t).fail(n)
                : e && v.isFunction((i = e.then))
                ? i.call(e, t, n)
                : t.apply(void 0, [e].slice(r));
            } catch (e) {
              n.apply(void 0, [e]);
            }
          }
          (v.Callbacks = function (e) {
            var t, n;
            e =
              "string" == typeof e
                ? ((t = e),
                  (n = {}),
                  v.each(t.match(H) || [], function (e, t) {
                    n[t] = !0;
                  }),
                  n)
                : v.extend({}, e);
            var r,
              i,
              o,
              a,
              s = [],
              u = [],
              c = -1,
              l = function () {
                for (a = a || e.once, o = r = !0; u.length; c = -1)
                  for (i = u.shift(); ++c < s.length; )
                    !1 === s[c].apply(i[0], i[1]) &&
                      e.stopOnFalse &&
                      ((c = s.length), (i = !1));
                e.memory || (i = !1), (r = !1), a && (s = i ? [] : "");
              },
              f = {
                add: function () {
                  return (
                    s &&
                      (i && !r && ((c = s.length - 1), u.push(i)),
                      (function t(n) {
                        v.each(n, function (n, r) {
                          v.isFunction(r)
                            ? (e.unique && f.has(r)) || s.push(r)
                            : r && r.length && "string" !== v.type(r) && t(r);
                        });
                      })(arguments),
                      i && !r && l()),
                    this
                  );
                },
                remove: function () {
                  return (
                    v.each(arguments, function (e, t) {
                      for (var n; (n = v.inArray(t, s, n)) > -1; )
                        s.splice(n, 1), n <= c && c--;
                    }),
                    this
                  );
                },
                has: function (e) {
                  return e ? v.inArray(e, s) > -1 : s.length > 0;
                },
                empty: function () {
                  return s && (s = []), this;
                },
                disable: function () {
                  return (a = u = []), (s = i = ""), this;
                },
                disabled: function () {
                  return !s;
                },
                lock: function () {
                  return (a = u = []), i || r || (s = i = ""), this;
                },
                locked: function () {
                  return !!a;
                },
                fireWith: function (e, t) {
                  return (
                    a ||
                      ((t = [e, (t = t || []).slice ? t.slice() : t]),
                      u.push(t),
                      r || l()),
                    this
                  );
                },
                fire: function () {
                  return f.fireWith(this, arguments), this;
                },
                fired: function () {
                  return !!o;
                },
              };
            return f;
          }),
            v.extend({
              Deferred: function (t) {
                var n = [
                    [
                      "notify",
                      "progress",
                      v.Callbacks("memory"),
                      v.Callbacks("memory"),
                      2,
                    ],
                    [
                      "resolve",
                      "done",
                      v.Callbacks("once memory"),
                      v.Callbacks("once memory"),
                      0,
                      "resolved",
                    ],
                    [
                      "reject",
                      "fail",
                      v.Callbacks("once memory"),
                      v.Callbacks("once memory"),
                      1,
                      "rejected",
                    ],
                  ],
                  r = "pending",
                  i = {
                    state: function () {
                      return r;
                    },
                    always: function () {
                      return o.done(arguments).fail(arguments), this;
                    },
                    catch: function (e) {
                      return i.then(null, e);
                    },
                    pipe: function () {
                      var e = arguments;
                      return v
                        .Deferred(function (t) {
                          v.each(n, function (n, r) {
                            var i = v.isFunction(e[r[4]]) && e[r[4]];
                            o[r[1]](function () {
                              var e = i && i.apply(this, arguments);
                              e && v.isFunction(e.promise)
                                ? e
                                    .promise()
                                    .progress(t.notify)
                                    .done(t.resolve)
                                    .fail(t.reject)
                                : t[r[0] + "With"](this, i ? [e] : arguments);
                            });
                          }),
                            (e = null);
                        })
                        .promise();
                    },
                    then: function (t, r, i) {
                      var o = 0;
                      function a(t, n, r, i) {
                        return function () {
                          var s = this,
                            u = arguments,
                            c = function () {
                              var e, c;
                              if (!(t < o)) {
                                if ((e = r.apply(s, u)) === n.promise())
                                  throw new TypeError(
                                    "Thenable self-resolution",
                                  );
                                (c =
                                  e &&
                                  ("object" == typeof e ||
                                    "function" == typeof e) &&
                                  e.then),
                                  v.isFunction(c)
                                    ? i
                                      ? c.call(e, a(o, n, B, i), a(o, n, P, i))
                                      : (o++,
                                        c.call(
                                          e,
                                          a(o, n, B, i),
                                          a(o, n, P, i),
                                          a(o, n, B, n.notifyWith),
                                        ))
                                    : (r !== B && ((s = void 0), (u = [e])),
                                      (i || n.resolveWith)(s, u));
                              }
                            },
                            l = i
                              ? c
                              : function () {
                                  try {
                                    c();
                                  } catch (e) {
                                    v.Deferred.exceptionHook &&
                                      v.Deferred.exceptionHook(e, l.stackTrace),
                                      t + 1 >= o &&
                                        (r !== P && ((s = void 0), (u = [e])),
                                        n.rejectWith(s, u));
                                  }
                                };
                          t
                            ? l()
                            : (v.Deferred.getStackHook &&
                                (l.stackTrace = v.Deferred.getStackHook()),
                              e.setTimeout(l));
                        };
                      }
                      return v
                        .Deferred(function (e) {
                          n[0][3].add(
                            a(0, e, v.isFunction(i) ? i : B, e.notifyWith),
                          ),
                            n[1][3].add(a(0, e, v.isFunction(t) ? t : B)),
                            n[2][3].add(a(0, e, v.isFunction(r) ? r : P));
                        })
                        .promise();
                    },
                    promise: function (e) {
                      return null != e ? v.extend(e, i) : i;
                    },
                  },
                  o = {};
                return (
                  v.each(n, function (e, t) {
                    var a = t[2],
                      s = t[5];
                    (i[t[1]] = a.add),
                      s &&
                        a.add(
                          function () {
                            r = s;
                          },
                          n[3 - e][2].disable,
                          n[0][2].lock,
                        ),
                      a.add(t[3].fire),
                      (o[t[0]] = function () {
                        return (
                          o[t[0] + "With"](
                            this === o ? void 0 : this,
                            arguments,
                          ),
                          this
                        );
                      }),
                      (o[t[0] + "With"] = a.fireWith);
                  }),
                  i.promise(o),
                  t && t.call(o, o),
                  o
                );
              },
              when: function (e) {
                var t = arguments.length,
                  n = t,
                  r = Array(n),
                  i = o.call(arguments),
                  a = v.Deferred(),
                  s = function (e) {
                    return function (n) {
                      (r[e] = this),
                        (i[e] = arguments.length > 1 ? o.call(arguments) : n),
                        --t || a.resolveWith(r, i);
                    };
                  };
                if (
                  t <= 1 &&
                  (F(e, a.done(s(n)).resolve, a.reject, !t),
                  "pending" === a.state() || v.isFunction(i[n] && i[n].then))
                )
                  return a.then();
                for (; n--; ) F(i[n], s(n), a.reject);
                return a.promise();
              },
            });
          var M = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
          (v.Deferred.exceptionHook = function (t, n) {
            e.console &&
              e.console.warn &&
              t &&
              M.test(t.name) &&
              e.console.warn(
                "jQuery.Deferred exception: " + t.message,
                t.stack,
                n,
              );
          }),
            (v.readyException = function (t) {
              e.setTimeout(function () {
                throw t;
              });
            });
          var R = v.Deferred();
          function I() {
            r.removeEventListener("DOMContentLoaded", I),
              e.removeEventListener("load", I),
              v.ready();
          }
          (v.fn.ready = function (e) {
            return (
              R.then(e).catch(function (e) {
                v.readyException(e);
              }),
              this
            );
          }),
            v.extend({
              isReady: !1,
              readyWait: 1,
              ready: function (e) {
                (!0 === e ? --v.readyWait : v.isReady) ||
                  ((v.isReady = !0),
                  (!0 !== e && --v.readyWait > 0) || R.resolveWith(r, [v]));
              },
            }),
            (v.ready.then = R.then),
            "complete" === r.readyState ||
            ("loading" !== r.readyState && !r.documentElement.doScroll)
              ? e.setTimeout(v.ready)
              : (r.addEventListener("DOMContentLoaded", I),
                e.addEventListener("load", I));
          var W = function (e, t, n, r, i, o, a) {
              var s = 0,
                u = e.length,
                c = null == n;
              if ("object" === v.type(n)) {
                i = !0;
                for (s in n) W(e, t, s, n[s], !0, o, a);
              } else if (
                void 0 !== r &&
                ((i = !0),
                v.isFunction(r) || (a = !0),
                c &&
                  (a
                    ? (t.call(e, r), (t = null))
                    : ((c = t),
                      (t = function (e, t, n) {
                        return c.call(v(e), n);
                      }))),
                t)
              )
                for (; s < u; s++)
                  t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
              return i ? e : c ? t.call(e) : u ? t(e[0], n) : o;
            },
            $ = function (e) {
              return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
            };
          function z() {
            this.expando = v.expando + z.uid++;
          }
          (z.uid = 1),
            (z.prototype = {
              cache: function (e) {
                var t = e[this.expando];
                return (
                  t ||
                    ((t = {}),
                    $(e) &&
                      (e.nodeType
                        ? (e[this.expando] = t)
                        : Object.defineProperty(e, this.expando, {
                            value: t,
                            configurable: !0,
                          }))),
                  t
                );
              },
              set: function (e, t, n) {
                var r,
                  i = this.cache(e);
                if ("string" == typeof t) i[v.camelCase(t)] = n;
                else for (r in t) i[v.camelCase(r)] = t[r];
                return i;
              },
              get: function (e, t) {
                return void 0 === t
                  ? this.cache(e)
                  : e[this.expando] && e[this.expando][v.camelCase(t)];
              },
              access: function (e, t, n) {
                return void 0 === t ||
                  (t && "string" == typeof t && void 0 === n)
                  ? this.get(e, t)
                  : (this.set(e, t, n), void 0 !== n ? n : t);
              },
              remove: function (e, t) {
                var n,
                  r = e[this.expando];
                if (void 0 !== r) {
                  if (void 0 !== t) {
                    n = (t = Array.isArray(t)
                      ? t.map(v.camelCase)
                      : (t = v.camelCase(t)) in r
                      ? [t]
                      : t.match(H) || []).length;
                    for (; n--; ) delete r[t[n]];
                  }
                  (void 0 === t || v.isEmptyObject(r)) &&
                    (e.nodeType
                      ? (e[this.expando] = void 0)
                      : delete e[this.expando]);
                }
              },
              hasData: function (e) {
                var t = e[this.expando];
                return void 0 !== t && !v.isEmptyObject(t);
              },
            });
          var U = new z(),
            X = new z(),
            V = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            G = /[A-Z]/g;
          function Y(e, t, n) {
            var r, i;
            if (void 0 === n && 1 === e.nodeType)
              if (
                ((r = "data-" + t.replace(G, "-$&").toLowerCase()),
                "string" == typeof (n = e.getAttribute(r)))
              ) {
                try {
                  n =
                    "true" === (i = n) ||
                    ("false" !== i &&
                      ("null" === i
                        ? null
                        : i === +i + ""
                        ? +i
                        : V.test(i)
                        ? JSON.parse(i)
                        : i));
                } catch (e) {}
                X.set(e, t, n);
              } else n = void 0;
            return n;
          }
          v.extend({
            hasData: function (e) {
              return X.hasData(e) || U.hasData(e);
            },
            data: function (e, t, n) {
              return X.access(e, t, n);
            },
            removeData: function (e, t) {
              X.remove(e, t);
            },
            _data: function (e, t, n) {
              return U.access(e, t, n);
            },
            _removeData: function (e, t) {
              U.remove(e, t);
            },
          }),
            v.fn.extend({
              data: function (e, t) {
                var n,
                  r,
                  i,
                  o = this[0],
                  a = o && o.attributes;
                if (void 0 === e) {
                  if (
                    this.length &&
                    ((i = X.get(o)),
                    1 === o.nodeType && !U.get(o, "hasDataAttrs"))
                  ) {
                    for (n = a.length; n--; )
                      a[n] &&
                        0 === (r = a[n].name).indexOf("data-") &&
                        ((r = v.camelCase(r.slice(5))), Y(o, r, i[r]));
                    U.set(o, "hasDataAttrs", !0);
                  }
                  return i;
                }
                return "object" == typeof e
                  ? this.each(function () {
                      X.set(this, e);
                    })
                  : W(
                      this,
                      function (t) {
                        var n;
                        if (o && void 0 === t)
                          return void 0 !== (n = X.get(o, e))
                            ? n
                            : void 0 !== (n = Y(o, e))
                            ? n
                            : void 0;
                        this.each(function () {
                          X.set(this, e, t);
                        });
                      },
                      null,
                      t,
                      arguments.length > 1,
                      null,
                      !0,
                    );
              },
              removeData: function (e) {
                return this.each(function () {
                  X.remove(this, e);
                });
              },
            }),
            v.extend({
              queue: function (e, t, n) {
                var r;
                if (e)
                  return (
                    (t = (t || "fx") + "queue"),
                    (r = U.get(e, t)),
                    n &&
                      (!r || Array.isArray(n)
                        ? (r = U.access(e, t, v.makeArray(n)))
                        : r.push(n)),
                    r || []
                  );
              },
              dequeue: function (e, t) {
                t = t || "fx";
                var n = v.queue(e, t),
                  r = n.length,
                  i = n.shift(),
                  o = v._queueHooks(e, t);
                "inprogress" === i && ((i = n.shift()), r--),
                  i &&
                    ("fx" === t && n.unshift("inprogress"),
                    delete o.stop,
                    i.call(
                      e,
                      function () {
                        v.dequeue(e, t);
                      },
                      o,
                    )),
                  !r && o && o.empty.fire();
              },
              _queueHooks: function (e, t) {
                var n = t + "queueHooks";
                return (
                  U.get(e, n) ||
                  U.access(e, n, {
                    empty: v.Callbacks("once memory").add(function () {
                      U.remove(e, [t + "queue", n]);
                    }),
                  })
                );
              },
            }),
            v.fn.extend({
              queue: function (e, t) {
                var n = 2;
                return (
                  "string" != typeof e && ((t = e), (e = "fx"), n--),
                  arguments.length < n
                    ? v.queue(this[0], e)
                    : void 0 === t
                    ? this
                    : this.each(function () {
                        var n = v.queue(this, e, t);
                        v._queueHooks(this, e),
                          "fx" === e &&
                            "inprogress" !== n[0] &&
                            v.dequeue(this, e);
                      })
                );
              },
              dequeue: function (e) {
                return this.each(function () {
                  v.dequeue(this, e);
                });
              },
              clearQueue: function (e) {
                return this.queue(e || "fx", []);
              },
              promise: function (e, t) {
                var n,
                  r = 1,
                  i = v.Deferred(),
                  o = this,
                  a = this.length,
                  s = function () {
                    --r || i.resolveWith(o, [o]);
                  };
                for (
                  "string" != typeof e && ((t = e), (e = void 0)),
                    e = e || "fx";
                  a--;

                )
                  (n = U.get(o[a], e + "queueHooks")) &&
                    n.empty &&
                    (r++, n.empty.add(s));
                return s(), i.promise(t);
              },
            });
          var Q = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            J = new RegExp("^(?:([+-])=|)(" + Q + ")([a-z%]*)$", "i"),
            K = ["Top", "Right", "Bottom", "Left"],
            Z = function (e, t) {
              return (
                "none" === (e = t || e).style.display ||
                ("" === e.style.display &&
                  v.contains(e.ownerDocument, e) &&
                  "none" === v.css(e, "display"))
              );
            },
            ee = function (e, t, n, r) {
              var i,
                o,
                a = {};
              for (o in t) (a[o] = e.style[o]), (e.style[o] = t[o]);
              i = n.apply(e, r || []);
              for (o in t) e.style[o] = a[o];
              return i;
            };
          function te(e, t, n, r) {
            var i,
              o = 1,
              a = 20,
              s = r
                ? function () {
                    return r.cur();
                  }
                : function () {
                    return v.css(e, t, "");
                  },
              u = s(),
              c = (n && n[3]) || (v.cssNumber[t] ? "" : "px"),
              l = (v.cssNumber[t] || ("px" !== c && +u)) && J.exec(v.css(e, t));
            if (l && l[3] !== c) {
              (c = c || l[3]), (n = n || []), (l = +u || 1);
              do {
                (l /= o = o || ".5"), v.style(e, t, l + c);
              } while (o !== (o = s() / u) && 1 !== o && --a);
            }
            return (
              n &&
                ((l = +l || +u || 0),
                (i = n[1] ? l + (n[1] + 1) * n[2] : +n[2]),
                r && ((r.unit = c), (r.start = l), (r.end = i))),
              i
            );
          }
          var ne = {};
          function re(e, t) {
            for (
              var n, r, i, o, a, s, u, c = [], l = 0, f = e.length;
              l < f;
              l++
            )
              (r = e[l]).style &&
                ((n = r.style.display),
                t
                  ? ("none" === n &&
                      ((c[l] = U.get(r, "display") || null),
                      c[l] || (r.style.display = "")),
                    "" === r.style.display &&
                      Z(r) &&
                      (c[l] =
                        ((o = void 0),
                        (a = void 0),
                        void 0,
                        (u = void 0),
                        (a = (i = r).ownerDocument),
                        (s = i.nodeName),
                        (u = ne[s]) ||
                          ((o = a.body.appendChild(a.createElement(s))),
                          (u = v.css(o, "display")),
                          o.parentNode.removeChild(o),
                          "none" === u && (u = "block"),
                          (ne[s] = u),
                          u))))
                  : "none" !== n && ((c[l] = "none"), U.set(r, "display", n)));
            for (l = 0; l < f; l++) null != c[l] && (e[l].style.display = c[l]);
            return e;
          }
          v.fn.extend({
            show: function () {
              return re(this, !0);
            },
            hide: function () {
              return re(this);
            },
            toggle: function (e) {
              return "boolean" == typeof e
                ? e
                  ? this.show()
                  : this.hide()
                : this.each(function () {
                    Z(this) ? v(this).show() : v(this).hide();
                  });
            },
          });
          var ie = /^(?:checkbox|radio)$/i,
            oe = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
            ae = /^$|\/(?:java|ecma)script/i,
            se = {
              option: [1, "<select multiple='multiple'>", "</select>"],
              thead: [1, "<table>", "</table>"],
              col: [2, "<table><colgroup>", "</colgroup></table>"],
              tr: [2, "<table><tbody>", "</tbody></table>"],
              td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
              _default: [0, "", ""],
            };
          function ue(e, t) {
            var n;
            return (
              (n =
                void 0 !== e.getElementsByTagName
                  ? e.getElementsByTagName(t || "*")
                  : void 0 !== e.querySelectorAll
                  ? e.querySelectorAll(t || "*")
                  : []),
              void 0 === t || (t && j(e, t)) ? v.merge([e], n) : n
            );
          }
          function ce(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
              U.set(e[n], "globalEval", !t || U.get(t[n], "globalEval"));
          }
          (se.optgroup = se.option),
            (se.tbody = se.tfoot = se.colgroup = se.caption = se.thead),
            (se.th = se.td);
          var le,
            fe,
            pe = /<|&#?\w+;/;
          function de(e, t, n, r, i) {
            for (
              var o,
                a,
                s,
                u,
                c,
                l,
                f = t.createDocumentFragment(),
                p = [],
                d = 0,
                h = e.length;
              d < h;
              d++
            )
              if ((o = e[d]) || 0 === o)
                if ("object" === v.type(o)) v.merge(p, o.nodeType ? [o] : o);
                else if (pe.test(o)) {
                  for (
                    a = a || f.appendChild(t.createElement("div")),
                      s = (oe.exec(o) || ["", ""])[1].toLowerCase(),
                      u = se[s] || se._default,
                      a.innerHTML = u[1] + v.htmlPrefilter(o) + u[2],
                      l = u[0];
                    l--;

                  )
                    a = a.lastChild;
                  v.merge(p, a.childNodes),
                    ((a = f.firstChild).textContent = "");
                } else p.push(t.createTextNode(o));
            for (f.textContent = "", d = 0; (o = p[d++]); )
              if (r && v.inArray(o, r) > -1) i && i.push(o);
              else if (
                ((c = v.contains(o.ownerDocument, o)),
                (a = ue(f.appendChild(o), "script")),
                c && ce(a),
                n)
              )
                for (l = 0; (o = a[l++]); ) ae.test(o.type || "") && n.push(o);
            return f;
          }
          (le = r.createDocumentFragment().appendChild(r.createElement("div"))),
            (fe = r.createElement("input")).setAttribute("type", "radio"),
            fe.setAttribute("checked", "checked"),
            fe.setAttribute("name", "t"),
            le.appendChild(fe),
            (h.checkClone = le.cloneNode(!0).cloneNode(!0).lastChild.checked),
            (le.innerHTML = "<textarea>x</textarea>"),
            (h.noCloneChecked = !!le.cloneNode(!0).lastChild.defaultValue);
          var he = r.documentElement,
            ge = /^key/,
            ve = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            ye = /^([^.]*)(?:\.(.+)|)/;
          function me() {
            return !0;
          }
          function be() {
            return !1;
          }
          function xe() {
            try {
              return r.activeElement;
            } catch (e) {}
          }
          function we(e, t, n, r, i, o) {
            var a, s;
            if ("object" == typeof t) {
              "string" != typeof n && ((r = r || n), (n = void 0));
              for (s in t) we(e, s, n, r, t[s], o);
              return e;
            }
            if (
              (null == r && null == i
                ? ((i = n), (r = n = void 0))
                : null == i &&
                  ("string" == typeof n
                    ? ((i = r), (r = void 0))
                    : ((i = r), (r = n), (n = void 0))),
              !1 === i)
            )
              i = be;
            else if (!i) return e;
            return (
              1 === o &&
                ((a = i),
                ((i = function (e) {
                  return v().off(e), a.apply(this, arguments);
                }).guid = a.guid || (a.guid = v.guid++))),
              e.each(function () {
                v.event.add(this, t, i, r, n);
              })
            );
          }
          (v.event = {
            global: {},
            add: function (e, t, n, r, i) {
              var o,
                a,
                s,
                u,
                c,
                l,
                f,
                p,
                d,
                h,
                g,
                y = U.get(e);
              if (y)
                for (
                  n.handler && ((n = (o = n).handler), (i = o.selector)),
                    i && v.find.matchesSelector(he, i),
                    n.guid || (n.guid = v.guid++),
                    (u = y.events) || (u = y.events = {}),
                    (a = y.handle) ||
                      (a = y.handle =
                        function (t) {
                          return void 0 !== v && v.event.triggered !== t.type
                            ? v.event.dispatch.apply(e, arguments)
                            : void 0;
                        }),
                    c = (t = (t || "").match(H) || [""]).length;
                  c--;

                )
                  (d = g = (s = ye.exec(t[c]) || [])[1]),
                    (h = (s[2] || "").split(".").sort()),
                    d &&
                      ((f = v.event.special[d] || {}),
                      (d = (i ? f.delegateType : f.bindType) || d),
                      (f = v.event.special[d] || {}),
                      (l = v.extend(
                        {
                          type: d,
                          origType: g,
                          data: r,
                          handler: n,
                          guid: n.guid,
                          selector: i,
                          needsContext: i && v.expr.match.needsContext.test(i),
                          namespace: h.join("."),
                        },
                        o,
                      )),
                      (p = u[d]) ||
                        (((p = u[d] = []).delegateCount = 0),
                        (f.setup && !1 !== f.setup.call(e, r, h, a)) ||
                          (e.addEventListener && e.addEventListener(d, a))),
                      f.add &&
                        (f.add.call(e, l),
                        l.handler.guid || (l.handler.guid = n.guid)),
                      i ? p.splice(p.delegateCount++, 0, l) : p.push(l),
                      (v.event.global[d] = !0));
            },
            remove: function (e, t, n, r, i) {
              var o,
                a,
                s,
                u,
                c,
                l,
                f,
                p,
                d,
                h,
                g,
                y = U.hasData(e) && U.get(e);
              if (y && (u = y.events)) {
                for (c = (t = (t || "").match(H) || [""]).length; c--; )
                  if (
                    ((d = g = (s = ye.exec(t[c]) || [])[1]),
                    (h = (s[2] || "").split(".").sort()),
                    d)
                  ) {
                    for (
                      f = v.event.special[d] || {},
                        p =
                          u[(d = (r ? f.delegateType : f.bindType) || d)] || [],
                        s =
                          s[2] &&
                          new RegExp(
                            "(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)",
                          ),
                        a = o = p.length;
                      o--;

                    )
                      (l = p[o]),
                        (!i && g !== l.origType) ||
                          (n && n.guid !== l.guid) ||
                          (s && !s.test(l.namespace)) ||
                          (r &&
                            r !== l.selector &&
                            ("**" !== r || !l.selector)) ||
                          (p.splice(o, 1),
                          l.selector && p.delegateCount--,
                          f.remove && f.remove.call(e, l));
                    a &&
                      !p.length &&
                      ((f.teardown && !1 !== f.teardown.call(e, h, y.handle)) ||
                        v.removeEvent(e, d, y.handle),
                      delete u[d]);
                  } else for (d in u) v.event.remove(e, d + t[c], n, r, !0);
                v.isEmptyObject(u) && U.remove(e, "handle events");
              }
            },
            dispatch: function (e) {
              var t,
                n,
                r,
                i,
                o,
                a,
                s = v.event.fix(e),
                u = new Array(arguments.length),
                c = (U.get(this, "events") || {})[s.type] || [],
                l = v.event.special[s.type] || {};
              for (u[0] = s, t = 1; t < arguments.length; t++)
                u[t] = arguments[t];
              if (
                ((s.delegateTarget = this),
                !l.preDispatch || !1 !== l.preDispatch.call(this, s))
              ) {
                for (
                  a = v.event.handlers.call(this, s, c), t = 0;
                  (i = a[t++]) && !s.isPropagationStopped();

                )
                  for (
                    s.currentTarget = i.elem, n = 0;
                    (o = i.handlers[n++]) && !s.isImmediatePropagationStopped();

                  )
                    (s.rnamespace && !s.rnamespace.test(o.namespace)) ||
                      ((s.handleObj = o),
                      (s.data = o.data),
                      void 0 !==
                        (r = (
                          (v.event.special[o.origType] || {}).handle ||
                          o.handler
                        ).apply(i.elem, u)) &&
                        !1 === (s.result = r) &&
                        (s.preventDefault(), s.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, s), s.result;
              }
            },
            handlers: function (e, t) {
              var n,
                r,
                i,
                o,
                a,
                s = [],
                u = t.delegateCount,
                c = e.target;
              if (u && c.nodeType && !("click" === e.type && e.button >= 1))
                for (; c !== this; c = c.parentNode || this)
                  if (
                    1 === c.nodeType &&
                    ("click" !== e.type || !0 !== c.disabled)
                  ) {
                    for (o = [], a = {}, n = 0; n < u; n++)
                      void 0 === a[(i = (r = t[n]).selector + " ")] &&
                        (a[i] = r.needsContext
                          ? v(i, this).index(c) > -1
                          : v.find(i, this, null, [c]).length),
                        a[i] && o.push(r);
                    o.length && s.push({ elem: c, handlers: o });
                  }
              return (
                (c = this),
                u < t.length && s.push({ elem: c, handlers: t.slice(u) }),
                s
              );
            },
            addProp: function (e, t) {
              Object.defineProperty(v.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: v.isFunction(t)
                  ? function () {
                      if (this.originalEvent) return t(this.originalEvent);
                    }
                  : function () {
                      if (this.originalEvent) return this.originalEvent[e];
                    },
                set: function (t) {
                  Object.defineProperty(this, e, {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: t,
                  });
                },
              });
            },
            fix: function (e) {
              return e[v.expando] ? e : new v.Event(e);
            },
            special: {
              load: { noBubble: !0 },
              focus: {
                trigger: function () {
                  if (this !== xe() && this.focus) return this.focus(), !1;
                },
                delegateType: "focusin",
              },
              blur: {
                trigger: function () {
                  if (this === xe() && this.blur) return this.blur(), !1;
                },
                delegateType: "focusout",
              },
              click: {
                trigger: function () {
                  if (
                    "checkbox" === this.type &&
                    this.click &&
                    j(this, "input")
                  )
                    return this.click(), !1;
                },
                _default: function (e) {
                  return j(e.target, "a");
                },
              },
              beforeunload: {
                postDispatch: function (e) {
                  void 0 !== e.result &&
                    e.originalEvent &&
                    (e.originalEvent.returnValue = e.result);
                },
              },
            },
          }),
            (v.removeEvent = function (e, t, n) {
              e.removeEventListener && e.removeEventListener(t, n);
            }),
            (v.Event = function (e, t) {
              if (!(this instanceof v.Event)) return new v.Event(e, t);
              e && e.type
                ? ((this.originalEvent = e),
                  (this.type = e.type),
                  (this.isDefaultPrevented =
                    e.defaultPrevented ||
                    (void 0 === e.defaultPrevented && !1 === e.returnValue)
                      ? me
                      : be),
                  (this.target =
                    e.target && 3 === e.target.nodeType
                      ? e.target.parentNode
                      : e.target),
                  (this.currentTarget = e.currentTarget),
                  (this.relatedTarget = e.relatedTarget))
                : (this.type = e),
                t && v.extend(this, t),
                (this.timeStamp = (e && e.timeStamp) || v.now()),
                (this[v.expando] = !0);
            }),
            (v.Event.prototype = {
              constructor: v.Event,
              isDefaultPrevented: be,
              isPropagationStopped: be,
              isImmediatePropagationStopped: be,
              isSimulated: !1,
              preventDefault: function () {
                var e = this.originalEvent;
                (this.isDefaultPrevented = me),
                  e && !this.isSimulated && e.preventDefault();
              },
              stopPropagation: function () {
                var e = this.originalEvent;
                (this.isPropagationStopped = me),
                  e && !this.isSimulated && e.stopPropagation();
              },
              stopImmediatePropagation: function () {
                var e = this.originalEvent;
                (this.isImmediatePropagationStopped = me),
                  e && !this.isSimulated && e.stopImmediatePropagation(),
                  this.stopPropagation();
              },
            }),
            v.each(
              {
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: function (e) {
                  var t = e.button;
                  return null == e.which && ge.test(e.type)
                    ? null != e.charCode
                      ? e.charCode
                      : e.keyCode
                    : !e.which && void 0 !== t && ve.test(e.type)
                    ? 1 & t
                      ? 1
                      : 2 & t
                      ? 3
                      : 4 & t
                      ? 2
                      : 0
                    : e.which;
                },
              },
              v.event.addProp,
            ),
            v.each(
              {
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout",
              },
              function (e, t) {
                v.event.special[e] = {
                  delegateType: t,
                  bindType: t,
                  handle: function (e) {
                    var n,
                      r = e.relatedTarget,
                      i = e.handleObj;
                    return (
                      (r && (r === this || v.contains(this, r))) ||
                        ((e.type = i.origType),
                        (n = i.handler.apply(this, arguments)),
                        (e.type = t)),
                      n
                    );
                  },
                };
              },
            ),
            v.fn.extend({
              on: function (e, t, n, r) {
                return we(this, e, t, n, r);
              },
              one: function (e, t, n, r) {
                return we(this, e, t, n, r, 1);
              },
              off: function (e, t, n) {
                var r, i;
                if (e && e.preventDefault && e.handleObj)
                  return (
                    (r = e.handleObj),
                    v(e.delegateTarget).off(
                      r.namespace ? r.origType + "." + r.namespace : r.origType,
                      r.selector,
                      r.handler,
                    ),
                    this
                  );
                if ("object" == typeof e) {
                  for (i in e) this.off(i, t, e[i]);
                  return this;
                }
                return (
                  (!1 !== t && "function" != typeof t) ||
                    ((n = t), (t = void 0)),
                  !1 === n && (n = be),
                  this.each(function () {
                    v.event.remove(this, e, n, t);
                  })
                );
              },
            });
          var Te =
              /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            Ce = /<script|<style|<link/i,
            ke = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Ee = /^true\/(.*)/,
            je = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
          function Se(e, t) {
            return j(e, "table") &&
              j(11 !== t.nodeType ? t : t.firstChild, "tr")
              ? v(">tbody", e)[0] || e
              : e;
          }
          function De(e) {
            return (
              (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e
            );
          }
          function Ae(e) {
            var t = Ee.exec(e.type);
            return t ? (e.type = t[1]) : e.removeAttribute("type"), e;
          }
          function Ne(e, t) {
            var n, r, i, o, a, s, u, c;
            if (1 === t.nodeType) {
              if (
                U.hasData(e) &&
                ((o = U.access(e)), (a = U.set(t, o)), (c = o.events))
              ) {
                delete a.handle, (a.events = {});
                for (i in c)
                  for (n = 0, r = c[i].length; n < r; n++)
                    v.event.add(t, i, c[i][n]);
              }
              X.hasData(e) &&
                ((s = X.access(e)), (u = v.extend({}, s)), X.set(t, u));
            }
          }
          function qe(e, t, n, r) {
            t = a.apply([], t);
            var i,
              o,
              s,
              u,
              c,
              l,
              f = 0,
              p = e.length,
              d = p - 1,
              y = t[0],
              m = v.isFunction(y);
            if (
              m ||
              (p > 1 && "string" == typeof y && !h.checkClone && ke.test(y))
            )
              return e.each(function (i) {
                var o = e.eq(i);
                m && (t[0] = y.call(this, i, o.html())), qe(o, t, n, r);
              });
            if (
              p &&
              ((o = (i = de(t, e[0].ownerDocument, !1, e, r)).firstChild),
              1 === i.childNodes.length && (i = o),
              o || r)
            ) {
              for (u = (s = v.map(ue(i, "script"), De)).length; f < p; f++)
                (c = i),
                  f !== d &&
                    ((c = v.clone(c, !0, !0)),
                    u && v.merge(s, ue(c, "script"))),
                  n.call(e[f], c, f);
              if (u)
                for (
                  l = s[s.length - 1].ownerDocument, v.map(s, Ae), f = 0;
                  f < u;
                  f++
                )
                  (c = s[f]),
                    ae.test(c.type || "") &&
                      !U.access(c, "globalEval") &&
                      v.contains(l, c) &&
                      (c.src
                        ? v._evalUrl && v._evalUrl(c.src)
                        : g(c.textContent.replace(je, ""), l));
            }
            return e;
          }
          function _e(e, t, n) {
            for (
              var r, i = t ? v.filter(t, e) : e, o = 0;
              null != (r = i[o]);
              o++
            )
              n || 1 !== r.nodeType || v.cleanData(ue(r)),
                r.parentNode &&
                  (n && v.contains(r.ownerDocument, r) && ce(ue(r, "script")),
                  r.parentNode.removeChild(r));
            return e;
          }
          v.extend({
            htmlPrefilter: function (e) {
              return e.replace(Te, "<$1></$2>");
            },
            clone: function (e, t, n) {
              var r,
                i,
                o,
                a,
                s,
                u,
                c,
                l = e.cloneNode(!0),
                f = v.contains(e.ownerDocument, e);
              if (
                !(
                  h.noCloneChecked ||
                  (1 !== e.nodeType && 11 !== e.nodeType) ||
                  v.isXMLDoc(e)
                )
              )
                for (a = ue(l), r = 0, i = (o = ue(e)).length; r < i; r++)
                  (s = o[r]),
                    (u = a[r]),
                    void 0,
                    "input" === (c = u.nodeName.toLowerCase()) &&
                    ie.test(s.type)
                      ? (u.checked = s.checked)
                      : ("input" !== c && "textarea" !== c) ||
                        (u.defaultValue = s.defaultValue);
              if (t)
                if (n)
                  for (
                    o = o || ue(e), a = a || ue(l), r = 0, i = o.length;
                    r < i;
                    r++
                  )
                    Ne(o[r], a[r]);
                else Ne(e, l);
              return (
                (a = ue(l, "script")).length > 0 &&
                  ce(a, !f && ue(e, "script")),
                l
              );
            },
            cleanData: function (e) {
              for (
                var t, n, r, i = v.event.special, o = 0;
                void 0 !== (n = e[o]);
                o++
              )
                if ($(n)) {
                  if ((t = n[U.expando])) {
                    if (t.events)
                      for (r in t.events)
                        i[r]
                          ? v.event.remove(n, r)
                          : v.removeEvent(n, r, t.handle);
                    n[U.expando] = void 0;
                  }
                  n[X.expando] && (n[X.expando] = void 0);
                }
            },
          }),
            v.fn.extend({
              detach: function (e) {
                return _e(this, e, !0);
              },
              remove: function (e) {
                return _e(this, e);
              },
              text: function (e) {
                return W(
                  this,
                  function (e) {
                    return void 0 === e
                      ? v.text(this)
                      : this.empty().each(function () {
                          (1 !== this.nodeType &&
                            11 !== this.nodeType &&
                            9 !== this.nodeType) ||
                            (this.textContent = e);
                        });
                  },
                  null,
                  e,
                  arguments.length,
                );
              },
              append: function () {
                return qe(this, arguments, function (e) {
                  (1 !== this.nodeType &&
                    11 !== this.nodeType &&
                    9 !== this.nodeType) ||
                    Se(this, e).appendChild(e);
                });
              },
              prepend: function () {
                return qe(this, arguments, function (e) {
                  if (
                    1 === this.nodeType ||
                    11 === this.nodeType ||
                    9 === this.nodeType
                  ) {
                    var t = Se(this, e);
                    t.insertBefore(e, t.firstChild);
                  }
                });
              },
              before: function () {
                return qe(this, arguments, function (e) {
                  this.parentNode && this.parentNode.insertBefore(e, this);
                });
              },
              after: function () {
                return qe(this, arguments, function (e) {
                  this.parentNode &&
                    this.parentNode.insertBefore(e, this.nextSibling);
                });
              },
              empty: function () {
                for (var e, t = 0; null != (e = this[t]); t++)
                  1 === e.nodeType &&
                    (v.cleanData(ue(e, !1)), (e.textContent = ""));
                return this;
              },
              clone: function (e, t) {
                return (
                  (e = null != e && e),
                  (t = null == t ? e : t),
                  this.map(function () {
                    return v.clone(this, e, t);
                  })
                );
              },
              html: function (e) {
                return W(
                  this,
                  function (e) {
                    var t = this[0] || {},
                      n = 0,
                      r = this.length;
                    if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                    if (
                      "string" == typeof e &&
                      !Ce.test(e) &&
                      !se[(oe.exec(e) || ["", ""])[1].toLowerCase()]
                    ) {
                      e = v.htmlPrefilter(e);
                      try {
                        for (; n < r; n++)
                          1 === (t = this[n] || {}).nodeType &&
                            (v.cleanData(ue(t, !1)), (t.innerHTML = e));
                        t = 0;
                      } catch (e) {}
                    }
                    t && this.empty().append(e);
                  },
                  null,
                  e,
                  arguments.length,
                );
              },
              replaceWith: function () {
                var e = [];
                return qe(
                  this,
                  arguments,
                  function (t) {
                    var n = this.parentNode;
                    v.inArray(this, e) < 0 &&
                      (v.cleanData(ue(this)), n && n.replaceChild(t, this));
                  },
                  e,
                );
              },
            }),
            v.each(
              {
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith",
              },
              function (e, t) {
                v.fn[e] = function (e) {
                  for (
                    var n, r = [], i = v(e), o = i.length - 1, a = 0;
                    a <= o;
                    a++
                  )
                    (n = a === o ? this : this.clone(!0)),
                      v(i[a])[t](n),
                      s.apply(r, n.get());
                  return this.pushStack(r);
                };
              },
            );
          var Oe = /^margin/,
            Le = new RegExp("^(" + Q + ")(?!px)[a-z%]+$", "i"),
            He = function (t) {
              var n = t.ownerDocument.defaultView;
              return (n && n.opener) || (n = e), n.getComputedStyle(t);
            };
          function Be(e, t, n) {
            var r,
              i,
              o,
              a,
              s = e.style;
            return (
              (n = n || He(e)) &&
                ("" !== (a = n.getPropertyValue(t) || n[t]) ||
                  v.contains(e.ownerDocument, e) ||
                  (a = v.style(e, t)),
                !h.pixelMarginRight() &&
                  Le.test(a) &&
                  Oe.test(t) &&
                  ((r = s.width),
                  (i = s.minWidth),
                  (o = s.maxWidth),
                  (s.minWidth = s.maxWidth = s.width = a),
                  (a = n.width),
                  (s.width = r),
                  (s.minWidth = i),
                  (s.maxWidth = o))),
              void 0 !== a ? a + "" : a
            );
          }
          function Pe(e, t) {
            return {
              get: function () {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get;
              },
            };
          }
          !(function () {
            function t() {
              if (u) {
                (u.style.cssText =
                  "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%"),
                  (u.innerHTML = ""),
                  he.appendChild(s);
                var t = e.getComputedStyle(u);
                (n = "1%" !== t.top),
                  (a = "2px" === t.marginLeft),
                  (i = "4px" === t.width),
                  (u.style.marginRight = "50%"),
                  (o = "4px" === t.marginRight),
                  he.removeChild(s),
                  (u = null);
              }
            }
            var n,
              i,
              o,
              a,
              s = r.createElement("div"),
              u = r.createElement("div");
            u.style &&
              ((u.style.backgroundClip = "content-box"),
              (u.cloneNode(!0).style.backgroundClip = ""),
              (h.clearCloneStyle = "content-box" === u.style.backgroundClip),
              (s.style.cssText =
                "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute"),
              s.appendChild(u),
              v.extend(h, {
                pixelPosition: function () {
                  return t(), n;
                },
                boxSizingReliable: function () {
                  return t(), i;
                },
                pixelMarginRight: function () {
                  return t(), o;
                },
                reliableMarginLeft: function () {
                  return t(), a;
                },
              }));
          })();
          var Fe = /^(none|table(?!-c[ea]).+)/,
            Me = /^--/,
            Re = {
              position: "absolute",
              visibility: "hidden",
              display: "block",
            },
            Ie = { letterSpacing: "0", fontWeight: "400" },
            We = ["Webkit", "Moz", "ms"],
            $e = r.createElement("div").style;
          function ze(e) {
            var t = v.cssProps[e];
            return (
              t ||
                (t = v.cssProps[e] =
                  (function (e) {
                    if (e in $e) return e;
                    for (
                      var t = e[0].toUpperCase() + e.slice(1), n = We.length;
                      n--;

                    )
                      if ((e = We[n] + t) in $e) return e;
                  })(e) || e),
              t
            );
          }
          function Ue(e, t, n) {
            var r = J.exec(t);
            return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
          }
          function Xe(e, t, n, r, i) {
            var o,
              a = 0;
            for (
              o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0;
              o < 4;
              o += 2
            )
              "margin" === n && (a += v.css(e, n + K[o], !0, i)),
                r
                  ? ("content" === n &&
                      (a -= v.css(e, "padding" + K[o], !0, i)),
                    "margin" !== n &&
                      (a -= v.css(e, "border" + K[o] + "Width", !0, i)))
                  : ((a += v.css(e, "padding" + K[o], !0, i)),
                    "padding" !== n &&
                      (a += v.css(e, "border" + K[o] + "Width", !0, i)));
            return a;
          }
          function Ve(e, t, n) {
            var r,
              i = He(e),
              o = Be(e, t, i),
              a = "border-box" === v.css(e, "boxSizing", !1, i);
            return Le.test(o)
              ? o
              : ((r = a && (h.boxSizingReliable() || o === e.style[t])),
                "auto" === o &&
                  (o = e["offset" + t[0].toUpperCase() + t.slice(1)]),
                (o = parseFloat(o) || 0) +
                  Xe(e, t, n || (a ? "border" : "content"), r, i) +
                  "px");
          }
          function Ge(e, t, n, r, i) {
            return new Ge.prototype.init(e, t, n, r, i);
          }
          v.extend({
            cssHooks: {
              opacity: {
                get: function (e, t) {
                  if (t) {
                    var n = Be(e, "opacity");
                    return "" === n ? "1" : n;
                  }
                },
              },
            },
            cssNumber: {
              animationIterationCount: !0,
              columnCount: !0,
              fillOpacity: !0,
              flexGrow: !0,
              flexShrink: !0,
              fontWeight: !0,
              lineHeight: !0,
              opacity: !0,
              order: !0,
              orphans: !0,
              widows: !0,
              zIndex: !0,
              zoom: !0,
            },
            cssProps: { float: "cssFloat" },
            style: function (e, t, n, r) {
              if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i,
                  o,
                  a,
                  s = v.camelCase(t),
                  u = Me.test(t),
                  c = e.style;
                if (
                  (u || (t = ze(s)),
                  (a = v.cssHooks[t] || v.cssHooks[s]),
                  void 0 === n)
                )
                  return a && "get" in a && void 0 !== (i = a.get(e, !1, r))
                    ? i
                    : c[t];
                "string" === (o = typeof n) &&
                  (i = J.exec(n)) &&
                  i[1] &&
                  ((n = te(e, t, i)), (o = "number")),
                  null != n &&
                    n == n &&
                    ("number" === o &&
                      (n += (i && i[3]) || (v.cssNumber[s] ? "" : "px")),
                    h.clearCloneStyle ||
                      "" !== n ||
                      0 !== t.indexOf("background") ||
                      (c[t] = "inherit"),
                    (a && "set" in a && void 0 === (n = a.set(e, n, r))) ||
                      (u ? c.setProperty(t, n) : (c[t] = n)));
              }
            },
            css: function (e, t, n, r) {
              var i,
                o,
                a,
                s = v.camelCase(t);
              return (
                Me.test(t) || (t = ze(s)),
                (a = v.cssHooks[t] || v.cssHooks[s]) &&
                  "get" in a &&
                  (i = a.get(e, !0, n)),
                void 0 === i && (i = Be(e, t, r)),
                "normal" === i && t in Ie && (i = Ie[t]),
                "" === n || n
                  ? ((o = parseFloat(i)), !0 === n || isFinite(o) ? o || 0 : i)
                  : i
              );
            },
          }),
            v.each(["height", "width"], function (e, t) {
              v.cssHooks[t] = {
                get: function (e, n, r) {
                  if (n)
                    return !Fe.test(v.css(e, "display")) ||
                      (e.getClientRects().length &&
                        e.getBoundingClientRect().width)
                      ? Ve(e, t, r)
                      : ee(e, Re, function () {
                          return Ve(e, t, r);
                        });
                },
                set: function (e, n, r) {
                  var i,
                    o = r && He(e),
                    a =
                      r &&
                      Xe(
                        e,
                        t,
                        r,
                        "border-box" === v.css(e, "boxSizing", !1, o),
                        o,
                      );
                  return (
                    a &&
                      (i = J.exec(n)) &&
                      "px" !== (i[3] || "px") &&
                      ((e.style[t] = n), (n = v.css(e, t))),
                    Ue(0, n, a)
                  );
                },
              };
            }),
            (v.cssHooks.marginLeft = Pe(h.reliableMarginLeft, function (e, t) {
              if (t)
                return (
                  (parseFloat(Be(e, "marginLeft")) ||
                    e.getBoundingClientRect().left -
                      ee(e, { marginLeft: 0 }, function () {
                        return e.getBoundingClientRect().left;
                      })) + "px"
                );
            })),
            v.each(
              { margin: "", padding: "", border: "Width" },
              function (e, t) {
                (v.cssHooks[e + t] = {
                  expand: function (n) {
                    for (
                      var r = 0,
                        i = {},
                        o = "string" == typeof n ? n.split(" ") : [n];
                      r < 4;
                      r++
                    )
                      i[e + K[r] + t] = o[r] || o[r - 2] || o[0];
                    return i;
                  },
                }),
                  Oe.test(e) || (v.cssHooks[e + t].set = Ue);
              },
            ),
            v.fn.extend({
              css: function (e, t) {
                return W(
                  this,
                  function (e, t, n) {
                    var r,
                      i,
                      o = {},
                      a = 0;
                    if (Array.isArray(t)) {
                      for (r = He(e), i = t.length; a < i; a++)
                        o[t[a]] = v.css(e, t[a], !1, r);
                      return o;
                    }
                    return void 0 !== n ? v.style(e, t, n) : v.css(e, t);
                  },
                  e,
                  t,
                  arguments.length > 1,
                );
              },
            }),
            (v.Tween = Ge),
            (Ge.prototype = {
              constructor: Ge,
              init: function (e, t, n, r, i, o) {
                (this.elem = e),
                  (this.prop = n),
                  (this.easing = i || v.easing._default),
                  (this.options = t),
                  (this.start = this.now = this.cur()),
                  (this.end = r),
                  (this.unit = o || (v.cssNumber[n] ? "" : "px"));
              },
              cur: function () {
                var e = Ge.propHooks[this.prop];
                return e && e.get
                  ? e.get(this)
                  : Ge.propHooks._default.get(this);
              },
              run: function (e) {
                var t,
                  n = Ge.propHooks[this.prop];
                return (
                  this.options.duration
                    ? (this.pos = t =
                        v.easing[this.easing](
                          e,
                          this.options.duration * e,
                          0,
                          1,
                          this.options.duration,
                        ))
                    : (this.pos = t = e),
                  (this.now = (this.end - this.start) * t + this.start),
                  this.options.step &&
                    this.options.step.call(this.elem, this.now, this),
                  n && n.set ? n.set(this) : Ge.propHooks._default.set(this),
                  this
                );
              },
            }),
            (Ge.prototype.init.prototype = Ge.prototype),
            (Ge.propHooks = {
              _default: {
                get: function (e) {
                  var t;
                  return 1 !== e.elem.nodeType ||
                    (null != e.elem[e.prop] && null == e.elem.style[e.prop])
                    ? e.elem[e.prop]
                    : (t = v.css(e.elem, e.prop, "")) && "auto" !== t
                    ? t
                    : 0;
                },
                set: function (e) {
                  v.fx.step[e.prop]
                    ? v.fx.step[e.prop](e)
                    : 1 !== e.elem.nodeType ||
                      (null == e.elem.style[v.cssProps[e.prop]] &&
                        !v.cssHooks[e.prop])
                    ? (e.elem[e.prop] = e.now)
                    : v.style(e.elem, e.prop, e.now + e.unit);
                },
              },
            }),
            (Ge.propHooks.scrollTop = Ge.propHooks.scrollLeft =
              {
                set: function (e) {
                  e.elem.nodeType &&
                    e.elem.parentNode &&
                    (e.elem[e.prop] = e.now);
                },
              }),
            (v.easing = {
              linear: function (e) {
                return e;
              },
              swing: function (e) {
                return 0.5 - Math.cos(e * Math.PI) / 2;
              },
              _default: "swing",
            }),
            (v.fx = Ge.prototype.init),
            (v.fx.step = {});
          var Ye,
            Qe,
            Je,
            Ke,
            Ze = /^(?:toggle|show|hide)$/,
            et = /queueHooks$/;
          function tt() {
            Qe &&
              (!1 === r.hidden && e.requestAnimationFrame
                ? e.requestAnimationFrame(tt)
                : e.setTimeout(tt, v.fx.interval),
              v.fx.tick());
          }
          function nt() {
            return (
              e.setTimeout(function () {
                Ye = void 0;
              }),
              (Ye = v.now())
            );
          }
          function rt(e, t) {
            var n,
              r = 0,
              i = { height: e };
            for (t = t ? 1 : 0; r < 4; r += 2 - t)
              i["margin" + (n = K[r])] = i["padding" + n] = e;
            return t && (i.opacity = i.width = e), i;
          }
          function it(e, t, n) {
            for (
              var r,
                i = (ot.tweeners[t] || []).concat(ot.tweeners["*"]),
                o = 0,
                a = i.length;
              o < a;
              o++
            )
              if ((r = i[o].call(n, t, e))) return r;
          }
          function ot(e, t, n) {
            var r,
              i,
              o = 0,
              a = ot.prefilters.length,
              s = v.Deferred().always(function () {
                delete u.elem;
              }),
              u = function () {
                if (i) return !1;
                for (
                  var t = Ye || nt(),
                    n = Math.max(0, c.startTime + c.duration - t),
                    r = 1 - (n / c.duration || 0),
                    o = 0,
                    a = c.tweens.length;
                  o < a;
                  o++
                )
                  c.tweens[o].run(r);
                return (
                  s.notifyWith(e, [c, r, n]),
                  r < 1 && a
                    ? n
                    : (a || s.notifyWith(e, [c, 1, 0]),
                      s.resolveWith(e, [c]),
                      !1)
                );
              },
              c = s.promise({
                elem: e,
                props: v.extend({}, t),
                opts: v.extend(
                  !0,
                  { specialEasing: {}, easing: v.easing._default },
                  n,
                ),
                originalProperties: t,
                originalOptions: n,
                startTime: Ye || nt(),
                duration: n.duration,
                tweens: [],
                createTween: function (t, n) {
                  var r = v.Tween(
                    e,
                    c.opts,
                    t,
                    n,
                    c.opts.specialEasing[t] || c.opts.easing,
                  );
                  return c.tweens.push(r), r;
                },
                stop: function (t) {
                  var n = 0,
                    r = t ? c.tweens.length : 0;
                  if (i) return this;
                  for (i = !0; n < r; n++) c.tweens[n].run(1);
                  return (
                    t
                      ? (s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c, t]))
                      : s.rejectWith(e, [c, t]),
                    this
                  );
                },
              }),
              l = c.props;
            for (
              !(function (e, t) {
                var n, r, i, o, a;
                for (n in e)
                  if (
                    ((i = t[(r = v.camelCase(n))]),
                    (o = e[n]),
                    Array.isArray(o) && ((i = o[1]), (o = e[n] = o[0])),
                    n !== r && ((e[r] = o), delete e[n]),
                    (a = v.cssHooks[r]) && ("expand" in a))
                  ) {
                    (o = a.expand(o)), delete e[r];
                    for (n in o) (n in e) || ((e[n] = o[n]), (t[n] = i));
                  } else t[r] = i;
              })(l, c.opts.specialEasing);
              o < a;
              o++
            )
              if ((r = ot.prefilters[o].call(c, e, l, c.opts)))
                return (
                  v.isFunction(r.stop) &&
                    (v._queueHooks(c.elem, c.opts.queue).stop = v.proxy(
                      r.stop,
                      r,
                    )),
                  r
                );
            return (
              v.map(l, it, c),
              v.isFunction(c.opts.start) && c.opts.start.call(e, c),
              c
                .progress(c.opts.progress)
                .done(c.opts.done, c.opts.complete)
                .fail(c.opts.fail)
                .always(c.opts.always),
              v.fx.timer(
                v.extend(u, { elem: e, anim: c, queue: c.opts.queue }),
              ),
              c
            );
          }
          (v.Animation = v.extend(ot, {
            tweeners: {
              "*": [
                function (e, t) {
                  var n = this.createTween(e, t);
                  return te(n.elem, e, J.exec(t), n), n;
                },
              ],
            },
            tweener: function (e, t) {
              v.isFunction(e) ? ((t = e), (e = ["*"])) : (e = e.match(H));
              for (var n, r = 0, i = e.length; r < i; r++)
                (n = e[r]),
                  (ot.tweeners[n] = ot.tweeners[n] || []),
                  ot.tweeners[n].unshift(t);
            },
            prefilters: [
              function (e, t, n) {
                var r,
                  i,
                  o,
                  a,
                  s,
                  u,
                  c,
                  l,
                  f = "width" in t || "height" in t,
                  p = this,
                  d = {},
                  h = e.style,
                  g = e.nodeType && Z(e),
                  y = U.get(e, "fxshow");
                n.queue ||
                  (null == (a = v._queueHooks(e, "fx")).unqueued &&
                    ((a.unqueued = 0),
                    (s = a.empty.fire),
                    (a.empty.fire = function () {
                      a.unqueued || s();
                    })),
                  a.unqueued++,
                  p.always(function () {
                    p.always(function () {
                      a.unqueued--, v.queue(e, "fx").length || a.empty.fire();
                    });
                  }));
                for (r in t)
                  if (((i = t[r]), Ze.test(i))) {
                    if (
                      (delete t[r],
                      (o = o || "toggle" === i),
                      i === (g ? "hide" : "show"))
                    ) {
                      if ("show" !== i || !y || void 0 === y[r]) continue;
                      g = !0;
                    }
                    d[r] = (y && y[r]) || v.style(e, r);
                  }
                if ((u = !v.isEmptyObject(t)) || !v.isEmptyObject(d)) {
                  f &&
                    1 === e.nodeType &&
                    ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
                    null == (c = y && y.display) && (c = U.get(e, "display")),
                    "none" === (l = v.css(e, "display")) &&
                      (c
                        ? (l = c)
                        : (re([e], !0),
                          (c = e.style.display || c),
                          (l = v.css(e, "display")),
                          re([e]))),
                    ("inline" === l || ("inline-block" === l && null != c)) &&
                      "none" === v.css(e, "float") &&
                      (u ||
                        (p.done(function () {
                          h.display = c;
                        }),
                        null == c &&
                          ((l = h.display), (c = "none" === l ? "" : l))),
                      (h.display = "inline-block"))),
                    n.overflow &&
                      ((h.overflow = "hidden"),
                      p.always(function () {
                        (h.overflow = n.overflow[0]),
                          (h.overflowX = n.overflow[1]),
                          (h.overflowY = n.overflow[2]);
                      })),
                    (u = !1);
                  for (r in d)
                    u ||
                      (y
                        ? "hidden" in y && (g = y.hidden)
                        : (y = U.access(e, "fxshow", { display: c })),
                      o && (y.hidden = !g),
                      g && re([e], !0),
                      p.done(function () {
                        g || re([e]), U.remove(e, "fxshow");
                        for (r in d) v.style(e, r, d[r]);
                      })),
                      (u = it(g ? y[r] : 0, r, p)),
                      r in y ||
                        ((y[r] = u.start),
                        g && ((u.end = u.start), (u.start = 0)));
                }
              },
            ],
            prefilter: function (e, t) {
              t ? ot.prefilters.unshift(e) : ot.prefilters.push(e);
            },
          })),
            (v.speed = function (e, t, n) {
              var r =
                e && "object" == typeof e
                  ? v.extend({}, e)
                  : {
                      complete: n || (!n && t) || (v.isFunction(e) && e),
                      duration: e,
                      easing: (n && t) || (t && !v.isFunction(t) && t),
                    };
              return (
                v.fx.off
                  ? (r.duration = 0)
                  : "number" != typeof r.duration &&
                    (r.duration in v.fx.speeds
                      ? (r.duration = v.fx.speeds[r.duration])
                      : (r.duration = v.fx.speeds._default)),
                (null != r.queue && !0 !== r.queue) || (r.queue = "fx"),
                (r.old = r.complete),
                (r.complete = function () {
                  v.isFunction(r.old) && r.old.call(this),
                    r.queue && v.dequeue(this, r.queue);
                }),
                r
              );
            }),
            v.fn.extend({
              fadeTo: function (e, t, n, r) {
                return this.filter(Z)
                  .css("opacity", 0)
                  .show()
                  .end()
                  .animate({ opacity: t }, e, n, r);
              },
              animate: function (e, t, n, r) {
                var i = v.isEmptyObject(e),
                  o = v.speed(t, n, r),
                  a = function () {
                    var t = ot(this, v.extend({}, e), o);
                    (i || U.get(this, "finish")) && t.stop(!0);
                  };
                return (
                  (a.finish = a),
                  i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
                );
              },
              stop: function (e, t, n) {
                var r = function (e) {
                  var t = e.stop;
                  delete e.stop, t(n);
                };
                return (
                  "string" != typeof e && ((n = t), (t = e), (e = void 0)),
                  t && !1 !== e && this.queue(e || "fx", []),
                  this.each(function () {
                    var t = !0,
                      i = null != e && e + "queueHooks",
                      o = v.timers,
                      a = U.get(this);
                    if (i) a[i] && a[i].stop && r(a[i]);
                    else
                      for (i in a) a[i] && a[i].stop && et.test(i) && r(a[i]);
                    for (i = o.length; i--; )
                      o[i].elem !== this ||
                        (null != e && o[i].queue !== e) ||
                        (o[i].anim.stop(n), (t = !1), o.splice(i, 1));
                    (!t && n) || v.dequeue(this, e);
                  })
                );
              },
              finish: function (e) {
                return (
                  !1 !== e && (e = e || "fx"),
                  this.each(function () {
                    var t,
                      n = U.get(this),
                      r = n[e + "queue"],
                      i = n[e + "queueHooks"],
                      o = v.timers,
                      a = r ? r.length : 0;
                    for (
                      n.finish = !0,
                        v.queue(this, e, []),
                        i && i.stop && i.stop.call(this, !0),
                        t = o.length;
                      t--;

                    )
                      o[t].elem === this &&
                        o[t].queue === e &&
                        (o[t].anim.stop(!0), o.splice(t, 1));
                    for (t = 0; t < a; t++)
                      r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish;
                  })
                );
              },
            }),
            v.each(["toggle", "show", "hide"], function (e, t) {
              var n = v.fn[t];
              v.fn[t] = function (e, r, i) {
                return null == e || "boolean" == typeof e
                  ? n.apply(this, arguments)
                  : this.animate(rt(t, !0), e, r, i);
              };
            }),
            v.each(
              {
                slideDown: rt("show"),
                slideUp: rt("hide"),
                slideToggle: rt("toggle"),
                fadeIn: { opacity: "show" },
                fadeOut: { opacity: "hide" },
                fadeToggle: { opacity: "toggle" },
              },
              function (e, t) {
                v.fn[e] = function (e, n, r) {
                  return this.animate(t, e, n, r);
                };
              },
            ),
            (v.timers = []),
            (v.fx.tick = function () {
              var e,
                t = 0,
                n = v.timers;
              for (Ye = v.now(); t < n.length; t++)
                (e = n[t])() || n[t] !== e || n.splice(t--, 1);
              n.length || v.fx.stop(), (Ye = void 0);
            }),
            (v.fx.timer = function (e) {
              v.timers.push(e), v.fx.start();
            }),
            (v.fx.interval = 13),
            (v.fx.start = function () {
              Qe || ((Qe = !0), tt());
            }),
            (v.fx.stop = function () {
              Qe = null;
            }),
            (v.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
            (v.fn.delay = function (t, n) {
              return (
                (t = v.fx ? v.fx.speeds[t] || t : t),
                (n = n || "fx"),
                this.queue(n, function (n, r) {
                  var i = e.setTimeout(n, t);
                  r.stop = function () {
                    e.clearTimeout(i);
                  };
                })
              );
            }),
            (Je = r.createElement("input")),
            (Ke = r
              .createElement("select")
              .appendChild(r.createElement("option"))),
            (Je.type = "checkbox"),
            (h.checkOn = "" !== Je.value),
            (h.optSelected = Ke.selected),
            ((Je = r.createElement("input")).value = "t"),
            (Je.type = "radio"),
            (h.radioValue = "t" === Je.value);
          var at,
            st = v.expr.attrHandle;
          v.fn.extend({
            attr: function (e, t) {
              return W(this, v.attr, e, t, arguments.length > 1);
            },
            removeAttr: function (e) {
              return this.each(function () {
                v.removeAttr(this, e);
              });
            },
          }),
            v.extend({
              attr: function (e, t, n) {
                var r,
                  i,
                  o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o)
                  return void 0 === e.getAttribute
                    ? v.prop(e, t, n)
                    : ((1 === o && v.isXMLDoc(e)) ||
                        (i =
                          v.attrHooks[t.toLowerCase()] ||
                          (v.expr.match.bool.test(t) ? at : void 0)),
                      void 0 !== n
                        ? null === n
                          ? void v.removeAttr(e, t)
                          : i && "set" in i && void 0 !== (r = i.set(e, n, t))
                          ? r
                          : (e.setAttribute(t, n + ""), n)
                        : i && "get" in i && null !== (r = i.get(e, t))
                        ? r
                        : null == (r = v.find.attr(e, t))
                        ? void 0
                        : r);
              },
              attrHooks: {
                type: {
                  set: function (e, t) {
                    if (!h.radioValue && "radio" === t && j(e, "input")) {
                      var n = e.value;
                      return e.setAttribute("type", t), n && (e.value = n), t;
                    }
                  },
                },
              },
              removeAttr: function (e, t) {
                var n,
                  r = 0,
                  i = t && t.match(H);
                if (i && 1 === e.nodeType)
                  for (; (n = i[r++]); ) e.removeAttribute(n);
              },
            }),
            (at = {
              set: function (e, t, n) {
                return !1 === t ? v.removeAttr(e, n) : e.setAttribute(n, n), n;
              },
            }),
            v.each(v.expr.match.bool.source.match(/\w+/g), function (e, t) {
              var n = st[t] || v.find.attr;
              st[t] = function (e, t, r) {
                var i,
                  o,
                  a = t.toLowerCase();
                return (
                  r ||
                    ((o = st[a]),
                    (st[a] = i),
                    (i = null != n(e, t, r) ? a : null),
                    (st[a] = o)),
                  i
                );
              };
            });
          var ut = /^(?:input|select|textarea|button)$/i,
            ct = /^(?:a|area)$/i;
          function lt(e) {
            return (e.match(H) || []).join(" ");
          }
          function ft(e) {
            return (e.getAttribute && e.getAttribute("class")) || "";
          }
          v.fn.extend({
            prop: function (e, t) {
              return W(this, v.prop, e, t, arguments.length > 1);
            },
            removeProp: function (e) {
              return this.each(function () {
                delete this[v.propFix[e] || e];
              });
            },
          }),
            v.extend({
              prop: function (e, t, n) {
                var r,
                  i,
                  o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o)
                  return (
                    (1 === o && v.isXMLDoc(e)) ||
                      ((t = v.propFix[t] || t), (i = v.propHooks[t])),
                    void 0 !== n
                      ? i && "set" in i && void 0 !== (r = i.set(e, n, t))
                        ? r
                        : (e[t] = n)
                      : i && "get" in i && null !== (r = i.get(e, t))
                      ? r
                      : e[t]
                  );
              },
              propHooks: {
                tabIndex: {
                  get: function (e) {
                    var t = v.find.attr(e, "tabindex");
                    return t
                      ? parseInt(t, 10)
                      : ut.test(e.nodeName) || (ct.test(e.nodeName) && e.href)
                      ? 0
                      : -1;
                  },
                },
              },
              propFix: { for: "htmlFor", class: "className" },
            }),
            h.optSelected ||
              (v.propHooks.selected = {
                get: function (e) {
                  var t = e.parentNode;
                  return t && t.parentNode && t.parentNode.selectedIndex, null;
                },
                set: function (e) {
                  var t = e.parentNode;
                  t &&
                    (t.selectedIndex,
                    t.parentNode && t.parentNode.selectedIndex);
                },
              }),
            v.each(
              [
                "tabIndex",
                "readOnly",
                "maxLength",
                "cellSpacing",
                "cellPadding",
                "rowSpan",
                "colSpan",
                "useMap",
                "frameBorder",
                "contentEditable",
              ],
              function () {
                v.propFix[this.toLowerCase()] = this;
              },
            ),
            v.fn.extend({
              addClass: function (e) {
                var t,
                  n,
                  r,
                  i,
                  o,
                  a,
                  s,
                  u = 0;
                if (v.isFunction(e))
                  return this.each(function (t) {
                    v(this).addClass(e.call(this, t, ft(this)));
                  });
                if ("string" == typeof e && e)
                  for (t = e.match(H) || []; (n = this[u++]); )
                    if (
                      ((i = ft(n)), (r = 1 === n.nodeType && " " + lt(i) + " "))
                    ) {
                      for (a = 0; (o = t[a++]); )
                        r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                      i !== (s = lt(r)) && n.setAttribute("class", s);
                    }
                return this;
              },
              removeClass: function (e) {
                var t,
                  n,
                  r,
                  i,
                  o,
                  a,
                  s,
                  u = 0;
                if (v.isFunction(e))
                  return this.each(function (t) {
                    v(this).removeClass(e.call(this, t, ft(this)));
                  });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof e && e)
                  for (t = e.match(H) || []; (n = this[u++]); )
                    if (
                      ((i = ft(n)), (r = 1 === n.nodeType && " " + lt(i) + " "))
                    ) {
                      for (a = 0; (o = t[a++]); )
                        for (; r.indexOf(" " + o + " ") > -1; )
                          r = r.replace(" " + o + " ", " ");
                      i !== (s = lt(r)) && n.setAttribute("class", s);
                    }
                return this;
              },
              toggleClass: function (e, t) {
                var n = typeof e;
                return "boolean" == typeof t && "string" === n
                  ? t
                    ? this.addClass(e)
                    : this.removeClass(e)
                  : v.isFunction(e)
                  ? this.each(function (n) {
                      v(this).toggleClass(e.call(this, n, ft(this), t), t);
                    })
                  : this.each(function () {
                      var t, r, i, o;
                      if ("string" === n)
                        for (
                          r = 0, i = v(this), o = e.match(H) || [];
                          (t = o[r++]);

                        )
                          i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                      else
                        (void 0 !== e && "boolean" !== n) ||
                          ((t = ft(this)) && U.set(this, "__className__", t),
                          this.setAttribute &&
                            this.setAttribute(
                              "class",
                              t || !1 === e
                                ? ""
                                : U.get(this, "__className__") || "",
                            ));
                    });
              },
              hasClass: function (e) {
                var t,
                  n,
                  r = 0;
                for (t = " " + e + " "; (n = this[r++]); )
                  if (
                    1 === n.nodeType &&
                    (" " + lt(ft(n)) + " ").indexOf(t) > -1
                  )
                    return !0;
                return !1;
              },
            });
          var pt = /\r/g;
          v.fn.extend({
            val: function (e) {
              var t,
                n,
                r,
                i = this[0];
              return arguments.length
                ? ((r = v.isFunction(e)),
                  this.each(function (n) {
                    var i;
                    1 === this.nodeType &&
                      (null == (i = r ? e.call(this, n, v(this).val()) : e)
                        ? (i = "")
                        : "number" == typeof i
                        ? (i += "")
                        : Array.isArray(i) &&
                          (i = v.map(i, function (e) {
                            return null == e ? "" : e + "";
                          })),
                      ((t =
                        v.valHooks[this.type] ||
                        v.valHooks[this.nodeName.toLowerCase()]) &&
                        "set" in t &&
                        void 0 !== t.set(this, i, "value")) ||
                        (this.value = i));
                  }))
                : i
                ? (t =
                    v.valHooks[i.type] ||
                    v.valHooks[i.nodeName.toLowerCase()]) &&
                  "get" in t &&
                  void 0 !== (n = t.get(i, "value"))
                  ? n
                  : "string" == typeof (n = i.value)
                  ? n.replace(pt, "")
                  : null == n
                  ? ""
                  : n
                : void 0;
            },
          }),
            v.extend({
              valHooks: {
                option: {
                  get: function (e) {
                    var t = v.find.attr(e, "value");
                    return null != t ? t : lt(v.text(e));
                  },
                },
                select: {
                  get: function (e) {
                    var t,
                      n,
                      r,
                      i = e.options,
                      o = e.selectedIndex,
                      a = "select-one" === e.type,
                      s = a ? null : [],
                      u = a ? o + 1 : i.length;
                    for (r = o < 0 ? u : a ? o : 0; r < u; r++)
                      if (
                        ((n = i[r]).selected || r === o) &&
                        !n.disabled &&
                        (!n.parentNode.disabled || !j(n.parentNode, "optgroup"))
                      ) {
                        if (((t = v(n).val()), a)) return t;
                        s.push(t);
                      }
                    return s;
                  },
                  set: function (e, t) {
                    for (
                      var n, r, i = e.options, o = v.makeArray(t), a = i.length;
                      a--;

                    )
                      ((r = i[a]).selected =
                        v.inArray(v.valHooks.option.get(r), o) > -1) &&
                        (n = !0);
                    return n || (e.selectedIndex = -1), o;
                  },
                },
              },
            }),
            v.each(["radio", "checkbox"], function () {
              (v.valHooks[this] = {
                set: function (e, t) {
                  if (Array.isArray(t))
                    return (e.checked = v.inArray(v(e).val(), t) > -1);
                },
              }),
                h.checkOn ||
                  (v.valHooks[this].get = function (e) {
                    return null === e.getAttribute("value") ? "on" : e.value;
                  });
            });
          var dt = /^(?:focusinfocus|focusoutblur)$/;
          v.extend(v.event, {
            trigger: function (t, n, i, o) {
              var a,
                s,
                u,
                c,
                l,
                p,
                d,
                h = [i || r],
                g = f.call(t, "type") ? t.type : t,
                y = f.call(t, "namespace") ? t.namespace.split(".") : [];
              if (
                ((s = u = i = i || r),
                3 !== i.nodeType &&
                  8 !== i.nodeType &&
                  !dt.test(g + v.event.triggered) &&
                  (g.indexOf(".") > -1 &&
                    ((g = (y = g.split(".")).shift()), y.sort()),
                  (l = g.indexOf(":") < 0 && "on" + g),
                  ((t = t[v.expando]
                    ? t
                    : new v.Event(g, "object" == typeof t && t)).isTrigger = o
                    ? 2
                    : 3),
                  (t.namespace = y.join(".")),
                  (t.rnamespace = t.namespace
                    ? new RegExp(
                        "(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)",
                      )
                    : null),
                  (t.result = void 0),
                  t.target || (t.target = i),
                  (n = null == n ? [t] : v.makeArray(n, [t])),
                  (d = v.event.special[g] || {}),
                  o || !d.trigger || !1 !== d.trigger.apply(i, n)))
              ) {
                if (!o && !d.noBubble && !v.isWindow(i)) {
                  for (
                    c = d.delegateType || g,
                      dt.test(c + g) || (s = s.parentNode);
                    s;
                    s = s.parentNode
                  )
                    h.push(s), (u = s);
                  u === (i.ownerDocument || r) &&
                    h.push(u.defaultView || u.parentWindow || e);
                }
                for (a = 0; (s = h[a++]) && !t.isPropagationStopped(); )
                  (t.type = a > 1 ? c : d.bindType || g),
                    (p =
                      (U.get(s, "events") || {})[t.type] &&
                      U.get(s, "handle")) && p.apply(s, n),
                    (p = l && s[l]) &&
                      p.apply &&
                      $(s) &&
                      ((t.result = p.apply(s, n)),
                      !1 === t.result && t.preventDefault());
                return (
                  (t.type = g),
                  o ||
                    t.isDefaultPrevented() ||
                    (d._default && !1 !== d._default.apply(h.pop(), n)) ||
                    !$(i) ||
                    (l &&
                      v.isFunction(i[g]) &&
                      !v.isWindow(i) &&
                      ((u = i[l]) && (i[l] = null),
                      (v.event.triggered = g),
                      i[g](),
                      (v.event.triggered = void 0),
                      u && (i[l] = u))),
                  t.result
                );
              }
            },
            simulate: function (e, t, n) {
              var r = v.extend(new v.Event(), n, { type: e, isSimulated: !0 });
              v.event.trigger(r, null, t);
            },
          }),
            v.fn.extend({
              trigger: function (e, t) {
                return this.each(function () {
                  v.event.trigger(e, t, this);
                });
              },
              triggerHandler: function (e, t) {
                var n = this[0];
                if (n) return v.event.trigger(e, t, n, !0);
              },
            }),
            v.each(
              "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
                " ",
              ),
              function (e, t) {
                v.fn[t] = function (e, n) {
                  return arguments.length > 0
                    ? this.on(t, null, e, n)
                    : this.trigger(t);
                };
              },
            ),
            v.fn.extend({
              hover: function (e, t) {
                return this.mouseenter(e).mouseleave(t || e);
              },
            }),
            (h.focusin = "onfocusin" in e),
            h.focusin ||
              v.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
                var n = function (e) {
                  v.event.simulate(t, e.target, v.event.fix(e));
                };
                v.event.special[t] = {
                  setup: function () {
                    var r = this.ownerDocument || this,
                      i = U.access(r, t);
                    i || r.addEventListener(e, n, !0),
                      U.access(r, t, (i || 0) + 1);
                  },
                  teardown: function () {
                    var r = this.ownerDocument || this,
                      i = U.access(r, t) - 1;
                    i
                      ? U.access(r, t, i)
                      : (r.removeEventListener(e, n, !0), U.remove(r, t));
                  },
                };
              });
          var ht = e.location,
            gt = v.now(),
            vt = /\?/;
          v.parseXML = function (t) {
            var n;
            if (!t || "string" != typeof t) return null;
            try {
              n = new e.DOMParser().parseFromString(t, "text/xml");
            } catch (e) {
              n = void 0;
            }
            return (
              (n && !n.getElementsByTagName("parsererror").length) ||
                v.error("Invalid XML: " + t),
              n
            );
          };
          var yt = /\[\]$/,
            mt = /\r?\n/g,
            bt = /^(?:submit|button|image|reset|file)$/i,
            xt = /^(?:input|select|textarea|keygen)/i;
          function wt(e, t, n, r) {
            var i;
            if (Array.isArray(t))
              v.each(t, function (t, i) {
                n || yt.test(e)
                  ? r(e, i)
                  : wt(
                      e +
                        "[" +
                        ("object" == typeof i && null != i ? t : "") +
                        "]",
                      i,
                      n,
                      r,
                    );
              });
            else if (n || "object" !== v.type(t)) r(e, t);
            else for (i in t) wt(e + "[" + i + "]", t[i], n, r);
          }
          (v.param = function (e, t) {
            var n,
              r = [],
              i = function (e, t) {
                var n = v.isFunction(t) ? t() : t;
                r[r.length] =
                  encodeURIComponent(e) +
                  "=" +
                  encodeURIComponent(null == n ? "" : n);
              };
            if (Array.isArray(e) || (e.jquery && !v.isPlainObject(e)))
              v.each(e, function () {
                i(this.name, this.value);
              });
            else for (n in e) wt(n, e[n], t, i);
            return r.join("&");
          }),
            v.fn.extend({
              serialize: function () {
                return v.param(this.serializeArray());
              },
              serializeArray: function () {
                return this.map(function () {
                  var e = v.prop(this, "elements");
                  return e ? v.makeArray(e) : this;
                })
                  .filter(function () {
                    var e = this.type;
                    return (
                      this.name &&
                      !v(this).is(":disabled") &&
                      xt.test(this.nodeName) &&
                      !bt.test(e) &&
                      (this.checked || !ie.test(e))
                    );
                  })
                  .map(function (e, t) {
                    var n = v(this).val();
                    return null == n
                      ? null
                      : Array.isArray(n)
                      ? v.map(n, function (e) {
                          return { name: t.name, value: e.replace(mt, "\r\n") };
                        })
                      : { name: t.name, value: n.replace(mt, "\r\n") };
                  })
                  .get();
              },
            });
          var Tt = /%20/g,
            Ct = /#.*$/,
            kt = /([?&])_=[^&]*/,
            Et = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            jt = /^(?:GET|HEAD)$/,
            St = /^\/\//,
            Dt = {},
            At = {},
            Nt = "*/".concat("*"),
            qt = r.createElement("a");
          function _t(e) {
            return function (t, n) {
              "string" != typeof t && ((n = t), (t = "*"));
              var r,
                i = 0,
                o = t.toLowerCase().match(H) || [];
              if (v.isFunction(n))
                for (; (r = o[i++]); )
                  "+" === r[0]
                    ? ((r = r.slice(1) || "*"), (e[r] = e[r] || []).unshift(n))
                    : (e[r] = e[r] || []).push(n);
            };
          }
          function Ot(e, t, n, r) {
            var i = {},
              o = e === At;
            function a(s) {
              var u;
              return (
                (i[s] = !0),
                v.each(e[s] || [], function (e, s) {
                  var c = s(t, n, r);
                  return "string" != typeof c || o || i[c]
                    ? o
                      ? !(u = c)
                      : void 0
                    : (t.dataTypes.unshift(c), a(c), !1);
                }),
                u
              );
            }
            return a(t.dataTypes[0]) || (!i["*"] && a("*"));
          }
          function Lt(e, t) {
            var n,
              r,
              i = v.ajaxSettings.flatOptions || {};
            for (n in t)
              void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
            return r && v.extend(!0, e, r), e;
          }
          (qt.href = ht.href),
            v.extend({
              active: 0,
              lastModified: {},
              etag: {},
              ajaxSettings: {
                url: ht.href,
                type: "GET",
                isLocal:
                  /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
                    ht.protocol,
                  ),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                  "*": Nt,
                  text: "text/plain",
                  html: "text/html",
                  xml: "application/xml, text/xml",
                  json: "application/json, text/javascript",
                },
                contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                responseFields: {
                  xml: "responseXML",
                  text: "responseText",
                  json: "responseJSON",
                },
                converters: {
                  "* text": String,
                  "text html": !0,
                  "text json": JSON.parse,
                  "text xml": v.parseXML,
                },
                flatOptions: { url: !0, context: !0 },
              },
              ajaxSetup: function (e, t) {
                return t ? Lt(Lt(e, v.ajaxSettings), t) : Lt(v.ajaxSettings, e);
              },
              ajaxPrefilter: _t(Dt),
              ajaxTransport: _t(At),
              ajax: function (t, n) {
                "object" == typeof t && ((n = t), (t = void 0)), (n = n || {});
                var i,
                  o,
                  a,
                  s,
                  u,
                  c,
                  l,
                  f,
                  p,
                  d,
                  h = v.ajaxSetup({}, n),
                  g = h.context || h,
                  y = h.context && (g.nodeType || g.jquery) ? v(g) : v.event,
                  m = v.Deferred(),
                  b = v.Callbacks("once memory"),
                  x = h.statusCode || {},
                  w = {},
                  T = {},
                  C = "canceled",
                  k = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                      var t;
                      if (l) {
                        if (!s)
                          for (s = {}; (t = Et.exec(a)); )
                            s[t[1].toLowerCase()] = t[2];
                        t = s[e.toLowerCase()];
                      }
                      return null == t ? null : t;
                    },
                    getAllResponseHeaders: function () {
                      return l ? a : null;
                    },
                    setRequestHeader: function (e, t) {
                      return (
                        null == l &&
                          ((e = T[e.toLowerCase()] = T[e.toLowerCase()] || e),
                          (w[e] = t)),
                        this
                      );
                    },
                    overrideMimeType: function (e) {
                      return null == l && (h.mimeType = e), this;
                    },
                    statusCode: function (e) {
                      var t;
                      if (e)
                        if (l) k.always(e[k.status]);
                        else for (t in e) x[t] = [x[t], e[t]];
                      return this;
                    },
                    abort: function (e) {
                      var t = e || C;
                      return i && i.abort(t), E(0, t), this;
                    },
                  };
                if (
                  (m.promise(k),
                  (h.url = ((t || h.url || ht.href) + "").replace(
                    St,
                    ht.protocol + "//",
                  )),
                  (h.type = n.method || n.type || h.method || h.type),
                  (h.dataTypes = (h.dataType || "*").toLowerCase().match(H) || [
                    "",
                  ]),
                  null == h.crossDomain)
                ) {
                  c = r.createElement("a");
                  try {
                    (c.href = h.url),
                      (c.href = c.href),
                      (h.crossDomain =
                        qt.protocol + "//" + qt.host !=
                        c.protocol + "//" + c.host);
                  } catch (e) {
                    h.crossDomain = !0;
                  }
                }
                if (
                  (h.data &&
                    h.processData &&
                    "string" != typeof h.data &&
                    (h.data = v.param(h.data, h.traditional)),
                  Ot(Dt, h, n, k),
                  l)
                )
                  return k;
                (f = v.event && h.global) &&
                  0 == v.active++ &&
                  v.event.trigger("ajaxStart"),
                  (h.type = h.type.toUpperCase()),
                  (h.hasContent = !jt.test(h.type)),
                  (o = h.url.replace(Ct, "")),
                  h.hasContent
                    ? h.data &&
                      h.processData &&
                      0 ===
                        (h.contentType || "").indexOf(
                          "application/x-www-form-urlencoded",
                        ) &&
                      (h.data = h.data.replace(Tt, "+"))
                    : ((d = h.url.slice(o.length)),
                      h.data &&
                        ((o += (vt.test(o) ? "&" : "?") + h.data),
                        delete h.data),
                      !1 === h.cache &&
                        ((o = o.replace(kt, "$1")),
                        (d = (vt.test(o) ? "&" : "?") + "_=" + gt++ + d)),
                      (h.url = o + d)),
                  h.ifModified &&
                    (v.lastModified[o] &&
                      k.setRequestHeader(
                        "If-Modified-Since",
                        v.lastModified[o],
                      ),
                    v.etag[o] &&
                      k.setRequestHeader("If-None-Match", v.etag[o])),
                  ((h.data && h.hasContent && !1 !== h.contentType) ||
                    n.contentType) &&
                    k.setRequestHeader("Content-Type", h.contentType),
                  k.setRequestHeader(
                    "Accept",
                    h.dataTypes[0] && h.accepts[h.dataTypes[0]]
                      ? h.accepts[h.dataTypes[0]] +
                          ("*" !== h.dataTypes[0] ? ", " + Nt + "; q=0.01" : "")
                      : h.accepts["*"],
                  );
                for (p in h.headers) k.setRequestHeader(p, h.headers[p]);
                if (h.beforeSend && (!1 === h.beforeSend.call(g, k, h) || l))
                  return k.abort();
                if (
                  ((C = "abort"),
                  b.add(h.complete),
                  k.done(h.success),
                  k.fail(h.error),
                  (i = Ot(At, h, n, k)))
                ) {
                  if (
                    ((k.readyState = 1), f && y.trigger("ajaxSend", [k, h]), l)
                  )
                    return k;
                  h.async &&
                    h.timeout > 0 &&
                    (u = e.setTimeout(function () {
                      k.abort("timeout");
                    }, h.timeout));
                  try {
                    (l = !1), i.send(w, E);
                  } catch (e) {
                    if (l) throw e;
                    E(-1, e);
                  }
                } else E(-1, "No Transport");
                function E(t, n, r, s) {
                  var c,
                    p,
                    d,
                    w,
                    T,
                    C = n;
                  l ||
                    ((l = !0),
                    u && e.clearTimeout(u),
                    (i = void 0),
                    (a = s || ""),
                    (k.readyState = t > 0 ? 4 : 0),
                    (c = (t >= 200 && t < 300) || 304 === t),
                    r &&
                      (w = (function (e, t, n) {
                        for (
                          var r, i, o, a, s = e.contents, u = e.dataTypes;
                          "*" === u[0];

                        )
                          u.shift(),
                            void 0 === r &&
                              (r =
                                e.mimeType ||
                                t.getResponseHeader("Content-Type"));
                        if (r)
                          for (i in s)
                            if (s[i] && s[i].test(r)) {
                              u.unshift(i);
                              break;
                            }
                        if (u[0] in n) o = u[0];
                        else {
                          for (i in n) {
                            if (!u[0] || e.converters[i + " " + u[0]]) {
                              o = i;
                              break;
                            }
                            a || (a = i);
                          }
                          o = o || a;
                        }
                        if (o) return o !== u[0] && u.unshift(o), n[o];
                      })(h, k, r)),
                    (w = (function (e, t, n, r) {
                      var i,
                        o,
                        a,
                        s,
                        u,
                        c = {},
                        l = e.dataTypes.slice();
                      if (l[1])
                        for (a in e.converters)
                          c[a.toLowerCase()] = e.converters[a];
                      for (o = l.shift(); o; )
                        if (
                          (e.responseFields[o] && (n[e.responseFields[o]] = t),
                          !u &&
                            r &&
                            e.dataFilter &&
                            (t = e.dataFilter(t, e.dataType)),
                          (u = o),
                          (o = l.shift()))
                        )
                          if ("*" === o) o = u;
                          else if ("*" !== u && u !== o) {
                            if (!(a = c[u + " " + o] || c["* " + o]))
                              for (i in c)
                                if (
                                  (s = i.split(" "))[1] === o &&
                                  (a = c[u + " " + s[0]] || c["* " + s[0]])
                                ) {
                                  !0 === a
                                    ? (a = c[i])
                                    : !0 !== c[i] &&
                                      ((o = s[0]), l.unshift(s[1]));
                                  break;
                                }
                            if (!0 !== a)
                              if (a && e.throws) t = a(t);
                              else
                                try {
                                  t = a(t);
                                } catch (e) {
                                  return {
                                    state: "parsererror",
                                    error: a
                                      ? e
                                      : "No conversion from " + u + " to " + o,
                                  };
                                }
                          }
                      return { state: "success", data: t };
                    })(h, w, k, c)),
                    c
                      ? (h.ifModified &&
                          ((T = k.getResponseHeader("Last-Modified")) &&
                            (v.lastModified[o] = T),
                          (T = k.getResponseHeader("etag")) && (v.etag[o] = T)),
                        204 === t || "HEAD" === h.type
                          ? (C = "nocontent")
                          : 304 === t
                          ? (C = "notmodified")
                          : ((C = w.state), (p = w.data), (c = !(d = w.error))))
                      : ((d = C),
                        (!t && C) || ((C = "error"), t < 0 && (t = 0))),
                    (k.status = t),
                    (k.statusText = (n || C) + ""),
                    c
                      ? m.resolveWith(g, [p, C, k])
                      : m.rejectWith(g, [k, C, d]),
                    k.statusCode(x),
                    (x = void 0),
                    f &&
                      y.trigger(c ? "ajaxSuccess" : "ajaxError", [
                        k,
                        h,
                        c ? p : d,
                      ]),
                    b.fireWith(g, [k, C]),
                    f &&
                      (y.trigger("ajaxComplete", [k, h]),
                      --v.active || v.event.trigger("ajaxStop")));
                }
                return k;
              },
              getJSON: function (e, t, n) {
                return v.get(e, t, n, "json");
              },
              getScript: function (e, t) {
                return v.get(e, void 0, t, "script");
              },
            }),
            v.each(["get", "post"], function (e, t) {
              v[t] = function (e, n, r, i) {
                return (
                  v.isFunction(n) && ((i = i || r), (r = n), (n = void 0)),
                  v.ajax(
                    v.extend(
                      { url: e, type: t, dataType: i, data: n, success: r },
                      v.isPlainObject(e) && e,
                    ),
                  )
                );
              };
            }),
            (v._evalUrl = function (e) {
              return v.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                throws: !0,
              });
            }),
            v.fn.extend({
              wrapAll: function (e) {
                var t;
                return (
                  this[0] &&
                    (v.isFunction(e) && (e = e.call(this[0])),
                    (t = v(e, this[0].ownerDocument).eq(0).clone(!0)),
                    this[0].parentNode && t.insertBefore(this[0]),
                    t
                      .map(function () {
                        for (var e = this; e.firstElementChild; )
                          e = e.firstElementChild;
                        return e;
                      })
                      .append(this)),
                  this
                );
              },
              wrapInner: function (e) {
                return v.isFunction(e)
                  ? this.each(function (t) {
                      v(this).wrapInner(e.call(this, t));
                    })
                  : this.each(function () {
                      var t = v(this),
                        n = t.contents();
                      n.length ? n.wrapAll(e) : t.append(e);
                    });
              },
              wrap: function (e) {
                var t = v.isFunction(e);
                return this.each(function (n) {
                  v(this).wrapAll(t ? e.call(this, n) : e);
                });
              },
              unwrap: function (e) {
                return (
                  this.parent(e)
                    .not("body")
                    .each(function () {
                      v(this).replaceWith(this.childNodes);
                    }),
                  this
                );
              },
            }),
            (v.expr.pseudos.hidden = function (e) {
              return !v.expr.pseudos.visible(e);
            }),
            (v.expr.pseudos.visible = function (e) {
              return !!(
                e.offsetWidth ||
                e.offsetHeight ||
                e.getClientRects().length
              );
            }),
            (v.ajaxSettings.xhr = function () {
              try {
                return new e.XMLHttpRequest();
              } catch (e) {}
            });
          var Ht = { 0: 200, 1223: 204 },
            Bt = v.ajaxSettings.xhr();
          (h.cors = !!Bt && "withCredentials" in Bt),
            (h.ajax = Bt = !!Bt),
            v.ajaxTransport(function (t) {
              var n, r;
              if (h.cors || (Bt && !t.crossDomain))
                return {
                  send: function (i, o) {
                    var a,
                      s = t.xhr();
                    if (
                      (s.open(t.type, t.url, t.async, t.username, t.password),
                      t.xhrFields)
                    )
                      for (a in t.xhrFields) s[a] = t.xhrFields[a];
                    t.mimeType &&
                      s.overrideMimeType &&
                      s.overrideMimeType(t.mimeType),
                      t.crossDomain ||
                        i["X-Requested-With"] ||
                        (i["X-Requested-With"] = "XMLHttpRequest");
                    for (a in i) s.setRequestHeader(a, i[a]);
                    (n = function (e) {
                      return function () {
                        n &&
                          ((n =
                            r =
                            s.onload =
                            s.onerror =
                            s.onabort =
                            s.onreadystatechange =
                              null),
                          "abort" === e
                            ? s.abort()
                            : "error" === e
                            ? "number" != typeof s.status
                              ? o(0, "error")
                              : o(s.status, s.statusText)
                            : o(
                                Ht[s.status] || s.status,
                                s.statusText,
                                "text" !== (s.responseType || "text") ||
                                  "string" != typeof s.responseText
                                  ? { binary: s.response }
                                  : { text: s.responseText },
                                s.getAllResponseHeaders(),
                              ));
                      };
                    }),
                      (s.onload = n()),
                      (r = s.onerror = n("error")),
                      void 0 !== s.onabort
                        ? (s.onabort = r)
                        : (s.onreadystatechange = function () {
                            4 === s.readyState &&
                              e.setTimeout(function () {
                                n && r();
                              });
                          }),
                      (n = n("abort"));
                    try {
                      s.send((t.hasContent && t.data) || null);
                    } catch (e) {
                      if (n) throw e;
                    }
                  },
                  abort: function () {
                    n && n();
                  },
                };
            }),
            v.ajaxPrefilter(function (e) {
              e.crossDomain && (e.contents.script = !1);
            }),
            v.ajaxSetup({
              accepts: {
                script:
                  "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
              },
              contents: { script: /\b(?:java|ecma)script\b/ },
              converters: {
                "text script": function (e) {
                  return v.globalEval(e), e;
                },
              },
            }),
            v.ajaxPrefilter("script", function (e) {
              void 0 === e.cache && (e.cache = !1),
                e.crossDomain && (e.type = "GET");
            }),
            v.ajaxTransport("script", function (e) {
              var t, n;
              if (e.crossDomain)
                return {
                  send: function (i, o) {
                    (t = v("<script>")
                      .prop({ charset: e.scriptCharset, src: e.url })
                      .on(
                        "load error",
                        (n = function (e) {
                          t.remove(),
                            (n = null),
                            e && o("error" === e.type ? 404 : 200, e.type);
                        }),
                      )),
                      r.head.appendChild(t[0]);
                  },
                  abort: function () {
                    n && n();
                  },
                };
            });
          var Pt,
            Ft = [],
            Mt = /(=)\?(?=&|$)|\?\?/;
          v.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
              var e = Ft.pop() || v.expando + "_" + gt++;
              return (this[e] = !0), e;
            },
          }),
            v.ajaxPrefilter("json jsonp", function (t, n, r) {
              var i,
                o,
                a,
                s =
                  !1 !== t.jsonp &&
                  (Mt.test(t.url)
                    ? "url"
                    : "string" == typeof t.data &&
                      0 ===
                        (t.contentType || "").indexOf(
                          "application/x-www-form-urlencoded",
                        ) &&
                      Mt.test(t.data) &&
                      "data");
              if (s || "jsonp" === t.dataTypes[0])
                return (
                  (i = t.jsonpCallback =
                    v.isFunction(t.jsonpCallback)
                      ? t.jsonpCallback()
                      : t.jsonpCallback),
                  s
                    ? (t[s] = t[s].replace(Mt, "$1" + i))
                    : !1 !== t.jsonp &&
                      (t.url +=
                        (vt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i),
                  (t.converters["script json"] = function () {
                    return a || v.error(i + " was not called"), a[0];
                  }),
                  (t.dataTypes[0] = "json"),
                  (o = e[i]),
                  (e[i] = function () {
                    a = arguments;
                  }),
                  r.always(function () {
                    void 0 === o ? v(e).removeProp(i) : (e[i] = o),
                      t[i] && ((t.jsonpCallback = n.jsonpCallback), Ft.push(i)),
                      a && v.isFunction(o) && o(a[0]),
                      (a = o = void 0);
                  }),
                  "script"
                );
            }),
            (h.createHTMLDocument =
              (((Pt = r.implementation.createHTMLDocument("").body).innerHTML =
                "<form></form><form></form>"),
              2 === Pt.childNodes.length)),
            (v.parseHTML = function (e, t, n) {
              return "string" != typeof e
                ? []
                : ("boolean" == typeof t && ((n = t), (t = !1)),
                  t ||
                    (h.createHTMLDocument
                      ? (((i = (t =
                          r.implementation.createHTMLDocument(
                            "",
                          )).createElement("base")).href = r.location.href),
                        t.head.appendChild(i))
                      : (t = r)),
                  (o = S.exec(e)),
                  (a = !n && []),
                  o
                    ? [t.createElement(o[1])]
                    : ((o = de([e], t, a)),
                      a && a.length && v(a).remove(),
                      v.merge([], o.childNodes)));
              var i, o, a;
            }),
            (v.fn.load = function (e, t, n) {
              var r,
                i,
                o,
                a = this,
                s = e.indexOf(" ");
              return (
                s > -1 && ((r = lt(e.slice(s))), (e = e.slice(0, s))),
                v.isFunction(t)
                  ? ((n = t), (t = void 0))
                  : t && "object" == typeof t && (i = "POST"),
                a.length > 0 &&
                  v
                    .ajax({
                      url: e,
                      type: i || "GET",
                      dataType: "html",
                      data: t,
                    })
                    .done(function (e) {
                      (o = arguments),
                        a.html(
                          r ? v("<div>").append(v.parseHTML(e)).find(r) : e,
                        );
                    })
                    .always(
                      n &&
                        function (e, t) {
                          a.each(function () {
                            n.apply(this, o || [e.responseText, t, e]);
                          });
                        },
                    ),
                this
              );
            }),
            v.each(
              [
                "ajaxStart",
                "ajaxStop",
                "ajaxComplete",
                "ajaxError",
                "ajaxSuccess",
                "ajaxSend",
              ],
              function (e, t) {
                v.fn[t] = function (e) {
                  return this.on(t, e);
                };
              },
            ),
            (v.expr.pseudos.animated = function (e) {
              return v.grep(v.timers, function (t) {
                return e === t.elem;
              }).length;
            }),
            (v.offset = {
              setOffset: function (e, t, n) {
                var r,
                  i,
                  o,
                  a,
                  s,
                  u,
                  c = v.css(e, "position"),
                  l = v(e),
                  f = {};
                "static" === c && (e.style.position = "relative"),
                  (s = l.offset()),
                  (o = v.css(e, "top")),
                  (u = v.css(e, "left")),
                  ("absolute" === c || "fixed" === c) &&
                  (o + u).indexOf("auto") > -1
                    ? ((a = (r = l.position()).top), (i = r.left))
                    : ((a = parseFloat(o) || 0), (i = parseFloat(u) || 0)),
                  v.isFunction(t) && (t = t.call(e, n, v.extend({}, s))),
                  null != t.top && (f.top = t.top - s.top + a),
                  null != t.left && (f.left = t.left - s.left + i),
                  "using" in t ? t.using.call(e, f) : l.css(f);
              },
            }),
            v.fn.extend({
              offset: function (e) {
                if (arguments.length)
                  return void 0 === e
                    ? this
                    : this.each(function (t) {
                        v.offset.setOffset(this, e, t);
                      });
                var t,
                  n,
                  r,
                  i,
                  o = this[0];
                return o
                  ? o.getClientRects().length
                    ? ((r = o.getBoundingClientRect()),
                      (n = (t = o.ownerDocument).documentElement),
                      (i = t.defaultView),
                      {
                        top: r.top + i.pageYOffset - n.clientTop,
                        left: r.left + i.pageXOffset - n.clientLeft,
                      })
                    : { top: 0, left: 0 }
                  : void 0;
              },
              position: function () {
                if (this[0]) {
                  var e,
                    t,
                    n = this[0],
                    r = { top: 0, left: 0 };
                  return (
                    "fixed" === v.css(n, "position")
                      ? (t = n.getBoundingClientRect())
                      : ((e = this.offsetParent()),
                        (t = this.offset()),
                        j(e[0], "html") || (r = e.offset()),
                        (r = {
                          top: r.top + v.css(e[0], "borderTopWidth", !0),
                          left: r.left + v.css(e[0], "borderLeftWidth", !0),
                        })),
                    {
                      top: t.top - r.top - v.css(n, "marginTop", !0),
                      left: t.left - r.left - v.css(n, "marginLeft", !0),
                    }
                  );
                }
              },
              offsetParent: function () {
                return this.map(function () {
                  for (
                    var e = this.offsetParent;
                    e && "static" === v.css(e, "position");

                  )
                    e = e.offsetParent;
                  return e || he;
                });
              },
            }),
            v.each(
              { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
              function (e, t) {
                var n = "pageYOffset" === t;
                v.fn[e] = function (r) {
                  return W(
                    this,
                    function (e, r, i) {
                      var o;
                      if (
                        (v.isWindow(e)
                          ? (o = e)
                          : 9 === e.nodeType && (o = e.defaultView),
                        void 0 === i)
                      )
                        return o ? o[t] : e[r];
                      o
                        ? o.scrollTo(
                            n ? o.pageXOffset : i,
                            n ? i : o.pageYOffset,
                          )
                        : (e[r] = i);
                    },
                    e,
                    r,
                    arguments.length,
                  );
                };
              },
            ),
            v.each(["top", "left"], function (e, t) {
              v.cssHooks[t] = Pe(h.pixelPosition, function (e, n) {
                if (n)
                  return (
                    (n = Be(e, t)), Le.test(n) ? v(e).position()[t] + "px" : n
                  );
              });
            }),
            v.each({ Height: "height", Width: "width" }, function (e, t) {
              v.each(
                { padding: "inner" + e, content: t, "": "outer" + e },
                function (n, r) {
                  v.fn[r] = function (i, o) {
                    var a = arguments.length && (n || "boolean" != typeof i),
                      s = n || (!0 === i || !0 === o ? "margin" : "border");
                    return W(
                      this,
                      function (t, n, i) {
                        var o;
                        return v.isWindow(t)
                          ? 0 === r.indexOf("outer")
                            ? t["inner" + e]
                            : t.document.documentElement["client" + e]
                          : 9 === t.nodeType
                          ? ((o = t.documentElement),
                            Math.max(
                              t.body["scroll" + e],
                              o["scroll" + e],
                              t.body["offset" + e],
                              o["offset" + e],
                              o["client" + e],
                            ))
                          : void 0 === i
                          ? v.css(t, n, s)
                          : v.style(t, n, i, s);
                      },
                      t,
                      a ? i : void 0,
                      a,
                    );
                  };
                },
              );
            }),
            v.fn.extend({
              bind: function (e, t, n) {
                return this.on(e, null, t, n);
              },
              unbind: function (e, t) {
                return this.off(e, null, t);
              },
              delegate: function (e, t, n, r) {
                return this.on(t, e, n, r);
              },
              undelegate: function (e, t, n) {
                return 1 === arguments.length
                  ? this.off(e, "**")
                  : this.off(t, e || "**", n);
              },
            }),
            (v.holdReady = function (e) {
              e ? v.readyWait++ : v.ready(!0);
            }),
            (v.isArray = Array.isArray),
            (v.parseJSON = JSON.parse),
            (v.nodeName = j),
            "function" == typeof define &&
              define.amd &&
              define("jquery", [], function () {
                return v;
              });
          var Rt = e.jQuery,
            It = e.$;
          return (
            (v.noConflict = function (t) {
              return (
                e.$ === v && (e.$ = It),
                t && e.jQuery === v && (e.jQuery = Rt),
                v
              );
            }),
            t || (e.jQuery = e.$ = v),
            v
          );
        });
      },
      {},
    ],
    3: [
      function (e, t, n) {
        "use strict";
        var r = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })();
        var i = e("jquery"),
          o = e("./../events/EventEmitter"),
          a = (function () {
            function e(t) {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
                (this.dom = i(t)),
                (this._visible = !0),
                (this._preventDefaultClick = !1),
                (this._onClickEmitter = new o());
              var n = this;
              i(t).click(function (e) {
                n._preventDefaultClick && e.preventDefault(),
                  n._onClickEmitter.dispatch(e);
              });
            }
            return (
              r(e, [
                {
                  key: "visible",
                  get: function () {
                    return this._visible;
                  },
                  set: function (e) {
                    (this._visible = e),
                      e ? i(this.dom).show() : i(this.dom).hide();
                  },
                },
                {
                  key: "preventDefaultClick",
                  set: function (e) {
                    this._preventDefaultClick = e;
                  },
                  get: function () {
                    return this._preventDefaultClick;
                  },
                },
                {
                  key: "onClick",
                  set: function (e) {
                    this._onClickEmitter.handler = e;
                  },
                },
              ]),
              e
            );
          })();
        t.exports = a;
      },
      { "./../events/EventEmitter": 9, jquery: 2 },
    ],
    4: [
      function (e, t, n) {
        "use strict";
        var r = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })();
        var i = e("jquery"),
          o = e("./BasicControl"),
          a = e("./BubbleMenuButton"),
          s = (function (e) {
            function t(e, n, r) {
              var o =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : 50;
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t);
              var a = (function (e, t) {
                if (!e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !t || ("object" != typeof t && "function" != typeof t)
                  ? e
                  : t;
              })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
              return (
                (a.menuButtonDom = i(n)),
                (a.buttonContainerDom = i(r)),
                (a.animationSpeed = o),
                (a._buttons = []),
                (a._expanded = !1),
                (a._animations = []),
                a._initializeMenuButtonEvents(),
                a
              );
            }
            return (
              (function (e, t) {
                if ("function" != typeof t && null !== t)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof t,
                  );
                (e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  t &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(e, t)
                      : (e.__proto__ = t));
              })(t, o),
              r(t, [
                {
                  key: "addButton",
                  value: function (e) {
                    var t = new a(i(this._getBubbleMenuButtonMarkup(e)));
                    return (
                      this._buttons.push(t),
                      this.buttonContainerDom.append(t.dom),
                      t
                    );
                  },
                },
                {
                  key: "_initializeMenuButtonEvents",
                  value: function () {
                    var e = this;
                    i(this.menuButtonDom).click(function () {
                      e._expanded ? e.contract() : e.expand();
                    });
                  },
                },
                {
                  key: "expand",
                  value: function () {
                    (this._expanded = !0),
                      this.menuButtonDom.addClass("ui-expanded"),
                      this._cancelAllAnimations();
                    for (
                      var e = 0, t = this, n = 0;
                      n < this._buttons.length;
                      n++
                    )
                      this._animations.push(
                        setTimeout(
                          (function (e) {
                            return function () {
                              t._buttons[e].dom.addClass("shown");
                            };
                          })(n),
                          e,
                        ),
                      ),
                        (e += this.animationSpeed);
                  },
                },
                {
                  key: "contract",
                  value: function () {
                    (this._expanded = !1),
                      this.menuButtonDom.removeClass("ui-expanded"),
                      this._cancelAllAnimations();
                    for (
                      var e = 0, t = this, n = this._buttons.length - 1;
                      n >= 0;
                      n--
                    )
                      this._animations.push(
                        setTimeout(
                          (function (e) {
                            return function () {
                              t._buttons[e].dom.removeClass("shown");
                            };
                          })(n),
                          e,
                        ),
                      ),
                        (e += this.animationSpeed);
                  },
                },
                {
                  key: "_cancelAllAnimations",
                  value: function () {
                    for (var e = 0; e < this._animations.length; e++)
                      clearTimeout(this._animations[e]);
                    this._animations = [];
                  },
                },
                {
                  key: "_getBubbleMenuButtonMarkup",
                  value: function (e) {
                    return (
                      "<div bubble-menu-button>" + e.innerContent + "</div>"
                    );
                  },
                },
                {
                  key: "buttons",
                  get: function () {
                    return this._buttons;
                  },
                },
              ]),
              t
            );
          })();
        t.exports = s;
      },
      { "./BasicControl": 3, "./BubbleMenuButton": 5, jquery: 2 },
    ],
    5: [
      function (e, t, n) {
        "use strict";
        var r = e("./BasicControl"),
          i = (function (e) {
            function t(e) {
              return (
                (function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function");
                })(this, t),
                (function (e, t) {
                  if (!e)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called",
                    );
                  return !t || ("object" != typeof t && "function" != typeof t)
                    ? e
                    : t;
                })(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).call(this, e),
                )
              );
            }
            return (
              (function (e, t) {
                if ("function" != typeof t && null !== t)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof t,
                  );
                (e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  t &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(e, t)
                      : (e.__proto__ = t));
              })(t, r),
              t
            );
          })();
        t.exports = i;
      },
      { "./BasicControl": 3 },
    ],
    6: [
      function (e, t, n) {
        "use strict";
        var r = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })();
        var i = e("jquery"),
          o =
            (e("blueimp-md5"),
            (function () {
              function e(t) {
                !(function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function");
                })(this, e),
                  (this._dom = i(t)),
                  this._dom.attr("contenteditable", !0);
              }
              return (
                r(e, [
                  {
                    key: "addBlock",
                    value: function (e) {
                      var t =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : {},
                        n =
                          arguments.length > 2 && void 0 !== arguments[2]
                            ? arguments[2]
                            : {},
                        r = i("<span>");
                      r.addClass("input-inline-block"),
                        r.html(e),
                        r.attr("contenteditable", !1);
                      for (attr_key in t) r.attr(attr_key, t[attr_key]);
                      for (style_key in n) r.attr(style_key, n[style_key]);
                      this._dom.append(r);
                    },
                  },
                ]),
                e
              );
            })());
        t.exports = o;
      },
      { "blueimp-md5": 1, jquery: 2 },
    ],
    7: [
      function (e, t, n) {
        "use strict";
        var r = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })();
        var i = e("./ToolbarButton"),
          o = (function () {
            function e(t) {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
                (this.dom = t),
                (this._buttons = []);
            }
            return (
              r(e, [
                {
                  key: "addButton",
                  value: function (e) {
                    var t = new i($(this._getToolButtonMarkup(e)));
                    this._buttons.push(t), this.dom.append(t.dom);
                  },
                },
                {
                  key: "getButtonById",
                  value: function (e) {
                    for (var t = 0; t < this._buttons.length; t++)
                      if (this._buttons[t].dom.attr("id") === e)
                        return this.buttons[t];
                  },
                },
                {
                  key: "_getToolButtonMarkup",
                  value: function (e) {
                    return "<div toolbar-button>" + e.innerContent + "</div>";
                  },
                },
                {
                  key: "buttons",
                  get: function () {
                    return this._buttons;
                  },
                },
              ]),
              e
            );
          })();
        t.exports = o;
      },
      { "./ToolbarButton": 8 },
    ],
    8: [
      function (e, t, n) {
        "use strict";
        var r = e("./BasicControl"),
          i = (function (e) {
            function t(e) {
              return (
                (function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function");
                })(this, t),
                (function (e, t) {
                  if (!e)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called",
                    );
                  return !t || ("object" != typeof t && "function" != typeof t)
                    ? e
                    : t;
                })(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).call(this, e),
                )
              );
            }
            return (
              (function (e, t) {
                if ("function" != typeof t && null !== t)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof t,
                  );
                (e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  t &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(e, t)
                      : (e.__proto__ = t));
              })(t, r),
              t
            );
          })();
        t.exports = i;
      },
      { "./BasicControl": 3 },
    ],
    9: [
      function (e, t, n) {
        "use strict";
        var r = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })();
        var i = (function () {
          function e() {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e),
              (this._handlers = []);
          }
          return (
            r(e, [
              {
                key: "dispatch",
                value: function (e) {
                  for (var t = 0; t < this._handlers.length; t++)
                    this._handlers[t](e);
                },
              },
              {
                key: "handler",
                set: function (e) {
                  this._handlers.push(e);
                },
              },
            ]),
            e
          );
        })();
        t.exports = i;
      },
      {},
    ],
    10: [
      function (e, t, n) {
        "use strict";
        var r = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })();
        var i = e("jquery"),
          o = (function () {
            function e(t) {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
                (this.dom = i(t));
            }
            return (
              r(e, [
                {
                  key: "setType",
                  value: function (e) {
                    this.dom.css({ cursor: e });
                  },
                },
              ]),
              e
            );
          })();
        t.exports = o;
      },
      { jquery: 2 },
    ],
    11: [
      function (e, t, n) {
        "use strict";
        var r = e("./controls/BasicControl"),
          i = e("./controls/Toolbar"),
          o = e("./misc/Cursor"),
          a = e("./controls/BubbleMenu"),
          s = e("./controls/BubbleMenuButton"),
          u = e("./controls/ChatInput");
        window.UI = {
          Toolbar: i,
          BasicControl: r,
          Cursor: o,
          BubbleMenu: a,
          BubbleMenuButton: s,
          ChatInput: u,
        };
      },
      {
        "./controls/BasicControl": 3,
        "./controls/BubbleMenu": 4,
        "./controls/BubbleMenuButton": 5,
        "./controls/ChatInput": 6,
        "./controls/Toolbar": 7,
        "./misc/Cursor": 10,
      },
    ],
  },
  {},
  [11],
);
