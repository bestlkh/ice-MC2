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
    var r, i, n;
    (e.it = function () {
      this.pipeline.reset(),
        this.pipeline.add(e.it.trimmer, e.it.stopWordFilter, e.it.stemmer),
        this.searchPipeline &&
          (this.searchPipeline.reset(), this.searchPipeline.add(e.it.stemmer));
    }),
      (e.it.wordCharacters =
        "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞭꞰ-ꞷꟷ-ꟿꬰ-ꭚꭜ-ꭤﬀ-ﬆＡ-Ｚａ-ｚ"),
      (e.it.trimmer = e.trimmerSupport.generateTrimmer(e.it.wordCharacters)),
      e.Pipeline.registerFunction(e.it.trimmer, "trimmer-it"),
      (e.it.stemmer =
        ((r = e.stemmerSupport.Among),
        (i = e.stemmerSupport.SnowballProgram),
        (n = new (function () {
          var e,
            n,
            o,
            t = [
              new r("", -1, 7),
              new r("qu", 0, 6),
              new r("á", 0, 1),
              new r("é", 0, 2),
              new r("í", 0, 3),
              new r("ó", 0, 4),
              new r("ú", 0, 5),
            ],
            s = [new r("", -1, 3), new r("I", 0, 1), new r("U", 0, 2)],
            a = [
              new r("la", -1, -1),
              new r("cela", 0, -1),
              new r("gliela", 0, -1),
              new r("mela", 0, -1),
              new r("tela", 0, -1),
              new r("vela", 0, -1),
              new r("le", -1, -1),
              new r("cele", 6, -1),
              new r("gliele", 6, -1),
              new r("mele", 6, -1),
              new r("tele", 6, -1),
              new r("vele", 6, -1),
              new r("ne", -1, -1),
              new r("cene", 12, -1),
              new r("gliene", 12, -1),
              new r("mene", 12, -1),
              new r("sene", 12, -1),
              new r("tene", 12, -1),
              new r("vene", 12, -1),
              new r("ci", -1, -1),
              new r("li", -1, -1),
              new r("celi", 20, -1),
              new r("glieli", 20, -1),
              new r("meli", 20, -1),
              new r("teli", 20, -1),
              new r("veli", 20, -1),
              new r("gli", 20, -1),
              new r("mi", -1, -1),
              new r("si", -1, -1),
              new r("ti", -1, -1),
              new r("vi", -1, -1),
              new r("lo", -1, -1),
              new r("celo", 31, -1),
              new r("glielo", 31, -1),
              new r("melo", 31, -1),
              new r("telo", 31, -1),
              new r("velo", 31, -1),
            ],
            u = [
              new r("ando", -1, 1),
              new r("endo", -1, 1),
              new r("ar", -1, 2),
              new r("er", -1, 2),
              new r("ir", -1, 2),
            ],
            c = [
              new r("ic", -1, -1),
              new r("abil", -1, -1),
              new r("os", -1, -1),
              new r("iv", -1, 1),
            ],
            w = [new r("ic", -1, 1), new r("abil", -1, 1), new r("iv", -1, 1)],
            l = [
              new r("ica", -1, 1),
              new r("logia", -1, 3),
              new r("osa", -1, 1),
              new r("ista", -1, 1),
              new r("iva", -1, 9),
              new r("anza", -1, 1),
              new r("enza", -1, 5),
              new r("ice", -1, 1),
              new r("atrice", 7, 1),
              new r("iche", -1, 1),
              new r("logie", -1, 3),
              new r("abile", -1, 1),
              new r("ibile", -1, 1),
              new r("usione", -1, 4),
              new r("azione", -1, 2),
              new r("uzione", -1, 4),
              new r("atore", -1, 2),
              new r("ose", -1, 1),
              new r("ante", -1, 1),
              new r("mente", -1, 1),
              new r("amente", 19, 7),
              new r("iste", -1, 1),
              new r("ive", -1, 9),
              new r("anze", -1, 1),
              new r("enze", -1, 5),
              new r("ici", -1, 1),
              new r("atrici", 25, 1),
              new r("ichi", -1, 1),
              new r("abili", -1, 1),
              new r("ibili", -1, 1),
              new r("ismi", -1, 1),
              new r("usioni", -1, 4),
              new r("azioni", -1, 2),
              new r("uzioni", -1, 4),
              new r("atori", -1, 2),
              new r("osi", -1, 1),
              new r("anti", -1, 1),
              new r("amenti", -1, 6),
              new r("imenti", -1, 6),
              new r("isti", -1, 1),
              new r("ivi", -1, 9),
              new r("ico", -1, 1),
              new r("ismo", -1, 1),
              new r("oso", -1, 1),
              new r("amento", -1, 6),
              new r("imento", -1, 6),
              new r("ivo", -1, 9),
              new r("ità", -1, 8),
              new r("istà", -1, 1),
              new r("istè", -1, 1),
              new r("istì", -1, 1),
            ],
            m = [
              new r("isca", -1, 1),
              new r("enda", -1, 1),
              new r("ata", -1, 1),
              new r("ita", -1, 1),
              new r("uta", -1, 1),
              new r("ava", -1, 1),
              new r("eva", -1, 1),
              new r("iva", -1, 1),
              new r("erebbe", -1, 1),
              new r("irebbe", -1, 1),
              new r("isce", -1, 1),
              new r("ende", -1, 1),
              new r("are", -1, 1),
              new r("ere", -1, 1),
              new r("ire", -1, 1),
              new r("asse", -1, 1),
              new r("ate", -1, 1),
              new r("avate", 16, 1),
              new r("evate", 16, 1),
              new r("ivate", 16, 1),
              new r("ete", -1, 1),
              new r("erete", 20, 1),
              new r("irete", 20, 1),
              new r("ite", -1, 1),
              new r("ereste", -1, 1),
              new r("ireste", -1, 1),
              new r("ute", -1, 1),
              new r("erai", -1, 1),
              new r("irai", -1, 1),
              new r("isci", -1, 1),
              new r("endi", -1, 1),
              new r("erei", -1, 1),
              new r("irei", -1, 1),
              new r("assi", -1, 1),
              new r("ati", -1, 1),
              new r("iti", -1, 1),
              new r("eresti", -1, 1),
              new r("iresti", -1, 1),
              new r("uti", -1, 1),
              new r("avi", -1, 1),
              new r("evi", -1, 1),
              new r("ivi", -1, 1),
              new r("isco", -1, 1),
              new r("ando", -1, 1),
              new r("endo", -1, 1),
              new r("Yamo", -1, 1),
              new r("iamo", -1, 1),
              new r("avamo", -1, 1),
              new r("evamo", -1, 1),
              new r("ivamo", -1, 1),
              new r("eremo", -1, 1),
              new r("iremo", -1, 1),
              new r("assimo", -1, 1),
              new r("ammo", -1, 1),
              new r("emmo", -1, 1),
              new r("eremmo", 54, 1),
              new r("iremmo", 54, 1),
              new r("immo", -1, 1),
              new r("ano", -1, 1),
              new r("iscano", 58, 1),
              new r("avano", 58, 1),
              new r("evano", 58, 1),
              new r("ivano", 58, 1),
              new r("eranno", -1, 1),
              new r("iranno", -1, 1),
              new r("ono", -1, 1),
              new r("iscono", 65, 1),
              new r("arono", 65, 1),
              new r("erono", 65, 1),
              new r("irono", 65, 1),
              new r("erebbero", -1, 1),
              new r("irebbero", -1, 1),
              new r("assero", -1, 1),
              new r("essero", -1, 1),
              new r("issero", -1, 1),
              new r("ato", -1, 1),
              new r("ito", -1, 1),
              new r("uto", -1, 1),
              new r("avo", -1, 1),
              new r("evo", -1, 1),
              new r("ivo", -1, 1),
              new r("ar", -1, 1),
              new r("ir", -1, 1),
              new r("erà", -1, 1),
              new r("irà", -1, 1),
              new r("erò", -1, 1),
              new r("irò", -1, 1),
            ],
            f = [
              17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 128, 8, 2, 1,
            ],
            v = [17, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 128, 8, 2],
            b = [17],
            d = new i();
          function _(e, r, i) {
            return (
              !(
                !d.eq_s(1, e) ||
                ((d.ket = d.cursor), !d.in_grouping(f, 97, 249))
              ) && (d.slice_from(r), (d.cursor = i), !0)
            );
          }
          function g(e) {
            if (((d.cursor = e), !d.in_grouping(f, 97, 249))) return !1;
            for (; !d.out_grouping(f, 97, 249); ) {
              if (d.cursor >= d.limit) return !1;
              d.cursor++;
            }
            return !0;
          }
          function p() {
            var e,
              r = d.cursor;
            if (
              !(function () {
                if (d.in_grouping(f, 97, 249)) {
                  var e = d.cursor;
                  if (d.out_grouping(f, 97, 249)) {
                    for (; !d.in_grouping(f, 97, 249); ) {
                      if (d.cursor >= d.limit) return g(e);
                      d.cursor++;
                    }
                    return !0;
                  }
                  return g(e);
                }
                return !1;
              })()
            ) {
              if (((d.cursor = r), !d.out_grouping(f, 97, 249))) return;
              if (((e = d.cursor), d.out_grouping(f, 97, 249))) {
                for (; !d.in_grouping(f, 97, 249); ) {
                  if (d.cursor >= d.limit)
                    return (
                      (d.cursor = e),
                      void (
                        d.in_grouping(f, 97, 249) &&
                        d.cursor < d.limit &&
                        d.cursor++
                      )
                    );
                  d.cursor++;
                }
                return void (o = d.cursor);
              }
              if (
                ((d.cursor = e),
                !d.in_grouping(f, 97, 249) || d.cursor >= d.limit)
              )
                return;
              d.cursor++;
            }
            o = d.cursor;
          }
          function k() {
            for (; !d.in_grouping(f, 97, 249); ) {
              if (d.cursor >= d.limit) return !1;
              d.cursor++;
            }
            for (; !d.out_grouping(f, 97, 249); ) {
              if (d.cursor >= d.limit) return !1;
              d.cursor++;
            }
            return !0;
          }
          function h() {
            return o <= d.cursor;
          }
          function q() {
            return e <= d.cursor;
          }
          function C() {
            var e;
            if (((d.ket = d.cursor), !(e = d.find_among_b(l, 51)))) return !1;
            switch (((d.bra = d.cursor), e)) {
              case 1:
                if (!q()) return !1;
                d.slice_del();
                break;
              case 2:
                if (!q()) return !1;
                d.slice_del(),
                  (d.ket = d.cursor),
                  d.eq_s_b(2, "ic") &&
                    ((d.bra = d.cursor), q() && d.slice_del());
                break;
              case 3:
                if (!q()) return !1;
                d.slice_from("log");
                break;
              case 4:
                if (!q()) return !1;
                d.slice_from("u");
                break;
              case 5:
                if (!q()) return !1;
                d.slice_from("ente");
                break;
              case 6:
                if (!h()) return !1;
                d.slice_del();
                break;
              case 7:
                if (!(n <= d.cursor)) return !1;
                d.slice_del(),
                  (d.ket = d.cursor),
                  (e = d.find_among_b(c, 4)) &&
                    ((d.bra = d.cursor),
                    q() &&
                      (d.slice_del(),
                      1 == e &&
                        ((d.ket = d.cursor),
                        d.eq_s_b(2, "at") &&
                          ((d.bra = d.cursor), q() && d.slice_del()))));
                break;
              case 8:
                if (!q()) return !1;
                d.slice_del(),
                  (d.ket = d.cursor),
                  (e = d.find_among_b(w, 3)) &&
                    ((d.bra = d.cursor), 1 == e && q() && d.slice_del());
                break;
              case 9:
                if (!q()) return !1;
                d.slice_del(),
                  (d.ket = d.cursor),
                  d.eq_s_b(2, "at") &&
                    ((d.bra = d.cursor),
                    q() &&
                      (d.slice_del(),
                      (d.ket = d.cursor),
                      d.eq_s_b(2, "ic") &&
                        ((d.bra = d.cursor), q() && d.slice_del())));
            }
            return !0;
          }
          function z() {
            var e;
            (e = d.limit - d.cursor),
              (d.ket = d.cursor),
              d.in_grouping_b(v, 97, 242) &&
              ((d.bra = d.cursor),
              h() &&
                (d.slice_del(),
                (d.ket = d.cursor),
                d.eq_s_b(1, "i") && ((d.bra = d.cursor), h())))
                ? d.slice_del()
                : (d.cursor = d.limit - e),
              (d.ket = d.cursor),
              d.eq_s_b(1, "h") &&
                ((d.bra = d.cursor),
                d.in_grouping_b(b, 99, 103) && h() && d.slice_del());
          }
          (this.setCurrent = function (e) {
            d.setCurrent(e);
          }),
            (this.getCurrent = function () {
              return d.getCurrent();
            }),
            (this.stem = function () {
              var r,
                i,
                c,
                w = d.cursor;
              return (
                (function () {
                  for (var e, r, i, n, o = d.cursor; ; ) {
                    if (((d.bra = d.cursor), (e = d.find_among(t, 7))))
                      switch (((d.ket = d.cursor), e)) {
                        case 1:
                          d.slice_from("à");
                          continue;
                        case 2:
                          d.slice_from("è");
                          continue;
                        case 3:
                          d.slice_from("ì");
                          continue;
                        case 4:
                          d.slice_from("ò");
                          continue;
                        case 5:
                          d.slice_from("ù");
                          continue;
                        case 6:
                          d.slice_from("qU");
                          continue;
                        case 7:
                          if (d.cursor >= d.limit) break;
                          d.cursor++;
                          continue;
                      }
                    break;
                  }
                  for (d.cursor = o; ; )
                    for (r = d.cursor; ; ) {
                      if (((i = d.cursor), d.in_grouping(f, 97, 249))) {
                        if (
                          ((d.bra = d.cursor), (n = d.cursor), _("u", "U", i))
                        )
                          break;
                        if (((d.cursor = n), _("i", "I", i))) break;
                      }
                      if (((d.cursor = i), d.cursor >= d.limit))
                        return void (d.cursor = r);
                      d.cursor++;
                    }
                })(),
                (d.cursor = w),
                (r = d.cursor),
                (o = d.limit),
                (n = o),
                (e = o),
                p(),
                (d.cursor = r),
                k() && ((n = d.cursor), k() && (e = d.cursor)),
                (d.limit_backward = w),
                (d.cursor = d.limit),
                (function () {
                  var e;
                  if (
                    ((d.ket = d.cursor),
                    d.find_among_b(a, 37) &&
                      ((d.bra = d.cursor), (e = d.find_among_b(u, 5)) && h()))
                  )
                    switch (e) {
                      case 1:
                        d.slice_del();
                        break;
                      case 2:
                        d.slice_from("e");
                    }
                })(),
                (d.cursor = d.limit),
                C() ||
                  ((d.cursor = d.limit),
                  d.cursor >= o &&
                    ((c = d.limit_backward),
                    (d.limit_backward = o),
                    (d.ket = d.cursor),
                    (i = d.find_among_b(m, 87)) &&
                      ((d.bra = d.cursor), 1 == i && d.slice_del()),
                    (d.limit_backward = c))),
                (d.cursor = d.limit),
                z(),
                (d.cursor = d.limit_backward),
                (function () {
                  for (var e; (d.bra = d.cursor), (e = d.find_among(s, 3)); )
                    switch (((d.ket = d.cursor), e)) {
                      case 1:
                        d.slice_from("i");
                        break;
                      case 2:
                        d.slice_from("u");
                        break;
                      case 3:
                        if (d.cursor >= d.limit) return;
                        d.cursor++;
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
      e.Pipeline.registerFunction(e.it.stemmer, "stemmer-it"),
      (e.it.stopWordFilter = e.generateStopWordFilter(
        "a abbia abbiamo abbiano abbiate ad agl agli ai al all alla alle allo anche avemmo avendo avesse avessero avessi avessimo aveste avesti avete aveva avevamo avevano avevate avevi avevo avrai avranno avrebbe avrebbero avrei avremmo avremo avreste avresti avrete avrà avrò avuta avute avuti avuto c che chi ci coi col come con contro cui da dagl dagli dai dal dall dalla dalle dallo degl degli dei del dell della delle dello di dov dove e ebbe ebbero ebbi ed era erano eravamo eravate eri ero essendo faccia facciamo facciano facciate faccio facemmo facendo facesse facessero facessi facessimo faceste facesti faceva facevamo facevano facevate facevi facevo fai fanno farai faranno farebbe farebbero farei faremmo faremo fareste faresti farete farà farò fece fecero feci fosse fossero fossi fossimo foste fosti fu fui fummo furono gli ha hai hanno ho i il in io l la le lei li lo loro lui ma mi mia mie miei mio ne negl negli nei nel nell nella nelle nello noi non nostra nostre nostri nostro o per perché più quale quanta quante quanti quanto quella quelle quelli quello questa queste questi questo sarai saranno sarebbe sarebbero sarei saremmo saremo sareste saresti sarete sarà sarò se sei si sia siamo siano siate siete sono sta stai stando stanno starai staranno starebbe starebbero starei staremmo staremo stareste staresti starete starà starò stava stavamo stavano stavate stavi stavo stemmo stesse stessero stessi stessimo steste stesti stette stettero stetti stia stiamo stiano stiate sto su sua sue sugl sugli sui sul sull sulla sulle sullo suo suoi ti tra tu tua tue tuo tuoi tutti tutto un una uno vi voi vostra vostre vostri vostro è".split(
          " ",
        ),
      )),
      e.Pipeline.registerFunction(e.it.stopWordFilter, "stopWordFilter-it");
  };
});
