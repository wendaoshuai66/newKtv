<template>
   <div class="box">
       <div class="group">
           <label for="olds">旧密码</label>
           <input type="text" id="olds">
       </div>
       <div class="group">
           <label for="new">新密码</label>
           <input type="text" id="new">
       </div>
       <div class="group">
           <label for="assign">确认密码</label>
           <input type="text" id="assign">
       </div>
       <div class="group">
           <input type="button" value="提交" id="btn">
       </div>
   </div>
</template>

<script>
    export default {
        name: 'editPass',
        data () {
            return {
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .box{
        width:100%;
        height: auto;
    }
    .group{
        width: 100%;
        height: auto;
    }
    .group label{
        width: 30%;
        height: 40px;
    }
    .group input{
        width: 70%;
        height: 40px;
        margin-bottom: 15px;
        border-radius: 5px;
        outline: none;
        border: 1px solid #22cc77;
        padding:5px 10px;
    }
    .group input:focus{
        border: 1px solid #d9534f;
    }
    #btn{
        width: auto;
        height: auto;
        padding:10px 15px;
        background: linear-gradient(#bbbbbb,#ffffff);
    }
</style>
