<template>
  <div class="report-detail">
  <p class="model">活动信息</p>
    <div class="Info-wrap">
      <div class="info-content">
        <p class="info">
          <label>活动标题：</label><span>{{title}}</span>
        </p>
        <p class="info">
          <label>发 布 者：</label><span>{{username}}</span>
        </p>
        <p class="info">
          <label>活动时间：</label><span>{{ActivityTime}}</span>
        </p>
        <p class="info">
          <label>报名时间：</label><span>{{enrollTime}}</span>
        </p>
        <p class="info">
          <label>主办单位：</label><span>{{sponsor}}</span>
        </p>
        <p class="info">
          <label>协办单位：</label><span>{{coSponsor}}</span>
        </p>
        <p class="info">
          <label>活动限额：</label><span>{{numberOfExpected}}人</span>
        </p>
        <p class="info">
          <label>报名人数：</label><span>{{enrollCount}}人</span>
        </p>
        <p class="info">
          <label>活动状态：</label><span>{{state}}</span>
        </p>
      </div>
    </div>
    <p class="model">举报人信息</p>
    <div class="Info-wrap">
      <div class="info-content">
        <p class="info">
          <label>举报人：</label><span>{{reportusername}}</span>
        </p>
        <p class="info">
          <label>企业名称：</label><span>{{reportDetail.name}}</span>
        </p>
        <p class="info">
          <label>联系邮箱：</label><span>{{reportDetail.email}}</span>
        </p>
        <p class="info">
          <label>联系电话：</label><span>{{reportDetail.phone}}</span>
        </p>
        <p class="info">
          <label>举报原因：</label><span>{{reportDetail.content}}</span>
        </p>
      </div>
    </div>
     <p class="model">处理信息</p>
     <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
      <div v-if="disableShow">
        <p class="info1">
          <label>处理人：</label><span>{{reviewusername}}</span>
        </p>
        <p class="info1">
          <label>处理时间：</label><span>{{reviewTime}}</span>
        </p>
      </div>
      <el-form-item label="处理结论：" prop="result">
        <el-radio-group v-model="ruleForm.result">
        <el-radio label="0" :disabled="disableShow">驳回</el-radio>
          <el-radio label="1" :disabled="disableShow">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="处理说明：" prop="content" class="txt">
        <el-input type="textarea" v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item class="btn-wrap">
        <el-button type="primary" @click="submitForm('ruleForm')" class="check-btn" v-if="reportDetail.isReview=='0'?true:false">保存</el-button>
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
        reportDetail: {},
        title: "",
        username: "",
        ActivityTime: '',
        reviewTime: '',
        reviewusername: '',
        enrollTime: '',
        sponsor: '',
        enrollCount: '',
        coSponsor: '',
        numberOfExpected: '',
        reportusername: "",
        content: '',
        state: '',
        ruleForm: {
          result: '',
          content: ''
        },
        disableShow:'',
        rules: {
          result: [{ required: true, message: '请选择处理结论', trigger: 'change' }],
          content: [{ required: true, message: '请填写处理说明', trigger: 'blur' }]
        }
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid){
            this.ruleForm.id = this.reportDetail.id;
            activityApi.activity.postReportReview(this.ruleForm).then(res => {
            this.$message.success('处理成功!');
            this.$router.push({path:'/nav1/activity/reportmanage/handle'})
           })
          }else{
            return false;
          }
        });
      },
      backTo() {
        this.$router.go(-1);
      }
    },
    mounted() {
      let id = localStorage.getItem('reportId');
      activityApi.activity.postReportDetail({id:id}).then(res => {
        this.reportDetail = res.data;
        console.log(this.reportDetail)
        if(this.reportDetail.activity.title){
         this.title = this.reportDetail.activity.title;
        }
        this.username = this.reportDetail.activity.account.username;
        this.ActivityTime = this.reportDetail.activity.ActivityTime;
        this.enrollTime = functionApi.moment.getYMDHM( this.reportDetail.activity.startOfEnrollment)+'-'+functionApi.moment.getYMDHM( this.reportDetail.activity.endOfEnrollment);
        this.sponsor = this.reportDetail.activity.sponsor.join(',');
        this.numberOfExpected = this.reportDetail.activity.numberOfExpected == -1?'不限制人数':this.reportDetail.activity.numberOfExpected;
        this.reportusername = this.reportDetail.account.username;
        if(this.reportDetail.review.content){
          this.ruleForm.content = this.reportDetail.review.content;
          this.ruleForm.result = this.reportDetail.review.result;
        };
        if(this.reportDetail.review.content){
          this.disableShow = true;
          this.reviewTime = functionApi.moment.getListTime(this.reportDetail.review.reviewTime);
          this.reviewusername = this.reportDetail.review.account.username;
        }else{
          this.disableShow = false;
        }
        const activityState = [{label:'待审核', value:"1"}, {label:'报名中', value:"4"}, {label:'预热中', value:"5"}, {label:'进行中', value:"6"}, {label:'已结束', value:"7"}, {label:'已取消', value:"10"}, {label:'已下架', value:"11"}];
        for(let i = 0; i < activityState.length; i++){
          if(this.reportDetail.activity.state == activityState[i].value){
            this.state = activityState[i].label;
          }
        }
        this.enrollCount = this.reportDetail.activity.enrollCount;
        if(this.reportDetail.activity.coSponsor == []){
          this.coSponsor = '';
        }else{
          this.coSponsor = this.reportDetail.activity.coSponsor.join(',');
        }
        let startDate = functionApi.moment.getDateFormate(this.reportDetail.activity.startOfActivity);
        let endDate = functionApi.moment.getDateFormate(this.reportDetail.activity.endOfActivity);
        if(startDate == endDate){
          this.ActivityTime = functionApi.moment.getYMDHM(this.reportDetail.activity.startOfActivity) + '-' + functionApi.moment.getHM(this.reportDetail.endOfActivity);
        }else{
          this.ActivityTime = functionApi.moment.getYMDHM(this.reportDetail.activity.startOfActivity) + '-' + functionApi.moment.getYMDHM(this.reportDetail.activity.endOfActivity);
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
.report-detail{margin-left:10px;}
  .model{ font-weight:bold; color:#B44382; border-left:3px solid #B44382; padding:1px 12px; }
  .Info-wrap{margin-left:15px;
    .info-content{margin-left:44px;
      .info{margin:14px 0;
        &:nth-child(1){margin-top:0}
      }
    }
  }
  .info1{margin-left:55px;}
  .txt{width:700px;}
  .btn-wrap{width:100%;text-align:center;padding-top:30px;
    .btn-back{margin-left:50px;width:130px}
    .check-btn{width:130px}
  }
</style>
