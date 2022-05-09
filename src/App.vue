<template>
  <div id="app">
    <img src="https://fontmeme.com/permalink/220509/c0312dea3f976bc738b9ef8200ecfd49.png" alt="3d-rotation" border="0">
    <div>movies</div>
    <input v-model="query" type="text">
    <button @click="callApi">clik</button>
  </div>
</template>

<script>
import axios from "axios";
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      query: '',
      movies: null,
      loading: true
    }
  },
  methods: {
    callApi(){
      axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=a2c29c1744af97a151f88b2cd413254a&language=it-IT&page=1&include_adult=false&query=${this.query}`)
      .then((response) => {
          this.movies = response.data.results;
          this.loading = false;
          //console.log(this.movies);
      })
      .catch(error => {
          console.log(error);
          error;
          this.error = `Sorry There is a problem! ${error}`
      });
    },
  }
}
</script>

<style lang="scss">
@use '@/assets/scss/style.scss';

</style>
