import Vue from 'vue'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios)


export default {
    namespaced: true,
    state : {
        CURRENT_PAGE : 1,
        TOTAL_PAGES : 0
    },
    getters : {
         
    },
    mutations : {
        SET_TOTAL_PAGES(state, payload){
            state.TOTAL_PAGES = payload;
        },
        SET_CURRENT_PAGE(state, payload){
            state.CURRENT_PAGE = payload;
        }
    },
    actions : {
        getPages({commit}){  
            var url = window.location.origin+'/api/route/get/pages';
            axios.get(url).then(response => {    
                commit('SET_TOTAL_PAGES',response.data);    
            })
        },

        changePageNr({commit},nr){                   
            commit('SET_CURRENT_PAGE',nr)                
        },
    },
   
 }