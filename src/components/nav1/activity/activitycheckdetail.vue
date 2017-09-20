<template>
  <div>
    <el-tabs v-model="activeName2" type="border-card">
	    <el-tab-pane label="审核" name="first">
				<activitycheck></activitycheck>
	    </el-tab-pane>
	    <el-tab-pane label="编辑" name="second" v-if="isReview">
				<activitydeitor></activitydeitor>
	    </el-tab-pane>
	  </el-tabs>
  </div>
</template>

<script>
	import activitycheck from './activitycheckdetail-check'
	import activitydeitor from './activitymanage-editor'
	import activityApi from '@/js/api.js';
	export default {
		data() {
			return {
	      activeName2: 'first',
				isReview: true
      }
		},
		components:{
			activitycheck,
			activitydeitor
		},
		methods:{	
		},
		mounted() {
			const activityId = localStorage.getItem('activityId');
			activityApi.activity.postActivityReviewInfo({id: activityId}).then(res => {
				console.log("审核是否通过"+res.data.isPass)
				if(res.data.isPass){
					if(res.data.isPass==0){
						this.isReview = false;
					}else{
						this.isReview = true;
					}
				}else{
					this.isReview = true;
				}
			})
		}
	}
</script>
