<template>
  <div class="common-layout">
    <el-container>
      <el-menu
          :default-active="this.$route.path"
          mode="horizontal"
          background-color="#409EFF"
          text-color="#FFFFFF"
          active-text-color="#303133"
          router
      >
        <el-menu-item>
          机器学习与仿生优化计算课题组
        </el-menu-item>
        <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.index">
          <template slot="title">
            <span> {{ item.navItem }}</span>
          </template>
        </el-menu-item>
      </el-menu>
      <el-main>

        <router-view/>
      </el-main>

      <el-footer style="height: 100px">
          <Tail/>
      </el-footer>

    </el-container>
    <el-backtop target=".common-layout" :bottom="100">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >
        UP
      </div>
    </el-backtop>
  </div>
</template>

<script>
import Tail from '../components/Tail'
export default {
  name: "Home",
  components:{
    Tail
  },
  data(){
    return{
      navList: [
        { index: "/Intro", name:"Intro", navItem: "首页" },
        { index: "/Research", name:"Research", navItem: "研究方向" },
        { index: "/Harvest", name:"Harvest", navItem: "论文专利" },
        { index: "/Numbers", name:"Numbers", navItem: "成员" },
      ],
    }
  }
}
</script>

<style>
body{
  margin:0;
  padding:0;
}
.content {
  /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
  width: 90%;
  margin: 0 auto;
  min-height: 700px;
  padding: 20px 15px;
  text-align: left;
}
.markdown-body {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  margin: 0 auto !important;
  line-height: 1.5;
  color: #24292e;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}
.edit-box{
  margin-top: 20px;
}
.el-menu{
  top: 0;
  width: 100%;
}
.el-main{
  margin-top: 0px;
  padding: 0px !important;
}
.common-layout{
  height: 100vh;
  overflow-x: hidden;
}

</style>