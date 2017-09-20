<template>
  <div>
  <p class="model">基本信息</p>
  	<div class="Info-wrap">
  		<img :src="activityData.cover" class="activity-img">
  		<div class="info-content">
  			<p class="info">
					<label>标题：</label><span @click="gopreview" class="activity-title">{{activityData.title}}</span>
      	</p>
      	<p class="info">
        	<label>时间：</label><span>{{activityData.ActivityTime}}</span>
      	</p>
      	<p class="info">
					<label>报名：</label><span><span>截至到</span> {{activityData.enOfEnrollment}}</span>
      	</p>
      	<p class="info">
        	<label>地点：</label><span>{{activityData.location}}</span>
      	</p>
      	<p class="info">
					<label>限额：</label><span>{{activityData.numberOfExpected}}</span>
      	</p>
      	<p class="info">
					<label>主办：</label><span>{{activityData.sponsor}}</span>
      	</p>
      	<p class="info" v-if="activityData.coSponsor!=''">
					<label>协办：</label><span>{{activityData.coSponsor}}</span>
      	</p>
      	<p class="info">
					<label>主题：</label><span>{{activityData.subject}}</span>
      	</p>
      	<p class="info">
					<label>形式：</label><span>{{activityData.pattern}}</span>
      	</p>
      	<p class="info">
					<label>费用：</label><span>{{activityData.cost=='0'?'免费':'收费'}}</span>
      	</p>
      	<p class="info">
					<label>隐私：</label><span>{{activityData.privacy=='0'?'公开':'隐私'}}</span>
      	</p>
      	<p class="info">
					<label>联系人：</label><span>{{activityData.contact}}</span>
      	</p>
      	<p class="info">
					<label>电话：</label><span>{{activityData.phonenumber}}</span>
      	</p>
  		</div>
  	</div>
    <p class="model">审核信息</p>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  label="right">
      <el-form-item label="审核人：" v-if="checkData.isPass">
				<span>{{checkData.account.name}}</span>
			</el-form-item>
     	<el-form-item label="审核时间：" v-if="checkData.isPass">	 		
				<span>{{checkData.reviewTime}}</span>
			</el-form-item>
		  <el-form-item label="审核结果：" prop="isPass">
        <el-radio-group v-model="ruleForm.isPass">
          <el-radio label="0" :disabled="disableShow">通过</el-radio>
          <el-radio label="1" :disabled="disableShow">驳回</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注：" class="content-wrap" v-if="ruleForm.isPass == 0">
        <el-input type="textarea" v-model="ruleForm.content" class="content"></el-input>
      </el-form-item>
      <el-form-item label="审核意见：" prop="content" class="content-wrap"  v-if="ruleForm.isPass == 1">
        <el-input type="textarea" v-model="ruleForm.content"  class="content"></el-input>
      </el-form-item>
      <el-form-item class="btn-wrap">
        <el-button type="primary" @click="submitForm('ruleForm')" v-if="checkData.isPass=='1'||!disableShow" class="check-btn">审核</el-button>
				<el-button type="primary" class="check-btn" v-if="checkData.isPass=='0'" @click="handleManage">管理活动</el-button>
        <el-button class="btn-back" @click="backTo">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
	import activityApi from '@/js/api.js';
  import functionApi from '@/js/function.js';
	export default {
		data() {
			return {
				disableShow: "",
				ruleForm: {
          isPass: '',
          content: ''
        },
				rules: {
          isPass: [{ required: true, message: '请选择审核意见', trigger: 'change' }],
          content: [{ required: true, message: '请填写备注', trigger: 'blur' }]
        },
				activityData: {},
				checkData: {}
	    }
		},
		methods:{
			submitForm(ruleForm) {	
        this.$refs['ruleForm'].validate((valid) => {
          if(valid){	
						this.ruleForm.activityId = this.activityData.id;
						 activityApi.activity.postPass(this.ruleForm).then(res => {
						 	this.$message.success('审核成功!');
								this.$router.push({path:'/nav1/activity/activityaudit/check'})
						 })
          }else{
            return false;
          }
        });
      },
      gopreview() {
      	localStorage.removeItem('previewData');
      	this.$router.push({ path: '/nav1/activity/activitylist/preview' });
      },
			handleManage() {
				this.$router.push({path:'/nav1/activity/activitylist/manage'});
			},
     	backTo() {
     		this.$router.go(-1)
     	}
		},
		mounted() {
			const activityId = localStorage.getItem('activityId');
			activityApi.activity.postActivityReviewInfo({id:activityId}).then(res => {
				this.checkData = res.data;
				if(this.checkData.isPass){
					console.log(this.checkData.isPass)
				this.ruleForm.isPass = this.checkData.isPass;
				this.ruleForm.content = this.checkData.content;
				this.checkData.reviewTime = functionApi.moment.getListTime2(this.checkData.reviewTime);
				
				}else{
					
				}
			})
			activityApi.activity.postDetail(activityId).then(res => {
				this.activityData = res.data;
				console.log(this.activityData);
				if(this.activityData.isReview=='0'){
					this.disableShow = false
				}else{
					this.disableShow = true
				}
				let startDate = functionApi.moment.getDateFormate(this.activityData.startOfActivity);
				let endDate = functionApi.moment.getDateFormate(this.activityData.endOfActivity);
				if(startDate == endDate){
					this.activityData.ActivityTime = functionApi.moment.getYMDHM(this.activityData.startOfActivity) + '-' + functionApi.moment.getHM(this.activityData.endOfActivity);
				}else{
					this.activityData.ActivityTime = functionApi.moment.getYMDHM(this.activityData.startOfActivity) + '-' + functionApi.moment.getYMDHM(this.activityData.endOfActivity);
				}
				if(this.activityData.numberOfExpected==-1){
					this.activityData.numberOfExpected = "不限制人数";
				}
				this.activityData.enOfEnrollment = functionApi.moment.getYMDHM(this.activityData.enOfEnrollment);
				this.activityData.location = this.activityData.location.province + '·' + this.activityData.location.city + '·' + this.activityData.location.area;
				this.activityData.sponsor =	this.activityData.sponsor.join(',');
				if(this.activityData.coSponsor != []){
					this.activityData.coSponsor =	this.activityData.coSponsor.join(',');
				}else{
					this.activityData.coSponsor =	'';
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.model{ font-weight:bold; color:#20a0ff; border-left:3px solid #20a0ff; padding:1px 12px; }
	.Info-wrap{ display:flex; margin-left:15px;
		.activity-img{ width:276px; height:386px; }
		.info-content{ margin-left:44px; color:rgb(72, 87, 106);
			.info{ margin:15px 0;
				&:nth-child(1){ margin-top:0; }
			}
		}
	}
	.activity-title{color:#20a0ff}
	.content-wrap{
		.content{ width:600px;}
	}
	.btn-wrap{ width:100%; text-align:center; padding-top:30px;
		.btn-back{ margin-left:50px; width:130px; }
		.check-btn{ width:130px; }
	}
</style>
