<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="发送消息" name="create">
      <system-create></system-create>
    </el-tab-pane>
    <el-tab-pane label="消息管理" name="list">
      <system-list></system-list>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import SystemCreate from './system-create';
  import SystemList from './system-list';
  export default {
    components:{
      'system-create': SystemCreate,
      'system-list': SystemList
    },
    data() {
      return {
        activeName: 'create'
      }
    },
    methods: {
      handleClick(tab, event) {
        this.$router.push({ path: '/nav1/information/system/' + this.activeName});
      },
      routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/information/system/create'){
          this.activeName = 'create';
        }else if(currentPath == '/nav1/information/system/list'){
          this.activeName = 'list';
        }
      }
    },
    mounted() {
      this.routeChange();
    }
  }
</script>