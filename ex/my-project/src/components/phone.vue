<template>
<div>
    <header>
        <a @click="back">
            <i class="iconfont icon-back"></i>
        </a>
        <h1>联系方式</h1>
        <a></a>
    </header>
    <ul>
        <li v-for="item in datas">
            <a :href="'tel:'+item.phone">{{item.uname}}</a>
        </li>
    </ul>
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
export default {
    name: 'phone',
    data(){
        return{
            datas:[]
        }
    },
    mounted(){
        fetch("/api/phoneSelect").then(function(e){
            return e.json();
        }).then((e)=>{
            this.datas=e;
        })
    },
    methods:{
        back(){
            this.$router.back();
        }
    }
}
</script>

<style scoped>
    header{
        width:100%;
        height:auto;
        background: #fff;
        padding:0 0.05rem;
        text-align: center;
        line-height: 0.88rem;
        display:flex;
        justify-content: space-between;
        position:fixed;
        top:0;
        left:0;
    }
    header>a{
        display:flex;
        align-items: center;
    }
    header>a>i{
        font-size:0.36rem;
    }
    header>h1{
        font-size:0.36rem;
    }
    ul{
        width:100%;
        height:0.5rem;
    }
    ul>li{
        width:100%;
        height:100%;
        font-size:0.36rem;
        line-height:0.5rem;
        text-align: center;
        border-bottom: 0.01rem solid #fff;
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
