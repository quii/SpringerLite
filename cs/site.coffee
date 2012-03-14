class SpringerLite

	constructor: ->
		$("#search-form").submit (e) ->
			e.preventDefault()
			url = "http://api.springer.com/metadata/jsonp?q=physics&api_key=ueukuwx5guegu4ahjc6ajq8w&callback=?"
			$.ajax 
				url: url
				dataType: 'jsonp'
				type: 'GET'
				success: (json) -> 
					console.log(json)
					$("#results").html(Mustache.to_html($('#template').html(), json));

$ ->
	site = new SpringerLite()
