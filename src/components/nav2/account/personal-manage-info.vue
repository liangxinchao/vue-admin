<template>
  <el-form :model="form" ref="form" label-width="100px" label="right" class="manageForm">
    <el-form-item label="账户状态:">
      <el-select v-model="form.accountState" placeholder="请选择" :options="form.accountState">
        <el-option v-for="(item, index) in states" :label="item" :value="item" :key="index"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="注册日期:" class="small-ipt">{{form.date}}</el-form-item>
    <el-form-item label="用户图像:" required>
      <input type="file" @change="onFileChange" id="coverImg" class="hide"/>
      <input type="button" value="选择图片" @click="uploadthumb('coverImg')" />
      <div class="thumbset">
        <div class="thumbImg">
          <a href="javascript:void(0)" class="reselect" v-if="form.coverImg !== ''" @click="clearthumb('coverImg')">×</a>
          <img :src="form.coverImg" />
        </div>
        <i class="el-icon-picture thumb-uploader-icon"></i>
      </div>
    </el-form-item>
    <el-form-item label="用户名:" class="small-ipt" required>{{form.username}}</el-form-item>
    <el-form-item label="昵称:" class="small-ipt">
      <el-input v-model="form.nickname"></el-input>
    </el-form-item>
    <el-form-item label="真实姓名:" class="small-ipt">
      <el-input v-model="form.realname"></el-input>
    </el-form-item>
    <el-form-item label="性别:">
      <el-radio-group v-model="form.sex">
        <el-radio label="0">男</el-radio>
        <el-radio label="1">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="出生日期:">
      <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
    </el-form-item>
    <el-form-item label="手机号码:" class="small-ipt" required>
      <el-input v-model="form.phonenumber"></el-input>
    </el-form-item>
    <el-form-item label="所在地区:">
      <el-cascader expand-trigger="hover" :options="area" v-model="form.location"></el-cascader>
    </el-form-item>
    <el-form-item label="公司名称:" class="small-ipt">
      <el-input v-model="form.company"></el-input>
    </el-form-item>
    <el-form-item label="电子邮箱:" class="small-ipt">
      <el-input v-model="form.email" placeholder="请填写您的电子邮箱"></el-input>
    </el-form-item>
    <el-form-item label="个人简介:">
      <el-input type="textarea" v-model="form.brief" placeholder="请填写个人简介，让更多人了解你！字数不超过200字。"></el-input>
    </el-form-item>
    <el-form-item label="用户密码：" required>
      <el-row>
        <el-col :span="13">
          <el-input v-model="form.password" type="password" :disabled="true"></el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button @click="passwordDialog = true">重置</el-button>
        </el-col>
      </el-row>
    </el-form-item>
    <el-dialog title="重置密码" v-model="passwordDialog" size="tiny">
      <el-form :model="pform" label="right" label-width="80px">
        <el-form-item label="登录密码:">
          <el-input v-model="pform.password" placeholder="请设置登录密码（6-20位）"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:">
          <el-input v-model="pform.passwordSure" placeholder="请再次输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-top:-30px;">
        <el-button @click="passwordDialog = false">取 消</el-button>
        <el-button type="primary" @click="passwordDialog = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-form-item class="btn-wrap">
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="onSubmit">入驻园区</el-button>
      <el-button @click="onSubmit">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import pubApi from '@/js/api.js';
  import areaList from '@/js/area.js';
  export default {
    data() {
      return {
        form: {
          accountState: '启用',
          date: '2016-01-01',
          coverImg: '',
          username: '12345678901',
          nickname: '',
          realname: '',
          sex: '0',
          birthday: '',
          phonenumber: '',
          location: [],
          company: '',
          email: '',
          brief: '',
          password: '123'
        },
        states: ['启用', '停用'],
        uploadUrl: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e7;
          }
        },
        area: [],
        passwordDialog: false,
        pform: {
          password: '',
          passwordSure: ''
        }
      }
    },
    methods: {
      getArea() {
        this.area = areaList().area;
        for(let i = 0; i < this.area.length; i++){
          this.area[i].value = this.area[i].label;
          for(let j = 0;j < this.area[i].children.length; j++){
            this.area[i].children[j].value = this.area[i].children[j].label;
            this.area[i].children[j].children = '';
          }
        }
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
      onSubmit(e) {
        let vm = this;
        let option = e.target.innerText;
        if(option == '保存'){
          this.$refs['form'].validate((valid) => {
            if (valid) {
              alert('创建成功');
            } else {
              console.log('创建失败');
              return false;
            }
          });
        }else if(option == '入驻园区'){
          this.$router.push('/nav2/account/personal/settled');
        }else if(option == '取消'){
          this.$router.go(-1);
        }
      }
    },
    mounted() {
      this.getArea();
      pubApi.pub.getUploadUniqueKey().then(res => {
        let self = this;
        self.uploadUrl = res.data.queryURL;
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
    .small-ipt{ width:400px; }
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
