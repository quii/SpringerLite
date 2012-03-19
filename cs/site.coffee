class SearchResultCache

	addResultToCache: (term, renderedHTML) -> localStorage.setItem(term, renderedHTML)

	getHtml: (term) -> @findResult(term)

	exists: (term) -> @findResult(term)?

	findResult: (term) -> localStorage.getItem(term)

class SpringerLite

	constructor: ->
		@resultsCache = new SearchResultCache
		@handleSubmit()
		@handleLoadMore()
		@handleEmpty()

	doSearch: (page) ->
		searchButtonElement.attr("value", "Searching...")
		term = $("#search").val()

		if(@resultsCache.exists(term))
			@renderResult(term)
		else
			@getResult(term)

		searchButtonElement.attr("value", "Search")
		$("#load-more").show()

	getResult: (term) ->
		url = "http://api.springer.com/metadata/jsonp?q=#{term}&api_key=ueukuwx5guegu4ahjc6ajq8w&callback=?"
		$.ajax 
			url: url
			dataType: 'jsonp'
			type: 'GET'
			success: (json) => 
				searchButtonElement.attr("value", "Search")
				renderedHTML = Mustache.to_html($('#template').html(), json)

				items = $(renderedHTML).find("li").html()
				console.log(items)

				@resultsCache.addResultToCache(term, renderedHTML)
				@renderResult(term)

	renderResult: (term) -> resultsContainer.html(@resultsCache.getHtml(term))

	handleSubmit: ->
		$("#search-form").submit (e) =>
			e.preventDefault() 
			this.doSearch(1)

	handleLoadMore: ->
		$("#load-more").click =>
			console.log("loading more..")
			false

	handleEmpty: ->
		$("#empty-cache").click ->
			localStorage.clear()
			false

	searchButtonElement = do -> $("#search-button")
	resultsContainer = do -> $("#results")

$ ->
	site = new SpringerLite()
