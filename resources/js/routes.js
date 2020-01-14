import home     from    './components/pages/home.vue';
import view   from    './components/pages/view.vue';
import manage     from    './components/pages/manage.vue';
    import my    from    './components/pages/manage/my.vue';
    import create  from    './components/pages/manage/create.vue';
    import edit    from    './components/pages/manage/edit.vue';    
import account          from    './components/pages/account.vue';


export const routes = [
    { path: '',             component: home,    name: 'home' },
    { path: '/view/:id',  component: view,  name:'view' },
    { path: '/manage',        component: manage,     children: 
    [
        {path:'',                 component:my,      name: 'my'},
        {path:'/create',          component:create,    name: 'create'},
        {path:'/edit/:naam',      component:edit,      name: 'edit'},        
    ]
 },
    { path: '/account',     component: account, name: 'account' },
   
];