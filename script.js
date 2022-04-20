const apiKey = "api_key=efb8d52d72f50732f48333d163521021";
const mainURL = "https://api.themoviedb.org/3";
const apiURL = `${mainURL}/discover/movie?sort_by=popularity.desc&${apiKey}`
console.log(apiURL)
const IMG_URL = "https://image.tmdb.org/t/p/w500"

const main = document.getElementById("main")
const form = document.getElementById('form')
const search = document.getElementById('search')


function getMovies(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data.results)
      showMovies(data.results);
    })
}

getMovies(apiURL)

function showMovies(data){

  main.innerHTML = '';

  data.forEach(movie => {
    const {title,poster_path, overview} = movie;
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML =`
    <img
      src="${IMG_URL+poster_path}" alt="${title}"/>

    <div class="movie-info">
      <h3>${title}</h3>
    </div>

    <div class="overview">
      ${overview}
    </div>
`
main.appendChild(movieElement);

  })
}

const searchURL = `${mainURL}/search/movie?${apiKey}`;
console.log(searchURL)

form.addEventListener('submit', (event) =>{
  event.preventDefault();

  const searchTitle = search.value;
  if (searchTitle){
    getMovies(`${searchURL}&query=${searchTitle}`)
  }
  else{
    getMovies(apiURL)
  }
})

//random film
//like button