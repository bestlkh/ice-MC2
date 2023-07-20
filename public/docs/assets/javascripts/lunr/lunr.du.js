!(function (r, e) {
  "function" == typeof define && define.amd
    ? define(e)
    : "object" == typeof exports
    ? (module.exports = e())
    : e()(r.lunr);
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
    var e, i, n;
    (r.du = function () {
      this.pipeline.reset(),
        this.pipeline.add(r.du.trimmer, r.du.stopWordFilter, r.du.stemmer),
        this.searchPipeline &&
          (this.searchPipeline.reset(), this.searchPipeline.add(r.du.stemmer));
    }),
      (r.du.wordCharacters =
        "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞭꞰ-ꞷꟷ-ꟿꬰ-ꭚꭜ-ꭤﬀ-ﬆＡ-Ｚａ-ｚ"),
      (r.du.trimmer = r.trimmerSupport.generateTrimmer(r.du.wordCharacters)),
      r.Pipeline.registerFunction(r.du.trimmer, "trimmer-du"),
      (r.du.stemmer =
        ((e = r.stemmerSupport.Among),
        (i = r.stemmerSupport.SnowballProgram),
        (n = new (function () {
          var r,
            n,
            o,
            t = [
              new e("", -1, 6),
              new e("á", 0, 1),
              new e("ä", 0, 1),
              new e("é", 0, 2),
              new e("ë", 0, 2),
              new e("í", 0, 3),
              new e("ï", 0, 3),
              new e("ó", 0, 4),
              new e("ö", 0, 4),
              new e("ú", 0, 5),
              new e("ü", 0, 5),
            ],
            s = [new e("", -1, 3), new e("I", 0, 2), new e("Y", 0, 1)],
            u = [new e("dd", -1, -1), new e("kk", -1, -1), new e("tt", -1, -1)],
            c = [
              new e("ene", -1, 2),
              new e("se", -1, 3),
              new e("en", -1, 2),
              new e("heden", 2, 1),
              new e("s", -1, 3),
            ],
            a = [
              new e("end", -1, 1),
              new e("ig", -1, 2),
              new e("ing", -1, 1),
              new e("lijk", -1, 3),
              new e("baar", -1, 4),
              new e("bar", -1, 5),
            ],
            l = [
              new e("aa", -1, -1),
              new e("ee", -1, -1),
              new e("oo", -1, -1),
              new e("uu", -1, -1),
            ],
            m = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128],
            d = [
              1, 0, 0, 17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
            ],
            f = [17, 67, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128],
            _ = new i();
          function w(r) {
            return (_.cursor = r), r >= _.limit || (_.cursor++, !1);
          }
          function b() {
            for (; !_.in_grouping(m, 97, 232); ) {
              if (_.cursor >= _.limit) return !0;
              _.cursor++;
            }
            for (; !_.out_grouping(m, 97, 232); ) {
              if (_.cursor >= _.limit) return !0;
              _.cursor++;
            }
            return !1;
          }
          function p() {
            return n <= _.cursor;
          }
          function g() {
            return r <= _.cursor;
          }
          function h() {
            var r = _.limit - _.cursor;
            _.find_among_b(u, 3) &&
              ((_.cursor = _.limit - r),
              (_.ket = _.cursor),
              _.cursor > _.limit_backward &&
                (_.cursor--, (_.bra = _.cursor), _.slice_del()));
          }
          function k() {
            var r;
            (o = !1),
              (_.ket = _.cursor),
              _.eq_s_b(1, "e") &&
                ((_.bra = _.cursor),
                p() &&
                  ((r = _.limit - _.cursor),
                  _.out_grouping_b(m, 97, 232) &&
                    ((_.cursor = _.limit - r), _.slice_del(), (o = !0), h())));
          }
          function v() {
            var r;
            p() &&
              ((r = _.limit - _.cursor),
              _.out_grouping_b(m, 97, 232) &&
                ((_.cursor = _.limit - r),
                _.eq_s_b(3, "gem") ||
                  ((_.cursor = _.limit - r), _.slice_del(), h())));
          }
          (this.setCurrent = function (r) {
            _.setCurrent(r);
          }),
            (this.getCurrent = function () {
              return _.getCurrent();
            }),
            (this.stem = function () {
              var e = _.cursor;
              return (
                (function () {
                  for (var r, e, i, n = _.cursor; ; ) {
                    if (((_.bra = _.cursor), (r = _.find_among(t, 11))))
                      switch (((_.ket = _.cursor), r)) {
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
                  for (
                    _.cursor = n,
                      _.bra = n,
                      _.eq_s(1, "y")
                        ? ((_.ket = _.cursor), _.slice_from("Y"))
                        : (_.cursor = n);
                    ;

                  )
                    if (((e = _.cursor), _.in_grouping(m, 97, 232))) {
                      if (((i = _.cursor), (_.bra = i), _.eq_s(1, "i")))
                        (_.ket = _.cursor),
                          _.in_grouping(m, 97, 232) &&
                            (_.slice_from("I"), (_.cursor = e));
                      else if (((_.cursor = i), _.eq_s(1, "y")))
                        (_.ket = _.cursor), _.slice_from("Y"), (_.cursor = e);
                      else if (w(e)) break;
                    } else if (w(e)) break;
                })(),
                (_.cursor = e),
                (n = _.limit),
                (r = n),
                b() || ((n = _.cursor) < 3 && (n = 3), b() || (r = _.cursor)),
                (_.limit_backward = e),
                (_.cursor = _.limit),
                (function () {
                  var r,
                    e,
                    i,
                    n,
                    t,
                    s,
                    u = _.limit - _.cursor;
                  if (((_.ket = _.cursor), (r = _.find_among_b(c, 5))))
                    switch (((_.bra = _.cursor), r)) {
                      case 1:
                        p() && _.slice_from("heid");
                        break;
                      case 2:
                        v();
                        break;
                      case 3:
                        p() && _.out_grouping_b(f, 97, 232) && _.slice_del();
                    }
                  if (
                    ((_.cursor = _.limit - u),
                    k(),
                    (_.cursor = _.limit - u),
                    (_.ket = _.cursor),
                    _.eq_s_b(4, "heid") &&
                      ((_.bra = _.cursor),
                      g() &&
                        ((e = _.limit - _.cursor),
                        _.eq_s_b(1, "c") ||
                          ((_.cursor = _.limit - e),
                          _.slice_del(),
                          (_.ket = _.cursor),
                          _.eq_s_b(2, "en") && ((_.bra = _.cursor), v())))),
                    (_.cursor = _.limit - u),
                    (_.ket = _.cursor),
                    (r = _.find_among_b(a, 6)))
                  )
                    switch (((_.bra = _.cursor), r)) {
                      case 1:
                        if (g()) {
                          if (
                            (_.slice_del(),
                            (i = _.limit - _.cursor),
                            (_.ket = _.cursor),
                            _.eq_s_b(2, "ig") &&
                              ((_.bra = _.cursor),
                              g() &&
                                ((n = _.limit - _.cursor), !_.eq_s_b(1, "e"))))
                          ) {
                            (_.cursor = _.limit - n), _.slice_del();
                            break;
                          }
                          (_.cursor = _.limit - i), h();
                        }
                        break;
                      case 2:
                        g() &&
                          ((t = _.limit - _.cursor),
                          _.eq_s_b(1, "e") ||
                            ((_.cursor = _.limit - t), _.slice_del()));
                        break;
                      case 3:
                        g() && (_.slice_del(), k());
                        break;
                      case 4:
                        g() && _.slice_del();
                        break;
                      case 5:
                        g() && o && _.slice_del();
                    }
                  (_.cursor = _.limit - u),
                    _.out_grouping_b(d, 73, 232) &&
                      ((s = _.limit - _.cursor),
                      _.find_among_b(l, 4) &&
                        _.out_grouping_b(m, 97, 232) &&
                        ((_.cursor = _.limit - s),
                        (_.ket = _.cursor),
                        _.cursor > _.limit_backward &&
                          (_.cursor--, (_.bra = _.cursor), _.slice_del())));
                })(),
                (_.cursor = _.limit_backward),
                (function () {
                  for (var r; ; )
                    if (((_.bra = _.cursor), (r = _.find_among(s, 3))))
                      switch (((_.ket = _.cursor), r)) {
                        case 1:
                          _.slice_from("y");
                          break;
                        case 2:
                          _.slice_from("i");
                          break;
                        case 3:
                          if (_.cursor >= _.limit) return;
                          _.cursor++;
                      }
                })(),
                !0
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
      r.Pipeline.registerFunction(r.du.stemmer, "stemmer-du"),
      (r.du.stopWordFilter = r.generateStopWordFilter(
        " aan al alles als altijd andere ben bij daar dan dat de der deze die dit doch doen door dus een eens en er ge geen geweest haar had heb hebben heeft hem het hier hij hoe hun iemand iets ik in is ja je kan kon kunnen maar me meer men met mij mijn moet na naar niet niets nog nu of om omdat onder ons ook op over reeds te tegen toch toen tot u uit uw van veel voor want waren was wat werd wezen wie wil worden wordt zal ze zelf zich zij zijn zo zonder zou".split(
          " ",
        ),
      )),
      r.Pipeline.registerFunction(r.du.stopWordFilter, "stopWordFilter-du");
  };
});
