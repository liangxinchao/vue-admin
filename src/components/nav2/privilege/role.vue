<template>
  <el-tabs v-model="activeName" type="border-card">
    <el-tab-pane label="角色管理" name="manage">
      <role-manage></role-manage>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import RoleManage from './role-manage';
  export default {
    components:{
      'role-manage': RoleManage
    },
    data() {
      return {
        activeName: 'manage'
      }
    }
  }
</script>