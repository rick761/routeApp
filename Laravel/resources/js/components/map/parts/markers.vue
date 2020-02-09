<template>
    <div>
        <l-marker            
            
            v-for="(marker,index) in markers" 
            :key="index" 
            :lat-lng="marker.coordinaten"
        >
            <l-tooltip :options="{ permanent: open}">
                {{index+1}} : {{marker.naam}}
            </l-tooltip>

            <l-icon :icon-url="iconUrl"  />
            <slot />       
        </l-marker>

    </div>
</template>

<script>
import * as Vue2Leaflet from 'vue2-leaflet' // VALID
import { LMarker,LTooltip,LIcon } from 'vue2-leaflet'

    
export default {

    props:{
        markers: Array,
        open: { default:false }
    },    

    methods: {

    },

    data(){return{ 
        iconUrl: 'http://'+window.location.host + '/img/marker-icon-red.png'
    }},

    components:{ LMarker,LTooltip,LIcon }
    
}
</script>