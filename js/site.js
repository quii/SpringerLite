(function() {
  var SearchResult, SearchResultCache, SpringerLite;

  SearchResult = (function() {

    function SearchResult(terms, html) {
      this.terms = terms;
      this.html = html;
    }

    return SearchResult;

  })();

  SearchResultCache = (function() {

    function SearchResultCache() {}

    SearchResultCache.prototype.results = [];

    SearchResultCache.prototype.addResultToCache = function(term, renderedHTML) {
      return this.results.push(new SearchResult(term, renderedHTML));
    };

    SearchResultCache.prototype.getHtml = function(term) {
      return this.findResult(term)[0].html;
    };

    SearchResultCache.prototype.exists = function(term) {
      return this.findResult(term).length > 0;
    };

    SearchResultCache.prototype.findResult = function(term) {
      var r, _i, _len, _ref, _results;
      _ref = this.results;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        r = _ref[_i];
        if (r.terms === term) _results.push(r);
      }
      return _results;
    };

    return SearchResultCache;

  })();

  SpringerLite = (function() {

    SpringerLite.prototype.resultsCache = {};

    function SpringerLite() {
      var _this = this;
      this.resultsCache = new SearchResultCache;
      $("#search-form").submit(function(e) {
        e.preventDefault();
        return _this.doSearch(1);
      });
    }

    SpringerLite.prototype.doSearch = function(page) {
      var term, url,
        _this = this;
      $("#search-button").attr("value", "Searching...");
      term = $("#search").val();
      if (this.resultsCache.exists(term)) {
        return this.renderResult(term);
      } else {
        url = "http://api.springer.com/metadata/jsonp?q=" + term + "&api_key=ueukuwx5guegu4ahjc6ajq8w&callback=?";
        return $.ajax({
          url: url,
          dataType: 'jsonp',
          type: 'GET',
          success: function(json) {
            var renderedHTML;
            $("#search-button").attr("value", "Search");
            renderedHTML = Mustache.to_html($('#template').html(), json);
            _this.resultsCache.addResultToCache(term, renderedHTML);
            return _this.renderResult(term);
          }
        });
      }
    };

    SpringerLite.prototype.renderResult = function(term) {
      return $("#results").html(this.resultsCache.getHtml(term));
    };

    return SpringerLite;

  })();

  $(function() {
    var site;
    return site = new SpringerLite();
  });

}).call(this);
