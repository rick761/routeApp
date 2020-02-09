import * as constants from '../../../constants/constants'

export default {
    namespaced: true,
    state : {
        RESPONSE:[],
       
        _func:{
            format_fix_data : (res) => {                
                while(res.data != undefined) {
                    res = res.data;                    
                }                
                return res;
            },
            format_fix_json : (res) =>{                
                if(res.patroon != undefined){                    
                    res.patroon  = JSON.parse(res.patroon);
                }
                return res;
            }
        }
    },
    

    mutations : {
        SET_RESPONSE(state,payload){
            state.RESPONSE = payload;
            console.log('SET_RESPONSE');
        },
        FORMAT_RESPONSE(state){
            state.RESPONSE = state._func.format_fix_data(state.RESPONSE);
            state.RESPONSE = state._func.format_fix_json(state.RESPONSE);
            console.log('FORMAT_RESPONSE');
        }
        
    },
    actions : {
        
        async get({commit},url){   
            await axios.get( constants.REST_CALL.URL + url ).then( response => {  
                commit('SET_RESPONSE',response);    
                commit('FORMAT_RESPONSE');                
            })

        },

        async post({commit}, payload ){            
            await axios.post( constants.REST_CALL.URL + payload.url, payload.data ).then( response => {                 
                commit('SET_RESPONSE',response);    
                commit('FORMAT_RESPONSE');                  
            }); 

        },
    },

 }