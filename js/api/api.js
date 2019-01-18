/**
 * @file: api.js
 * @author: Marius Cozma
 * file that contains the methods that makes the api calls to the Movie db
 */

/**
* api module.
* @module api
*/
export default {

    /** 
     * Method that makes the api call to get the popular movies and that sets the first
     * 10 movies received to the movies property of the vue object passed as parameter. Manage also
     * the Vue loader and puts the movies into the session storage.
     * @method getTenFilms
     * @memberof api
     * @param {object} vueObj - the Vue obj where to set the received data
    */
    getTenFilms(vueObj) {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=87b9ba3686d7259efffbdb91ffd8b7ca&language=en-US&page=1')
            .then(response => response.json())
            .then(data => {
                //var moviesToShow = data.results.slice(0, 10)
                vueObj.movies = data.results;
                /**Saving the datas in logal storage in order to have its */
                sessionStorage.setItem('movieList', JSON.stringify(data.results));
                vueObj.showLoader = false;
            })
            .catch(error => console.log('error to get films'))
    },
    /** 
     * Method that makes the call api to get the genres list. The genres list is
     * assigned to the genres property of the vue object passed as parameter
     * @method getGenres
     * @memberof api
     * @param {object} vueObj - the Vue obj where to set the received data
    */
    getGenres(vueObj) {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=87b9ba3686d7259efffbdb91ffd8b7ca&language=en-US')
            .then(response => response.json())
            .then(data => vueObj.genres = data.genres)
            .catch(error => console.log('error to get genres'))
    },
    /** 
     * Method that makes the call api to get the movie details. The movie details object is assigned
     * to the movie property of the vue object passed as parameter. Manage also the loader and sets
     * the imageUrl property of the vue object needed to show the movie image.
     * @method getMovieDetails
     * @memberof api
     * @param {object} vueObj - Vue object
     * @param {number} id - the id of the movie we want more details
    */
    getMovieDetails(vueObj, id) {
        vueObj.apiCallsCounter++;
        fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=87b9ba3686d7259efffbdb91ffd8b7ca&language=en-US')
            .then(response => response.json())
            .then(data => {
                vueObj.movie = data;
                vueObj.imageUrl = 'https://image.tmdb.org/t/p/original' + data.poster_path;
                vueObj.apiCallsCounter--;
                if (vueObj.apiCallsCounter == 0) {
                    vueObj.showLoader = false;
                }
            })
            .catch(error => console.log('error to get movie details'))
    },
    /** 
     * Method that makes the call api to get the similar movies of a movie. The the similar
     * movies array is assigned to the similarMovies property of the vue object passed as parameter. 
     * Manage also the loader. Also manage the no result found display.
     * @method getSimilarMovies
     * @memberof api
     * @param {object} vueObj - Vue object
     * @param {number} id - the id of the movie we want similar movies
    */
   getSimilarMovies(vueObj, id) {
    vueObj.apiCallsCounter++;
    fetch('https://api.themoviedb.org/3/movie/' + id + '/similar?api_key=87b9ba3686d7259efffbdb91ffd8b7ca&language=en-US')
        .then(response => response.json())
        .then(data => {
            vueObj.genreResults = false
            vueObj.similarMovies = data.results.slice(0,3);
            vueObj.apiCallsCounter--;
            if (vueObj.apiCallsCounter == 0) {
                vueObj.showLoader = false;
            }
            if (data.results.length <= 0) {
                vueObj.genreResults = true
            }
        })
        .catch(error => console.log('error to get movie details'))
}

};