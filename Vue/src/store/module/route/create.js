
import mapBoundaries from './calculation/mapBoundaries'
import mapLines from './calculation/mapLines'


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

        async save({state,dispatch}){      

            var POST = {
                url : '/api/route/create',
                data : {
                    toEdit: naam ,
                    toSend: {
                        informatie : state.informatie,
                        land : state.land,
                        naam : state.naam,
                        vervoer : state.vervoer,
                        patroon : state.patroon,
                    }
                }     
            }         

            await dispatch('request/post', POST);
            response = state.request.RESPONSE;

            if(response == "error") {                
                dispatch('alert/danger','Er is iets fout gegaan.', ROOT);                    
                return;
            }            
            
            dispatch('alert/success','nieuwe route is gemaakt.',ROOT )
            dispatch('redirecter/redirect','/manage', ROOT );                    
            dispatch('mapLines/removeMapLines');    
        }        
    },
 }