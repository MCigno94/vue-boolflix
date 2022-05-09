import Vue from 'vue'
import App from './App.vue'
import FlagIcon from 'vue-flag-icon';

Vue.config.productionTip = false;
Vue.use(FlagIcon);

/* Bootstrap */
const bootstrap = require('bootstrap');
Vue.use(bootstrap);

new Vue({
    render: h => h(App),
}).$mount('#app')