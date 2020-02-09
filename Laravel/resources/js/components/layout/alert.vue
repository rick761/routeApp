<template>
     <div class='alert-container sticky-top fixed-top'  v-if="alert.SHOW">
        
            <div class="sticky-top">
                <div style="position:absolute;">
                    <div class='fill'>  </div>
                    <transition name="fade">
                        <div :class="'alert alert-'+alert.TYPE" v-if="alert.SHOW" role="alert">
                            <h3 class="mt-2 mb-2">{{alert.TEXT}}</h3>
                        </div>  
                    </transition>
                </div>
             </div>


       
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {    
    computed:{
        ...mapState({
            alert : state => state.alert,
        }),        
    }
}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fill{
    height:100px;
    display:block;
}



</style>
