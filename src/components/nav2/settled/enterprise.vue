<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="待审核" name="nocheck">
      <enterprise-nocheck></enterprise-nocheck>
    </el-tab-pane>
    <el-tab-pane label="已审核" name="check">
      <enterprise-check></enterprise-check>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import EnterpriseNocheck from './enterprise-nocheck';
  import EnterpriseCheck from './enterprise-check';
  export default {
    components:{
      'enterprise-nocheck': EnterpriseNocheck,
      'enterprise-check': EnterpriseCheck
    },
    data() {
      return {
        activeName: 'nocheck'
      }
    },
    methods: {
      handleClick(tab, event) {
        this.$router.push({ path: '/nav2/settled/enterprise/' + this.activeName});
      },
      routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav2/settled/enterprise/nocheck'){
          this.activeName = 'nocheck';
        }else if(currentPath == '/nav2/settled/enterprise/check'){
          this.activeName = 'check';
        }
      }
    },
    mounted() {
      this.routeChange();
    }
  }
</script>