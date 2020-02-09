<template>
   <div>               
        <app-loader v-show="!hasRouteLoaded" ></app-loader> 

        <div class='row'>                
           <transition name="fade"  mode="out-in">  
            
            <div  v-if="subPagePosition == 0" key="stap0" class="col-12 stapBlock"> 

                <div class="form-group">
                    <label for="Naam">Naam van de route?</label>
                    <input type="text" class="form-control" id="Naam" placeholder="Naam van de Route"  v-model="edit.naam" >                
                </div> 

                <div class="row">
                    <div class="form-group col-6" >

                        <label for="exampleFormControlSelect1">In welk land?</label>
                        <select v-model="edit.land" class="form-control" id="exampleFormControlSelect1">
                        <option v-for="(land,i) in details.landen" :key="i">
                            {{land}}
                        </option>                    
                        </select>
                    </div> 

                    <div class="form-group col-6" >
                        <label for="exampleFormControlSelect1">Met welk vervoer?</label>
                        <select v-model="edit.vervoer" class="form-control" id="exampleFormControlSelect1">
                        <option v-for="(vervoer,i) in details.vervoer" :key="i">
                            {{vervoer}}
                        </option>                    
                        </select>
                    </div>                     
                </div>   
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Informatie</label>
                    <textarea v-model="edit.informatie" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>     
                <button type="button" @click="nextSubPage" class="btn btn-success">Verder</button>
            </div>
                     
            <div class="stapBlock" :class="'col-'+mapsize[0]" v-if="subPagePosition == 1" key="stap1">                     
                <ul class="list-group">

                    <li v-for="(onderdeel,index) in edit.patroon" :key="index" class="list-group-item">
                        <button class="btn btn-sm btn-inverse btn-danger m-1" @click="delRouteItem(index)" style="float:right">x</button>
                        <label class='pt-2' :for="'naam'+index">
                            Punt {{index+1}} : {{ onderdeel.coordinaten[0].toFixed(2)}} , {{ onderdeel.coordinaten[1].toFixed(2)}}
                        </label>
                        <input  v-model="onderdeel.naam" type="text" class="form-control" :id="'naam'+index" aria-describedby="naam2" placeholder="Vul naam in.">
                    </li>                     

                </ul> 
                <button :class="'btn btn-success mt-3'" @click="previousSubPage">Terug</button> 
                <button :disabled="this.mapClickEnabled" :class="'btn btn-'+[this.mapClickEnabled ? 'inverse' : 'primary' ]+' mt-3'" @click="puntToevoegenButton">                        
                    {{this.mapClickEnabled ? 'klik op map':'Punt toevoegen'}}                    
                </button>     
                <button :class="'btn btn-success mt-3'" @click="nextSubPage">Verder</button>       
            </div>
                   
            <div class="stapBlock" :class="'col-'+mapsize[0]" v-if="subPagePosition == 2" key="stap2">    
                <ul class="list-group">

                    <li v-for="(onderdeel,index) in edit.patroon" :key="index" class="list-group-item">                        
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">{{index}} : {{onderdeel.naam}}</label>
                            <textarea v-model="onderdeel.commentaar" class="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
                        </div> 
                    </li> 

                </ul>                   
                <button :class="'btn btn-success mt-3'" @click="previousSubPage">Terug</button> 
                <button :class="'btn btn-primary mt-3'" @click="SaveRoute(this.$route.params.naam)">Klaar</button> 
            </div>
        </transition>

          
            <transition name="fade-map"  mode="out-in"> 
                <div :class="'col-'+mapsize[1]" v-if="subPagePosition != 0">
                    <div class='sticky-top' >                        
                        <div class='block' style='height:50px;'></div>
                        
                        <leafletMap v-model="clickOnMap" :view="getMapBoundaries" >                            
                            <leafletMapMarkers :markers="edit.patroon" >                                
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
import appLoader from '../../components/mechanism/loader'
import leafletMap from '../../components/map/leafletMap'
import leafletMapMarkers from '../../components/map/parts/markers'
import leafletMapLines from '../../components/map/parts/lines'


export default {
    components:{     
        appMapSizer,
        appLoader,
        leafletMap,
        leafletMapMarkers,
        leafletMapLines,        
    },

    data(){ return{    
        subPagePosition:0,
        mapClickEnabled:false,        
        mapsize:[6,6],        
        clickOnMap:'',           
    }},

    watch :{
        clickOnMap: function(coordinaten){
            if(this.mapClickEnabled){
                this.$store.dispatch('route/edit/newCoordinates', coordinaten ) 
            }
            this.mapClickEnabled = false;        
        }
    },

    methods:{  

        setSubPagePosition(i){       
            this.subPagePosition = i   
        },        

        puntToevoegenButton(){
            this.mapClickEnabled = !this.mapClickEnabled;            
        },        

        nextSubPage(){
            var route = this.$store.state.route.edit;            
            switch(this.subPagePosition){
                case 0:
                    if( this.lengthSmallerThen(route.naam, 7) ){
                        this.dispatch('alert/danger', 'De naam is kleiner dan 7 tekens.' );
                        return;
                    } 
                    if(  this.emptyString(route.land)  ){
                        this.dispatch('alert/danger','Geen land gekozen');
                        return;
                    }
                    if( this.emptyString(route.vervoer) ){
                        this.dispatch('alert/danger','Geen vervoer gekozen.');

                        return;
                    }
                    break;                    
                case 1:                        
                    for (let index in route.patroon) {
                        if( this.emptyString(route.patroon[index].naam)){
                            this.dispatch('alert/danger','Een naam is niet ingevuld.');
                            
                            return;
                        }                        
                    }
                    if( this.lengthSmallerThen(route.patroon, 2)  ){
                        this.dispatch('alert/danger','Er is geen route');
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
            this.$store.dispatch('route/edit/removeCoordinate',index);
            this.$store.dispatch('alert/success','Een punt is verwijderd.')
        },          

        ...mapActions({
            SaveRoute: 'route/edit/save'
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
        //end operating functions
    },



    computed:{   
        ...mapState({
            edit : state => state.route.edit,
            details : state => state.route.details
        }),

        ...mapGetters({            
            hasRouteLoaded: 'route/edit/IS_ROUTE_LOADED',
            getMapLines: 'route/edit/mapLines/GET_MAP_LINES',
            getMapBoundaries: 'route/edit/mapBoundaries/GET_MAP_BOUNDARIES',
        }),                             
    },

    created(){           
        this.$store.dispatch('route/edit/load', this.$route.params.naam );          
    },   
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