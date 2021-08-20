const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const main = document.getElementById('main');
const search = document.getElementById('search');
const form = document.getElementById('form');

const getMovies = async (url) => {
  const res = await fetch(url);
  const { results } = await res.json();

  if (results.length === 0) {
    main.classList.add('centered');
    main.innerHTML = 'Sorry, no movies found.';
  }

  showMovies(results);
};

getMovies(API_URL);

const scoreColor = (score) => {
  if (score >= 7.5) return ' green';
  else if (score >= 6.5) return 'orange';
  else return 'firebrick';
};

const showMovies = (movies) => {
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const el = document.createElement('div');
    el.classList.add('movie');

    el.innerHTML = `
    <div>
      <img src="${IMG_PATH + poster_path}" alt="${title}" />
      <div class='movie-info'><h3>${title}</h3>
      <span style='color: ${scoreColor(vote_average)}'>${vote_average}</span>
      <div>
      </div>
      `;

    main.appendChild(el);
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const term = search.value;

  if (term && term !== '') {
    main.innerHTML = '';
    getMovies(SEARCH_API + term);
    search.value = '';
  } else {
    alert('Please enter a valid value');
  }
});
