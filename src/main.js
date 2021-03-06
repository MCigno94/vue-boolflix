import Vue from 'vue'
import App from './App.vue'
import FlagIcon from 'vue-flag-icon';

Vue.config.productionTip = false;
Vue.use(FlagIcon);

/* Font Awesome icons*/
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faUserSecret, faStar, faMagnifyingGlass, faFilm } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(faUserSecret, faStar);
library.add(faUserSecret, faMagnifyingGlass);
library.add(faUserSecret, faFilm);

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

/* Bootstrap */
const bootstrap = require('bootstrap');
Vue.use(bootstrap);

new Vue({
    render: h => h(App),
}).$mount('#app')