const user={
  state: {
    count: 0,
    roleInfo:'',
    uid:'',
    uname:'',
    adminInfo:'',
    partInfo:'',
    partCurrent:'',
    partid:'',
    disables:'',
  },
  mutations: {
    increment (state,val) {
      state.count=val;
    },
    setrole(state,val){
      state.roleInfo=val;
    },
    setUid(state,val){
      state.uid=val;
    },
    setUname(state,val){
      state.uname=val;
    },
    setadmin(state,val){
      state.adminInfo=val;
    },
    setpartInfo(state,val){
      state.partInfo=val;
    },
    setpartCurrent(state,val){
      state.partCurrent=val;
    },
    setpartid(state,val){
      state.partid=val;
    },
    setdisables(state,val){
      state.disables=val;
    }
  },
  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        /*loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })*/
  
  
        fetch("/api/login?name="+userInfo.name+"&pass="+userInfo.pass).then(function (e) {
          return e.json();
        }).then((e)=>{
          sessionStorage.login=e.message;
          commit("setUid",e.date[0].uid);
          commit("setUname",e.date[0].uname)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
    
  }
}
export default user

