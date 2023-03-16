<template>
  <div>
    <div class="edit-box" v-show="hasLogin">
      <el-button type="primary" @click="gotoEdit()" >
        进入编辑界面
      </el-button>
      <el-divider><i class="el-icon-s-order"/> &nbsp &nbsp 以下是向访客展示的内容</el-divider>
    </div>
    <div class="content markdown-body" v-html="numbersContext.content"></div>
  </div>
<!--  <el-empty description="Numbers"></el-empty>-->
</template>

<script>
import 'github-markdown-css/github-markdown.css'

export default {
  name: "Numbers",
  data() {
    return {
      hasLogin: false,
      numbersContext:{
        content:'',
        status:''
      }
    }
  },
  methods:{
    gotoEdit(){
      const _this = this;
      _this.$router.push("/Numbers/edit")
    },
    getNumberContext() {
      const _this = this
      this.$axios.get('/NumbersContexts').then((res) => {
        console.log(res)
        //console.log(res.data.data)
        _this.numbersContext = res.data.data
        let md = require('markdown-it')({
          html: true,
          linkify: true,
          typographer: true
        })
        _this.numbersContext.content = md.render(_this.numbersContext.content)
      });
    }
  },
  created() {
    if (this.$store.getters.getUser) {
      this.hasLogin = true
    }
    this.getNumberContext()
  }
}
</script>

<style scoped>

</style>