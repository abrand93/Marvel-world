var inputEl = $('#input');
var searchBtn = $('#search');
var charNames = ['Ant-Man (Scott Lang)', 'Black Panther','Bucky','Captain America','Captain Marvel (Carol Danvers)','Doctor Strange','Drax','Falcon','Gamora','Groot','Hawkeye','Hulk','Iron Man','Mantis','Nebula','Pepper Potts','Rocket Raccoon','Scarlet Witch','Spider-Man (Peter Parker)','Star-Lord (Peter Quill)','Thor','Valkyrie (Samantha Parrington)','War Machine (Marvel: Avengers Alliance)','Wasp','Wong']
var randomBtn = $('#random')
var dataList = $('#names')
var modalDisplay = $('#modal')
var closeBtn = $('#close-button')
var card = document.querySelector('#card')
 var cardTwo = document.querySelector('#wikiCard')
var maxChars = 200


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
searchBtn.on('click', function() {
    var nameChar = inputEl.val();
    var marvelUrl = "http://gateway.marvel.com/v1/public/characters?name=" + nameChar + "&limit=100&apikey=3a63bd6dec07e5572fe2f09b18064abe";
    var wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${nameChar}&exchars=250&exintro=1&explaintext=1&redirects=1&origin=*`;


    // Save search input to local storage
    var searches = JSON.parse(localStorage.getItem('searches')) || [];
    if (searches.indexOf(nameChar) === -1) {
        searches.push(nameChar);
        localStorage.setItem('searches', JSON.stringify(searches));
    }

    // MARVEL fetch request
    fetch(marvelUrl)
        .then((res) => res.json())
        .then((data) => MarvelCard(data));

    // WIKI fetch request
    fetch(wikiUrl)
        .then((res) => res.json())
        .then((data) => console.log(data));
});
    



    //random avenger picker functionality
//pick random avenger button event listener
randomBtn.on('click', function(){
    var randomChar = Math.floor(Math.random()*charNames.length)
    var randomCharIs = charNames[randomChar]
    console.log(randomCharIs)
    var marvelUrl = "http://gateway.marvel.com/v1/public/characters?name="+randomCharIs+"&limit=100&apikey=3a63bd6dec07e5572fe2f09b18064abe"
    var wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${randomCharIs}&exchars=1000&exintro=1&explaintext=2&redirects=1&origin=*`;  

    fetch(marvelUrl)
        .then((res) => res.json())        
        .then((data) =>  MarvelCard(data))
      
        fetch(wikiUrl)
       .then((res) => res.json())
       .then((data) => wikiCard(data))
      
        
        
       
    })






// this part contains a ready function but we need to meet before using it how ever you can view the data in console log


 function wikiCard(data){

    $("#wikiCard").empty();
    var description = document.createElement('p');
    var pageId = Object.keys(data.query.pages)[0];
    description.innerHTML = data.query.pages[pageId].extract;
    var div = document.createElement('div');
    div.classList = 'h-screen flex items-center justify-center';
    var avengerName = document.createElement('h2');
    avengerName.textContent = data.query.pages[pageId].title;
    avengerName.classList = "text-center text-2xl ";
    div.classList = 'bg-red-700';
    cardTwo.appendChild(div);
    div.appendChild(avengerName);
    div.appendChild(description);
    console.log(description)
}






    function MarvelCard(data){
        $("#card").empty()
        var thumbNail = document.createElement('img')
       var thumbNailRes = data.data.results[0].thumbnail.path
        thumbNail.setAttribute('src',thumbNailRes+'.jpg')
        var div = document.createElement('div')
        
        var avengerName = document.createElement('h2')
        var description = document.createElement('p')
        avengerName.textContent = data.data.results[0].name
        avengerName.classList = " m-2 text-center text-2xl font "
        thumbNail.classList = "content-center"
        description.classList = "p-5 m-2 font"
        card.appendChild(div)
        div.classList = 'bg-red-700 rounded-lg shadow-2xl shadow-red-700'
        div.appendChild(avengerName)
        
        description.textContent = data.data.results[0].description
        div.appendChild(thumbNail)
        div.appendChild(description)
        wikiButton = document.createElement("BUTTON")
        div.appendChild(wikiButton)
        wikiButton.textContent = "Click for more info"
        // console.log(data.data.results[0].name)
        // console.log(data)
        // console.log(thumbNailRes)

        $(wikiButton).on( 'click', function (){
            card.classList = 'hide'
            cardTwo.classList.remove("hide")
            var goBack = document.createElement("BUTTON")
            cardTwo.appendChild(goBack)
            goBack.textContent = 'Back'
            $(goBack).on('click',function (){
                card.classList.remove('hide')
                cardTwo.classList= 'hide'
                card.classList = 'container mx-auto px-4 content-center max-w-md m-2 rounded'

            })


        })
            
        
       
    }




// var searchTerm = getCharacterName('Spider-Man (12344)');

// var maxChars = 20;
// // wiki api 
// fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`)
// .then((data)=>data.json())
// .then((result)=>console.log(result))

// // Getting character name from reponse object title
// function getCharacterName(title){
//     var index = title.indexOf("(");  // Find the index of the opening parenthesis
//     var characterName = title.substring(0,index).trim();  // taking only part of string before paranthesis and .trim() removes any spaces around our string
//     return characterName;
// }

   //close button to hide modal
//close button event listener
closeBtn.on('click',function(){
    modalDisplay.classList.remove('hidden')
})

