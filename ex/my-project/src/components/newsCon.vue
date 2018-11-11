<template>
<div>
    <header>
        <a @click="back"><</a>
        <h1>详情</h1>
        <a></a>
    </header>
    <div class="content">
        <h3>{{title}}</h3>
        <p>{{con}}</p>
    </div>
</div>
</template>

<script>
export default {
    name: 'newsCon',
    data(){
        return{
            title:"",
            con:""
        }
    },
    mounted(){
        fetch("/api/conSelect?nid="+this.$route.params.id).then(function(e){
            return e.json();
        }).then((e)=>{
            this.title=e.title;
            this.con=e.con;
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
        background: #ccc;
        text-align: center;
        line-height: 0.88rem;
        display:flex;
        justify-content: space-between;
        position:fixed;
        top:0;
        left:0;
    }
    header>a{
        font-size:20px;
        margin-left:5px;
    }
    h1{
        font-size:20px;
        color: #000;
    }
    .content{
        width:100%;
        height:auto;
        padding:10px;
    }
    .content>h3{
        text-align: center;
        font-size:24px;
    }
    .content>p{
        font-size:16px;
    }
</style>
