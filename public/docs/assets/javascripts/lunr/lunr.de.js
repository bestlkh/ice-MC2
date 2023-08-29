!(function (e, r) {
  "function" == typeof define && define.amd
    ? define(r)
    : "object" == typeof exports
    ? (module.exports = r())
    : r()(e.lunr);
})(this, function () {
  return function (e) {
    if (void 0 === e)
      throw new Error(
        "Lunr is not present. Please include / require Lunr before this script.",
      );
    if (void 0 === e.stemmerSupport)
      throw new Error(
        "Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.",
      );
    var r, n, i;
    (e.de = function () {
      this.pipeline.reset(),
        this.pipeline.add(e.de.trimmer, e.de.stopWordFilter, e.de.stemmer),
        this.searchPipeline &&
          (this.searchPipeline.reset(), this.searchPipeline.add(e.de.stemmer));
    }),
      (e.de.wordCharacters =
        "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞭꞰ-ꞷꟷ-ꟿꬰ-ꭚꭜ-ꭤﬀ-ﬆＡ-Ｚａ-ｚ"),
      (e.de.trimmer = e.trimmerSupport.generateTrimmer(e.de.wordCharacters)),
      e.Pipeline.registerFunction(e.de.trimmer, "trimmer-de"),
      (e.de.stemmer =
        ((r = e.stemmerSupport.Among),
        (n = e.stemmerSupport.SnowballProgram),
        (i = new (function () {
          var e,
            i,
            s,
            t = [
              new r("", -1, 6),
              new r("U", 0, 2),
              new r("Y", 0, 1),
              new r("ä", 0, 3),
              new r("ö", 0, 4),
              new r("ü", 0, 5),
            ],
            o = [
              new r("e", -1, 2),
              new r("em", -1, 1),
              new r("en", -1, 2),
              new r("ern", -1, 1),
              new r("er", -1, 1),
              new r("s", -1, 3),
              new r("es", 5, 2),
            ],
            c = [
              new r("en", -1, 1),
              new r("er", -1, 1),
              new r("st", -1, 2),
              new r("est", 2, 1),
            ],
            u = [new r("ig", -1, 1), new r("lich", -1, 1)],
            a = [
              new r("end", -1, 1),
              new r("ig", -1, 2),
              new r("ung", -1, 1),
              new r("lich", -1, 3),
              new r("isch", -1, 2),
              new r("ik", -1, 2),
              new r("heit", -1, 3),
              new r("keit", -1, 4),
            ],
            d = [
              17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32, 8,
            ],
            l = [117, 30, 5],
            m = [117, 30, 4],
            h = new n();
          function w(e, r, n) {
            return (
              !(
                !h.eq_s(1, e) ||
                ((h.ket = h.cursor), !h.in_grouping(d, 97, 252))
              ) && (h.slice_from(r), (h.cursor = n), !0)
            );
          }
          function f() {
            for (; !h.in_grouping(d, 97, 252); ) {
              if (h.cursor >= h.limit) return !0;
              h.cursor++;
            }
            for (; !h.out_grouping(d, 97, 252); ) {
              if (h.cursor >= h.limit) return !0;
              h.cursor++;
            }
            return !1;
          }
          function b() {
            return s <= h.cursor;
          }
          function _() {
            return i <= h.cursor;
          }
          (this.setCurrent = function (e) {
            h.setCurrent(e);
          }),
            (this.getCurrent = function () {
              return h.getCurrent();
            }),
            (this.stem = function () {
              var r = h.cursor;
              return (
                (function () {
                  for (var e, r, n, i, s = h.cursor; ; )
                    if (((e = h.cursor), (h.bra = e), h.eq_s(1, "ß")))
                      (h.ket = h.cursor), h.slice_from("ss");
                    else {
                      if (e >= h.limit) break;
                      h.cursor = e + 1;
                    }
                  for (h.cursor = s; ; )
                    for (r = h.cursor; ; ) {
                      if (((n = h.cursor), h.in_grouping(d, 97, 252))) {
                        if (((i = h.cursor), (h.bra = i), w("u", "U", n)))
                          break;
                        if (((h.cursor = i), w("y", "Y", n))) break;
                      }
                      if (n >= h.limit) return void (h.cursor = r);
                      h.cursor = n + 1;
                    }
                })(),
                (h.cursor = r),
                (function () {
                  (s = h.limit), (i = s);
                  var r = h.cursor + 3;
                  0 <= r &&
                    r <= h.limit &&
                    ((e = r),
                    f() ||
                      ((s = h.cursor) < e && (s = e), f() || (i = h.cursor)));
                })(),
                (h.limit_backward = r),
                (h.cursor = h.limit),
                (function () {
                  var e,
                    r,
                    n,
                    i,
                    s = h.limit - h.cursor;
                  if (
                    ((h.ket = h.cursor),
                    (e = h.find_among_b(o, 7)) && ((h.bra = h.cursor), b()))
                  )
                    switch (e) {
                      case 1:
                        h.slice_del();
                        break;
                      case 2:
                        h.slice_del(),
                          (h.ket = h.cursor),
                          h.eq_s_b(1, "s") &&
                            ((h.bra = h.cursor),
                            h.eq_s_b(3, "nis") && h.slice_del());
                        break;
                      case 3:
                        h.in_grouping_b(l, 98, 116) && h.slice_del();
                    }
                  if (
                    ((h.cursor = h.limit - s),
                    (h.ket = h.cursor),
                    (e = h.find_among_b(c, 4)) && ((h.bra = h.cursor), b()))
                  )
                    switch (e) {
                      case 1:
                        h.slice_del();
                        break;
                      case 2:
                        if (h.in_grouping_b(m, 98, 116)) {
                          var t = h.cursor - 3;
                          h.limit_backward <= t &&
                            t <= h.limit &&
                            ((h.cursor = t), h.slice_del());
                        }
                    }
                  if (
                    ((h.cursor = h.limit - s),
                    (h.ket = h.cursor),
                    (e = h.find_among_b(a, 8)) && ((h.bra = h.cursor), _()))
                  )
                    switch (e) {
                      case 1:
                        h.slice_del(),
                          (h.ket = h.cursor),
                          h.eq_s_b(2, "ig") &&
                            ((h.bra = h.cursor),
                            (r = h.limit - h.cursor),
                            h.eq_s_b(1, "e") ||
                              ((h.cursor = h.limit - r), _() && h.slice_del()));
                        break;
                      case 2:
                        (n = h.limit - h.cursor),
                          h.eq_s_b(1, "e") ||
                            ((h.cursor = h.limit - n), h.slice_del());
                        break;
                      case 3:
                        if (
                          (h.slice_del(),
                          (h.ket = h.cursor),
                          (i = h.limit - h.cursor),
                          !h.eq_s_b(2, "er") &&
                            ((h.cursor = h.limit - i), !h.eq_s_b(2, "en")))
                        )
                          break;
                        (h.bra = h.cursor), b() && h.slice_del();
                        break;
                      case 4:
                        h.slice_del(),
                          (h.ket = h.cursor),
                          (e = h.find_among_b(u, 2)) &&
                            ((h.bra = h.cursor),
                            _() && 1 == e && h.slice_del());
                    }
                })(),
                (h.cursor = h.limit_backward),
                (function () {
                  for (var e, r; ; ) {
                    if (
                      ((r = h.cursor), (h.bra = r), !(e = h.find_among(t, 6)))
                    )
                      return;
                    switch (((h.ket = h.cursor), e)) {
                      case 1:
                        h.slice_from("y");
                        break;
                      case 2:
                      case 5:
                        h.slice_from("u");
                        break;
                      case 3:
                        h.slice_from("a");
                        break;
                      case 4:
                        h.slice_from("o");
                        break;
                      case 6:
                        if (h.cursor >= h.limit) return;
                        h.cursor++;
                    }
                  }
                })(),
                !0
              );
            });
        })()),
        function (e) {
          return "function" == typeof e.update
            ? e.update(function (e) {
                return i.setCurrent(e), i.stem(), i.getCurrent();
              })
            : (i.setCurrent(e), i.stem(), i.getCurrent());
        })),
      e.Pipeline.registerFunction(e.de.stemmer, "stemmer-de"),
      (e.de.stopWordFilter = e.generateStopWordFilter(
        "aber alle allem allen aller alles als also am an ander andere anderem anderen anderer anderes anderm andern anderr anders auch auf aus bei bin bis bist da damit dann das dasselbe dazu daß dein deine deinem deinen deiner deines dem demselben den denn denselben der derer derselbe derselben des desselben dessen dich die dies diese dieselbe dieselben diesem diesen dieser dieses dir doch dort du durch ein eine einem einen einer eines einig einige einigem einigen einiger einiges einmal er es etwas euch euer eure eurem euren eurer eures für gegen gewesen hab habe haben hat hatte hatten hier hin hinter ich ihm ihn ihnen ihr ihre ihrem ihren ihrer ihres im in indem ins ist jede jedem jeden jeder jedes jene jenem jenen jener jenes jetzt kann kein keine keinem keinen keiner keines können könnte machen man manche manchem manchen mancher manches mein meine meinem meinen meiner meines mich mir mit muss musste nach nicht nichts noch nun nur ob oder ohne sehr sein seine seinem seinen seiner seines selbst sich sie sind so solche solchem solchen solcher solches soll sollte sondern sonst um und uns unse unsem unsen unser unses unter viel vom von vor war waren warst was weg weil weiter welche welchem welchen welcher welches wenn werde werden wie wieder will wir wird wirst wo wollen wollte während würde würden zu zum zur zwar zwischen über".split(
          " ",
        ),
      )),
      e.Pipeline.registerFunction(e.de.stopWordFilter, "stopWordFilter-de");
  };
});
