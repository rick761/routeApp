<template>
    <div class='content'>
         

        <!--Delete popup-->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Verwijderen</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">                
                <p>"{{ClickDelete_name}}"</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Behouden</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="delItem(ClickDelete_name)">Verwijder</button>
            </div>
            </div>
        </div>
        </div>
        <!--end Delete popup-->

        <table class="table">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Naam</th>
                    <th scope="col">Waar</th>
                    <th scope="col">Hoe</th>
                    <th scope="col">Afstand</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="(routeItem, index) in route.myRoutes" :key="index">
                    <th scope="row">
                        <router-link :to="'/edit/'+routeItem.naam">
                        <button class="btn btn-outline-primary">
                            <i class="fas fa-edit"></i>
                        </button>
                         </router-link>
                        
                        <button class="btn btn-outline-danger"
                            @click="clickOnDelete( routeItem.naam )"
                            data-toggle="modal" data-target="#exampleModal">
                            <i class="fas fa-trash"></i>
                        </button>
                        
                    </th>
                    <td>{{routeItem.naam}}</td>
                    <td>{{routeItem.land}}</td>
                    <td>{{routeItem.vervoer}}</td>
                    <td>{{routeItem.afstandKm}} km</td>
                    <td></td> 
                </tr>          
            </tbody>
        </table>
       
        
        
        </div>
</template>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';

export default {    
    data(){return{
        ClickDelete_name:''
    }},
    methods:{
        clickOnDelete(payload){
            console.log(payload)
            this.ClickDelete_name = payload;
        },
        delItem(payload){
            this.$store.dispatch('route/delItem', payload );
        }
    },
    computed:{
        ...mapState(['route'])
    },

    created(){        
        this.$store.dispatch('route/fetchRoutes', 'Mijn' );
    },
    
    
}
</script>
<style  scoped>
.content{
    margin-top: 50px;
    margin-bottom: 40%;
}
</style>