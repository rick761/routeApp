<template>
   <div class="row">
        
            <!-- loading?? -->    
            <app-loader v-show="isLoaded" ></app-loader>

            <div :class="'stapBlock col-'+mapsize[0]" v-if="!isLoaded">

                <h1> {{bekijkRoute.viewRoute.naam}} </h1>

                <p v-if="bekijkRoute.viewRoute.informatie != undefined" >{{bekijkRoute.viewRoute.informatie}}</p>

                <p> - door "{{bekijkRoute.viewRoute.user['name']}}" in "{{bekijkRoute.viewRoute.land}}", het vervoer is "{{bekijkRoute.viewRoute.vervoer}}". </p>

                <p v-for="(routestap,index) in bekijkRoute.viewRoute.patroon" :key='index'>
                    
                    <b>{{index+1}} -  {{routestap.naam}}</b>
                    <br>
                    "{{routestap.commentaar}}"
                </p>                

            </div> 

            <div :class="'col-'+mapsize[1]" v-if="!isLoaded">
                <div class="sticky-top">
                    <!--filler-->
                    <div class='block' style='height:50px;'></div>
                    <app-bekijk-route-map></app-bekijk-route-map>         
                    <app-map-sizer v-model='mapsize'></app-map-sizer>
                </div>       
            </div>

    </div>
</template>

<script>
import appLoader from '../mechanism/loader'
import bekijkRouteMap from '../map/bekijkRouteMap'
import appMapSizer from '../layout/mapSizer'
import {mapState, mapGetters} from 'vuex' 

export default {
    data(){return{
        mapsize:[6,6]
    }},
    components:{
        appLoader,
        appBekijkRouteMap : bekijkRouteMap,
        appMapSizer
    },
    computed:{
        ...mapState(['bekijkRoute']),
        

        isLoaded(){            
            return !(this.$store.state.bekijkRoute.viewRoute.naam != undefined);
        }

    },
    created(){
        this.$store.dispatch('bekijkRoute/fetchOneRoute', this.$route.params.id );
        
   }
}
</script>

<style scoped>
    .stapBlock{
        margin-top:50px;
        margin-bottom:40%;
    }
</style>