// import initialFetchMovie from './fetch-data';
// Selecting DOM Elements
const movieTitle = document.querySelector('.movie-title');
const movieImg = document.getElementById('movie-image');
const movieRatings = document.querySelectorAll('.rate');
const form = document.querySelector('.movie-form');
const movieInput = document.getElementById('movie-input');
const moviesSection = document.querySelector('.movies-center');
const movieRelease = document.querySelector('.movie-release');
const movieDirector = document.querySelector('.movie-director');
const footer = document.querySelector('.main-footer');

const latestMovies = [
  'deep-water',
  'Purple-Hearts',
  '365-Days:-This-Day',
  'the-invitation',
  'speak-no-evil',
  'emily-the-criminal',
  'the-man-from-toronto',
  'persuasion',
  'black-crab',
  'hustle',
  'the-adam-project',
  'thirteen-lives',
];

// DOMContentLoaded
window.addEventListener('DOMContentLoaded', async function () {
  console.log();
  const movieCard = document.querySelector('.movie-card');
  movieInput.value = '';
  for (let i = 0; i <= latestMovies.length - 1 / 2; i++) {
    let fetchedMovie = await initialFetchMovie(latestMovies[i]);
    console.log(fetchedMovie);
    const {
      Actors,
      Director,
      Genre,
      Poster,
      Ratings,
      Title,
      Released,
      imdbRating,
    } = fetchedMovie;
    // Storing Movie Object in the Local Storage for later use
    this.localStorage.setItem(latestMovies[i], JSON.stringify(fetchedMovie));
    // Setting DOM Element Content
    console.log(Ratings);
    let ratings = Ratings.map((rate) => {
      if (rate.Source === 'Internet Movie Database') {
        rate.Source = 'IMDb';
      }
      return `${rate.Source}: ${rate.Value}`;
    });

    console.log(ratings);
    // for (let i = 0; i < ratings.length; i++) {
    //   movieRatings[i].textContent = ratings[i];
    // }

    moviesSection.innerHTML += `
    <article class="movie-card grid-item">
    <!-- Movie Title -->
    <h2 class="movie-title">${Title}</h2>
    <!-- Image Container -->
    <div class="img-container">
      <a href="about.html"><img src="${Poster}" alt="" id="movie-image" /></a>
    </div>

    <!-- Movie Info -->
    <div class="movie-info">
      <span class="movie-release">Release Year: ${Released}</span>
      <span class="movie-director">Directed By: ${
        Director.split(' ')[0]
      } ${Director.split(' ')[1].replace(',', '')}</span>
    </div>
    <!-- Movie Ratings -->
    <div class="movie-ratings">
      <span class="internet-movie-database rate">${ratings[0]}</span>
      <span class="rotter-tomatoes rate">${ratings[1]}</span>

    </div>
  </article>`;
  }
});

// Listening For Form Submission
form.addEventListener('submit', async function (event) {
  // Prevent Form Default Behaviour
  event.preventDefault();
  // Logging Input
  console.log(movieInput.value.replaceAll(' ', '-'));
  // Sending HTTP GET Request to the API
  let movieObject = await fetchMovieByName(
    movieInput.value.replaceAll(' ', '-')
  );
  console.log(movieObject);
  // Destructuring Every Movie Object
  const { Title, Poster, Ratings, Director, Released } = movieObject;

  let ratings = Ratings.map((rate) => {
    return `${rate.Source}: ${rate.Value}`;
  });

  moviesSection.innerHTML += `
  <article class="movie-card grid-item">
  <!-- Movie Title -->
  <h2 class="movie-title">${Title}</h2>
  <!-- Image Container -->
  <div class="img-container">
    <img src="${Poster}" alt="" id="movie-image" />
  </div>

  <!-- Movie Info -->
  <div class="movie-info">
    <span class="movie-release">Release Year: ${Released}</span>
    <span class="movie-director">Directed By: ${
      Director.split(' ')[0]
    } ${Director.split(' ')[1].replace(',', '')}</span>
  </div>
  <!-- Movie Ratings -->
  <div class="movie-ratings">
    <span class="internet-movie-database rate">${ratings[0]}</span>
    <span class="rotter-tomatoes rate">${ratings[1]}</span>
  </div>
</article>`;

  console.log(Title, Poster, Director, Ratings);
  movieInput.value = '';
});

// First Some Initial Movies After DOM Content has been loaded successfully
async function initialFetchMovie(movieName) {
  try {
    let response = await fetch(
      `http://www.omdbapi.com/?apikey=8f7c9dc&t=${movieName}&y=2022`
    );

    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Fetch Movie By Name Provided By User
async function fetchMovieByName(movieName) {
  try {
    let response = await fetch(
      `http://www.omdbapi.com/?apikey=8f7c9dc&t=${movieName}`
    );

    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
