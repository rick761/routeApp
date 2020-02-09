import Vue from 'vue'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios)

export default {
    namespaced:true,
    state : {
        AUTHENTICATED_USER:{}
    },
    getters : {
        IS_LOGGED_IN(state){
            console.log(state.AUTHENTICATED_USER);
            return !(Object.keys(state.AUTHENTICATED_USER).length === 0);
        },   
        GET_USER(state){
            return state.AUTHENTICATED_USER;
        }  
    },

    mutations : {
        SET_AUTHENTICATED_USER (state,payload)  {             
           state.AUTHENTICATED_USER = payload;                            
        }        
    },

    actions : {
        loginPopup: ({commit,dispatch}) => {           
                           
            let popup = window.open(
                window.location.origin+'/login/google',     
                'popUpWindow',                              
                'height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes' //stats
            );            
            
            let interval = setInterval( function(){    
             
                if(popup.location.href == window.location.origin+'/ApiLoginSuccesfull'){                                                 
                    commit('SET_AUTHENTICATED_USER',JSON.parse(popup.document.body.innerHTML)) 
                    dispatch('alert/success','Welkom, je bent ingelogd',{root:true});                
                    clearInterval(interval);
                    popup.close();
                }

                if(! popup.location.href ){ 
                    clearInterval(interval);
                }
                                                 
            }, 200);
        },

        
        load({commit}){  
            var url = window.location.origin+'/api/getAuth';         
            axios.get(url).then(response => {           
                if(typeof response.data === 'object'){ 
                    commit('SET_AUTHENTICATED_USER',response.data); 
                }                   
            })           
        },

        logOut({commit,dispatch}){            
            var url = window.location.origin+'/logout';
            axios.get(url).then(response => {
               if(response.data === 'succes'){                    

                    var emptyUser = {};
                    commit('SET_AUTHENTICATED_USER', emptyUser)        
                    dispatch('alert/success','je bent uitgelogd',{root:true});         
                    dispatch('redirecter/redirect','/',{root:true})
               }           
            });
        }       

    },

 }