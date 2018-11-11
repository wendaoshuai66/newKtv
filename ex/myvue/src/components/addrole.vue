<template>
    <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
                label="角色名称"
                prop="rname"
                :rules="[
      { required: true, message: '角色名称不能为空'},
      { type: 'string', message: '名称必须为字符'}
    ]"
        >
            <el-input type="text" v-model.number="numberValidateForm.rname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
                label="权限值"
                prop="lnum"
        >
            <el-checkbox-group
                    v-model="checkedCities1"
                    :min="0"
                    :max="4">
                <el-checkbox v-for="item in labels" :label="item.lnum" :key="item.lid">{{item.lname}}</el-checkbox>
            </el-checkbox-group>
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
                    rname: '',
                    lnum: ''
                },
                checkedCities1: [],
                labels:''
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var aa= "name="+this.numberValidateForm.rname+"&num="+this.checkedCities1;
                        fetch("/api/addrole?"+aa).then(function (e) {
                          return e.text();
                        }).then( (e)=> {
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
                            this.numberValidateForm.rname="";
                            this.checkedCities1=[];
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        mounted(){
            fetch("/api/lableshow").then(function (e) {
                return e.json();
            }).then((e)=>{
                this.labels=e;
            })
        }
    }
</script>
<style scoped>

</style>
