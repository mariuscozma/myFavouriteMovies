/**
 * @file: genreComponent.js
 * @author: Marius Cozma
 * file that contains the genre Vue component

/**
* genreComponent module that contains the genre component 
* that has to stay into an ul
* @module genreComponent
*/

export default {
    props: ['genre'], //The genre passed by the parent needed to put datas into the li
    template: `
        <li class="genre"
            v-on:click="passGenreIdToParent" 
        >
            {{genre.name}}
        </li>
    `,
    methods: {
        /**
         * Method that pass to the parent the key of the clicked genre
         */
        passGenreIdToParent() {
            this.$emit('li_genre_id', this.$vnode.data.key)
        }
    }

}
