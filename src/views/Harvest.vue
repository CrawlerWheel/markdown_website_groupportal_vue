<template>
<!--  <el-empty description="Harvest"></el-empty>-->
<!--  <div class="block">-->
<!--    <div class="txt">-->
<!--    <el-timeline >-->
<!--      <el-timeline-item timestamp="2018/4/12" placement="top">-->
<!--        <el-card>-->
<!--          <h4>更新 Github 模板</h4>-->
<!--          <p>王小虎 提交于 2018/4/12 20:46</p>-->
<!--        </el-card>-->
<!--      </el-timeline-item>-->
<!--    </el-timeline>-->
<!--    </div>-->
<!--    <el-pagination-->
<!--        class="pages"-->
<!--        background-->
<!--        layout="prev, pager, next"-->
<!--        :total="1000">-->
<!--    </el-pagination>-->
<!--  </div>-->
  <div>
    <div class="edit-box" v-show="hasLogin">
      <el-button type="primary" @click="gotoEdit()" >
        进入编辑界面
      </el-button>
      <el-divider><i class="el-icon-s-order"/> &nbsp &nbsp 以下是向访客展示的内容</el-divider>
    </div>
    <div class="content markdown-body" v-html="harvestContext.content"></div>
  </div>
</template>

<script>
export default {
  name: "Harvest",
  data() {
    return {
      hasLogin: false,
      harvestContext:{
        content:'',
        status:''
      }
    }
  },
  methods:{
    gotoEdit(){
      const _this = this;
      _this.$router.push("/Harvest/edit")
    },
    getHarvestContext() {
      const _this = this
      this.$axios.get('/HarvestContexts').then((res) => {
        console.log(res)
        //console.log(res.data.data)
        _this.harvestContext = res.data.data
        let md = require('markdown-it')({
          html: true,
          linkify: true,
          typographer: true
        })
        _this.harvestContext.content = md.render(_this.harvestContext.content)
      });
    }
  },
  created() {
    if (this.$store.getters.getUser) {
      this.hasLogin = true
    }
    this.getHarvestContext()
  }
}
</script>

<style scoped>
.txt{
  text-align:left;
}
.pages{
  margin: 0px auto;
}
</style>