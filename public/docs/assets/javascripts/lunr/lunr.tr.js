!(function (r, i) {
  "function" == typeof define && define.amd
    ? define(i)
    : "object" == typeof exports
    ? (module.exports = i())
    : i()(r.lunr);
})(this, function () {
  return function (r) {
    if (void 0 === r)
      throw new Error(
        "Lunr is not present. Please include / require Lunr before this script.",
      );
    if (void 0 === r.stemmerSupport)
      throw new Error(
        "Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.",
      );
    var i, e, n;
    (r.tr = function () {
      this.pipeline.reset(),
        this.pipeline.add(r.tr.trimmer, r.tr.stopWordFilter, r.tr.stemmer),
        this.searchPipeline &&
          (this.searchPipeline.reset(), this.searchPipeline.add(r.tr.stemmer));
    }),
      (r.tr.wordCharacters =
        "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞭꞰ-ꞷꟷ-ꟿꬰ-ꭚꭜ-ꭤﬀ-ﬆＡ-Ｚａ-ｚ"),
      (r.tr.trimmer = r.trimmerSupport.generateTrimmer(r.tr.wordCharacters)),
      r.Pipeline.registerFunction(r.tr.trimmer, "trimmer-tr"),
      (r.tr.stemmer =
        ((i = r.stemmerSupport.Among),
        (e = r.stemmerSupport.SnowballProgram),
        (n = new (function () {
          var r,
            n = [
              new i("m", -1, -1),
              new i("n", -1, -1),
              new i("miz", -1, -1),
              new i("niz", -1, -1),
              new i("muz", -1, -1),
              new i("nuz", -1, -1),
              new i("müz", -1, -1),
              new i("nüz", -1, -1),
              new i("mız", -1, -1),
              new i("nız", -1, -1),
            ],
            t = [new i("leri", -1, -1), new i("ları", -1, -1)],
            u = [
              new i("ni", -1, -1),
              new i("nu", -1, -1),
              new i("nü", -1, -1),
              new i("nı", -1, -1),
            ],
            o = [
              new i("in", -1, -1),
              new i("un", -1, -1),
              new i("ün", -1, -1),
              new i("ın", -1, -1),
            ],
            s = [new i("a", -1, -1), new i("e", -1, -1)],
            c = [new i("na", -1, -1), new i("ne", -1, -1)],
            l = [
              new i("da", -1, -1),
              new i("ta", -1, -1),
              new i("de", -1, -1),
              new i("te", -1, -1),
            ],
            a = [new i("nda", -1, -1), new i("nde", -1, -1)],
            m = [
              new i("dan", -1, -1),
              new i("tan", -1, -1),
              new i("den", -1, -1),
              new i("ten", -1, -1),
            ],
            d = [new i("ndan", -1, -1), new i("nden", -1, -1)],
            f = [new i("la", -1, -1), new i("le", -1, -1)],
            b = [new i("ca", -1, -1), new i("ce", -1, -1)],
            w = [
              new i("im", -1, -1),
              new i("um", -1, -1),
              new i("üm", -1, -1),
              new i("ım", -1, -1),
            ],
            _ = [
              new i("sin", -1, -1),
              new i("sun", -1, -1),
              new i("sün", -1, -1),
              new i("sın", -1, -1),
            ],
            k = [
              new i("iz", -1, -1),
              new i("uz", -1, -1),
              new i("üz", -1, -1),
              new i("ız", -1, -1),
            ],
            p = [
              new i("siniz", -1, -1),
              new i("sunuz", -1, -1),
              new i("sünüz", -1, -1),
              new i("sınız", -1, -1),
            ],
            g = [new i("lar", -1, -1), new i("ler", -1, -1)],
            y = [
              new i("niz", -1, -1),
              new i("nuz", -1, -1),
              new i("nüz", -1, -1),
              new i("nız", -1, -1),
            ],
            z = [
              new i("dir", -1, -1),
              new i("tir", -1, -1),
              new i("dur", -1, -1),
              new i("tur", -1, -1),
              new i("dür", -1, -1),
              new i("tür", -1, -1),
              new i("dır", -1, -1),
              new i("tır", -1, -1),
            ],
            h = [new i("casına", -1, -1), new i("cesine", -1, -1)],
            v = [
              new i("di", -1, -1),
              new i("ti", -1, -1),
              new i("dik", -1, -1),
              new i("tik", -1, -1),
              new i("duk", -1, -1),
              new i("tuk", -1, -1),
              new i("dük", -1, -1),
              new i("tük", -1, -1),
              new i("dık", -1, -1),
              new i("tık", -1, -1),
              new i("dim", -1, -1),
              new i("tim", -1, -1),
              new i("dum", -1, -1),
              new i("tum", -1, -1),
              new i("düm", -1, -1),
              new i("tüm", -1, -1),
              new i("dım", -1, -1),
              new i("tım", -1, -1),
              new i("din", -1, -1),
              new i("tin", -1, -1),
              new i("dun", -1, -1),
              new i("tun", -1, -1),
              new i("dün", -1, -1),
              new i("tün", -1, -1),
              new i("dın", -1, -1),
              new i("tın", -1, -1),
              new i("du", -1, -1),
              new i("tu", -1, -1),
              new i("dü", -1, -1),
              new i("tü", -1, -1),
              new i("dı", -1, -1),
              new i("tı", -1, -1),
            ],
            q = [
              new i("sa", -1, -1),
              new i("se", -1, -1),
              new i("sak", -1, -1),
              new i("sek", -1, -1),
              new i("sam", -1, -1),
              new i("sem", -1, -1),
              new i("san", -1, -1),
              new i("sen", -1, -1),
            ],
            C = [
              new i("miş", -1, -1),
              new i("muş", -1, -1),
              new i("müş", -1, -1),
              new i("mış", -1, -1),
            ],
            P = [
              new i("b", -1, 1),
              new i("c", -1, 2),
              new i("d", -1, 3),
              new i("ğ", -1, 4),
            ],
            F = [
              17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 8, 0,
              0, 0, 0, 0, 0, 1,
            ],
            S = [
              1, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0,
              0, 0, 0, 1,
            ],
            W = [65],
            L = [65],
            x = [
              [
                "a",
                [
                  1, 64, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 1,
                ],
                97,
                305,
              ],
              [
                "e",
                [17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130],
                101,
                252,
              ],
              [
                "ı",
                [
                  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 1,
                ],
                97,
                305,
              ],
              ["i", [17], 101, 105],
              ["o", W, 111, 117],
              ["ö", L, 246, 252],
              ["u", W, 111, 117],
            ],
            A = new e();
          function E(r, i, e) {
            for (;;) {
              var n = A.limit - A.cursor;
              if (A.in_grouping_b(r, i, e)) {
                A.cursor = A.limit - n;
                break;
              }
              if (((A.cursor = A.limit - n), A.cursor <= A.limit_backward))
                return !1;
              A.cursor--;
            }
            return !0;
          }
          function j() {
            var r, i;
            (r = A.limit - A.cursor), E(F, 97, 305);
            for (var e = 0; e < x.length; e++) {
              i = A.limit - A.cursor;
              var n = x[e];
              if (A.eq_s_b(1, n[0]) && E(n[1], n[2], n[3]))
                return (A.cursor = A.limit - r), !0;
              A.cursor = A.limit - i;
            }
            return (
              (A.cursor = A.limit - i),
              !(!A.eq_s_b(1, "ü") || !E(L, 246, 252)) &&
                ((A.cursor = A.limit - r), !0)
            );
          }
          function T(r, i) {
            var e,
              n = A.limit - A.cursor;
            return r() &&
              ((A.cursor = A.limit - n),
              A.cursor > A.limit_backward &&
                (A.cursor--, (e = A.limit - A.cursor), i()))
              ? ((A.cursor = A.limit - e), !0)
              : ((A.cursor = A.limit - n),
                r()
                  ? ((A.cursor = A.limit - n), !1)
                  : ((A.cursor = A.limit - n),
                    !(A.cursor <= A.limit_backward) &&
                      (A.cursor--, !!i() && ((A.cursor = A.limit - n), !0))));
          }
          function Z(r) {
            return T(r, function () {
              return A.in_grouping_b(F, 97, 305);
            });
          }
          function B() {
            return Z(function () {
              return A.eq_s_b(1, "n");
            });
          }
          function D() {
            return Z(function () {
              return A.eq_s_b(1, "y");
            });
          }
          function G() {
            return (
              A.find_among_b(n, 10) &&
              T(
                function () {
                  return A.in_grouping_b(S, 105, 305);
                },
                function () {
                  return A.out_grouping_b(F, 97, 305);
                },
              )
            );
          }
          function H() {
            return (
              j() &&
              A.in_grouping_b(S, 105, 305) &&
              Z(function () {
                return A.eq_s_b(1, "s");
              })
            );
          }
          function I() {
            return A.find_among_b(t, 2);
          }
          function J() {
            return j() && A.find_among_b(o, 4) && B();
          }
          function K() {
            return j() && A.find_among_b(l, 4);
          }
          function M() {
            return j() && A.find_among_b(a, 2);
          }
          function N() {
            return j() && A.find_among_b(w, 4) && D();
          }
          function O() {
            return j() && A.find_among_b(_, 4);
          }
          function Q() {
            return j() && A.find_among_b(k, 4) && D();
          }
          function R() {
            return A.find_among_b(p, 4);
          }
          function U() {
            return j() && A.find_among_b(g, 2);
          }
          function V() {
            return j() && A.find_among_b(z, 8);
          }
          function X() {
            return j() && A.find_among_b(v, 32) && D();
          }
          function Y() {
            return A.find_among_b(q, 8) && D();
          }
          function $() {
            return j() && A.find_among_b(C, 4) && D();
          }
          function rr() {
            var r = A.limit - A.cursor;
            return !(
              $() ||
              ((A.cursor = A.limit - r),
              X() ||
                ((A.cursor = A.limit - r),
                Y() || ((A.cursor = A.limit - r), A.eq_s_b(3, "ken") && D())))
            );
          }
          function ir() {
            if (A.find_among_b(h, 2)) {
              var r = A.limit - A.cursor;
              if (
                (R() ||
                  ((A.cursor = A.limit - r),
                  U() ||
                    ((A.cursor = A.limit - r),
                    N() ||
                      ((A.cursor = A.limit - r),
                      O() ||
                        ((A.cursor = A.limit - r),
                        Q() || (A.cursor = A.limit - r))))),
                $())
              )
                return !1;
            }
            return !0;
          }
          function er() {
            if (!j() || !A.find_among_b(y, 4)) return !0;
            var r = A.limit - A.cursor;
            return !X() && ((A.cursor = A.limit - r), !Y());
          }
          function nr() {
            var i,
              e,
              n,
              t = A.limit - A.cursor;
            if (
              ((A.ket = A.cursor),
              (r = !0),
              rr() &&
                ((A.cursor = A.limit - t),
                ir() &&
                  ((A.cursor = A.limit - t),
                  (function () {
                    if (U()) {
                      (A.bra = A.cursor), A.slice_del();
                      var i = A.limit - A.cursor;
                      return (
                        (A.ket = A.cursor),
                        V() ||
                          ((A.cursor = A.limit - i),
                          X() ||
                            ((A.cursor = A.limit - i),
                            Y() ||
                              ((A.cursor = A.limit - i),
                              $() || (A.cursor = A.limit - i)))),
                        (r = !1),
                        !1
                      );
                    }
                    return !0;
                  })() &&
                    ((A.cursor = A.limit - t),
                    er() &&
                      ((A.cursor = A.limit - t),
                      (n = A.limit - A.cursor),
                      !(
                        R() ||
                        ((A.cursor = A.limit - n),
                        Q() ||
                          ((A.cursor = A.limit - n),
                          O() || ((A.cursor = A.limit - n), N())))
                      ) ||
                        ((A.bra = A.cursor),
                        A.slice_del(),
                        (e = A.limit - A.cursor),
                        (A.ket = A.cursor),
                        $() || (A.cursor = A.limit - e),
                        0))))))
            ) {
              if (((A.cursor = A.limit - t), !V())) return;
              (A.bra = A.cursor),
                A.slice_del(),
                (A.ket = A.cursor),
                (i = A.limit - A.cursor),
                R() ||
                  ((A.cursor = A.limit - i),
                  U() ||
                    ((A.cursor = A.limit - i),
                    N() ||
                      ((A.cursor = A.limit - i),
                      O() ||
                        ((A.cursor = A.limit - i),
                        Q() || (A.cursor = A.limit - i))))),
                $() || (A.cursor = A.limit - i);
            }
            (A.bra = A.cursor), A.slice_del();
          }
          function tr() {
            var r, i, e, n;
            if (((A.ket = A.cursor), A.eq_s_b(2, "ki"))) {
              if (((r = A.limit - A.cursor), K()))
                return (
                  (A.bra = A.cursor),
                  A.slice_del(),
                  (i = A.limit - A.cursor),
                  (A.ket = A.cursor),
                  U()
                    ? ((A.bra = A.cursor), A.slice_del(), tr())
                    : ((A.cursor = A.limit - i),
                      G() &&
                        ((A.bra = A.cursor),
                        A.slice_del(),
                        (A.ket = A.cursor),
                        U() && ((A.bra = A.cursor), A.slice_del(), tr()))),
                  !0
                );
              if (((A.cursor = A.limit - r), J())) {
                if (
                  ((A.bra = A.cursor),
                  A.slice_del(),
                  (A.ket = A.cursor),
                  (e = A.limit - A.cursor),
                  I())
                )
                  (A.bra = A.cursor), A.slice_del();
                else {
                  if (
                    ((A.cursor = A.limit - e),
                    (A.ket = A.cursor),
                    !G() &&
                      ((A.cursor = A.limit - e),
                      !H() && ((A.cursor = A.limit - e), !tr())))
                  )
                    return !0;
                  (A.bra = A.cursor),
                    A.slice_del(),
                    (A.ket = A.cursor),
                    U() && ((A.bra = A.cursor), A.slice_del(), tr());
                }
                return !0;
              }
              if (((A.cursor = A.limit - r), M())) {
                if (((n = A.limit - A.cursor), I()))
                  (A.bra = A.cursor), A.slice_del();
                else if (((A.cursor = A.limit - n), H()))
                  (A.bra = A.cursor),
                    A.slice_del(),
                    (A.ket = A.cursor),
                    U() && ((A.bra = A.cursor), A.slice_del(), tr());
                else if (((A.cursor = A.limit - n), !tr())) return !1;
                return !0;
              }
            }
            return !1;
          }
          function ur(r) {
            if (
              ((A.ket = A.cursor),
              !M() && ((A.cursor = A.limit - r), !j() || !A.find_among_b(c, 2)))
            )
              return !1;
            var i = A.limit - A.cursor;
            if (I()) (A.bra = A.cursor), A.slice_del();
            else if (((A.cursor = A.limit - i), H()))
              (A.bra = A.cursor),
                A.slice_del(),
                (A.ket = A.cursor),
                U() && ((A.bra = A.cursor), A.slice_del(), tr());
            else if (((A.cursor = A.limit - i), !tr())) return !1;
            return !0;
          }
          function or(r) {
            if (
              ((A.ket = A.cursor),
              !(
                (j() && A.find_among_b(d, 2)) ||
                ((A.cursor = A.limit - r), j() && A.find_among_b(u, 4))
              ))
            )
              return !1;
            var i = A.limit - A.cursor;
            return (
              !(!H() && ((A.cursor = A.limit - i), !I())) &&
              ((A.bra = A.cursor),
              A.slice_del(),
              (A.ket = A.cursor),
              U() && ((A.bra = A.cursor), A.slice_del(), tr()),
              !0)
            );
          }
          function sr() {
            var r,
              i = A.limit - A.cursor;
            return (
              (A.ket = A.cursor),
              !!(
                J() ||
                ((A.cursor = A.limit - i), j() && A.find_among_b(f, 2) && D())
              ) &&
                ((A.bra = A.cursor),
                A.slice_del(),
                (r = A.limit - A.cursor),
                (A.ket = A.cursor),
                !(!U() || ((A.bra = A.cursor), A.slice_del(), !tr())) ||
                  ((A.cursor = A.limit - r),
                  (A.ket = A.cursor),
                  !(
                    G() ||
                    ((A.cursor = A.limit - r),
                    H() || ((A.cursor = A.limit - r), tr()))
                  ) ||
                    ((A.bra = A.cursor),
                    A.slice_del(),
                    (A.ket = A.cursor),
                    U() && ((A.bra = A.cursor), A.slice_del(), tr()),
                    !0)))
            );
          }
          function cr() {
            var r,
              i,
              e = A.limit - A.cursor;
            if (
              ((A.ket = A.cursor),
              !(
                K() ||
                ((A.cursor = A.limit - e),
                (j() && A.in_grouping_b(S, 105, 305) && D()) ||
                  ((A.cursor = A.limit - e),
                  j() && A.find_among_b(s, 2) && D()))
              ))
            )
              return !1;
            if (
              ((A.bra = A.cursor),
              A.slice_del(),
              (A.ket = A.cursor),
              (r = A.limit - A.cursor),
              G())
            )
              (A.bra = A.cursor),
                A.slice_del(),
                (i = A.limit - A.cursor),
                (A.ket = A.cursor),
                U() || (A.cursor = A.limit - i);
            else if (((A.cursor = A.limit - r), !U())) return !0;
            return (
              (A.bra = A.cursor), A.slice_del(), (A.ket = A.cursor), tr(), !0
            );
          }
          function lr() {
            var r,
              i,
              e = A.limit - A.cursor;
            if (((A.ket = A.cursor), U()))
              return (A.bra = A.cursor), A.slice_del(), void tr();
            if (
              ((A.cursor = A.limit - e),
              (A.ket = A.cursor),
              j() && A.find_among_b(b, 2) && B())
            )
              if (
                ((A.bra = A.cursor),
                A.slice_del(),
                (r = A.limit - A.cursor),
                (A.ket = A.cursor),
                I())
              )
                (A.bra = A.cursor), A.slice_del();
              else {
                if (
                  ((A.cursor = A.limit - r),
                  (A.ket = A.cursor),
                  !G() && ((A.cursor = A.limit - r), !H()))
                ) {
                  if (((A.cursor = A.limit - r), (A.ket = A.cursor), !U()))
                    return;
                  if (((A.bra = A.cursor), A.slice_del(), !tr())) return;
                }
                (A.bra = A.cursor),
                  A.slice_del(),
                  (A.ket = A.cursor),
                  U() && ((A.bra = A.cursor), A.slice_del(), tr());
              }
            else if (
              ((A.cursor = A.limit - e),
              !ur(e) && ((A.cursor = A.limit - e), !or(e)))
            ) {
              if (
                ((A.cursor = A.limit - e),
                (A.ket = A.cursor),
                j() && A.find_among_b(m, 4))
              )
                return (
                  (A.bra = A.cursor),
                  A.slice_del(),
                  (A.ket = A.cursor),
                  (i = A.limit - A.cursor),
                  void (G()
                    ? ((A.bra = A.cursor),
                      A.slice_del(),
                      (A.ket = A.cursor),
                      U() && ((A.bra = A.cursor), A.slice_del(), tr()))
                    : ((A.cursor = A.limit - i),
                      U()
                        ? ((A.bra = A.cursor), A.slice_del(), tr())
                        : ((A.cursor = A.limit - i), tr())))
                );
              if (((A.cursor = A.limit - e), !sr())) {
                if (((A.cursor = A.limit - e), I()))
                  return (A.bra = A.cursor), void A.slice_del();
                (A.cursor = A.limit - e),
                  tr() ||
                    ((A.cursor = A.limit - e),
                    cr() ||
                      ((A.cursor = A.limit - e),
                      (A.ket = A.cursor),
                      (G() || ((A.cursor = A.limit - e), H())) &&
                        ((A.bra = A.cursor),
                        A.slice_del(),
                        (A.ket = A.cursor),
                        U() && ((A.bra = A.cursor), A.slice_del(), tr()))));
              }
            }
          }
          function ar(r, i, e) {
            if (
              ((A.cursor = A.limit - r),
              (function () {
                for (;;) {
                  var r = A.limit - A.cursor;
                  if (A.in_grouping_b(F, 97, 305)) {
                    A.cursor = A.limit - r;
                    break;
                  }
                  if (((A.cursor = A.limit - r), A.cursor <= A.limit_backward))
                    return !1;
                  A.cursor--;
                }
                return !0;
              })())
            ) {
              var n = A.limit - A.cursor;
              if (
                !A.eq_s_b(1, i) &&
                ((A.cursor = A.limit - n), !A.eq_s_b(1, e))
              )
                return !0;
              A.cursor = A.limit - r;
              var t = A.cursor;
              return A.insert(A.cursor, A.cursor, e), (A.cursor = t), !1;
            }
            return !0;
          }
          function mr(r, i, e) {
            for (; !A.eq_s(i, e); ) {
              if (A.cursor >= A.limit) return !0;
              A.cursor++;
            }
            return i != A.limit || ((A.cursor = r), !1);
          }
          function dr() {
            var r,
              i,
              e = A.cursor;
            return (
              !(
                !mr((r = A.cursor), 2, "ad") ||
                ((A.cursor = r), !mr(r, 5, "soyad"))
              ) &&
              ((A.limit_backward = e),
              (A.cursor = A.limit),
              (i = A.limit - A.cursor),
              (A.eq_s_b(1, "d") ||
                ((A.cursor = A.limit - i), A.eq_s_b(1, "g"))) &&
                ar(i, "a", "ı") &&
                ar(i, "e", "i") &&
                ar(i, "o", "u") &&
                ar(i, "ö", "ü"),
              (A.cursor = A.limit),
              (function () {
                var r;
                if (((A.ket = A.cursor), (r = A.find_among_b(P, 4))))
                  switch (((A.bra = A.cursor), r)) {
                    case 1:
                      A.slice_from("p");
                      break;
                    case 2:
                      A.slice_from("ç");
                      break;
                    case 3:
                      A.slice_from("t");
                      break;
                    case 4:
                      A.slice_from("k");
                  }
              })(),
              !0)
            );
          }
          (this.setCurrent = function (r) {
            A.setCurrent(r);
          }),
            (this.getCurrent = function () {
              return A.getCurrent();
            }),
            (this.stem = function () {
              return !!(
                (function () {
                  for (var r, i = A.cursor, e = 2; ; ) {
                    for (r = A.cursor; !A.in_grouping(F, 97, 305); ) {
                      if (A.cursor >= A.limit)
                        return (A.cursor = r), !(e > 0 || ((A.cursor = i), 0));
                      A.cursor++;
                    }
                    e--;
                  }
                })() &&
                ((A.limit_backward = A.cursor),
                (A.cursor = A.limit),
                nr(),
                (A.cursor = A.limit),
                r && (lr(), (A.cursor = A.limit_backward), dr()))
              );
            });
        })()),
        function (r) {
          return "function" == typeof r.update
            ? r.update(function (r) {
                return n.setCurrent(r), n.stem(), n.getCurrent();
              })
            : (n.setCurrent(r), n.stem(), n.getCurrent());
        })),
      r.Pipeline.registerFunction(r.tr.stemmer, "stemmer-tr"),
      (r.tr.stopWordFilter = r.generateStopWordFilter(
        "acaba altmış altı ama ancak arada aslında ayrıca bana bazı belki ben benden beni benim beri beş bile bin bir biri birkaç birkez birçok birşey birşeyi biz bizden bize bizi bizim bu buna bunda bundan bunlar bunları bunların bunu bunun burada böyle böylece da daha dahi de defa değil diye diğer doksan dokuz dolayı dolayısıyla dört edecek eden ederek edilecek ediliyor edilmesi ediyor elli en etmesi etti ettiği ettiğini eğer gibi göre halen hangi hatta hem henüz hep hepsi her herhangi herkesin hiç hiçbir iki ile ilgili ise itibaren itibariyle için işte kadar karşın katrilyon kendi kendilerine kendini kendisi kendisine kendisini kez ki kim kimden kime kimi kimse kırk milyar milyon mu mü mı nasıl ne neden nedenle nerde nerede nereye niye niçin o olan olarak oldu olduklarını olduğu olduğunu olmadı olmadığı olmak olması olmayan olmaz olsa olsun olup olur olursa oluyor on ona ondan onlar onlardan onları onların onu onun otuz oysa pek rağmen sadece sanki sekiz seksen sen senden seni senin siz sizden sizi sizin tarafından trilyon tüm var vardı ve veya ya yani yapacak yapmak yaptı yaptıkları yaptığı yaptığını yapılan yapılması yapıyor yedi yerine yetmiş yine yirmi yoksa yüz zaten çok çünkü öyle üzere üç şey şeyden şeyi şeyler şu şuna şunda şundan şunları şunu şöyle".split(
          " ",
        ),
      )),
      r.Pipeline.registerFunction(r.tr.stopWordFilter, "stopWordFilter-tr");
  };
});
