<template>
  <div class="back">
      <img src="../assets/img/2.png" alt="">
    <ul>
        <li @click="$router.push({name:'music'})"></li>
        <li @click="$router.push({name:'game'})"></li>
        <li @click="$router.push({name:'shop'})"></li>
        <li @click="$router.push({name:'home'})"></li>
    </ul>
  </div>
</template>
<script>
export default {}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .back{
        width: 100%;
        height:100%;
        animation: back 3s ease infinite;
    }
    @keyframes back {
        0%{
            background: url("../assets/img/1.png") no-repeat center;
            background-size: cover;
        }
        50%{
            background: url("../assets/img/7.png") no-repeat center;
            background-size: cover;
        }
        100%{
            background: url("../assets/img/1.png") no-repeat center;
            background-size: cover;
        }
    }
    img{
        display: block;
        position: absolute;
        top:35%;
        left: 0;
        width: 100%;
        height: 27%;
    }
    ul{
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
        align-content: space-between;
        flex-wrap: wrap;
        width: 100%;
        height:46%;
        padding: 5%;
        box-sizing: border-box;
    }
    li{
        width: 47.5%;
        height: 47.5%;
        border-radius: 5%;
    }
    li:nth-of-type(1){
        background: url("../assets/img/3.png") no-repeat center;
        background-size: cover;
    }
    li:nth-of-type(2){
        background: url("../assets/img/4.png") no-repeat center;
        background-size: cover;
    }
    li:nth-of-type(3){
        background: url("../assets/img/5.png") no-repeat center;
        background-size: cover;
    }
    li:nth-of-type(4){
        background: url("../assets/img/6.png") no-repeat center;
        background-size: cover;
    }
</style>
