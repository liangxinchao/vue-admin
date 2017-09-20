<template>   
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" class="demo-ruleForm">
    <p class="model">基本信息</p>
      <el-form-item label="发布者：" prop="name">
        <el-select v-model="ruleForm.name">
          <el-option v-for="(i,index) in names" :label="i" :value="i" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="动态内容：" prop="content" >
        <el-input  v-model="ruleForm.content" class="txt"></el-input>
      </el-form-item>
      <el-form-item label=" 添加图片：" style="padding-left:13px">
        <input type="file" @change="onFileChange" id="avatar" class="hide"/>
        <div class="thumbset">
          <div class="thumbImg">
            <div class="imgbox" v-for="(img,index) in imgUrl" @mouseenter="clearShow(index)" @mouseleave="clearnoShow(index)">
              <img :src="img" />
              <a href="javascript:void(0)" class="reselect" v-if="clearIconShow(index)" @click="clearthumb(index)">×</a>
            </div>
            <el-button  @click="uploadthumb('avatar')" class="upload-btn" :disabled="btndisabled">+</el-button>
          </div>
        </div>
      </el-form-item> 
      <p class="model">宣传设置</p>
      <el-form-item label="推荐设置：">
        <el-checkbox-group v-model="ruleForm.resource">
          <el-checkbox label="推荐"></el-checkbox>
          <el-checkbox label="置顶"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="btn-wrap">
        <el-button type="primary" @click="submitForm('ruleForm')" class="check-btn">创建</el-button>
        <el-button class="btn-back" @click="backTo">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import newsApi from '@/js/api.js';
  export default {
    data() {
      return {
        names: ['创业君','创业者','投资者'],
        ruleForm: {
          name: '创业君',
          content: '',
          resource: [],
          avatar: ''
        },
        imgListIndex: -1,
        imgUrl: [],
        btndisabled: false,
        clearIconShow(index){
          if(index == this.imgListIndex){
            return true;
          }else{
            return false;
          }
        },
        uploadUrl: '',
        rules: {
          name: [{ required: true, message: '请选择发布者', trigger: 'change' }],
          content: [{ required: true, message: '请填写处理说明', trigger: 'blur' }]
        }
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            return false;
          }
        });
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
          vm.imgUrl.push(res.url);
          if(vm.imgUrl.length==9){
            vm.btndisabled = true;
          }
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
      clearShow(index) {
        this.imgListIndex=index;
      },
      clearnoShow(index){
        this.imgListIndex=-1;
      },
      uploadthumb(imgId){
        var fileInput = document.getElementById(imgId);
        fileInput.click();
      },
      clearthumb(index){
        var vm = this;
        vm.imgUrl.splice(index,1);
        if(vm.imgUrl.length < 9){
          vm.btndisabled = false;
        }
      },
      backTo() {
        this.$router.go(-1);
      }
    },
    mounted() {
      newsApi.pub.getUploadUniqueKey().then(res => {
        var self = this;
        self.uploadUrl = res.data.queryURL;
      });
    }
  }
</script>

<style lang="scss" scoped>
  .report-detail{ margin-left:10px; }
  .model{ font-weight:bold; color:#20a0ff; border-left:3px solid #20a0ff; padding:1px 12px; }
  .Info-wrap{ margin-left:15px;
    .info-content{ margin-left:44px;
      .info{ margin:14px 0;
        &:nth-child(1){ margin-top:0; }
      }
    }
  }
  .txt{ width:700px; }
  .btn-wrap{ width:100%; text-align:center; padding-top:30px;
    .btn-back{ margin-left:50px; width:130px; }
    .check-btn{ width:130px; }
  }
  .demo-ruleForm{ padding-left:15px; }
  .thumbset{ overflow:hidden; height:auto; padding:10px;margin:0;
    .thumbImg{ width:100%;  display:flex; flex-wrap:wrap;
      .reselect{ display:none; text-align:center;position:absolute; top:-6px; right:-5px; font-size:14px; width:20px; height:20px; line-height:16px; border-radius:50%; background-color:#f74c4c; color:#fff; text-decoration:none; }
      .imgbox{ position:relative; width:200px; height:200px;margin:10px;} 
      img{ width:200px; height:200px; margin-right:14px}
      .reselect{ display:block; }
      .upload-btn{ width:200px; height:200px; margin-left:10px;margin-top:10px; }
    } 
  }
</style>
