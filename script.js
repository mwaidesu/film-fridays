document.addEventListener("DOMContentLoaded", function () {
  getMovies();
  showMovies();
});

const apiKey = "api_key=efb8d52d72f50732f48333d163521021";
const mainURL = "https://api.themoviedb.org/3";
const apiURL = `${mainURL}/discover/movie?sort_by=popularity.desc&${apiKey}`;
//console.log(apiURL)
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

//get data from API for movies on landing page
function getMovies(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data.results)
      showMovies(data.results);
    })
    .catch(err => alert.warn(err.message))
}

getMovies(apiURL);


//display movies on 
function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, overview } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
    <img
      src="${IMG_URL + poster_path}" alt="${title}"/>

    <div class="movie-info">
      <h3>${title}</h3>
    </div>

    <div class="overview">
      ${overview}
    </div>
`;
    main.appendChild(movieElement);
  });
}

const searchURL = `${mainURL}/search/movie?${apiKey}`;
//console.log(searchURL)

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchTitle = search.value;
  if (searchTitle) {
    getMovies(`${searchURL}&query=${searchTitle}`);
  } else {
    getMovies(apiURL);
  }
});



//random film button
const randomButton = document.getElementById("random");

randomButton.addEventListener("click", function () {

  function generateRandom(maxLimit = 40) {
    let rand = Math.random() * maxLimit;

    rand = Math.floor(rand);

    return rand;
  }
  let randomNum = generateRandom();
  console.log(randomNum);

  let year = 1990 + randomNum;
  const popularURL = `${mainURL}/discover/movie?primary_release_year=${year}&sort_by=vote_average.desc&${apiKey}`;

  getMovies(popularURL);
});

//home Button
const homeButton = document.getElementById("home");
homeButton.addEventListener("click", function(){
  window.location.reload();
})