import Vue from 'vue'
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';

import App from './App.vue';
import { routes } from './routes';
import { store } from './store/store'


//main file
Vue.component('App', App);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);

Vue.config.errorHandler = (err, vm, info) =>  {

}

window.onerror = function(message, source, lineno, colno, error) {
  // TODO: write any custom logic or logs the error
};

const router = new VueRouter({
    mode: 'history',
    routes
});


new Vue({
  el: '#app',
  router,
  store,
});