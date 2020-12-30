const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

//initially get movies
getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url)
    const resData = await res.json();

    //console.log(resData);
    
    displayMovies(resData.results);
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else 
    return 'red';   
}  

function displayMovies(movies) {
    //clear main
    main.innerHTML = '';

    movies.forEach((movie) => {

      const {poster_path, title, vote_average, overview} = movie;
        
      const movieEl = document.createElement('div');
        movieEl.classList.add('movie')   
    
      movieEl.innerHTML = `
      <img 
        src="${IMG_PATH + poster_path}" 
        alt="${title}" 
      />
         <div class="movie-info">
                <h3> ${title} </h3>
                <span class="${getClassByRate(vote_average)}"> ${vote_average}</span>
         </div> 
            
         <div class="overview">
         <h4> Story plot: </h4>
            ${overview}
         </div>
         `;         

            main.appendChild(movieEl);
             })
}

form.addEventListener('submit', (e) => {
        e.preventDefault();

        const searchMovie = search.value;    

        if(searchMovie) {
            getMovies(SEARCH_API + searchMovie) 
            search.value = '';
        }
        else {

        }
            
});
