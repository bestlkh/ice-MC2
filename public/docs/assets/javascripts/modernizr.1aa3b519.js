!(function (e, t) {
  for (var n in t) e[n] = t[n];
})(
  window,
  (function (e) {
    function t(r) {
      if (n[r]) return n[r].exports;
      var o = (n[r] = { i: r, l: !1, exports: {} });
      return e[r].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
    }
    var n = {};
    return (
      (t.m = e),
      (t.c = n),
      (t.d = function (e, n, r) {
        t.o(e, n) ||
          Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r,
          });
      }),
      (t.n = function (e) {
        var n =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return t.d(n, "a", n), n;
      }),
      (t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (t.p = ""),
      t((t.s = 4))
    );
  })({
    4: function (e, t, n) {
      "use strict";
      n(5);
    },
    5: function (e, t) {
      !(function (t) {
        !(function (e, t, n) {
          function r(e, t) {
            return typeof e === t;
          }
          function o(e) {
            var t = _.className,
              n = C._config.classPrefix || "";
            if ((T && (t = t.baseVal), C._config.enableJSClass)) {
              var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
              t = t.replace(r, "$1" + n + "js$2");
            }
            C._config.enableClasses &&
              ((t += " " + n + e.join(" " + n)),
              T ? (_.className.baseVal = t) : (_.className = t));
          }
          function i(e, t) {
            if ("object" == typeof e) for (var n in e) b(e, n) && i(n, e[n]);
            else {
              e = e.toLowerCase();
              var r = e.split("."),
                s = C[r[0]];
              if ((2 == r.length && (s = s[r[1]]), void 0 !== s)) return C;
              (t = "function" == typeof t ? t() : t),
                1 == r.length
                  ? (C[r[0]] = t)
                  : (!C[r[0]] ||
                      C[r[0]] instanceof Boolean ||
                      (C[r[0]] = new Boolean(C[r[0]])),
                    (C[r[0]][r[1]] = t)),
                o([(t && 0 != t ? "" : "no-") + r.join("-")]),
                C._trigger(e, t);
            }
            return C;
          }
          function s() {
            return "function" != typeof t.createElement
              ? t.createElement(arguments[0])
              : T
              ? t.createElementNS.call(
                  t,
                  "http://www.w3.org/2000/svg",
                  arguments[0],
                )
              : t.createElement.apply(t, arguments);
          }
          function a() {
            var e = t.body;
            return e || ((e = s(T ? "svg" : "body")), (e.fake = !0)), e;
          }
          function u(e, n, r, o) {
            var i,
              u,
              l,
              f,
              c = "modernizr",
              d = s("div"),
              p = a();
            if (parseInt(r, 10))
              for (; r--; )
                (l = s("div")),
                  (l.id = o ? o[r] : c + (r + 1)),
                  d.appendChild(l);
            return (
              (i = s("style")),
              (i.type = "text/css"),
              (i.id = "s" + c),
              (p.fake ? p : d).appendChild(i),
              p.appendChild(d),
              i.styleSheet
                ? (i.styleSheet.cssText = e)
                : i.appendChild(t.createTextNode(e)),
              (d.id = c),
              p.fake &&
                ((p.style.background = ""),
                (p.style.overflow = "hidden"),
                (f = _.style.overflow),
                (_.style.overflow = "hidden"),
                _.appendChild(p)),
              (u = n(d, e)),
              p.fake
                ? (p.parentNode.removeChild(p),
                  (_.style.overflow = f),
                  _.offsetHeight)
                : d.parentNode.removeChild(d),
              !!u
            );
          }
          function l(e, t) {
            return !!~("" + e).indexOf(t);
          }
          function f(e) {
            return e
              .replace(/([A-Z])/g, function (e, t) {
                return "-" + t.toLowerCase();
              })
              .replace(/^ms-/, "-ms-");
          }
          function c(t, n, r) {
            var o;
            if ("getComputedStyle" in e) {
              o = getComputedStyle.call(e, t, n);
              var i = e.console;
              if (null !== o) r && (o = o.getPropertyValue(r));
              else if (i) {
                var s = i.error ? "error" : "log";
                i[s].call(
                  i,
                  "getComputedStyle returning null, its possible modernizr test results are inaccurate",
                );
              }
            } else o = !n && t.currentStyle && t.currentStyle[r];
            return o;
          }
          function d(t, r) {
            var o = t.length;
            if ("CSS" in e && "supports" in e.CSS) {
              for (; o--; ) if (e.CSS.supports(f(t[o]), r)) return !0;
              return !1;
            }
            if ("CSSSupportsRule" in e) {
              for (var i = []; o--; ) i.push("(" + f(t[o]) + ":" + r + ")");
              return (
                (i = i.join(" or ")),
                u(
                  "@supports (" +
                    i +
                    ") { #modernizr { position: absolute; } }",
                  function (e) {
                    return "absolute" == c(e, null, "position");
                  },
                )
              );
            }
            return n;
          }
          function p(e) {
            return e
              .replace(/([a-z])-([a-z])/g, function (e, t, n) {
                return t + n.toUpperCase();
              })
              .replace(/^-/, "");
          }
          function h(e, t, o, i) {
            function a() {
              f && (delete j.style, delete j.modElem);
            }
            if (((i = !r(i, "undefined") && i), !r(o, "undefined"))) {
              var u = d(e, o);
              if (!r(u, "undefined")) return u;
            }
            for (
              var f, c, h, m, v, g = ["modernizr", "tspan", "samp"];
              !j.style && g.length;

            )
              (f = !0), (j.modElem = s(g.shift())), (j.style = j.modElem.style);
            for (h = e.length, c = 0; h > c; c++)
              if (
                ((m = e[c]),
                (v = j.style[m]),
                l(m, "-") && (m = p(m)),
                j.style[m] !== n)
              ) {
                if (i || r(o, "undefined")) return a(), "pfx" != t || m;
                try {
                  j.style[m] = o;
                } catch (e) {}
                if (j.style[m] != v) return a(), "pfx" != t || m;
              }
            return a(), !1;
          }
          function m(e, t) {
            return function () {
              return e.apply(t, arguments);
            };
          }
          function v(e, t, n) {
            var o;
            for (var i in e)
              if (e[i] in t)
                return !1 === n
                  ? e[i]
                  : ((o = t[e[i]]), r(o, "function") ? m(o, n || t) : o);
            return !1;
          }
          function g(e, t, n, o, i) {
            var s = e.charAt(0).toUpperCase() + e.slice(1),
              a = (e + " " + k.join(s + " ") + s).split(" ");
            return r(t, "string") || r(t, "undefined")
              ? h(a, t, o, i)
              : ((a = (e + " " + A.join(s + " ") + s).split(" ")), v(a, t, n));
          }
          function y(e, t, r) {
            return g(e, n, n, t, r);
          }
          var w = [],
            S = {
              _version: "3.5.0",
              _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0,
              },
              _q: [],
              on: function (e, t) {
                var n = this;
                setTimeout(function () {
                  t(n[e]);
                }, 0);
              },
              addTest: function (e, t, n) {
                w.push({ name: e, fn: t, options: n });
              },
              addAsyncTest: function (e) {
                w.push({ name: null, fn: e });
              },
            },
            C = function () {};
          (C.prototype = S), (C = new C());
          var b,
            x = [],
            _ = t.documentElement,
            T = "svg" === _.nodeName.toLowerCase();
          !(function () {
            var e = {}.hasOwnProperty;
            b =
              r(e, "undefined") || r(e.call, "undefined")
                ? function (e, t) {
                    return t in e && r(e.constructor.prototype[t], "undefined");
                  }
                : function (t, n) {
                    return e.call(t, n);
                  };
          })(),
            (S._l = {}),
            (S.on = function (e, t) {
              this._l[e] || (this._l[e] = []),
                this._l[e].push(t),
                C.hasOwnProperty(e) &&
                  setTimeout(function () {
                    C._trigger(e, C[e]);
                  }, 0);
            }),
            (S._trigger = function (e, t) {
              if (this._l[e]) {
                var n = this._l[e];
                setTimeout(function () {
                  var e;
                  for (e = 0; e < n.length; e++) (0, n[e])(t);
                }, 0),
                  delete this._l[e];
              }
            }),
            C._q.push(function () {
              S.addTest = i;
            }),
            C.addTest(
              "json",
              "JSON" in e && "parse" in JSON && "stringify" in JSON,
            ),
            C.addTest(
              "svg",
              !!t.createElementNS &&
                !!t.createElementNS("http://www.w3.org/2000/svg", "svg")
                  .createSVGRect,
            );
          var P = (S.testStyles = u);
          C.addTest("checked", function () {
            return P(
              "#modernizr {position:absolute} #modernizr input {margin-left:10px} #modernizr :checked {margin-left:20px;display:block}",
              function (e) {
                var t = s("input");
                return (
                  t.setAttribute("type", "checkbox"),
                  t.setAttribute("checked", "checked"),
                  e.appendChild(t),
                  20 === t.offsetLeft
                );
              },
            );
          }),
            C.addTest("target", function () {
              var t = e.document;
              if (!("querySelectorAll" in t)) return !1;
              try {
                return t.querySelectorAll(":target"), !0;
              } catch (e) {
                return !1;
              }
            }),
            C.addTest("dataset", function () {
              var e = s("div");
              return (
                e.setAttribute("data-a-b", "c"),
                !(!e.dataset || "c" !== e.dataset.aB)
              );
            }),
            C.addTest("details", function () {
              var e,
                t = s("details");
              return (
                "open" in t &&
                (P("#modernizr details{display:block}", function (n) {
                  n.appendChild(t),
                    (t.innerHTML = "<summary>a</summary>b"),
                    (e = t.offsetHeight),
                    (t.open = !0),
                    (e = e != t.offsetHeight);
                }),
                e)
              );
            }),
            C.addTest("fetch", "fetch" in e);
          var z = "Moz O ms Webkit",
            k = S._config.usePrefixes ? z.split(" ") : [];
          S._cssomPrefixes = k;
          var N = { elem: s("modernizr") };
          C._q.push(function () {
            delete N.elem;
          });
          var j = { style: N.elem.style };
          C._q.unshift(function () {
            delete j.style;
          });
          var A = S._config.usePrefixes ? z.toLowerCase().split(" ") : [];
          (S._domPrefixes = A), (S.testAllProps = g), (S.testAllProps = y);
          var E = "CSS" in e && "supports" in e.CSS,
            O = "supportsCSS" in e;
          C.addTest("supports", E || O),
            C.addTest("csstransforms3d", function () {
              var e = !!y("perspective", "1px", !0),
                t = C._config.usePrefixes;
              if (e && (!t || "webkitPerspective" in _.style)) {
                var n;
                C.supports
                  ? (n = "@supports (perspective: 1px)")
                  : ((n = "@media (transform-3d)"),
                    t && (n += ",(-webkit-transform-3d)")),
                  (n +=
                    "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}"),
                  P("#modernizr{width:0;height:0}" + n, function (t) {
                    e = 7 === t.offsetWidth && 18 === t.offsetHeight;
                  });
              }
              return e;
            }),
            (function () {
              var e, t, n, o, i, s, a;
              for (var u in w)
                if (w.hasOwnProperty(u)) {
                  if (
                    ((e = []),
                    (t = w[u]),
                    t.name &&
                      (e.push(t.name.toLowerCase()),
                      t.options &&
                        t.options.aliases &&
                        t.options.aliases.length))
                  )
                    for (n = 0; n < t.options.aliases.length; n++)
                      e.push(t.options.aliases[n].toLowerCase());
                  for (
                    o = r(t.fn, "function") ? t.fn() : t.fn, i = 0;
                    i < e.length;
                    i++
                  )
                    (s = e[i]),
                      (a = s.split(".")),
                      1 === a.length
                        ? (C[a[0]] = o)
                        : (!C[a[0]] ||
                            C[a[0]] instanceof Boolean ||
                            (C[a[0]] = new Boolean(C[a[0]])),
                          (C[a[0]][a[1]] = o)),
                      x.push((o ? "" : "no-") + a.join("-"));
                }
            })(),
            o(x),
            delete S.addTest,
            delete S.addAsyncTest;
          for (var q = 0; q < C._q.length; q++) C._q[q]();
          e.Modernizr = C;
        })(t, document),
          (e.exports = t.Modernizr);
      })(window);
    },
  }),
);
