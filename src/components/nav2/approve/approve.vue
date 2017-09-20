<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="待审核" name="nocheck">
      <approve-nocheck></approve-nocheck>
    </el-tab-pane>
    <el-tab-pane label="已审核" name="check">
      <approve-check></approve-check>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import ApproveNocheck from './approve-nocheck';
  import ApproveCheck from './approve-check';
  export default {
    components:{
      'approve-nocheck': ApproveNocheck,
      'happrove-check': ApproveCheck
    },
    data() {
      return {
        activeName: 'nocheck'
      }
    },
    methods: {
      handleClick(tab, event) {
        this.$router.push({ path: '/nav2/approve/manage/' + this.activeName});
      },
      routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav2/approve/manage/nocheck'){
          this.activeName = 'nocheck';
        }else if(currentPath == '/nav2/approve/manage/check'){
          this.activeName = 'check';
        }
      }
    },
    mounted() {
      this.routeChange();
    }
  }
</script>