
//imports
import Vue from 'vue'
import VueAxios from 'vue-axios';
import axios from 'axios';

//uses
Vue.use(VueAxios, axios)

export default {
    namespaced: true,    

    //sampledata
    state : {
        stap:0,
        land:'',//'Nederland',
        vervoer:'',//'Wandelen',
        naam:'',//'Prachtig mooie wandeltocht door de natuur',
        informatie:'',//'Voor de gemiddelde 60+er is deze afstand perfect (met de auto)',
        CenterCoordinates:[52.237993, 6.161133],
        mapClick : false,
        patroon:[   
            //{naam:'Amsterdam', coordinaten:[52.01 , 6.07], commentaar: 'Leuk mooi stad.'},
            //{naam:'Rotterdam', coordinaten:[51.77 , 4.96], commentaar: 'Echt een aanrader'},
            //{naam:'Den Haag',  coordinaten:[52.51 , 6.01], commentaar: 'Waar zijn de duinen?'}     
        ]      
    },


    getters : {
       
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
        getBounds(state){
            let default_val = [[49.515,0.5761],[54.477,10.463]]; //nederland
            
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
        Create({state,commit,dispatch}){
            

            let toSend = {}
            toSend.informatie = state.informatie;
            toSend.land = state.land;
            toSend.naam = state.naam;
            toSend.vervoer = state.vervoer;
            toSend.patroon = state.patroon;
           
            axios
            .post(window.location.origin+'/api/route/create', toSend)
            .then(response => {
               
                if(response.data == "error")   
                {
                    
                    dispatch('displayMsg',{text:'Route bestaat al.'},{root:true} );
                    return;
                }                  
                dispatch('displayMsg',{text:'nieuwe route is gemaakt.'},{root:true} )
                dispatch('redirecter/redirect','/Mijn',{root:true} );
                dispatch('route/reloadMyRoutes','', {root:true} );     
                
                    

                //reset
                state.stap = 0;
                state.informatie = '';
                state.land = '';
                state.naam = '';
                state.vervoer = '';
                state.patroon = [];          

             })
            
        }
        
    },

 }