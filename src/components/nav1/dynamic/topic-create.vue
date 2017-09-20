<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label="right" class="manageForm">
    <p class="model">基本信息</p>
    <el-form-item label="话题标题" prop="title">
      <el-input  v-model="ruleForm.title"></el-input>
    </el-form-item>
    <el-form-item label="话题封面" prop="coverImg">
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
    <el-form-item label="活动详情:" style="width:980px;" prop='content' required>
      <div id="activityContent" style="height:260px;"></div>
    </el-form-item>
    <p class="model">宣传设置</p>
    <el-form-item label="推荐设置：">
      <el-checkbox-group v-model="ruleForm.tag">
        <el-checkbox label="推荐"></el-checkbox>
        <el-checkbox label="置顶"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item class="btn-wrap">
      <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
      <el-button @click="backTo">返回</el-button>
    </el-form-item>
  </el-form>
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
          tag: [],
          desc: '',
          content:'',
          coverImg:'',
          coverImg: '',
        },
        temp:{
          content:''
        },
        uploadUrl: '',
        rules: {
          coverImg: [{ required: true, message: '请上传话题封面', trigger: 'change' }],
          title: [{ required: true, message: '请输入话题标题', trigger: 'change' }],
          desc: [{ required: true, message: '请填写处理说明', trigger: 'blur' }]
        }
      }
    },
    methods:{
      submitForm(formName) {
        const vm=this;
        const header = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="edge"/><meta name="renderer" content="webkit"><meta http-equiv="Content-Script-Type" content="text/javascript"/><meta name="format-detection" content="telephone=no"/><meta name="viewport" content="width=device-width,user-scalable=no"><title>Document</title></head><body><article>';
        const footer = '</article></body></html>';
        let editorcontent = header + vm.ruleForm.content + footer;
        let blob = new Blob([editorcontent], {'type': 'text/html'});
        let formData = new FormData();
        formData.append('upfile', blob, 'uploadfile.html');
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.temp.content) {
              if ((this.ruleForm.content.indexOf('<iframe') == -1 || this.ruleForm.content.indexOf('</iframe>') == -1) && (this.ruleForm.content.indexOf('<img') == -1)) {
                this.$message.error('活动详情不能为空！');
                return;
              }
              return;
            }
            axios.post(this.uploadUrl + '?action=uploadHTML', formData).then(res => {
              console.log(res.data)
            })
            alert('创建成功');
          } else {
            console.log('创建失败');
            return false;
          }
        });
      },
      setContent(html, text) {
        this.ruleForm.content = html;
        this.temp.content = text;
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        var fileObj = files[0];
        var vm = this;
        var name = e.target.getAttribute('id');
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
        this.$router.go(-1);
      }
    },
    mounted() {
      activityApi.pub.getUploadUniqueKey().then(res => {
        let self = this;
        self.uploadUrl = res.data.queryURL;
        let editor = new wangEditor('activityContent');
        editor.config.menus = ['source', '|', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily', 'fontsize', 'lineheight','indent', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright', '|', 'link', 'unlink', 'table', 'emotion', '|', 'img', '|', 'undo', 'redo', 'fullscreen'];
        editor.config.fontsizes = {1:'12px', 2:'14px', 3:'16px', 4:'20px', 5:'24px', 6:'28px', 7:'32px'};
        editor.config.hideLinkImg = true;
        editor.config.uploadImgFileName = 'upfile';
        editor.config.uploadImgUrl = self.uploadUrl + '?action=uploadImg';
        editor.onchange = function () {
          let text = editor.$txt.text().replace(/(^\s*)|(\s*$)/g, ""),
              html = editor.$txt.html();
          self.setContent(html, text);
        };
        editor.create();
      });
    }
  }
</script>

<style lang="scss" scoped>
  .manageForm{ margin:20px; width:60%; min-width:600px;
    .info{ margin-bottom:20px; font-size:14px; color:rgb(72, 87, 106); line-height:26px; overflow:hidden; vertical-align:middle; 
      label{ display:block; float:left; width:85px; text-align:right; }
      span{ display:block; float:left; width:70%; text-align:justify; 
        .main-content{ margin:0; }
        .dynamic-img{ margin:10px 10px 10px 0; }
      }
    }
    .p-r{ padding-right:10px; }
    .model{ font-weight:bold; color:#20a0ff; border-left:3px solid #20a0ff; padding:1px 12px; }
    .el-tag{ display:inline-block; background-color:rgba(32,159,255,.1); border-color:rgba(32,159,255,.2); font-size:14px; color:#20a0ff; height:34px; line-height:34px; margin:0 10px 6px 0; padding:0 10px; }
    .toolbar{
      .el-pagination{ float:right; }
    }
    .thumbset{ overflow:hidden;
      .thumbImg{ width:180px; max-height:126px; line-height:126px; text-align:center; position:absolute;
        &.coverImg{ width:560px; max-height:331px; line-height:331px; }
        .reselect{ display:none; position:absolute; top:-9px; right:-9px; font-size:14px; font-weight:bold; width:18px; height:18px; line-height:18px; text-align:center; border-radius:9px; background-color:#f74c4c; color:#fff; text-decoration:none; }
        img{ width:180px; height:126px;
          &.cover{ width:560px; height:331px; }
        }
        &:hover{
          .reselect{ display:block; }
        }
      }
      .thumb-uploader-icon{ border:1px dashed #d9d9d9; font-size:28px; color:#8c939d; width:178px; height:124px; line-height:124px; text-align:center; cursor:pointer;
        &.cover-icon{ width:558px; height:329px; line-height:329px; font-size:128px; }
      }
    }
  }
  // .report-detail{ margin-left:10px; }
  // .model{ font-weight:bold; color:#20a0ff; border-left:3px solid #20a0ff; padding:1px 12px; }
  // .Info-wrap{margin-left:15px;
  //   .info-content{margin-left:44px;
  //     .info{margin:14px 0;
  //       &:nth-child(1){margin-top:0}
  //     }
  //   }
  // }
  // .txt{width:700px;}
  // .btn-wrap{width:100%;text-align:center;padding-top:30px;
  //   .btn-back{margin-left:50px;width:130px}
  //   .check-btn{width:130px}
  // }
  // .demo-ruleForm{padding-left:15px}
  // .thumbset{ overflow:hidden;
  //   .thumbImg{ width:430px; height:175px; text-align:center; position:absolute;
  //     .reselect{ display:none; position:absolute; top:-8px; right:-8px; font-size:14px; width:16px; height:16px; line-height:16px; border-radius:8px; background-color:#f74c4c; color:#fff; text-decoration:none;}
  //     img{ width:430px; height:175px; }
  //     &:hover{
  //       .reselect{ display:block; }
  //     }
  //   }
  //   .thumb-uploader-icon{ display:inline-block; font-size:36px; color:#8c939d; width:430px; height:175px; line-height:175px; text-align:center; }
  // }
</style>
