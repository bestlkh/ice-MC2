!(function e(t, n, o) {
  function r(s, l) {
    if (!n[s]) {
      if (!t[s]) {
        var a = "function" == typeof require && require;
        if (!l && a) return a(s, !0);
        if (i) return i(s, !0);
        var u = new Error("Cannot find module '" + s + "'");
        throw ((u.code = "MODULE_NOT_FOUND"), u);
      }
      var c = (n[s] = { exports: {} });
      t[s][0].call(
        c.exports,
        function (e) {
          var n = t[s][1][e];
          return r(n || e);
        },
        c,
        c.exports,
        e,
        t,
        n,
        o,
      );
    }
    return n[s].exports;
  }
  for (
    var i = "function" == typeof require && require, s = 0;
    s < o.length;
    s++
  )
    r(o[s]);
  return r;
})(
  {
    1: [
      function (e, t, n) {
        "use strict";
        var o = e("./Symbol"),
          r = e("./enums/SymbolTypes"),
          i = (function (e) {
            function t(e, n, o, i, s) {
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
                  (t.__proto__ || Object.getPrototypeOf(t)).call(
                    this,
                    e,
                    n,
                    o,
                    i,
                    s,
                    r.ALPHANUMERIC,
                  ),
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
              })(t, o),
              t
            );
          })();
        t.exports = i;
      },
      { "./Symbol": 9, "./enums/SymbolTypes": 14 },
    ],
    2: [
      function (e, t, n) {
        "use strict";
        var o = e("./Symbol"),
          r = e("./enums/SymbolTypes"),
          i = e("./enums/BracketTypes"),
          s = (function (e) {
            function t(e, n, o, s, l) {
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
              })(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(
                  this,
                  e,
                  n,
                  o,
                  s,
                  l,
                  r.BRACKET,
                ),
              );
              a.bracketType = i.CLOSE;
              var u = ["lbracket", "(", ")", "rbracket"];
              return (
                u.indexOf(l) < u.length / 2 &&
                  ((a.minX -= o),
                  (a.maxX -= o),
                  (a.x -= o),
                  (a.bracketType = i.OPEN)),
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
              t
            );
          })();
        t.exports = s;
      },
      { "./Symbol": 9, "./enums/BracketTypes": 12, "./enums/SymbolTypes": 14 },
    ],
    3: [
      function (e, t, n) {
        "use strict";
        var o = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                "value" in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o);
            }
          }
          return function (t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t;
          };
        })();
        e("./enums/SymbolTypes");
        var r = e("./enums/RegionTypes"),
          i = (function () {
            function e() {
              var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : r.ROOT;
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
                (this.region_type = t),
                (this.region_name = t),
                (this.wall = { left: 0, bottom: 1 / 0, right: 1 / 0, top: 0 }),
                (this.symbols = []);
            }
            return (
              o(e, [
                {
                  key: "addSymbol",
                  value: function (e) {
                    this.symbols.push(e);
                  },
                },
                {
                  key: "setWall",
                  value: function (e, t, n, o) {
                    if (!e.left)
                      return e.length && 3 == e.length
                        ? ((this.wall.left = e[0][0]),
                          (this.wall.bottom = e[0][1]),
                          (this.wall.right = e[1][0]),
                          void (this.wall.top = e[1][1]))
                        : void (this.wall = {
                            left: e,
                            bottom: o,
                            right: n,
                            top: t,
                          });
                    this.wall = e;
                  },
                },
                {
                  key: "hasElement",
                  value: function () {
                    return this.symbols.length > 0;
                  },
                },
                {
                  key: "apply",
                  value: function (e, t, n) {
                    n ||
                      (n = function () {
                        return !0;
                      }),
                      t ||
                        (t = function () {
                          return !0;
                        });
                    for (var o = 0; o < this.symbols.length; o++)
                      if ("lim" === this.symbols[o].value) {
                        for (
                          var r = !1, i = 0;
                          i < this.symbols[o].subSymbols.length;
                          i++
                        )
                          n(this.symbols[o].subSymbols[i])
                            ? (e(this.symbols[o].subSymbols[i]),
                              this.symbols[o].subSymbols[i].apply(
                                e,
                                function (e) {
                                  return !0;
                                },
                                n,
                              ),
                              (r = !0))
                            : this.symbols[o].subSymbols[i].apply(e, t, n);
                        r
                          ? this.symbols[o].apply(
                              e,
                              function (e) {
                                return !0;
                              },
                              n,
                            )
                          : this.symbols[o].apply(e, t, n);
                      } else
                        n(this.symbols[o])
                          ? (e(this.symbols[o]),
                            this.symbols[o].apply(
                              e,
                              function (e) {
                                return !0;
                              },
                              n,
                            ))
                          : this.symbols[o].apply(e, t, n);
                  },
                },
              ]),
              e
            );
          })();
        t.exports = i;
      },
      { "./enums/RegionTypes": 13, "./enums/SymbolTypes": 14 },
    ],
    4: [
      function (e, t, n) {
        "use strict";
        var o = e("./Symbol"),
          r = e("./enums/SymbolTypes"),
          i = (function (e) {
            function t(e, n, o, i, s) {
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
                  (t.__proto__ || Object.getPrototypeOf(t)).call(
                    this,
                    e,
                    n,
                    o,
                    i,
                    s,
                    r.FRACTION,
                  ),
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
              })(t, o),
              t
            );
          })();
        t.exports = i;
      },
      { "./Symbol": 9, "./enums/SymbolTypes": 14 },
    ],
    5: [
      function (e, t, n) {
        "use strict";
        var o = e("./Symbol"),
          r = e("./enums/SymbolTypes"),
          i = (function (e) {
            function t(e, n, o, i, s) {
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
                  (t.__proto__ || Object.getPrototypeOf(t)).call(
                    this,
                    e,
                    n,
                    o,
                    i,
                    s,
                    r.LIMIT,
                  ),
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
              })(t, o),
              t
            );
          })();
        t.exports = i;
      },
      { "./Symbol": 9, "./enums/SymbolTypes": 14 },
    ],
    6: [
      function (e, t, n) {
        "use strict";
        var o = e("./Symbol"),
          r = e("./enums/SymbolTypes"),
          i = (function (e) {
            function t(e, n, o, i, s) {
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
                  (t.__proto__ || Object.getPrototypeOf(t)).call(
                    this,
                    e,
                    n,
                    o,
                    i,
                    s,
                    r.OPERATOR,
                  ),
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
              })(t, o),
              t
            );
          })();
        t.exports = i;
      },
      { "./Symbol": 9, "./enums/SymbolTypes": 14 },
    ],
    7: [
      function (e, t, n) {
        "use strict";
        var o = (function () {
            return function (e, t) {
              if (Array.isArray(e)) return e;
              if (Symbol.iterator in Object(e))
                return (function (e, t) {
                  var n = [],
                    o = !0,
                    r = !1,
                    i = void 0;
                  try {
                    for (
                      var s, l = e[Symbol.iterator]();
                      !(o = (s = l.next()).done) &&
                      (n.push(s.value), !t || n.length !== t);
                      o = !0
                    );
                  } catch (e) {
                    (r = !0), (i = e);
                  } finally {
                    try {
                      !o && l.return && l.return();
                    } finally {
                      if (r) throw i;
                    }
                  }
                  return n;
                })(e, t);
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance",
              );
            };
          })(),
          r = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var o = t[n];
                (o.enumerable = o.enumerable || !1),
                  (o.configurable = !0),
                  "value" in o && (o.writable = !0),
                  Object.defineProperty(e, o.key, o);
              }
            }
            return function (t, n, o) {
              return n && e(t.prototype, n), o && e(t, o), t;
            };
          })();
        var i = e("./enums/SymbolTypes"),
          s = e("./enums/BracketTypes"),
          l = e("./Expression"),
          a = (e("./Symbol"), e("./enums/RegionTypes")),
          u = e("./constant"),
          c = e("./SymbolFactory"),
          f = (function () {
            function e() {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e);
            }
            return (
              r(e, null, [
                {
                  key: "hor",
                  value: function (t, n) {
                    if (
                      t[n].type === i.FRACTION ||
                      (t[n].type === i.BRACKET && t[n].bracketType == s.OPEN) ||
                      t[n].type === i.OPERATOR
                    ) {
                      var o = t[n].getWallCopy();
                      o.left = t[n].maxX;
                      var r = e.start(t, o);
                      return -1 == r ? -1 : e.overlap(r, t[n].wall, t);
                    }
                    for (var l = 0; l < t.length; ) {
                      if (
                        e.isInRegion(t[n].wall, t[l]) &&
                        !t[l].marked &&
                        t[n].maxX <= t[l].minX &&
                        t[n].minY + 0.4 * t[n].height <= t[l].y &&
                        t[l].y < t[n].maxY - (1 * t[n].height) / 5
                      )
                        return e.overlap(l, t[n].wall, t);
                      l++;
                    }
                    return -1;
                  },
                },
                {
                  key: "start",
                  value: function (t, n) {
                    for (
                      var o = -1, r = -1, s = 0, l = -1, a = t.length;
                      -1 == o && s < a;

                    )
                      !t[s].marked && e.isInRegion(n, t[s])
                        ? (o = s)
                        : (s += 1);
                    if (-1 == o || r == o) return o;
                    for (; s < a && -1 == r; )
                      !t[s].marked &&
                      t[s].type === i.LIMIT &&
                      e.isInRegion(n, t[s])
                        ? (r = s)
                        : (s += 1);
                    if (-1 == r || r == o) return e.overlap(o, n, t);
                    for (var u = t[r].maxY, c = t[r].minY; s > o; )
                      t[(s -= 1)].y < u && t[s].y >= c && (l = s);
                    return l < r && -1 != l
                      ? e.overlap(o, n, t)
                      : e.overlap(r, n, t);
                  },
                },
                {
                  key: "overlap",
                  value: function (e, t, n) {
                    var o,
                      r = e,
                      s = t.top,
                      l = t.bottom,
                      a = !1,
                      u = n.length;
                    o = (n[e].type, i.FRACTION, n[e].width);
                    for (var c = -1; r > 0 && !a; )
                      n[r - 1].maxX < n[e].minX ? (a = !0) : (r -= 1);
                    for (; r < u && n[r].minX < n[e].maxX; )
                      !n[r].marked &&
                      n[r].type === i.Fraction &&
                      n[r].y > s &&
                      n[r].y <= l &&
                      n[r].minX <= n[e].x &&
                      n[r].width > o
                        ? ((o = n[r].width), (c = r))
                        : r++;
                    return -1 == c ? e : c;
                  },
                },
                {
                  key: "isInRegion",
                  value: function (e, t) {
                    return (
                      e.left <= t.x &&
                      t.x < e.right &&
                      e.top <= t.y &&
                      t.y <= e.bottom
                    );
                  },
                },
                {
                  key: "parse",
                  value: function () {
                    var t =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : null;
                    if (!t) {
                      t = [];
                      var n = svgCanvas.getSelectedElems().slice(0);
                      0 == n.__proto__.length &&
                        (n = document.querySelectorAll('[id^="svg_eqn_"]'));
                      for (var r = 0; r < n.length; r++) {
                        var s = c.make(n[r]);
                        s && t.push(s);
                      }
                    }
                    t.sort(function (e, t) {
                      var n = e.minX - t.minX;
                      return 0 == n ? e.minY - t.minY : n;
                    });
                    var f,
                      y,
                      p,
                      m,
                      h,
                      b = new l(),
                      T = [],
                      g = [],
                      E = b.wall,
                      O = e.start(t, E);
                    for (
                      -1 != O &&
                      (t[O].setWall(E), g.push([O, b]), (t[O].marked = !0));
                      0 != g.length;

                    )
                      for (; 0 != g.length; ) {
                        var S = g.shift(),
                          v = o(S, 2);
                        for (
                          f = v[0],
                            p = v[1],
                            (m = t[f]).marked = !0,
                            p.symbols.push(m),
                            T.push([f, m]),
                            E = t[f].wall,
                            y = e.hor(t, f);
                          -1 != y;

                        ) {
                          var w = t[f].wall;
                          t[y].setWall(w), (m = t[y]);
                          p.symbols.length;
                          p.symbols.push(m),
                            T.push([y, m]),
                            (t[f].wall.right = t[y].minX),
                            t[y].type !== i.LIMIT ||
                              (t[f].type !== i.BRACKET &&
                                t[f].type !== i.FRACTION) ||
                              (t[y].wall.left = t[f].maxX),
                            (t[(f = y)].marked = !0),
                            (y = e.hor(t, f));
                        }
                        for (T.push("EOBL"); 0 != T.length; ) {
                          "EOBL" === T[T.length - 1] && T.pop();
                          var R = T.pop(),
                            x = o(R, 2);
                          f = x[0];
                          var _ = (m = x[1]).wall.top,
                            A = m.wall.bottom,
                            C = p.symbols.indexOf(m),
                            B =
                              C == p.symbols.length - 1
                                ? m.wall.right
                                : p.symbols[C + 1].minX,
                            d = m.minX;
                          m.type === u.SYMBOL_TYPES.LIMIT &&
                            (0 == C
                              ? (d = E.left)
                              : p.symbols[C - 1].type === u.SYMBOL_TYPES.BRACKET
                              ? (d = p.symbols[C - 1].maxX)
                              : p.symbols[C - 1].type ===
                                  u.SYMBOL_TYPES.FRACTION &&
                                (d = p.symbols[C - 1].maxX));
                          for (
                            var P = m.minX,
                              L = m.maxX,
                              I = m.minY,
                              k = m.maxY,
                              N = I + 0.4 * (k - I),
                              X = k - 0.4 * (k - I),
                              U = [
                                [[P, I], [L, _], a.ABOVE],
                                [[P, A], [L, k], a.BELOW],
                                [[L, N], [B, _], a.SUPER],
                                [[L, A], [B, X], a.SUBSC],
                                [[d, N], [P, _], a.TLEFT],
                                [[d, A], [P, X], a.BLEFT],
                                [[P, k], [L, I], a.CONTAINS],
                              ],
                              j = [
                                a.ABOVE,
                                a.BELOW,
                                a.SUPER,
                                a.SUBSC,
                                a.TLEFT,
                                a.BLEFT,
                                a.CONTAINS,
                              ],
                              F = 0;
                            F < j.length;
                            F++
                          )
                            m.region[j[F]].setWall(U[F]),
                              -1 != (y = e.start(t, m.region[j[F]].wall)) &&
                                ((t[y].marked = !0),
                                t[y].setWall(m.region[j[F]].wall),
                                (h = m.region[j[F]]),
                                g.push([y, h]));
                        }
                      }
                    return b;
                  },
                },
                {
                  key: "getTex",
                  value: function () {
                    var t =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : e.parse(),
                      n = "";
                    if (t.symbols) {
                      t.region_name == a.ROOT && (n += "$$");
                      for (var o = 0; o < t.symbols.length; o++) {
                        n += e.getTex(t.symbols[o]);
                      }
                      return (
                        n.indexOf("lim") >= 0 && (n = n.replace("li ", " ")),
                        t.region_name == a.ROOT &&
                          (n = (n += "$$").replace(
                            /arcsin|arccos|arctan|cosh|sinh|tanh|cos|sin|tan/gi,
                            function (e) {
                              return " \\" + e + " ";
                            },
                          )),
                        n
                      );
                    }
                    var r = t.value,
                      s = t,
                      l = t.type;
                    return (
                      l === i.LIMIT
                        ? ((n += u.TEX_TEXT[r] + " "),
                          t.hasAnyBottom() &&
                            (n +=
                              "_{" +
                              e.getTex(t.region[a.BLEFT]) +
                              e.getTex(t.region[a.BELOW]) +
                              e.getTex(t.region[a.SUBSC]) +
                              "} "),
                          t.hasAnyTop() &&
                            (n +=
                              "^{" +
                              e.getTex(t.region[a.TLEFT]) +
                              e.getTex(t.region[a.ABOVE]) +
                              e.getTex(t.region[a.SUPER]) +
                              "} "))
                        : l === i.FRACTION
                        ? t.hasAnyTop() && t.hasAnyBottom()
                          ? ((n += u.TEX_TEXT.fraction),
                            (n += "{"),
                            (n +=
                              e.getTex(t.region[a.TLEFT]) +
                              e.getTex(t.region[a.ABOVE]) +
                              e.getTex(t.region[a.SUPER])),
                            (n += "}{"),
                            (n +=
                              e.getTex(t.region[a.BLEFT]) +
                              e.getTex(t.region[a.BELOW]) +
                              e.getTex(t.region[a.SUBSC])),
                            (n += "} "))
                          : t.hasAnyBottom()
                          ? ((n += u.TEX_TEXT.overline),
                            (n +=
                              "{" +
                              e.getTex(t.region[a.BLEFT]) +
                              e.getTex(t.region[a.BELOW]) +
                              e.getTex(t.region[a.SUBSC]) +
                              "}"))
                          : t.hasAnyTop()
                          ? ((n += u.TEX_TEXT.underline),
                            (n +=
                              "{" +
                              e.getTex(t.region[a.TLEFT]) +
                              e.getTex(t.region[a.ABOVE]) +
                              e.getTex(t.region[a.SUPER]) +
                              "}"))
                          : (n += " - ")
                        : l === i.ROOT
                        ? ((n +=
                            u.TEX_TEXT[r] +
                            "{" +
                            e.getTex(t.region[a.CONTAINS]) +
                            "} "),
                          t.region[a.SUPER].hasElement() &&
                            (n += "^{" + e.getTex(t.region[a.SUPER]) + "} "),
                          t.region[a.SUBSC].hasElement() &&
                            (n += "_{" + e.getTex(t.region[a.SUBSC]) + "} "))
                        : l === i.BRACKET
                        ? ((n += u.TEX_TEXT[r]),
                          s.bracketType == u.BRACKET_TYPES.CLOSE &&
                            (t.region[a.SUPER].hasElement() &&
                              (n += "^{" + e.getTex(t.region[a.SUPER]) + "}"),
                            t.region[a.SUBSC].hasElement() &&
                              (n += "_{" + e.getTex(t.region[a.SUBSC]) + "} ")))
                        : l == i.OPERATOR
                        ? (n += u.TEX_TEXT[r])
                        : ((n += r),
                          t.region[a.SUPER].hasElement() &&
                            (n += "^{" + e.getTex(t.region[a.SUPER]) + "}"),
                          t.region[a.SUBSC].hasElement() &&
                            (n += "_{" + e.getTex(t.region[a.SUBSC]) + "}")),
                      n
                    );
                  },
                },
              ]),
              e
            );
          })();
        t.exports = f;
      },
      {
        "./Expression": 3,
        "./Symbol": 9,
        "./SymbolFactory": 10,
        "./constant": 11,
        "./enums/BracketTypes": 12,
        "./enums/RegionTypes": 13,
        "./enums/SymbolTypes": 14,
      },
    ],
    8: [
      function (e, t, n) {
        "use strict";
        var o = e("./Symbol"),
          r = e("./enums/SymbolTypes"),
          i = (function (e) {
            function t(e, n, o, i, s) {
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
                  (t.__proto__ || Object.getPrototypeOf(t)).call(
                    this,
                    e,
                    n,
                    o,
                    i,
                    s,
                    r.ROOT,
                  ),
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
              })(t, o),
              t
            );
          })();
        t.exports = i;
      },
      { "./Symbol": 9, "./enums/SymbolTypes": 14 },
    ],
    9: [
      function (e, t, n) {
        "use strict";
        var o = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                "value" in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o);
            }
          }
          return function (t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t;
          };
        })();
        e("./enums/SymbolTypes");
        var r = e("./enums/RegionTypes"),
          i = e("./Expression"),
          s = (function () {
            function e(t, n, o, s, l, a) {
              if (
                ((function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function");
                })(this, e),
                this.constructor === e)
              )
                throw new Error("Abstract Class Instatiation Error");
              (this.type = a),
                (this.minX = t),
                (this.minY = n),
                (this.maxX = t + o),
                (this.maxY = n + s),
                (this.value = l),
                (this.width = o),
                (this.height = s),
                (this.x = (this.minX + this.maxX) / 2),
                (this.y = (this.minY + this.maxY) / 2),
                (this.region = {});
              for (var u in r) this.region[r[u]] = new i(r[u]);
              (this.wall = {}), (this.size = o * s);
            }
            return (
              o(e, [
                {
                  key: "hasAnyTop",
                  value: function () {
                    return (
                      this.region[r.TLEFT].hasElement() ||
                      this.region[r.ABOVE].hasElement() ||
                      this.region[r.SUPER].hasElement()
                    );
                  },
                },
                {
                  key: "hasAnyBottom",
                  value: function () {
                    return (
                      this.region[r.BLEFT].hasElement() ||
                      this.region[r.BELOW].hasElement() ||
                      this.region[r.SUBSC].hasElement()
                    );
                  },
                },
                {
                  key: "setWall",
                  value: function (e) {
                    (this.wall.top = e.top),
                      (this.wall.bottom = e.bottom),
                      (this.wall.left = e.left),
                      (this.wall.right = e.right);
                  },
                },
                {
                  key: "getWallCopy",
                  value: function () {
                    return {
                      top: this.wall.top,
                      bottom: this.wall.bottom,
                      left: this.wall.left,
                      right: this.wall.right,
                    };
                  },
                },
                {
                  key: "apply",
                  value: function (e, t, n) {
                    for (var o in this.region)
                      if (this.region[o].hasElement()) {
                        var r = t(this.region[o]);
                        this.region[o].apply(e, t, function (e) {
                          return r && n(e);
                        });
                      }
                  },
                },
              ]),
              e
            );
          })();
        t.exports = s;
      },
      {
        "./Expression": 3,
        "./enums/RegionTypes": 13,
        "./enums/SymbolTypes": 14,
      },
    ],
    10: [
      function (e, t, n) {
        "use strict";
        var o = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                "value" in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o);
            }
          }
          return function (t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t;
          };
        })();
        e("./Symbol");
        var r = e("./AlphanumericSymbol"),
          i = e("./BracketSymbol"),
          s = e("./FractionSymbol"),
          l = e("./LimitSymbol"),
          a = e("./OperatorSymbol"),
          u = e("./RootSymbol"),
          c = e("./enums/SymbolTypes"),
          f = e("./constant");
        var y = (function () {
          function e() {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e);
          }
          return (
            o(e, null, [
              {
                key: "make",
                value: function (e) {
                  if (" " == e.textContent || "g" == e.tagName) return null;
                  var t,
                    n,
                    o = svgedit.utilities.getBBox(e),
                    y = o.x,
                    p = o.y,
                    m = o.width,
                    h = o.height,
                    b =
                      "path" == e.nodeName ? e.id.split("_")[3] : e.textContent;
                  switch (
                    ((t = b),
                    -1 != f.BRACKET.indexOf(t)
                      ? c.BRACKET
                      : -1 != f.LINE.indexOf(t)
                      ? c.FRACTION
                      : -1 != f.ROOT.indexOf(t)
                      ? c.ROOT
                      : -1 != f.LIMIT.indexOf(t)
                      ? c.LIMIT
                      : -1 != f.OPERATOR.indexOf(t)
                      ? c.OPERATOR
                      : c.ALPHANUMERIC)
                  ) {
                    case c.BRACKET:
                      n = new i(y, p, m, h, b);
                      break;
                    case c.FRACTION:
                      n = new s(y, p, m, h, b);
                      break;
                    case c.ROOT:
                      n = new u(y, p, m, h, b);
                      break;
                    case c.LIMIT:
                      n = new l(y, p, m, h, b);
                      break;
                    case c.ALPHANUMERIC:
                      n = new r(y, p, m, h, b);
                      break;
                    case c.OPERATOR:
                      n = new a(y, p, m, h, b);
                      break;
                    default:
                      throw "Cannot have any other symbol than type.";
                  }
                  return (n.id = e.id), n;
                },
              },
            ]),
            e
          );
        })();
        t.exports = y;
      },
      {
        "./AlphanumericSymbol": 1,
        "./BracketSymbol": 2,
        "./FractionSymbol": 4,
        "./LimitSymbol": 5,
        "./OperatorSymbol": 6,
        "./RootSymbol": 8,
        "./Symbol": 9,
        "./constant": 11,
        "./enums/SymbolTypes": 14,
      },
    ],
    11: [
      function (e, t, n) {
        "use strict";
        var o;
        function r(e, t, n) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        t.exports = {
          REGION_NAMES: {
            ROOT: "root",
            TLEFT: "tleft",
            ABOVE: "above",
            SUPERS: "supers",
            CONTAINS: "contains",
            BLEFT: "bleft",
            BELOW: "below",
            SUSC: "subsc",
          },
          SYMBOL_TYPES: {
            ALPHANUMERIC: "text",
            TEXT: "text",
            LIMIT: "limit",
            FRACTION: "fraction",
            BRACKET: "bracket",
            ROOT: "root",
            OPERATOR: "operator",
          },
          BRACKET_TYPES: { OPEN: "open", CLOSE: "close" },
          TEX_TEXT:
            ((o = {
              sum: " \\sum ",
              lim: " \\lim ",
              "∑": " \\sum ",
              fraction: " \\frac ",
              root: " \\sqrt ",
              integral: " \\int",
              "∫": " \\int ",
              lbracket: " \\left( ",
              rbracket: " \\right) ",
              "(": " \\left( ",
              ")": " \\right) ",
              "±": " \\pm ",
              "∓": " \\mp ",
              "+": " + ",
              "×": " \\times ",
              "—": " - ",
              overline: " \\overline ",
              underline: " \\underline ",
              "<": " \\lt ",
              "≤": " \\le ",
              ">": " \\gt ",
              "≥": " \\ge ",
              "=": " = ",
              "→": " \\to ",
            }),
            r(o, "lim", " \\lim "),
            r(o, "->", "\\to "),
            o),
          BRACKET: ["lbracket", "(", ")", "rbracket"],
          LINE: ["fraction", "—"],
          ROOT: ["root"],
          LIMIT: ["sum", "∑", "integral", "∫", "lim"],
          OPERATOR: ["+", "±", "∓", "<", ">", "≤", "≥", "=", "×", "→"],
        };
      },
      {},
    ],
    12: [
      function (e, t, n) {
        "use strict";
        t.exports = { OPEN: "open", CLOSE: "close" };
      },
      {},
    ],
    13: [
      function (e, t, n) {
        "use strict";
        t.exports = {
          ROOT: "ROOT",
          TLEFT: "TLEFT",
          ABOVE: "ABOVE",
          SUPER: "SUPER",
          CONTAINS: "CONTAINS",
          BLEFT: "BLEFT",
          BELOW: "BELOW",
          SUBSC: "SUBSC",
        };
      },
      {},
    ],
    14: [
      function (e, t, n) {
        "use strict";
        t.exports = {
          ALPHANUMERIC: "ALPHANUMERIC",
          BRACKET: "BRACKET",
          FRACTION: "FRACTION",
          LIMIT: "LIMIT",
          OPERATOR: "OPERATION",
          ROOT: "ROOT",
        };
      },
      {},
    ],
    15: [
      function (e, t, n) {
        "use strict";
        window.Tool = { RecognitionTool: e("./RecognitionTool") };
      },
      { "./RecognitionTool": 7 },
    ],
  },
  {},
  [15],
);
