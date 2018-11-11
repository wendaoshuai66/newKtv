<template>
    <div>
        <div class="bg"></div>
        <div class="container">
            <div class="line bouncein">
                <div class="xs6 xm4 xs3-move xm4-move">
                    <div style="height:130px;"></div>
                    <div class="media media-y margin-big-bottom">
                    </div>
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
                        <el-form-item label="姓名" prop="name">
                            <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pass">
                            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            </div>
    </div>
</template>
<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入姓名'));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }  else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    name:'',
                    pass: '',
                },
                rules2: {
                    name: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                            if (valid) {
                              this.$store.dispatch('LoginByUsername', this.ruleForm2).then(() => {
                                alert(1)
                                this.$router.push({ path: '/' })
                              }).catch(() => {
                                alert('登陆失败')
                              })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style scoped>
    @import "../../assets/css/admin.css";
    @import "../../assets/css/pintuer.css";
    .el-form-item{
        margin-bottom: 20px;
    }
</style>
