<template>
  <div id="app">
    <header>
    <img src="https://fontmeme.com/permalink/220509/c0312dea3f976bc738b9ef8200ecfd49.png" alt="3d-rotation" border="0">
    <div>movies & series</div>
    <input v-model="query" type="text">
    <button @click="callApi">clik</button>
    </header>
    <main>
      <div class="container py-4">
        <div class="row row-cols-6 py-4 g-3">
          <div class="cols" v-for="movie in movies" :key="movie.id">
            <div class="card h-100">
              <img :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path" alt="movie.title">
              <div class="card-body">
                <h3 v-if="movie.title">{{movie.title}}</h3>
                <h3 v-else>{{movie.name}}</h3>
                <p v-if="movie.original_title">{{movie.original_title}}</p>
                <p v-else>{{movie.original_name}}</p>
                <flag  :iso ="movie.original_language" />
                <p>Lingua: {{movie.original_language}}</p>
                <p>Voto: {{movie.vote_average}}</p>
              </div>
            </div>
            <!-- /.card -->
          </div>
          <!-- /.cols -->
        </div>
      </div>
      <!-- /.container -->
    </main>
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
      API_URL_MOVIE: 'https://api.themoviedb.org/3/search/movie?api_key=a2c29c1744af97a151f88b2cd413254a&language=it-IT&page=1&include_adult=false&query=',
      API_URL_SERIE: 'https://api.themoviedb.org/3/search/tv?api_key=a2c29c1744af97a151f88b2cd413254a&language=it-IT&page=1&include_adult=false&query=',
      query: '',
      movies: null,
      language: '',
      loading: true
    }
  },
  computed: {

  },
  methods: {
    callApi(){
      axios
      .get(`${this.API_URL_MOVIE}${this.query}` + `${this.API_URL_SERIE}${this.query}`)
      .then((response) => {
          this.movies = response.data.results;
          this.loading = false;
          //console.log(this.movies);
      })
      .catch(error => {
          console.log(error);
          error;
          this.error = `Sorry There is a problem! ${error}`
      })
      .finally(() => this.loading = false)
    },
  }
}
</script>

<style lang="scss">
@use '@/assets/scss/style.scss';

</style>
