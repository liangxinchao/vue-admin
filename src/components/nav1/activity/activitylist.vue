<template>
  <div class="activitylist">
    <el-tabs v-model="activeState" type="border-card" class="tab" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all">
        <activity-all></activity-all>
      </el-tab-pane>
      <el-tab-pane label="已上架" name="online">
        <activity-online></activity-online>
      </el-tab-pane>
      <el-tab-pane label="已取消" name="cancel">
        <activity-cancel></activity-cancel>
      </el-tab-pane>
      <el-tab-pane label="已下架" name="unline">
        <activity-unline></activity-unline>
      </el-tab-pane>
      <el-tab-pane label="草稿" name="draft">
        <activity-draft></activity-draft>
      </el-tab-pane>
    </el-tabs>
    <el-button class="created" @click="activitycreate">创建</el-button>
  </div>
</template>

<script>
  import ActivityAll  from './activitylist-all';
  import ActivityOnline from './activitylist-online';
  import ActivityCancel from './activitylist-cancel';
  import ActivityUnline from './activitylist-unline';
  import ActivityDraft from './activitylist-draft';
  export default {
    components:{
      'activity-all': ActivityAll,
      'activity-online': ActivityOnline,
      'activity-cancel': ActivityCancel,
      'activity-unline': ActivityUnline,
      'activity-draft': ActivityDraft
    },
    data() {
      return {
      	activeState: 'all'
      }
    },
    watch: {
      '$route': function (to, from) {
        if(to.path == '/nav1/activity/activitylist/all'){
          this.activeState = 'all';
        }else if(to.path == '/nav1/activity/activitylist/online'){
          this.activeState = 'online';
        }else if(to.path == '/nav1/activity/activitylist/cancel'){
          this.activeState = 'cancel';
        }else if(to.path == '/nav1/activity/activitylist/unline'){
          this.activeState = 'unline';
        }else if(to.path == '/nav1/activity/activitylist/draft'){
          this.activeState = 'draft';
        }
      }
    },
    methods: { 
      activitycreate() {
        localStorage.removeItem('previewId');
        localStorage.removeItem('previewData');
        this.$router.push({ path: '/nav1/activity/activitylist/create' });
      },
      handleClick(tab, event) {
        this.$router.push({ path: '/nav1/activity/activitylist/' + this.activeState});
      },
      routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/activity/activitylist/all'){
          this.activeState = 'all';
        }else if(currentPath == '/nav1/activity/activitylist/online'){
          this.activeState = 'online';
        }else if(currentPath == '/nav1/activity/activitylist/cancel'){
          this.activeState = 'cancel';
        }else if(currentPath == '/nav1/activity/activitylist/unline'){
          this.activeState = 'unline';
        }else if(currentPath == '/nav1/activity/activitylist/draft'){
          this.activeState = 'draft';
        }
      }
    },
    mounted() {
      this.routeChange();
    }
  }
</script>

<style lang="scss" scoped>
  .activitylist{ position:relative;
    .created{ position:absolute; top:4px; right:25px; z-index:99; }
  }
</style>
