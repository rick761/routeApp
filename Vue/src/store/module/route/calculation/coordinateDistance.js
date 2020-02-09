export default {
    namespaced: true,
    state : {
        MULTIPLE_DISTANCES:[],

        _f: {
            calculateDifferencelatitude: (previousCoordinate,coordinate) => {                
                var calculation = Math.abs( coordinate.latitude - previousCoordinate.latitude );
                calculation = Math.abs( calculation * 110.57 );

                return Math.pow( calculation, 2 );
            },
            calculateDifferencelongtitude : (previousCoordinate,coordinate) => {                
                var calculation = Math.abs( coordinate.longtitude - previousCoordinate.longtitude );
                calculation = Math.abs( calculation * ( 111.320*Math.cos( coordinate.longtitude ) ) );  

                return Math.pow( calculation, 2 );   
            }
        }

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
                //convert to 3 behind comma (also switched '.' to ',')               
                state.MULTIPLE_DISTANCES[i] = state.MULTIPLE_DISTANCES[i].toFixed(3).toString().replace(".", ",");
            }
            console.log('DISTANCES_FORMAT_FIX');
        },

        DELETE_DISTANCES(state){
            state.MULTIPLE_DISTANCES=[];
        }

    },

    actions : {
        calculateMultipleRoutes({dispatch,commit},routes){           

            commit('DELETE_DISTANCES');   
                       
            for(var index in routes)
                dispatch('calculateRoute', routes[index].patroon);

            commit('DISTANCES_FORMAT_FIX');
        },

        calculateRoute({state,commit},routeCoordinateArray){            
            var previousCoordinate;
            var distance = 0;

            routeCoordinateArray.forEach(CoordinatesObject => {

                var coordinate = { 
                    latitude: CoordinatesObject.coordinaten[0],
                    longtitude: CoordinatesObject.coordinaten[1]
                };

                if(previousCoordinate){       
                    var differenceLatitude = state._f.calculateDifferencelatitude(previousCoordinate,coordinate)  ;
                    var differenceLongtitude = state._f.calculateDifferencelongtitude(previousCoordinate,coordinate) ;
                    var result = Math.sqrt( differenceLatitude + differenceLongtitude );                                  

                    distance += result;                    
                }

                previousCoordinate = coordinate;

            })
            commit('ADD_DISTANCE_TO_DISTANCES', distance);              
        }
    },

 }