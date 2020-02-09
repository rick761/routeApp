<template>
    <l-polyline  :lat-lngs="lines"></l-polyline>
</template>

<script>
import * as Vue2Leaflet from 'vue2-leaflet' // VALID
import { LPolyline } from 'vue2-leaflet'
    
export default {    
    props:['lines'],
    components:{ LPolyline }    
}
</script>