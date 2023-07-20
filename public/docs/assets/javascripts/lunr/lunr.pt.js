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
    var r, s, n;
    (e.pt = function () {
      this.pipeline.reset(),
        this.pipeline.add(e.pt.trimmer, e.pt.stopWordFilter, e.pt.stemmer),
        this.searchPipeline &&
          (this.searchPipeline.reset(), this.searchPipeline.add(e.pt.stemmer));
    }),
      (e.pt.wordCharacters =
        "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞭꞰ-ꞷꟷ-ꟿꬰ-ꭚꭜ-ꭤﬀ-ﬆＡ-Ｚａ-ｚ"),
      (e.pt.trimmer = e.trimmerSupport.generateTrimmer(e.pt.wordCharacters)),
      e.Pipeline.registerFunction(e.pt.trimmer, "trimmer-pt"),
      (e.pt.stemmer =
        ((r = e.stemmerSupport.Among),
        (s = e.stemmerSupport.SnowballProgram),
        (n = new (function () {
          var e,
            n,
            i,
            o = [new r("", -1, 3), new r("ã", 0, 1), new r("õ", 0, 2)],
            a = [new r("", -1, 3), new r("a~", 0, 1), new r("o~", 0, 2)],
            t = [
              new r("ic", -1, -1),
              new r("ad", -1, -1),
              new r("os", -1, -1),
              new r("iv", -1, 1),
            ],
            u = [
              new r("ante", -1, 1),
              new r("avel", -1, 1),
              new r("ível", -1, 1),
            ],
            w = [new r("ic", -1, 1), new r("abil", -1, 1), new r("iv", -1, 1)],
            m = [
              new r("ica", -1, 1),
              new r("ância", -1, 1),
              new r("ência", -1, 4),
              new r("ira", -1, 9),
              new r("adora", -1, 1),
              new r("osa", -1, 1),
              new r("ista", -1, 1),
              new r("iva", -1, 8),
              new r("eza", -1, 1),
              new r("logía", -1, 2),
              new r("idade", -1, 7),
              new r("ante", -1, 1),
              new r("mente", -1, 6),
              new r("amente", 12, 5),
              new r("ável", -1, 1),
              new r("ível", -1, 1),
              new r("ución", -1, 3),
              new r("ico", -1, 1),
              new r("ismo", -1, 1),
              new r("oso", -1, 1),
              new r("amento", -1, 1),
              new r("imento", -1, 1),
              new r("ivo", -1, 8),
              new r("aça~o", -1, 1),
              new r("ador", -1, 1),
              new r("icas", -1, 1),
              new r("ências", -1, 4),
              new r("iras", -1, 9),
              new r("adoras", -1, 1),
              new r("osas", -1, 1),
              new r("istas", -1, 1),
              new r("ivas", -1, 8),
              new r("ezas", -1, 1),
              new r("logías", -1, 2),
              new r("idades", -1, 7),
              new r("uciones", -1, 3),
              new r("adores", -1, 1),
              new r("antes", -1, 1),
              new r("aço~es", -1, 1),
              new r("icos", -1, 1),
              new r("ismos", -1, 1),
              new r("osos", -1, 1),
              new r("amentos", -1, 1),
              new r("imentos", -1, 1),
              new r("ivos", -1, 8),
            ],
            c = [
              new r("ada", -1, 1),
              new r("ida", -1, 1),
              new r("ia", -1, 1),
              new r("aria", 2, 1),
              new r("eria", 2, 1),
              new r("iria", 2, 1),
              new r("ara", -1, 1),
              new r("era", -1, 1),
              new r("ira", -1, 1),
              new r("ava", -1, 1),
              new r("asse", -1, 1),
              new r("esse", -1, 1),
              new r("isse", -1, 1),
              new r("aste", -1, 1),
              new r("este", -1, 1),
              new r("iste", -1, 1),
              new r("ei", -1, 1),
              new r("arei", 16, 1),
              new r("erei", 16, 1),
              new r("irei", 16, 1),
              new r("am", -1, 1),
              new r("iam", 20, 1),
              new r("ariam", 21, 1),
              new r("eriam", 21, 1),
              new r("iriam", 21, 1),
              new r("aram", 20, 1),
              new r("eram", 20, 1),
              new r("iram", 20, 1),
              new r("avam", 20, 1),
              new r("em", -1, 1),
              new r("arem", 29, 1),
              new r("erem", 29, 1),
              new r("irem", 29, 1),
              new r("assem", 29, 1),
              new r("essem", 29, 1),
              new r("issem", 29, 1),
              new r("ado", -1, 1),
              new r("ido", -1, 1),
              new r("ando", -1, 1),
              new r("endo", -1, 1),
              new r("indo", -1, 1),
              new r("ara~o", -1, 1),
              new r("era~o", -1, 1),
              new r("ira~o", -1, 1),
              new r("ar", -1, 1),
              new r("er", -1, 1),
              new r("ir", -1, 1),
              new r("as", -1, 1),
              new r("adas", 47, 1),
              new r("idas", 47, 1),
              new r("ias", 47, 1),
              new r("arias", 50, 1),
              new r("erias", 50, 1),
              new r("irias", 50, 1),
              new r("aras", 47, 1),
              new r("eras", 47, 1),
              new r("iras", 47, 1),
              new r("avas", 47, 1),
              new r("es", -1, 1),
              new r("ardes", 58, 1),
              new r("erdes", 58, 1),
              new r("irdes", 58, 1),
              new r("ares", 58, 1),
              new r("eres", 58, 1),
              new r("ires", 58, 1),
              new r("asses", 58, 1),
              new r("esses", 58, 1),
              new r("isses", 58, 1),
              new r("astes", 58, 1),
              new r("estes", 58, 1),
              new r("istes", 58, 1),
              new r("is", -1, 1),
              new r("ais", 71, 1),
              new r("eis", 71, 1),
              new r("areis", 73, 1),
              new r("ereis", 73, 1),
              new r("ireis", 73, 1),
              new r("áreis", 73, 1),
              new r("éreis", 73, 1),
              new r("íreis", 73, 1),
              new r("ásseis", 73, 1),
              new r("ésseis", 73, 1),
              new r("ísseis", 73, 1),
              new r("áveis", 73, 1),
              new r("íeis", 73, 1),
              new r("aríeis", 84, 1),
              new r("eríeis", 84, 1),
              new r("iríeis", 84, 1),
              new r("ados", -1, 1),
              new r("idos", -1, 1),
              new r("amos", -1, 1),
              new r("áramos", 90, 1),
              new r("éramos", 90, 1),
              new r("íramos", 90, 1),
              new r("ávamos", 90, 1),
              new r("íamos", 90, 1),
              new r("aríamos", 95, 1),
              new r("eríamos", 95, 1),
              new r("iríamos", 95, 1),
              new r("emos", -1, 1),
              new r("aremos", 99, 1),
              new r("eremos", 99, 1),
              new r("iremos", 99, 1),
              new r("ássemos", 99, 1),
              new r("êssemos", 99, 1),
              new r("íssemos", 99, 1),
              new r("imos", -1, 1),
              new r("armos", -1, 1),
              new r("ermos", -1, 1),
              new r("irmos", -1, 1),
              new r("ámos", -1, 1),
              new r("arás", -1, 1),
              new r("erás", -1, 1),
              new r("irás", -1, 1),
              new r("eu", -1, 1),
              new r("iu", -1, 1),
              new r("ou", -1, 1),
              new r("ará", -1, 1),
              new r("erá", -1, 1),
              new r("irá", -1, 1),
            ],
            l = [
              new r("a", -1, 1),
              new r("i", -1, 1),
              new r("o", -1, 1),
              new r("os", -1, 1),
              new r("á", -1, 1),
              new r("í", -1, 1),
              new r("ó", -1, 1),
            ],
            f = [
              new r("e", -1, 1),
              new r("ç", -1, 2),
              new r("é", -1, 1),
              new r("ê", -1, 1),
            ],
            d = [
              17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 19, 12, 2,
            ],
            v = new s();
          function p() {
            if (v.out_grouping(d, 97, 250)) {
              for (; !v.in_grouping(d, 97, 250); ) {
                if (v.cursor >= v.limit) return !0;
                v.cursor++;
              }
              return !1;
            }
            return !0;
          }
          function _() {
            var e,
              r,
              s = v.cursor;
            if (v.in_grouping(d, 97, 250))
              if (((e = v.cursor), p())) {
                if (
                  ((v.cursor = e),
                  (function () {
                    if (v.in_grouping(d, 97, 250))
                      for (; !v.out_grouping(d, 97, 250); ) {
                        if (v.cursor >= v.limit) return !1;
                        v.cursor++;
                      }
                    return (i = v.cursor), !0;
                  })())
                )
                  return;
              } else i = v.cursor;
            if (((v.cursor = s), v.out_grouping(d, 97, 250))) {
              if (((r = v.cursor), p())) {
                if (
                  ((v.cursor = r),
                  !v.in_grouping(d, 97, 250) || v.cursor >= v.limit)
                )
                  return;
                v.cursor++;
              }
              i = v.cursor;
            }
          }
          function h() {
            for (; !v.in_grouping(d, 97, 250); ) {
              if (v.cursor >= v.limit) return !1;
              v.cursor++;
            }
            for (; !v.out_grouping(d, 97, 250); ) {
              if (v.cursor >= v.limit) return !1;
              v.cursor++;
            }
            return !0;
          }
          function b() {
            return i <= v.cursor;
          }
          function g() {
            return e <= v.cursor;
          }
          function k() {
            var e;
            if (((v.ket = v.cursor), !(e = v.find_among_b(m, 45)))) return !1;
            switch (((v.bra = v.cursor), e)) {
              case 1:
                if (!g()) return !1;
                v.slice_del();
                break;
              case 2:
                if (!g()) return !1;
                v.slice_from("log");
                break;
              case 3:
                if (!g()) return !1;
                v.slice_from("u");
                break;
              case 4:
                if (!g()) return !1;
                v.slice_from("ente");
                break;
              case 5:
                if (!(n <= v.cursor)) return !1;
                v.slice_del(),
                  (v.ket = v.cursor),
                  (e = v.find_among_b(t, 4)) &&
                    ((v.bra = v.cursor),
                    g() &&
                      (v.slice_del(),
                      1 == e &&
                        ((v.ket = v.cursor),
                        v.eq_s_b(2, "at") &&
                          ((v.bra = v.cursor), g() && v.slice_del()))));
                break;
              case 6:
                if (!g()) return !1;
                v.slice_del(),
                  (v.ket = v.cursor),
                  (e = v.find_among_b(u, 3)) &&
                    ((v.bra = v.cursor), 1 == e && g() && v.slice_del());
                break;
              case 7:
                if (!g()) return !1;
                v.slice_del(),
                  (v.ket = v.cursor),
                  (e = v.find_among_b(w, 3)) &&
                    ((v.bra = v.cursor), 1 == e && g() && v.slice_del());
                break;
              case 8:
                if (!g()) return !1;
                v.slice_del(),
                  (v.ket = v.cursor),
                  v.eq_s_b(2, "at") &&
                    ((v.bra = v.cursor), g() && v.slice_del());
                break;
              case 9:
                if (!b() || !v.eq_s_b(1, "e")) return !1;
                v.slice_from("ir");
            }
            return !0;
          }
          function q(e, r) {
            if (v.eq_s_b(1, e)) {
              v.bra = v.cursor;
              var s = v.limit - v.cursor;
              if (v.eq_s_b(1, r))
                return (v.cursor = v.limit - s), b() && v.slice_del(), !1;
            }
            return !0;
          }
          function j() {
            if (
              !k() &&
              ((v.cursor = v.limit),
              !(function () {
                var e, r;
                if (v.cursor >= i) {
                  if (
                    ((r = v.limit_backward),
                    (v.limit_backward = i),
                    (v.ket = v.cursor),
                    (e = v.find_among_b(c, 120)))
                  )
                    return (
                      (v.bra = v.cursor),
                      1 == e && v.slice_del(),
                      (v.limit_backward = r),
                      !0
                    );
                  v.limit_backward = r;
                }
                return !1;
              })())
            )
              return (
                (v.cursor = v.limit),
                (v.ket = v.cursor),
                void (
                  (e = v.find_among_b(l, 7)) &&
                  ((v.bra = v.cursor), 1 == e && b() && v.slice_del())
                )
              );
            var e;
            (v.cursor = v.limit),
              (v.ket = v.cursor),
              v.eq_s_b(1, "i") &&
                ((v.bra = v.cursor),
                v.eq_s_b(1, "c") &&
                  ((v.cursor = v.limit), b() && v.slice_del()));
          }
          (this.setCurrent = function (e) {
            v.setCurrent(e);
          }),
            (this.getCurrent = function () {
              return v.getCurrent();
            }),
            (this.stem = function () {
              var r,
                s = v.cursor;
              return (
                (function () {
                  for (var e; ; ) {
                    if (((v.bra = v.cursor), (e = v.find_among(o, 3))))
                      switch (((v.ket = v.cursor), e)) {
                        case 1:
                          v.slice_from("a~");
                          continue;
                        case 2:
                          v.slice_from("o~");
                          continue;
                        case 3:
                          if (v.cursor >= v.limit) break;
                          v.cursor++;
                          continue;
                      }
                    break;
                  }
                })(),
                (v.cursor = s),
                (r = v.cursor),
                (i = v.limit),
                (n = i),
                (e = i),
                _(),
                (v.cursor = r),
                h() && ((n = v.cursor), h() && (e = v.cursor)),
                (v.limit_backward = s),
                (v.cursor = v.limit),
                j(),
                (v.cursor = v.limit),
                (function () {
                  var e;
                  if (((v.ket = v.cursor), (e = v.find_among_b(f, 4))))
                    switch (((v.bra = v.cursor), e)) {
                      case 1:
                        b() &&
                          (v.slice_del(),
                          (v.ket = v.cursor),
                          v.limit,
                          v.cursor,
                          q("u", "g") && q("i", "c"));
                        break;
                      case 2:
                        v.slice_from("c");
                    }
                })(),
                (v.cursor = v.limit_backward),
                (function () {
                  for (var e; ; ) {
                    if (((v.bra = v.cursor), (e = v.find_among(a, 3))))
                      switch (((v.ket = v.cursor), e)) {
                        case 1:
                          v.slice_from("ã");
                          continue;
                        case 2:
                          v.slice_from("õ");
                          continue;
                        case 3:
                          if (v.cursor >= v.limit) break;
                          v.cursor++;
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
      e.Pipeline.registerFunction(e.pt.stemmer, "stemmer-pt"),
      (e.pt.stopWordFilter = e.generateStopWordFilter(
        "a ao aos aquela aquelas aquele aqueles aquilo as até com como da das de dela delas dele deles depois do dos e ela elas ele eles em entre era eram essa essas esse esses esta estamos estas estava estavam este esteja estejam estejamos estes esteve estive estivemos estiver estivera estiveram estiverem estivermos estivesse estivessem estivéramos estivéssemos estou está estávamos estão eu foi fomos for fora foram forem formos fosse fossem fui fôramos fôssemos haja hajam hajamos havemos hei houve houvemos houver houvera houveram houverei houverem houveremos houveria houveriam houvermos houverá houverão houveríamos houvesse houvessem houvéramos houvéssemos há hão isso isto já lhe lhes mais mas me mesmo meu meus minha minhas muito na nas nem no nos nossa nossas nosso nossos num numa não nós o os ou para pela pelas pelo pelos por qual quando que quem se seja sejam sejamos sem serei seremos seria seriam será serão seríamos seu seus somos sou sua suas são só também te tem temos tenha tenham tenhamos tenho terei teremos teria teriam terá terão teríamos teu teus teve tinha tinham tive tivemos tiver tivera tiveram tiverem tivermos tivesse tivessem tivéramos tivéssemos tu tua tuas tém tínhamos um uma você vocês vos à às éramos".split(
          " ",
        ),
      )),
      e.Pipeline.registerFunction(e.pt.stopWordFilter, "stopWordFilter-pt");
  };
});
