<template>
    <div>
        <span class="bos">所属部门:</span>
        <router-view></router-view>
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
