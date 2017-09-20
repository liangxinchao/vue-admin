<template>
     <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"label-position="left" class="demo-ruleForm">
     <p class="model">基本设置</p>
      <el-form-item label="名称：" prop="title">
        <el-input  v-model="ruleForm.title" style="width:650px"></el-input>
      </el-form-item>
      <el-form-item label="位置：">
        <el-input-number v-model="ruleForm.position" @change="handleChange" :min="1" :max="5"></el-input-number>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input type="textarea" style="width:650px"></el-input>
      </el-form-item>
      <el-form-item label="链接：">
        <el-col :span="7" class="p-r">
         <el-input v-model="ruleForm.link"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button @click="selectLink">选择</el-button>
        </el-col>
      </el-form-item>
      <p class="model">图片设置</p>
       <el-form-item label="话题封面：">
      <input type="file" @change="onFileChange" id="coverImg" class="hide"/>
      <input type="button" value="选择图片" @click="uploadthumb('coverImg')" />
      <div class="thumbset">
        <div class="thumbImg">
          <a href="javascript:void(0)" class="reselect" v-if="ruleForm.coverImg !== ''" @click="clearthumb('coverImg')">×</a>
          <img :src="ruleForm.coverImg" />
        </div>
        <i class="el-icon-picture thumb-uploader-icon"></i>
      </div>
    </el-form-item> 
       <el-form-item class="btn-wrap">
        <el-button type="primary" @click="submitForm('ruleForm')" class="check-btn">保存</el-button>
        <el-button class="btn-back" @click="backTo">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import activityApi from '@/js/api.js';
  import axios from 'axios';
  import $ from 'jquery';
  export default {
    data() {
      return {
        ruleForm: {
          title: '',
          position:1,
          link:'',
          tag: '',
          desc: '',
          coverImg:'',
          coverImg: '',
        },
        uploadUrl: '',
       rules: {
        coverImg: [{ required: true, message: '请上传话题封面', trigger: 'change' }],
        title: [{ required: true, message: '请输入话题标题', trigger: 'change' }],
        tag: [{ required: true, message: '请选择处理结论', trigger: 'change' }],
        desc: [{ required: true, message: '请填写处理说明', trigger: 'blur' }]
       }
      }
    },
    methods:{
      submitForm(formName) {
        const vm=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
           alert("submit")
          }else {
            console.log('创建失败');
            return false;
          } 
        });
      },
      handleChange() {

      },
      selectLink() {
        this.$router.push({path:'/nav1/home/manage/linkselect'})
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        var fileObj = files[0];
        var vm = this;
        var name = e.target.getAttribute('id');
        console.log(name);
        var form = new FormData();
        form.append("upfile", fileObj);
        var xhr = new XMLHttpRequest();
        xhr.open('post', vm.uploadUrl + '?action=uploadthumb', true);
        xhr.onload = function () {
          var res = JSON.parse(xhr.response);
          vm.ruleForm[name] = res.url;
        };
        var reader = new FileReader();
        if (!files.length){
          return;
        }
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
          xhr.send(form);
        };
      },
      uploadthumb(imgId){
        var fileInput = document.getElementById(imgId);
        fileInput.click();
      },
      clearthumb(imgSrc){
        var vm = this;
        vm.ruleForm[imgSrc] = '';
      },
     backTo() {
      this.$router.go(-1)
     }
    },
    mounted() {
      activityApi.activity.getUploadUniqueKey().then(res => {
        let self = this;
        console.log(res.data);
        self.uploadUrl = res.data.queryURL; 
      });
    }
  }
</script>

<style lang="scss" scoped>
.report-detail{margin-left:10px;}
  .model{ font-weight:bold; color:#20a0ff; border-left:3px solid #20a0ff; padding:1px 12px; }
  .btn-wrap{width:100%;text-align:center;padding-top:30px;
    .btn-back{margin-left:50px;width:130px}
    .check-btn{width:130px}
  }
  .demo-ruleForm{padding-left:15px}
  .thumbset{ overflow:hidden;
    .thumbImg{ width:430px; height:175px; text-align:center; position:absolute;
      .reselect{ display:none; position:absolute; top:-8px; right:-8px; font-size:14px; width:16px; height:16px; line-height:16px; border-radius:8px; background-color:#f74c4c; color:#fff; text-decoration:none;}
      img{ width:430px; height:175px; }
      &:hover{
        .reselect{ display:block; }
      }
    }
    .thumb-uploader-icon{ display:inline-block; font-size:36px; color:#8c939d; width:430px; height:175px; line-height:175px; text-align:center; }
  }
</style>
