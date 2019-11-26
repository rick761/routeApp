<template>
    <div>
        
        <ul class="nav"> 
            <router-link class="nav-item" tag="li" :to="{ name: 'MijnRoute'}" activeClass='active'>
                <a  class="nav-link">
                    Huidige routes
                </a>
            </router-link>              
            <router-link class="nav-item" tag="li" :to="{ name: 'NieuweRoute'}" activeClass='active'>
                <a  class="nav-link">   
                    Nieuwe route
                </a>
            </router-link>
         </ul>  
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        
    }     
</script>

<style scoped>
    .nav{
        margin-bottom: 15px;
    }
</style>