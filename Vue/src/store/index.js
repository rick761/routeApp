import Vue from 'vue'
import Vuex from 'vuex'
import alert from './module/tools/alert'
import authenticate from './module/tools/authenticate'
import redirecter from './module/tools/redirecter'
import paginate from './module/tools/paginate'
import route from './module/route'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
  },

  mutations: {
  },

  actions: {
  },

  modules: {
    alert,
    authenticate,
    route,
    redirecter,
    paginate,
  }
  
})




