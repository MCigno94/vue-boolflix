<template>
  <div id="app">
    <header>
    <img src="https://fontmeme.com/permalink/220509/c0312dea3f976bc738b9ef8200ecfd49.png" alt="3d-rotation" border="0">
    <div>movies & series</div>
    <input v-model="query" type="text">
    <button @click="callApiMovie()">clik</button>
    </header>
    <main>
      <div class="container py-4">
        <div class="row row-cols-6 py-4 g-3">
          <div class="cols" v-for="movie in allSearch" :key="movie.id">
            <div class="card h-100">
              <img class="hover" :src="movie.poster_path ? ('https://image.tmdb.org/t/p/w342' + movie.poster_path) : 'https://via.placeholder.com/342'" :alt="movie.title">
              <div class="card-body">
                <h4 v-if="movie.title">{{movie.title}}</h4>
                <h4 v-else>{{movie.name}}</h4>
                <p v-if="movie.original_title">{{movie.original_title}}</p>
                <p v-else>{{movie.original_name}}</p>
                <p>Lingua: <flag class="flag_icon" :iso ="flag(movie)" /></p>
                <span v-for="vote in votes" :key="vote">
                  <font-awesome-icon :class="stars(movie) > vote ? 'star_vote' : 'star_no_vote'" icon="fa-solid fa-star" />            
                </span>
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
      allSearch: [],
      language: '',
      votes: 5,
      loading: true
    }
  },
  methods: {
    callApiMovie(){
      const movie = axios.get(`${this.API_URL_MOVIE}${this.query}`);
      const serie = axios.get(`${this.API_URL_SERIE}${this.query}`);

      axios
      Promise.all([movie, serie])
      .then(
        axios.spread((...n) => {
          const movies = n[0].data.results;
          const series = n[1].data.results;

          this.allSearch = []
          movies.forEach(movie => {
          this.allSearch.push(movie)
          });
          series.forEach(serie => {
          this.allSearch.push(serie)
          });
          console.log(this.allSearch);
        })
      )
        .catch(error => {
        console.log(error);
        error;
        this.error = `Sorry There is a problem! ${error}`
      })
        .finally(() => this.loading = false)
    },
    flag(element) {
      if(element.original_language === 'en'){
        return element.original_language = 'gb'
      } else {
        return element.original_language
      }
    },
    stars(element){
      let votes = element.vote_average / 2;
      if((votes - Math.trunc(votes)) >= 0.5){
        return votes = Math.ceil(votes);
      } else {
        return votes = Math.floor(votes);
      }
    }
  },
  mounted() {
  },
}
</script>

<style lang="scss">
@use '@/assets/scss/style.scss';
.star_vote {
  color: #ffe43b;
}
.star_no_vote {
  color: #a3adba;
}
.card {
  position: relative;
    transition-duration: 2s;

}
.hover {
  transition: all 2s ease;
}
.card:hover .hover{
transform: rotateY(180deg);
filter: brightness(0.1);
}
.card-body {
  position: absolute;
  display: none;
}
.card:hover .card-body{
    transition-duration: 2s;

  display: block;
}
</style>
