<template> 
  <div class="newslist">
    <el-tabs v-model="activeState" type="border-card" class="tab" @tab-click="handleClick">
      <el-tab-pane label="已发布" name="published">
        <news-published></news-published>
      </el-tab-pane>
      <el-tab-pane label="草稿" name="draft">
        <news-draft></news-draft>
      </el-tab-pane>
      <el-tab-pane label="已下架" name="unline">
        <news-unline></news-unline>
      </el-tab-pane>
    </el-tabs>
    <el-button class="created" @click="newscreate">创建</el-button>
  </div>
</template>

<script>
  import NewsPublished  from './news-published';
  import NewsDraft from './news-draft';
  import NewsUnline from './news-unline';
  export default {
    components:{
      'news-published': NewsPublished,
      'news-draft': NewsDraft,
      'news-unline': NewsUnline
    },
    data() {
      return {
      	activeState: 'published'
      }
    },
    methods: {
      newscreate() {
        this.$router.push({ path: '/nav1/article/news/newscreate' });
      },
      handleClick(tab, event) {
        this.$router.push({ path: '/nav1/article/news/newslist/' + this.activeState});
      },
      routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/article/news/newslist/published'){
          this.activeState = 'published';
        }else if(currentPath == '/nav1/article/news/newslist/draft'){
          this.activeState = 'draft';
        }else if(currentPath == '/nav1/article/news/newslist/unline'){
          this.activeState = 'unline';
        }
      }
    },
    mounted() {
      this.routeChange();
    }
  }
</script>

<style lang="scss" scoped>
  .newslist{ position:relative;
    .created{ position:absolute; top:4px; right:25px; z-index:99; }
  }
</style>
