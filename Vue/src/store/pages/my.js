import coordinateDistance from '../module/calculation/coordinateDistance'
import request from '../module/tool/request'

export default {

    namespaced: true,

    modules:{
        coordinateDistance,
        request
    },

    state : {
        ROUTES:[]
    },

    mutations : {

        SET_ROUTES(state,payload){
            state.ROUTES = payload
            console.log('SET_ROUTES');
        },

        ROUTE_COORDINATES_PARSE_JSON(state){
            for(var index in state.ROUTES){
                state.ROUTES[index].patroon = JSON.parse(state.ROUTES[index].patroon );
            }          
            console.log('ROUTE_COORDINATES_PARSE_JSON');
        }
        
    },
    actions : {     

       async delete({dispatch,state},payload){
            var POST = {
                url : '/api/route/del',
                data : { naam: '' }
            }           

            await dispatch('request/post', POST );    
            var response = state.request.RESPONSE;

            if( response )
                dispatch('alert/success','Er is een route verwijderd',{root:true} );
                 
            if(! response )
                dispatch('error/set','Er is iets fout gegaan.', {root:true})   

            dispatch('load');            
        },

        async load( {state,commit,dispatch} ) {     
            var url = '/api/route/get/mijn';
            console.log(url);
            await dispatch('request/get', url );  
            
            var response = state.request.RESPONSE;            
            commit('SET_ROUTES', response );
            commit('ROUTE_COORDINATES_PARSE_JSON');                            
            dispatch('coordinateDistance/calculateMultipleRoutes', state.ROUTES);

                              
        }     
    },

 }