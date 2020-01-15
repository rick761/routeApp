import Vue from 'vue'
import Vuex from 'vuex'

//extra modules
import alert from './module/tools/alert'
import auth from './module/tools/auth'
import redirecter from './module/tools/redirecter'
import filterAndNav from './module/tools/filterAndNav'

// modules
import route from './module/route'

Vue.use(Vuex);


export const store = new Vuex.Store({
    modules: {

      alert,
      auth,
      route,
      redirecter,
      filterAndNav

        

    },
    actions:{      
      
      
    }
});