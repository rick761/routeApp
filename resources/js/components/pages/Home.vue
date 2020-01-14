<template>
    <div>        
         
        <div class="row">

            <div class="" :class="'col-'+mapsize[0]">
                <!--navigator-->
                <app-navigator></app-navigator>
                <table class="table">                  
                    <tbody>
                        <router-link tag="tr" v-for="(routeItem, index) in route.routes" 
                            :to="'/view/'+routeItem.id" 
                            :key="index"                                                  
                        >                           
                            <td @mouseover="selectedRoute(routeItem)"   >{{routeItem.naam}} 
                                <span style="float:right; opacity:0.6; font-size:0.8em"> <i class="fa fa-eye"></i> {{routeItem.views_count}}</span>
                                <span style='display:block' >
                                     <i > - {{routeItem.afstandKm}} km </i>({{routeItem.land}}, {{routeItem.vervoer}})  
                                </span> 

                            </td>                          
                                             
                        </router-link>
                    </tbody>
                </table>
            </div>
           
            <div :class="'col-'+mapsize[1]">
                <div class="sticky-top">

                    <!--filler-->
                    <div class='block' style='height:50px;'></div>

                    <!--leafletMap-->
                    <leafletMap :view="getBounds" >
                        <leafletMapMarkers :markers="hoveredRoute.patroon" />
                        <leafletMapLines :lines="getMapLine" />
                    </leafletMap>               
                    
                    <!--resizer-->        
                    <app-map-sizer v-model='mapsize'></app-map-sizer>

                </div>                                
            </div>
        </div>
        
        

        
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import appMapSizer from '../layout/mapSizer';
import appNavigator from "../layout/navigatorHomePage";

//map
import leafletMap from "../map/leafletMap";
import leafletMapMarkers from "../map/parts/markers";
import leafletMapLines from "../map/parts/lines";

export default {
    data(){ return{
        mapsize:[6,6],
        selected:{}
    }},
    methods:{
        selectedRoute(route){   
            this.$store.dispatch('route/hoveredRoute', route);
        }
    },
    computed: {
        ...mapState(['route']),
        ...mapState('route',['hoveredRoute']),
        ...mapGetters('route',['getMapLine','getBounds'])
              
    },    
    components:{        
        appMapSizer,        
        appNavigator,

        leafletMap,
        leafletMapMarkers,
        leafletMapLines
    },
    created(){        
        this.$store.dispatch('route/fetchRoutes', 'Home' );
    },
       
};
</script>
<style scoped>
    table tbody tr:hover{ 
        font-weight:bolder;
        cursor: pointer;
    }
    .stapBlock{
        margin-top:50px;
        margin-bottom:40%;
    }

</style>