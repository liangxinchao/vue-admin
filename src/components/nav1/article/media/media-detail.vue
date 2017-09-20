<template>  
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" label="right" class="demo-ruleForm">
    <el-form-item label="头像">
      <input type="file" @change="onFileChange" id="avatar" class="hide"/>
      <input type="button" value="选择图片" @click="uploadthumb('avatar')" />
      <div class="thumbset">
        <div class="thumbImg">
          <a href="javascript:void(0)" class="reselect" v-if="ruleForm.avatar !== ''" @click="clearthumb('avatar')">×</a>
          <img :src="ruleForm.avatar" />
        </div>
        <i class="el-icon-picture thumb-uploader-icon"></i>
      </div>
    </el-form-item> 
    <el-form-item label="名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="区域" required>
      <el-select v-model="ruleForm.location.province" placeholder="请选择省">
        <el-option label="全国" value=""></el-option>
        <el-option v-for="province in formarea" :label="province.province.name" :value="province.province.name" :key="province.province.name"></el-option>
      </el-select>
      <el-select v-model="ruleForm.location.city" placeholder="请选择市">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="city in cities" :label="city.name" :value="city.name" :key="city.name"></el-option>
      </el-select>
      <el-select v-model="ruleForm.location.area" placeholder="请选择区">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="area in areas" :label="area.name" :value="area.name" :key="area.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="网站" prop="website">
      <el-input v-model="ruleForm.website"></el-input>
    </el-form-item>
    <el-form-item label="联系人">
      <el-input v-model="ruleForm.contact"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="ruleForm.phonenumber"></el-input>
    </el-form-item>
    <el-form-item label="简介">
      <el-input type="textarea" v-model="ruleForm.description"></el-input>
    </el-form-item>
    <el-form-item >
      <el-button type="primary"  @click="submitForm('ruleForm')">保存</el-button>
     <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import newsApi from '@/js/api.js';
  import $ from 'jquery';
  import axios from 'axios';

  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          avatar: '',
          location: {province:'', city:'', area:''},
          website: '',
          contact: '',
          phonenumber: '',
          description: ''
        },
        rules: {
          name: [
            { required: true, message: '用户名', trigger: 'blur' },
          ],
          website: [
            { required: true, message: '请输入网址', trigger: 'blur' }
          ]
        },
        area: [],
        formarea: [],
        uploadUrl: '',
        id:''
      }
    },
    computed:{
      cities: function() {
        if(!this.ruleForm.location.province || !this.ruleForm.location.city){
          this.ruleForm.location.city = '';
        }
        for (var i = 0; i < this.formarea.length; i++) {
          if (this.formarea[i].province.name === this.ruleForm.location.province) {
            if (this.formarea[i].province.hasOwnProperty('city')) {
              return this.formarea[i].province.city;
            }
          }
        }
        return [];
      },
      areas: function() {
        if(!this.ruleForm.location.city || !this.ruleForm.location.area){
          this.ruleForm.location.area = '';
        }
        for (var i = 0; i < this.cities.length; i++) {
          if (this.cities[i].name === this.ruleForm.location.city) {
            if (this.cities[i].hasOwnProperty('area')) {
              return this.cities[i].area;
            }
          }
        }
        return [];
      }
    },
    methods:{
      cancel() {
        this.$router.go(-1);
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
      // proChange (val, oldVal) {
      //   if(val){
      //     this.ruleForm.location.city = '';
      //     this.ruleForm.location.area = '';
      //   }
      // },
      // cityChange(val, oldVal) {
      //   if(val){
      //     this.ruleForm.location.area = '';
      //   }
      // },
      
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          newsApi.news.MediaDetailKeep(this.id,this.ruleForm).then(res => {
            this.$message({
              showClose: true,
              message: '保存成功'
            });
          this.$router.go(-1);    
         });
          } else {
            return false;
          }
        });
      }
    },
    mounted() {
     let id = localStorage.getItem('newsId');
       newsApi.news.NewsMediaDetail(id).then(res => {
        console.log(res.data);
        this.id=res.data.id;
        this.ruleForm.avatar=res.data.avatar;
        this.ruleForm.name=res.data.name;
        this.ruleForm.location=res.data.location;
        this.ruleForm.website=res.data.website;
        this.ruleForm.contact=res.data.contact;
        this.ruleForm.phonenumber=res.data.phonenumber;
        this.ruleForm.description=res.data.description;
      });
      newsApi.news.formOptions().then(res => {
        this.formarea = res.data.formOptions.overlayArea;
      });
      newsApi.news.getUploadUniqueKey().then(res => {
        var self = this;
        self.uploadUrl = res.data.queryURL;
      });
    }
  }
</script>

<style lang="scss" scoped>
	.demo-ruleForm{ margin:20px; width:60%; min-width:600px;
    .cre-text{ text-decoration:none; }
  }
  .thumbset{ overflow:hidden;
    .thumbImg{ width:120px; height:120px; text-align:center; border-radius:50%; position:absolute;
      .reselect{ display:none; position:absolute; top:-8px; right:-8px; font-size:14px; width:16px; height:16px; line-height:16px; border-radius:8px; background-color:#f74c4c; color:#fff; text-decoration:none;}
      img{ width:120px; height:120px; border-radius:50%; }
      &:hover{
        .reselect{ display:block; }
      }
    }
    .thumb-uploader-icon{ display:inline-block; font-size:36px; color:#8c939d; width:120px; height:120px; line-height:120px; text-align:center; border-radius:50%; }
  }
</style>
