<template>
	<el-tabs v-model="activeName" type="border-card">
    <el-tab-pane label="管理" name="first" v-if="firstShow">
    	<activityManage></activityManage>
    </el-tab-pane>
    <el-tab-pane label="编辑" name="second" v-if="secondShow">
    	<activityEditor></activityEditor>
    </el-tab-pane>
    <el-tab-pane label="名单" name="third" v-if="thirdShow">
      <activityList></activityList>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import activityApi from '@/js/api.js';
	import activityManage from './activitymanage-manage';
	import activityEditor from './activitymanage-editor';
  import activityList from './activitymanage-list';
  export default {
  	components:{
			activityManage,
			activityEditor,
      activityList
		},
    data() {
			return {
				activeName: 'first',
        firstShow: true,
        secondShow: true,
        thirdShow: true
			}
		},
    mounted() {
      const activityId = localStorage.getItem('activityId');
      activityApi.activity.postDetail(activityId).then(res => {
        let state = res.data.state;
        if(state == '0'){
          this.activeName = 'second';
          this.firstShow = false;
          this.secondShow = true;
          this.thirdShow = false;
        }else if(state == '1'){
          this.activeName = 'first';
          this.firstShow = true;
          this.secondShow = false;
          this.thirdShow = false; 
        }else if(state == '10'){
          this.activeName = 'first';
          this.firstShow = true;
          this.secondShow = false;
          this.thirdShow = true; 
        }else{
          this.activeName = 'first';
          this.firstShow = true;
          this.secondShow = true;
          this.thirdShow = true; 
        }
      })
    }
  }
</script>