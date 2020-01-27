
//imports
import Vue from 'vue'
import VueAxios from 'vue-axios';
import axios from 'axios';
import mapBoundaries from './calculation/mapBoundaries'
import mapLines from './calculation/mapLines'


//uses
Vue.use(VueAxios, axios)

export default {
    namespaced: true,  
     
    modules:{
        mapBoundaries,
        mapLines
    },

    state : {        
        land:'',
        vervoer:'',
        naam:'',
        informatie:'',
        patroon:[]      
    },


    getters : {


    }   , 

    mutations : {      

        RESET_ROUTE(state){            
            state.informatie = '';
            state.land = '';
            state.naam = '';
            state.vervoer = '';
            state.patroon = [];
            console.log('RESET_ROUTE');
        },

        ADD_ROUTE_COORDINATES(state,coordinate){
            var coordinateObject = {
                naam:'',
                coordinaten: [
                    coordinate.lat,
                    coordinate.lng
                ]
            }
            state.patroon.push(coordinateObject)
            console.log('ADD_ROUTE_COORDINATES');
        },

        DELETE_ROUTE_COORDINATES(state,payload){
            state.patroon.splice(payload,1);
            console.log('DELETE_ROUTE_COORDINATES');
        },
    },


    actions : {

        newCoordinates({state,commit,dispatch},coordinate){
            commit('ADD_ROUTE_COORDINATES', coordinate );
            dispatch('mapBoundaries/createMapBoundaries', state.patroon );
            dispatch('mapLines/createMapLines', state.patroon  );            
        },

        removeCoordinate({commit,dispatch,state},index){
            console.log(index);
            commit('DELETE_ROUTE_COORDINATES', index );
            dispatch('mapBoundaries/createMapBoundaries', state.patroon );
            dispatch('mapLines/createMapLines', state.patroon  );   
        },

        new({commit,dispatch}){
            commit('RESET_ROUTE');
            dispatch('mapLines/removeMapLines');  
        },

        save({state,dispatch}){            
            
            var postObj = {
                informatie : state.informatie,
                land : state.land,
                naam : state.naam,
                vervoer : state.vervoer,
                patroon : state.patroon,
            }            

            var url = window.location.origin+'/api/route/create';
            axios.post(url, postObj).then(response => {      

                if(response.data == "error"){                  
                    dispatch('alert/danger','Route bestaat al.',{root:true} ); return;
                }
                                  
                dispatch('alert/success','nieuwe route is gemaakt.',{root:true} )
                dispatch('redirecter/redirect','/manage', {root:true} );                    
                dispatch('mapLines/removeMapLines');     

             })
            
        }
        
    },

 }