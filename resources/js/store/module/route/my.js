import Vue from 'vue'
import VueAxios from 'vue-axios';
import axios from 'axios';
import coordinateDistance from './calculation/coordinateDistance'

export default {
    namespaced: true,
    modules:{
        coordinateDistance
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

        delete({dispatch},payload){
            axios
            .post(window.location.origin+'/api/route/del', {naam: payload})
            .then(response => {        

                if(response.data)
                    dispatch('alert/success','Er is een route verwijderd',{root:true} );
                 
                if(! response.data )
                    dispatch('alert/danger','Er is iets fout gegaan',{root:true} );
                
                dispatch('load');
            })
        },

        load( {state,commit,dispatch} ) {                    
            axios
            .get(window.location.origin+'/api/route/get/mijn')
            .then(response => {          
                commit('SET_ROUTES',response.data);
                commit('ROUTE_COORDINATES_PARSE_JSON');                            
                dispatch('coordinateDistance/calculateMultipleRoutes', state.ROUTES);   
            })                      
        }     
    },

 }