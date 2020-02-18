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

        SET_REDIRECT_URL (state,payload)  {             
            state.redirectUrl = payload;                      
        },

        REDIRECT_ON (state)  {  
            state.redirectSwitch = true;
        },

        REDIRECT_OFF (state){
            state.redirectSwitch = false;
        }

    },
    actions : {

        redirect: ({commit}, payload) => {  
            commit('SET_REDIRECT_URL',payload);
            commit('REDIRECT_ON');            
        },

        redirectFinished: ({commit}) => {            
            commit('SET_REDIRECT_URL','');
            commit('REDIRECT_OFF');      
        }        

    },
 }