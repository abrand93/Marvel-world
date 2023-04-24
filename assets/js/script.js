//Selectors
var inputEl = $('#input')
var searchBtn = $('#search')
var randomBtn = $('#random')
var dataList = $('#names')
var modalDisplay = document.querySelector('.modal')
var modalAlert = $('.modal-alert')
var modalNoResult = $('.modal-noresult')
var closeBtn = $('#close-button')
var card = document.querySelector('#card')
var cardTwo = document.querySelector('#wikiCard')
var wikiPEL = document.querySelector('#wikPEl')
var footer = document.querySelector('#footer')

 //array that stores avengers
var charNames = ['Ant-Man (Scott Lang)', 'Black Panther','Bucky','Captain America','Captain Marvel (Carol Danvers)','Doctor Strange','Drax','Falcon','Gamora','Groot','Hawkeye','Hulk','Iron Man','Mantis','Nebula','Pepper Potts','Rocket Raccoon','Scarlet Witch','Spider-Man (Peter Parker)','Star-Lord (Peter Quill)','Thor','Valkyrie (Samantha Parrington)','War Machine (Marvel: Avengers Alliance)','Wasp','Wong']

//auto-complete functionality
$(document).ready(function(){
        inputEl.on("input",function(){ //input event listener triggered whenever a user types into search bar
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
                        
                        inputEl.autocomplete({  //autocomplete ui feature of jQuery(takes an array to autocomplete a user input)
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
    //checking if user has typed into search bar otherwise modal alert shows up
    if(nameChar === ''){
        modalAlert.removeClass('hidden')
        var btn = $("#empty-close-button")
        btn.on('click',function(){
            modalAlert.addClass('hidden')
        })
        return; //exits the function
    }
    var marvelUrl = "http://gateway.marvel.com/v1/public/characters?name=" + nameChar + "&limit=100&apikey=3a63bd6dec07e5572fe2f09b18064abe";
    var wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${nameChar}&exchars=250&exintro=1&explaintext=1&redirects=1&origin=*`;


    // Save search input to local storage
    var searches = JSON.parse(localStorage.getItem('searches')) || []
    if (searches.indexOf(nameChar) === -1) {
        searches.push(nameChar)
        localStorage.setItem('searches', JSON.stringify(searches))
    }

    // MARVEL fetch request
    fetch(marvelUrl)
        .then((res) => res.json())
        .then((data) => MarvelCard(data)) 
        .catch(error => {
            displayNoResults() //displays a modal(alert) of no result found
            
          });

    // WIKI fetch request
    fetch(wikiUrl)
        .then((res) => res.json())
        .then((data) => wikiCard(data))
    
    inputEl.val('') //clearing the search bar content
});

    //random avenger picker functionality
//pick random avenger button event listener
randomBtn.on('click', function(){
    var randomChar = Math.floor(Math.random()*charNames.length)
    var randomCharIs = charNames[randomChar]
    inputEl.val(randomCharIs)
    
    var marvelUrl = "http://gateway.marvel.com/v1/public/characters?name="+randomCharIs+"&limit=100&apikey=3a63bd6dec07e5572fe2f09b18064abe"
    var wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${randomCharIs}&exchars=1000&exintro=1&explaintext=2&redirects=1&origin=*`;  

    fetch(marvelUrl)
        .then((res) => res.json())        
        .then((data) =>  MarvelCard(data))
      
        fetch(wikiUrl)
       .then((res) => res.json())
       .then((data) => wikiCard(data))

    })

//function that uses Wikipedia fetched data and display on to the page
function wikiCard(data){
    $(".model").empty();
    var description = document.createElement('p')
    var pageId = Object.keys(data.query.pages)[0] 
    wikiPEL.innerHTML= data.query.pages[pageId].extract 
}

//function that uses Marvel fetched data and display on to the page
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
    //'Click here for more info' button on the card
    var wikiButton = document.createElement("BUTTON")
   
    div.appendChild(wikiButton)
    wikiButton.classList = "font-normal md:font-bold p-2 hover:bg-sky-700"
    wikiButton.textContent = "Click here for more info "

   //more info button on the card to display detailed description   
// More description event listener
$(wikiButton).on( 'click', function (){
           
    footer.classList = 'hide'            
    card.classList = 'hide'
    modalDisplay.classList.remove("hidden")
    modalDisplay.classList = 'h-screen w-full flex justify-center items-center bg-black bg-opacity-50'         
 })
}

   //close button to hide modal
//close button event listener
closeBtn.on('click',function(){
    
    modalDisplay.classList = "hidden"
    card.classList.remove('hide')
    card.classList = 'container mx-auto px-4 content-center max-w-md m-2 rounded'
})
//function that displays modal for NO RESULTS FOUND
function displayNoResults (){
    modalNoResult.removeClass('hidden')
    var btnClose = $("#noresult-close-button")
    btnClose.on('click',function(){
        modalNoResult.addClass('hidden')
    })
}
//Timer countdown
var countdown = document.getElementById("countdown")
var countDownDate = new Date("June 16, 2023 12:00:00").getTime()
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;    
    
    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    countdown.innerHTML = `
        <p> Count down to  <img src="https://slack-imgs.com/?c=1&o1=wi32.he32.si&url=https%3A%2F%2Fawesome-con.com%2Fwp-content%2Fuploads%2F2019%2F06%2F114x114-Favicon.png"> Awesome-Con to get your tickets <a href="https://awesome-con.com/">Click Here</a></p>
      <div class="bg-black text-white p-4 rounded-lg inline-block mx-2">
        ${days}<br><span class="text-xs">days</span>
      </div>
      <div class="bg-black text-white p-4 rounded-lg inline-block mx-2">
        ${hours}<br><span class="text-xs">hours</span>
      </div>
      <div class="bg-black text-white p-4 rounded-lg inline-block mx-2">
        ${minutes}<br><span class="text-xs">minutes</span>
      </div>
      <div class="bg-black text-white p-4 rounded-lg inline-block mx-2">
        ${seconds}<br><span class="text-xs">seconds</span>
      </div>
    `;
  if (distance <= 0) {
    clearInterval(x)
    countdown.innerHTML = "The event is here!"
  }
}, 1000);
//function to display countdown onto the page
function displayTime() {
    var date = new Date();
    var month = date.toLocaleString('default', { month: 'short' })
    var day = date.getDate().toString().padStart(2, '0')
    var hours = date.getHours().toString().padStart(2, '0')
    var minutes = date.getMinutes().toString().padStart(2, '0')
    var seconds = date.getSeconds().toString().padStart(2, '0')
    var time = month + " " + day + " " + hours + ":" + minutes + ":" + seconds
    var clock = document.getElementById('clock')
    var currentTime = clock.innerHTML
    if (currentTime !== time) {
        clock.innerHTML = time
    }
}
displayTime();
setInterval(displayTime, 1000)