/**
 * @file: movieComponent.js
 * @author: Marius Cozma
 * file that contains the movieList Vue component
*/
/**
* movieListComponent module
* @module movieListComponent
*/

import movieComponent from './movieComponent.js'

export default {
    /**
     * The movies array needed to populate the list
     */
    props: ['movies'],
    components: {
        'movie-component': movieComponent,
    },
    template: `
        <ul class="movie-list-ul">
            <movie-component 
                v-for="movie in movies"
                v-bind:key="movie.id"
                v-bind:movie="movie"
            ></movie-component>
        </ul>
    `
   
}