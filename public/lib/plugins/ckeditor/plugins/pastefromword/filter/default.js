﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function () {
  function y(a) {
    for (var a = a.toUpperCase(), c = z.length, b = 0, f = 0; f < c; ++f)
      for (
        var d = z[f], e = d[1].length;
        a.substr(0, e) == d[1];
        a = a.substr(e)
      )
        b += d[0];
    return b;
  }
  function A(a) {
    for (
      var a = a.toUpperCase(), c = B.length, b = 1, f = 1;
      0 < a.length;
      f *= c
    )
      (b += B.indexOf(a.charAt(a.length - 1)) * f),
        (a = a.substr(0, a.length - 1));
    return b;
  }
  var C = CKEDITOR.htmlParser.fragment.prototype,
    o = CKEDITOR.htmlParser.element.prototype;
  C.onlyChild = o.onlyChild = function () {
    var a = this.children;
    return (1 == a.length && a[0]) || null;
  };
  o.removeAnyChildWithName = function (a) {
    for (var c = this.children, b = [], f, d = 0; d < c.length; d++)
      (f = c[d]),
        f.name &&
          (f.name == a && (b.push(f), c.splice(d--, 1)),
          (b = b.concat(f.removeAnyChildWithName(a))));
    return b;
  };
  o.getAncestor = function (a) {
    for (var c = this.parent; c && (!c.name || !c.name.match(a)); )
      c = c.parent;
    return c;
  };
  C.firstChild = o.firstChild = function (a) {
    for (var c, b = 0; b < this.children.length; b++)
      if (((c = this.children[b]), a(c) || (c.name && (c = c.firstChild(a)))))
        return c;
    return null;
  };
  o.addStyle = function (a, c, b) {
    var f = "";
    if ("string" == typeof c) f += a + ":" + c + ";";
    else {
      if ("object" == typeof a)
        for (var d in a) a.hasOwnProperty(d) && (f += d + ":" + a[d] + ";");
      else f += a;
      b = c;
    }
    this.attributes || (this.attributes = {});
    a = this.attributes.style || "";
    a = (b ? [f, a] : [a, f]).join(";");
    this.attributes.style = a.replace(/^;|;(?=;)/, "");
  };
  o.getStyle = function (a) {
    var c = this.attributes.style;
    if (c) return (c = CKEDITOR.tools.parseCssText(c, 1)), c[a];
  };
  CKEDITOR.dtd.parentOf = function (a) {
    var c = {},
      b;
    for (b in this) -1 == b.indexOf("$") && this[b][a] && (c[b] = 1);
    return c;
  };
  var H =
      /^([.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz){1}?/i,
    D = /^(?:\b0[^\s]*\s*){1,4}$/,
    x = {
      ol: {
        decimal: /\d+/,
        "lower-roman":
          /^m{0,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/,
        "upper-roman":
          /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/,
        "lower-alpha": /^[a-z]+$/,
        "upper-alpha": /^[A-Z]+$/,
      },
      ul: {
        disc: /[l\u00B7\u2002]/,
        circle: /[\u006F\u00D8]/,
        square: /[\u006E\u25C6]/,
      },
    },
    z = [
      [1e3, "M"],
      [900, "CM"],
      [500, "D"],
      [400, "CD"],
      [100, "C"],
      [90, "XC"],
      [50, "L"],
      [40, "XL"],
      [10, "X"],
      [9, "IX"],
      [5, "V"],
      [4, "IV"],
      [1, "I"],
    ],
    B = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    s = 0,
    t = null,
    w,
    E = (CKEDITOR.plugins.pastefromword = {
      utils: {
        createListBulletMarker: function (a, c) {
          var b = new CKEDITOR.htmlParser.element("cke:listbullet");
          b.attributes = { "cke:listsymbol": a[0] };
          b.add(new CKEDITOR.htmlParser.text(c));
          return b;
        },
        isListBulletIndicator: function (a) {
          if (/mso-list\s*:\s*Ignore/i.test(a.attributes && a.attributes.style))
            return !0;
        },
        isContainingOnlySpaces: function (a) {
          var c;
          return (c = a.onlyChild()) && /^(:?\s|&nbsp;)+$/.test(c.value);
        },
        resolveList: function (a) {
          var c = a.attributes,
            b;
          if (
            (b = a.removeAnyChildWithName("cke:listbullet")) &&
            b.length &&
            (b = b[0])
          )
            return (
              (a.name = "cke:li"),
              c.style &&
                (c.style =
                  E.filters.stylesFilter([
                    ["text-indent"],
                    ["line-height"],
                    [
                      /^margin(:?-left)?$/,
                      null,
                      function (a) {
                        a = a.split(" ");
                        a = CKEDITOR.tools.convertToPx(a[3] || a[1] || a[0]);
                        !s && null !== t && a > t && (s = a - t);
                        t = a;
                        c["cke:indent"] = (s && Math.ceil(a / s) + 1) || 1;
                      },
                    ],
                    [
                      /^mso-list$/,
                      null,
                      function (a) {
                        var a = a.split(" "),
                          b = Number(a[0].match(/\d+/)),
                          a = Number(a[1].match(/\d+/));
                        1 == a && (b !== w && (c["cke:reset"] = 1), (w = b));
                        c["cke:indent"] = a;
                      },
                    ],
                  ])(c.style, a) || ""),
              c["cke:indent"] || ((t = 0), (c["cke:indent"] = 1)),
              CKEDITOR.tools.extend(c, b.attributes),
              !0
            );
          w = t = s = null;
          return !1;
        },
        getStyleComponents: (function () {
          var a = CKEDITOR.dom.element.createFromHtml(
            '<div style="position:absolute;left:-9999px;top:-9999px;"></div>',
            CKEDITOR.document,
          );
          CKEDITOR.document.getBody().append(a);
          return function (c, b, f) {
            a.setStyle(c, b);
            for (var c = {}, b = f.length, d = 0; d < b; d++)
              c[f[d]] = a.getStyle(f[d]);
            return c;
          };
        })(),
        listDtdParents: CKEDITOR.dtd.parentOf("ol"),
      },
      filters: {
        flattenList: function (a, c) {
          var c = "number" == typeof c ? c : 1,
            b = a.attributes,
            f;
          switch (b.type) {
            case "a":
              f = "lower-alpha";
              break;
            case "1":
              f = "decimal";
          }
          for (var d = a.children, e, h = 0; h < d.length; h++)
            if (((e = d[h]), e.name in CKEDITOR.dtd.$listItem)) {
              var j = e.attributes,
                g = e.children,
                m = g[g.length - 1];
              m.name in CKEDITOR.dtd.$list &&
                (a.add(m, h + 1), --g.length || d.splice(h--, 1));
              e.name = "cke:li";
              b.start && !h && (j.value = b.start);
              E.filters.stylesFilter([
                [
                  "tab-stops",
                  null,
                  function (a) {
                    (a = a.split(" ")[1].match(H)) &&
                      (t = CKEDITOR.tools.convertToPx(a[0]));
                  },
                ],
                1 == c
                  ? [
                      "mso-list",
                      null,
                      function (a) {
                        a = a.split(" ");
                        a = Number(a[0].match(/\d+/));
                        a !== w && (j["cke:reset"] = 1);
                        w = a;
                      },
                    ]
                  : null,
              ])(j.style);
              j["cke:indent"] = c;
              j["cke:listtype"] = a.name;
              j["cke:list-style-type"] = f;
            } else if (e.name in CKEDITOR.dtd.$list) {
              arguments.callee.apply(this, [e, c + 1]);
              d = d
                .slice(0, h)
                .concat(e.children)
                .concat(d.slice(h + 1));
              a.children = [];
              e = 0;
              for (g = d.length; e < g; e++) a.add(d[e]);
              d = a.children;
            }
          delete a.name;
          b["cke:list"] = 1;
        },
        assembleList: function (a) {
          for (
            var c = a.children,
              b,
              f,
              d,
              e,
              h,
              j,
              a = [],
              g,
              m,
              i,
              l,
              k,
              p,
              n = 0;
            n < c.length;
            n++
          )
            if (((b = c[n]), "cke:li" == b.name))
              if (
                ((b.name = "li"),
                (f = b.attributes),
                (i =
                  (i = f["cke:listsymbol"]) &&
                  i.match(/^(?:[(]?)([^\s]+?)([.)]?)$/)),
                (l = k = p = null),
                f["cke:ignored"])
              )
                c.splice(n--, 1);
              else {
                f["cke:reset"] && (j = e = h = null);
                d = Number(f["cke:indent"]);
                d != e && (m = g = null);
                if (i) {
                  if (m && x[m][g].test(i[1])) (l = m), (k = g);
                  else
                    for (var q in x)
                      for (var u in x[q])
                        if (x[q][u].test(i[1]))
                          if ("ol" == q && /alpha|roman/.test(u)) {
                            if (
                              ((g = /roman/.test(u) ? y(i[1]) : A(i[1])),
                              !p || g < p)
                            )
                              (p = g), (l = q), (k = u);
                          } else {
                            l = q;
                            k = u;
                            break;
                          }
                  !l && (l = i[2] ? "ol" : "ul");
                } else
                  (l = f["cke:listtype"] || "ol"),
                    (k = f["cke:list-style-type"]);
                m = l;
                g = k || ("ol" == l ? "decimal" : "disc");
                k &&
                  k != ("ol" == l ? "decimal" : "disc") &&
                  b.addStyle("list-style-type", k);
                if ("ol" == l && i) {
                  switch (k) {
                    case "decimal":
                      p = Number(i[1]);
                      break;
                    case "lower-roman":
                    case "upper-roman":
                      p = y(i[1]);
                      break;
                    case "lower-alpha":
                    case "upper-alpha":
                      p = A(i[1]);
                  }
                  b.attributes.value = p;
                }
                if (j) {
                  if (d > e)
                    a.push((j = new CKEDITOR.htmlParser.element(l))),
                      j.add(b),
                      h.add(j);
                  else {
                    if (d < e) {
                      e -= d;
                      for (var r; e-- && (r = j.parent); ) j = r.parent;
                    }
                    j.add(b);
                  }
                  c.splice(n--, 1);
                } else
                  a.push((j = new CKEDITOR.htmlParser.element(l))),
                    j.add(b),
                    (c[n] = j);
                h = b;
                e = d;
              }
            else j && (j = e = h = null);
          for (n = 0; n < a.length; n++)
            if (
              ((j = a[n]),
              (q = j.children),
              (g = g = void 0),
              (u = j.children.length),
              (r = g = void 0),
              (c = /list-style-type:(.*?)(?:;|$)/),
              (e = CKEDITOR.plugins.pastefromword.filters.stylesFilter),
              (g = j.attributes),
              !c.exec(g.style))
            ) {
              for (h = 0; h < u; h++)
                if (
                  ((g = q[h]),
                  g.attributes.value &&
                    Number(g.attributes.value) == h + 1 &&
                    delete g.attributes.value,
                  (g = c.exec(g.attributes.style)))
                )
                  if (g[1] == r || !r) r = g[1];
                  else {
                    r = null;
                    break;
                  }
              if (r) {
                for (h = 0; h < u; h++)
                  (g = q[h].attributes),
                    g.style &&
                      (g.style = e([["list-style-type"]])(g.style) || "");
                j.addStyle("list-style-type", r);
              }
            }
          w = t = s = null;
        },
        falsyFilter: function () {
          return !1;
        },
        stylesFilter: function (a, c) {
          return function (b, f) {
            var d = [];
            (b || "")
              .replace(/&quot;/g, '"')
              .replace(
                /\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,
                function (b, e, g) {
                  e = e.toLowerCase();
                  "font-family" == e && (g = g.replace(/["']/g, ""));
                  for (var m, i, l, k = 0; k < a.length; k++)
                    if (
                      a[k] &&
                      ((b = a[k][0]),
                      (m = a[k][1]),
                      (i = a[k][2]),
                      (l = a[k][3]),
                      e.match(b) && (!m || g.match(m)))
                    ) {
                      e = l || e;
                      c && (i = i || g);
                      "function" == typeof i && (i = i(g, f, e));
                      i && i.push && ((e = i[0]), (i = i[1]));
                      "string" == typeof i && d.push([e, i]);
                      return;
                    }
                  !c && d.push([e, g]);
                },
              );
            for (var e = 0; e < d.length; e++) d[e] = d[e].join(":");
            return d.length ? d.join(";") + ";" : !1;
          };
        },
        elementMigrateFilter: function (a, c) {
          return a
            ? function (b) {
                var f = c ? new CKEDITOR.style(a, c)._.definition : a;
                b.name = f.element;
                CKEDITOR.tools.extend(
                  b.attributes,
                  CKEDITOR.tools.clone(f.attributes),
                );
                b.addStyle(CKEDITOR.style.getStyleText(f));
              }
            : function () {};
        },
        styleMigrateFilter: function (a, c) {
          var b = this.elementMigrateFilter;
          return a
            ? function (f, d) {
                var e = new CKEDITOR.htmlParser.element(null),
                  h = {};
                h[c] = f;
                b(a, h)(e);
                e.children = d.children;
                d.children = [e];
                e.filter = function () {};
                e.parent = d;
              }
            : function () {};
        },
        bogusAttrFilter: function (a, c) {
          if (-1 == c.name.indexOf("cke:")) return !1;
        },
        applyStyleFilter: null,
      },
      getRules: function (a, c) {
        var b = CKEDITOR.dtd,
          f = CKEDITOR.tools.extend({}, b.$block, b.$listItem, b.$tableContent),
          d = a.config,
          e = this.filters,
          h = e.falsyFilter,
          j = e.stylesFilter,
          g = e.elementMigrateFilter,
          m = CKEDITOR.tools.bind(
            this.filters.styleMigrateFilter,
            this.filters,
          ),
          i = this.utils.createListBulletMarker,
          l = e.flattenList,
          k = e.assembleList,
          p = this.utils.isListBulletIndicator,
          n = this.utils.isContainingOnlySpaces,
          q = this.utils.resolveList,
          u = function (a) {
            a = CKEDITOR.tools.convertToPx(a);
            return isNaN(a) ? a : a + "px";
          },
          r = this.utils.getStyleComponents,
          t = this.utils.listDtdParents,
          o = !1 !== d.pasteFromWordRemoveFontStyles,
          s = !1 !== d.pasteFromWordRemoveStyles;
        return {
          elementNames: [[/meta|link|script/, ""]],
          root: function (a) {
            a.filterChildren(c);
            k(a);
          },
          elements: {
            "^": function (a) {
              var c;
              CKEDITOR.env.gecko && (c = e.applyStyleFilter) && c(a);
            },
            $: function (a) {
              var v = a.name || "",
                e = a.attributes;
              v in f &&
                e.style &&
                (e.style = j([[/^(:?width|height)$/, null, u]])(e.style) || "");
              if (v.match(/h\d/)) {
                a.filterChildren(c);
                if (q(a)) return;
                g(d["format_" + v])(a);
              } else if (v in b.$inline)
                a.filterChildren(c), n(a) && delete a.name;
              else if (-1 != v.indexOf(":") && -1 == v.indexOf("cke")) {
                a.filterChildren(c);
                if ("v:imagedata" == v) {
                  if ((v = a.attributes["o:href"])) a.attributes.src = v;
                  a.name = "img";
                  return;
                }
                delete a.name;
              }
              v in t && (a.filterChildren(c), k(a));
            },
            style: function (a) {
              if (CKEDITOR.env.gecko) {
                var a =
                    (a = a
                      .onlyChild()
                      .value.match(
                        /\/\* Style Definitions \*\/([\s\S]*?)\/\*/,
                      )) && a[1],
                  c = {};
                a &&
                  (a
                    .replace(/[\n\r]/g, "")
                    .replace(/(.+?)\{(.+?)\}/g, function (a, b, F) {
                      for (
                        var b = b.split(","), a = b.length, d = 0;
                        d < a;
                        d++
                      )
                        CKEDITOR.tools
                          .trim(b[d])
                          .replace(/^(\w+)(\.[\w-]+)?$/g, function (a, b, d) {
                            b = b || "*";
                            d = d.substring(1, d.length);
                            d.match(/MsoNormal/) ||
                              (c[b] || (c[b] = {}),
                              d ? (c[b][d] = F) : (c[b] = F));
                          });
                    }),
                  (e.applyStyleFilter = function (a) {
                    var b = c["*"] ? "*" : a.name,
                      d = a.attributes && a.attributes["class"];
                    b in c &&
                      ((b = c[b]),
                      "object" == typeof b && (b = b[d]),
                      b && a.addStyle(b, !0));
                  }));
              }
              return !1;
            },
            p: function (a) {
              if (
                /MsoListParagraph/i.exec(a.attributes["class"]) ||
                a.getStyle("mso-list")
              ) {
                var b = a.firstChild(function (a) {
                  return a.type == CKEDITOR.NODE_TEXT && !n(a.parent);
                });
                (b = b && b.parent) && b.addStyle("mso-list", "Ignore");
              }
              a.filterChildren(c);
              q(a) ||
                (d.enterMode == CKEDITOR.ENTER_BR
                  ? (delete a.name,
                    a.add(new CKEDITOR.htmlParser.element("br")))
                  : g(
                      d[
                        "format_" +
                          (d.enterMode == CKEDITOR.ENTER_P ? "p" : "div")
                      ],
                    )(a));
            },
            div: function (a) {
              var c = a.onlyChild();
              if (c && "table" == c.name) {
                var b = a.attributes;
                c.attributes = CKEDITOR.tools.extend(c.attributes, b);
                b.style && c.addStyle(b.style);
                c = new CKEDITOR.htmlParser.element("div");
                c.addStyle("clear", "both");
                a.add(c);
                delete a.name;
              }
            },
            td: function (a) {
              a.getAncestor("thead") && (a.name = "th");
            },
            ol: l,
            ul: l,
            dl: l,
            font: function (a) {
              if (p(a.parent)) delete a.name;
              else {
                a.filterChildren(c);
                var b = a.attributes,
                  d = b.style,
                  e = a.parent;
                "font" == e.name
                  ? (CKEDITOR.tools.extend(e.attributes, a.attributes),
                    d && e.addStyle(d),
                    delete a.name)
                  : ((d = d || ""),
                    b.color &&
                      ("#000000" != b.color && (d += "color:" + b.color + ";"),
                      delete b.color),
                    b.face &&
                      ((d += "font-family:" + b.face + ";"), delete b.face),
                    b.size &&
                      ((d +=
                        "font-size:" +
                        (3 < b.size
                          ? "large"
                          : 3 > b.size
                          ? "small"
                          : "medium") +
                        ";"),
                      delete b.size),
                    (a.name = "span"),
                    a.addStyle(d));
              }
            },
            span: function (a) {
              if (p(a.parent)) return !1;
              a.filterChildren(c);
              if (n(a)) return delete a.name, null;
              if (p(a)) {
                var b = a.firstChild(function (a) {
                    return a.value || "img" == a.name;
                  }),
                  e =
                    (b = b && (b.value || "l.")) &&
                    b.match(/^(?:[(]?)([^\s]+?)([.)]?)$/);
                if (e)
                  return (
                    (b = i(e, b)),
                    (a = a.getAncestor("span")) &&
                      / mso-hide:\s*all|display:\s*none /.test(
                        a.attributes.style,
                      ) &&
                      (b.attributes["cke:ignored"] = 1),
                    b
                  );
              }
              if ((e = (b = a.attributes) && b.style))
                b.style =
                  j([
                    ["line-height"],
                    [
                      /^font-family$/,
                      null,
                      !o ? m(d.font_style, "family") : null,
                    ],
                    [
                      /^font-size$/,
                      null,
                      !o ? m(d.fontSize_style, "size") : null,
                    ],
                    [
                      /^color$/,
                      null,
                      !o ? m(d.colorButton_foreStyle, "color") : null,
                    ],
                    [
                      /^background-color$/,
                      null,
                      !o ? m(d.colorButton_backStyle, "color") : null,
                    ],
                  ])(e, a) || "";
              b.style || delete b.style;
              CKEDITOR.tools.isEmpty(b) && delete a.name;
              return null;
            },
            b: g(d.coreStyles_bold),
            i: g(d.coreStyles_italic),
            u: g(d.coreStyles_underline),
            s: g(d.coreStyles_strike),
            sup: g(d.coreStyles_superscript),
            sub: g(d.coreStyles_subscript),
            a: function (a) {
              a = a.attributes;
              a.href &&
                a.href.match(/^file:\/\/\/[\S]+#/i) &&
                (a.href = a.href.replace(/^file:\/\/\/[^#]+/i, ""));
            },
            "cke:listbullet": function (a) {
              a.getAncestor(/h\d/) &&
                !d.pasteFromWordNumberedHeadingToList &&
                delete a.name;
            },
          },
          attributeNames: [
            [/^onmouse(:?out|over)/, ""],
            [/^onload$/, ""],
            [/(?:v|o):\w+/, ""],
            [/^lang/, ""],
          ],
          attributes: {
            style: j(
              s
                ? [
                    [/^list-style-type$/, null],
                    [
                      /^margin$|^margin-(?!bottom|top)/,
                      null,
                      function (a, b, c) {
                        if (b.name in { p: 1, div: 1 }) {
                          b =
                            "ltr" == d.contentsLangDirection
                              ? "margin-left"
                              : "margin-right";
                          if ("margin" == c) a = r(c, a, [b])[b];
                          else if (c != b) return null;
                          if (a && !D.test(a)) return [b, a];
                        }
                        return null;
                      },
                    ],
                    [/^clear$/],
                    [
                      /^border.*|margin.*|vertical-align|float$/,
                      null,
                      function (a, b) {
                        if ("img" == b.name) return a;
                      },
                    ],
                    [
                      /^width|height$/,
                      null,
                      function (a, b) {
                        if (b.name in { table: 1, td: 1, th: 1, img: 1 })
                          return a;
                      },
                    ],
                  ]
                : [
                    [/^mso-/],
                    [
                      /-color$/,
                      null,
                      function (a) {
                        if ("transparent" == a) return !1;
                        if (CKEDITOR.env.gecko)
                          return a.replace(
                            /-moz-use-text-color/g,
                            "transparent",
                          );
                      },
                    ],
                    [/^margin$/, D],
                    ["text-indent", "0cm"],
                    ["page-break-before"],
                    ["tab-stops"],
                    ["display", "none"],
                    o ? [/font-?/] : null,
                  ],
              s,
            ),
            width: function (a, c) {
              if (c.name in b.$tableContent) return !1;
            },
            border: function (a, c) {
              if (c.name in b.$tableContent) return !1;
            },
            class: h,
            bgcolor: h,
            valign: s
              ? h
              : function (a, b) {
                  b.addStyle("vertical-align", a);
                  return !1;
                },
          },
          comment: !CKEDITOR.env.ie
            ? function (a, b) {
                var c = a.match(/<img.*?>/),
                  d = a.match(/^\[if !supportLists\]([\s\S]*?)\[endif\]$/);
                return d
                  ? ((d =
                      (c = d[1] || (c && "l.")) &&
                      c.match(/>(?:[(]?)([^\s]+?)([.)]?)</)),
                    i(d, c))
                  : CKEDITOR.env.gecko && c
                  ? ((c = CKEDITOR.htmlParser.fragment.fromHtml(c[0])
                      .children[0]),
                    (d =
                      (d =
                        (d = b.previous) &&
                        d.value.match(
                          /<v:imagedata[^>]*o:href=['"](.*?)['"]/,
                        )) && d[1]) && (c.attributes.src = d),
                    c)
                  : !1;
              }
            : h,
        };
      },
    }),
    G = function () {
      this.dataFilter = new CKEDITOR.htmlParser.filter();
    };
  G.prototype = {
    toHtml: function (a) {
      var a = CKEDITOR.htmlParser.fragment.fromHtml(a),
        c = new CKEDITOR.htmlParser.basicWriter();
      a.writeHtml(c, this.dataFilter);
      return c.getHtml(!0);
    },
  };
  CKEDITOR.cleanWord = function (a, c) {
    CKEDITOR.env.gecko &&
      (a = a.replace(
        /(<\!--\[if[^<]*?\])--\>([\S\s]*?)<\!--(\[endif\]--\>)/gi,
        "$1$2$3",
      ));
    CKEDITOR.env.webkit &&
      (a = a.replace(
        /(class="MsoListParagraph[^>]+><\!--\[if !supportLists\]--\>)([^<]+<span[^<]+<\/span>)(<\!--\[endif\]--\>)/gi,
        "$1<span>$2</span>$3",
      ));
    var b = new G(),
      f = b.dataFilter;
    f.addRules(CKEDITOR.plugins.pastefromword.getRules(c, f));
    c.fire("beforeCleanWord", { filter: f });
    try {
      a = b.toHtml(a);
    } catch (d) {
      alert(c.lang.pastefromword.error);
    }
    a = a.replace(/cke:.*?".*?"/g, "");
    a = a.replace(/style=""/g, "");
    return (a = a.replace(/<span>/g, ""));
  };
})();
