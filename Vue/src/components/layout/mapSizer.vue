<template>
    <div>
        

        <div class="progress bg-dark" style="">
            <div class="progress-bar bg-light" role="progressbar" :style="'width:'+percentage"></div>     
        </div>
        
        <div style="display:block; margin-top:-16px;" >  
            <div 
              @click='mapSizeChange(index)'
               v-for="index in 5"
                :key='index'
                style="width:20%; display:inline-block; text-align:center;cursor:pointer; ">
                <a >                    
                    <i class="fas fa-minus text-primary" style="transform: rotate(90deg);" ></i>
                </a>
            </div>                        
        </div> 
                
    </div>
</template>



<script>
export default {
    props:['value'],

    computed:{
        percentage(){
            let a = this.value[0]-4;
            let b = this.value[1]-4;
            let total = a+b;
            let eenheid = a/total * 100; 
            let percentage = 10 + (0.8*eenheid)  ;                
            return percentage+'%';
        }
    },
    methods:{
        mapSizeChange(payload){

            let a = 3;
            let b = 3;

            a += payload;
            b += (6-payload);

            this.$emit('input', [a,b]);        
        }
    }    
}
</script>


<style scoped>    
    i{font-size: 1.1em;}
</style>