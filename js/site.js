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
      return localStorage.setItem(term, renderedHTML);
    };

    SearchResultCache.prototype.getHtml = function(term) {
      return this.findResult(term);
    };

    SearchResultCache.prototype.exists = function(term) {
      return this.findResult(term) != null;
    };

    SearchResultCache.prototype.findResult = function(term) {
      return localStorage.getItem(term);
    };

    return SearchResultCache;

  })();

  SpringerLite = (function() {
    var resultsContainer, searchButtonElement;

    function SpringerLite() {
      var _this = this;
      this.resultsCache = new SearchResultCache;
      $("#search-form").submit(function(e) {
        e.preventDefault();
        return _this.doSearch(1);
      });
    }

    SpringerLite.prototype.doSearch = function(page) {
      var term;
      searchButtonElement.attr("value", "Cuddle...");
      term = $("#search").val();
      if (this.resultsCache.exists(term)) {
        this.renderResult(term);
      } else {
        this.getResult(term);
      }
      return searchButtonElement.attr("value", "Search");
    };

    SpringerLite.prototype.getResult = function(term) {
      var url,
        _this = this;
      url = "http://api.springer.com/metadata/jsonp?q=" + term + "&api_key=ueukuwx5guegu4ahjc6ajq8w&callback=?";
      return $.ajax({
        url: url,
        dataType: 'jsonp',
        type: 'GET',
        success: function(json) {
          var renderedHTML;
          searchButtonElement.attr("value", "Search");
          renderedHTML = Mustache.to_html($('#template').html(), json);
          _this.resultsCache.addResultToCache(term, renderedHTML);
          return _this.renderResult(term);
        }
      });
    };

    SpringerLite.prototype.renderResult = function(term) {
      return resultsContainer.html(this.resultsCache.getHtml(term));
    };

    searchButtonElement = (function() {
      return $("#search-button");
    })();

    resultsContainer = (function() {
      return $("#results");
    })();

    return SpringerLite;

  })();

  $(function() {
    var site;
    return site = new SpringerLite();
  });

}).call(this);
