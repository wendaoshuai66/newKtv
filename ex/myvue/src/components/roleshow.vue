<template>
  <!--
  组件库 项目的标准 传统的开发模式
  后台为主  语言 数据库 http html css js
  php nodejs Java
  前台为主 前台的优化 html css js
  后台的语言+mysql
 []
  vue 工作流 vue 简单 扩展性 依赖性
  vue 锤炼开发人员的编程能力
  工作流 产品统一的开发模式 框架模式 组件化 组件
  app
  websocket （是一种协议）即时通信 qq 推送
  javascript 排名第三
  -->
  <el-table
          :data="tableData"
          style="width: 100%;text-align: left">
    <el-table-column
            label="id"
            width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.rid }}</span>
      </template>
    </el-table-column>
    <el-table-column
            label="角色名称"
            width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.rname }}</span>
      </template>
    </el-table-column>
    <el-table-column
            label="权限"
            width="180">
      <template slot-scope="scope">
       <span v-for="item in scope.row.lnum">{{item.lname}}&nbsp</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        data() {
            return {
                tableData: []
            }
        },
        mounted(){
            fetch("/api/roleshow").then(function (e) {

                return e.json();
            }).then((e)=>{
                this.tableData=e;
            })
        },
        methods: {
            handleEdit(index, row) {
                  this.$store.commit('setrole',row);
                  this.$router.push('/updaterole');
            },
            handleDelete(index, row) {
               var ok=window.confirm("确定删除?");
               if(ok){
                   var rid=row.rid;
                   var uid=this.$store.state.uid;
                   var str="rid="+rid+"&uid="+uid;
                   fetch("/api/delRole?"+str).then(function (e) {
                       return e.text()
                   }).then(e=>{
                       if(e=="ok"){
                           this.tableData=this.tableData.filter(ele=>{
                               return ele.rid!=row.rid;
                           })
                           this.$message({
                               message: '恭喜你，删除成功',
                               type: 'success'
                           });
                       }else if(e =="err1"){
                           this.$message({
                               message: '没有权限删除',
                               type: 'warning'
                           });
                       }else {
                           this.$message({
                               message: '没有删除',
                               type: 'warning'
                           });
                       }
                   })
               }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
