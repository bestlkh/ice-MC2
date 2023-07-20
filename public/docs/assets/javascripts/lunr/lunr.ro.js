!(function (e, i) {
  "function" == typeof define && define.amd
    ? define(i)
    : "object" == typeof exports
    ? (module.exports = i())
    : i()(e.lunr);
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
    var i, r, n;
    (e.ro = function () {
      this.pipeline.reset(),
        this.pipeline.add(e.ro.trimmer, e.ro.stopWordFilter, e.ro.stemmer),
        this.searchPipeline &&
          (this.searchPipeline.reset(), this.searchPipeline.add(e.ro.stemmer));
    }),
      (e.ro.wordCharacters =
        "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞭꞰ-ꞷꟷ-ꟿꬰ-ꭚꭜ-ꭤﬀ-ﬆＡ-Ｚａ-ｚ"),
      (e.ro.trimmer = e.trimmerSupport.generateTrimmer(e.ro.wordCharacters)),
      e.Pipeline.registerFunction(e.ro.trimmer, "trimmer-ro"),
      (e.ro.stemmer =
        ((i = e.stemmerSupport.Among),
        (r = e.stemmerSupport.SnowballProgram),
        (n = new (function () {
          var e,
            n,
            t,
            a,
            o = [new i("", -1, 3), new i("I", 0, 1), new i("U", 0, 2)],
            s = [
              new i("ea", -1, 3),
              new i("aţia", -1, 7),
              new i("aua", -1, 2),
              new i("iua", -1, 4),
              new i("aţie", -1, 7),
              new i("ele", -1, 3),
              new i("ile", -1, 5),
              new i("iile", 6, 4),
              new i("iei", -1, 4),
              new i("atei", -1, 6),
              new i("ii", -1, 4),
              new i("ului", -1, 1),
              new i("ul", -1, 1),
              new i("elor", -1, 3),
              new i("ilor", -1, 4),
              new i("iilor", 14, 4),
            ],
            c = [
              new i("icala", -1, 4),
              new i("iciva", -1, 4),
              new i("ativa", -1, 5),
              new i("itiva", -1, 6),
              new i("icale", -1, 4),
              new i("aţiune", -1, 5),
              new i("iţiune", -1, 6),
              new i("atoare", -1, 5),
              new i("itoare", -1, 6),
              new i("ătoare", -1, 5),
              new i("icitate", -1, 4),
              new i("abilitate", -1, 1),
              new i("ibilitate", -1, 2),
              new i("ivitate", -1, 3),
              new i("icive", -1, 4),
              new i("ative", -1, 5),
              new i("itive", -1, 6),
              new i("icali", -1, 4),
              new i("atori", -1, 5),
              new i("icatori", 18, 4),
              new i("itori", -1, 6),
              new i("ători", -1, 5),
              new i("icitati", -1, 4),
              new i("abilitati", -1, 1),
              new i("ivitati", -1, 3),
              new i("icivi", -1, 4),
              new i("ativi", -1, 5),
              new i("itivi", -1, 6),
              new i("icităi", -1, 4),
              new i("abilităi", -1, 1),
              new i("ivităi", -1, 3),
              new i("icităţi", -1, 4),
              new i("abilităţi", -1, 1),
              new i("ivităţi", -1, 3),
              new i("ical", -1, 4),
              new i("ator", -1, 5),
              new i("icator", 35, 4),
              new i("itor", -1, 6),
              new i("ător", -1, 5),
              new i("iciv", -1, 4),
              new i("ativ", -1, 5),
              new i("itiv", -1, 6),
              new i("icală", -1, 4),
              new i("icivă", -1, 4),
              new i("ativă", -1, 5),
              new i("itivă", -1, 6),
            ],
            u = [
              new i("ica", -1, 1),
              new i("abila", -1, 1),
              new i("ibila", -1, 1),
              new i("oasa", -1, 1),
              new i("ata", -1, 1),
              new i("ita", -1, 1),
              new i("anta", -1, 1),
              new i("ista", -1, 3),
              new i("uta", -1, 1),
              new i("iva", -1, 1),
              new i("ic", -1, 1),
              new i("ice", -1, 1),
              new i("abile", -1, 1),
              new i("ibile", -1, 1),
              new i("isme", -1, 3),
              new i("iune", -1, 2),
              new i("oase", -1, 1),
              new i("ate", -1, 1),
              new i("itate", 17, 1),
              new i("ite", -1, 1),
              new i("ante", -1, 1),
              new i("iste", -1, 3),
              new i("ute", -1, 1),
              new i("ive", -1, 1),
              new i("ici", -1, 1),
              new i("abili", -1, 1),
              new i("ibili", -1, 1),
              new i("iuni", -1, 2),
              new i("atori", -1, 1),
              new i("osi", -1, 1),
              new i("ati", -1, 1),
              new i("itati", 30, 1),
              new i("iti", -1, 1),
              new i("anti", -1, 1),
              new i("isti", -1, 3),
              new i("uti", -1, 1),
              new i("işti", -1, 3),
              new i("ivi", -1, 1),
              new i("ităi", -1, 1),
              new i("oşi", -1, 1),
              new i("ităţi", -1, 1),
              new i("abil", -1, 1),
              new i("ibil", -1, 1),
              new i("ism", -1, 3),
              new i("ator", -1, 1),
              new i("os", -1, 1),
              new i("at", -1, 1),
              new i("it", -1, 1),
              new i("ant", -1, 1),
              new i("ist", -1, 3),
              new i("ut", -1, 1),
              new i("iv", -1, 1),
              new i("ică", -1, 1),
              new i("abilă", -1, 1),
              new i("ibilă", -1, 1),
              new i("oasă", -1, 1),
              new i("ată", -1, 1),
              new i("ită", -1, 1),
              new i("antă", -1, 1),
              new i("istă", -1, 3),
              new i("ută", -1, 1),
              new i("ivă", -1, 1),
            ],
            w = [
              new i("ea", -1, 1),
              new i("ia", -1, 1),
              new i("esc", -1, 1),
              new i("ăsc", -1, 1),
              new i("ind", -1, 1),
              new i("ând", -1, 1),
              new i("are", -1, 1),
              new i("ere", -1, 1),
              new i("ire", -1, 1),
              new i("âre", -1, 1),
              new i("se", -1, 2),
              new i("ase", 10, 1),
              new i("sese", 10, 2),
              new i("ise", 10, 1),
              new i("use", 10, 1),
              new i("âse", 10, 1),
              new i("eşte", -1, 1),
              new i("ăşte", -1, 1),
              new i("eze", -1, 1),
              new i("ai", -1, 1),
              new i("eai", 19, 1),
              new i("iai", 19, 1),
              new i("sei", -1, 2),
              new i("eşti", -1, 1),
              new i("ăşti", -1, 1),
              new i("ui", -1, 1),
              new i("ezi", -1, 1),
              new i("âi", -1, 1),
              new i("aşi", -1, 1),
              new i("seşi", -1, 2),
              new i("aseşi", 29, 1),
              new i("seseşi", 29, 2),
              new i("iseşi", 29, 1),
              new i("useşi", 29, 1),
              new i("âseşi", 29, 1),
              new i("işi", -1, 1),
              new i("uşi", -1, 1),
              new i("âşi", -1, 1),
              new i("aţi", -1, 2),
              new i("eaţi", 38, 1),
              new i("iaţi", 38, 1),
              new i("eţi", -1, 2),
              new i("iţi", -1, 2),
              new i("âţi", -1, 2),
              new i("arăţi", -1, 1),
              new i("serăţi", -1, 2),
              new i("aserăţi", 45, 1),
              new i("seserăţi", 45, 2),
              new i("iserăţi", 45, 1),
              new i("userăţi", 45, 1),
              new i("âserăţi", 45, 1),
              new i("irăţi", -1, 1),
              new i("urăţi", -1, 1),
              new i("ârăţi", -1, 1),
              new i("am", -1, 1),
              new i("eam", 54, 1),
              new i("iam", 54, 1),
              new i("em", -1, 2),
              new i("asem", 57, 1),
              new i("sesem", 57, 2),
              new i("isem", 57, 1),
              new i("usem", 57, 1),
              new i("âsem", 57, 1),
              new i("im", -1, 2),
              new i("âm", -1, 2),
              new i("ăm", -1, 2),
              new i("arăm", 65, 1),
              new i("serăm", 65, 2),
              new i("aserăm", 67, 1),
              new i("seserăm", 67, 2),
              new i("iserăm", 67, 1),
              new i("userăm", 67, 1),
              new i("âserăm", 67, 1),
              new i("irăm", 65, 1),
              new i("urăm", 65, 1),
              new i("ârăm", 65, 1),
              new i("au", -1, 1),
              new i("eau", 76, 1),
              new i("iau", 76, 1),
              new i("indu", -1, 1),
              new i("ându", -1, 1),
              new i("ez", -1, 1),
              new i("ească", -1, 1),
              new i("ară", -1, 1),
              new i("seră", -1, 2),
              new i("aseră", 84, 1),
              new i("seseră", 84, 2),
              new i("iseră", 84, 1),
              new i("useră", 84, 1),
              new i("âseră", 84, 1),
              new i("iră", -1, 1),
              new i("ură", -1, 1),
              new i("âră", -1, 1),
              new i("ează", -1, 1),
            ],
            m = [
              new i("a", -1, 1),
              new i("e", -1, 1),
              new i("ie", 1, 1),
              new i("i", -1, 1),
              new i("ă", -1, 1),
            ],
            l = [
              17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 32, 0, 0, 4,
            ],
            f = new r();
          function p(e, i) {
            f.eq_s(1, e) &&
              ((f.ket = f.cursor),
              f.in_grouping(l, 97, 259) && f.slice_from(i));
          }
          function d() {
            if (f.out_grouping(l, 97, 259)) {
              for (; !f.in_grouping(l, 97, 259); ) {
                if (f.cursor >= f.limit) return !0;
                f.cursor++;
              }
              return !1;
            }
            return !0;
          }
          function b() {
            var e,
              i,
              r = f.cursor;
            if (f.in_grouping(l, 97, 259)) {
              if (((e = f.cursor), !d())) return void (a = f.cursor);
              if (
                ((f.cursor = e),
                !(function () {
                  if (f.in_grouping(l, 97, 259))
                    for (; !f.out_grouping(l, 97, 259); ) {
                      if (f.cursor >= f.limit) return !0;
                      f.cursor++;
                    }
                  return !1;
                })())
              )
                return void (a = f.cursor);
            }
            (f.cursor = r),
              f.out_grouping(l, 97, 259) &&
                ((i = f.cursor),
                d() &&
                  ((f.cursor = i),
                  f.in_grouping(l, 97, 259) &&
                    f.cursor < f.limit &&
                    f.cursor++),
                (a = f.cursor));
          }
          function v() {
            for (; !f.in_grouping(l, 97, 259); ) {
              if (f.cursor >= f.limit) return !1;
              f.cursor++;
            }
            for (; !f.out_grouping(l, 97, 259); ) {
              if (f.cursor >= f.limit) return !1;
              f.cursor++;
            }
            return !0;
          }
          function _() {
            return t <= f.cursor;
          }
          function g() {
            var i,
              r = f.limit - f.cursor;
            if (
              ((f.ket = f.cursor),
              (i = f.find_among_b(c, 46)) && ((f.bra = f.cursor), _()))
            ) {
              switch (i) {
                case 1:
                  f.slice_from("abil");
                  break;
                case 2:
                  f.slice_from("ibil");
                  break;
                case 3:
                  f.slice_from("iv");
                  break;
                case 4:
                  f.slice_from("ic");
                  break;
                case 5:
                  f.slice_from("at");
                  break;
                case 6:
                  f.slice_from("it");
              }
              return (e = !0), (f.cursor = f.limit - r), !0;
            }
            return !1;
          }
          function k() {
            var i, r;
            for (e = !1; ; )
              if (((r = f.limit - f.cursor), !g())) {
                f.cursor = f.limit - r;
                break;
              }
            if (
              ((f.ket = f.cursor),
              (i = f.find_among_b(u, 62)) &&
                ((f.bra = f.cursor), n <= f.cursor))
            ) {
              switch (i) {
                case 1:
                  f.slice_del();
                  break;
                case 2:
                  f.eq_s_b(1, "ţ") && ((f.bra = f.cursor), f.slice_from("t"));
                  break;
                case 3:
                  f.slice_from("ist");
              }
              e = !0;
            }
          }
          function h() {
            var e;
            (f.ket = f.cursor),
              (e = f.find_among_b(m, 5)) &&
                ((f.bra = f.cursor), a <= f.cursor && 1 == e && f.slice_del());
          }
          (this.setCurrent = function (e) {
            f.setCurrent(e);
          }),
            (this.getCurrent = function () {
              return f.getCurrent();
            }),
            (this.stem = function () {
              var i,
                r = f.cursor;
              return (
                (function () {
                  for (
                    var e, i;
                    (e = f.cursor),
                      f.in_grouping(l, 97, 259) &&
                        ((i = f.cursor),
                        (f.bra = i),
                        p("u", "U"),
                        (f.cursor = i),
                        p("i", "I")),
                      (f.cursor = e),
                      !(f.cursor >= f.limit);

                  )
                    f.cursor++;
                })(),
                (f.cursor = r),
                (i = f.cursor),
                (a = f.limit),
                (t = a),
                (n = a),
                b(),
                (f.cursor = i),
                v() && ((t = f.cursor), v() && (n = f.cursor)),
                (f.limit_backward = r),
                (f.cursor = f.limit),
                (function () {
                  var e, i;
                  if (
                    ((f.ket = f.cursor),
                    (e = f.find_among_b(s, 16)) && ((f.bra = f.cursor), _()))
                  )
                    switch (e) {
                      case 1:
                        f.slice_del();
                        break;
                      case 2:
                        f.slice_from("a");
                        break;
                      case 3:
                        f.slice_from("e");
                        break;
                      case 4:
                        f.slice_from("i");
                        break;
                      case 5:
                        (i = f.limit - f.cursor),
                          f.eq_s_b(2, "ab") ||
                            ((f.cursor = f.limit - i), f.slice_from("i"));
                        break;
                      case 6:
                        f.slice_from("at");
                        break;
                      case 7:
                        f.slice_from("aţi");
                    }
                })(),
                (f.cursor = f.limit),
                k(),
                (f.cursor = f.limit),
                e ||
                  ((f.cursor = f.limit),
                  (function () {
                    var e, i, r;
                    if (f.cursor >= a) {
                      if (
                        ((i = f.limit_backward),
                        (f.limit_backward = a),
                        (f.ket = f.cursor),
                        (e = f.find_among_b(w, 94)))
                      )
                        switch (((f.bra = f.cursor), e)) {
                          case 1:
                            if (
                              ((r = f.limit - f.cursor),
                              !f.out_grouping_b(l, 97, 259) &&
                                ((f.cursor = f.limit - r), !f.eq_s_b(1, "u")))
                            )
                              break;
                          case 2:
                            f.slice_del();
                        }
                      f.limit_backward = i;
                    }
                  })(),
                  (f.cursor = f.limit)),
                h(),
                (f.cursor = f.limit_backward),
                (function () {
                  for (var e; ; ) {
                    if (((f.bra = f.cursor), (e = f.find_among(o, 3))))
                      switch (((f.ket = f.cursor), e)) {
                        case 1:
                          f.slice_from("i");
                          continue;
                        case 2:
                          f.slice_from("u");
                          continue;
                        case 3:
                          if (f.cursor >= f.limit) break;
                          f.cursor++;
                          continue;
                      }
                    break;
                  }
                })(),
                !0
              );
            });
        })()),
        function (e) {
          return "function" == typeof e.update
            ? e.update(function (e) {
                return n.setCurrent(e), n.stem(), n.getCurrent();
              })
            : (n.setCurrent(e), n.stem(), n.getCurrent());
        })),
      e.Pipeline.registerFunction(e.ro.stemmer, "stemmer-ro"),
      (e.ro.stopWordFilter = e.generateStopWordFilter(
        "acea aceasta această aceea acei aceia acel acela acele acelea acest acesta aceste acestea aceşti aceştia acolo acord acum ai aia aibă aici al ale alea altceva altcineva am ar are asemenea asta astea astăzi asupra au avea avem aveţi azi aş aşadar aţi bine bucur bună ca care caut ce cel ceva chiar cinci cine cineva contra cu cum cumva curând curînd când cât câte câtva câţi cînd cît cîte cîtva cîţi că căci cărei căror cărui către da dacă dar datorită dată dau de deci deja deoarece departe deşi din dinaintea dintr- dintre doi doilea două drept după dă ea ei el ele eram este eu eşti face fata fi fie fiecare fii fim fiu fiţi frumos fără graţie halbă iar ieri la le li lor lui lângă lîngă mai mea mei mele mereu meu mi mie mine mult multă mulţi mulţumesc mâine mîine mă ne nevoie nici nicăieri nimeni nimeri nimic nişte noastre noastră noi noroc nostru nouă noştri nu opt ori oricare orice oricine oricum oricând oricât oricînd oricît oriunde patra patru patrulea pe pentru peste pic poate pot prea prima primul prin puţin puţina puţină până pînă rog sa sale sau se spate spre sub sunt suntem sunteţi sută sînt sîntem sînteţi să săi său ta tale te timp tine toate toată tot totuşi toţi trei treia treilea tu tăi tău un una unde undeva unei uneia unele uneori unii unor unora unu unui unuia unul vi voastre voastră voi vostru vouă voştri vreme vreo vreun vă zece zero zi zice îi îl îmi împotriva în  înainte înaintea încotro încât încît între întrucât întrucît îţi ăla ălea ăsta ăstea ăştia şapte şase şi ştiu ţi ţie".split(
          " ",
        ),
      )),
      e.Pipeline.registerFunction(e.ro.stopWordFilter, "stopWordFilter-ro");
  };
});
