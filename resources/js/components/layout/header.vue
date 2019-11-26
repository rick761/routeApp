<template>

    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">

            <!--<a class="navbar-brand" href="#">Navbar</a>-->

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">

                    <router-link active-class="active" class="nav-item " tag="li" to="/">
                        <a class="navbar-brand m-3 p-1" >VakantieRouteApp </a>
                    </router-link>

                    <router-link active-class="active" v-if="isLoggedIn" class="nav-item" tag="li" to="/Mijn">
                        <a class="nav-link m-3" > Mijn routes</a>
                    </router-link>
                    
                     
                    
                </ul>

               <ul class="nav navbar-nav navbar-right">   
                                    
                    <li class="nav-item" v-if="!isLoggedIn">
                        <a class="nav-link  m-3" @click="LoginPopup">Login API</a> 
                    </li>  

                    <router-link class="nav-item" v-if="isLoggedIn" tag="li" to="/Profiel">
                        <a class="nav-link  m-3 pl-2" >
                            <img :src='getAuthUser.avatar' class="rounded-circle mr-2"  width="30" height="30" alt="">
                            Account
                        </a>
                    </router-link>               

                    <li class="nav-item">
                        <a class="nav-link m-3" @click="logOut" v-if="isLoggedIn" >
                            Log out
                        </a>
                    </li>

                </ul>
            </div>
        </nav>

       
        
        
            
        
       
      
    </div>
    

</template>


<script>

    import {mapGetters,mapActions, mapState} from 'vuex';  
    
    export default {         
    computed:{        
        ...mapGetters(['isLoggedIn','getAuthUser'])
    },
    methods:{
        ...mapActions(['LoginPopup','logOut']),        
    }
}
</script>


<style scoped>
    li{
        cursor:pointer;
    }   
</style>