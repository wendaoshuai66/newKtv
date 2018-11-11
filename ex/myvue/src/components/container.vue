<template>
  <el-container>
    <el-header>
      <span>欢迎{{names}}进入</span>
      <span>后台管理</span>
      &nbsp;&nbsp;
      <span @click="outlogin" class="out">退出</span>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Menus></Menus>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menus from "@/components/menu";
export default {
  name: 'container',
  data () {
    return {
        names:'',
    }
  },
  created(){
    this.names=this.$store.state.user.uname
  },
  methods:{
    outlogin(){
//      this.names=this.$store.state.uname;
//        sessionStorage.removeItem('login');
//        this.$router.push('/login');
    }
  },
  components:{Menus},

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-container{
    height: 75ch;
  }
  .out{
    cursor: pointer;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  /*body > .el-container {
   height: 100ch;
  }*/
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
