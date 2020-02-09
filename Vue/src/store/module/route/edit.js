
import mapBoundaries from './calculation/mapBoundaries'
import mapLines from './calculation/mapLines'
import request from '../tools/request'

const ROOT = {root:true};



export default {    
    namespaced: true,

    modules:{
        mapBoundaries,
        mapLines,
        request
    },

    state : {        
        land:'',
        vervoer:'',
        naam:'',
        informatie:'',     
        patroon:[],
        _const : {
            ROOT : {root:true}
        }      
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
            state.patroon = route.patroon;  

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
            commit('DELETE_ROUTE_COORDINATES', index );
            dispatch('mapBoundaries/createMapBoundaries', state.patroon );
            dispatch('mapLines/createMapLines', state.patroon  );   
        },

        async save({state,dispatch,commit}, naam){  
            var POST = {
                url : '/api/route/edit/save',
                data : {
                    toEdit: naam ,
                    toSend: {
                        informatie: state.informatie,
                        land:       state.land,
                        naam:       state.naam,
                        vervoer:    state.vervoer,
                        patroon:    state.patroon
                    }
                }     
            }         
            await dispatch('request/post', POST);
            response = state.request.RESPONSE;

            if(response == "error") {                
                dispatch('alert/danger','Er is iets fout gegaan.', ROOT);                    
                return;
            }

            dispatch('alert/success','Route is aangepast.', ROOT );
            dispatch('redirecter/redirect','/manage', ROOT );
            commit('RESET_ROUTE');
           
        },

        async load({state,dispatch,commit}, payload){   
            var POST = {
                url : '/api/route/edit/load',
                data : {naam: payload}
            };

            await dispatch('request/post', POST);            
            var response = state.request.RESPONSE;
            
            if(typeof response != 'object'){
                dispatch( 'alert/danger','Error bij het laden', ROOT);
                return
            }

            commit("SET_ROUTE", response);            
            dispatch('mapBoundaries/createMapBoundaries', response.patroon );
            dispatch('mapLines/createMapLines', response.patroon );
           
        }
    },
 }