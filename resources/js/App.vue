<template>
    <div>

        

        <!--header-->    
        <app-header></app-header>

        <!--alert-->        
        <app-alert></app-alert>         

        <!--redirect mechanisme -->        
        <redirecter></redirecter>

        <!--main content-->    
        <transition name="fade"  mode="out-in">
            <router-view></router-view>
        </transition>

        

    </div>    
</template>

<script>
import HeaderComponent from './components/layout/header'
import AlertComponent from './components/layout/alert'
import redirecter from './components/mechanism/redirecter'

export default {     

    components: {
        appHeader : HeaderComponent, 
        appAlert: AlertComponent,
        redirecter       
    }, 
    
    created(){        
        this.$store.dispatch('fetchAuthAtStartup');                
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

