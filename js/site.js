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

    SpringerLite.apiKey = "ueukuwx5guegu4ahjc6ajq8w";

    SpringerLite.prototype.results = [];

    SpringerLite.prototype.doSearch = function(page) {
      var term, url,
        _this = this;
      $("#search-button").attr("value", "Searching...");
      term = $("#search").val();
      url = "http://api.springer.com/metadata/jsonp?q=" + term + "&api_key=" + this.apiKey + "&callback=?";
      return $.ajax({
        url: url,
        dataType: 'jsonp',
        type: 'GET',
        success: function(json) {
          var renderedHTML;
          $("#search-button").attr("value", "Search");
          renderedHTML = Mustache.to_html($('#template').html(), $("#results").html(renderedHTML, json));
          return _this.addResultToCache(term, renderedHTML);
        }
      });
    };

    SpringerLite.prototype.addResultToCache = function(term, renderedHTML) {
      this.results.push(new SearchResult(term, renderedHTML));
      return console.log(results);
    };

    return SpringerLite;

  })();

  $(function() {
    var site;
    return site = new SpringerLite();
  });

}).call(this);
