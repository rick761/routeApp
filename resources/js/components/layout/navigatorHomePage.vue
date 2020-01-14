<template>
    <div>
        <!--popup-->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">Click op filters om te toe te voegen</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="min-height:500px">
                    <h3>actieve filters:</h3>
                    <p>
                        <button v-for="i in 10" :key="i" class="btn btn-success m-2">AutoRit</button>
                    </p>
                    <h3>in-actieve filters:</h3>
                    <p>
                        <button v-for="i in 55" :key="i" class="btn btn-secondary m-2">BusRit</button>
                    </p>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
            </div>

        <!--navigator-->    
        <nav class="navbar navbar-light bg-light">
        
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



        <ul class="pagination pagination-sm mb-0">
            <div v-for="(i) in totalPages"  :key='i' >
                <li v-show="toonPaginationNumber(i,currentPage)"  v-if="currentPage != i" class="page-item" >
                        <a @click="changePage(i)" class="page-link" href="#">{{i}}</a>
                </li>  
                <li v-else class="page-item active" aria-current="page">
                    <span class="page-link">
                        {{i}} <span class="sr-only">(current)</span>
                    </span>
                </li>     
            </div>
        </ul>


        </nav>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    computed:{
        ...mapState('filterAndNav',['totalPages','currentPage'])
    },
    methods:{
        changePage(pageNr){
            this.$store.dispatch('filterAndNav/changePageNr', pageNr); 
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
        currentPage(to,from){
            this.$store.dispatch('filterAndNav/changePage');   
        }
    },
    created(){
        this.$store.dispatch('filterAndNav/getPages');   
    }
}

</script>

<style scoped>

</style>