import mapBoundaries from '../module/calculation/mapBoundaries'
import mapLines from '../module/calculation/mapLines'
import coordinateDistance from '../module/calculation/coordinateDistance'
import request from '../module/tool/request'

export default {

    namespaced: true,

    modules : { 
        request,
        mapBoundaries,
        mapLines,
        coordinateDistance        
    },

    state : {         
        ROUTES: [],        
        SHOWN_ROUTE :[],           
    },   

    mutations:{

        SET_ROUTES(state,payload){
            state.ROUTES = payload;
            console.log('SET_ROUTES');
        },

        SET_SHOWN_ROUTE(state,index){
            state.SHOWN_ROUTE = state.ROUTES[index];
            console.log('SET_SHOWN_ROUTE');
        },

        ROUTE_COORDINATES_PARSE_JSON(state){            
            for(var index in state.ROUTES){
                state.ROUTES[index].patroon = JSON.parse(state.ROUTES[index].patroon );
            }          

            console.log('ROUTE_COORDINATES_PARSE_JSON');
        }

    },

    actions : {

        setNewRoutes({commit},payload){            
            commit('SET_ROUTES',payload);                         
        }, 

        async load( {commit, dispatch, rootState, state } ) {  
            var paginate = rootState.paginate.CURRENT_PAGE;              
            var url = '/api/route/get?page='+paginate;  
            
            await dispatch('request/get', url );                      
            commit('SET_ROUTES', state.request.RESPONSE ); 
            commit('ROUTE_COORDINATES_PARSE_JSON');                
            dispatch('coordinateDistance/calculateMultipleRoutes', state.ROUTES);                
              
        },       
        
        hoverOverRoute({state,commit,dispatch},index) {  
            if( state.SHOWN_ROUTE != state.ROUTES[index] ) {                
                commit('SET_SHOWN_ROUTE',index);  
                var coordinates = state.SHOWN_ROUTE.patroon;
                dispatch('mapBoundaries/reset')
                dispatch('mapBoundaries/createMapBoundaries', coordinates);
                dispatch('mapLines/createMapLines', coordinates)
            }                                                   
        },
        
    },



 }