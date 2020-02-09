<template>
    <div>       
        <errorCapture>
            <app-header/>              
            <app-alert/>                 
            <redirecter/>     
            <transition name="fade"  mode="out-in">
                <router-view/>
            </transition>
        </errorCapture>
    </div>    
</template>

<script>
import HeaderComponent from './components/layout/header'
import AlertComponent from './components/layout/alert'
import redirecter from './components/mechanism/redirecter'
import errorCapture from './components/mechanism/errorCapture'

export default {     
    components: {
        appHeader : HeaderComponent, 
        appAlert: AlertComponent,
        redirecter ,
        errorCapture      
    }, 
    
    created(){        
        this.$store.dispatch('authenticate/load');                      
    },      
}
</script>

<style>
    /** global CSS */
    h1{
        margin-bottom:40px;
    }
    .leaflet-control-attribution a, .leaflet-control-zoom {
        display:none;
    }
</style>


<style scoped>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
</style>

