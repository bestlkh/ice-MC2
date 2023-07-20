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
    var r = "2" == e.version[0];
    e.jp = function () {
      this.pipeline.reset(),
        this.pipeline.add(e.jp.stopWordFilter, e.jp.stemmer),
        r
          ? (this.tokenizer = e.jp.tokenizer)
          : (e.tokenizer && (e.tokenizer = e.jp.tokenizer),
            this.tokenizerFn && (this.tokenizerFn = e.jp.tokenizer));
    };
    var t = new e.TinySegmenter();
    (e.jp.tokenizer = function (n) {
      if (!arguments.length || null == n || null == n) return [];
      if (Array.isArray(n))
        return n.map(function (t) {
          return r ? new e.Token(t.toLowerCase()) : t.toLowerCase();
        });
      for (
        var i = n.toString().toLowerCase().replace(/^\s+/, ""),
          o = i.length - 1;
        o >= 0;
        o--
      )
        if (/\S/.test(i.charAt(o))) {
          i = i.substring(0, o + 1);
          break;
        }
      return t
        .segment(i)
        .filter(function (e) {
          return !!e;
        })
        .map(function (t) {
          return r ? new e.Token(t) : t;
        });
    }),
      (e.jp.stemmer = function (e) {
        return e;
      }),
      e.Pipeline.registerFunction(e.jp.stemmer, "stemmer-jp"),
      (e.jp.wordCharacters =
        "一二三四五六七八九十百千万億兆一-龠々〆ヵヶぁ-んァ-ヴーｱ-ﾝﾞa-zA-Zａ-ｚＡ-Ｚ0-9０-９"),
      (e.jp.stopWordFilter = function (t) {
        if (-1 === e.jp.stopWordFilter.stopWords.indexOf(r ? t.toString() : t))
          return t;
      }),
      (e.jp.stopWordFilter = e.generateStopWordFilter(
        "これ それ あれ この その あの ここ そこ あそこ こちら どこ だれ なに なん 何 私 貴方 貴方方 我々 私達 あの人 あのかた 彼女 彼 です あります おります います は が の に を で え から まで より も どの と し それで しかし".split(
          " ",
        ),
      )),
      e.Pipeline.registerFunction(e.jp.stopWordFilter, "stopWordFilter-jp");
  };
});
