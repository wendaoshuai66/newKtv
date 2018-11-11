<script>
    /*
    * <template>
    <div>
        <h3 style="text-align: center">部门表</h3>
        <table table-bordered>
              <tr><th>id</th><th>部门名称</th><th>操作</th></tr>
              <tbody v-html="tel"></tbody>
        </table>
    </div>
</template>
    * */
    export default {
        data() {
            return {
                tel:[],
                data:[]
            }
        },
        render(h){
            this.create();
            return (
                    <div >
                        <h3 style="text-align: center">部门表</h3>
                        <table style="width: 100%" class="table table-bordered">
                            <tr><th style="text-align: center">id</th>
                                <th style="text-align: center">部门名称</th>
                                <th style="text-align: center">操作</th></tr>
                            <tbody>{this.tel}</tbody>
                        </table>
                    </div>
            )
        },
        methods:{
            edit(data){
                console.log(this);
                this.$store.commit('setpartInfo',this.data);
                this.$store.commit('setpartCurrent',data);
                this.$router.push('/updatePart');
            },
            del(data){
                var that=this;
                function getDel(datas,current) {
                    for(var i=0;i<datas.length;i++){
                        if(datas[i].pid==current.pid){
                            if(datas[i].children && datas[i].children.length>0){
                                alert('不能删除')
                            }else {
                                ((i) =>{
                                    fetch("/api/delpart/"+current.pid).then(function (e) {
                                        return e.text();
                                    }).then( (e)=> {
                                        if(e=="ok"){
                                            alert("删除成功")
                                            datas.splice(i,1);
                                            that.create()
                                        }else{
                                            alert("删除失败")
                                        }
                                    })
                                })(i)
                            }
                            break;
                        } else {
                            if(datas[i].children && datas[i].children.length>0){
                                getDel(datas[i].children,current)
                            }
                        }
                    }
                }
                getDel(this.data,data)
            },
            create(){
                fetch("/api/partshow").then(function (e) {
                    return e.json();
                }).then(e=>{
                    var arr=[];
                    function getData(e,num,arr1) {
                        for(var i=0;i<e.length;i++){
                            var obj={};
                            if(e[i].parentid==num){
                                obj.label=e[i].pname;
                                obj.parentid=e[i].parentid;
                                obj.pid=e[i].pid;
                                obj.children=[];
                                arr1.push(obj);
                                getData(e,e[i].pid,obj.children)
                            }
                        }
                    };
                    getData(e,0,arr);
                    this.data=arr;
                    var tel=[];
                    var flag = "-";
                    var that=this;
                    function getInfo(arr,flag,step){

                        var flags = flag.repeat(step);
                        var spaces=[];
                        for(var j=0;j<step;j++){
                            spaces.push(<span>&nbsp;&nbsp;</span>)
                        }
                        for(var i=0;i<arr.length;i++){
                            if(arr[i].parentid==0){
                                step=0;
                            }
                            tel.push(<tr><td>{arr[i].pid}</td><td>{spaces}{flags}{arr[i].label}</td><td><span
                                    onClick={((e)=>{
                                        return ()=>{
                                            that.del(e)
                                        };
                                    })(arr[i])} style="cursor: pointer">删除</span><span style="margin-left:10px;cursor: pointer"
                                   onClick={((e)=>{
                                        return()=>{
                                            that.edit(e)
                                        }
                            })(arr[i])}>编辑</span></td></tr>);

                            if(arr[i].children){
                                step++;
                                getInfo(arr[i].children,flag,step);
                            }
                        }
                        return arr;
                    }
                    getInfo(arr,flag,0);
                    this.tel = tel;
                })
            }
        },

    }

</script>


<style scoped>

</style>