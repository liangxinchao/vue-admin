<template>
  <div class="reportlist">
    <el-tabs v-model="activeState" type="border-card"  class="tab" @tab-click="handleClick"> 
      <el-tab-pane label="未处理" name="nohandle">
      <nohandle></nohandle>
      </el-tab-pane>
      <el-tab-pane label="已处理" name="handle">
        <handle></handle>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import handle from './reportlist-handle';
  import nohandle from './reportlist-nohandle';
  export default {
    name: 'reportlist',
    components: {
      handle,
      nohandle
    },
    data() {
      return {
        activeState: 'nohandle'
      }
    },
    methods:{
      handleClick(tab, event) {
        this.$router.push({ path: '/nav1/article/report/reportlist/' + this.activeState});
      },
      routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/article/report/reportlist/handle'){
          this.activeState = 'handle';
        }else if(currentPath == '/nav1/article/report/reportlist/nohandle'){
          this.activeState = 'nohandle';
        }
      }
    },
    mounted() {
      this.routeChange()
    }
  }
</script>
