<template>
   <div>
      
       <div class='row'>   
               
           <transition name="fade"  mode="out-in"> 

               
            

            <!-- STAP 0 : LAND NAAM EN VERVOER-->
            <div v-if="stap == 0" key="stap0" class="col-12 stapBlock">
                    
                    <div class="form-group">
                        <label for="Naamm">Naam van de nieuwe route?</label>
                        <input type="text" class="form-control" id="Naamm"  placeholder="Naam van de Route"  v-model="newRoute.naam" >                
                    </div> 
                    <div class="row">
                        <div class="form-group col-6" >
                            <label for="exampleFormControlSelect1">In welk land?</label>
                            <select v-model="newRoute.land" class="form-control" id="exampleFormControlSelect1">
                            <option v-for="(land,i) in routeDetails.landen" :key="i">
                                {{land}}
                            </option>                    
                            </select>
                        </div> 
                        <div class="form-group col-6" >
                            <label for="exampleFormControlSelect1">Met welk vervoer?</label>
                            <select v-model="newRoute.vervoer" class="form-control" id="exampleFormControlSelect1">
                            <option v-for="(vervoer,i) in routeDetails.vervoer" :key="i">
                                {{vervoer}}
                            </option>                    
                            </select>
                        </div>                     
                    </div>   
                    <div class="form-group">
                            <label for="exampleFormControlTextarea1">Informatie</label>
                            <textarea v-model="newRoute.informatie" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>       
                    <button type="button" @click="nextStep(2)" class="btn btn-success">Verder</button>
                </div>





                <!-- STAP 1 : MAP COORDINATEN -->       
                <div  class="stapBlock" :class="'col-'+mapsize[0]" v-else-if="stap == 1" key="stap1"> 
                                                            
                   <ul class="list-group">
                            <li v-for="(onderdeel,index) in newRoute.patroon" :key="index" class="list-group-item">

                            <button class="btn btn-sm btn-inverse btn-danger m-1" @click="delPatroonItem(index)" style="float:right">x</button>
                            <label class='pt-2' for="naam2">
                                Punt {{index+1}} : 
                                {{ onderdeel.coordinaten[0].toFixed(2)}}
                                ,
                                {{ onderdeel.coordinaten[1].toFixed(2)}}
                            </label>
                            <input  v-model="onderdeel.naam" type="text" class="form-control" id="naam2" aria-describedby="naam2" placeholder="Vul naam in.">
                            
                        </li>                            
                    </ul> 
                    <button :class="'btn btn-success mt-3'" @click="prevStep">Terug</button> 
                    <button :disabled="newRoute.mapClick" :class="'btn btn-'+[newRoute.mapClick ? 'inverse' : 'primary' ]+' mt-3'" @click="puntToevoegenButton">{{newRoute.mapClick ? 'klik op map':'Punt toevoegen'}}</button>     
                    <button :class="'btn btn-success mt-3'" @click="nextStep">Verder</button>  
                </div>




                        

                <!-- STAP 2 : Commentaar per stap-->     
                <div class="stapBlock" :class="'col-'+mapsize[0]" v-else key="stap2">                     
                                        
                    <ul class="list-group">
                        <li v-for="(onderdeel,index) in newRoute.patroon" :key="index" class="list-group-item">
                        
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">{{index}} : {{onderdeel.naam}}</label>
                                <textarea v-model="onderdeel.commentaar" class="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
                            </div> 
                        </li> 
                    </ul>                   
                    <button :class="'btn btn-success mt-3'" @click="prevStep">Terug</button> 
                    <button :class="'btn btn-primary mt-3'" @click="CreateRoute">Klaar</button> 
                </div>
           </transition>



           
            <transition name="fade-map"  mode="out-in"> 
                <div :class="'col-'+mapsize[1]" v-if="stap != 0">
                    <div class='sticky-top' >
                        <!--filler-->
                        <div class='block' style='height:50px;'></div>

                    <new-route-map></new-route-map>
                    <app-map-sizer v-model='mapsize'></app-map-sizer>
                    </div>
                </div>   

            </transition>             
                         
        </div>             
    </div> 
</template>


<script>
import { mapGetters, mapState } from 'vuex'
import newRouteMap from '../../map/newRouteMap'
import appMapSizer from '../../layout/mapSizer'

export default {
    components:{
        newRouteMap,
        appMapSizer
    },
    data(){return{        
        punt_toevoegen_button: false,     
        mapsize:[6,6]
    }},
    methods:{
        CreateRoute(){
            this.$store.dispatch('newRoute/Create');
        },
        puntToevoegenButton(){
            this.$store.commit('newRoute/mapClickButton');
        },
        stapEdit(i){
            this.$store.commit('newRoute/stapEdit',i);    
        },
        nextStep(){
            switch(this.stap){
                case 0:
                    if(this.$store.state.newRoute.naam.length < 7){
                        this.$store.dispatch('displayMsg',{text:'De naam is kleiner dan 7 tekens.',type:'danger'})
                        return;
                    }
                    if(this.$store.state.newRoute.land == ''){
                        this.$store.dispatch('displayMsg',{text:'Geen land gekozen',type:'danger'})
                        return;
                    }
                    if(this.$store.state.newRoute.vervoer == ''){
                        this.$store.dispatch('displayMsg',{text:'Geen vervoer gekozen.',type:'danger'})
                        return;
                    }
                    break;

                case 1:                        
                    for (let index = 0; index < this.$store.state.newRoute.patroon.length; index++) {
                        if(this.$store.state.newRoute.patroon[index].naam == ""){
                            this.$store.dispatch('displayMsg',{text:'Een naam is niet ingevuld.',type:'danger'})
                            return;
                        }                        
                    }
                    if(this.$store.state.newRoute.patroon.length < 2){
                        this.$store.dispatch('displayMsg',{text:'Er is geen route',type:'danger'})
                        return;
                    }
                    break;
            }
            this.stapEdit(this.stap+1);
        },

        prevStep(){
            this.stapEdit(this.stap-1);            
        },              
       
        delPatroonItem(index){
            this.$store.commit('newRoute/DelPatroon',index);
            this.$store.dispatch('displayMsg',{text:'Een punt is verwijderd.',type:'success'})
        }
    },

    computed:{    
        stap(){ return this.$store.state.newRoute.stap },     

        ...mapGetters('newRoute',[            
            'getGegevens',           
        ]),        
        ...mapState([
            'newRoute',
            'routeDetails'
        ]),
        
    }


}
</script>
<style  scoped>
  .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .fade-map-enter-active  {
        transition: opacity 3s;
    }
    .fade-map-leave-active{
        transition: opacity .5s;
    }
    .fade-map-enter, .fade-map-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .stapBlock{
        margin-top:50px;
        margin-bottom:40%;
    }
</style>