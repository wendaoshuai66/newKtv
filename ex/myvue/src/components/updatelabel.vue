<template>
    <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
                label="权限名称"
                prop="lname"
                :rules="[
      { required: true, message: '权限名称不能为空'},
      { type: 'string', message: '名称必须为字符'}
    ]"
        >
            <el-input type="text" v-model.number="numberValidateForm.lname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
                label="权限值"
                prop="lnum"
                :rules="[
      { required: true, message: '权限值不能为空'},
      { type: 'number', message: '值必须为数字'}
    ]"
        >
            <el-input type="text" v-model.number="numberValidateForm.lnum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>

        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data() {
            return {
                numberValidateForm: {
                    lname: '',
                    lnum: ''
                },
                lname1:'',
                lnum1:'',
            };
        },
        mounted(){
            var lnum=this.$route.query.lnum;
            var lname=this.$route.query.lname;
             this.lname1=lname;
             this.lnum1=lnum;
             this.numberValidateForm.lname=lname;
             this.numberValidateForm.lnum=lnum;
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                      if(!(this.numberValidateForm.lname==this.lname1&&this.numberValidateForm.lnum==this.lnum1)){
                          var aa= "name="+this.numberValidateForm.lname+"&num="+this.numberValidateForm.lnum+"&id="+this.$route.query.lid;
                          fetch("/api/updatelabel?"+aa).then(function (e) {
                              return e.text();
                          }).then( (e)=> {
                              if(e=="ok"){
                                  this.$message({
                                      message: '恭喜你，修改成功',
                                      type: 'success'
                                  });
                              }else{
                                  this.$message({
                                      message: '修改失败',
                                      type: 'warning'
                                  });
                              }
                          })
                      }else {
                          this.$message({
                              message: '没有修改',
                              type: 'warning'
                          });
                      }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style scoped>

</style>
