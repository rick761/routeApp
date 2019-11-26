import Vue from 'vue'
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios)

export default {
    namespaced: true,



    state : { 
        myRoutes : [],
        routes: [],        
        hoveredRoute :[],
           
    },



    getters : {                
        getMapLine (state){
            let returnWaarde = [];
            let patroon = state.hoveredRoute.patroon;            
            if(patroon!=undefined){
                for (let index = 0; index < patroon.length; index++) {                
                    if( !(patroon[index].coordinaten[0] == 0 && patroon[index].coordinaten[1] == 0 )){
                        returnWaarde.push (patroon[index].coordinaten );
                    }                              
                }
            }
            return returnWaarde;
        },    


           
        getBounds(state){
            let default_val = [[49.515,0.5761693],[54.477130,10.4638]]; //nederland
            let lat_max = 0;
            let lng_max = 0;
            let lat_min = 9999999;
            let lng_min = 9999999;

            let patroon = state.hoveredRoute.patroon;
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
        

    },



    actions : {
        setNewRoutes({state,dispatch},payload){
            state.routes = payload;
            dispatch('setRouteDist', 'routes'); 
        },

        reloadMyRoutes({state,dispatch},payload){
            axios
            .get(window.location.origin+'/api/route/get/mijn')
            .then(response => {          
                state.myRoutes = response.data;
                dispatch('setRouteDist', 'myRoutes');                                    
            })
        },
        

        //edit delete 
        delItem({dispatch},payload){
            axios
            .post(window.location.origin+'/api/route/del', {naam: payload})
            .then(response => {        
                if(response.data){
                    dispatch('displayMsg',{text:'Er is een route verwijderd',type:'success'},{root:true} );
                } else {
                    dispatch('displayMsg',{text:'Er is iets fout gegaan',type:'warning'},{root:true} );
                }
                dispatch('fetchRoutes','Mijn');
            })
        },

        //load all routes
        fetchRoutes( {state,dispatch}, payload ) {                 

            if(payload == 'Mijn'){
                if(state.myRoutes.length == 0){    
                    axios
                    .get(window.location.origin+'/api/route/get/mijn')
                    .then(response => {          
                        state.myRoutes = response.data;
                        dispatch('setRouteDist', 'myRoutes');                                    
                    })
                }
            }

            if(payload == 'Home'){
                
                if(state.routes.length == 0){   
                    axios
                    .get(window.location.origin+'/api/route/get')
                    .then(response => {                   
                        state.routes = response.data.data;
                        console.log(state.routes);
                        dispatch('setRouteDist', 'routes'); 
                    })          
                }         
            }
        },

        //homepage hover over route 
        hoveredRoute({state},payload) {
            state.hoveredRoute = payload;
            if(typeof state.hoveredRoute.patroon == 'string'){
                state.hoveredRoute.patroon = JSON.parse(state.hoveredRoute.patroon);
            }           
        },

        //calculate the distance of the route.
        setRouteDist({state},payload){       
           
            let routes;
            //which page? initiating
            if(payload == 'myRoutes'){                
                routes = state.myRoutes;
            } else {
                routes = state.routes;
            }           

            //voor elke route    
            routes.forEach((route,index) => {
                let kilometers = 0;
                let last_coordinaten = [];
                let routePatroon = JSON.parse(route.patroon);       

                routePatroon.forEach(routeLocatie => {
                    let coordinaten = routeLocatie.coordinaten;

                    // if last coordinates are set
                    if(last_coordinaten.length != 0 ){                        
                        
                        //calc difference between last and this
                        let diff_lat = Math.abs( coordinaten[0] - last_coordinaten[0] );
                        let diff_lng = Math.abs( coordinaten[1] - last_coordinaten[1] );                        

                        //difference to km
                        diff_lat = Math.abs(diff_lat*110.57);
                        diff_lng = Math.abs(diff_lng*(111.320*Math.cos(coordinaten[0])));                        

                        //pythagoras dist
                        diff_lat = Math.pow(diff_lat,2); //km squared
                        diff_lng = Math.pow(diff_lng,2); //km squared                       
                        let afstand = Math.sqrt(diff_lat + diff_lng);

                        kilometers += afstand;                                                
                    } 

                    //set last to this, for the next loop hole
                    last_coordinaten = coordinaten;
                });

                //which page? save stuff
                if(payload == 'myRoutes'){        
                    state.myRoutes[index].afstandKm = kilometers.toFixed(3);
                } else {
                    state.routes[index].afstandKm = kilometers.toFixed(3);
                }     
            });
        }, 
        
    },



 }