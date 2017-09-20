<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" label="right" class="manageForm">
    	<p class="model">基本信息</p>
    	<p class="info">
    		<label>文章标题：</label><span>{{title}}</span>
 			</p>
 			<p class="info">
    		<label>文章作者：</label><span>{{author}}</span>
 			</p>
 			<p class="info">
    		<label>文章编辑：</label><span></span>
 			</p>
 			<p class="info">
    		<label>文章类型：</label><span>{{style}}</span>
 			</p>
 			<p class="info">
    		<label>发布时间：</label><span>{{newsPunTime}}</span>
 			</p>
 			<p class="info">
    		<label>文章状态：</label><span>{{newsState}}</span>
 			</p>
 			<p class="model">举报人信息</p>
    	<p class="info">
    		<label>举报人：</label><span>{{checkname}} </span>
 			</p>
 			<p class="info">
    		<label>企业名称：</label><span></span>
 			</p>
 			<p class="info">
    		<label>企业邮箱：</label><span></span>
 			</p>
 			<p class="info">
    		<label>联系电话：</label><span></span>
 			</p>
 			<p class="info">
    		<label>举报原因：</label><span>{{content}}</span>
 			</p>
 			<p class="model">处理信息</p>
 			<p class="info">
 				<label>审核人：</label><span>{{reviewname}} </span>
 			</p>
 			</p>
 			<p class="info" v-if="newsData.state!='0'">
    		<label>处理时间：</label><span>{{checktime}}</span>
 			</p>
 			<p class="info" v-if="newsData.state!='0'">
    		<label>处理结论：</label><span>{{newsData.state=='2'?'驳回':'下架'}}</span>
 			</p>
	 		<el-form-item label="处理结论：" prop="result" v-if="newsData.state=='0'">
		    <el-radio-group v-model="form.result">
		      <el-radio label="1">驳回</el-radio>
		      <el-radio label="0">下架</el-radio>
		    </el-radio-group>
  		</el-form-item >
	  	<p class="info" v-if="newsData.state!='0'">
    		<label>处理说明：</label><span>{{newsData.remark}}</span>
 			</p>
 			<el-form-item label="处理说明：" prop="remark" v-if="newsData.state=='0'">
		    <el-input type="textarea" v-model="form.remark"></el-input>
		  </el-form-item>
			<el-form-item class="btn-wrap">
				<el-button type="primary" @click.prevent="submitForm('form')" v-if="newsData.state=='0'">保存</el-button>
				<el-button @click="cancel" v-if="newsData.state=='0'">取消</el-button>
				<el-button @click="cancel" v-if="newsData.state!=='0'">返回</el-button>
			</el-form-item>
    </el-form>
  </div>
</template>

<script>
	import newsApi from '@/js/api.js';
	import functionApi from '@/js/function.js';
  export default {
    data() {
			return {
				newsData: {},
				author:'',	
				title:'',
				content:'',
				style:'',
				newsState:'',
				newsPunTime:'',
				reviewname:"",
				checkname:'',
				checktime:'',
				form:{
					result:'',
					remark:''
				},
				rules:{
					result: [
            { required: true, message: '请选择处理', trigger: 'change' }
          ],
           remark: [
            { required: true, message: '处理说明', trigger: 'blur' }
          ]
				}
			}
		},
		methods: {
		 	submitForm(formName) {
	      this.$refs[formName].validate((valid) => {
	        if (valid) {
	        	this.form.id=this.newsData.id;
	       	console.log(this.form);
	          newsApi.news.reportCheck(this.form).then(res => {
	          	console.log(res.data)
	          })
	        } else {
	          return false;
	        }
	      });
     	},
      cancel() {
      	this.$router.go(-1);
      },
			beforeMounted() {
				const newsId = localStorage.getItem('newsId');
				let reportDetail = {id:newsId};
				console.log(reportDetail);
				newsApi.news.reportDetail(reportDetail).then(res => {
					const stateLists = ['城市创业', '行业资讯', '创业公司', '创业资讯'];
					this.newsData = res.data;
					this.title = this.newsData.target.title;
					this.author = this.newsData.target.account.name;
					this.content = this.newsData.content;
					this.reviewname=this.newsData.reviewer.name;
					this.checkname=this.newsData.account.name;
					console.log(this.newsData);
					//this.newsData.account = this.newsData.account.name;
					if(this.newsData.target.type == '0'){
						this.style = '城市创业';
					}else if(this.newsData.style == '1'){
						this.style = '行业资讯';
					}else if(this.newsData.type == '2'){
						this.style = '创业公司';
					}else if(this.newsData.style == '3'){
						this.style = '创业资讯';
					}
					if(this.newsData.target.state == "3"){
						this.newsState = "已发布"
					}else if(this.newsData.target.state == '7'){
						this.newsState = "已下架"
					}
					this.newsPunTime = functionApi.moment.getListTime(this.newsData.target.updated);
					this.checktime = functionApi.moment.getListTime(this.newsData.updated);
				})
			}
    },
		mounted() {
			this.beforeMounted();
		}
  }
</script>

<style lang="scss" scoped>
	.manageForm{ margin:20px; width:60%; min-width:600px;
		.info{ margin-bottom:20px; font-size:14px; color:rgb(72, 87, 106); line-height:26px; vertical-align:middle; 
			label{ display:inline-block; width:85px; text-align:right; }
		} 
		.model{ font-weight:bold; color:#20a0ff; border-left:3px solid #20a0ff; padding:1px 12px; }
		.btn-wrap{ margin-top:50px; text-align:center; width:100%; }
	}
</style>