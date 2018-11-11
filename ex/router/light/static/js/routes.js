const routes = [
    { path: '/', component: Foo },
    { path: '/add', component: Add },
    { path: '/updata/:id', component: Updata },
    { path: '/login', component: Login },
    { path: '/regs', component: regs },
]
const router = new VueRouter({
    routes
})
router.beforeEach((to,from,next)=>{
    if(to.path=='/login'||to.path=='/regs'){
      next();
    }else{
        if(sessionStorage.login){
            next();
        }else{
            router.push("/login");
            next();
        }
    }
})