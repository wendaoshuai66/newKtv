<template>
    <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="照片">
            <el-upload
                    class="avatar-uploader"
                    action="/web/api/resource/uploadedImage/uploadedImageInfo/byScheme"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :on-error="hands"
                    :before-upload="beforeAvatarUpload"
                    style="text-align: left;">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <input type="hidden" value="photo" v-model="photo">
            </el-upload>
            <input type="hidden">
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data() {
            return {
                numberValidateForm: {
                },
                names:'',
                imageUrl: '',
                photo:''
            };
        },
        methods: {
            hands(res){
                this.$message({
                    message: '上传失败',
                    type: 'warning'
                })
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.names=URL.createObjectURL(file.raw.type)
                this.photo=file.response;
                var response=res.json();
                if(response.code=='1'){
                    this.$message({
                        message: '上传成功',
                        type: 'success'
                    })
                }else{
                    this.$message({
                        message: '上传失败',
                        type: 'warning'
                    })
                }
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

