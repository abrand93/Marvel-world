var inputEl = $('#input');
var searchBtn = $('#search');



searchBtn.on('click',function(){
    var nameChar = inputEl.val()
    var marvelUrl = "http://gateway.marvel.com/v1/public/characters?name="+nameChar+"&limit=100&apikey=3a63bd6dec07e5572fe2f09b18064abe"
    var imdbUrl = "https://imdb-api.com/en/API/SearchSeries/k_h6mhz1ew/" + nameChar
    fetch(marvelUrl)
    .then((res) => res.json())
    .then((data) => console.log(data))
    fetch(imdbUrl)
    .then((res) => res.json())
    .then((data) => console.log(data))
})
