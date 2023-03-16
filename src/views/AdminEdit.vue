<template>
  <div class="login" clearfix>
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon label-width="80px">
          <h3>修改密码</h3>
          <hr>
          <el-form-item prop="username" label="用户名 :" label-width="100px">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名" prefix-icon></el-input>
          </el-form-item>
          <el-form-item prop="password" label="原始密码 :" label-width="100px">
            <el-input v-model="ruleForm.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="新密码 :" label-width="100px">
            <el-input v-model="ruleForm.password_new" show-password placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">提 交</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminEdit",
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        password_new: ''
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
  created() {

  },
  methods: {
    submitForm(){
      const _this = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 提交逻辑
          this.$axios.post('/Admin/edit', this.ruleForm,{
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then((res)=>{
            const token = res.headers['authorization']
            _this.$store.commit('SET_TOKEN', token)
            _this.$store.commit('SET_USERINFO', res.data.data)
            console.log(res)
            console.log(res.data.message)
            if(res.data.msg === 'success'){
              _this.$message({
                message: '密码修改成功！',
                type: 'success'
              });
              _this.$router.push("/Intro")
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
  height: 350px;
  margin: 100px auto;
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