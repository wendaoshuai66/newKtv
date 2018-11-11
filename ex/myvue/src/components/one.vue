<template>
  <el-card class="box-card">
    <i class="el-icon-back" style="cursor:pointer" @click="back" v-show="isshow"></i>
    <div v-for="item in datas" :key="item.pid" class="text item">
      <router-link :to="'/lists/'+item.pid" v-if="item.son">{{item.pname }}</router-link>
      <span v-else="!item.son" :style="item.style" id="po" @click="selectid(item.pid)">{{item.pname}}</span>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
        datas:'',
        pid:''
    }
  },
  created(){
      this.$store.commit("setdisables",true)
      var pid=this.$route.params.ids || 0;
      fetch("/api/userpart?pid="+pid).then(function (e) {
          return e.json();
      }).then((e)=>{
          this.datas=e;
      })
  },
  watch:{
      $route(){
          this.$store.commit("setdisables",true)
          var pid=this.$route.params.ids || 0;
          fetch("/api/userpart?pid="+pid).then(function (e) {
              return e.json();
          }).then((e)=>{
              this.datas=e;
          })
      }
    },
  methods:{
      back(){
          this.$router.back();
      },
      selectid(id){
          this.$store.commit("setpartid",id);
          this.datas.forEach(e=>{
              e.style={};
              if(e.pid==id){
                  e.style={
                      color:"red"
                  }
              }
          })
          this.$store.commit("setdisables",false)
      }
  },
  computed:{
      isshow(){
          if(this.$route.path=="/addUser"){
              return false;
          }else{
              return true;
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#po{
  cursor: pointer;
}
</style>
