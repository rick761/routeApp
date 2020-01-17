export default {
    namespaced: true,
    state : {
        routes:[]
    },
    getters : {
         
    },

    mutations : {
        
    },
    actions : {
        reloadMyRoutes({state,dispatch},payload){
            axios
            .get(window.location.origin+'/api/route/get/mijn')
            .then(response => {          
                state.myRoutes = response.data;
                dispatch('setRouteDist', 'myRoutes');                                    
            })
        },

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

        fetchRoutes( {state,dispatch}, payload ) {           
            if(payload == 'Mijn'){
                if(state.myRoutes.length == 0){    
                    axios
                    .get(window.location.origin+'/api/route/get/mijn')
                    .then(response => {          
                        state.myRoutes = response.data;
                        dispatch('setRouteDist', 'myRoutes');   
                        console.log('mic check');
                    })
                }
            }
        },
        
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

                    //set last to this, for the next loop 
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