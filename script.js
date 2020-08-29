console.log('works');
// Grab element that is needed
const list = document.querySelector('.list');

// Fetched the movie from the url
async function fetchMovie() {
  const response = await fetch('https://ghibliapi.herokuapp.com/films', {
    headers: {
      Accept: 'application/json',
    },
  })
  const movies = await response.json();
  return movies;
}

// This function generate html and append it into the DOM
async function displayMovies() {
  const moviesList = await fetchMovie();
  // sorted the movie's score
  const sortedMovieList = moviesList.sort((a, b) => b.rt_score - a.rt_score);

  // Generated html
  const html = sortedMovieList.map(movie => {
    return `
      <li class="item" id="${movie.id}">
        <div class="list-header">
          <h2 class="list-heading">${movie.title}</h2>
          <span>${movie.release_date}</span>
          <span class="score">${movie.rt_score}</span>
        </div>
        <p class="desc">${movie.description}</p>
        <div class="list-footer">
          <span>${movie.director}</span>
          <span>${movie.producer}</span>
        </div>
      </li>
      `;
  });

  //Append the html into the DOM
  list.innerHTML = html.join('');
}

displayMovies();



