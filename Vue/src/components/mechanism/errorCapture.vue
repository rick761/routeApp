
<template>
  <div>        
    <slot v-if="err" name="error" v-bind:err="err" v-bind:vm="vm" v-bind:info="info"    >   
        <p style="margin-top:10px;">
            <a class="btn btn-danger" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                {{info}} ERROR, click for info.            
            </a>
            <a href="#" @click="close">sluit</a>
        </p>
        <div class="collapse" id="collapseExample">
            <div class="card card-body">
                {{err}}
            </div>
        </div>
    </slot>

    <div v-if="hasError">Module error: {{error.text}} <a href="#" @click="closeModuleError">sluit</a></div>

    <slot />
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
export default {
  name: "error-boundary",
  props: {
    stopPropagation: Boolean
  },
  computed:{
    ...mapState({
        error : state => state.error,
    }),
    ...mapGetters({
        'hasError' : 'error/HAS_ERROR'        
    })
  },
  data() {
    return {
      err: false,
      vm: null,
      info: null
    };
  },
  methods:{
      close(){
        this.err=false;
      },
      closeModuleError(){
          this.$store.dispatch('error/reset',null);
      }
      
  },
  errorCaptured(err, vm, info) {
    this.err = err;
    this.vm = vm;
    this.info = info;  
    return !this.stopPropagation;
  }
};
</script>

<style lang="scss" scoped>
</style>