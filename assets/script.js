var inputEl = $('#input');
var searchBtn = $('#search');
var charNames = ['Ant-Man', 'Black Panther','Bucky','Captain America','Captain Marvel','Doctor Strange','Drax','Falcon','Gamora','Groot','Hawkeye','Hulk','Iron Man','Mantis','Nebula','Pepper Potts','Rocket','Scarlet Witch','Shuri','Spider-Man','Star-Lord','Thor','Valkyrie','War Machine','Wasp','Wong']
var randomBtn = $('#random')


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


randomBtn.on('click', function(){
    var randomChar = Math.floor(Math.random()*charNames.length)
    var randomCharIs = charNames[randomChar]
    console.log(randomCharIs)
    var marvelUrl = "http://gateway.marvel.com/v1/public/characters?name="+randomCharIs+"&limit=100&apikey=3a63bd6dec07e5572fe2f09b18064abe"
    var imdbUrl = "https://imdb-api.com/en/API/SearchSeries/k_h6mhz1ew/" + randomCharIs
    fetch(marvelUrl)
    .then((res) => res.json())
    .then((data) => console.log(data))
    fetch(imdbUrl)
    .then((res) => res.json())
    .then((data) => console.log(data))
})