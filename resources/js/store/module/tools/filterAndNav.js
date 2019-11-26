import Vue from 'vue'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios)


export default {
    namespaced: true,
    state : {
        currentPage : 1,
        totalPages : 0
    },
    getters : {
         
    },
    mutations : {
        
    },
    actions : {
        getPages({state},payload){              
            axios
            .get(window.location.origin+'/api/route/get/pages')
            .then(response => {                  
                state.totalPages = response.data;                 
            })
        },

        changePageNr({state},payload){            
            state.currentPage = payload;
        },

        changePage({state,dispatch}){            
            console.log(state.currentPage);
                axios
                .get(window.location.origin+'/api/route/get?page='+state.currentPage)
                .then(response => {                       
                    dispatch('route/setNewRoutes', response.data.data, {root:true});
                    dispatch('route/setRouteDist', 'routes', {root:true}); 
                })                   
            

        }

    },
   
 }