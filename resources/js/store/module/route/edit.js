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

    state : {        
        land:'',
        vervoer:'',
        naam:'',
        informatie:'',     
        patroon:[]      
    },


    getters : {
        IS_ROUTE_LOADED(state){            
            return ( state.land != '' || state.vervoer != '' || state.naam != '' );
        },
    },
    mutations : {     
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
        RESET_ROUTE(state){            
            state.informatie = '';
            state.land = '';
            state.naam = '';
            state.vervoer = '';
            state.patroon = [];
            console.log('RESET_ROUTE');
        },
        SET_ROUTE(state,route){
            state.informatie = route.informatie;
            state.land = route.land;
            state.naam = route.naam;
            state.vervoer = route.vervoer;
            state.patroon = JSON.parse(route.patroon);  

            console.log('SET_ROUTE');
        }
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

        save({state,dispatch,commit}, naam){            
            let postObj = {
                toEdit: naam ,
                toSend: {
                    informatie: state.informatie,
                    land:       state.land,
                    naam:       state.naam,
                    vervoer:    state.vervoer,
                    patroon:    state.patroon
                }
            };        

           //apiCall
            axios.post(window.location.origin+'/api/route/edit/save', postObj).then(response => {               
                if(response.data == "error"){                    
                    dispatch('alert/danger','Er is iets fout gegaan.',{root:true} );                    
                    return;
                }                                             
                dispatch('alert/success','Route is aangepast.',{root:true} );
                dispatch('redirecter/redirect','/manage', {root:true} );
                commit('RESET_ROUTE');   
             })             
            
        },

        load({dispatch,commit}, payload){   
            axios.post(window.location.origin+'/api/route/edit/load', {naam: payload}).then(response => {                
                if(typeof response.data == 'object'){
                    commit("SET_ROUTE", response.data);
                    var routeCoordinates = JSON.parse(response.data.patroon);
                    dispatch('mapBoundaries/createMapBoundaries', routeCoordinates );
                    dispatch('mapLines/createMapLines', routeCoordinates );
                } else {
                    dispatch( 'alert/danger','Error bij het laden', {root:true});
                }
            });
        }
        
    },
    

 }