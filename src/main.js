var page = 1

async function getTrendingMovies() {
    try {

        var response = await apiAxios('/trending/movie/day?language=en-US');
    } catch (e) {
        console.log(e);
    }
    if (response.status == 200) {

        movies = response.data.results;
        

        const moviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
        moviesContainer.innerHTML = ""

        movies.forEach(movie => {


            const singleMovieContainer = document.createElement('div');
            singleMovieContainer.classList.add('movie-container');

            const movieImage = document.createElement('Img');
            movieImage.classList.add('movie-img');
            movieImage.setAttribute('alt', movie.title);
            movieImage.setAttribute('data-src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
            movieImage.setAttribute('id', movie.id);
            ImageEvent(movieImage, movie.id, movie.title);
            lazyloaderObserver.observe(movieImage)

            singleMovieContainer.appendChild(movieImage);
            // moviesContainer.appendChild(singleMovieContainer);
            moviesContainer.appendChild(singleMovieContainer);

        });
    }
    else {
        console.log('ERROR EN LA RESPUESTA DEL SERVIDOR')
    }

}

async function getMoviesCategories() {

    var response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=es', options);
    var data = await response.json();
    let categories = data.genres;
    const categoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
    categoriesContainer.innerHTML = ""

    if (response.ok) {
        categories.forEach(categorie => {

            const singleCategorie = document.createElement('div');
            singleCategorie.classList.add('category-container');
            const categoryTitle = document.createElement('h3');
            categoryTitle.classList.add('category-title');
            categoryTitle.setAttribute('id', 'id' + categorie.id);
            categoryTitle.innerHTML = categorie.name;
            categoryTitle.addEventListener('click', function () {
                location.hash = `#category=${categorie.id}-${categorie.name}`;
            });
            singleCategorie.appendChild(categoryTitle);
            categoriesContainer.appendChild(singleCategorie);
        });
    }

}

async function getMoviesByGenre(id) {
    
    
    

    
    let result = await apiAxios(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${id}`);
    if (result.status == 200) {
        let movies = result.data.results

        let moviesContainer = document.getElementById('genericList')


        movies.forEach((movie) => {
            const singleMovieContainer = document.createElement('div');
            singleMovieContainer.classList.add('movie-container');

            const movieImage = document.createElement('Img');
            movieImage.classList.add('movie-img');
            movieImage.setAttribute('alt', movie.title);
            movieImage.setAttribute('data-src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
            movieImage.setAttribute('id', movie.id);
            lazyloaderObserver.observe(movieImage);
            ImageEvent(movieImage, movie.id, movie.title);


            singleMovieContainer.appendChild(movieImage);
            // moviesContainer.appendChild(singleMovieContainer);
            moviesContainer.appendChild(singleMovieContainer);
        })
        
        window.addEventListener('scroll',  prueba = ()=>{
            pruebaasync(id);
            

            
        })
        
        

    }

}

async function getMoviesByKeywords(word) {
    let response = await apiAxios('/search/movie', {
        params:
            { query: word }

    });
    let movies = response.data.results;

    let moviesContainer = document.getElementById('genericList');
    moviesContainer.innerHTML = "";

    movies.forEach((movie) => {
        const singleMovieContainer = document.createElement('div');
        singleMovieContainer.classList.add('movie-container');

        const movieImage = document.createElement('Img');
        movieImage.classList.add('movie-img');
        movieImage.setAttribute('alt', movie.title);
        movieImage.setAttribute('data-src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        movieImage.setAttribute('id', movie.id);
        lazyloaderObserver.observe(movieImage);
        ImageEvent(movieImage, movie.id, movie.title);

        singleMovieContainer.appendChild(movieImage);
        // moviesContainer.appendChild(singleMovieContainer);
        moviesContainer.appendChild(singleMovieContainer);
    })

}

async function getMovieDetails(movie_id) {
    let result = await apiAxios(`/movie/${movie_id}`);
    movieDetailScore.innerHTML = result.data.vote_average.toFixed(2);
    movieDetailDescription.innerHTML = result.data.overview;
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + result.data.poster_path;
    headerSection.style.background = `
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.35) 19.27%,
      rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgUrl})
  `;
    insertCategories(movieDetailCategoriesList, result.data.genres);
    getRelatedMovies(movie_id);
}

async function getPopularMoivies(n){
    let result = await apiAxios(`/movie/popular?language=en-US&page=${n}`);
    insertImage(genericSection, result.data.results);
}

async function getRelatedMovies(movie_id) {
    let result = await apiAxios(`/movie/${movie_id}/recommendations`);
    let showedMovies = result.data.results.slice(0, 5);
    insertImage(relatedMoviesContainer, showedMovies);

}

function ImageEvent(imagen, id, tittle) {
    imagen.addEventListener('click', function () {
        location.hash = `#movie=${id}-${tittle}`;
    })
}

function insertImage(moviesContainer, movies) {

    moviesContainer.innerHTML = "";

    movies.forEach((movie) => {
        const singleMovieContainer = document.createElement('div');
        singleMovieContainer.classList.add('movie-container');
        const movieImage = document.createElement('Img');
        movieImage.classList.add('movie-img');
        movieImage.setAttribute('alt', movie.title);
        movieImage.setAttribute('data-src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        lazyloaderObserver.observe(movieImage)
        movieImage.setAttribute('id', movie.id);
        ImageEvent(movieImage, movie.id, movie.title);
        singleMovieContainer.appendChild(movieImage);
        moviesContainer.appendChild(singleMovieContainer);
    })
}

function insertCategories(categoriesContainer, categories) {
    categoriesContainer.innerHTML = ""
    categories.forEach(categorie => {
        const singleCategorie = document.createElement('div');
        singleCategorie.classList.add('category-container');
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + categorie.id);
        categoryTitle.innerHTML = categorie.name;
        categoryTitle.addEventListener('click', function () {
            location.hash = `#category=${categorie.id}-${categorie.name}`;
        });
        singleCategorie.appendChild(categoryTitle);
        categoriesContainer.appendChild(singleCategorie);
    })
}

async function pruebaasync (id){ 
          
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let clientHeight= document.documentElement.clientHeight;
    let scrollBottom = scrollTop + clientHeight > scrollHeight-20  ;        
    if (scrollBottom){ 
        page+=1        
        await getMoviesByGenre(id, page);        
        window.removeEventListener('scroll', prueba)
    }
}


let callback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            let urls = entry.target.getAttribute('data-src');
            entry.target.setAttribute('src', urls);
            entry.target.addEventListener('error',()=>{
                entry.target.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/1548/1548682.png')
            })
        }
    });
};

const lazyloaderObserver = new IntersectionObserver(callback)