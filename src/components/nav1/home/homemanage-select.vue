<template>  
  <el-tabs v-model="activeName" type="border-card">
    <el-tab-pane label="选择文章" name="selarticle" class="firstTab">
      <selecanews></selecanews>
    </el-tab-pane>
    <el-tab-pane label="选择活动" name="selacti">
      <selecacti></selecacti>
    </el-tab-pane>
  </el-tabs> 
</template>

<script>
  import selecacti from './homemanage-select-activity';
  import selecanews from './homemanage-select-article';

  export default {
    name: 'newslist',
    components:{
      selecacti,
      selecanews
    },
    data() {
      return {
      	activeName: 'selarticle',
      }
    },
    methods:{
      handleClick(tab, event) {
        this.$router.push({ path: '/nav1/home/manage/' + this.activeName});
      },
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .firstTab{ position:relative;
    .created{ position:absolute; top:0; left:0; }
  }
</style>
