import Vue from 'vue'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios)

export default {    

    namespaced: true,

    state : {
        stap:0,
        land:'',
        vervoer:'',
        naam:'',
        informatie:'',        
        CenterCoordinates:[52.237993, 6.161133],
        mapClick : false,
        patroon:[]      
    },


    getters : {
        foundRoute(state){
            return (state.land != '' );
        } ,

        getGegevens (state) {
            return {
                naam: state.naam,
                land: state.land,
                vervoer: state.vervoer
            }
        },
        
        getPatroonLine (state){
            let returnWaarde = [];            
            for (let index = 0; index < state.patroon.length; index++) {                
                if( !(state.patroon[index].coordinaten[0] == 0 && state.patroon[index].coordinaten[1] == 0 ) )
                {
                    returnWaarde.push (state.patroon[index].coordinaten );
                }                              
            }            
            return returnWaarde;
        },

        //boundary of map
        getBounds(state){
            let default_val = [[49.515,0.5761693],[54.477130,10.4638]]; //nederland

            let lat_max = 0;
            let lng_max = 0;
            let lat_min = 9999999;
            let lng_min = 9999999;

            let patroon = state.patroon;
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
        }           
    },



    mutations : {
        SetCenter: (state,payload) => {     
            state.CenterCoordinates = payload;
        },
        stapEdit : (state,payload) => {
          state.stap = payload;            
        },
        AddPatroon  : (state,payload) => {   
            if(state.mapClick){
                state.patroon.push( { naam:'', coordinaten: [payload.lat,payload.lng] } )  ;  // last item           
                state.mapClick = false;
            }            
        },
        mapClickButton(state){
            state.mapClick = ! state.mapClick;
        },
        DelPatroon : (state,payload) => {   
            state.patroon.splice(payload,1);
        },
        
    },


    actions : {
        Edit({state,dispatch},payload){
            //data
            let toSend = {}
            toSend.informatie = state.informatie;
            toSend.land = state.land;
            toSend.naam = state.naam;
            toSend.vervoer = state.vervoer;
            toSend.patroon = state.patroon;

           //apiCall
            axios
            .post(window.location.origin+'/api/route/edit/save', {toEdit: payload, toSend})
            .then(response => {               
                if(response.data == "error")   
                {                    
                    dispatch('displayMsg',{text:'Er is iets fout gegaan.',type:'danger'},{root:true} );
                    return;

                }                  
                //msg and redirect
                dispatch('displayMsg',{text:'Route is aangepast.',type:'success'}, {root:true} );
                dispatch('redirecter/redirect','/Mijn', {root:true} );
                dispatch('route/reloadMyRoutes','', {root:true} );                

                //reset
                state.stap = 0;
                state.informatie = '';
                state.land = '';
                state.naam = '';
                state.vervoer = '';
                state.patroon = [];

             })
             
            
        },

        getEditGegevens({state,dispatch},payload){            
            //api call
            axios
            .post(window.location.origin+'/api/route/edit/load', {naam: payload})
            .then(response => {
                
                if(typeof response.data == 'object'){                    
                    state.stap = 0;
                    state.informatie = response.data.informatie;
                    state.land = response.data.land;
                    state.naam = response.data.naam;
                    state.vervoer = response.data.vervoer;
                    state.patroon = JSON.parse(response.data.patroon);                    

                } else {
                    dispatch( 'displayMsg', { text:'Error bij het laden',type:'danger' }, {root:true});
                }
            });
        }
        
    },
    

 }