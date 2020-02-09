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
    props:{
        value : {
            default: () => { return [6,6] }
        }
    },

    computed:{
        percentage(){
            let columnLeft = this.value[0]-4;
            let columnRight =  this.value[1]-4;
            let total = columnLeft+columnRight;
            let eenheid = columnLeft/total * 100; 
            let percentage = 10 + (0.8*eenheid)  ;                
            return percentage+'%';
        }
    },
    methods:{
        mapSizeChange(payload){

            let columnLeft = 3;
            let columnRight = 3;

            columnLeft += payload;
            columnRight += (6-payload);
        
            this.$emit('input', [ columnLeft, columnRight ]);        
        }
    }    
}
</script>


<style scoped>    
    i{font-size: 1.1em;}
</style>