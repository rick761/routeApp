<template>
     <div class='alert-container sticky-top fixed-top'  v-if="getMsg.show">
        
            <div class="sticky-top">
                <div style="position:absolute;">
                    <div class='fill'>  </div>
                    <transition name="fade">
                        <div :class="'alert alert-'+getMsg.type" v-if="getMsg.show" role="alert">
                            <h3 class="mt-2 mb-2">{{getMsg.text}}</h3>
                        </div>  
                    </transition>
                </div>
             </div>


       
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {    
    computed:{
        ...mapGetters(['getMsg']),
        
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
