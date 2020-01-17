import Vue from 'vue'
import VueAxios from 'vue-axios';
import axios from 'axios';

//children
import edit from './route/edit'
import view from './route/view'
import create from  './route/create'
import details from './route/details'
import my from './route/my'
import mapBoundaries from './route/calculation/mapBoundaries'
import mapLines from './route/calculation/mapLines'
import coordinateDistance from './route/calculation/coordinateDistance'


Vue.use(VueAxios, axios)

export default {

    namespaced: true,

    modules : {
        edit,
        view,
        create,
        details,
        my,

        //calculation modules
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

        load( {commit, dispatch, rootState, state } ) {  
            var paginate = rootState.paginate.currentPage;            
            var url = window.location.origin+'/api/route/get?page='+paginate;    

            axios.get( url ).then( response => {      

                commit('SET_ROUTES', response.data.data); 
                commit('ROUTE_COORDINATES_PARSE_JSON');                
                dispatch('coordinateDistance/calculateMultipleRoutes', state.ROUTES);                
            });    
        },       
        
        hoverOverRoute({state,commit,dispatch},index) {  
            if( state.SHOWN_ROUTE != state.ROUTES[index] ) {
                commit('SET_SHOWN_ROUTE',index);  

                var coordinates = state.SHOWN_ROUTE.patroon;
                dispatch('mapBoundaries/createMapBoundaries', coordinates);
                dispatch('mapLines/createMapLines', coordinates)
            }                                                   
        },
        
    },



 }