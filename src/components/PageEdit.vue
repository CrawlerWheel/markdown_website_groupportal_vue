<template>
  <div class="m-container">
    <div class="m-content">
      <el-form ref="editForm" status-icon :model="editForm">

        <el-form-item prop="content">
          <mavon-editor
              ref="md"
              @imgAdd="imgAdd"
              @imgDel="imgDel"
              v-model="editForm.content"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="goBack()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageEdit",
  data() {
    return {
      editForm: {
        content: ''
      },
    }
  },
  created() {
    const _this = this
    if(_this.$route.path === '/Numbers/edit'){
      this.$axios.get('/NumbersContexts').then((res) => {
        const context = res.data.data
        _this.editForm.content = context.content
      });
    }else if(_this.$route.path === '/Intro/edit'){
      this.$axios.get('/HomeContexts').then((res) => {
        const context = res.data.data
        _this.editForm.content = context.content
      });
    }else if(_this.$route.path === '/Harvest/edit'){
      this.$axios.get('/HarvestContexts').then((res) => {
        const context = res.data.data
        _this.editForm.content = context.content
      });
    }else if(_this.$route.path === '/Research/edit'){
      this.$axios.get('/ResearchContexts').then((res) => {
        const context = res.data.data
        _this.editForm.content = context.content
      });
    }
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    },
    // 将图片上传到服务器，返回地址替换到md中
    imgAdd(pos, $file) {
      console.log("-----------test")
      let _this = this
      let formdata = new FormData();
      formdata.append('image', $file);
      this.$axios.post("img/upload",formdata,{
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": localStorage.getItem("token")
        }
      }).then((response) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        if (response.status === 200) {
          let url = response.data.data;
          _this.$refs.md.$img2Url(pos,url)
        }
      })
    },
    imgDel(pos) {

    },
    submitForm() {
      const _this = this
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          let postPath =''
          if(_this.$route.path === '/Numbers/edit'){
            postPath = '/NumbersContexts/edit'
          }else if(_this.$route.path === '/Intro/edit'){
            postPath = '/HomeContexts/edit'
          }else if(_this.$route.path === '/Harvest/edit'){
            postPath = '/HarvestContexts/edit'
          }else if(_this.$route.path === '/Research/edit'){
            postPath = '/ResearchContexts/edit'
          }
          this.$axios.post(postPath, this.editForm, {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then((res) => {
            _this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                let reg = new RegExp("/edit")
                _this.$router.push(_this.$route.path.replace(reg,''),)
              }
            });
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  }
}
</script>
