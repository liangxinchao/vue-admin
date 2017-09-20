<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="企业用户" name="user">
      <enterprise-user></enterprise-user>
    </el-tab-pane>
    <el-tab-pane label="认证企业" name="approve">
      <enterprise-approve></enterprise-approve>
    </el-tab-pane>
    <el-tab-pane label="园区企业" name="park">
      <enterprise-park></enterprise-park>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import EnterpriseUser from './enterprise-user';
  import EnterpriseApprove from './enterprise-approve';
  import EnterprisePark from './enterprise-park';
  export default {
    components:{
      'enterprise-user': EnterpriseUser,
      'enterprise-approve': EnterpriseApprove,
      'enterprise-park': EnterprisePark
    },
    data() {
      return {
        activeName: 'user'
      }
    },
    methods: {
      handleClick(tab, event) {
        // this.$router.push({ path: '/nav2/account/personal/' + this.activeName});
      },
      routeChange() {
        // let currentPath = window.location.pathname;
        // if(currentPath == '/nav2/account/personal/personal'){
        //   this.activeName = 'personal';
        // }else if(currentPath == '/nav2/account/personal/park'){
        //   this.activeName = 'park';
        // }
      }
    },
    mounted() {
      // this.routeChange();
    }
  }
</script>