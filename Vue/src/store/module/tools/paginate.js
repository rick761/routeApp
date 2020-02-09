import request from '../tools/request'

export default {
    namespaced: true,

    modules:{request},

    state : {
        CURRENT_PAGE : 1,
        TOTAL_PAGES : 0
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

        async getPages({commit,dispatch,state}){  
            var url = '/api/route/get/pages';
            await dispatch('request/get', url );  
            commit('SET_TOTAL_PAGES',state.request.RESPONSE);                
        },

        changePageNr({commit},nr){                   
            commit('SET_CURRENT_PAGE',nr)                
        },

    },
   
 }