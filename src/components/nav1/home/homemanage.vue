<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="轮播图管理" name="banner">
      <home-banner></home-banner>
    </el-tab-pane>
    <el-tab-pane label="推荐管理" name="recomment">
      <home-recomment></home-recomment>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import HomeBanner from './homemanage-banner';
  import HomeRecomment from './homemanage-recomment';
  export default {
    components:{
      'home-banner': HomeBanner,
      'home-recomment': HomeRecomment
    },
    data() {
      return {
        activeName: 'banner'
      }
    },
    methods: {
      handleClick(tab, event) {
        this.$router.push({ path: '/nav1/home/manage/' + this.activeName});
      },
      routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/home/manage/banner'){
          this.activeName = 'banner';
        }else if(currentPath == '/nav1/home/manage/recomment'){
          this.activeName = 'recomment';
        }
      }
    },
    mounted() {
      this.routeChange();
    }
  }
</script>