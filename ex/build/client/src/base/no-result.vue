<template>
<div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{title}}</p>
</div>
</template>

<script>
  export default {
    props:{
      title:{
        type:String,
        default:''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.no-result{
    .no-result-icon{
        width:285px;
        height:240px;
        margin: auto;
        background: url("../assets/img/noresult.png") no-repeat center/cover;
    }
    .no-result-text{
        margin-top: 0.5rem;
        font-size: 0.3rem;
        color: #ff318d;
    }
}
</style>
