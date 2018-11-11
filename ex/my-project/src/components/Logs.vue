<template>
<div class="logs" style="position:absolute;left:0;top:0;width:100%;">
    <header>
        <router-link to="" @click="back">
            <i class="iconfont icon-back"></i>
        </router-link>
        <h1>日志</h1>
        <router-link to="/write">
            <i class="iconfont icon-edit"></i>
        </router-link>
    </header>
    <div class="content" style="width:100%;height:200px;margin-top: 50px;">
        <router-view></router-view>
    </div>
    <footer style="position:fixed;left:0;bottom:0">
        <div>已发送</div>
        <div>已接收</div>
    </footer>
</div>
</template>

<script>
export default {
    name: 'logs',
    data(){
      return{

      }
    },
    mounted(){

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
</style>
