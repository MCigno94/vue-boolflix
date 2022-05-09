<template>
  <div id="app">
    <header>
    <img src="https://fontmeme.com/permalink/220509/c0312dea3f976bc738b9ef8200ecfd49.png" alt="3d-rotation" border="0">
    <div>movies</div>
    <input v-model="query" type="text">
    <button @click="callApi">clik</button>
    </header>
    <main>
      <div class="container">
        <div class="row row-cols-6">
          <div class="cols" v-for="movie in movies" :key="movie.id">
            <div class="card">
              <img :src="movie.backdrop_path" alt="">
              <div class="card-body">
                <h3>{{movie.title}}</h3>
                <p>{{movie.id}}</p>
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
