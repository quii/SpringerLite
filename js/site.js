(function() {
  var SearchResultCache, SpringerLite;

  SearchResultCache = (function() {

    function SearchResultCache() {}

    SearchResultCache.prototype.addResultToCache = function(term, renderedHTML) {
      if (this.exists(term)) {
        return localStorage.setItem(term, this.getHtml(term) + renderedHTML);
      } else {
        return localStorage.setItem(term, renderedHTML);
      }
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
    var loadMoreButton, resultsContainer, searchButtonElement, stitchResults;

    function SpringerLite() {
      this.resultsCache = new SearchResultCache;
      this.handleSubmit();
      this.handleLoadMore();
      this.handleEmpty();
    }

    SpringerLite.prototype.doSearch = function(page) {
      searchButtonElement.attr("value", "Searching...");
      this.term = $("#search").val();
      if (this.resultsCache.exists(this.term)) {
        return this.renderResult(this.term);
      } else {
        return this.getResult(this.term);
      }
    };

    SpringerLite.prototype.getResult = function(term, page) {
      var startIndex, url,
        _this = this;
      if (page == null) page = 1;
      startIndex = (page * 10) - 1;
      url = "http://api.springer.com/metadata/jsonp?q=" + term + "&api_key=ueukuwx5guegu4ahjc6ajq8w&s=" + startIndex + "&callback=?";
      return $.ajax({
        url: url,
        dataType: 'jsonp',
        type: 'GET',
        success: function(json) {
          var renderedHTML;
          console.log(url);
          searchButtonElement.attr("value", "Search");
          renderedHTML = Mustache.to_html($('#template').html(), json);
          _this.resultsCache.addResultToCache(term, renderedHTML);
          _this.renderResult(term);
          return loadMoreButton.show();
        }
      });
    };

    SpringerLite.prototype.renderResult = function(term) {
      resultsContainer.html(this.resultsCache.getHtml(term));
      stitchResults();
      searchButtonElement.attr("value", "Search");
      return loadMoreButton.text("Load more");
    };

    SpringerLite.prototype.handleSubmit = function() {
      var _this = this;
      return $("#search-form").submit(function(e) {
        e.preventDefault();
        return _this.doSearch(1);
      });
    };

    SpringerLite.prototype.handleLoadMore = function() {
      var _this = this;
      return loadMoreButton.click(function() {
        var nextPageNumber, numberOfResultsOnPage;
        numberOfResultsOnPage = $("li").length - 1;
        nextPageNumber = (numberOfResultsOnPage / 10) + 1;
        loadMoreButton.text("Loading more...");
        _this.getResult(_this.term, nextPageNumber);
        return false;
      });
    };

    SpringerLite.prototype.handleEmpty = function() {
      return $("#empty-cache").click(function() {
        localStorage.clear();
        return false;
      });
    };

    stitchResults = function() {
      var numberOfLists;
      numberOfLists = resultsContainer.find("ol").length;
      if (numberOfLists > 1) {
        return resultsContainer.find("li").each(function() {
          resultsContainer.find("ol:first").append($(this));
          return resultsContainer.find("ol").not(":first").remove();
        });
      }
    };

    loadMoreButton = (function() {
      return $("#load-more");
    })();

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
