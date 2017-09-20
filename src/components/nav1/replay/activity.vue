<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="活动评论回复" name="list">
      <activity-list></activity-list>
    </el-tab-pane>
    <el-tab-pane label="举报管理" name="report">
      <activity-report></activity-report>
    </el-tab-pane>
    <el-tab-pane label="已下架" name="unline">
      <activity-unline></activity-unline>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import ActivityList from './activity-list';
  import ActivityReport from './activity-report';
  import ActivityUnline from './activity-unline';
  export default {
    components:{
      'activity-list': ActivityList,
      'activity-report': ActivityReport,
      'activity-unline': ActivityUnline
    },
    data() {
      return {
        activeName: 'list'
      }
    },
    methods: {
      handleClick(tab, event) {
        this.$router.push({ path: '/nav1/replay/activity/' + this.activeName});
      },
      routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/replay/activity/list'){
          this.activeName = 'list';
        }else if(currentPath == '/nav1/replay/activity/report'){
          this.activeName = 'report';
        }else if(currentPath == '/nav1/replay/activity/unline'){
          this.activeName = 'unline';
        }
      }
    },
    mounted() {
      this.routeChange();
    }
  }
</script>