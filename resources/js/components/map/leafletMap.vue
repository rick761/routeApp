<template>
    <div>
        <l-map             
            style="height: 500px; width: 100%"
            :zoom="zoom"     
            :bounds="view"
            :max-bounds="view"
            :center="center"   
            @click="emitCoordinates"
        >                    
            <l-tile-layer :url="url" />
            <slot />
        </l-map>
    </div>
</template>

<script>
import * as Vue2Leaflet from 'vue2-leaflet' // VALID
import { LMap, LTileLayer } from 'vue2-leaflet'


export default {

    data () {return {
      zoom: 0,
      center: [0, 0], 
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",  
      
    }},

    props: {
        view : {                  
            default: () => [[49.515,0.5761693],[54.477130,10.4638]]
        }
    },
    
    methods:{
        emitCoordinates(event){            
            this.$emit(
                'input',
                {
                    lat: (event.latlng.lat % 90),
                    lng: (event.latlng.lng % 180)
                }
            );
        }
    },

    components : {
        LMap, LTileLayer
    }
}
</script>