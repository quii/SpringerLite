(function() {
  var SearchResult, SpringerLite;

  SearchResult = (function() {

    function SearchResult(terms, html) {
      this.terms = terms;
      this.html = html;
    }

    SearchResult.getHtml = function(results, selectedTerm) {
      var r;
      return ((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = results.length; _i < _len; _i++) {
          r = results[_i];
          if (r.terms === selectedTerm) _results.push(r);
        }
        return _results;
      })())[0].html;
    };

    return SearchResult;

  })();

  SpringerLite = (function() {

    function SpringerLite() {
      var _this = this;
      $("#search-form").submit(function(e) {
        e.preventDefault();
        return _this.doSearch(1);
      });
    }

    SpringerLite.prototype.results = [];

    SpringerLite.prototype.doSearch = function(page) {
      var term, url,
        _this = this;
      $("#search-button").attr("value", "Searching...");
      term = $("#search").val();
      url = "http://api.springer.com/metadata/jsonp?q=" + term + "&api_key=ueukuwx5guegu4ahjc6ajq8w&callback=?";
      return $.ajax({
        url: url,
        dataType: 'jsonp',
        type: 'GET',
        success: function(json) {
          var renderedHTML;
          $("#search-button").attr("value", "Search");
          renderedHTML = Mustache.to_html($('#template').html(), json);
          _this.addResultToCache(term, renderedHTML);
          return _this.renderResult(term);
        }
      });
    };

    SpringerLite.prototype.addResultToCache = function(term, renderedHTML) {
      return this.results.push(new SearchResult(term, renderedHTML));
    };

    SpringerLite.prototype.renderResult = function(term) {
      return $("#results").html(SearchResult.getHtml(this.results, term));
    };

    return SpringerLite;

  })();

  $(function() {
    var site;
    return site = new SpringerLite();
  });

}).call(this);
