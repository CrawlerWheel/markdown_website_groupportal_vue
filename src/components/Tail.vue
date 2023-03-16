<template>
  <div element-loading-background="#303133" class="tial">
    <el-divider><i class="el-icon-more"/></el-divider>
    Copyright © 2012-2022 董俊课题组版权所有 &nbsp &nbsp
    <span v-show="!hasLogin"><el-link type="primary" href="/login">MasterLogin</el-link></span>
    <span v-show="hasLogin">欢迎管理员&nbsp&nbsp {{user.username}} &nbsp&nbsp</span>
    <span v-show="hasLogin"><el-link type="primary" @click="logout">Logout &nbsp&nbsp</el-link></span>
    <span v-show="hasLogin"><el-link type="primary" @click="adminEdit">修改密码</el-link></span>
  </div>
</template>

<script>
export default {
  name: "Tail",
  data() {
    return {
      user: {
        username: '请先登录',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      },
      hasLogin: false
    }
  },
  methods: {
    adminEdit(){
      this.$router.push("/AdminEdit")
    },
    logout() {
      const _this = this
      _this.$axios.get("/logout", {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        _this.$store.commit("REMOVE_INFO")
        _this.$message({
          message: '已退出登录 ',
          type: 'success'
        })
        _this.$router.go(0)
      })
    }
  },
  created() {
    console.log("--------------tail create")
    if(this.$store.getters.getUser !=='') {
      this.user.username = this.$store.getters.getUser.username
      this.hasLogin = true
    }
  }
}
</script>

<style scoped>
.tail{
  margin-bottom: 20px;
}

</style>