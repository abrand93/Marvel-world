var inputEl = $('#input');
var searchBtn = $('#search');
var selectEl = $('select');

selectEl.on('change', function() {
  var nameChar = $(this).val();
  var imdbUrl = "https://imdb-api.com/en/API/SearchSeries/k_h6mhz1ew/" + nameChar
  
  fetch(imdbUrl)
    .then((res) => res.json())
    .then((data) => console.log(data))
});