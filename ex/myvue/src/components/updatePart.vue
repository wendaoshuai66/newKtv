<template>
    <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
                label="所属部门"
                prop="rid"
        >
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </el-form-item>
        <el-form-item
                label="所属部门"
                prop="rid"
        >
            <el-input type="text" v-model="name" auto-complete="off" style="width: 200px;float: left" disabled></el-input>
        </el-form-item>
        <el-form-item
                label="部门名称"
                prop="pname"
                :rules="[
      { required: true, message: '角色名称不能为空'},
      { type: 'string', message: '名称必须为字符'}
    ]"
        >
            <el-input type="text" v-model.number="numberValidateForm.pname" auto-complete="off" style="width: 200px;float: left"></el-input>
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
                    pname: '',
                },
                data: [],
                currentDatas:[],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                parentid:'',
                contant:'',
                name:'',
                pid:''
            };
        },
        mounted(){
            var partCurrent=this.$store.state.partCurrent;
            this.pid=partCurrent.pid;
            var partInfo=this.$store.state.partInfo;
            this.data=(partInfo);
            this.numberValidateForm.pname=partCurrent.label;
            var that=this;
            function getname(orign,current) {
                if(current.parentid==0){
                    that.name="一级栏目";
                    that.parentid=0;
                    return;
                }
                for(var i=0;i<orign.length;i++){
                    if(orign[i].pid==current.parentid){
                        that.name=orign[i].label;
                        that.parentid=orign[i].parentid;
                        break;
                    }else if(orign[i].children && orign[i].children.length>0){
                        getname(orign[i].children,current)
                    }
                }
            }
            getname(partInfo,partCurrent)
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var aa= "name="+this.numberValidateForm.pname+"&parentid="+this.parentid+"&pid="+this.pid;
                        fetch("/api/updatePart",{
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
                            }else {
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
            },
            handleNodeClick(data) {
                this.contant=data;
                this.name=data.label;
                this.parentid=(data).pid;
            },
            first(){
                this.parentid=0;
            }
        },

    }
</script>
<style scoped>

</style>
