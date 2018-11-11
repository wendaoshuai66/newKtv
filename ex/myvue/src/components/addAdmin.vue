<template>
    <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
                label="管理员姓名"
                prop="uname"
                :rules="[
      { required: true, message: '角色名称不能为空'},
      { type: 'string', message: '名称必须为字符'}
    ]"
        >
            <el-input type="text" v-model.number="numberValidateForm.uname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
                label="角色名称"
                prop="rid"
        >
            <el-checkbox-group
                    v-model="checkedCities1"
                    :min="0"
                    :max="4">
                <el-checkbox v-for="item in labels" :label="item.rid" :key="item.rid">{{item.rname}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="照片">
            <el-upload
                    class="avatar-uploader"
                    action="/api/uploads"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                     style="text-align: left;">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <input type="hidden" value="photo" v-model="photo">
            </el-upload>
            <input type="hidden">
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
                    uname: '',
                    lnum: ''
                },
                checkedCities1: [],
                labels:'',
                imageUrl: '',
                photo:''
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var uid=this.$store.state.uid;
                        var aa= "name="+this.numberValidateForm.uname+"&num="+this.checkedCities1+"&photo="+this.photo+"&uid="+uid;
                        fetch("/api/addAdmin",{
                            method: "POST",
                            body: aa,
                            headers:{"Content-Type":"application/x-www-form-urlencoded"}
                        }).then(function (e) {
                          return e.text();
                        }).then( (e)=> {
                            if(e=="ok"){
                                this.$message({
                                    message: '恭喜你，添加成功',
                                    type: 'success'
                                });
                            }else if(e=="err1"){
                                this.$message({
                                    message: '没有添加权限',
                                    type: 'warning'
                                });
                            }else {
                                this.$message({
                                    message: '添加失败',
                                    type: 'warning'
                                });
                            }
                            this.numberValidateForm.uname="";
                            this.checkedCities1=[];
                            this.imageUrl="";
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.photo=file.response;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
            
        },
        mounted(){

            fetch("/api/roleshow").then(function (e) {
                return e.json();
            }).then((e)=>{
                this.labels=e;
            })
        }
    }
</script>
<style scoped>
     .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border: 1px dashed #d9d9d9;
    }
     .avatar-uploader-icon:hover {
         border-color: #409EFF;
     }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
        border: 1px dashed #d9d9d9;
    }
     .avatar:hover {
         border-color: #409EFF;
     }

</style>
