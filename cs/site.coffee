class SearchResult
	constructor: (@terms, @html) ->

class SearchResultCache
	results: []

	addResultToCache: (term, renderedHTML) -> @results.push(new SearchResult(term, renderedHTML))

	getHtml: (term) -> @findResult(term)[0].html

	exists: (term) -> @findResult(term).length>0

	findResult: (term) -> (r for r in @results when r.terms == term)

class SpringerLite

	constructor: ->
		@resultsCache = new SearchResultCache
		$("#search-form").submit (e) =>
			e.preventDefault() 
			this.doSearch(1)

	doSearch: (page) ->
		$("#search-button").attr("value", "Searching...")
		term = $("#search").val()

		if(@resultsCache.exists(term))
			@renderResult(term)
		else
			@getResult(term)

	getResult: (term) ->
		url = "http://api.springer.com/metadata/jsonp?q=#{term}&api_key=ueukuwx5guegu4ahjc6ajq8w&callback=?"
		$.ajax 
			url: url
			dataType: 'jsonp'
			type: 'GET'
			success: (json) => 
				$("#search-button").attr("value", "Search")
				renderedHTML = Mustache.to_html($('#template').html(), json)
				@resultsCache.addResultToCache(term, renderedHTML)
				@renderResult(term)

	renderResult: (term) -> $("#results").html(@resultsCache.getHtml(term))

$ ->
	site = new SpringerLite()
