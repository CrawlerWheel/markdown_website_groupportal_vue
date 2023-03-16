<template>
<!--  <el-empty description="Intro"></el-empty>-->

  <div>
    <el-dialog
        title="海报栏编辑"
        :visible.sync="dialogVisible"
        width="80%"
        :show-close="showClose">
      <el-upload class="upload-demo"
                 drag
                 action="#"
                 :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :http-request="addPosters"
                 :file-list="fileList"
                 list-type="picture"
                 multiple
                 style="width: 70%; margin:10px auto">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">请上传jpg/png文件&nbsp;&nbsp;请勿上传同名或中文名文件</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogClose">确 定</el-button>
      </span>
    </el-dialog>
    <div align="left">
      <img src="../assets/img/logo.png" style="height:60px; margin-left: 5px; margin-top: 3px" />
    </div>
    <el-divider class="divider"></el-divider>
    <div class="eleTest">
    <div class="edit-box" v-show="hasLogin">
      <el-button type="primary" @click="dialogVisible = true" >
        进入海报编辑
      </el-button>
      <el-button type="primary" @click="gotoEdit()" >
        进入markdown编辑
      </el-button>
      <el-divider><i class="el-icon-s-order"/> &nbsp &nbsp 以下是向访客展示的内容</el-divider>
    </div>
    <el-carousel height="300px" indicator-position="outside" >
      <el-carousel-item v-for="item in fileList" :key="item.id" >
        <img :src="item.url" alt="" style="height:300px" />
      </el-carousel-item>
    </el-carousel>
    <div class="content markdown-body" v-html="homeContext.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Intro",
  data() {
    return {
      dialogVisible: false,
      showClose: false,
      //actionUrl: this.$axios.defaults.baseURL + '/img/intro/upload',
      hasLogin: false,
      fileList: [],
      homeContext:{
        content:'',
        status:''
      }
    }
  },
  created() {
    if (this.$store.getters.getUser) {
      this.hasLogin = true
    }
    this.getHomeContext()
    this.getIntroImg()
  },
  methods:{
    dialogClose(){
      this.$router.go(0)
    },
    addPosters(param) {
      let _this = this
      let formData = new FormData();
      formData.append('image', param.file);
      this.$axios.post("img/intro/upload",formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": localStorage.getItem("token")
        }
      }).then((response) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)

        if (response.data.code === 200) {
          _this.$message({
            message: '上传成功 ',
            type: 'success'
          });
        }
      })
    },
    handleRemove(file, fileList) {
      const _this = this
      //console.log(file)
      this.$axios.post('/img/intro/delete/',file.name,{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          _this.$message({
            message: '删除成功 ',
            type: 'success'
          });
        }else if(res.data.code === 501){
          _this.$message({
            message: '删除成功 ',
            type: 'fail'
          });
        }
      });
    },
    handlePreview(file) {
      //console.log(file);
    },
    gotoEdit(){
      const _this = this;
      _this.$router.push("/Intro/edit")
    },
    getIntroImg(){
      const _this = this
      this.$axios.get('/IntroImg').then((res) => {
        //console.log(res.data.data)
        _this.fileList = res.data.data
        //console.log(res.data.data)
      });
    },
    getHomeContext() {
      const _this = this
      this.$axios.get('/HomeContexts').then((res) => {
        //console.log(res)
        //console.log(res.data.data)
        _this.homeContext = res.data.data
        let md = require('markdown-it')({
          html: true,
          linkify: true,
          typographer: true
        })
        _this.homeContext.content = md.render(_this.homeContext.content)
      });
    }
  }
}
</script>

<style >
.divider {
  margin-top: 0px !important;
  margin-bottom: 6px !important;
  background-color: #DCDFE6;
  position: relative;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 180px;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
}
.add{
  background-color: #99a9bf;
}
.el-dialog__footer {
  text-align: center !important;
}
.el-dialog {
  border-radius: 15px;
}

</style>