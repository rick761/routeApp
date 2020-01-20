<template>
    <div>        
         
        <div class="row">

            <div class="" :class="'col-'+mapsize[0]">

                <!--navigator-->
                <paginate></paginate>

                <table class="table">                  
                    <tbody>
                        <router-link tag="tr" v-for="(routeItem, index) in route.ROUTES" 
                            :to="'/view/'+routeItem.id" 
                            :key="index"                                                  
                        >                           
                            <td @mouseover="hoverOverRoute(index)"   >{{routeItem.naam}} 
                                <span style="float:right; opacity:0.6; font-size:0.8em"> <i class="fa fa-eye"></i> {{routeItem.views_count}}</span>
                                <span style='display:block' >
                                     - <i v-if="getDistances[index]" >  {{getDistances[index]}} km </i>
                                          ({{routeItem.land}}, {{routeItem.vervoer}})  
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
                    <leafletMap :view="getMapBoundaries" >
                        <leafletMapMarkers :markers="route.SHOWN_ROUTE.patroon"  /> <!---->
                        <leafletMapLines :lines="getMapLines" />
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
import paginate from "../layout/paginate";

//map
import leafletMap from "../map/leafletMap";
import leafletMapMarkers from "../map/parts/markers";
import leafletMapLines from "../map/parts/lines";

export default {
    data(){ return{
        mapsize:[ 6,6 ],
        selected:{}
    }},
    methods:{
        hoverOverRoute(index){   
            this.$store.dispatch('route/hoverOverRoute', index);
        }
    },
    computed: {        
        ...mapState({
            route : state => state.route,
        }),    
        ...mapGetters({
            getMapLines : 'route/mapLines/GET_MAP_LINES',
            getMapBoundaries : 'route/mapBoundaries/GET_MAP_BOUNDARIES',
            getDistances : 'route/coordinateDistance/GET_DISTANCES'
        }),
              
    },    
    components:{        
        appMapSizer,        
        paginate,
        leafletMap,
        leafletMapMarkers,
        leafletMapLines
    },
    created(){        
        this.$store.dispatch('route/load');
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