import Vue from 'vue'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios)

export default {
    state : {
        authUser:{}
    },
    getters : {
        isLoggedIn(state){
            return !(Object.keys(state.authUser).length === 0);
        },   
        getAuthUser(state){
            return state.authUser;
        }  
    },
    mutations : {
        setAuthUser (state,payload)  {             
           state.authUser = payload;                      
        }
        
    },
    actions : {
        LoginPopup: ({commit,dispatch}, payload) => {            
            // OPEN WINDOW                    
            let popup = window.open(
                window.location.origin+'/login/google',     //loc
                'popUpWindow',                              //name
                'height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes' //stats
            );
            console.log(popup.location.href); 
            //check for result
            let interval = setInterval( function(){     
              //  console.log(popup.location.href); 
                if(popup.location.href == window.location.origin+'/ApiLoginSuccesfull'){  
                           
                    commit('setAuthUser',JSON.parse(popup.document.body.innerHTML)) 
                    dispatch('displayMsg',{text:'Welkom, je bent ingelogd'})
                    clearInterval(interval);
                    popup.close()
                }
                if(popup.location.href == undefined ){ // Popup was closed stop searching
                    clearInterval(interval);
                }
                                                 
            }, 200);
        },
        fetchAuthAtStartup({commit,}, payload){
           
            axios
                .get(window.location.origin+'/api/getAuth')
                .then(response => {                  
                   if(typeof response.data === 'object'){ // if returns object is an account!
                       commit('setAuthUser',response.data) 
                   }
                   
                })
        },
        logOut({commit,dispatch}, payload){
            axios
            .get(window.location.origin+'/logout')
            .then(response => {
               if(response.data === 'succes'){                    
                    dispatch('displayMsg',{text:'je bent uitgelogd'})
                    commit('setAuthUser',{}) //deleteUser
                    this.$router.push('Home')
               }           
            })
        }       

    },

 }