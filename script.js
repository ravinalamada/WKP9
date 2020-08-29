console.log('works');

const list = document.querySelector('.list');

async function fetchMovie() {
  const response = await fetch('https://ghibliapi.herokuapp.com/films', {
    headers: {
      Accept: 'application/json',
    },
  })
  const movies = await response.json();
  return movies;
}

async function displayMovies() {
  const moviesList = await fetchMovie();
  const sortedMovieList = moviesList.sort((a, b) => b.rt_score - a.rt_score);
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
  list.innerHTML = html.join('');
}

displayMovies();



