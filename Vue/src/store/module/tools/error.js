export default {

    namespaced: true,

    state : {
        text: "",
        type: ""
        
    },

    getters : {

         HAS_ERROR : (state) => {
             return state.text != "";
         }

    },

    mutations : {

        POST_ERROR: (state, payload) => {
            state.text = payload;
        },

        POST_ERROR_TYPE (state, payload){
            state.type = payload;
        },

        REMOVE_ERROR: (state) => {
            state.text = "";
            state.type = "";
        }

    },
    actions : {

        set: ({commit}, errorMsg) => {
            if(typeof errorMsg == String)
                commit("POST_ERROR", errorMsg);
            if(typeof errorMsg == Object)
                if(errorMsg.text)
                    commit("POST_ERROR", errorMsg.text);
                if(errorMsg.type)
                    commit("POST_ERROR_TYPE", errorMsg.type);
        },

        reset:({commit}) => {
            commit("REMOVE_ERROR");
        }

    }
 }