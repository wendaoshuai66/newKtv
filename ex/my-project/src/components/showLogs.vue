<template>
    <div>
        <div class="show">
            <h2>小明</h2>
            <div class="con">内容</div>
            <span>已发送</span>
        </div>
        <div class="show">
            <h2>小明</h2>
            <div class="con">内容</div>
            <span>已发送</span>
        </div>
        <div class="show">
            <h2>小明</h2>
            <div class="con">内容</div>
            <span>已发送</span>
        </div>
        <div class="show">
            <h2>小明</h2>
            <div class="con">内容</div>
            <span>已发送</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'showLogs',
    data(){
      return{

      }
    },
    mounted(){

    },
    methods:{

    }
}
</script>

<style scoped>
    .show{
        width:350px;
        height:200px;
        color:#bbb;
    }
    .show>.con{
        font-size:24px;
    }
    .show>span{
         font-size:20px;
        color:#bbb;
    }

</style>
