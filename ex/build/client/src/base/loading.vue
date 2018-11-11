<template>
    <div class="loading">
        <img width="120" height="120" src="../assets/img/timg.gif" alt="">
        <p class="desc">{{title}}</p>
    </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '正在加载中...'
      }
    }
  }
</script>
<style lang="scss" scoped>
    .loading {
        width: 100%;
        text-align: center;
        .desc {
            line-height: 32px;
            font-size: 0.32rem;
            color: #c6c6c6;
        }

    }


</style>
