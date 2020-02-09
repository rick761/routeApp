import Vue from 'vue'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios)

export default {
    namespaced: true,
    state : {
        RESPONSE:[],
        _const:{
            LOCATION : window.location.origin
        },
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
        
        async get({state,commit},url){           
            await axios.get( state._const.LOCATION + url ).then( response => {  
                commit('SET_RESPONSE',response);    
                commit('FORMAT_RESPONSE');
            })
        },

        async post({state,commit}, payload ){
            console.log(payload)
            await axios.post( state._const.LOCATION + payload.url, payload.data ).then( response => { 
                
                commit('SET_RESPONSE',response);    
                commit('FORMAT_RESPONSE');  
                
            }); 
        },
    },

 }