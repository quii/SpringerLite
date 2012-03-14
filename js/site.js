(function() {
  var SpringerLite;

  SpringerLite = (function() {

    function SpringerLite() {
      $("#search-form").submit(function(e) {
        var url;
        e.preventDefault();
        url = "http://api.springer.com/metadata/jsonp?q=physics&api_key=ueukuwx5guegu4ahjc6ajq8w&callback=?";
        return $.ajax({
          url: url,
          dataType: 'jsonp',
          type: 'GET',
          success: function(json) {
            console.log(json);
            return $("#results").html(Mustache.to_html($('#template').html(), json));
          }
        });
      });
    }

    return SpringerLite;

  })();

  $(function() {
    var site;
    return site = new SpringerLite();
  });

}).call(this);
