<template>
    <div >
               
         <l-map @click="mapclick"
            style="height: 500px; width: 100%"           
            :bounds="getBounds" 
        >
          <l-tile-layer :url="url"></l-tile-layer>            
          <l-marker :v-show="onderdeel.coordinaten" color="red" v-for="(onderdeel,index) in editRoute.patroon" :key="index" :lat-lng="{lat : onderdeel.coordinaten[0] ,lng: onderdeel.coordinaten[1] }">
            <l-tooltip>{{index+1}} : {{onderdeel.naam}}</l-tooltip>              
            <l-icon  :icon-url="iconUrl"/>  
          </l-marker>
          <l-polyline :lat-lngs="getPatroonLine"></l-polyline> 
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
      LMap, LTileLayer, LMarker, LTooltip, LPolyline, LIcon 
    },    


    data () {return {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        zoom: 7,        
        bounds: null,
        iconUrl: 'http://'+window.location.host + '/img/marker-icon-red.png'       
    };},



  computed:{
      ...mapGetters('editRoute',['getPatroonLine','getBounds']),
      ...mapState(['editRoute']),      
  },


  methods: {    
    mapclick(event){
        this.$store.commit('editRoute/AddPatroon',{
          lat: (event.latlng.lat % 90),
          lng: (event.latlng.lng % 180)
        })        
    },
  },

  created(){   
    
  }
}
</script>