class SearchResult
	constructor: (@terms, @html) ->
		console.log("made a search result")


class SpringerLite

	constructor: ->
		$("#search-form").submit (e) =>
			e.preventDefault() 
			this.doSearch(1)

	results: []

	doSearch: (page) ->
		$("#search-button").attr("value", "Searching...")
		term = $("#search").val()
		url = "http://api.springer.com/metadata/jsonp?q=#{term}&api_key=ueukuwx5guegu4ahjc6ajq8w&callback=?"
		$.ajax 
			url: url
			dataType: 'jsonp'
			type: 'GET'
			success: (json) => 
				$("#search-button").attr("value", "Search")
				renderedHTML = Mustache.to_html($('#template').html()
				$("#results").html(renderedHTML, json))
				@addResultToCache(term, renderedHTML)

	addResultToCache: (term, renderedHTML) ->
		@results.push(new SearchResult(term, renderedHTML))
		console.log results

$ ->
	site = new SpringerLite()
