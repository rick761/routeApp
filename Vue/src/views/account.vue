<template>
    <div v-if="isLoggedIn">
        <h1> Hallo {{getAuthUser.name}}, </h1>

        <div class="row">
            <img  :src="getAuthUser.avatar" alt="" class="col-3 img-thumbnail rounded float-left">

            <ul class="list-group  col-8">
                
                <li class="list-group-item">Lid sinds: {{getAuthUser.created_at}}</li>
                <li class="list-group-item">Email adres: {{getAuthUser.email}}</li>
                
            </ul>
             
        </div>    

    </div>
</template>

<script>
import {  mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['getAuthUser','isLoggedIn'])
    },
};
</script>



<style scoped>
    ul{
        padding: 0 10px;
        }
</style>