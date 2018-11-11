<template>
    <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
                label="所属部门"
                prop="rid"
        >
            <div><span style="text-align: left;width: 100%;display: block;font-size: 15px;cursor: pointer" @click="first">一级部门</span></div>
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
                name:'',
                currentDatas:[],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                parentid:'',
                contant:''
            };
        },
        mounted(){
            fetch("/api/partshow").then(function (e) {
                return e.json();
            }).then((e)=>{
                var arr=[];
                function getData(e,num,arr1) {
                    for(var i=0;i<e.length;i++){
                        var obj={};
                        if(e[i].parentid==num){
                            obj.label=e[i].pname;
                            obj.pid=e[i].pid;
                            obj.children=[];
                            arr1.push(obj);
                            getData(e,e[i].pid,obj.children)
                        }
                    }
                };
                getData(e,0,arr);
                this.data=arr;

            })
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var aa= "name="+this.numberValidateForm.pname+"&parentid="+this.parentid;
                        fetch("/api/addPart",{
                            method: "POST",
                            body: aa,
                            headers:{"Content-Type":"application/x-www-form-urlencoded"}
                        }).then(function (e) {
                          return e.text();
                        }).then( (e)=> {
                            if(e=="err"){
                                this.$message({
                                    message: '添加失败',
                                    type: 'warning'
                                });
                            }else {
                                this.$message({
                                    message: '恭喜你，添加成功',
                                    type: 'success'
                                });
                                if(this.parentid==0 || this.data.length==0){
                                    this.data.push({label:this.numberValidateForm.pname,pid:e,children:[]})
                                }else {
                                    this.contant.children.push({label:this.numberValidateForm.pname,pid:e,children:[]})
                                }
                            }
                            this.numberValidateForm.pname="";

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
