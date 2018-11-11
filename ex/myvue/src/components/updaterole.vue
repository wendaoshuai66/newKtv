<template>
    <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
                label="角色名称"
                prop="rname"
                :rules="[
      { required: true, message: '权限名称不能为空'},
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
                    rname: ''
                },
                checkedCities1: [],
                labels:''
            };
        },
        mounted(){
            this.labels=this.$store.state.roleInfo.lable;
            var arr=this.$store.state.roleInfo.lnum;
            for(var i=0;i<arr.length;i++){
                this.checkedCities1.push(arr[i].lnum)
            };
            console.log(this.$store.state.roleInfo)
            this.numberValidateForm.rname=this.$store.state.roleInfo.rname;
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var aa= "name="+this.numberValidateForm.rname+"&num="+this.checkedCities1.join(',')+"&id="+this.$store.state.roleInfo.rid;
                        fetch("/api/updaterole?"+aa).then(function (e) {
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
