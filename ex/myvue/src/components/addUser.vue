<template>
<div>
  <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">

    <el-form-item
            label="批量添加"
    >
      <el-upload
              style="float: left"
              class="upload-demo"
              action="/api/userup"
              :on-success='success'
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>

    <span class="bos">所属部门:</span>
    <router-view></router-view>
    <el-form-item
            label="用户名称"
            prop="aname"
            :rules="[
      { required: true, message: '名称不能为空'},
      { type: 'string', message: '名称必须为字符'}
    ]"
    >
      <el-input type="text" v-model.number="numberValidateForm.aname" auto-complete="off" style="width: 200px;float: left" :disabled="disableds"></el-input>
    </el-form-item>
    <el-form-item
            label="用户手机"
            prop="phone"
            :rules="[
      { required: true, message: '手机号码不能为空'},
      { type: 'number', message: '号码必须是数字'}
    ]"
    >
      <el-input type="text" v-model.number="numberValidateForm.phone" auto-complete="off" style="width: 200px;float: left" :disabled="disableds"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: 'addUser',
  data () {
    return {
        numberValidateForm: {
            aname: '',
            phone: '',
        },
    }
  },
  methods:{
      submitForm(){
          var aa=this.numberValidateForm.aname+"&phone="+this.numberValidateForm.phone+"&pid="+this.$store.state.partid;
          fetch("/api/addUser?aname="+aa).then(function (e) {
              return e.text();
          }).then((e)=>{
              if(e=="ok"){
                  this.$message({
                      message: '恭喜你，添加成功',
                      type: 'success'
                  });
              }else{
                  this.$message({
                      message: '添加失败',
                      type: 'warning'
                  });
              }
              this.numberValidateForm.aname="";
              this.numberValidateForm.phone="";
          })
      },
      success(fill){
          if(fill=="ok"){
              this.$message({
                  message: '恭喜你，添加成功',
                  type: 'success'
              });
          }else {
              this.$message({
                  message: '添加失败',
                  type: 'warning'
              });
          }
      },
      handleRemove(file, fileList) {
          console.log(file, fileList);
      },
      handlePreview(file) {
          console.log(file);
      },
      handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
      }
  },
  computed:{
      disableds(){
          return this.$store.state.disables;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bos{
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    text-align: right;
    vertical-align: middle;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 300px;
    margin-bottom: 50px;
  }
</style>
