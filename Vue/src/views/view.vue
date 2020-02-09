<template>
   <div class="row">
        
            <!-- loading?? -->  
             
            <app-loader v-show="isLoaded" ></app-loader>
            
            <div :class="'stapBlock col-'+mapsize[0]" v-if="!isLoaded">
                
                <h1> {{view.route.naam}} </h1>
                <p v-if="view.route.informatie != undefined" >{{view.route.informatie}}</p>
                <p> - door "{{view.route.user['name']}}" in "{{view.route.land}}", het vervoer is "{{view.route.vervoer}}". </p>
                <p v-for="(routestap,index) in view.route.patroon" :key='index'>                   
                    <b>{{index+1}} -  {{routestap.naam}}</b>
                    <br>
                    <span v-if="routestap.commentaar != undefined" >"{{routestap.commentaar}}"</span>
                </p>                

            </div> 

            <div :class="'col-'+mapsize[1]" v-if="!isLoaded">
                <div class="sticky-top">
                    
                    <!--filler-->                 
                    <div class='block' style='height:50px;'></div>                    
                    
                    <!--leafletMap-->      
                    <leafletMap :view="getMapBoundaries">                            
                        <leafletMapMarkers :open="true" :markers="view.route.patroon" >                                
                        </leafletMapMarkers>
                        <leafletMapLines :lines="getMapLines" />
                    </leafletMap> 

                    <app-map-sizer v-model='mapsize'></app-map-sizer>
                </div>       
            </div>

    </div>
</template>

<script>
import appLoader from '../components/mechanism/loader'
import appMapSizer from '../components/layout/mapSizer'
import {mapState, mapGetters} from 'vuex' 

import leafletMap from '../components/map/leafletMap'
import leafletMapMarkers from '../components/map/parts/markers'
import leafletMapLines from '../components/map/parts/lines'



export default {
    data(){return{        
        mapsize:[6,6]
    }},

    components:{
        appLoader,     
        appMapSizer,        
        leafletMap,
        leafletMapMarkers,
        leafletMapLines,  
    },
    computed:{
        ...mapState({
            view : state => state.route.view
        }),        
        ...mapGetters({
            getMapBoundaries: 'route/view/mapBoundaries/GET_MAP_BOUNDARIES',            
            getMapLines: 'route/view/mapLines/GET_MAP_LINES',
        }),        
        
        isLoaded(){            
            return !(this.$store.state.route.view.route.naam != undefined);
        }
    },
    created(){
        this.$store.dispatch('route/view/viewRoute', this.$route.params.id );
   }
}
</script>

<style scoped>
    .stapBlock{
        margin-top:50px;
        margin-bottom:40%;
    }
</style>