var inputEl = $('#input');
var searchBtn = $('#search');
var charNames = ['Ant-Man', 'Black Panther','Bucky','Captain America','Captain Marvel','Doctor Strange','Drax','Falcon','Gamora','Groot','Hawkeye','Hulk','Iron Man','Mantis','Nebula','Pepper Potts','Rocket','Scarlet Witch','Shuri','Spider-Man','Star-Lord','Thor','Valkyrie','War Machine','Wasp','Wong']
var randomBtn = $('#random')
var dataList = $('#names')

    //auto-complete functionality
    $(document).ready(function(){
        $('#input').on("input",function(){ //input event listener triggered whenever a user types into search bar
            dataList.empty()
            var query = $(this).val()
            if(query.length >3){//minimum number of characthers that trigger autocomplete
                var marvelUrl = "http://gateway.marvel.com/v1/public/characters?nameStartsWith="+query+"&apikey=3a63bd6dec07e5572fe2f09b18064abe"
                    
                    fetch(marvelUrl)
                    .then((res) => res.json())
                    .then(function(data) {
    
                        var innerData = data.data.results; //traversing into the response object where name is found and getting the object
                        var tempArray = innerData.map(function(item){ //building an array that holds every charachter name for that search query
                            return item.name; //grabs the name value from each key of the innerData object
                            
                        })
                        $("#input").autocomplete({  //autocomplete ui feature of jQuery(takes an array to autocomplete a user input)
                            source: tempArray
                            });              
    
                    })

            }//end if-statement
    
        })
    })
    
     
    //search functionality
//search button event listener
searchBtn.on('click',function(){
    var nameChar = inputEl.val()
    var marvelUrl = "http://gateway.marvel.com/v1/public/characters?name="+nameChar+"&limit=100&apikey=3a63bd6dec07e5572fe2f09b18064abe"
    var imdbUrl = "https://imdb-api.com/en/API/SearchSeries/k_h6mhz1ew/" + nameChar   
// MARVEL fetch request
    fetch(marvelUrl)
    .then((res) => res.json())
    .then((data) => console.log(data))

//OMDB fetch request
    fetch(imdbUrl)
    .then((res) => res.json())
    .then((data) => console.log(data))

    

})

    //random avenger picker functionality
//pick random avenger button event listener
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

