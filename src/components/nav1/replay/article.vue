<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="文章评论回复" name="list">
      <article-list></article-list>
    </el-tab-pane>
    <el-tab-pane label="举报管理" name="report">
      <article-report></article-report>
    </el-tab-pane>
    <el-tab-pane label="已下架" name="unline">
      <article-unline></article-unline>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import ArticleList from './article-list';
  import ArticleReport from './article-report';
  import ArticleUnline from './article-unline';
  export default {
    components:{
      'article-list': ArticleList,
      'article-report': ArticleReport,
      'article-unline': ArticleUnline
    },
    data() {
      return {
        activeName: 'list'
      }
    },
    methods: {
      handleClick(tab, event) {
        this.$router.push({ path: '/nav1/replay/article/' + this.activeName});
      },
      routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/replay/article/list'){
          this.activeName = 'list';
        }else if(currentPath == '/nav1/replay/article/report'){
          this.activeName = 'report';
        }else if(currentPath == '/nav1/replay/article/unline'){
          this.activeName = 'unline';
        }
      }
    },
    mounted() {
      this.routeChange();
    }
  }
</script>