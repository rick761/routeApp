import Vue from 'vue'
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios)

export default {
    namespaced: true,

    state:{        
        route : []   
    },

    getters:{
        getMapBoundaries(state){                
            var lowerCoordinates ={ latitude:9999999, longtitude:9999999 }
            var higherCoordinates = { latitude:0, longtitude:0 }
            var routeCoordinates = state.route.patroon;           

            if(routeCoordinates){
                for (let counter  in routeCoordinates ) {

                    let latitudeItem  = routeCoordinates[counter].coordinaten[0];
                    let longtitudeItem = routeCoordinates[counter].coordinaten[1];

                    latitudeItem > higherCoordinates.latitude ?
                        higherCoordinates.latitude = latitudeItem : '' ;

                    longtitudeItem > higherCoordinates.longtitude ?
                        higherCoordinates.longtitude = longtitudeItem : '' ;

                    longtitudeItem < lowerCoordinates.longtitude ?
                        lowerCoordinates.longtitude = longtitudeItem : '' ;    

                    latitudeItem < lowerCoordinates.latitude ?
                        lowerCoordinates.latitude = latitudeItem : '' ;                   
                                        
                }  

                return [
                    [ lowerCoordinates.latitude,    lowerCoordinates.longtitude ],
                    [ higherCoordinates.latitude,   higherCoordinates.longtitude]
                ]; 
            }
            
        },

        getMapLines (state){
            let newMapLines = [];
            let routeCoordinates = state.route.patroon;

            for (let index in routeCoordinates) {  

                var coordinate = routeCoordinates[index].coordinaten;                              
                if( !(coordinate[0] == 0 && coordinate[1] == 0 ) )
                {
                    newMapLines.push(coordinate);
                }                              
            }       

            return newMapLines;
        },   
    },
    
    mutations:{
        SET_ROUTE(state, route){
            state.route = route;
        }
    },

    actions:{

        viewRoute({commit},payload){   
            var oneRouteUrl = window.location.origin+'/api/route/getOne?id='+payload;

            axios.get(oneRouteUrl).then(response => {   
                //<!-- fix dit in laravel
                response.data.patroon = JSON.parse( response.data.patroon ); 
                //-->
                commit('SET_ROUTE',response.data);                   
            })
        },

    }
      















}