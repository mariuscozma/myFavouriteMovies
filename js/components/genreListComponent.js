/**
 * @file: genreListComponent.js
 * @author: Marius Cozma
 * file that contains the genreList Vue component
*/
/**
* genreListComponent module that contains the genres ul and its container
* @module genreListComponent
*/

/**The genre component needed to populate the the list */
import genreComponent from './genreComponent.js'

export default {
    /**
     * The genres array that contains all the genres to display passed by the parent 
     * component and the genresDisplayed property also passed by the parent, needed
     * to show or hide the genres list container.
     */
    props: ['genres', 'genresDisplayed'],
    components: {
        'genre-component': genreComponent,
    },
    template: `
        <div
            v-bind:genresDisplayed="genresDisplayed"
            v-on:click="closeGenres"
            class="categories-list"
        >
            <div class="genres-ul-container">
                <ul class="genres-ul">
                    <genre-component
                        v-on:li_genre_id="getIdFromGenre"
                        v-for="genre in genres"
                        v-bind:key="genre.id"
                        v-bind:genre="genre" 
                    >
                    </genre-component>
                </ul>
            </div>
        </div>
    `,
    methods: {
        /**
         * Method that send an event to parent in order to say him 
         * to hide the genres container
         */
        closeGenres() {
            //Say to parent to close 
            this.$emit('close_genres');
        },
        /**
         * Method that passes to the parent element the id received from the
         * genre component 
         * @param {number} id 
         */
        getIdFromGenre(id) {
            this.$emit('ul_genre_id', id)
        }
    },
}