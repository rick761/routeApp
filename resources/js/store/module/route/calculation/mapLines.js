export default {
    namespaced: true,
    state : {
        MAP_LINES:[]
    },
    getters : {
        GET_MAP_LINES(state){
            return state.MAP_LINES
        }       
    },
    mutations : {
        ADD_MAP_LINE(state,payload){
            state.MAP_LINES.push(payload);
            console.log('ADD_MAP_LINE') 
        },
        REMOVE_MAP_LINES(state){
            state.MAP_LINES = [];
            console.log('REMOVE_MAP_LINES')             
        }
    },
    actions : {
        createMapLines({commit},coordinates){
            commit('REMOVE_MAP_LINES');               

            for (let index in coordinates) {  
                var latitude = coordinates[index].coordinaten[0];  
                var longtitude = coordinates[index].coordinaten[1];                 

                if( !( latitude == 0 && longtitude == 0 ) )
                {                    
                    commit('ADD_MAP_LINE',coordinates[index].coordinaten)
                }                              

            }       
        }
    },

 }