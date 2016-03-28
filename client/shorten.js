$(document).ready(function() {
  Shortener.init();
});

var Shortener = {
  url: 'localhost:8080',

  init: function() {
    Shortener.observeFormSubmissions();
  },
  observeFormSubmissions: function() {
    $('form').submit(function(e) {
      var form = $(e.target);
      e.preventDefault();

      $.ajax(
        {
          type: form.attr('method'),
          url: form.attr('action'),
          data: {
            url: $('#input-url').val()
          },
          success: function(data) {
            var outputUrl = Shortener.url + "/" + data;
            console.log(outputUrl);
            $('#output-url').text(outputUrl);
          },
          error: function(xhr, ajaxOptions, thrownError) {
            console.log(thrownError);
            console.log(xhr.responseText);
          }
        }
      )
    })
  }
}
