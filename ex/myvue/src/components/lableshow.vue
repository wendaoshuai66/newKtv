<template>
  <!--
  组件库 项目的标准 传统的开发模式
  后台为主  语言 数据库 http html css js
  php nodejs Java
  前台为主 前台的优化 html css js
  后台的语言+mysql

  vue 工作流 vue 简单 扩展性 依赖性
  vue 锤炼开发人员的编程能力
  工作流 产品统一的开发模式 框架模式 组件化 组件
  app
  websocket （是一种协议）即时通信 qq 推送
  -->
  <el-table
          :data="tableData"
          style="width: 100%;text-align: left">
    <el-table-column
            label="id"
            width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.lid }}</span>
      </template>
    </el-table-column>
    <el-table-column
            label="权限名称"
            width="180">
      <template slot-scope="scope">
        <el-popover placement="top">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.lname }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
            label="权限对应的值"
            width="180">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-tag size="medium">{{ scope.row.lnum }}</el-tag>
        </div>
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
            fetch("/api/lableshow").then(function (e) {
                return e.json();
            }).then((e)=>{
                this.tableData=e;
            })
        },
        methods: {
            handleEdit(index, row) {
                    this.$router.push({path:'/updatelabel',query:{lid:row.lid,lname:row.lname,lnum:row.lnum}})
//                1.直接跳转 参数
//                this.$router.push("edialabel/"+row.id)
            },
            handleDelete(index, row) {
               var ok=window.confirm("确定删除?");
               if(ok){
                   fetch("/api/delLabel/"+row.lid).then(function (e) {
                       return e.text()
                   }).then(e=>{
                       if(e=="ok"){
                           this.tableData=this.tableData.filter(ele=>{
                               return ele.lid!=row.lid;
                           })
                           this.$message({
                               message: '恭喜你，删除成功',
                               type: 'success'
                           });
                       }else {
                           this.$message({
                               message: '删除失败',
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
