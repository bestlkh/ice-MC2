!(function e(t, n, i) {
  function s(a, l) {
    if (!n[a]) {
      if (!t[a]) {
        var r = "function" == typeof require && require;
        if (!l && r) return r(a, !0);
        if (o) return o(a, !0);
        var c = new Error("Cannot find module '" + a + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      var d = (n[a] = { exports: {} });
      t[a][0].call(
        d.exports,
        function (e) {
          var n = t[a][1][e];
          return s(n || e);
        },
        d,
        d.exports,
        e,
        t,
        n,
        i,
      );
    }
    return n[a].exports;
  }
  for (
    var o = "function" == typeof require && require, a = 0;
    a < i.length;
    a++
  )
    s(i[a]);
  return s;
})(
  {
    1: [
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var n = {
              ENTER: 13,
              ESC: 27,
              F1: 112,
              F12: 123,
              LEFT: 37,
              RIGHT: 39,
            },
            i = {
              autoReset: !0,
              basic: !1,
              closable: !0,
              closableByDimmer: !0,
              frameless: !1,
              maintainFocus: !0,
              maximizable: !0,
              modal: !0,
              movable: !0,
              moveBounded: !1,
              overflow: !0,
              padding: !0,
              pinnable: !0,
              pinned: !0,
              preventBodyShift: !1,
              resizable: !0,
              startMaximized: !1,
              transition: "pulse",
              notifier: { delay: 5, position: "bottom-right", closeButton: !1 },
              glossary: {
                title: "AlertifyJS",
                ok: "OK",
                cancel: "Cancel",
                acccpt: "Accept",
                deny: "Deny",
                confirm: "Confirm",
                decline: "Decline",
                close: "Close",
                maximize: "Maximize",
                restore: "Restore",
              },
              theme: { input: "ajs-input", ok: "ajs-ok", cancel: "ajs-cancel" },
            },
            s = [];
          function o(e, t) {
            e.className += " " + t;
          }
          function a(e, t) {
            for (
              var n = e.className.split(" "), i = t.split(" "), s = 0;
              s < i.length;
              s += 1
            ) {
              var o = n.indexOf(i[s]);
              o > -1 && n.splice(o, 1);
            }
            e.className = n.join(" ");
          }
          function l() {
            return "rtl" === e.getComputedStyle(document.body).direction;
          }
          function r() {
            return (
              (document.documentElement &&
                document.documentElement.scrollTop) ||
              document.body.scrollTop
            );
          }
          function c() {
            return (
              (document.documentElement &&
                document.documentElement.scrollLeft) ||
              document.body.scrollLeft
            );
          }
          function d(e) {
            for (; e.lastChild; ) e.removeChild(e.lastChild);
          }
          function u(e) {
            if (null === e) return e;
            var t;
            if (Array.isArray(e)) {
              t = [];
              for (var n = 0; n < e.length; n += 1) t.push(u(e[n]));
              return t;
            }
            if (e instanceof Date) return new Date(e.getTime());
            if (e instanceof RegExp)
              return (
                ((t = new RegExp(e.source)).global = e.global),
                (t.ignoreCase = e.ignoreCase),
                (t.multiline = e.multiline),
                (t.lastIndex = e.lastIndex),
                t
              );
            if ("object" == typeof e) {
              t = {};
              for (var i in e) e.hasOwnProperty(i) && (t[i] = u(e[i]));
              return t;
            }
            return e;
          }
          function m(e, t) {
            var n = e.elements.root;
            n.parentNode.removeChild(n),
              delete e.elements,
              (e.settings = u(e.__settings)),
              (e.__init = t),
              delete e.__internal;
          }
          var f = document.addEventListener
              ? function (e, t, n, i) {
                  e.addEventListener(t, n, !0 === i);
                }
              : document.attachEvent
              ? function (e, t, n) {
                  e.attachEvent("on" + t, n);
                }
              : void 0,
            h = document.removeEventListener
              ? function (e, t, n, i) {
                  e.removeEventListener(t, n, !0 === i);
                }
              : document.detachEvent
              ? function (e, t, n) {
                  e.detachEvent("on" + t, n);
                }
              : void 0,
            p = (function () {
              var e,
                t,
                n = !1,
                i = {
                  animation: "animationend",
                  OAnimation: "oAnimationEnd oanimationend",
                  msAnimation: "MSAnimationEnd",
                  MozAnimation: "animationend",
                  WebkitAnimation: "webkitAnimationEnd",
                };
              for (e in i)
                if (void 0 !== document.documentElement.style[e]) {
                  (t = i[e]), (n = !0);
                  break;
                }
              return { type: t, supported: n };
            })();
          function v(e, t) {
            return function () {
              if (arguments.length > 0) {
                for (var n = [], i = 0; i < arguments.length; i += 1)
                  n.push(arguments[i]);
                return n.push(e), t.apply(e, n);
              }
              return t.apply(e, [null, e]);
            };
          }
          function b(e, t) {
            return { index: e, button: t, cancel: !1 };
          }
          function g(e, t) {
            if ("function" == typeof t.get(e)) return t.get(e).call(t);
          }
          var y = (function () {
              var t,
                i,
                y = [],
                _ = null,
                x =
                  e.navigator.userAgent.indexOf("Safari") > -1 &&
                  e.navigator.userAgent.indexOf("Chrome") < 0,
                w = {
                  dimmer: '<div class="ajs-dimmer"></div>',
                  modal: '<div class="ajs-modal" tabindex="0"></div>',
                  dialog: '<div class="ajs-dialog" tabindex="0"></div>',
                  reset: '<button class="ajs-reset"></button>',
                  commands:
                    '<div class="ajs-commands"><button class="ajs-pin"></button><button class="ajs-maximize"></button><button class="ajs-close"></button></div>',
                  header: '<div class="ajs-header"></div>',
                  body: '<div class="ajs-body"></div>',
                  content: '<div class="ajs-content"></div>',
                  footer: '<div class="ajs-footer"></div>',
                  buttons: {
                    primary: '<div class="ajs-primary ajs-buttons"></div>',
                    auxiliary: '<div class="ajs-auxiliary ajs-buttons"></div>',
                  },
                  button: '<button class="ajs-button"></button>',
                  resizeHandle: '<div class="ajs-handle"></div>',
                },
                H = {
                  animationIn: "ajs-in",
                  animationOut: "ajs-out",
                  base: "alertify",
                  basic: "ajs-basic",
                  capture: "ajs-capture",
                  closable: "ajs-closable",
                  fixed: "ajs-fixed",
                  frameless: "ajs-frameless",
                  hidden: "ajs-hidden",
                  maximize: "ajs-maximize",
                  maximized: "ajs-maximized",
                  maximizable: "ajs-maximizable",
                  modeless: "ajs-modeless",
                  movable: "ajs-movable",
                  noSelection: "ajs-no-selection",
                  noOverflow: "ajs-no-overflow",
                  noPadding: "ajs-no-padding",
                  pin: "ajs-pin",
                  pinnable: "ajs-pinnable",
                  prefix: "ajs-",
                  resizable: "ajs-resizable",
                  restore: "ajs-restore",
                  shake: "ajs-shake",
                  unpinned: "ajs-unpinned",
                };
              function C(e) {
                if (!e.__internal) {
                  var t;
                  delete e.__init,
                    e.__settings || (e.__settings = u(e.settings)),
                    null === _ && document.body.setAttribute("tabindex", "0"),
                    "function" == typeof e.setup
                      ? (((t = e.setup()).options = t.options || {}),
                        (t.focus = t.focus || {}))
                      : (t = {
                          buttons: [],
                          focus: { element: null, select: !1 },
                          options: {},
                        }),
                    "object" != typeof e.hooks && (e.hooks = {});
                  var n = [];
                  if (Array.isArray(t.buttons))
                    for (var i = 0; i < t.buttons.length; i += 1) {
                      var s = t.buttons[i],
                        a = {};
                      for (var l in s) s.hasOwnProperty(l) && (a[l] = s[l]);
                      n.push(a);
                    }
                  var r = (e.__internal = {
                      isOpen: !1,
                      activeElement: document.body,
                      timerIn: void 0,
                      timerOut: void 0,
                      buttons: n,
                      focus: t.focus,
                      options: {
                        title: void 0,
                        modal: void 0,
                        basic: void 0,
                        frameless: void 0,
                        pinned: void 0,
                        movable: void 0,
                        moveBounded: void 0,
                        resizable: void 0,
                        autoReset: void 0,
                        closable: void 0,
                        closableByDimmer: void 0,
                        maximizable: void 0,
                        startMaximized: void 0,
                        pinnable: void 0,
                        transition: void 0,
                        padding: void 0,
                        overflow: void 0,
                        onshow: void 0,
                        onclosing: void 0,
                        onclose: void 0,
                        onfocus: void 0,
                        onmove: void 0,
                        onmoved: void 0,
                        onresize: void 0,
                        onresized: void 0,
                        onmaximize: void 0,
                        onmaximized: void 0,
                        onrestore: void 0,
                        onrestored: void 0,
                      },
                      resetHandler: void 0,
                      beginMoveHandler: void 0,
                      beginResizeHandler: void 0,
                      bringToFrontHandler: void 0,
                      modalClickHandler: void 0,
                      buttonsClickHandler: void 0,
                      commandsClickHandler: void 0,
                      transitionInHandler: void 0,
                      transitionOutHandler: void 0,
                      destroy: void 0,
                    }),
                    c = {};
                  (c.root = document.createElement("div")),
                    (c.root.className = H.base + " " + H.hidden + " "),
                    (c.root.innerHTML = w.dimmer + w.modal),
                    (c.dimmer = c.root.firstChild),
                    (c.modal = c.root.lastChild),
                    (c.modal.innerHTML = w.dialog),
                    (c.dialog = c.modal.firstChild),
                    (c.dialog.innerHTML =
                      w.reset +
                      w.commands +
                      w.header +
                      w.body +
                      w.footer +
                      w.resizeHandle +
                      w.reset),
                    (c.reset = []),
                    c.reset.push(c.dialog.firstChild),
                    c.reset.push(c.dialog.lastChild),
                    (c.commands = {}),
                    (c.commands.container = c.reset[0].nextSibling),
                    (c.commands.pin = c.commands.container.firstChild),
                    (c.commands.maximize = c.commands.pin.nextSibling),
                    (c.commands.close = c.commands.maximize.nextSibling),
                    (c.header = c.commands.container.nextSibling),
                    (c.body = c.header.nextSibling),
                    (c.body.innerHTML = w.content),
                    (c.content = c.body.firstChild),
                    (c.footer = c.body.nextSibling),
                    (c.footer.innerHTML =
                      w.buttons.auxiliary + w.buttons.primary),
                    (c.resizeHandle = c.footer.nextSibling),
                    (c.buttons = {}),
                    (c.buttons.auxiliary = c.footer.firstChild),
                    (c.buttons.primary = c.buttons.auxiliary.nextSibling),
                    (c.buttons.primary.innerHTML = w.button),
                    (c.buttonTemplate = c.buttons.primary.firstChild),
                    c.buttons.primary.removeChild(c.buttonTemplate);
                  for (var d = 0; d < e.__internal.buttons.length; d += 1) {
                    var m = e.__internal.buttons[d];
                    y.indexOf(m.key) < 0 && y.push(m.key),
                      (m.element = c.buttonTemplate.cloneNode()),
                      (m.element.innerHTML = m.text),
                      "string" == typeof m.className &&
                        "" !== m.className &&
                        o(m.element, m.className);
                    for (var f in m.attrs)
                      "className" !== f &&
                        m.attrs.hasOwnProperty(f) &&
                        m.element.setAttribute(f, m.attrs[f]);
                    "auxiliary" === m.scope
                      ? c.buttons.auxiliary.appendChild(m.element)
                      : c.buttons.primary.appendChild(m.element);
                  }
                  (e.elements = c),
                    (r.resetHandler = v(e, Z)),
                    (r.beginMoveHandler = v(e, ue)),
                    (r.beginResizeHandler = v(e, _e)),
                    (r.bringToFrontHandler = v(e, N)),
                    (r.modalClickHandler = v(e, X)),
                    (r.buttonsClickHandler = v(e, J)),
                    (r.commandsClickHandler = v(e, P)),
                    (r.transitionInHandler = v(e, $)),
                    (r.transitionOutHandler = v(e, ee));
                  for (var h in r.options)
                    void 0 !== t.options[h]
                      ? e.set(h, t.options[h])
                      : k.defaults.hasOwnProperty(h)
                      ? e.set(h, k.defaults[h])
                      : "title" === h && e.set(h, k.defaults.glossary[h]);
                  "function" == typeof e.build && e.build();
                }
                document.body.appendChild(e.elements.root);
              }
              function z() {
                e.scrollTo(t, i);
              }
              function E() {
                for (var e = 0, t = 0; t < s.length; t += 1) {
                  var n = s[t];
                  (n.isModal() || n.isMaximized()) && (e += 1);
                }
                0 === e && document.body.className.indexOf(H.noOverflow) >= 0
                  ? (a(document.body, H.noOverflow), j(!1))
                  : e > 0 &&
                    document.body.className.indexOf(H.noOverflow) < 0 &&
                    (j(!0), o(document.body, H.noOverflow));
              }
              var T = "",
                O = 0;
              function j(t) {
                k.defaults.preventBodyShift &&
                  document.documentElement.scrollHeight >
                    document.documentElement.clientHeight &&
                  (t
                    ? ((O = i),
                      (T = e.getComputedStyle(document.body).top),
                      o(document.body, H.fixed),
                      (document.body.style.top = -i + "px"))
                    : ((i = O),
                      (document.body.style.top = T),
                      a(document.body, H.fixed),
                      z()));
              }
              function M(e, t, n) {
                "string" == typeof n && a(e.elements.root, H.prefix + n),
                  o(e.elements.root, H.prefix + t),
                  (_ = e.elements.root.offsetWidth);
              }
              function N(e, t) {
                for (var n = s.indexOf(t) + 1; n < s.length; n += 1)
                  if (s[n].isModal()) return;
                return (
                  document.body.lastChild !== t.elements.root &&
                    (document.body.appendChild(t.elements.root),
                    s.splice(s.indexOf(t), 1),
                    s.push(t),
                    Q(t)),
                  !1
                );
              }
              function L(e, t, n, i) {
                switch (t) {
                  case "title":
                    e.setHeader(i);
                    break;
                  case "modal":
                    (g = e).get("modal")
                      ? (a(g.elements.root, H.modeless),
                        g.isOpen() && (ze(g), U(g), E()))
                      : (o(g.elements.root, H.modeless),
                        g.isOpen() && (Ce(g), U(g), E()));
                    break;
                  case "basic":
                    (b = e).get("basic")
                      ? o(b.elements.root, H.basic)
                      : a(b.elements.root, H.basic);
                    break;
                  case "frameless":
                    (v = e).get("frameless")
                      ? o(v.elements.root, H.frameless)
                      : a(v.elements.root, H.frameless);
                    break;
                  case "pinned":
                    (p = e).get("pinned")
                      ? (a(p.elements.root, H.unpinned), p.isOpen() && D(p))
                      : (o(p.elements.root, H.unpinned),
                        p.isOpen() && !p.isModal() && R(p));
                    break;
                  case "closable":
                    (d = e).get("closable")
                      ? (o(d.elements.root, H.closable),
                        f(
                          (m = d).elements.modal,
                          "click",
                          m.__internal.modalClickHandler,
                        ))
                      : (a(d.elements.root, H.closable),
                        h(
                          (u = d).elements.modal,
                          "click",
                          u.__internal.modalClickHandler,
                        ));
                    break;
                  case "maximizable":
                    (c = e).get("maximizable")
                      ? o(c.elements.root, H.maximizable)
                      : a(c.elements.root, H.maximizable);
                    break;
                  case "pinnable":
                    (r = e).get("pinnable")
                      ? o(r.elements.root, H.pinnable)
                      : a(r.elements.root, H.pinnable);
                    break;
                  case "movable":
                    (l = e).get("movable")
                      ? (o(l.elements.root, H.movable), l.isOpen() && Ee(l))
                      : (he(l),
                        a(l.elements.root, H.movable),
                        l.isOpen() && Te(l));
                    break;
                  case "resizable":
                    (s = e).get("resizable")
                      ? (o(s.elements.root, H.resizable), s.isOpen() && Oe(s))
                      : (we(s),
                        a(s.elements.root, H.resizable),
                        s.isOpen() && je(s));
                    break;
                  case "transition":
                    M(e, i, n);
                    break;
                  case "padding":
                    i
                      ? a(e.elements.root, H.noPadding)
                      : e.elements.root.className.indexOf(H.noPadding) < 0 &&
                        o(e.elements.root, H.noPadding);
                    break;
                  case "overflow":
                    i
                      ? a(e.elements.root, H.noOverflow)
                      : e.elements.root.className.indexOf(H.noOverflow) < 0 &&
                        o(e.elements.root, H.noOverflow);
                    break;
                  case "transition":
                    M(e, i, n);
                }
                var s, l, r, c, d, u, m, p, v, b, g;
                "function" == typeof e.hooks.onupdate &&
                  e.hooks.onupdate.call(e, t, n, i);
              }
              function I(e, t, n, i, s) {
                var o,
                  a = { op: void 0, items: [] };
                if (void 0 === s && "string" == typeof i)
                  (a.op = "get"),
                    t.hasOwnProperty(i)
                      ? ((a.found = !0), (a.value = t[i]))
                      : ((a.found = !1), (a.value = void 0));
                else if (((a.op = "set"), "object" == typeof i)) {
                  var l = i;
                  for (var r in l)
                    t.hasOwnProperty(r)
                      ? (t[r] !== l[r] &&
                          ((o = t[r]), (t[r] = l[r]), n.call(e, r, o, l[r])),
                        a.items.push({ key: r, value: l[r], found: !0 }))
                      : a.items.push({ key: r, value: l[r], found: !1 });
                } else {
                  if ("string" != typeof i)
                    throw new Error("args must be a string or object");
                  t.hasOwnProperty(i)
                    ? (t[i] !== s &&
                        ((o = t[i]), (t[i] = s), n.call(e, i, o, s)),
                      a.items.push({ key: i, value: s, found: !0 }))
                    : a.items.push({ key: i, value: s, found: !1 });
                }
                return a;
              }
              function A(e) {
                var t;
                G(e, function (e) {
                  return (t = !0 === e.invokeOnClose);
                }),
                  !t && e.isOpen() && e.close();
              }
              function P(e, t) {
                switch (e.srcElement || e.target) {
                  case t.elements.commands.pin:
                    t.isPinned() ? W(t) : S(t);
                    break;
                  case t.elements.commands.maximize:
                    t.isMaximized() ? F(t) : B(t);
                    break;
                  case t.elements.commands.close:
                    A(t);
                }
                return !1;
              }
              function S(e) {
                e.set("pinned", !0);
              }
              function W(e) {
                e.set("pinned", !1);
              }
              function B(e) {
                g("onmaximize", e),
                  o(e.elements.root, H.maximized),
                  e.isOpen() && E(),
                  g("onmaximized", e);
              }
              function F(e) {
                g("onrestore", e),
                  a(e.elements.root, H.maximized),
                  e.isOpen() && E(),
                  g("onrestored", e);
              }
              function R(e) {
                var t = c();
                (e.elements.modal.style.marginTop = r() + "px"),
                  (e.elements.modal.style.marginLeft = t + "px"),
                  (e.elements.modal.style.marginRight = -t + "px");
              }
              function D(e) {
                var t = parseInt(e.elements.modal.style.marginTop, 10),
                  n = parseInt(e.elements.modal.style.marginLeft, 10);
                if (
                  ((e.elements.modal.style.marginTop = ""),
                  (e.elements.modal.style.marginLeft = ""),
                  (e.elements.modal.style.marginRight = ""),
                  e.isOpen())
                ) {
                  var i = 0,
                    s = 0;
                  "" !== e.elements.dialog.style.top &&
                    (i = parseInt(e.elements.dialog.style.top, 10)),
                    (e.elements.dialog.style.top = i + (t - r()) + "px"),
                    "" !== e.elements.dialog.style.left &&
                      (s = parseInt(e.elements.dialog.style.left, 10)),
                    (e.elements.dialog.style.left = s + (n - c()) + "px");
                }
              }
              function U(e) {
                e.get("modal") || e.get("pinned") ? D(e) : R(e);
              }
              var q = !1;
              function X(e, t) {
                var n = e.srcElement || e.target;
                return (
                  q ||
                    n !== t.elements.modal ||
                    !0 !== t.get("closableByDimmer") ||
                    A(t),
                  (q = !1),
                  !1
                );
              }
              var Y = !1;
              function G(e, t) {
                for (var n = 0; n < e.__internal.buttons.length; n += 1) {
                  var i = e.__internal.buttons[n];
                  if (!i.element.disabled && t(i)) {
                    var s = b(n, i);
                    "function" == typeof e.callback && e.callback.apply(e, [s]),
                      !1 === s.cancel && e.close();
                    break;
                  }
                }
              }
              function J(e, t) {
                var n = e.srcElement || e.target;
                G(t, function (e) {
                  return e.element === n && (Y = !0);
                });
              }
              function K(e) {
                if (!Y) {
                  var t = s[s.length - 1],
                    i = e.keyCode;
                  return 0 === t.__internal.buttons.length &&
                    i === n.ESC &&
                    !0 === t.get("closable")
                    ? (A(t), !1)
                    : y.indexOf(i) > -1
                    ? (G(t, function (e) {
                        return e.key === i;
                      }),
                      !1)
                    : void 0;
                }
                Y = !1;
              }
              function V(e) {
                var t = s[s.length - 1],
                  i = e.keyCode;
                if (i === n.LEFT || i === n.RIGHT) {
                  for (
                    var o = t.__internal.buttons, a = 0;
                    a < o.length;
                    a += 1
                  )
                    if (document.activeElement === o[a].element)
                      switch (i) {
                        case n.LEFT:
                          return void o[(a || o.length) - 1].element.focus();
                        case n.RIGHT:
                          return void o[(a + 1) % o.length].element.focus();
                      }
                } else if (i < n.F12 + 1 && i > n.F1 - 1 && y.indexOf(i) > -1)
                  return (
                    e.preventDefault(),
                    e.stopPropagation(),
                    G(t, function (e) {
                      return e.key === i;
                    }),
                    !1
                  );
              }
              function Q(e, t) {
                if (t) t.focus();
                else {
                  var n = e.__internal.focus,
                    i = n.element;
                  switch (typeof n.element) {
                    case "number":
                      e.__internal.buttons.length > n.element &&
                        (i =
                          !0 === e.get("basic")
                            ? e.elements.reset[0]
                            : e.__internal.buttons[n.element].element);
                      break;
                    case "string":
                      i = e.elements.body.querySelector(n.element);
                      break;
                    case "function":
                      i = n.element.call(e);
                  }
                  (void 0 !== i && null !== i) ||
                    0 !== e.__internal.buttons.length ||
                    (i = e.elements.reset[0]),
                    i &&
                      i.focus &&
                      (i.focus(), n.select && i.select && i.select());
                }
              }
              function Z(e, t) {
                if (!t)
                  for (var n = s.length - 1; n > -1; n -= 1)
                    if (s[n].isModal()) {
                      t = s[n];
                      break;
                    }
                if (t && t.isModal()) {
                  var i,
                    o = e.srcElement || e.target,
                    a =
                      o === t.elements.reset[1] ||
                      (0 === t.__internal.buttons.length &&
                        o === document.body);
                  a &&
                    (t.get("maximizable")
                      ? (i = t.elements.commands.maximize)
                      : t.get("closable") && (i = t.elements.commands.close)),
                    void 0 === i &&
                      ("number" == typeof t.__internal.focus.element
                        ? o === t.elements.reset[0]
                          ? (i =
                              t.elements.buttons.auxiliary.firstChild ||
                              t.elements.buttons.primary.firstChild)
                          : a && (i = t.elements.reset[0])
                        : o === t.elements.reset[0] &&
                          (i =
                            t.elements.buttons.primary.lastChild ||
                            t.elements.buttons.auxiliary.lastChild)),
                    Q(t, i);
                }
              }
              function $(e, t) {
                clearTimeout(t.__internal.timerIn),
                  Q(t),
                  z(),
                  (Y = !1),
                  g("onfocus", t),
                  h(
                    t.elements.dialog,
                    p.type,
                    t.__internal.transitionInHandler,
                  ),
                  a(t.elements.root, H.animationIn);
              }
              function ee(e, t) {
                clearTimeout(t.__internal.timerOut),
                  h(
                    t.elements.dialog,
                    p.type,
                    t.__internal.transitionOutHandler,
                  ),
                  he(t),
                  we(t),
                  t.isMaximized() && !t.get("startMaximized") && F(t),
                  k.defaults.maintainFocus &&
                    t.__internal.activeElement &&
                    (t.__internal.activeElement.focus(),
                    (t.__internal.activeElement = null)),
                  "function" == typeof t.__internal.destroy &&
                    t.__internal.destroy.apply(t);
              }
              var te = null,
                ne = 0,
                ie = 0,
                se = "pageX",
                oe = "pageY",
                ae = null,
                le = !1,
                re = null;
              function ce(e, t) {
                var n = e[se] - ne,
                  i = e[oe] - ie;
                le && (i -= document.body.scrollTop),
                  (t.style.left = n + "px"),
                  (t.style.top = i + "px");
              }
              function de(e, t) {
                var n = e[se] - ne,
                  i = e[oe] - ie;
                le && (i -= document.body.scrollTop),
                  (t.style.left =
                    Math.min(ae.maxLeft, Math.max(ae.minLeft, n)) + "px"),
                  (t.style.top = le
                    ? Math.min(ae.maxTop, Math.max(ae.minTop, i)) + "px"
                    : Math.max(ae.minTop, i) + "px");
              }
              function ue(e, t) {
                if (null === pe && !t.isMaximized() && t.get("movable")) {
                  var n,
                    i = 0,
                    s = 0;
                  if (
                    ("touchstart" === e.type
                      ? (e.preventDefault(),
                        (n = e.targetTouches[0]),
                        (se = "clientX"),
                        (oe = "clientY"))
                      : 0 === e.button && (n = e),
                    n)
                  ) {
                    var a = t.elements.dialog;
                    if (
                      (o(a, H.capture),
                      a.style.left && (i = parseInt(a.style.left, 10)),
                      a.style.top && (s = parseInt(a.style.top, 10)),
                      (ne = n[se] - i),
                      (ie = n[oe] - s),
                      t.isModal()
                        ? (ie += t.elements.modal.scrollTop)
                        : t.isPinned() && (ie -= document.body.scrollTop),
                      t.get("moveBounded"))
                    ) {
                      var l = a,
                        r = -i,
                        c = -s;
                      do {
                        (r += l.offsetLeft), (c += l.offsetTop);
                      } while ((l = l.offsetParent));
                      (ae = {
                        maxLeft: r,
                        minLeft: -r,
                        maxTop:
                          document.documentElement.clientHeight -
                          a.clientHeight -
                          c,
                        minTop: -c,
                      }),
                        (re = de);
                    } else (ae = null), (re = ce);
                    return (
                      g("onmove", t),
                      (le = !t.isModal() && t.isPinned()),
                      (te = t),
                      re(n, a),
                      o(document.body, H.noSelection),
                      !1
                    );
                  }
                }
              }
              function me(e) {
                var t;
                te &&
                  ("touchmove" === e.type
                    ? (e.preventDefault(), (t = e.targetTouches[0]))
                    : 0 === e.button && (t = e),
                  t && re(t, te.elements.dialog));
              }
              function fe() {
                if (te) {
                  var e = te;
                  (te = ae = null),
                    a(document.body, H.noSelection),
                    a(e.elements.dialog, H.capture),
                    g("onmoved", e);
                }
              }
              function he(e) {
                te = null;
                var t = e.elements.dialog;
                t.style.left = t.style.top = "";
              }
              var pe = null,
                ve = Number.Nan,
                be = 0,
                ge = 0,
                ye = 0;
              function _e(e, t) {
                var n;
                if (
                  !t.isMaximized() &&
                  ("touchstart" === e.type
                    ? (e.preventDefault(), (n = e.targetTouches[0]))
                    : 0 === e.button && (n = e),
                  n)
                ) {
                  g("onresize", t),
                    (pe = t),
                    (ye = t.elements.resizeHandle.offsetHeight / 2);
                  var i = t.elements.dialog;
                  return (
                    o(i, H.capture),
                    (ve = parseInt(i.style.left, 10)),
                    (i.style.height = i.offsetHeight + "px"),
                    (i.style.minHeight =
                      t.elements.header.offsetHeight +
                      t.elements.footer.offsetHeight +
                      "px"),
                    (i.style.width = (be = i.offsetWidth) + "px"),
                    "none" !== i.style.maxWidth &&
                      (i.style.minWidth = (ge = i.offsetWidth) + "px"),
                    (i.style.maxWidth = "none"),
                    o(document.body, H.noSelection),
                    !1
                  );
                }
              }
              function ke(e) {
                var t;
                pe &&
                  ("touchmove" === e.type
                    ? (e.preventDefault(), (t = e.targetTouches[0]))
                    : 0 === e.button && (t = e),
                  t &&
                    (function (e, t, n) {
                      var i,
                        s,
                        o = t,
                        a = 0,
                        r = 0;
                      do {
                        (a += o.offsetLeft), (r += o.offsetTop);
                      } while ((o = o.offsetParent));
                      !0 === n
                        ? ((i = e.pageX), (s = e.pageY))
                        : ((i = e.clientX), (s = e.clientY));
                      var c = l();
                      if (
                        (c &&
                          ((i = document.body.offsetWidth - i),
                          isNaN(ve) ||
                            (a =
                              document.body.offsetWidth - a - t.offsetWidth)),
                        (t.style.height = s - r + ye + "px"),
                        (t.style.width = i - a + ye + "px"),
                        !isNaN(ve))
                      ) {
                        var d = 0.5 * Math.abs(t.offsetWidth - be);
                        c && (d *= -1),
                          t.offsetWidth > be
                            ? (t.style.left = ve + d + "px")
                            : t.offsetWidth >= ge &&
                              (t.style.left = ve - d + "px");
                      }
                    })(
                      t,
                      pe.elements.dialog,
                      !pe.get("modal") && !pe.get("pinned"),
                    ));
              }
              function xe() {
                if (pe) {
                  var e = pe;
                  (pe = null),
                    a(document.body, H.noSelection),
                    a(e.elements.dialog, H.capture),
                    (q = !0),
                    g("onresized", e);
                }
              }
              function we(e) {
                pe = null;
                var t = e.elements.dialog;
                "none" === t.style.maxWidth &&
                  ((t.style.maxWidth =
                    t.style.minWidth =
                    t.style.width =
                    t.style.height =
                    t.style.minHeight =
                    t.style.left =
                      ""),
                  (ve = Number.Nan),
                  (be = ge = ye = 0));
              }
              function He() {
                for (var e = 0; e < s.length; e += 1) {
                  var t = s[e];
                  t.get("autoReset") && (he(t), we(t));
                }
              }
              function Ce(e) {
                f(
                  e.elements.dialog,
                  "focus",
                  e.__internal.bringToFrontHandler,
                  !0,
                );
              }
              function ze(e) {
                h(
                  e.elements.dialog,
                  "focus",
                  e.__internal.bringToFrontHandler,
                  !0,
                );
              }
              function Ee(e) {
                f(
                  e.elements.header,
                  "mousedown",
                  e.__internal.beginMoveHandler,
                ),
                  f(
                    e.elements.header,
                    "touchstart",
                    e.__internal.beginMoveHandler,
                  );
              }
              function Te(e) {
                h(
                  e.elements.header,
                  "mousedown",
                  e.__internal.beginMoveHandler,
                ),
                  h(
                    e.elements.header,
                    "touchstart",
                    e.__internal.beginMoveHandler,
                  );
              }
              function Oe(e) {
                f(
                  e.elements.resizeHandle,
                  "mousedown",
                  e.__internal.beginResizeHandler,
                ),
                  f(
                    e.elements.resizeHandle,
                    "touchstart",
                    e.__internal.beginResizeHandler,
                  );
              }
              function je(e) {
                h(
                  e.elements.resizeHandle,
                  "mousedown",
                  e.__internal.beginResizeHandler,
                ),
                  h(
                    e.elements.resizeHandle,
                    "touchstart",
                    e.__internal.beginResizeHandler,
                  );
              }
              return {
                __init: C,
                isOpen: function () {
                  return this.__internal.isOpen;
                },
                isModal: function () {
                  return this.elements.root.className.indexOf(H.modeless) < 0;
                },
                isMaximized: function () {
                  return this.elements.root.className.indexOf(H.maximized) > -1;
                },
                isPinned: function () {
                  return this.elements.root.className.indexOf(H.unpinned) < 0;
                },
                maximize: function () {
                  return this.isMaximized() || B(this), this;
                },
                restore: function () {
                  return this.isMaximized() && F(this), this;
                },
                pin: function () {
                  return this.isPinned() || S(this), this;
                },
                unpin: function () {
                  return this.isPinned() && W(this), this;
                },
                bringToFront: function () {
                  return N(0, this), this;
                },
                moveTo: function (e, t) {
                  if (!isNaN(e) && !isNaN(t)) {
                    g("onmove", this);
                    var n = this.elements.dialog,
                      i = n,
                      s = 0,
                      o = 0;
                    n.style.left && (s -= parseInt(n.style.left, 10)),
                      n.style.top && (o -= parseInt(n.style.top, 10));
                    do {
                      (s += i.offsetLeft), (o += i.offsetTop);
                    } while ((i = i.offsetParent));
                    var a = e - s,
                      r = t - o;
                    l() && (a *= -1),
                      (n.style.left = a + "px"),
                      (n.style.top = r + "px"),
                      g("onmoved", this);
                  }
                  return this;
                },
                resizeTo: function (e, t) {
                  var n = parseFloat(e),
                    i = parseFloat(t),
                    s = /(\d*\.\d+|\d+)%/;
                  if (!isNaN(n) && !isNaN(i) && !0 === this.get("resizable")) {
                    g("onresize", this),
                      ("" + e).match(s) &&
                        (n = (n / 100) * document.documentElement.clientWidth),
                      ("" + t).match(s) &&
                        (i = (i / 100) * document.documentElement.clientHeight);
                    var o = this.elements.dialog;
                    "none" !== o.style.maxWidth &&
                      (o.style.minWidth = (ge = o.offsetWidth) + "px"),
                      (o.style.maxWidth = "none"),
                      (o.style.minHeight =
                        this.elements.header.offsetHeight +
                        this.elements.footer.offsetHeight +
                        "px"),
                      (o.style.width = n + "px"),
                      (o.style.height = i + "px"),
                      g("onresized", this);
                  }
                  return this;
                },
                setting: function (e, t) {
                  var n = this,
                    i = I(
                      this,
                      this.__internal.options,
                      function (e, t, i) {
                        L(n, e, t, i);
                      },
                      e,
                      t,
                    );
                  if ("get" === i.op)
                    return i.found
                      ? i.value
                      : void 0 !== this.settings
                      ? I(
                          this,
                          this.settings,
                          this.settingUpdated || function () {},
                          e,
                          t,
                        ).value
                      : void 0;
                  if ("set" === i.op) {
                    if (i.items.length > 0)
                      for (
                        var s = this.settingUpdated || function () {}, o = 0;
                        o < i.items.length;
                        o += 1
                      ) {
                        var a = i.items[o];
                        a.found ||
                          void 0 === this.settings ||
                          I(this, this.settings, s, a.key, a.value);
                      }
                    return this;
                  }
                },
                set: function (e, t) {
                  return this.setting(e, t), this;
                },
                get: function (e) {
                  return this.setting(e);
                },
                setHeader: function (t) {
                  return (
                    "string" == typeof t
                      ? (d(this.elements.header),
                        (this.elements.header.innerHTML = t))
                      : t instanceof e.HTMLElement &&
                        this.elements.header.firstChild !== t &&
                        (d(this.elements.header),
                        this.elements.header.appendChild(t)),
                    this
                  );
                },
                setContent: function (t) {
                  return (
                    "string" == typeof t
                      ? (d(this.elements.content),
                        (this.elements.content.innerHTML = t))
                      : t instanceof e.HTMLElement &&
                        this.elements.content.firstChild !== t &&
                        (d(this.elements.content),
                        this.elements.content.appendChild(t)),
                    this
                  );
                },
                showModal: function (e) {
                  return this.show(!0, e);
                },
                show: function (n, l) {
                  if ((C(this), this.__internal.isOpen)) {
                    he(this), we(this), o(this.elements.dialog, H.shake);
                    var d = this;
                    setTimeout(function () {
                      a(d.elements.dialog, H.shake);
                    }, 200);
                  } else {
                    if (
                      ((this.__internal.isOpen = !0),
                      s.push(this),
                      k.defaults.maintainFocus &&
                        (this.__internal.activeElement =
                          document.activeElement),
                      "function" == typeof this.prepare && this.prepare(),
                      (m = this),
                      1 === s.length &&
                        (f(e, "resize", He),
                        f(document.body, "keyup", K),
                        f(document.body, "keydown", V),
                        f(document.body, "focus", Z),
                        f(document.documentElement, "mousemove", me),
                        f(document.documentElement, "touchmove", me),
                        f(document.documentElement, "mouseup", fe),
                        f(document.documentElement, "touchend", fe),
                        f(document.documentElement, "mousemove", ke),
                        f(document.documentElement, "touchmove", ke),
                        f(document.documentElement, "mouseup", xe),
                        f(document.documentElement, "touchend", xe)),
                      f(
                        m.elements.commands.container,
                        "click",
                        m.__internal.commandsClickHandler,
                      ),
                      f(
                        m.elements.footer,
                        "click",
                        m.__internal.buttonsClickHandler,
                      ),
                      f(
                        m.elements.reset[0],
                        "focus",
                        m.__internal.resetHandler,
                      ),
                      f(
                        m.elements.reset[1],
                        "focus",
                        m.__internal.resetHandler,
                      ),
                      (Y = !0),
                      f(
                        m.elements.dialog,
                        p.type,
                        m.__internal.transitionInHandler,
                      ),
                      m.get("modal") || Ce(m),
                      m.get("resizable") && Oe(m),
                      m.get("movable") && Ee(m),
                      void 0 !== n && this.set("modal", n),
                      (t = c()),
                      (i = r()),
                      E(),
                      "string" == typeof l &&
                        "" !== l &&
                        ((this.__internal.className = l),
                        o(this.elements.root, l)),
                      this.get("startMaximized")
                        ? this.maximize()
                        : this.isMaximized() && F(this),
                      U(this),
                      a(this.elements.root, H.animationOut),
                      o(this.elements.root, H.animationIn),
                      clearTimeout(this.__internal.timerIn),
                      (this.__internal.timerIn = setTimeout(
                        this.__internal.transitionInHandler,
                        p.supported ? 1e3 : 100,
                      )),
                      x)
                    ) {
                      var u = this.elements.root;
                      (u.style.display = "none"),
                        setTimeout(function () {
                          u.style.display = "block";
                        }, 0);
                    }
                    (_ = this.elements.root.offsetWidth),
                      a(this.elements.root, H.hidden),
                      "function" == typeof this.hooks.onshow &&
                        this.hooks.onshow.call(this),
                      g("onshow", this);
                  }
                  var m;
                  return this;
                },
                close: function () {
                  var t;
                  return (
                    this.__internal.isOpen &&
                      !1 !== g("onclosing", this) &&
                      ((t = this),
                      1 === s.length &&
                        (h(e, "resize", He),
                        h(document.body, "keyup", K),
                        h(document.body, "keydown", V),
                        h(document.body, "focus", Z),
                        h(document.documentElement, "mousemove", me),
                        h(document.documentElement, "mouseup", fe),
                        h(document.documentElement, "mousemove", ke),
                        h(document.documentElement, "mouseup", xe)),
                      h(
                        t.elements.commands.container,
                        "click",
                        t.__internal.commandsClickHandler,
                      ),
                      h(
                        t.elements.footer,
                        "click",
                        t.__internal.buttonsClickHandler,
                      ),
                      h(
                        t.elements.reset[0],
                        "focus",
                        t.__internal.resetHandler,
                      ),
                      h(
                        t.elements.reset[1],
                        "focus",
                        t.__internal.resetHandler,
                      ),
                      f(
                        t.elements.dialog,
                        p.type,
                        t.__internal.transitionOutHandler,
                      ),
                      t.get("modal") || ze(t),
                      t.get("movable") && Te(t),
                      t.get("resizable") && je(t),
                      a(this.elements.root, H.animationIn),
                      o(this.elements.root, H.animationOut),
                      clearTimeout(this.__internal.timerOut),
                      (this.__internal.timerOut = setTimeout(
                        this.__internal.transitionOutHandler,
                        p.supported ? 1e3 : 100,
                      )),
                      o(this.elements.root, H.hidden),
                      (_ = this.elements.modal.offsetWidth),
                      void 0 !== this.__internal.className &&
                        "" !== this.__internal.className &&
                        a(this.elements.root, this.__internal.className),
                      "function" == typeof this.hooks.onclose &&
                        this.hooks.onclose.call(this),
                      g("onclose", this),
                      s.splice(s.indexOf(this), 1),
                      (this.__internal.isOpen = !1),
                      E()),
                    this
                  );
                },
                closeOthers: function () {
                  return k.closeAll(this), this;
                },
                destroy: function () {
                  return (
                    this.__internal.isOpen
                      ? ((this.__internal.destroy = function () {
                          m(this, C);
                        }),
                        this.close())
                      : m(this, C),
                    this
                  );
                },
              };
            })(),
            _ = (function () {
              var t,
                n = [],
                i = {
                  base: "alertify-notifier",
                  message: "ajs-message",
                  top: "ajs-top",
                  right: "ajs-right",
                  bottom: "ajs-bottom",
                  left: "ajs-left",
                  center: "ajs-center",
                  visible: "ajs-visible",
                  hidden: "ajs-hidden",
                  close: "ajs-close",
                };
              function s(e) {
                e.__internal ||
                  ((e.__internal = {
                    position: k.defaults.notifier.position,
                    delay: k.defaults.notifier.delay,
                  }),
                  (t = document.createElement("DIV")),
                  l(e)),
                  t.parentNode !== document.body &&
                    document.body.appendChild(t);
              }
              function l(e) {
                switch (((t.className = i.base), e.__internal.position)) {
                  case "top-right":
                    o(t, i.top + " " + i.right);
                    break;
                  case "top-left":
                    o(t, i.top + " " + i.left);
                    break;
                  case "top-center":
                    o(t, i.top + " " + i.center);
                    break;
                  case "bottom-left":
                    o(t, i.bottom + " " + i.left);
                    break;
                  case "bottom-center":
                    o(t, i.bottom + " " + i.center);
                    break;
                  default:
                  case "bottom-right":
                    o(t, i.bottom + " " + i.right);
                }
              }
              function r(s, l) {
                function r(e, t) {
                  (t.__internal.closeButton &&
                    "true" !== e.target.getAttribute("data-close")) ||
                    t.dismiss(!0);
                }
                function c(e, n) {
                  h(n.element, p.type, c), t.removeChild(n.element);
                }
                function u(e) {
                  clearTimeout(e.__internal.timer),
                    clearTimeout(e.__internal.transitionTimeout);
                }
                return (
                  (m = {
                    element: s,
                    push: function (e, s) {
                      if (!this.__internal.pushed) {
                        var a, l;
                        switch (
                          (((r = this).__internal.pushed = !0),
                          n.push(r),
                          u(this),
                          arguments.length)
                        ) {
                          case 0:
                            l = this.__internal.delay;
                            break;
                          case 1:
                            "number" == typeof e
                              ? (l = e)
                              : ((a = e), (l = this.__internal.delay));
                            break;
                          case 2:
                            (a = e), (l = s);
                        }
                        return (
                          (this.__internal.closeButton =
                            k.defaults.notifier.closeButton),
                          void 0 !== a && this.setContent(a),
                          _.__internal.position.indexOf("top") < 0
                            ? t.appendChild(this.element)
                            : t.insertBefore(this.element, t.firstChild),
                          this.element.offsetWidth,
                          o(this.element, i.visible),
                          f(
                            this.element,
                            "click",
                            this.__internal.clickHandler,
                          ),
                          this.delay(l)
                        );
                      }
                      var r;
                      return this;
                    },
                    ondismiss: function () {},
                    callback: l,
                    dismiss: function (e) {
                      var s;
                      return (
                        this.__internal.pushed &&
                          (u(this),
                          ("function" == typeof this.ondismiss &&
                            !1 === this.ondismiss.call(this)) ||
                            (h(
                              this.element,
                              "click",
                              this.__internal.clickHandler,
                            ),
                            void 0 !== this.element &&
                              this.element.parentNode === t &&
                              ((this.__internal.transitionTimeout = setTimeout(
                                this.__internal.transitionEndHandler,
                                p.supported ? 1e3 : 100,
                              )),
                              a(this.element, i.visible),
                              "function" == typeof this.callback &&
                                this.callback.call(this, e)),
                            (s = this),
                            n.splice(n.indexOf(s), 1),
                            (s.__internal.pushed = !1))),
                        this
                      );
                    },
                    delay: function (e) {
                      if (
                        (u(this),
                        (this.__internal.delay =
                          void 0 === e || isNaN(+e) ? _.__internal.delay : +e),
                        this.__internal.delay > 0)
                      ) {
                        var t = this;
                        this.__internal.timer = setTimeout(function () {
                          t.dismiss();
                        }, 1e3 * this.__internal.delay);
                      }
                      return this;
                    },
                    setContent: function (t) {
                      if (
                        ("string" == typeof t
                          ? (d(this.element), (this.element.innerHTML = t))
                          : t instanceof e.HTMLElement &&
                            this.element.firstChild !== t &&
                            (d(this.element), this.element.appendChild(t)),
                        this.__internal.closeButton)
                      ) {
                        var n = document.createElement("span");
                        o(n, i.close),
                          n.setAttribute("data-close", !0),
                          this.element.appendChild(n);
                      }
                      return this;
                    },
                    dismissOthers: function () {
                      return _.dismissAll(this), this;
                    },
                  }).__internal ||
                    ((m.__internal = {
                      pushed: !1,
                      delay: void 0,
                      timer: void 0,
                      clickHandler: void 0,
                      transitionEndHandler: void 0,
                      transitionTimeout: void 0,
                    }),
                    (m.__internal.clickHandler = v(m, r)),
                    (m.__internal.transitionEndHandler = v(m, c))),
                  m
                );
                var m;
              }
              return {
                setting: function (e, t) {
                  if ((s(this), void 0 === t)) return this.__internal[e];
                  switch (e) {
                    case "position":
                      (this.__internal.position = t), l(this);
                      break;
                    case "delay":
                      this.__internal.delay = t;
                  }
                  return this;
                },
                set: function (e, t) {
                  return this.setting(e, t), this;
                },
                get: function (e) {
                  return this.setting(e);
                },
                create: function (e, t) {
                  s(this);
                  var n = document.createElement("div");
                  return (
                    (n.className =
                      i.message +
                      ("string" == typeof e && "" !== e ? " ajs-" + e : "")),
                    r(n, t)
                  );
                },
                dismissAll: function (e) {
                  for (var t = n.slice(0), i = 0; i < t.length; i += 1) {
                    var s = t[i];
                    (void 0 !== e && e === s) || s.dismiss();
                  }
                },
              };
            })();
          var k = new (function () {
            var e = {};
            function t(e, t) {
              for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
              return e;
            }
            function n(t) {
              var n = e[t].dialog;
              return n && "function" == typeof n.__init && n.__init(n), n;
            }
            return {
              defaults: i,
              dialog: function (i, s, o, a) {
                if ("function" != typeof s) return n(i);
                if (this.hasOwnProperty(i))
                  throw new Error("alertify.dialog: name already exists");
                var l,
                  r,
                  c,
                  d,
                  u,
                  m =
                    ((l = i),
                    (c = o),
                    (u = { dialog: null, factory: (r = s) }),
                    void 0 !== (d = a) &&
                      (u.factory = function () {
                        return t(new e[d].factory(), new r());
                      }),
                    c || (u.dialog = t(new u.factory(), y)),
                    (e[l] = u));
                this[i] = o
                  ? function () {
                      if (0 === arguments.length) return m.dialog;
                      var e = t(new m.factory(), y);
                      return (
                        e && "function" == typeof e.__init && e.__init(e),
                        e.main.apply(e, arguments),
                        e.show.apply(e)
                      );
                    }
                  : function () {
                      if (
                        (m.dialog &&
                          "function" == typeof m.dialog.__init &&
                          m.dialog.__init(m.dialog),
                        0 === arguments.length)
                      )
                        return m.dialog;
                      var e = m.dialog;
                      return (
                        e.main.apply(m.dialog, arguments),
                        e.show.apply(m.dialog)
                      );
                    };
              },
              closeAll: function (e) {
                for (var t = s.slice(0), n = 0; n < t.length; n += 1) {
                  var i = t[n];
                  (void 0 !== e && e === i) || i.close();
                }
              },
              setting: function (e, t, i) {
                if ("notifier" === e) return _.setting(t, i);
                var s = n(e);
                return s ? s.setting(t, i) : void 0;
              },
              set: function (e, t, n) {
                return this.setting(e, t, n);
              },
              get: function (e, t) {
                return this.setting(e, t);
              },
              notify: function (e, t, n, i) {
                return _.create(t, i).push(e, n);
              },
              message: function (e, t, n) {
                return _.create(null, n).push(e, t);
              },
              success: function (e, t, n) {
                return _.create("success", n).push(e, t);
              },
              error: function (e, t, n) {
                return _.create("error", n).push(e, t);
              },
              warning: function (e, t, n) {
                return _.create("warning", n).push(e, t);
              },
              dismissAll: function () {
                _.dismissAll();
              },
            };
          })();
          k.dialog("alert", function () {
            return {
              main: function (e, t, n) {
                var i, s, o;
                switch (arguments.length) {
                  case 1:
                    s = e;
                    break;
                  case 2:
                    "function" == typeof t
                      ? ((s = e), (o = t))
                      : ((i = e), (s = t));
                    break;
                  case 3:
                    (i = e), (s = t), (o = n);
                }
                return (
                  this.set("title", i),
                  this.set("message", s),
                  this.set("onok", o),
                  this
                );
              },
              setup: function () {
                return {
                  buttons: [
                    {
                      text: k.defaults.glossary.ok,
                      key: n.ESC,
                      invokeOnClose: !0,
                      className: k.defaults.theme.ok,
                    },
                  ],
                  focus: { element: 0, select: !1 },
                  options: { maximizable: !1, resizable: !1 },
                };
              },
              build: function () {},
              prepare: function () {},
              setMessage: function (e) {
                this.setContent(e);
              },
              settings: { message: void 0, onok: void 0, label: void 0 },
              settingUpdated: function (e, t, n) {
                switch (e) {
                  case "message":
                    this.setMessage(n);
                    break;
                  case "label":
                    this.__internal.buttons[0].element &&
                      (this.__internal.buttons[0].element.innerHTML = n);
                }
              },
              callback: function (e) {
                if ("function" == typeof this.get("onok")) {
                  var t = this.get("onok").call(this, e);
                  void 0 !== t && (e.cancel = !t);
                }
              },
            };
          }),
            k.dialog("confirm", function () {
              var e = {
                timer: null,
                index: null,
                text: null,
                duration: null,
                task: function (n, i) {
                  if (i.isOpen()) {
                    if (
                      ((i.__internal.buttons[e.index].element.innerHTML =
                        e.text + " (&#8207;" + e.duration + "&#8207;) "),
                      (e.duration -= 1),
                      -1 === e.duration)
                    ) {
                      t(i);
                      var s = i.__internal.buttons[e.index],
                        o = b(e.index, s);
                      "function" == typeof i.callback &&
                        i.callback.apply(i, [o]),
                        !1 !== o.close && i.close();
                    }
                  } else t(i);
                },
              };
              function t(t) {
                null !== e.timer &&
                  (clearInterval(e.timer),
                  (e.timer = null),
                  (t.__internal.buttons[e.index].element.innerHTML = e.text));
              }
              function i(n, i, s) {
                t(n),
                  (e.duration = s),
                  (e.index = i),
                  (e.text = n.__internal.buttons[i].element.innerHTML),
                  (e.timer = setInterval(v(n, e.task), 1e3)),
                  e.task(null, n);
              }
              return {
                main: function (e, t, n, i) {
                  var s, o, a, l;
                  switch (arguments.length) {
                    case 1:
                      o = e;
                      break;
                    case 2:
                      (o = e), (a = t);
                      break;
                    case 3:
                      (o = e), (a = t), (l = n);
                      break;
                    case 4:
                      (s = e), (o = t), (a = n), (l = i);
                  }
                  return (
                    this.set("title", s),
                    this.set("message", o),
                    this.set("onok", a),
                    this.set("oncancel", l),
                    this
                  );
                },
                setup: function () {
                  return {
                    buttons: [
                      {
                        text: k.defaults.glossary.ok,
                        key: n.ENTER,
                        className: k.defaults.theme.ok,
                      },
                      {
                        text: k.defaults.glossary.cancel,
                        key: n.ESC,
                        invokeOnClose: !0,
                        className: k.defaults.theme.cancel,
                      },
                    ],
                    focus: { element: 0, select: !1 },
                    options: { maximizable: !1, resizable: !1 },
                  };
                },
                build: function () {},
                prepare: function () {},
                setMessage: function (e) {
                  this.setContent(e);
                },
                settings: {
                  message: null,
                  labels: null,
                  onok: null,
                  oncancel: null,
                  defaultFocus: null,
                  reverseButtons: null,
                },
                settingUpdated: function (e, t, n) {
                  switch (e) {
                    case "message":
                      this.setMessage(n);
                      break;
                    case "labels":
                      "ok" in n &&
                        this.__internal.buttons[0].element &&
                        ((this.__internal.buttons[0].text = n.ok),
                        (this.__internal.buttons[0].element.innerHTML = n.ok)),
                        "cancel" in n &&
                          this.__internal.buttons[1].element &&
                          ((this.__internal.buttons[1].text = n.cancel),
                          (this.__internal.buttons[1].element.innerHTML =
                            n.cancel));
                      break;
                    case "reverseButtons":
                      !0 === n
                        ? this.elements.buttons.primary.appendChild(
                            this.__internal.buttons[0].element,
                          )
                        : this.elements.buttons.primary.appendChild(
                            this.__internal.buttons[1].element,
                          );
                      break;
                    case "defaultFocus":
                      this.__internal.focus.element = "ok" === n ? 0 : 1;
                  }
                },
                callback: function (e) {
                  var n;
                  switch ((t(this), e.index)) {
                    case 0:
                      "function" == typeof this.get("onok") &&
                        void 0 !== (n = this.get("onok").call(this, e)) &&
                        (e.cancel = !n);
                      break;
                    case 1:
                      "function" == typeof this.get("oncancel") &&
                        void 0 !== (n = this.get("oncancel").call(this, e)) &&
                        (e.cancel = !n);
                  }
                },
                autoOk: function (e) {
                  return i(this, 0, e), this;
                },
                autoCancel: function (e) {
                  return i(this, 1, e), this;
                },
              };
            }),
            k.dialog("prompt", function () {
              var t = document.createElement("INPUT"),
                i = document.createElement("P");
              return {
                main: function (e, t, n, i, s) {
                  var o, a, l, r, c;
                  switch (arguments.length) {
                    case 1:
                      a = e;
                      break;
                    case 2:
                      (a = e), (l = t);
                      break;
                    case 3:
                      (a = e), (l = t), (r = n);
                      break;
                    case 4:
                      (a = e), (l = t), (r = n), (c = i);
                      break;
                    case 5:
                      (o = e), (a = t), (l = n), (r = i), (c = s);
                  }
                  return (
                    this.set("title", o),
                    this.set("message", a),
                    this.set("value", l),
                    this.set("onok", r),
                    this.set("oncancel", c),
                    this
                  );
                },
                setup: function () {
                  return {
                    buttons: [
                      {
                        text: k.defaults.glossary.ok,
                        key: n.ENTER,
                        className: k.defaults.theme.ok,
                      },
                      {
                        text: k.defaults.glossary.cancel,
                        key: n.ESC,
                        invokeOnClose: !0,
                        className: k.defaults.theme.cancel,
                      },
                    ],
                    focus: { element: t, select: !0 },
                    options: { maximizable: !1, resizable: !1 },
                  };
                },
                build: function () {
                  (t.className = k.defaults.theme.input),
                    t.setAttribute("type", "text"),
                    (t.value = this.get("value")),
                    this.elements.content.appendChild(i),
                    this.elements.content.appendChild(t);
                },
                prepare: function () {},
                setMessage: function (t) {
                  "string" == typeof t
                    ? (d(i), (i.innerHTML = t))
                    : t instanceof e.HTMLElement &&
                      i.firstChild !== t &&
                      (d(i), i.appendChild(t));
                },
                settings: {
                  message: void 0,
                  labels: void 0,
                  onok: void 0,
                  oncancel: void 0,
                  value: "",
                  type: "text",
                  reverseButtons: void 0,
                },
                settingUpdated: function (e, n, i) {
                  switch (e) {
                    case "message":
                      this.setMessage(i);
                      break;
                    case "value":
                      t.value = i;
                      break;
                    case "type":
                      switch (i) {
                        case "text":
                        case "color":
                        case "date":
                        case "datetime-local":
                        case "email":
                        case "month":
                        case "number":
                        case "password":
                        case "search":
                        case "tel":
                        case "time":
                        case "week":
                          t.type = i;
                          break;
                        default:
                          t.type = "text";
                      }
                      break;
                    case "labels":
                      i.ok &&
                        this.__internal.buttons[0].element &&
                        (this.__internal.buttons[0].element.innerHTML = i.ok),
                        i.cancel &&
                          this.__internal.buttons[1].element &&
                          (this.__internal.buttons[1].element.innerHTML =
                            i.cancel);
                      break;
                    case "reverseButtons":
                      !0 === i
                        ? this.elements.buttons.primary.appendChild(
                            this.__internal.buttons[0].element,
                          )
                        : this.elements.buttons.primary.appendChild(
                            this.__internal.buttons[1].element,
                          );
                  }
                },
                callback: function (e) {
                  var n;
                  switch (e.index) {
                    case 0:
                      (this.settings.value = t.value),
                        "function" == typeof this.get("onok") &&
                          void 0 !==
                            (n = this.get("onok").call(
                              this,
                              e,
                              this.settings.value,
                            )) &&
                          (e.cancel = !n);
                      break;
                    case 1:
                      "function" == typeof this.get("oncancel") &&
                        void 0 !== (n = this.get("oncancel").call(this, e)) &&
                        (e.cancel = !n),
                        e.cancel || (t.value = this.settings.value);
                  }
                },
              };
            }),
            "object" == typeof t && "object" == typeof t.exports
              ? (t.exports = k)
              : "function" == typeof define && define.amd
              ? define([], function () {
                  return k;
                })
              : e.alertify || (e.alertify = k);
        })("undefined" != typeof window ? window : this);
      },
      {},
    ],
    2: [
      function (e, t, n) {
        "use strict";
        var i = e("./dialogs/Alert"),
          s = e("./dialogs/Confirm"),
          o = e("./overlays/Notification"),
          a = e("./overlays/Image");
        window.Alert = { Alert: i, Confirm: s, Notification: o, Image: a };
      },
      {
        "./dialogs/Alert": 3,
        "./dialogs/Confirm": 4,
        "./overlays/Image": 5,
        "./overlays/Notification": 6,
      },
    ],
    3: [
      function (e, t, n) {
        "use strict";
        var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var i = t[n];
              (i.enumerable = i.enumerable || !1),
                (i.configurable = !0),
                "value" in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i);
            }
          }
          return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t;
          };
        })();
        var s = e("alertifyjs"),
          o = (function () {
            function e(t) {
              var n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : null,
                i =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : null;
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
                n && i
                  ? ((this.title = t), (this.message = n), (this.callback = i))
                  : n
                  ? ((this.title = t),
                    (this.message = n),
                    (this.callback = function () {}))
                  : ((this.title = "Alert"),
                    (this.message = t),
                    (this.callback = function () {}));
            }
            return (
              i(
                e,
                [
                  {
                    key: "show",
                    value: function () {
                      s.alert(this.title, this.message, this.callback).set({
                        transition: "zoom",
                      });
                    },
                  },
                ],
                [
                  {
                    key: "spawn",
                    value: function (e) {
                      var t =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : null,
                        n =
                          arguments.length > 2 && void 0 !== arguments[2]
                            ? arguments[2]
                            : null;
                      t && n
                        ? s.alert(e, t, n).set({ transition: "zoom" })
                        : t
                        ? s.alert(e, t).set({ transition: "zoom" })
                        : s.alert("Alert", e).set({ transition: "zoom" });
                    },
                  },
                ],
              ),
              e
            );
          })();
        t.exports = o;
      },
      { alertifyjs: 1 },
    ],
    4: [
      function (e, t, n) {
        "use strict";
        var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var i = t[n];
              (i.enumerable = i.enumerable || !1),
                (i.configurable = !0),
                "value" in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i);
            }
          }
          return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t;
          };
        })();
        var s = e("alertifyjs"),
          o = (function () {
            function e(t, n, i) {
              var s =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : function () {};
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
                (this.title = t),
                (this.message = n),
                (this.okCallback = i),
                (this.cancelCallback = s);
            }
            return (
              i(
                e,
                [
                  {
                    key: "show",
                    value: function () {
                      s.confirm(
                        this.title,
                        this.message,
                        this.okCallback,
                        this.cancelCallback,
                      ).set({ transition: "zoom" });
                    },
                  },
                ],
                [
                  {
                    key: "spawn",
                    value: function (e, t, n) {
                      var i =
                        arguments.length > 3 && void 0 !== arguments[3]
                          ? arguments[3]
                          : function () {};
                      s.confirm(e, t, n, i).set({ transition: "zoom" });
                    },
                  },
                ],
              ),
              e
            );
          })();
        t.exports = o;
      },
      { alertifyjs: 1 },
    ],
    5: [
      function (e, t, n) {
        "use strict";
        var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var i = t[n];
              (i.enumerable = i.enumerable || !1),
                (i.configurable = !0),
                "value" in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i);
            }
          }
          return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t;
          };
        })();
        var s = (function () {
          function e(t) {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e),
              (this._src = t),
              (this._width = null);
          }
          return (
            i(e, [
              {
                key: "show",
                value: function () {
                  if (document.getElementById("image-overlay"))
                    throw "Image overlay already exists";
                  var e = document.createElement("div");
                  e.classList.add("img-overlay-container"),
                    e.setAttribute("id", "image-overlay");
                  var t = document.createElement("div");
                  t.classList.add("backdrop");
                  var n = document.createElement("img");
                  n.setAttribute("src", this._src),
                    n.classList.add("image-body");
                  var i = document.createElement("div");
                  i.classList.add("controls-bar");
                  var s = document.createElement("div");
                  (s.onclick = function (e) {
                    document.getElementById("image-overlay").outerHTML = "";
                  }),
                    (s.innerHTML = '<span class="typcn typcn-delete"></span>'),
                    s.classList.add("control-button");
                  var o = document.createElement("div");
                  (o.onclick = function (e) {
                    n.setAttribute("style", "width: " + 1.1 * n.width + "px;");
                  }),
                    (o.innerHTML =
                      '<span class="typcn typcn-zoom-in-outline"></span>'),
                    o.classList.add("control-button");
                  var a = document.createElement("div");
                  (a.onclick = function (e) {
                    n.setAttribute("style", "width: " + 0.9 * n.width + "px;");
                  }),
                    (a.innerHTML =
                      '<span class="typcn typcn-zoom-out-outline"></span>'),
                    a.classList.add("control-button"),
                    i.appendChild(o),
                    i.appendChild(a),
                    i.appendChild(s),
                    document.body.appendChild(e),
                    e.appendChild(t),
                    e.appendChild(n),
                    e.appendChild(i),
                    (this._width = n.width);
                },
              },
            ]),
            e
          );
        })();
        t.exports = s;
      },
      {},
    ],
    6: [
      function (e, t, n) {
        "use strict";
        var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var i = t[n];
              (i.enumerable = i.enumerable || !1),
                (i.configurable = !0),
                "value" in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i);
            }
          }
          return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t;
          };
        })();
        var s = e("alertifyjs"),
          o = (function () {
            function e(t) {
              var n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : "success",
                i =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 5,
                s =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : function () {};
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
                (this.message = t),
                (this.type = n),
                (this.delay = i),
                (this.callback = s);
            }
            return (
              i(
                e,
                [
                  {
                    key: "show",
                    value: function () {
                      s.notify(
                        this.message,
                        this.type,
                        this.delay,
                        this.callback,
                      );
                    },
                  },
                ],
                [
                  {
                    key: "spawn",
                    value: function (e) {
                      var t =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : "success",
                        n =
                          arguments.length > 2 && void 0 !== arguments[2]
                            ? arguments[2]
                            : 5,
                        i =
                          arguments.length > 3 && void 0 !== arguments[3]
                            ? arguments[3]
                            : function () {};
                      s.notify(e, t, n, i);
                    },
                  },
                ],
              ),
              e
            );
          })();
        t.exports = o;
      },
      { alertifyjs: 1 },
    ],
  },
  {},
  [2],
);
