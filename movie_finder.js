const API_KEY = "200a0232"; // Use your actual OMDB API key
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

var searchinput = document.getElementById("search-input"); 
var card = document.getElementsByClassName(".movie-cards");

document.getElementsByClassName("search")[0].addEventListener("click",function(){ 
	console.log(searchinput.value);
  const query = searchinput.value;
  if (query){
    getMovies(API_URL+query);

}
});

async function getMovies (url){
  const resp = await fetch(url); 
  const respData = await resp.json();
  console.log(respData);
  showMovies(respData.Search);
}

async function showMovies(movies) {
  card.innerHTML = "";

  if (movies && movies.length > 0) {
      await Promise.all(
          movies.map(async function (movie) {
              const movieData = await fetch(`${API_URL}&i=${movie.imdbID}`);
              const movieDataObj = await movieData.json();
              movie_display(movieDataObj);
          })
      );
  } else {
      console.log("No movies found or API error");
  }
}


function movie_display(imovie) {
  const movieElm = document.createElement("div");
  movieElm.classList.add("movie-card");
  movieElm.innerHTML = `
   <div class="card">
   <img src="${imovie.Poster}" alt="Poster" width="300px" height="300px" />
   <br>
   <div class="movie-description">
   <span class="movie-title"><b>Title</b><span class="value">${imovie.Title}</span></span>
   <span class="movie-title"><b>Rating</b><span class="value">${imovie.imdbRating}</span></span>
   <span class="movie-title"><b>Director</b><span class="value">${imovie.Director}</span></span>
   <span class="movie-title"><b>Released Date</b><span class="value">${imovie.Released}</span></span>
   <span class="movie-title"><b>Genre</b><span class="value">${imovie.Genre}</span></span>
</div>
</div>
`;
card.appendChild(movieElm);
}

