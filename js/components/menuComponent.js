/**
 * @file: menuComponent.js
 * @author: Marius Cozma
 * file that contains the menu Vue component
*/
/**
* menuComponent module that contains all the menu components and the menu struction
* @module menuComponent
*/


import genreListComponent from './genreListComponent.js'

export default {
	/**
	 * The genres array received from the parent Vue needed to pass the data to 
	 * the genreListCOmponent and the movies array also received from the parent needed
	 * to generate a random film id needed from the random menu voice
	 */
	props: ['genres', 'movies'],
	components: {
		'genres-list': genreListComponent,
	},
	template: `
		<div class="menu">
			<div class="logo-container">
				<a href="./home.html">
					<img :src="logo" alt="Logo image">
				</a>
			</div>
			<div class="buttons-container">
				<div  class="menu-voice">
					<a href="./home.html">Home</a>
				</div>
				<div class="menu-voice"
					v-on:click="setRandomPageId">
					<a href="./movie.html">Random</a>
                </div>
				<div 
					v-on:click="showGenres" 
					class="menu-voice categories">
					Categories
				</div>
			</div>
			<genres-list 
				v-show="genresDisplayed"
				v-on:click="showGenres"
				v-on:close_genres="hideGenres"
				v-bind:genres="genres"
				v-on:ul_genre_id="getIdFromGenresList"
			>
			</genres-list>
		</div>
    `,
	data() {
		return {
			logo: './assets/img/logo.png',
			genresDisplayed: false,  //property used to show and hide the genres list container
		}
	},
	methods: {
		/**
		 * Method that sets the genresDisplayed property to true in order to show the genres list
		 */
		showGenres() {
			this.genresDisplayed = true;
			document.getElementsByTagName('body')[0].style.overflow = 'hidden';
		},
		/**
		 * Method that sets the genresDisplayed property to false in order to hide the genres list
		 */
		hideGenres() {
			this.genresDisplayed = false;
			document.getElementsByTagName('body')[0].style.overflow = 'visible';
		},
		/**
		 * Method that takes the id of the genre selected passed by the genreListComponent and that
		 * passed it to the parent component
		 * @param {number} id 
		 */
		getIdFromGenresList(id) {
			this.$emit('menu_genre_id', id)
		},
		/**
		 * Method that generate a random id taken from the movies array and that sets it
		 * as a property of the sessionStorage object
		 */
		setRandomPageId() {
			sessionStorage.setItem('movieId',
				this.$props.movies[Math.floor((Math.random() * this.$props.movies.length))].id)
		}
	},
}