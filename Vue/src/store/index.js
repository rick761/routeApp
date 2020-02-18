import Vue from 'vue'
import Vuex from 'vuex'
import alert from './module/tool/alert'
import authenticate from './module/tool/authenticate'
import redirecter from './module/tool/redirecter'
import paginate from './module/tool/paginate'

//pages
import home from './pages/home'
import error from './module/tool/error'
import edit from './pages/edit'
import view from './pages/view'
import create from './pages/create'
import my from './pages/my'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,  
  modules: {

    //pages
    home,
    edit,
    view,
    create,    
    my,

    //modules.
    alert,
    authenticate,    
    redirecter,
    paginate,
    error,

  }

})





