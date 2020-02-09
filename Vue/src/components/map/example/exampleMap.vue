<template>
    <div >
        <div class="info" >
            <p>Center: {{ center }}</p>
            <p>Zoom: {{ zoom }}</p>
            <p>Bounds: {{ bounds }}</p>
        </div>
        <l-map
            style="height: 350px; width: 100%"

            :zoom="zoom"
            :center="center"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated"
            @update:bounds="boundsUpdated"
        >
            <l-tile-layer :url="url"></l-tile-layer>
        </l-map>
  </div>
</template>

<script>
import * as Vue2Leaflet from 'vue2-leaflet' // VALID
import {LMap, LTileLayer} from 'vue2-leaflet'

export default {
    components: { LMap, LTileLayer  },
     data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 7,
      center: [52.237993, 6.161133],
      bounds: null
    };
  },

  
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    }
  },
}
</script>