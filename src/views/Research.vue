<template>
<!--  <el-empty description="Research"></el-empty>-->
  <div>
    <div class="edit-box" v-show="hasLogin">
      <el-button type="primary" @click="gotoEdit()" >
        进入编辑界面
      </el-button>
      <el-divider><i class="el-icon-s-order"/> &nbsp &nbsp 以下是向访客展示的内容</el-divider>
    </div>
    <div class="content markdown-body" v-html="researchContext.content"></div>
  </div>
</template>

<script>
export default {
  name: "Research",
  data() {
    return {
      hasLogin: false,
      researchContext:{
        content:'',
        status:''
      }
    }
  },
  methods:{
    gotoEdit(){
      const _this = this;
      _this.$router.push("/Research/edit")
    },
    getResearchContext() {
      const _this = this
      this.$axios.get('/ResearchContexts').then((res) => {
        console.log(res)
        //console.log(res.data.data)
        _this.researchContext = res.data.data
        let md = require('markdown-it')({
          html: true,
          linkify: true,
          typographer: true
        })
        _this.researchContext.content = md.render(_this.researchContext.content)
      });
    }
  },
  created() {
    if (this.$store.getters.getUser) {
      this.hasLogin = true
    }
    this.getResearchContext()
  }
}
</script>

<style scoped>

</style>