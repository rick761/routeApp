import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import home     from    '../views/home.vue';
import view   from    '../views/view.vue';
import manage     from    '../views/manage.vue';
    import my    from    '../views/personal/my.vue';
    import create  from    '../views/personal/create.vue';
    import edit    from    '../views/personal/edit.vue';    
import account          from    '../views/account.vue';

Vue.use(VueRouter)

const routes = [
    { path: '',             component: home,    name: 'home' },
    { path: '/view/:id',  component: view,  name:'view' },
    { path: '/manage',        component: manage,     children: 
    [
        {path:'',                 component:my,      name: 'my'},
        {path:'/create',          component:create,    name: 'create'},
        {path:'/edit/:naam',      component:edit,      name: 'edit'},        
    ]
 },
    { path: '/account',     component: account, name: 'account' }   
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
