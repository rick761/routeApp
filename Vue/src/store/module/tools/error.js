export default {

    namespaced: true,

    state : {
        text: ""
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

        REMOVE_ERROR: (state) => {
            state.text = "";
        }

    },
    actions : {

        set: ({commit}, errorMsg) => {
            commit("POST_ERROR", errorMsg);
        },

        reset:({commit}) => {
            commit("REMOVE_ERROR");
        }

    }
 }