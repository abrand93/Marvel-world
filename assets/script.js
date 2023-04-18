var inputEl = $('#input');
var searchBtn = $('#search');



searchBtn.on('click',function(){
    var nameChar = inputEl.val()
    var marvelUrl = "http://gateway.marvel.com/v1/public/characters?name="+nameChar+"&limit=100&apikey=3a63bd6dec07e5572fe2f09b18064abe"
    var imdbUrl = "https://imdb-api.com/en/API/SearchSeries/k_h6mhz1ew/" + nameChar
    var testUrl = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith="+nameChar+"&orderBy=modified&limit=5&apikey=e33e97205d9fa94d883b2c43dadf62b7"
//MARVEL fetch request
    // fetch(marvelUrl)
    // .then((res) => res.json())
    // .then((data) => console.log(data))

//OMDB fetch request
    fetch(imdbUrl)
    .then((res) => res.json())
    .then((data) => console.log(data))

    //Test MARVEL api

    // fetch(testUrl)
    // .then((res) => res.json())
    // .then((data) => console.log(data))
})
