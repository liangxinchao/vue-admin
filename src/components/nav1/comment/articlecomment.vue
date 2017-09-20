<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="文章评论" name="list">
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
  import ArticleList from './articlecomment-list';
  import ArticleReport from './articlecomment-report';
  import ArticleUnline from './articlecomment-unline';
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
        this.$router.push({ path: '/nav1/comment/article/' + this.activeName});
      },
      routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/comment/article/list'){
          this.activeName = 'list';
        }else if(currentPath == '/nav1/comment/article/report'){
          this.activeName = 'report';
        }else if(currentPath == '/nav1/comment/article/unline'){
          this.activeName = 'unline';
        }
      }
    },
    mounted() {
      this.routeChange();
    }
  }
</script>