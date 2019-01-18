/**
 * @file: movieComponent.js
 * @author: Marius Cozma
 * file that contains the movie Vue component
*/
/**
* movieComponent module that contains the movie component needed to populate
* a movie list
* @module movieComponent
*/

export default {
    /**The array of movies passed by the parent vue component */
    props: ['movie'],
    template: `
        <li class="movie-li">
            
            <div 
                @mouseover="showDescription" 
                @mouseout="hideDescription" 
                v-on:click="idTosessionStorage"
                class="movies-container"
            >
                <a href="./movie.html">
                    <img :src=" 'https://image.tmdb.org/t/p/original' + movie.poster_path"
                        alt="Movie image"
                    >
                </a>
                <div v-show="hover" class="movie-description">
                    <h2>{{movie.title}}</h2>
                    <div class="overview">{{movie.overview}}</div>
                    <a class="info" href="./movie.html">More info</a>
                </div>
            </div>
            
        </li>
    `,
    data() {
        return {
            hover: false, // property needed to hide and show details
        }
    },
    methods: {
        /**
         * Method that sets the hover property to true
         */
        showDescription() {
            this.hover = true;
        },
        /**
         * Method that sets the hover property to false
         */
        hideDescription() {
            this.hover = false;

        },
        /**Save the id of the clicked film, doing that if the user clicks the film
        * in session storage there will be the id of the selected movie, so in the
        * movie page I will know which film to show
        */
        idTosessionStorage() {
            sessionStorage.setItem('movieId', this.$props.movie.id)
        }
    }
}