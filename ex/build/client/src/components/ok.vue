<template>
    <div>
        <i @click="$router.go(-1)"></i>
        <b @click="$router.push({name:'index'})"></b>
    </div>
</template>

<script>
  export default {
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    div{
        width: 100%;
        height:100%;
        background: url("../assets/img/ok.png") no-repeat center;
        background-size: cover;
        i{
            width: .4rem;
            height: .4rem;
            position: absolute;
            top:6.5%;
            left:3%;
        }
        b{
            width: 100%;
            height: 8%;
            position: absolute;
            bottom:15%;
            left:0;
        }
    }
</style>
