class SpringerLite

	constructor: ->
		$("#search-form").submit ->
			url = "http://api.springer.com/metadata/json?q=physics&api_key=ueukuwx5guegu4ahjc6ajq8w"
			$.ajax url,
			    type: 'GET'
			    dataType: 'json'
			    error: (jqXHR, textStatus, errorThrown) ->
			        $('body').append "AJAX Error: #{textStatus}"
			    success: (data, textStatus, jqXHR) ->
			        $('body').append "Successful AJAX call: #{data}"
						false
$ ->
	site = new SpringerLite()
