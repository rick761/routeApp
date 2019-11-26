import Home     from    './components/pages/Home.vue';
import Bekijk from './components/pages/Bekijk.vue';
import Mijn     from    './components/pages/Mijn.vue';
    import MijnRoute  from    './components/pages/mijn/MijnRoute.vue';
    import NieuweRoute  from    './components/pages/mijn/NieuweRoute.vue';
    import EditRoute from './components/pages/mijn/EditRoute.vue';    
import Account  from    './components/pages/Account.vue';


export const routes = [
    { path: '',         component: Home,    name: 'Home' },
    { path: '/bekijk/:id', component: Bekijk, name:'Bekijk' },
    { path: '/Mijn',    component: Mijn,     children: [
        {path:'',           component:MijnRoute,    name: 'MijnRoute'},
        {path:'/Nieuwe',    component:NieuweRoute,  name: 'NieuweRoute'},
        {path:'/Edit/:naam',      component:EditRoute,  name: 'EditRoute'},        
    ] },
    { path: '/Profiel', component: Account, name: 'Profiel' },
   
];