!(function (e, s) {
  "function" == typeof define && define.amd
    ? define(s)
    : "object" == typeof exports
    ? (module.exports = s())
    : s()(e.lunr);
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
    var s, r, n;
    (e.es = function () {
      this.pipeline.reset(),
        this.pipeline.add(e.es.trimmer, e.es.stopWordFilter, e.es.stemmer),
        this.searchPipeline &&
          (this.searchPipeline.reset(), this.searchPipeline.add(e.es.stemmer));
    }),
      (e.es.wordCharacters =
        "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞭꞰ-ꞷꟷ-ꟿꬰ-ꭚꭜ-ꭤﬀ-ﬆＡ-Ｚａ-ｚ"),
      (e.es.trimmer = e.trimmerSupport.generateTrimmer(e.es.wordCharacters)),
      e.Pipeline.registerFunction(e.es.trimmer, "trimmer-es"),
      (e.es.stemmer =
        ((s = e.stemmerSupport.Among),
        (r = e.stemmerSupport.SnowballProgram),
        (n = new (function () {
          var e,
            n,
            i,
            a = [
              new s("", -1, 6),
              new s("á", 0, 1),
              new s("é", 0, 2),
              new s("í", 0, 3),
              new s("ó", 0, 4),
              new s("ú", 0, 5),
            ],
            t = [
              new s("la", -1, -1),
              new s("sela", 0, -1),
              new s("le", -1, -1),
              new s("me", -1, -1),
              new s("se", -1, -1),
              new s("lo", -1, -1),
              new s("selo", 5, -1),
              new s("las", -1, -1),
              new s("selas", 7, -1),
              new s("les", -1, -1),
              new s("los", -1, -1),
              new s("selos", 10, -1),
              new s("nos", -1, -1),
            ],
            o = [
              new s("ando", -1, 6),
              new s("iendo", -1, 6),
              new s("yendo", -1, 7),
              new s("ándo", -1, 2),
              new s("iéndo", -1, 1),
              new s("ar", -1, 6),
              new s("er", -1, 6),
              new s("ir", -1, 6),
              new s("ár", -1, 3),
              new s("ér", -1, 4),
              new s("ír", -1, 5),
            ],
            u = [
              new s("ic", -1, -1),
              new s("ad", -1, -1),
              new s("os", -1, -1),
              new s("iv", -1, 1),
            ],
            w = [
              new s("able", -1, 1),
              new s("ible", -1, 1),
              new s("ante", -1, 1),
            ],
            c = [new s("ic", -1, 1), new s("abil", -1, 1), new s("iv", -1, 1)],
            m = [
              new s("ica", -1, 1),
              new s("ancia", -1, 2),
              new s("encia", -1, 5),
              new s("adora", -1, 2),
              new s("osa", -1, 1),
              new s("ista", -1, 1),
              new s("iva", -1, 9),
              new s("anza", -1, 1),
              new s("logía", -1, 3),
              new s("idad", -1, 8),
              new s("able", -1, 1),
              new s("ible", -1, 1),
              new s("ante", -1, 2),
              new s("mente", -1, 7),
              new s("amente", 13, 6),
              new s("ación", -1, 2),
              new s("ución", -1, 4),
              new s("ico", -1, 1),
              new s("ismo", -1, 1),
              new s("oso", -1, 1),
              new s("amiento", -1, 1),
              new s("imiento", -1, 1),
              new s("ivo", -1, 9),
              new s("ador", -1, 2),
              new s("icas", -1, 1),
              new s("ancias", -1, 2),
              new s("encias", -1, 5),
              new s("adoras", -1, 2),
              new s("osas", -1, 1),
              new s("istas", -1, 1),
              new s("ivas", -1, 9),
              new s("anzas", -1, 1),
              new s("logías", -1, 3),
              new s("idades", -1, 8),
              new s("ables", -1, 1),
              new s("ibles", -1, 1),
              new s("aciones", -1, 2),
              new s("uciones", -1, 4),
              new s("adores", -1, 2),
              new s("antes", -1, 2),
              new s("icos", -1, 1),
              new s("ismos", -1, 1),
              new s("osos", -1, 1),
              new s("amientos", -1, 1),
              new s("imientos", -1, 1),
              new s("ivos", -1, 9),
            ],
            l = [
              new s("ya", -1, 1),
              new s("ye", -1, 1),
              new s("yan", -1, 1),
              new s("yen", -1, 1),
              new s("yeron", -1, 1),
              new s("yendo", -1, 1),
              new s("yo", -1, 1),
              new s("yas", -1, 1),
              new s("yes", -1, 1),
              new s("yais", -1, 1),
              new s("yamos", -1, 1),
              new s("yó", -1, 1),
            ],
            d = [
              new s("aba", -1, 2),
              new s("ada", -1, 2),
              new s("ida", -1, 2),
              new s("ara", -1, 2),
              new s("iera", -1, 2),
              new s("ía", -1, 2),
              new s("aría", 5, 2),
              new s("ería", 5, 2),
              new s("iría", 5, 2),
              new s("ad", -1, 2),
              new s("ed", -1, 2),
              new s("id", -1, 2),
              new s("ase", -1, 2),
              new s("iese", -1, 2),
              new s("aste", -1, 2),
              new s("iste", -1, 2),
              new s("an", -1, 2),
              new s("aban", 16, 2),
              new s("aran", 16, 2),
              new s("ieran", 16, 2),
              new s("ían", 16, 2),
              new s("arían", 20, 2),
              new s("erían", 20, 2),
              new s("irían", 20, 2),
              new s("en", -1, 1),
              new s("asen", 24, 2),
              new s("iesen", 24, 2),
              new s("aron", -1, 2),
              new s("ieron", -1, 2),
              new s("arán", -1, 2),
              new s("erán", -1, 2),
              new s("irán", -1, 2),
              new s("ado", -1, 2),
              new s("ido", -1, 2),
              new s("ando", -1, 2),
              new s("iendo", -1, 2),
              new s("ar", -1, 2),
              new s("er", -1, 2),
              new s("ir", -1, 2),
              new s("as", -1, 2),
              new s("abas", 39, 2),
              new s("adas", 39, 2),
              new s("idas", 39, 2),
              new s("aras", 39, 2),
              new s("ieras", 39, 2),
              new s("ías", 39, 2),
              new s("arías", 45, 2),
              new s("erías", 45, 2),
              new s("irías", 45, 2),
              new s("es", -1, 1),
              new s("ases", 49, 2),
              new s("ieses", 49, 2),
              new s("abais", -1, 2),
              new s("arais", -1, 2),
              new s("ierais", -1, 2),
              new s("íais", -1, 2),
              new s("aríais", 55, 2),
              new s("eríais", 55, 2),
              new s("iríais", 55, 2),
              new s("aseis", -1, 2),
              new s("ieseis", -1, 2),
              new s("asteis", -1, 2),
              new s("isteis", -1, 2),
              new s("áis", -1, 2),
              new s("éis", -1, 1),
              new s("aréis", 64, 2),
              new s("eréis", 64, 2),
              new s("iréis", 64, 2),
              new s("ados", -1, 2),
              new s("idos", -1, 2),
              new s("amos", -1, 2),
              new s("ábamos", 70, 2),
              new s("áramos", 70, 2),
              new s("iéramos", 70, 2),
              new s("íamos", 70, 2),
              new s("aríamos", 74, 2),
              new s("eríamos", 74, 2),
              new s("iríamos", 74, 2),
              new s("emos", -1, 1),
              new s("aremos", 78, 2),
              new s("eremos", 78, 2),
              new s("iremos", 78, 2),
              new s("ásemos", 78, 2),
              new s("iésemos", 78, 2),
              new s("imos", -1, 2),
              new s("arás", -1, 2),
              new s("erás", -1, 2),
              new s("irás", -1, 2),
              new s("ís", -1, 2),
              new s("ará", -1, 2),
              new s("erá", -1, 2),
              new s("irá", -1, 2),
              new s("aré", -1, 2),
              new s("eré", -1, 2),
              new s("iré", -1, 2),
              new s("ió", -1, 2),
            ],
            b = [
              new s("a", -1, 1),
              new s("e", -1, 2),
              new s("o", -1, 1),
              new s("os", -1, 1),
              new s("á", -1, 1),
              new s("é", -1, 2),
              new s("í", -1, 1),
              new s("ó", -1, 1),
            ],
            f = [
              17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 17, 4, 10,
            ],
            _ = new r();
          function h() {
            if (_.out_grouping(f, 97, 252)) {
              for (; !_.in_grouping(f, 97, 252); ) {
                if (_.cursor >= _.limit) return !0;
                _.cursor++;
              }
              return !1;
            }
            return !0;
          }
          function v() {
            var e,
              s = _.cursor;
            if (
              (function () {
                if (_.in_grouping(f, 97, 252)) {
                  var e = _.cursor;
                  if (h()) {
                    if (((_.cursor = e), !_.in_grouping(f, 97, 252))) return !0;
                    for (; !_.out_grouping(f, 97, 252); ) {
                      if (_.cursor >= _.limit) return !0;
                      _.cursor++;
                    }
                  }
                  return !1;
                }
                return !0;
              })()
            ) {
              if (((_.cursor = s), !_.out_grouping(f, 97, 252))) return;
              if (((e = _.cursor), h())) {
                if (
                  ((_.cursor = e),
                  !_.in_grouping(f, 97, 252) || _.cursor >= _.limit)
                )
                  return;
                _.cursor++;
              }
            }
            i = _.cursor;
          }
          function p() {
            for (; !_.in_grouping(f, 97, 252); ) {
              if (_.cursor >= _.limit) return !1;
              _.cursor++;
            }
            for (; !_.out_grouping(f, 97, 252); ) {
              if (_.cursor >= _.limit) return !1;
              _.cursor++;
            }
            return !0;
          }
          function g() {
            return i <= _.cursor;
          }
          function k() {
            return e <= _.cursor;
          }
          function y(e, s) {
            if (!k()) return !0;
            _.slice_del(), (_.ket = _.cursor);
            var r = _.find_among_b(e, s);
            return (
              r && ((_.bra = _.cursor), 1 == r && k() && _.slice_del()), !1
            );
          }
          function q(e) {
            return (
              !k() ||
              (_.slice_del(),
              (_.ket = _.cursor),
              _.eq_s_b(2, e) && ((_.bra = _.cursor), k() && _.slice_del()),
              !1)
            );
          }
          function C() {
            var e;
            if (((_.ket = _.cursor), (e = _.find_among_b(m, 46)))) {
              switch (((_.bra = _.cursor), e)) {
                case 1:
                  if (!k()) return !1;
                  _.slice_del();
                  break;
                case 2:
                  if (q("ic")) return !1;
                  break;
                case 3:
                  if (!k()) return !1;
                  _.slice_from("log");
                  break;
                case 4:
                  if (!k()) return !1;
                  _.slice_from("u");
                  break;
                case 5:
                  if (!k()) return !1;
                  _.slice_from("ente");
                  break;
                case 6:
                  if (!(n <= _.cursor)) return !1;
                  _.slice_del(),
                    (_.ket = _.cursor),
                    (e = _.find_among_b(u, 4)) &&
                      ((_.bra = _.cursor),
                      k() &&
                        (_.slice_del(),
                        1 == e &&
                          ((_.ket = _.cursor),
                          _.eq_s_b(2, "at") &&
                            ((_.bra = _.cursor), k() && _.slice_del()))));
                  break;
                case 7:
                  if (y(w, 3)) return !1;
                  break;
                case 8:
                  if (y(c, 3)) return !1;
                  break;
                case 9:
                  if (q("at")) return !1;
              }
              return !0;
            }
            return !1;
          }
          (this.setCurrent = function (e) {
            _.setCurrent(e);
          }),
            (this.getCurrent = function () {
              return _.getCurrent();
            }),
            (this.stem = function () {
              var s,
                r = _.cursor;
              return (
                (s = _.cursor),
                (i = _.limit),
                (n = i),
                (e = i),
                v(),
                (_.cursor = s),
                p() && ((n = _.cursor), p() && (e = _.cursor)),
                (_.limit_backward = r),
                (_.cursor = _.limit),
                (function () {
                  var e;
                  if (
                    ((_.ket = _.cursor),
                    _.find_among_b(t, 13) &&
                      ((_.bra = _.cursor), (e = _.find_among_b(o, 11)) && g()))
                  )
                    switch (e) {
                      case 1:
                        (_.bra = _.cursor), _.slice_from("iendo");
                        break;
                      case 2:
                        (_.bra = _.cursor), _.slice_from("ando");
                        break;
                      case 3:
                        (_.bra = _.cursor), _.slice_from("ar");
                        break;
                      case 4:
                        (_.bra = _.cursor), _.slice_from("er");
                        break;
                      case 5:
                        (_.bra = _.cursor), _.slice_from("ir");
                        break;
                      case 6:
                        _.slice_del();
                        break;
                      case 7:
                        _.eq_s_b(1, "u") && _.slice_del();
                    }
                })(),
                (_.cursor = _.limit),
                C() ||
                  ((_.cursor = _.limit),
                  (function () {
                    var e, s;
                    if (
                      _.cursor >= i &&
                      ((s = _.limit_backward),
                      (_.limit_backward = i),
                      (_.ket = _.cursor),
                      (e = _.find_among_b(l, 12)),
                      (_.limit_backward = s),
                      e)
                    ) {
                      if (((_.bra = _.cursor), 1 == e)) {
                        if (!_.eq_s_b(1, "u")) return !1;
                        _.slice_del();
                      }
                      return !0;
                    }
                    return !1;
                  })() ||
                    ((_.cursor = _.limit),
                    (function () {
                      var e, s, r, n;
                      if (
                        _.cursor >= i &&
                        ((s = _.limit_backward),
                        (_.limit_backward = i),
                        (_.ket = _.cursor),
                        (e = _.find_among_b(d, 96)),
                        (_.limit_backward = s),
                        e)
                      )
                        switch (((_.bra = _.cursor), e)) {
                          case 1:
                            (r = _.limit - _.cursor),
                              _.eq_s_b(1, "u")
                                ? ((n = _.limit - _.cursor),
                                  _.eq_s_b(1, "g")
                                    ? (_.cursor = _.limit - n)
                                    : (_.cursor = _.limit - r))
                                : (_.cursor = _.limit - r),
                              (_.bra = _.cursor);
                          case 2:
                            _.slice_del();
                        }
                    })())),
                (_.cursor = _.limit),
                (function () {
                  var e, s;
                  if (((_.ket = _.cursor), (e = _.find_among_b(b, 8))))
                    switch (((_.bra = _.cursor), e)) {
                      case 1:
                        g() && _.slice_del();
                        break;
                      case 2:
                        g() &&
                          (_.slice_del(),
                          (_.ket = _.cursor),
                          _.eq_s_b(1, "u") &&
                            ((_.bra = _.cursor),
                            (s = _.limit - _.cursor),
                            _.eq_s_b(1, "g") &&
                              ((_.cursor = _.limit - s),
                              g() && _.slice_del())));
                    }
                })(),
                (_.cursor = _.limit_backward),
                (function () {
                  for (var e; ; ) {
                    if (((_.bra = _.cursor), (e = _.find_among(a, 6))))
                      switch (((_.ket = _.cursor), e)) {
                        case 1:
                          _.slice_from("a");
                          continue;
                        case 2:
                          _.slice_from("e");
                          continue;
                        case 3:
                          _.slice_from("i");
                          continue;
                        case 4:
                          _.slice_from("o");
                          continue;
                        case 5:
                          _.slice_from("u");
                          continue;
                        case 6:
                          if (_.cursor >= _.limit) break;
                          _.cursor++;
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
      e.Pipeline.registerFunction(e.es.stemmer, "stemmer-es"),
      (e.es.stopWordFilter = e.generateStopWordFilter(
        "a al algo algunas algunos ante antes como con contra cual cuando de del desde donde durante e el ella ellas ellos en entre era erais eran eras eres es esa esas ese eso esos esta estaba estabais estaban estabas estad estada estadas estado estados estamos estando estar estaremos estará estarán estarás estaré estaréis estaría estaríais estaríamos estarían estarías estas este estemos esto estos estoy estuve estuviera estuvierais estuvieran estuvieras estuvieron estuviese estuvieseis estuviesen estuvieses estuvimos estuviste estuvisteis estuviéramos estuviésemos estuvo está estábamos estáis están estás esté estéis estén estés fue fuera fuerais fueran fueras fueron fuese fueseis fuesen fueses fui fuimos fuiste fuisteis fuéramos fuésemos ha habida habidas habido habidos habiendo habremos habrá habrán habrás habré habréis habría habríais habríamos habrían habrías habéis había habíais habíamos habían habías han has hasta hay haya hayamos hayan hayas hayáis he hemos hube hubiera hubierais hubieran hubieras hubieron hubiese hubieseis hubiesen hubieses hubimos hubiste hubisteis hubiéramos hubiésemos hubo la las le les lo los me mi mis mucho muchos muy más mí mía mías mío míos nada ni no nos nosotras nosotros nuestra nuestras nuestro nuestros o os otra otras otro otros para pero poco por porque que quien quienes qué se sea seamos sean seas seremos será serán serás seré seréis sería seríais seríamos serían serías seáis sido siendo sin sobre sois somos son soy su sus suya suyas suyo suyos sí también tanto te tendremos tendrá tendrán tendrás tendré tendréis tendría tendríais tendríamos tendrían tendrías tened tenemos tenga tengamos tengan tengas tengo tengáis tenida tenidas tenido tenidos teniendo tenéis tenía teníais teníamos tenían tenías ti tiene tienen tienes todo todos tu tus tuve tuviera tuvierais tuvieran tuvieras tuvieron tuviese tuvieseis tuviesen tuvieses tuvimos tuviste tuvisteis tuviéramos tuviésemos tuvo tuya tuyas tuyo tuyos tú un una uno unos vosotras vosotros vuestra vuestras vuestro vuestros y ya yo él éramos".split(
          " ",
        ),
      )),
      e.Pipeline.registerFunction(e.es.stopWordFilter, "stopWordFilter-es");
  };
});
