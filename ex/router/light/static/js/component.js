var wait=Vue.component("wait",{
    template:`
<div class="wait"></div>
`,
})
var infoUse=Vue.component("infouse",{
    props:["mes","infoShow"],
    template:`
    <div v-show="infoShow">
        <div class="infouse">{{mes}}</div> 
    </div>
    `,
})
const Table = Vue.component("Table",{
    props:["header"],
    template:`
    <div>
    <table class="table">
    <tr>
      <td v-for="item in header">{{item}}</td>
      <td>操作</td>
   </tr>
    <tr v-for="item in datas">
   <td>{{item.name}}</td>
   <td>{{item.age}}</td>
   <td>{{item.sex}}</td>
   <td>
   <a href="#/" @click="del(item.id)">删除</a>
   <a :href="'#/updata/'+item.id">编辑</a>
</td>
</tr>
</table>
<infouse :infoShow="infoShows" :mes="mess"></infouse>
<wait v-show="show"></wait>
</div>      
    `,
    data(){
        return {
            datas:[],
            show:false,
            infoShows:false,
            mess:"",
        }
    },
    methods:{
      del(id){
          this.mess="删除成功";
          this.infoShows=true;
          fetch("/del?id="+id).then(function (e) {
              return e.text();
          }).then( (e)=> {
              if(e=="ok"){
                  this.datas=this.datas.filter(ele=>{
                      return ele.id!=id;
                  })
                  this.infoShows='false';
              }
          })
      }
    },
    mounted(){
        this.show=true;
       fetch("/tableA").then(function (e) {
           return e.json();
        }).then( (e)=> {
            this.show=false;
            this.datas=e;
        })
    }
})
var Foo=Vue.component("Foo",{
    template:`
    <div>
    <Table :header="['姓名','年龄','性别']"></Table>
</div>  
    `,
})
var Add=Vue.component("add",{
    template:`
    <form>
  <div class="form-group">
    <label for="name">姓名</label>
    <input type="text" class="form-control" id="name" placeholder="name" name="name" v-model="name">
  </div>
  <div class="form-group">
    <label for="age">年龄</label>
    <input type="text" class="form-control" id="age" placeholder="age" name="age" v-model="age">
  </div>
  
  <div class="form-group">
    <label for="sex">性别</label>
    <input type="text" class="form-control" id="sex" placeholder="sex" name="sex" v-model="sex">
  </div>
  <button type="button" class="btn btn-default" @click="submit">Submit</button>
</form>
    `,
    data(){
       return{
           name:"",
           sex:"",
           age:"",
       }
    },
    methods:{
        submit(){
            fetch("/add?name="+this.name+"&age="+this.age+"&sex="+this.sex).then(function (e) {
                return e.text();
            }).then((e)=>{
                if(e=="ok"){
                    alert("添加成功");
                    this.name="",
                    this.age="",
                    this.sex=""
                }
            })
        }
    }
})
var Updata=Vue.component("updata",{
    template:`
    <form>
  <div class="form-group">
    <label for="name">姓名</label>
    <input type="text" class="form-control" id="name" placeholder="name" name="name" v-model="name">
  </div>
  <div class="form-group">
    <label for="age">年龄</label>
    <input type="text" class="form-control" id="age" placeholder="age" name="age" v-model="age">
  </div>
  
  <div class="form-group">
    <label for="sex">性别</label>
    <input type="text" class="form-control" id="sex" placeholder="sex" name="sex" v-model="sex">
  </div>
  <button type="button" class="btn btn-default" @click="submit">Submit</button>
</form>
    `,
    data(){
        return{
            name:"",
            sex:"",
            age:"",
        }
    },
    mounted(){
        var id=this.$route.params.id;
        fetch("query/"+id).then(function (e) {
           return e.json();
        }).then( (e)=> {
            this.name=e[0].name;
            this.age=e[0].age;
            this.sex=e[0].sex;
        })
    },
    methods:{
        submit(){
          fetch("/updata?name="+this.name+"&age="+this.age+"&sex="+this.sex+"&id="+this.$route.params.id).then(function (e) {
              return e.text()
          }).then(function (e) {
              if(e=="ok"){
                  alert("修改成功")
              }else {
                  alert("修改错误")
              }
          })
        }
    }
})
var Login=Vue.component("login",{
    template:`
   <div>
    <router-link to="/login">登录</router-link>
    <router-link to="/regs">注册</router-link>
          <form class="form-horizontal">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">姓名</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="inputEmail3" placeholder="请输入姓名" v-model="name">
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码" v-model="pass">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-default" @click="login">登录</button>
        </div>
      </div>
    </form>
   </div>  
    `,
    data(){
        return{
            name:'',
            pass:''
        }
    },
    methods:{
        login(){
           fetch("/login?name="+this.name+"&pass="+this.pass).then(function(e){
               return e.json();
           }).then(e=>{
               console.log(e)
           })
        }
    }
})
var regs=Vue.component("regs",{
    template:`
    <div>
    <router-link to="/login">登录</router-link>
    <router-link to="/regs">注册</router-link>
      <form class="form-horizontal">
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">姓名</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="inputEmail3" placeholder="请输入姓名">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword3" placeholder="密码">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">确认密码</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default">提交</button>
    </div>
  </div>
</form>
   </div>
    `,
})