<template>
  <el-form :model="form" ref="form" label-width="100px" label="right" class="manageForm">
    <el-form-item label="时间" required>
      <el-row>
        <el-col :span="6">
          <el-date-picker v-model="form.starttime" type="date" placeholder="年-月-日" :picker-options="pickerOptions"></el-date-picker>
        </el-col>
        <el-col :span="1" style="text-align:center;">到</el-col>
        <el-col :span="6">
          <el-date-picker v-model="form.endtime" type="date" placeholder="年-月-日" :picker-options="pickerOptions"></el-date-picker>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="公司:" class="small-ipt" required>
      <el-input v-model="form.company"></el-input>
    </el-form-item>
    <el-form-item label="部门:" class="small-ipt" required>
      <el-input v-model="form.department"></el-input>
    </el-form-item>
    <el-form-item label="职位:" class="small-ipt" required>
      <el-input v-model="form.position"></el-input>
    </el-form-item>
    <el-form-item label="工作描述:">
      <el-input type="textarea" v-model="form.jobDescription" placeholder="请描述你的职责，工作任务以及取得的成绩等。"></el-input>
    </el-form-item>
    <el-form-item class="btn-wrap">
      <el-button type="primary" @click="submitForm('form')">保存</el-button>
      <el-button @click="backTo">取消</el-button>
    </el-form-item>
    <el-form-item label-width="20px" v-for="(item, index) in educationLists" class="edu-list" :key='index'>
      <el-col :span="20">
        <el-row>
          <el-col :span="6">{{item.starttime}} - {{item.endtime}}</el-col>
          <el-col :span="9"><b>{{item.company}}</b></el-col>
          <el-col :span="9"><b>{{item.position}}</b></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">专业描述：{{item.jobDescription}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="2">
        <el-button size="small">编辑</el-button>
      </el-col>
      <el-col :span="2">
        <el-button size="small">删除</el-button>
      </el-col>
    </el-form-item>
  </el-form>
</template>
<script>
  // import pubApi from '@/js/api.js';
  export default {
    data() {
      return {
        form: {
          starttime: '',
          endtime: '',
          company: '',
          department: '',
          position: '',
          jobDescription: ''
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e7;
          }
        },
        educationLists: [{starttime: '2010/09', endtime: '2014/07', company: '浙江菜根信息科技有限公司', department: '开发部', position: '产品经理', jobDescription: '公司产品设计'}]
      }
    },
    methods: {
      submitForm(formName) {
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('创建成功');
          } else {
            console.log('创建失败');
            return false;
          }
        });
      },
      backTo() {
        this.$router.go(-1);
      }
    },
    mounted() {
      
    }
  }
</script>

<style lang="scss" scoped>
  .manageForm{ margin:20px; width:80%; min-width:600px;
    .info{ margin-bottom:20px; font-size:14px; color:rgb(72, 87, 106); line-height:26px; overflow:hidden; vertical-align:middle; 
      label{ display:block; float:left; width:85px; text-align:right; }
      span{ display:block; float:left; width:70%; text-align:justify; 
        .main-content{ margin:0; }
        .dynamic-img{ margin:10px 10px 10px 0; }
      }
    }
    .p-r{ padding-right:10px; }
    .small-ipt{ width:400px; }
    .model{ font-weight:bold; color:#20a0ff; border-left:3px solid #20a0ff; padding:1px 12px; }
    .el-tag{ display:inline-block; background-color:rgba(32,159,255,.1); border-color:rgba(32,159,255,.2); font-size:14px; color:#20a0ff; height:34px; line-height:34px; margin:0 10px 6px 0; padding:0 10px; }
    .toolbar{
      .el-pagination{ float:right; }
    }
    .edu-list{ border-top:1px solid #ccc; border-bottom:1px solid #ccc; padding:10px 0; }
  }
</style>
