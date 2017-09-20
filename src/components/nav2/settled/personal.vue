<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="入驻用户" name="settled">
      <settled-user></settled-user>
    </el-tab-pane>
    <el-tab-pane label="迁出用户" name="moveout">
      <moveout-user></moveout-user>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import SettledUser from './personal-settled';
  import MoveoutUser from './personal-moveout';
  export default {
    components:{
      'settled-user': SettledUser,
      'moveout-user': MoveoutUser
    },
    data() {
      return {
        activeName: 'settled'
      }
    },
    methods: {
      handleClick(tab, event) {
        this.$router.push({ path: '/nav2/settled/personal/' + this.activeName});
      },
      routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav2/settled/personal/settled'){
          this.activeName = 'settled';
        }else if(currentPath == '/nav2/settled/personal/moveout'){
          this.activeName = 'moveout';
        }
      }
    },
    mounted() {
      this.routeChange();
    }
  }
</script>


