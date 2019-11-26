export default {
    state: {        
        msg : { 
            text: '',
            type : 'info',
            show : false,            
        },

        msgDisplayCounter:0       
    },

    
    
    getters:{
        getMsg(state){            
            return state.msg;
        }
    },



    mutations:{
        showMsg: (state,payload) => {            
            state.msg.text  = payload.text;            
            if(payload.type == null || payload.type == undefined){
                state.msg.type  = 'primary';
            } else { state.msg.type = payload.type; }     
            state.msg.show  = true;
        },

        hideMsg: (state) => {
            state.msg.show  = false;
        }

    },



    actions:{
        displayMsg: ({commit,state}, payload) => {
            state.msgDisplayCounter++;
            var thisClick= state.msgDisplayCounter;  

            commit('showMsg',payload)            
            setTimeout(()=>{
                if(state.msgDisplayCounter == thisClick ){
                    commit('hideMsg');   
                }
            },2000)            
        }
    },
    
 }