<template>
  <el-tabs v-model="activeName" type="border-card">
    <el-tab-pane label="基本信息" name="first">
      <basic-info></basic-info>
    </el-tab-pane>
    <el-tab-pane label="教育经历" name="second">
      <edu-experience></edu-experience>
    </el-tab-pane>
    <el-tab-pane label="职业经历" name="third">
      <job-experience></job-experience>
    </el-tab-pane>
    <el-tab-pane label="入驻信息" name="four">
      <settled-info></settled-info>
    </el-tab-pane>
    <el-tab-pane label="用户权限" name="five">
      <user-rights></user-rights>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import BasicInfo from './personal-manage-info';
  import EduExperience from './personal-manage-edu';
  import JobExperience from './personal-manage-job';
  import SettledInfo from './personal-manage-settled';
  import UserRights from './personal-manage-rights';
  export default {
    components:{
      "basic-info": BasicInfo,
      "edu-experience": EduExperience,
      "job-experience": JobExperience,
      "settled-info": SettledInfo,
      "user-rights": UserRights
    },
    data() {
      return {
        activeName: 'first'
      }
    }
  }
</script>