window.addEventListener('DOMContentLoaded', navigation, false);
window.addEventListener('hashchange', navigation, false);

function navigation() {
    if (location.hash.startsWith('#trends')) {
        trendsPage();
        

    } else if (location.hash.startsWith('#search=')) {
        searchPage();

    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();

    } else if (location.hash.startsWith('#category=')) {
        categories();

    } else {
        location.hash = 'home';
        homePage();
    }

}
function homePage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    searchFormInput.value=""
    searchFormInput.placeholder="Busca tú película"
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    getTrendingMovies();
    getMoviesCategories();
}
function categories() {
    let navigationInformation = location.hash.split('=')[1].split('-');
    let id = navigationInformation[0];
    let categoriename = decodeURI(navigationInformation[1]);
    headerCategoryTitle.innerHTML='';
    headerCategoryTitle.innerHTML=categoriename;
    let moviesContainer = document.getElementById('genericList');
    moviesContainer.innerHTML="";
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');    
    getMoviesByGenre(id)
}
function movieDetailsPage() {
    let navigationInformation = location.hash.split('=')[1].split('-');
    let id = navigationInformation[0];
    let movieTitle = decodeURI(navigationInformation[1]);
    getMovieDetails(id);
    movieDetailTitle.innerHTML='';
    movieDetailTitle.innerHTML=movieTitle;
    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
}
function searchPage() {
    
    headerCategoryTitle.innerHTML='';
    let navigationInformation = decodeURI(location.hash.split('=')[1]);
    searchFormInput.placeholder=navigationInformation;
    getMoviesByKeywords(navigationInformation)

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
}
function trendsPage() {
    let n = 1
    getPopularMoivies(n);
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    headerCategoryTitle.innerHTML="Pelis en Tendencia"
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    
}

searchFormBtn.addEventListener('click', ()=>{
    location.hash='#search=' + searchFormInput.value
})

arrowBtn.addEventListener('click', function(){
    history.back()
    console.log(document.referrer)
})

trendingBtn.addEventListener('click', ()=>{
    location.hash="#trends";
})



