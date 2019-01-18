/**
 * @file: home.js
 * @author: Marius Cozma
 * Js file for the home page
 */

import api from './api/api.js';
import menuComponent from './components/menuComponent.js'
import movieListComponent from './components/movieListComponent.js'

/**Vue object that contains the elements of the home page */
var home = new Vue({
  el: '#home',
  components: {
    'movie-list': movieListComponent,
    'menu-component': menuComponent,
  },
  data: {
    movies: [],          // The movies array filled up with the datas received from the api
    originalMovies: [],  // The original array of movies without filters
    genres: [],          // The movies array filled up with the datas received from the api
    genreNameSelected: "All Genres",  // Used to display the films genre that are shown
    /**
     * Needed to know if is the first time the user filter the films by genre in order to know
     * if to store the movies into the orignal movies array
     */
    firstTimeFilteredByGenre: true,   
    showLoader: false,  // Needed to show or hide the loader when api calls are made
    genreResults: false
  },
  methods: {
    /**
     * Method that sorts by vote the movies array 
     */
    sortByVote() {
      this.movies.sort((movieA, movieB) => movieB.vote_average - movieA.vote_average);
    },
    /**
     * Method that sorts by release date the movies array 
     */
    sortByReleaseDate() {
      this.movies.sort((movieA, movieB) =>
        new Date(movieB.release_date) - new Date(movieA.release_date));
    },
    /**
     * Method that sorts by popularity date movies array 
     */
    sortByPopularity() {
      this.movies.sort((movieA, movieB) => movieB.popularity - movieA.popularity);
    },
    /**
     * Method that filters by genre the movies and that make a copy of the original 
     * movies array if it's the first time that the user filters the movies
     * @param {number} id - the genre id of the movies that have to be shown
     */
    filterByGenre(id) {
      //Copy the original array into the original movie data property
      if (this.firstTimeFilteredByGenre) {
        this.originalMovies = this.movies.slice();
        this.firstTimeFilteredByGenre = false;
      }
      //filter the original array by genre
      this.movies = this.originalMovies.filter((movie) =>
        movie.genre_ids.find((movieId) => movieId == id))

      this.genreNameSelected = this.genres.find((genre) => genre.id == id).name;
      if(this.movies.length <= 0) {
        this.genreResults = true;
      } else {
        this.genreResults = false;
      }
    },
    /**
     * Method that sets the movies array to the original movies array if a genre filter
     * has been setted before
     */
    seeAllFilms() {
      if (!this.firstTimeFilteredByGenre) {
        this.movies = this.originalMovies.slice();
        this.genreResults = false;
      }
    }
  },
})

/**
 * Api calls to get the data
 */
api.getTenFilms(home);
api.getGenres(home);
