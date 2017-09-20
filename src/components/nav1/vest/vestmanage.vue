<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="马甲列表" name="list">
      <vest-list></vest-list>
    </el-tab-pane>
    <el-tab-pane label="已停用" name="disabled">
      <vest-disabled></vest-disabled>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import VestList from './vestmanage-list';
  import VestDisabled from './vestmanage-disabled';
  export default {
    components:{
      'vest-list': VestList,
      'vest-disabled': VestDisabled
    },
    data() {
      return {
        activeName: 'list'
      }
    },
    methods: {
      handleClick(tab, event) {
        this.$router.push({ path: '/nav1/vest/vestmanage/' + this.activeName});
      },
      routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/vest/vestmanage/list'){
          this.activeName = 'list';
        }else if(currentPath == '/nav1/vest/vestmanage/disabled'){
          this.activeName = 'disabled';
        }
      }
    },
    mounted() {
      this.routeChange();
    }
  }
</script>