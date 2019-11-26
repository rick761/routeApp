<template>
    <div >          
        <l-map style="height: 500px; width: 100%" 
            :zoom="zoom"   
            :bounds="getBounds"
        >
          <l-marker  @l-add="$event.target.openPopup()" v-for="(onderdeel,index) in viewRoute.patroon"  :key="index" 
                    :lat-lng="onderdeel.coordinaten">                    
                    <l-tooltip :options="{ permanent: true}" >
                      {{index+1}} : {{onderdeel.naam}}
                    </l-tooltip>      
          </l-marker>

          <l-polyline   :lat-lngs="getPatroonLine"></l-polyline>
          <l-tile-layer :url="url"></l-tile-layer>
        </l-map>        
  </div>
</template>

<script>
import * as Vue2Leaflet from 'vue2-leaflet' // VALID
import {LMap, LTileLayer, LMarker, LPopup , LTooltip,LIcon,LPolyline } from 'vue2-leaflet'
import {icon} from 'leaflet'
import {mapState,mapGetters} from 'vuex'

export default {
    components: { LMap, LTileLayer, LMarker, LPopup, LTooltip, LIcon,LPolyline  },
    data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 7,
      center: [52.237993, 6.161133],
      bounds: null
    };
  },


  
  computed:{
    ...mapState('bekijkRoute',['viewRoute']),
    ...mapGetters('bekijkRoute',['getBounds','getPatroonLine']),

    
  },
  
}
</script>
<style scoped>

</style>