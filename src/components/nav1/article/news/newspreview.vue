<template>
  <div class="m-form">
    <div class="form-content">
      <header class="cntheader">
        <h1 class="cTitle">{{newsData.title}}</h1>
        <p class="newsinfo">
          <span>作者：{{newsData.author}}</span>
          <span>发布时间：{{newsData.update}}</span>
        </p>
      </header>
      <div class="content" id="newscontent"></div>
      <el-button @click="backPage">返回</el-button>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import newsApi from '@/js/api.js';
  import functionApi from '@/js/function.js';
  export default {
    data () {
      return {
        newsData: {}
      }
    },
    methods:{
      backPage: function(){
        this.$router.go(-1);
      }
    },
    mounted: function(){
      const newsId = localStorage.getItem('newsId');
      newsApi.news.postEdit(newsId).then(res => {
        this.newsData = res.data;
        this.newsData.author = this.newsData.author.name;
        this.newsData.update = functionApi.moment.getListTime(this.newsData.update);
        $('#newscontent').load(this.newsData.content);
      });
    }
  }
</script>

<style lang="scss" scoped>
  .form-content{ box-sizing:border-box; width:100%; margin:0 auto; padding:20px 30px;
    .cntheader{ display:block;
      .cTitle{ text-align:left; margin:0; height:36px; line-height:25px; font-size:16px; font-weight:bold; color:#333; }
      .newsinfo{ height:24px; line-height:24px;
        span{ display:inline-block; margin-right:20px; }
      }
    }
  }
</style>