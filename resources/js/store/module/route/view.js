import Vue from 'vue'
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios)

export default {

    namespaced: true,

    state:{        
        viewRoute : []   
    },
    getters:{
        getBounds(state){
            let default_val = [[49.515,0.5761693],[54.477130,10.4638]]; //nederland

            let lat_max = 0;
            let lng_max = 0;
            let lat_min = 9999999;
            let lng_min = 9999999;

            let patroon = state.viewRoute.patroon;
            
            if(patroon != undefined){

                for (let index = 0; index < patroon.length; index++) {

                    let lat = patroon[index].coordinaten[0];
                    let lng = patroon[index].coordinaten[1];

                    if(lat > lat_max){ lat_max = lat; }
                    if(lat < lat_min){ lat_min = lat; }
                    if(lng > lng_max){ lng_max = lng; }
                    if(lng < lng_min){ lng_min = lng; }   
                                        
                }                              
                return [[lat_min,lng_min],[lat_max,lng_max]]; //bounds
            }
            return default_val; //nl kaart
        },

        getPatroonLine (state){
            let returnWaarde = [];
            let patroonList = state.viewRoute.patroon;
            for (let index = 0; index < patroonList.length; index++) {                
                if( !(patroonList[index].coordinaten[0] == 0 && patroonList[index].coordinaten[1] == 0 ) )
                {
                    returnWaarde.push (patroonList[index].coordinaten );
                }                              
            }            
            return returnWaarde;
        },   
    },
    
    actions:{
        fetchOneRoute({state},payload){      
            axios
            .get(window.location.origin+'/api/route/getOne?id='+payload)
            .then(response => {        
                state.viewRoute = response.data;
                state.viewRoute.patroon =  JSON.parse( state.viewRoute.patroon );       
            })
        },
    }
      















}