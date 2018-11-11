<template>
  <el-table
          :data="tableData"
          stripe
          style="width: 100%;text-align: left">
    <el-table-column
            prop="uid"
            label="id"
            width="180">
    </el-table-column>
    <el-table-column
            prop="uname"
            label="姓名"
            width="180">
    </el-table-column>
    <el-table-column
            label="照片"
            width="180">
      <template slot-scope="scope">

        <img :src="'http://localhost:7777/'+scope.row.uphoto" alt="" style="width: 100px;">
      </template>
    </el-table-column>
    <el-table-column
            prop="rname"
            label="角色"
            width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
                size="mini"
                v-show="isShowEditbtn"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
                size="mini"
                v-show="isShowDelbtn"
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
                tableData: [],
                isShowDelbtn:false,
                isShowEditbtn:true,
            }
        },
        mounted(){
            var uid=this.$store.state.uid;
            fetch("/api/adminshow?uid="+uid).then(function (e) {
                return e.json();
            }).then((e)=>{
                this.tableData=e.datas;
                this.isShowDelbtn=e.isShowDelbtn;
            })
        },
        methods:{
            handleEdit(index,row){
                this.$store.commit("setadmin",row);
                this.$router.push("/updateAdmin");
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
