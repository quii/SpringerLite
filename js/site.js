(function() {
  var SearchResult, SpringerLite;

  SearchResult = (function() {

    function SearchResult(terms, html) {
      this.terms = terms;
      this.html = html;
      console.log("made a search result");
    }

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
      var r, selectedResult;
      selectedResult = ((function() {
        var _i, _len, _ref, _results;
        _ref = this.results;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          r = _ref[_i];
          if (r.terms === term) _results.push(r);
        }
        return _results;
      }).call(this))[0];
      console.log(selectedResult);
      return $("#results").html(selectedResult.html);
    };

    return SpringerLite;

  })();

  $(function() {
    var site;
    return site = new SpringerLite();
  });

}).call(this);
