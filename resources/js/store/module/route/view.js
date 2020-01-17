import Vue from 'vue'
import VueAxios from 'vue-axios';
import axios from 'axios';
import mapBoundaries from './calculation/mapBoundaries'
import mapLines from './calculation/mapLines'

Vue.use(VueAxios, axios)

export default {
    namespaced: true,

    modules:{
        mapBoundaries,
        mapLines
    },
    state:{        
        route : []   
    },
    getters:{        
        
    },    
    mutations:{
        SET_ROUTE(state, route){
            state.route = route;
            console.log('SET_ROUTE');
        }
    },

    actions:{

        viewRoute({commit, dispatch},payload){   
            var oneRouteUrl = window.location.origin+'/api/route/getOne?id='+payload;

            axios.get(oneRouteUrl).then(response => {   
                //<!-- fix dit in laravel
                response.data.patroon = JSON.parse( response.data.patroon );
                 //-->                
                commit('SET_ROUTE',response.data);

                dispatch('mapBoundaries/createMapBoundaries', response.data.patroon );
                dispatch('mapLines/createMapLines', response.data.patroon );

                                   
            })
        },

    }
      















}