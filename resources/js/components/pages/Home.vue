<template>
    <div>        
         
        <div class="row">

            <div class="" :class="'col-'+mapsize[0]">
                <!--navigator-->
                <app-navigator></app-navigator>
                <table class="table">                  
                    <tbody>
                        <router-link tag="tr" v-for="(routeItem, index) in route.routes" 
                            :to="'/Bekijk/'+routeItem.id" 
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
                    
                    <!--map-->
                    <app-home-page-map></app-home-page-map>       

                    <!--resizer-->        
                    <app-map-sizer v-model='mapsize'></app-map-sizer>

                </div>                                
            </div>
        </div>
        
        

        
    </div>
</template>
<script>
import { mapState  } from 'vuex';
import homePageMap from '../map/homePageMap';
import appMapSizer from '../layout/mapSizer';
import appExampleMap from "../map/example/exampleMap";
import appNavigator from "../layout/navigatorHomePage";

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
              
    },    
    components:{
        appHomePageMap:homePageMap,
        appMapSizer,
        appExampleMap,
        appNavigator
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