<template>
  <div id="app">
    <header class="d-flex align-items-center justify-content-between p-3">
      <div class="logo">
        <img class="img-fluid" src="https://fontmeme.com/permalink/220511/0671be00b164a61aecf6b3cf3abf5ee6.png" alt="3d-rotation" border="0">
      </div>
      <!-- /.logo -->
      <form class="form" @submit.prevent="callApiMovie">
        <input placeholder="Cerca un film" v-model="query" type="text">
        <button @click="callApiMovie">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </button>
      </form>
      <!-- form -->
    </header>
    <main>
      <div class="container">
        <section class="films" v-if="movies.length > 0">
          <div class="title_section">
            <h4>MOVIES</h4>
            <span>
              <font-awesome-icon icon="fa-solid fa-film" />
            </span>
          </div>
            <!-- /.title_section -->
          <div class="row row-cols-6 w-100 g-2">
            <div class="cols" v-for="(movie, index) in movies" :key="movie.id">
              <div class="container_card">
              <div class="card">
                <div class="front">
                  <img :src="movie.poster_path ? ('https://image.tmdb.org/t/p/w342' + movie.poster_path) : 'https://www.stardust.it/img/web/film-thumb-layer-placeholder.png'" :alt="movie.title">
                </div>
                <!-- /.front -->
                <div class="back">
                  <div class="description">
                    <p>
                      <strong>Titolo:</strong>
                      {{movie.title}}
                    </p>
                    <!-- title -->
                    <p>
                      <strong>Titolo originale:</strong>
                      {{movie.original_title}}
                    </p>
                    <!-- original title -->
                    <p>
                      <strong>Cast:</strong>
                      {{castMovie[index]}}
                    </p>
                    <!-- cast -->
                    <p class="languages">
                      <strong>Lingua: </strong>
                      <flag class="flag_icon" :iso ="flag(movie)"/>
                    </p>
                    <!-- /.languages -->          
                    <p class="vote">
                      <strong>Voto:</strong>
                      <span v-for="vote in votes" :key="vote">
                        <font-awesome-icon :class="stars(movie) > vote ? 'star_vote' : 'star_no_vote'" icon="fa-solid fa-star" />            
                      </span>
                    </p>
                    <!-- /.vote -->
                    <p class="overview" v-if="movie.overview">
                      <strong>Overview: </strong>
                      {{movie.overview}}
                    </p>
                    <!-- /.overview -->
                  </div>
                  <!-- /.card-body -->
                </div>
                <!-- /.back -->
              </div>
              <!-- /.card -->
              </div>
              <!-- /.container_card -->
            </div>
            <!-- /.cols -->          
          </div>
        </section>
        <!-- /.films -->

        <section class="series" v-if="series.length > 0">
          <div class="title_section">
            <h4>SERIES</h4>
            <span>
              <font-awesome-icon icon="fa-solid fa-film" />
            </span>
          </div>
          <!-- /.title_section -->
          <div class="row row-cols-6 w-100 g-2">
            <div class="cols" v-for="(serie, index) in series" :key="serie.id">
              <div class="container_card">
                <div class="card">
                  <div class="front">
                    <img :src="serie.poster_path ? ('https://image.tmdb.org/t/p/w342' + serie.poster_path) : 'https://www.stardust.it/img/web/film-thumb-layer-placeholder.png'" :alt="serie.title">
                  </div>
                  <!-- /.front -->
                  <div class="back">
                  <div class="description">
                    <p>
                      <strong>Titolo:</strong>
                      {{serie.name}}
                    </p>
                    <!-- title -->
                    <p>
                      <strong>Titolo originale:</strong>
                      {{serie.original_name}}
                    </p>
                    <!-- original title -->
                    <p>
                      <strong>Cast:</strong>
                      {{castSerie[index]}}
                    </p>
                    <!-- cast -->
                    <p class="languages">
                      <strong>Lingua: </strong>
                      <flag class="flag_icon" :iso ="flag(serie)"/>
                    </p>
                    <!-- /.languages -->          
                    <p class="vote">
                      <strong>Voto:</strong>
                      <span v-for="vote in votes" :key="vote">
                        <font-awesome-icon :class="stars(serie) > vote ? 'star_vote' : 'star_no_vote'" icon="fa-solid fa-star" />            
                      </span>
                    </p>
                    <!-- /.vote -->
                    <p class="overview" v-if="serie.overview">
                      <strong>Overview: </strong>
                      {{serie.overview}}
                    </p>
                    <!-- /.overview -->
                  </div>
                <!-- /.description -->
                  </div>
                  <!-- /.back -->
                </div>
                <!-- /.card -->
              </div>
              <!-- /.container_card -->
            </div>
            <!-- /.cols -->          

          </div>                
        </section>
        <!-- /.series -->

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
      movies: [],
      castMovie: [],
      idMovie: null,
      idSerie: null,
      series: [],
      castSerie: [],
      language: '',
      votes: 5,
      //loading: true
    }
  },
  methods: {
    callApiMovie(){

      /* Variabili locali per chiamata API */
      let movie = axios.get(`${this.API_URL_MOVIE}${this.query}`);
      let serie = axios.get(`${this.API_URL_SERIE}${this.query}`);

      /* chiamata API */
      axios
      .all([movie, serie])
      .then(
        axios.spread((...n) => {
          let movies = n[0].data.results;
          let series = n[1].data.results;

          /* push dei dati che mi servono nei data movies e series */
          this.movies = []
          movies.forEach(movie => {
            this.movies.push(movie)
            this.idMovie = movie.id
            //console.log(this.idMovie);
          });

          this.series = []
          series.forEach(serie => {
            this.series.push(serie)
            this.idSerie = serie.id            
          });
          this.callApiCast()
          /* pulisco l'input */
          this.query = ''
        })
      ) 
      /* in caso la chiamata API non andasse a buon fine stampo l'errore */
      .catch(error => {
      console.log(error);
      this.error = `Sorry There is a problem! ${error}`
      })
      
      //.finally(() => this.loading = false)
    },
    flag(element) {
      /* imposto il valore della lingua con la corretta abbreviazione richiesta dalle icon flag */
      if(element.original_language === 'en'){
        return element.original_language = 'gb'
      } else if(element.original_language === 'ja') {
        return element.original_language = 'jp'
      } else {
        return element.original_language
      }
    },
    stars(element){
      /* divido *2 il valore con rating 0/10 in modo da restituire il valore massimo di 5 stelle e arrotondo */
      let votes = element.vote_average / 2;
      if((votes - Math.trunc(votes)) >= 0.5){
        return votes = Math.ceil(votes);
      } else {
        return votes = Math.floor(votes);
      }
    },
    callApiCast(){
      /* Variabili chiamata API cast film/serie*/
      let movieCast = axios.get(`https://api.themoviedb.org/3/movie/${this.idMovie}/credits?api_key=a2c29c1744af97a151f88b2cd413254a&language=it-IT`);
      let serieCast = axios.get(`https://api.themoviedb.org/3/movie/${this.idSerie}/credits?api_key=a2c29c1744af97a151f88b2cd413254a&language=it-IT`);

      /* chiamata API */
      axios
      .all([movieCast, serieCast])
      .then(
        axios.spread((...n) => {
          let castNamesMovie = n[0].data.cast;
          let castNamesSerie = n[1].data.cast;

          /* push dei dati che mi servono nei data movies e series */
          
          castNamesMovie.forEach(castMovie => {
            this.castMovie.push(castMovie.name)
            //console.log(castMovie);
            //console.log(this.castMovie);
          })

          castNamesSerie.forEach(castSerie => {
            this.castSerie.push(castSerie.name)
            //console.log(castMovie);
            //console.log(this.castMovie);
          })
          
        })
        )      
        .catch(error => {
        console.log(error);
        this.error = `Sorry There is a problem! ${error}`
        })
    }
  },
}
</script>

<style lang="scss">
@use '@/assets/scss/style.scss';
.card-body {
  color: white;
  position: absolute;
  display: none;
}
.star_vote {
  color: #ffe43b;
}
.star_no_vote {
  color: #a3adba;
}
.flag_icon {
  width: 20px;
  aspect-ratio: 1/1;
  margin: 0 0.25rem;
  box-shadow: 0 0 3px white;
}
.vote {
  strong {
    padding-right: 5px;
  }
span {
  padding: 0 2px;
}
}
.overview {
  max-width: 100%;
}

p:not(span) { 
  font-size: 12px;
}

.container_card {
  -webkit-perspective: 800;
  -moz-perspective: 800;
  -ms-perspective: 800;   
  perspective: 800;   
  margin:0 auto;
}
.container_card:hover .card,
.container_card.hover .card {
  -moz-transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);  
}
.container_card,  .front,  .back {
  height: 300px;  
  width: 100%;
}
.card {
  width: 100%;
  height: 100%;
  -webkit-transition: 0.6s;   
  -moz-transition: 0.6s;      
  -ms-transition: 0.6s;   
  transition: 0.6s;   
  -moz-transform-style: preserve-3d;      
  -webkit-transform-style: preserve-3d;   
  transform-style: preserve-3d;   
  position: relative;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.789);
}
.front {
  img {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 3px;
  }
}   
.front,  .back {      
  -webkit-backface-visibility: hidden;    
  -moz-backface-visibility: hidden;   
  backface-visibility: hidden;    
  position: absolute;     
  top: 0;     
  left: 0;    
  background-color: rgba(0, 0, 0, 0.789);
  border: 3px solid black;
  border-radius: 6px;
}
.back {
  padding: 0.5rem;
  overflow: auto;
  -webkit-transform: rotateY(180deg);     
  -moz-transform: rotateY(180deg);    
  transform: rotateY(180deg);      
}


</style>