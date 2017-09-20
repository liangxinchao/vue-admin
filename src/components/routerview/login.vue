<template>
  <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">欢迎登录汇创业管理后台！</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" class="autologin">自动登录</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="loginSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import loginApi from '@/js/api.js';

  export default {
    data() {
      return {
        loginForm: {
          account: '',
          password: ''
        },
        loginRules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        checked: true,
        loading: false
      };
    },
    methods: {
      loginSubmit(ev) {
        let _this = this;
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            let loginParams = { 
              'username': this.loginForm.account, 
              'password': this.loginForm.password 
            };
            loginApi.user.login(loginParams).then(data => {
              console.log(data)
              this.loading = false;
              const user = {
                id: data.id,
                name: data.username,
                token: data.token.id
              };
              localStorage.setItem("dreamuser", JSON.stringify(user));
              location.pathname = '/nav1';
            }).catch(data => {
              console.log(data)
              this.loading = false;
              this.$notify.error({
                title: '错误',
                message: '用户名或密码错误'
              });
            });
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 180px auto;
    border: 2px solid #8492A6;
    width: 350px;
    padding: 35px 35px 15px 35px;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .autologin {
      margin: 0px 0px 35px 0px;
    }
  }
</style>