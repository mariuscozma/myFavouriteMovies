/**
 * @file: movie.js
 * @author: Marius Cozma
 * Js file for the movie page
 */

import api from './api/api.js';
import menuComponent from './components/menuComponent.js'
import movieList from './components/movieListComponent.js'

var movie = new Vue({
  el: '#movie',
  components: {
    'menu-component': menuComponent,
    'movie-list': movieList
  },
  data: {
    movie: {},
    imageUrl: "#",
    showLoader: true,
    movies: JSON.parse(sessionStorage.getItem('movieList')),
    similarMovies: [],
    apiCallsCounter: 0, //tracks how many requests are pending in order to manage the loader
    genreResults: false
  },
  methods: {

  }
})

/**api call to get movie details and similar movies */
api.getMovieDetails(movie, +sessionStorage.getItem('movieId'));
api.getSimilarMovies(movie, +sessionStorage.getItem('movieId'));
document.getElementsByClassName('categories')[0].style.display = 'none';