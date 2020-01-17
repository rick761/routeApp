export default {
    namespaced: true,
    state : {
        MULTIPLE_DISTANCES:[]
    },

    getters : {
      GET_DISTANCES(state){
          return state.MULTIPLE_DISTANCES;
      }
    },

    mutations : {
        ADD_DISTANCE_TO_DISTANCES(state,distance){
           state.MULTIPLE_DISTANCES.push(distance);
           console.log('ADD_DISTANCE_TO_DISTANCES');
        },
        DISTANCES_FORMAT_FIX(state){
            for(var i in state.MULTIPLE_DISTANCES){
                state.MULTIPLE_DISTANCES[i] = state.MULTIPLE_DISTANCES.toFixed(3);
            }
            console.log('DISTANCES_FORMAT_FIX');
        }
    },

    actions : {
        calculateMultipleRoutes({dispatch},routes){
            var filteredRoutes = [];

            for (var index in routes) 
                filteredRoutes.push( routes[index].patroon);

            for(var index in filteredRoutes)
                dispatch('calculateRouteFromRoutes', filteredRoutes[index]);

            commit('DISTANCES_FORMAT_FIX')
        },

        calculateRouteFromRoutes({commit},routeCoordinateArray){            
            var previousCoordinate;
            var distance =0;

            routeCoordinateArray.forEach(CoordinatesObject => {
                var coordinate = { latitude: CoordinatesObject.coordinaten[0], longtitude: CoordinatesObject.coordinaten[1]};
               
                if(previousCoordinate){
                    var calculateDifference = {
                        latitude: () => {
                            var calculation; calculation = Math.abs( coordinate.latitude - previousCoordinate.latitude ); calculation = Math.abs( calculation * 110.57 );
                            return Math.pow( calculation, 2 );
                        },
                        longtitude : () => {
                            var calculation;calculation = Math.abs( coordinate.longtitude - previousCoordinate.longtitude );calculation = Math.abs( calculation * ( 111.320*Math.cos( coordinate.longtitude ) ) );                            
                            return Math.pow( calculation, 2 );   
                        }
                    };              
                    var result = Math.sqrt( calculateDifference.latitude() + calculateDifference.longtitude() );                 
                    distance += result;                    
                }                
                previousCoordinate = coordinate                
            })
            commit('ADD_DISTANCE_TO_DISTANCES', distance);              
        }
    },

 }