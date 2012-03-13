class SpringerLite

	constructor: ->
		$("#search-form").submit ->
			url = "http://api.springer.com/metadata/json?q=physics&api_key=ueukuwx5guegu4ahjc6ajq8w"
			$.getJSON(url, (data) ->
				console.log data
			)
			false
$ ->
	site = new SpringerLite()
