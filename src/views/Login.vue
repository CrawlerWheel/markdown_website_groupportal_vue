<template>
  <div class="login" clearfix>
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon label-width="80px">
          <h3>登录</h3>
          <hr>
          <el-form-item prop="username" label="用户名 :">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名" prefix-icon></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密   码 :">
            <el-input v-model="ruleForm.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">登 录</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(){
      const _this = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 提交逻辑
          this.$axios.post('/login', this.ruleForm).then((res)=>{
            const token = res.headers['authorization']
            _this.$store.commit('SET_TOKEN', token)
            _this.$store.commit('SET_USERINFO', res.data.data)
            console.log(res)
            console.log(res.data.message)
            if(res.data.msg === 'success'){
              _this.$message({
                message: '欢迎管理员 '+res.data.data.username,
                type: 'success'
              });
              _this.$router.push("/Intro")
            }else {
              _this.$message({
                message: '登录失败 ',
                type: 'fail'
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 100%;
  height: 740px;
  /*background: url("../assets/images/bg1.png") no-repeat;*/
  background-size: cover;
  overflow: hidden;
}

.login-wrap {
  border: 5px solid #ddd !important;
  border-radius: 4px !important;
  background-size: cover;
  width: 400px;
  height: 300px;
  margin: 150px auto;
  overflow: hidden;
  padding-top: 10px;
  line-height: 40px;
}
#password {
  margin-bottom: 5px;
}
h3 {
  color: #409EFF;
  font-size: 24px;
  margin-bottom: 5px;
}
hr {
  background-color: #444;
  margin-top: 5px;
  margin-bottom: 20px;
}
a {
  float: right !important;
  text-decoration: none;
  color: #aaa;
  font-size: 15px;
}
a:hover {
  color: coral;
}
.el-button {
  width: 80%;
  margin-left: -50px;
}
</style>