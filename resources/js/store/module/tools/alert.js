



export default {
    namespaced:true,

    state: {               
        TEXT: '',
        TYPE : 'info',
        SHOW : false,  
        ALERT_ID:0       
    },

    getters:{
        GET_ALERT_ID(state){
            return state.CLICK_COUNTER;
        },
        idIsStillTheSame(getters,payload){
            return getters.GET_ALERT_ID == payload;
        }
    },

    mutations:{        

        HIDE_ALERT: (state) => {
            state.SHOW  = false;
        },
        SHOW_ALERT:(state) => {
            state.SHOW  = true;
        },
        NEW_ALERT_ID:(state) => {
            state.ALERT_ID++;
        },
        SET_TEXT:(state, payload) => {
            state.TEXT = payload;
        },
        SET_TYPE:(state, payload) => {
            state.TYPE = payload;
        }
    },

    actions:{

        danger({dispatch}, payload){                        
            var specifications = { 
                 type : 'danger',
                 text: payload
            }
            dispatch('show',specifications);
        },

        success({dispatch}, payload){                        
            var specifications = { 
                 type : 'success',
                 text: payload
            }
            dispatch('show',specifications);
        },
        
        show({commit,getters},specifications){
            if(typeof specifications == 'string'){
                specifications = {
                    type :'primary',
                    text: specifications
                }
            }
            commit('SET_TEXT', specifications.text);
            commit('SET_TYPE', specifications.type);
            commit('SHOW_ALERT'); 

            commit('NEW_ALERT_ID');
            var id_thisAlertBox = getters.GET_ALERT_ID;   
            setTimeout(()=>{
                if( id_thisAlertBox === getters.GET_ALERT_ID ){
                    commit('HIDE_ALERT'); 
                }
            },2000) 
        },
       
    },
    
 }