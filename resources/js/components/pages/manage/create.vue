<template>
   <div>
      
       <div class='row'>   
               
           <transition name="fade"  mode="out-in"> 

               
            

            <!-- STAP 0 : LAND NAAM EN VERVOER-->
            <div v-if="stap == 0" key="stap0" class="col-12 stapBlock">
                    
                    <div class="form-group">
                        <label for="Naamm">Naam van de nieuwe route?</label>
                        <input type="text" class="form-control" id="Naamm"  placeholder="Naam van de Route"  v-model="create.naam" >                
                    </div> 
                    <div class="row">
                        <div class="form-group col-6" >
                            <label for="exampleFormControlSelect1">In welk land?</label>
                            <select v-model="create.land" class="form-control" id="exampleFormControlSelect1">
                            <option v-for="(land,i) in details.landen" :key="i">
                                {{land}}
                            </option>                    
                            </select>  
                        </div> 
                        <div class="form-group col-6" >
                            <label for="exampleFormControlSelect1">Met welk vervoer?</label>
                            <select v-model="create.vervoer" class="form-control" id="exampleFormControlSelect1">
                            <option v-for="(vervoer,i) in details.vervoer" :key="i">
                                {{vervoer}}
                            </option>                    
                            </select>
                        </div>                     
                    </div>   
                    <div class="form-group">
                            <label for="exampleFormControlTextarea1">Informatie</label>
                            <textarea v-model="create.informatie" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>       
                    <button type="button" @click="nextStep(2)" class="btn btn-success">Verder</button>
                </div>





                <!-- STAP 1 : MAP COORDINATEN -->       
                <div  class="stapBlock" :class="'col-'+mapsize[0]" v-else-if="stap == 1" key="stap1"> 
                                                            
                   <ul class="list-group">
                            <li v-for="(onderdeel,index) in create.patroon" :key="index" class="list-group-item">

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
                    <button :disabled="create.mapClick" :class="'btn btn-'+[create.mapClick ? 'inverse' : 'primary' ]+' mt-3'" @click="puntToevoegenButton">{{create.mapClick ? 'klik op map':'Punt toevoegen'}}</button>     
                    <button :class="'btn btn-success mt-3'" @click="nextStep">Verder</button>  
                </div>




                        

                <!-- STAP 2 : Commentaar per stap-->     
                <div class="stapBlock" :class="'col-'+mapsize[0]" v-else key="stap2">                     
                                        
                    <ul class="list-group">
                        <li v-for="(onderdeel,index) in create.patroon" :key="index" class="list-group-item">
                        
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

                    <!--leafletMap-->
                    <leafletMap v-model="clickOnMap" >                            
                        <leafletMapMarkers :markers="create.patroon" >                                
                        </leafletMapMarkers>
                        <leafletMapLines :lines="getPatroonLine" />
                    </leafletMap> 

                    <app-map-sizer v-model='mapsize'></app-map-sizer>
                    </div>
                </div>   

            </transition>             
                         
        </div>             
    </div> 
</template>


<script>
import { mapGetters, mapState } from 'vuex'
import appMapSizer from '../../layout/mapSizer'

import leafletMap from '../../map/leafletMap'
import leafletMapMarkers from '../../map/parts/markers'
import leafletMapLines from '../../map/parts/lines'

export default {
    components:{      
        appMapSizer,

                //map
        leafletMap,
        leafletMapMarkers,
        leafletMapLines,  
    },
    
    data(){return{        
        punt_toevoegen_button: false,     
        mapsize:[6,6],
        clickOnMap:''
    }},

    watch :{
        clickOnMap: function(coordinaten){
            this.$store.commit('route/create/AddPatroon', coordinaten ) 
        }
    },

    methods:{
        CreateRoute(){
            this.$store.dispatch('route/create/Create');
        },
        puntToevoegenButton(){
            this.$store.commit('route/create/mapClickButton');
        },
        stapEdit(i){
            this.$store.commit('route/create/stapEdit',i);    
        },
        nextStep(){
            switch(this.stap){
                case 0:
                    if(this.$store.state.route.create.naam.length < 7){
                        this.$store.dispatch('displayMsg',{text:'De naam is kleiner dan 7 tekens.',type:'danger'})
                        return;
                    }
                    if(this.$store.state.route.create.land == ''){
                        this.$store.dispatch('displayMsg',{text:'Geen land gekozen',type:'danger'})
                        return;
                    }
                    if(this.$store.state.route.create.vervoer == ''){
                        this.$store.dispatch('displayMsg',{text:'Geen vervoer gekozen.',type:'danger'})
                        return;
                    }
                    break;

                case 1:                        
                    for (let index = 0; index < this.$store.state.route.create.patroon.length; index++) {
                        if(this.$store.state.route.create.patroon[index].naam == ""){
                            this.$store.dispatch('displayMsg',{text:'Een naam is niet ingevuld.',type:'danger'})
                            return;
                        }                        
                    }
                    if(this.$store.state.route.create.patroon.length < 2){
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
            this.$store.commit('route/create/DelPatroon',index);
            this.$store.dispatch('displayMsg',{text:'Een punt is verwijderd.',type:'success'})
        }
    },

    computed:{    
        stap(){
             return this.$store.state.route.create.stap
        },     

        ...mapGetters('route/create',[            
            'getGegevens', 'getPatroonLine','getBounds'          
        ]),        
        

        ...mapState({
            create : state => state.route.create,
            details : state => state.route.details
        }),
        
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