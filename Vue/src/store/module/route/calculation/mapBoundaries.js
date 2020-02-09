
// constants are minimum en maximum latitude/longtitude of the world map.
const MAPINIT_LOW_LAT = 43;
const MAPINIT_LOW_LNG = -9;
const MAPINIT_HIGH_LAT = 55;
const MAPINIT_HIGH_LNG = 17;

export default {
    namespaced: true,
        
    state : {        
        LOWER_COORDINATES : { latitude: MAPINIT_LOW_LAT, longtitude: MAPINIT_LOW_LNG },
        HIGHER_COORDINATES: { latitude: MAPINIT_HIGH_LAT, longtitude: MAPINIT_HIGH_LNG }
    },

    getters : {  

       GET_MAP_BOUNDARIES(state){           
            return [
                [ state.LOWER_COORDINATES.latitude , state.LOWER_COORDINATES.longtitude ],
                [ state.HIGHER_COORDINATES.latitude , state.HIGHER_COORDINATES.longtitude ]
            ]; 
       },

    },

    mutations : {

        SET_HIGHER_COORDINATES_LATITUDE(state,payload){
            state.HIGHER_COORDINATES.latitude = payload
            console.log('SET_HIGHER_COORDINATES_LATITUDE');
        },

        SET_HIGHER_COORDINATES_LONGTITUDE(state,payload){
            state.HIGHER_COORDINATES.longtitude = payload
            console.log('SET_HIGHER_COORDINATES_LONGTITUDE');
        },

        SET_LOWER_COORDINATES_LATITUDE(state,payload){
            state.LOWER_COORDINATES.latitude = payload
            console.log('SET_LOWER_COORDINATES_LATITUDE');
        },

        SET_LOWER_COORDINATES_LONGTITUDE(state,payload){
            state.LOWER_COORDINATES.longtitude = payload
            console.log('SET_LOWER_COORDINATES_LONGTITUDE');

        }, 

    },

    actions : {

        createMapBoundaries({commit,state},coordinates){            
            if(coordinates){
                for (let counter  in coordinates ) {
                    let latitudeItem  = coordinates[counter].coordinaten[0];
                    let longtitudeItem = coordinates[counter].coordinaten[1];
    
                    latitudeItem > state.HIGHER_COORDINATES.latitude ?
                        commit('SET_HIGHER_COORDINATES_LATITUDE',latitudeItem) : '' ;
    
                    longtitudeItem > state.HIGHER_COORDINATES.longtitude ?
                        commit('SET_HIGHER_COORDINATES_LONGTITUDE',longtitudeItem) : '' ;
    
                    latitudeItem < state.LOWER_COORDINATES.latitude ?
                        commit('SET_LOWER_COORDINATES_LATITUDE',latitudeItem) : '' ;    
    
                    longtitudeItem < state.LOWER_COORDINATES.longtitude ?
                        commit('SET_LOWER_COORDINATES_LONGTITUDE',longtitudeItem) : '' ; 
                }  
            }
        },

        reset({commit}){
            //the coordinates reset to a view over europe.
            commit('SET_HIGHER_COORDINATES_LATITUDE',-53);
            commit('SET_HIGHER_COORDINATES_LONGTITUDE',-70);
            commit('SET_LOWER_COORDINATES_LATITUDE',74);
            commit('SET_LOWER_COORDINATES_LONGTITUDE',100);
        }
            
    }        
}

