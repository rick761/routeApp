import request from '../tools/request'
import * as constants from '../../../constants/constants'


export default {
    namespaced:true,
    modules:{ request },

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

            var domain = constants.REST_CALL.URL;               
            let popup = window.open(
                constants.REST_CALL.URL+'/login/google',     
                'popUpWindow',                              
                'height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes' //stats
            );        

            window.addEventListener('message', function(event) {
                console.log(event.data);                   
                 
                 if(event.data.url == constants.REST_CALL.URL+'/ApiLoginSuccesfull'){                                                 
                    commit('SET_AUTHENTICATED_USER',event.data.account) ;
                    dispatch('alert/success','Welkom, je bent ingelogd',{root:true});                
                    clearInterval(interval);
                    popup.close();
                }
                
            });
            
            let interval = setInterval( function(){    
                popup.postMessage('launch Event',domain); //sending the message to get a response
                                            
            }, 200);
        },

        
        async load({commit,dispatch,state}){  
            var url = '/api/getAuth'; 
            await dispatch('request/get', url );  
            
            if(typeof state.request.RESPONSE === 'object'){ 
                commit('SET_AUTHENTICATED_USER', state.request.RESPONSE ); 
                console.log(3);  
            }                   
                     
        },

        async logOut({commit,dispatch,state}){            
            var url = '/logout';
            await dispatch('request/get', url );  
            
            if(state.request.RESPONSE  === 'succes'){                
                var emptyUser = {};
                commit('SET_AUTHENTICATED_USER', emptyUser)        
                dispatch('alert/success','je bent uitgelogd',{root:true});         
                dispatch('redirecter/redirect','/',{root:true})
            }           
            
        }       

    },

 }