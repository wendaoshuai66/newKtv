<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>管理员管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">
              <router-link to="/adminshow">查看管理员</router-link>
            </template>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">
              <router-link to="/addAdmin">添加管理员</router-link>
            </template>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">
              <router-link to="/editPass">修改密码</router-link>
            </template>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>角色管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">
              <router-link to="/roleshow">查看角色</router-link>
            </template>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">
              <router-link to="/addrole">添加角色</router-link>
            </template>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">
              <router-link to="/lableshow">查看权限</router-link>
            </template>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">
            <router-link to="/addlabel">添加权限</router-link>
            </template>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>部门管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">
              <router-link to="/partshow">查看部门信息</router-link>
            </template>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">
              <router-link to="/addPart">添加部门</router-link>
            </template>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>员工管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">
              <router-link to="/usershow">查看员工信息</router-link>
            </template>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">
              <router-link to="/addUser">添加员工</router-link>
            </template>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'menus',
  data () {
    return {

    }
  },
  methods: {
      handleOpen(key, keyPath) {
          console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
          console.log(key, keyPath);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
