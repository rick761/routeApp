export default {
    namespaced: true,
    
    state : {
        redirectUrl: '',
        redirectSwitch: false
    },
    getters : {
        mustRedirect (state){
            return (state.redirectSwitch && state.redirectUrl != '');
        } 
    },
    mutations : {

        setRedirectUrl (state,payload)  {             
            state.redirectUrl = payload;                      
        },
        redirectOn (state)  {  
            state.redirectSwitch = true;
        },
        redirectOff (state){
            state.redirectSwitch = false;
        }

    },
    actions : {
        redirect: ({commit}, payload) => {  

            commit('setRedirectUrl',payload);
            commit('redirectOn');            

        },
        redirectFinished: ({commit}) => {
            
            commit('setRedirectUrl','');
            commit('redirectOff');      

        }        
    },

 }