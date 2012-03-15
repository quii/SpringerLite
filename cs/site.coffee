class SpringerLite

	constructor: ->
		$("#search-form").submit (e) =>
			e.preventDefault() 
			this.doSearch(1, e)

	doSearch: (page) ->
		$("#search-button").attr("value", "Searching...")
		term = $("#search").val()
		url = "http://api.springer.com/metadata/jsonp?q=#{term}&api_key=ueukuwx5guegu4ahjc6ajq8w&callback=?"
		$.ajax 
			url: url
			dataType: 'jsonp'
			type: 'GET'
			success: (json) -> 
				console.log(json)
				$("#search-button").attr("value", "Search")
				$("#results").html(Mustache.to_html($('#template').html(), json));

$ ->
	site = new SpringerLite()
