import Vue from 'vue'
import Vuex from 'vuex'

//extra modules
import alert from './module/tools/alert'
import auth from './module/tools/auth'
import redirecter from './module/tools/redirecter'
import filterAndNav from './module/tools/filterAndNav'

//site modules
import route from './module/route/route'
import newRoute from './module/route/newRoute'
import routeDetails from './module/route/routeDetails'
import editRoute from './module/route/editRoute'
import bekijkRoute from './module/route/bekijkRoute'

Vue.use(Vuex);


export const store = new Vuex.Store({
    modules: {

      alert,
      auth,
      route,
      newRoute,
      routeDetails,
      editRoute,
      redirecter,
      bekijkRoute,
      filterAndNav

    },
    actions:{      
      
      
    }
});