<template>
<div class="head">
    <div class="back" @click="$router.go(-1)"><img src="../assets/img/icon_03.png"></div>
    <span>· 点歌中心 ·</span>
    <div class="home" @click="$router.push({name:'index'})"><img src="../assets/img/recommend01.png"></div>
</div>
</template>
<script>
  export default {

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.head{
    box-sizing: border-box;
    width: 100%;
    height:80px;
    padding: 20px 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .back,.home{
        width: 60px;
        height: 60px;
        img{
            margin: auto;
            display: block;
            width: 40px;
            height:40px;
            padding-top: 10px;
        }
    }
    span{
        font-size: 0.32rem;
        display: block;
    }
}
</style>
