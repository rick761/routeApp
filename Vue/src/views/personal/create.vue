<template>
   <div>
      
       <div class='row'>   
               
           <transition name="fade"  mode="out-in"> 

               
            

            <!-- STAP 0 : LAND NAAM EN VERVOER-->
            <div v-if="subPagePosition == 0" key="stap0" class="col-12 stapBlock">
                    
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
                    <button type="button" @click="nextSubPage(2)" class="btn btn-success">Verder</button>
                </div>





                <!-- STAP 1 : MAP COORDINATEN -->       
                <div  class="stapBlock" :class="'col-'+mapsize[0]" v-else-if="subPagePosition == 1" key="stap1"> 
                                                            
                   <ul class="list-group">
                            <li v-for="(onderdeel,index) in create.patroon" :key="index" class="list-group-item">

                            <button class="btn btn-sm btn-inverse btn-danger m-1" @click="delRouteItem(index)" style="float:right">x</button>
                            <label class='pt-2' for="naam2">
                                Punt {{index+1}} : 
                                {{ onderdeel.coordinaten[0].toFixed(2)}}
                                ,
                                {{ onderdeel.coordinaten[1].toFixed(2)}}
                            </label>
                            <input  v-model="onderdeel.naam" type="text" class="form-control" id="naam2" aria-describedby="naam2" placeholder="Vul naam in.">
                            
                        </li>                            
                    </ul> 
                    <button :class="'btn btn-success mt-3'" @click="previousSubPage">Terug</button> 
                    <button 
                        :disabled="this.mapClickEnabled"
                        :class="'btn btn-'+[this.mapClickEnabled ? 'inverse' : 'primary' ]+' mt-3'"
                        @click="puntToevoegenButton"
                    >                        
                        {{this.mapClickEnabled ? 'klik op map':'Punt toevoegen'}}                    
                    </button>   <button :class="'btn btn-success mt-3'" @click="nextSubPage">Verder</button>  
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
                    <button :class="'btn btn-success mt-3'" @click="previousSubPage">Terug</button> 
                    <button :class="'btn btn-primary mt-3'" @click="CreateRoute(this.$route.params.naam)">Klaar</button> 
                </div>
           </transition>



           
            <transition name="fade-map"  mode="out-in"> 
                <div :class="'col-'+mapsize[1]" v-if="subPagePosition != 0">
                    <div class='sticky-top' >
                        <!--filler-->
                        <div class='block' style='height:50px;'></div>

                    <!--leafletMap-->
                    <leafletMap v-model="clickOnMap" :view="getMapBoundaries" >                            
                        <leafletMapMarkers :markers="create.patroon" >                                
                        </leafletMapMarkers>
                        <leafletMapLines :lines="getMapLines" />
                    </leafletMap> 

                    <app-map-sizer v-model='mapsize'></app-map-sizer>
                    </div>
                </div>   

            </transition>             
                         
        </div>             
    </div> 
</template>


<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import appMapSizer from '../../components/layout/mapSizer'
import leafletMap from '../../components/map/leafletMap'
import leafletMapMarkers from '../../components/map/parts/markers'
import leafletMapLines from '../../components/map/parts/lines'

export default {
    
    components:{      
        appMapSizer,
        leafletMap,
        leafletMapMarkers,
        leafletMapLines,  
    },
    
    data(){return{        
          
        subPagePosition:0,
        mapClickEnabled:false,  
        mapsize:[6,6],
        clickOnMap:''
    }},

    watch :{
        clickOnMap: function(coordinaten){
            if(this.mapClickEnabled){
                this.$store.dispatch('route/create/newCoordinates', coordinaten ) 
            }
            this.mapClickEnabled = false; 
        }
    },

    methods:{
        
        puntToevoegenButton(){
             this.mapClickEnabled = !this.mapClickEnabled;   
        },

        setSubPagePosition(i){            
            this.subPagePosition = i    
        },

        nextSubPage(){
            var route = this.$store.state.route.create;  
            switch(this.subPagePosition){
                case 0:
                    if(lengthSmallerThen(route.naam,7)){
                        this.$store.dispatch('alert/danger','De naam is kleiner dan 7 tekens.')
                        return;
                    }
                    if(this.emptyString(route.land)){
                        this.$store.dispatch('alert/danger','Geen land gekozen')
                        return;
                    }
                    if(this.emptyString(route.vervoer)){
                        this.$store.dispatch('alert/danger','Geen vervoer gekozen.')
                        return;
                    }
                    break;

                case 1:                        
                    for (let index in route.patroon.length) {
                        if(route.patroon[index].naam == ""){                            
                            this.$store.dispatch('alert/danger','Een naam is niet ingevuld.')
                            return;
                        }                        
                    }
                    if(route.patroon.length < 2){                        
                        this.$store.dispatch('alert/danger','Er is geen route')
                        return;
                    }
                    break;
            }
            this.setSubPagePosition( this.subPagePosition+1 );
        },

        previousSubPage(){
            this.setSubPagePosition( this.subPagePosition-1 );            
        },                 
       
        delRouteItem(index){
            this.$store.dispatch('route/create/removeCoordinate',index);
            this.$store.dispatch('alert/success','Een punt is verwijderd.')
        },         

        ...mapActions({
            CreateRoute : 'route/create/save'
        }),

        //operating Functions
        dispatch(route,parameter){
            this.$store.dispatch(route,parameter,{root:true});
        },
        emptyString(string){
            return (string == '');
        },
        lengthSmallerThen(string,number){
            return (string.length < number);            
        }
    },

    computed:{    
           
        ...mapState({
            create : state => state.route.create,
            details : state => state.route.details
        }),
        ...mapGetters({            
            hasRouteLoaded: 'route/create/hasRouteLoaded',
            getMapLines: 'route/create/mapLines/GET_MAP_LINES',
            getMapBoundaries: 'route/create/mapBoundaries/GET_MAP_BOUNDARIES',
        }),  
        
    },
    created(){
        this.$store.dispatch('route/create/new');
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