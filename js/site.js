(function() {
  var SpringerLite;

  SpringerLite = (function() {

    function SpringerLite() {
      $("#search-form").submit(function() {
        var url;
        url = "http://api.springer.com/metadata/json?q=physics&api_key=ueukuwx5guegu4ahjc6ajq8w";
        $.ajax(url, {
          type: 'GET',
          dataType: 'json',
          error: function(jqXHR, textStatus, errorThrown) {
            return $('body').append("AJAX Error: " + textStatus);
          },
          success: function(data, textStatus, jqXHR) {
            return $('body').append("Successful AJAX call: " + data);
          }
        });
        return false;
      });
    }

    return SpringerLite;

  })();

  $(function() {
    var site;
    return site = new SpringerLite();
  });

}).call(this);
