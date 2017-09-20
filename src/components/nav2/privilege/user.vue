<template>
  <el-tabs v-model="activeName" type="border-card">
    <el-tab-pane label="用户组管理" name="manage">
      <user-manage></user-manage>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import UserManage from './user-manage';
  export default {
    components:{
      'user-manage': UserManage
    },
    data() {
      return {
        activeName: 'manage'
      }
    }
  }
</script>