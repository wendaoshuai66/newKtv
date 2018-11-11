<template>
<div class="box">
    <header>
        <img src="../assets/img/t1.jpg" alt="">
        <h1>首页</h1>
        <a></a>
    </header>
    <slider>
    <div class="slider-list" style="background: red">1</div>
    <div class="slider-list" style="background: pink">2</div>
    <div class="slider-list" style="background: green">3</div>
    <div class="slider-list" style="background: yellow">4</div>
</slider>
    <pullDown :fn="fn" :autoload="true">
        <ul>
            <li v-for="item in datas">
                <router-link :to="'/con/'+item.nid" style="color:#000">{{item.title}}</router-link>
            </li>
        </ul>
    </pullDown>
    <footer>
        <router-link to="/">
            <i class="iconfont icon-home"></i>
        </router-link>
        <router-link to="/phone">
            <i class="iconfont icon-phone_light"></i>
        </router-link>
        <router-link to="/logs">
            <i class="iconfont icon-comment"></i>
        </router-link>
        <router-link to="/setting">
            <i class="iconfont icon-settings"></i>
        </router-link>
    </footer>
</div>
</template>

<script>
    import slider from '@/components/slider.vue';
    import pullDown from '@/components/pullDown.vue'
export default {
    name: 'Index',
    components:{slider,pullDown},
    data(){
        return{
            datas:[],
            page:this.$store.state.page,
            autoload:true,
        }
    },
//    mounted(){
//        fetch("/api/newSelect?page="+this.page+"&num=10").then(function(e){
//            return e.json();
//        }).then((e)=>{
//            this.datas=e;
//        })
//    },
    destroyed(){
        this.$store.commit("setPullDown",false);
    },
    methods:{
        fn(obj){
            console.log(1)

//                fetch("/api/newSelect?page="+this.page+"&num=10").then(function(e){
//                    return e.json();
//                }).then((e)=>{
//                    setTimeout(function(){
//                      this.$store.commit("setPage",this.page++);
//                        this.page++;
//                        this.datas=e.concat(this.datas);
//                        this.$store.commit("setMessage",this.datas);
//                        obj.over();
//                    },2000)
//                })
            fetch("/api/newSelect?page="+this.page+"&num=10").then(function(e){
                return e.json();
            }).then((e)=>{
                this.datas=e;
                this.page++;
                obj.over();
            })

        }
    }
}
</script>

<style scoped>
    .box{
        width:100%;
        height:100%;
    }
    header{
        width:100%;
        height:0.88rem;
        background: #fff;
        line-height: 0.88rem;
        display:flex;
        justify-content: space-between;
        align-items: center;
        position:fixed;
        top:0;
        left:0;
    }
    img{
        display:block;
        width:0.6rem;
        height:0.6rem;
        border-radius: 50%;
    }
    h1{
        font-size:0.36rem;
        color: #000;
        text-align: center;
    }
    ul{
        width:100%;
        height:100%;
    }
    ul>li{
        width:100%;
        height:0.88rem;
        font-size:0.3rem;
        line-height:0.88rem;
        border-bottom: 0.01rem solid #bbb;
        overflow:hidden;
    }
    footer{
        width:100%;
        height:0.88rem;
        background:#fff;
        display:flex;
        justify-content: space-around;
        position:fixed;
        left:0;
        bottom:0;
        z-index:99;
    }
    footer>a{
        display:flex;
        align-items: center;
    }
    i{
        font-size:0.5rem;
        color:#000;
    }
</style>
