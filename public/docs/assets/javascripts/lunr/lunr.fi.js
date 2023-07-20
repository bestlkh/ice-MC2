!(function (i, e) {
  "function" == typeof define && define.amd
    ? define(e)
    : "object" == typeof exports
    ? (module.exports = e())
    : e()(i.lunr);
})(this, function () {
  return function (i) {
    if (void 0 === i)
      throw new Error(
        "Lunr is not present. Please include / require Lunr before this script.",
      );
    if (void 0 === i.stemmerSupport)
      throw new Error(
        "Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.",
      );
    var e, r, n;
    (i.fi = function () {
      this.pipeline.reset(),
        this.pipeline.add(i.fi.trimmer, i.fi.stopWordFilter, i.fi.stemmer),
        this.searchPipeline &&
          (this.searchPipeline.reset(), this.searchPipeline.add(i.fi.stemmer));
    }),
      (i.fi.wordCharacters =
        "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞭꞰ-ꞷꟷ-ꟿꬰ-ꭚꭜ-ꭤﬀ-ﬆＡ-Ｚａ-ｚ"),
      (i.fi.trimmer = i.trimmerSupport.generateTrimmer(i.fi.wordCharacters)),
      i.Pipeline.registerFunction(i.fi.trimmer, "trimmer-fi"),
      (i.fi.stemmer =
        ((e = i.stemmerSupport.Among),
        (r = i.stemmerSupport.SnowballProgram),
        (n = new (function () {
          var i,
            n,
            t,
            s,
            l = [
              new e("pa", -1, 1),
              new e("sti", -1, 2),
              new e("kaan", -1, 1),
              new e("han", -1, 1),
              new e("kin", -1, 1),
              new e("hän", -1, 1),
              new e("kään", -1, 1),
              new e("ko", -1, 1),
              new e("pä", -1, 1),
              new e("kö", -1, 1),
            ],
            o = [
              new e("lla", -1, -1),
              new e("na", -1, -1),
              new e("ssa", -1, -1),
              new e("ta", -1, -1),
              new e("lta", 3, -1),
              new e("sta", 3, -1),
            ],
            a = [
              new e("llä", -1, -1),
              new e("nä", -1, -1),
              new e("ssä", -1, -1),
              new e("tä", -1, -1),
              new e("ltä", 3, -1),
              new e("stä", 3, -1),
            ],
            u = [new e("lle", -1, -1), new e("ine", -1, -1)],
            c = [
              new e("nsa", -1, 3),
              new e("mme", -1, 3),
              new e("nne", -1, 3),
              new e("ni", -1, 2),
              new e("si", -1, 1),
              new e("an", -1, 4),
              new e("en", -1, 6),
              new e("än", -1, 5),
              new e("nsä", -1, 3),
            ],
            m = [
              new e("aa", -1, -1),
              new e("ee", -1, -1),
              new e("ii", -1, -1),
              new e("oo", -1, -1),
              new e("uu", -1, -1),
              new e("ää", -1, -1),
              new e("öö", -1, -1),
            ],
            w = [
              new e("a", -1, 8),
              new e("lla", 0, -1),
              new e("na", 0, -1),
              new e("ssa", 0, -1),
              new e("ta", 0, -1),
              new e("lta", 4, -1),
              new e("sta", 4, -1),
              new e("tta", 4, 9),
              new e("lle", -1, -1),
              new e("ine", -1, -1),
              new e("ksi", -1, -1),
              new e("n", -1, 7),
              new e("han", 11, 1),
              new e("den", 11, -1, C),
              new e("seen", 11, -1, v),
              new e("hen", 11, 2),
              new e("tten", 11, -1, C),
              new e("hin", 11, 3),
              new e("siin", 11, -1, C),
              new e("hon", 11, 4),
              new e("hän", 11, 5),
              new e("hön", 11, 6),
              new e("ä", -1, 8),
              new e("llä", 22, -1),
              new e("nä", 22, -1),
              new e("ssä", 22, -1),
              new e("tä", 22, -1),
              new e("ltä", 26, -1),
              new e("stä", 26, -1),
              new e("ttä", 26, 9),
            ],
            _ = [
              new e("eja", -1, -1),
              new e("mma", -1, 1),
              new e("imma", 1, -1),
              new e("mpa", -1, 1),
              new e("impa", 3, -1),
              new e("mmi", -1, 1),
              new e("immi", 5, -1),
              new e("mpi", -1, 1),
              new e("impi", 7, -1),
              new e("ejä", -1, -1),
              new e("mmä", -1, 1),
              new e("immä", 10, -1),
              new e("mpä", -1, 1),
              new e("impä", 12, -1),
            ],
            k = [new e("i", -1, -1), new e("j", -1, -1)],
            b = [new e("mma", -1, 1), new e("imma", 0, -1)],
            d = [17, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
            f = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32],
            h = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32],
            p = [17, 97, 24, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32],
            g = new r();
          function j() {
            for (var i; (i = g.cursor), !g.in_grouping(f, 97, 246); ) {
              if (((g.cursor = i), i >= g.limit)) return !0;
              g.cursor++;
            }
            for (g.cursor = i; !g.out_grouping(f, 97, 246); ) {
              if (g.cursor >= g.limit) return !0;
              g.cursor++;
            }
            return !1;
          }
          function q() {
            var i, e;
            if (g.cursor >= s)
              if (
                ((e = g.limit_backward),
                (g.limit_backward = s),
                (g.ket = g.cursor),
                (i = g.find_among_b(l, 10)))
              ) {
                switch (((g.bra = g.cursor), (g.limit_backward = e), i)) {
                  case 1:
                    if (!g.in_grouping_b(p, 97, 246)) return;
                    break;
                  case 2:
                    if (!(t <= g.cursor)) return;
                }
                g.slice_del();
              } else g.limit_backward = e;
          }
          function v() {
            return g.find_among_b(m, 7);
          }
          function C() {
            return g.eq_s_b(1, "i") && g.in_grouping_b(h, 97, 246);
          }
          (this.setCurrent = function (i) {
            g.setCurrent(i);
          }),
            (this.getCurrent = function () {
              return g.getCurrent();
            }),
            (this.stem = function () {
              var e,
                r = g.cursor;
              return (
                (s = g.limit),
                (t = s),
                j() || ((s = g.cursor), j() || (t = g.cursor)),
                (i = !1),
                (g.limit_backward = r),
                (g.cursor = g.limit),
                q(),
                (g.cursor = g.limit),
                (function () {
                  var i, e, r;
                  if (g.cursor >= s)
                    if (
                      ((e = g.limit_backward),
                      (g.limit_backward = s),
                      (g.ket = g.cursor),
                      (i = g.find_among_b(c, 9)))
                    )
                      switch (((g.bra = g.cursor), (g.limit_backward = e), i)) {
                        case 1:
                          (r = g.limit - g.cursor),
                            g.eq_s_b(1, "k") ||
                              ((g.cursor = g.limit - r), g.slice_del());
                          break;
                        case 2:
                          g.slice_del(),
                            (g.ket = g.cursor),
                            g.eq_s_b(3, "kse") &&
                              ((g.bra = g.cursor), g.slice_from("ksi"));
                          break;
                        case 3:
                          g.slice_del();
                          break;
                        case 4:
                          g.find_among_b(o, 6) && g.slice_del();
                          break;
                        case 5:
                          g.find_among_b(a, 6) && g.slice_del();
                          break;
                        case 6:
                          g.find_among_b(u, 2) && g.slice_del();
                      }
                    else g.limit_backward = e;
                })(),
                (g.cursor = g.limit),
                (function () {
                  var e, r, n;
                  if (g.cursor >= s)
                    if (
                      ((r = g.limit_backward),
                      (g.limit_backward = s),
                      (g.ket = g.cursor),
                      (e = g.find_among_b(w, 30)))
                    ) {
                      switch (((g.bra = g.cursor), (g.limit_backward = r), e)) {
                        case 1:
                          if (!g.eq_s_b(1, "a")) return;
                          break;
                        case 2:
                        case 9:
                          if (!g.eq_s_b(1, "e")) return;
                          break;
                        case 3:
                          if (!g.eq_s_b(1, "i")) return;
                          break;
                        case 4:
                          if (!g.eq_s_b(1, "o")) return;
                          break;
                        case 5:
                          if (!g.eq_s_b(1, "ä")) return;
                          break;
                        case 6:
                          if (!g.eq_s_b(1, "ö")) return;
                          break;
                        case 7:
                          if (
                            ((n = g.limit - g.cursor),
                            !v() &&
                              ((g.cursor = g.limit - n), !g.eq_s_b(2, "ie")))
                          ) {
                            g.cursor = g.limit - n;
                            break;
                          }
                          if (
                            ((g.cursor = g.limit - n),
                            g.cursor <= g.limit_backward)
                          ) {
                            g.cursor = g.limit - n;
                            break;
                          }
                          g.cursor--, (g.bra = g.cursor);
                          break;
                        case 8:
                          if (
                            !g.in_grouping_b(f, 97, 246) ||
                            !g.out_grouping_b(f, 97, 246)
                          )
                            return;
                      }
                      g.slice_del(), (i = !0);
                    } else g.limit_backward = r;
                })(),
                (g.cursor = g.limit),
                (function () {
                  var i, e, r;
                  if (g.cursor >= t)
                    if (
                      ((e = g.limit_backward),
                      (g.limit_backward = t),
                      (g.ket = g.cursor),
                      (i = g.find_among_b(_, 14)))
                    ) {
                      if (
                        ((g.bra = g.cursor), (g.limit_backward = e), 1 == i)
                      ) {
                        if (((r = g.limit - g.cursor), g.eq_s_b(2, "po")))
                          return;
                        g.cursor = g.limit - r;
                      }
                      g.slice_del();
                    } else g.limit_backward = e;
                })(),
                (g.cursor = g.limit),
                i
                  ? (g.cursor >= s &&
                      ((e = g.limit_backward),
                      (g.limit_backward = s),
                      (g.ket = g.cursor),
                      g.find_among_b(k, 2)
                        ? ((g.bra = g.cursor),
                          (g.limit_backward = e),
                          g.slice_del())
                        : (g.limit_backward = e)),
                    (g.cursor = g.limit))
                  : ((g.cursor = g.limit),
                    (function () {
                      var i, e, r, n, l, o;
                      if (g.cursor >= s) {
                        if (
                          ((e = g.limit_backward),
                          (g.limit_backward = s),
                          (g.ket = g.cursor),
                          g.eq_s_b(1, "t") &&
                            ((g.bra = g.cursor),
                            (r = g.limit - g.cursor),
                            g.in_grouping_b(f, 97, 246) &&
                              ((g.cursor = g.limit - r),
                              g.slice_del(),
                              (g.limit_backward = e),
                              (n = g.limit - g.cursor),
                              g.cursor >= t &&
                                ((g.cursor = t),
                                (l = g.limit_backward),
                                (g.limit_backward = g.cursor),
                                (g.cursor = g.limit - n),
                                (g.ket = g.cursor),
                                (i = g.find_among_b(b, 2))))))
                        ) {
                          if (
                            ((g.bra = g.cursor), (g.limit_backward = l), 1 == i)
                          ) {
                            if (((o = g.limit - g.cursor), g.eq_s_b(2, "po")))
                              return;
                            g.cursor = g.limit - o;
                          }
                          return void g.slice_del();
                        }
                        g.limit_backward = e;
                      }
                    })(),
                    (g.cursor = g.limit)),
                (function () {
                  var i, e, r, t;
                  if (g.cursor >= s) {
                    for (
                      i = g.limit_backward,
                        g.limit_backward = s,
                        e = g.limit - g.cursor,
                        v() &&
                          ((g.cursor = g.limit - e),
                          (g.ket = g.cursor),
                          g.cursor > g.limit_backward &&
                            (g.cursor--, (g.bra = g.cursor), g.slice_del())),
                        g.cursor = g.limit - e,
                        g.ket = g.cursor,
                        g.in_grouping_b(d, 97, 228) &&
                          ((g.bra = g.cursor),
                          g.out_grouping_b(f, 97, 246) && g.slice_del()),
                        g.cursor = g.limit - e,
                        g.ket = g.cursor,
                        g.eq_s_b(1, "j") &&
                          ((g.bra = g.cursor),
                          (r = g.limit - g.cursor),
                          g.eq_s_b(1, "o")
                            ? g.slice_del()
                            : ((g.cursor = g.limit - r),
                              g.eq_s_b(1, "u") && g.slice_del())),
                        g.cursor = g.limit - e,
                        g.ket = g.cursor,
                        g.eq_s_b(1, "o") &&
                          ((g.bra = g.cursor),
                          g.eq_s_b(1, "j") && g.slice_del()),
                        g.cursor = g.limit - e,
                        g.limit_backward = i;
                      ;

                    ) {
                      if (
                        ((t = g.limit - g.cursor), g.out_grouping_b(f, 97, 246))
                      ) {
                        g.cursor = g.limit - t;
                        break;
                      }
                      if (
                        ((g.cursor = g.limit - t), g.cursor <= g.limit_backward)
                      )
                        return;
                      g.cursor--;
                    }
                    (g.ket = g.cursor),
                      g.cursor > g.limit_backward &&
                        (g.cursor--,
                        (g.bra = g.cursor),
                        (n = g.slice_to()),
                        g.eq_v_b(n) && g.slice_del());
                  }
                })(),
                !0
              );
            });
        })()),
        function (i) {
          return "function" == typeof i.update
            ? i.update(function (i) {
                return n.setCurrent(i), n.stem(), n.getCurrent();
              })
            : (n.setCurrent(i), n.stem(), n.getCurrent());
        })),
      i.Pipeline.registerFunction(i.fi.stemmer, "stemmer-fi"),
      (i.fi.stopWordFilter = i.generateStopWordFilter(
        "ei eivät emme en et ette että he heidän heidät heihin heille heillä heiltä heissä heistä heitä hän häneen hänelle hänellä häneltä hänen hänessä hänestä hänet häntä itse ja johon joiden joihin joiksi joilla joille joilta joina joissa joista joita joka joksi jolla jolle jolta jona jonka jos jossa josta jota jotka kanssa keiden keihin keiksi keille keillä keiltä keinä keissä keistä keitä keneen keneksi kenelle kenellä keneltä kenen kenenä kenessä kenestä kenet ketkä ketkä ketä koska kuin kuka kun me meidän meidät meihin meille meillä meiltä meissä meistä meitä mihin miksi mikä mille millä miltä minkä minkä minua minulla minulle minulta minun minussa minusta minut minuun minä minä missä mistä mitkä mitä mukaan mutta ne niiden niihin niiksi niille niillä niiltä niin niin niinä niissä niistä niitä noiden noihin noiksi noilla noille noilta noin noina noissa noista noita nuo nyt näiden näihin näiksi näille näillä näiltä näinä näissä näistä näitä nämä ole olemme olen olet olette oli olimme olin olisi olisimme olisin olisit olisitte olisivat olit olitte olivat olla olleet ollut on ovat poikki se sekä sen siihen siinä siitä siksi sille sillä sillä siltä sinua sinulla sinulle sinulta sinun sinussa sinusta sinut sinuun sinä sinä sitä tai te teidän teidät teihin teille teillä teiltä teissä teistä teitä tuo tuohon tuoksi tuolla tuolle tuolta tuon tuona tuossa tuosta tuota tähän täksi tälle tällä tältä tämä tämän tänä tässä tästä tätä vaan vai vaikka yli".split(
          " ",
        ),
      )),
      i.Pipeline.registerFunction(i.fi.stopWordFilter, "stopWordFilter-fi");
  };
});
