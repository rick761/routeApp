<template>
    <div >          
        <l-map style="height: 500px; width: 100%" :zoom="zoom"   
            :bounds="getBounds"
        >
          <l-marker v-for="(onderdeel,index) in hoveredRoute.patroon"  :key="index" 
                    :lat-lng="onderdeel.coordinaten">
                    <l-tooltip>{{index+1}} : {{onderdeel.naam}}</l-tooltip>       
          </l-marker>
          <l-polyline  :lat-lngs="getMapLine"></l-polyline>
          <l-tile-layer :url="url"></l-tile-layer>
        </l-map>        
  </div>
</template>

<script>
import * as Vue2Leaflet from 'vue2-leaflet' // VALID
import {LMap, LTileLayer, LMarker, LTooltip,LIcon,LPolyline } from 'vue2-leaflet'
import {icon} from 'leaflet'
import {mapState,mapGetters} from 'vuex'

export default {
    components: { LMap, LTileLayer, LMarker, LTooltip, LIcon,LPolyline  },
     data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 7,
      center: [52.237993, 6.161133],
      bounds: null
    };
  },
  
  computed:{
    ...mapState('route',['hoveredRoute']),
    ...mapGetters('route',['getMapLine','getBounds'])
  }
}
</script>
<style scoped>

</style>