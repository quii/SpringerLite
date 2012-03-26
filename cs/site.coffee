class SearchResultCache

	addResultToCache: (term, renderedHTML) -> 
		if @exists term
			localStorage.setItem(term, (@getHtml(term)+renderedHTML))
		else
			localStorage.setItem(term, renderedHTML)

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
		@term = $("#search").val()

		if(@resultsCache.exists(@term))
			@renderResult(@term)
		else
			@getResult(@term)

	getResult: (term, page=1) ->
		startIndex = (page*10)-1
		url = "http://api.springer.com/metadata/jsonp?q=#{term}&api_key=ueukuwx5guegu4ahjc6ajq8w&s=#{startIndex}&callback=?"
		$.ajax 
			url: url
			dataType: 'jsonp'
			type: 'GET'
			success: (json) => 
				searchButtonElement.attr("value", "Search")
				renderedHTML = Mustache.to_html($('#template').html(), json)
				@resultsCache.addResultToCache(term, renderedHTML)
				@renderResult(term)

	renderResult: (term) -> 
		resultsContainer.html(@resultsCache.getHtml(term))
		stitchResults()
		searchButtonElement.attr("value", "Search")
		loadMoreButton.text("Load more")
		loadMoreButton.show()

	handleSubmit: ->
		$("#search-form").submit (e) =>
			e.preventDefault() 
			this.doSearch(1)

	handleLoadMore: ->
		loadMoreButton.click =>
			numberOfResultsOnPage = $("li").length-1
			nextPageNumber = (numberOfResultsOnPage/10)+1
			loadMoreButton.text("Loading more...")
			@getResult(@term, nextPageNumber)
			false

	handleEmpty: ->
		$("#empty-cache").click ->
			localStorage.clear()
			false

	stitchResults = ->
		#combine lists, bit hacky :)
		numberOfLists = resultsContainer.find("ol").length
		if(numberOfLists>1)
			resultsContainer.find("li").each ->
				resultsContainer.find("ol:first").append($(this))
				resultsContainer.find("ol").not(":first").remove()


	loadMoreButton = do -> $("#load-more")
	searchButtonElement = do -> $("#search-button")
	resultsContainer = do -> $("#results")

$ ->
	site = new SpringerLite()
