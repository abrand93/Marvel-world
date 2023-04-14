fetch(
    "http://gateway.marvel.com/v1/public/characters?name=hulk&apikey=3a63bd6dec07e5572fe2f09b18064abe"
)
    .then((res) => res.json())
    .then((data) => console.log(data))