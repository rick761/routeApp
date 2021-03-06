import mapBoundaries from '../module/calculation/mapBoundaries'
import mapLines from '../module/calculation/mapLines'
import request from '../module/tool/request'

export default {
    namespaced: true,

    modules:{
        mapBoundaries,
        mapLines,
        request
    },

    state:{        
        route : []   
    },    

    mutations:{

        SET_ROUTE(state, route){
            state.route = route;            
        }

    },

    actions:{

        async viewRoute({state, commit, dispatch},payload){   
            var url = '/api/route/getOne?id='+payload;

            await dispatch('request/get', url );                              
            commit('SET_ROUTE',state.request.RESPONSE);            
            dispatch('mapBoundaries/createMapBoundaries', state.route.patroon );
            dispatch('mapLines/createMapLines', state.route.patroon );                                  
        }
        
    }
      















}