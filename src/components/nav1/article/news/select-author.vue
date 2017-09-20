<template>  
  <el-tabs v-model="activeName" type="border-card">
    <el-tab-pane label="外部媒体" name="first" class="firstTab">
      <el-button class="created" @click="createMedia">创建媒体</el-button>
      <authormedia></authormedia>
    </el-tab-pane>
    <el-tab-pane label="系统用户" name="second">
      <authorother></authorother>
    </el-tab-pane>
  </el-tabs> 
</template>

<script>
  import authormedia from './select-author-media';
  import authorother from './select-author-other';
  export default {
    name: 'newslist',
    components:{
      authormedia,
      authorother
    },
    data() {
      return {
      	activeName: 'first',
      }
    },
    methods:{
      createMedia(){
        this.$router.push({ path: '/nav1/article/news/createmedia' });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .firstTab{ position:relative;
    .created{ position:absolute; top:0; left:0; }
  }
</style>
