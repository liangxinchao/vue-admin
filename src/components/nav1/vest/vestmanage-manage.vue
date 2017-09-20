<template>
  <div>
    <el-form ref="form" :model="form" label-width="95px" label="right" class="manageForm">
      <p class="info">
        <label>状态：</label><span>启用</span>
      </p>
      <p class="info">
        <label>创建账号：</label><span>张三</span>
      </p>
      <p class="info">
        <label>创建时间：</label><span>2016-10-11 08:30</span>
      </p>
      <el-form-item label="马甲类型:" prop="type">
        <el-select v-model="form.type" placeholder="选择类型">
          <el-option v-for="(item, index) in formtypes" :label="item" :value="index+''" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户图像:" prop="avatar">
        <input type="file" @change="onFileChange" id="avatar" class="hide"/>
        <input type="button" value="选择图片" @click="uploadthumb('avatar')" />
        <div class="thumbset">
          <div class="thumbImg">
            <a href="javascript:void(0)" class="reselect" v-if="form.avatar !== ''" @click="clearthumb('avatar')">×</a>
            <img :src="form.avatar"/>
          </div>
          <i class="el-icon-picture thumb-uploader-icon"></i>
        </div>
      </el-form-item>
      <el-form-item label="用户名:" prop="name" required>
        <el-input v-model="form.name" placeholder="请填写用户名"></el-input>
      </el-form-item>
      <el-form-item label="昵称:" prop="nickname">
        <el-input v-model="form.nickname" placeholder="请填写昵称"></el-input>
      </el-form-item>
      <el-form-item label="出生日期:" prop="birthday">
        <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
      </el-form-item>
      <el-form-item label="性别:" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号码:" prop="phonenumber">
        <el-input v-model="form.phonenumber" placeholder="请填写手机号码"></el-input>
      </el-form-item>
      <el-form-item label="所在地区:" prop="phonenumber">
        <el-cascader expand-trigger="hover" :options="area" v-model="form.location"></el-cascader>
      </el-form-item>
      <el-form-item label="电子邮箱:" prop="email">
        <el-input v-model="form.email" placeholder="请填写电子邮箱"></el-input>
      </el-form-item>
      <el-form-item label="个人简介:" prop="brief">
        <el-input type="textarea" v-model="form.brief" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请填写个人简介，让更多人了解你！字数不超过200字。"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-col :span="20">
          <el-form-item prop="brief">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-button @click="">重置</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="onSubmit">保存</el-button>
        <el-button type="primary" @click.prevent="onSubmit">启用</el-button>
        <el-button @click.prevent="onSubmit">删除</el-button>
        <el-button @click.prevent="onSubmit">停用</el-button>
        <el-button @click.prevent="onSubmit">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import activityApi from '@/js/api.js';
  import functionApi from '@/js/function.js';
  import areaList from '@/js/area.js';
  export default {
    data() {
      return {
        form:{
          type: '',
          avatar: '',
          name: '',
          nickname: '',
          birthday: '',
          sex: '',
          phonenumber: '',
          location: [],
          email: '',
          brief: '',
          password: '1111'
        },
        formtypes: ['创业者', '投资人', '运营', '市场', '技术', '设计师', '自媒体人', '自由职业者', '人资', '财务'],
        uploadUrl: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e7;
          }
        },
        area: [],
      }
    },
    methods: {
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
          vm.form[name] = res.url;
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
        vm.form[imgSrc] = '';
      },
      getArea() {
        this.area = areaList().area;
        for(let i = 0; i < this.area.length; i++){
          this.area[i].value = this.area[i].label;
          for(let j = 0;j < this.area[i].children.length; j++){
            this.area[i].children[j].value = this.area[i].children[j].label;
            this.area[i].children[j].children = '';
          }
        }
      }
    },
    mounted() {
      this.getArea();
      const vestId = localStorage.getItem('vestId');
      activityApi.pub.getUploadUniqueKey().then(res => {
        let self = this;
        self.uploadUrl = res.data.queryURL;
      })
    }
  }
</script>

<style lang="scss" scoped>
  .manageForm{ margin:20px; width:60%; min-width:600px;
    .info{ margin-bottom:20px; font-size:14px; color:rgb(72, 87, 106); line-height:26px; overflow:hidden; vertical-align:middle; 
      label{ display:block; float:left; width:85px; text-align:right; }
      span{ display:block; float:left; width:580px; text-align:justify; }
    }
    .p-r{padding-right:10px;}
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
</style>