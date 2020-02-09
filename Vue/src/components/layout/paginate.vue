<template>
    <div>
        <!--navigator-->    
        <nav class="navbar navbar-expand-lg navbar-light bg-light">           
        
        <ul class="pagination pagination-sm mb-0">
            <div v-for="(i) in paginate.TOTAL_PAGES"  :key='i' >
                <li v-show="toonPaginationNumber(i,paginate.CURRENT_PAGE)"  v-if="paginate.CURRENT_PAGE != i" class="page-item" >
                        <a @click="changePage(i)" class="page-link" href="#">{{i}}</a>
                </li>  
                <li v-else class="page-item active" aria-current="page">
                    <span class="page-link">
                        {{i}} <span class="sr-only">(current)</span>
                    </span>
                </li>     
            </div>
        </ul>

        <ul class="nav" >        
            
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Views</a>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Views</a>
                    <!--<a class="dropdown-item" href="#">Nieuw - oud</a>
                    <a class="dropdown-item" href="#">Oud - nieuw</a>                    
                    <a class="dropdown-item" href="#">Score</a>-->   
                </div>
            </li>

            <li style='display:none;' class="nav-item">
                <a class="nav-link" data-target="#exampleModalCenter" data-toggle="modal" href="#">Filters</a>
            </li>

        </ul>     

        </nav>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    computed:{       

        ...mapState({
            paginate : state => state.paginate,
            currentPage : state => state.paginate.CURRENT_PAGE
        })
    },
    methods:{
        changePage(pageNr){
            this.$store.dispatch('paginate/changePageNr', pageNr); 
        },
        toonPaginationNumber(index, currentPage){  
            if((currentPage+3) < index){
                return false;
            }
            else if((currentPage-3) > index){
                return false;
            }
            return true;
        }
    },
    watch:{
        currentPage(){
            this.$store.dispatch('route/load');   
        }
    },
    created(){
        this.$store.dispatch('paginate/getPages');   
    }
}

</script>

<style scoped>

</style>