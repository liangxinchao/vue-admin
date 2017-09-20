<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="推送消息" name="create">
      <push-create></push-create>
    </el-tab-pane>
    <el-tab-pane label="已发推送" name="list">
      <push-list></push-list>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import PushCreate from './push-create';
  import PushList from './push-list';
  export default {
    components:{
      'push-create': PushCreate,
      'push-list': PushList
    },
    data() {
      return {
        activeName: 'create'
      }
    },
    methods: {
      handleClick(tab, event) {
        this.$router.push({ path: '/nav1/information/push/' + this.activeName});
      },
      routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/information/push/create'){
          this.activeName = 'create';
        }else if(currentPath == '/nav1/information/push/list'){
          this.activeName = 'list';
        }
      }
    },
    mounted() {
      this.routeChange();
    }
  }
</script>