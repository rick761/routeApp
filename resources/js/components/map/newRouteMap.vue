<template>
    <div >        
      
         <l-map @click="mapclick"
            style="height: 500px; width: 100%"
            :zoom="zoom"
            :center="center"            
            :bounds="getBounds"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated"
            @update:bounds="boundsUpdated"
        >
            <l-tile-layer :url="url"></l-tile-layer>            
            <l-marker :v-show="onderdeel.coordinaten"
                       color="red"
                       v-for="(onderdeel,index) in newRoute.patroon" 
                       :key="index"                                              
                       :lat-lng="{lat : onderdeel.coordinaten[0] ,lng: onderdeel.coordinaten[1] }" 
            >
              <l-tooltip>{{index+1}} : {{onderdeel.naam}}</l-tooltip>              
              <l-icon  :icon-url="iconUrl"/>  
            </l-marker>

              <l-polyline
                :lat-lngs="getPatroonLine"
                >
              </l-polyline> 
        </l-map> 

        
  </div>
</template>

<script>
import * as Vue2Leaflet from 'vue2-leaflet' // VALID
import {LMap, LTileLayer, LMarker, LTooltip,LIcon,LPolyline } from 'vue2-leaflet'
import {icon} from 'leaflet'
import {mapGetters, mapState, mapMutations} from 'vuex'


export default {
    components: { 
      LMap,
      LTileLayer,
      LMarker,
      LTooltip,
      LPolyline,
      LIcon 
    },
    

    data () {
      return {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        zoom: 7,
        center: [52.237993, 6.161133],
        bounds: null,
        iconUrl: 'http://'+window.location.host + '/img/marker-icon-red.png'       
    };

    
  },

  computed:{
      ...mapGetters('newRoute',[                    
          'getPatroonLine','getBounds'
      ]),
      ...mapState(['newRoute']),      
  },


  methods: {    
    mapclick(event){
        this.$store.commit('newRoute/AddPatroon',{
          lat: (event.latlng.lat % 90),
          lng: (event.latlng.lng % 180)
          })        
          console.log(event.latlng.lat % 90);
          console.log(event.latlng.lng % 180);
    },
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
      
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    },
   
       
  },
  created(){
   
    
  }


  
}
</script>