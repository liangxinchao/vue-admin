<template>
  <el-form :model="form" ref="form" label-width="25px" label="right" class="manageForm">
    <p class="model">用户角色</p>
    <el-form-item label="">
      <el-checkbox-group v-model="form.role">
        <el-checkbox label="普通用户" name="role"></el-checkbox>
        <el-checkbox label="园区用户" name="role"></el-checkbox>
        <el-checkbox label="客户经理" name="role"></el-checkbox>
        <el-checkbox label="管理员" name="role"></el-checkbox>
        <el-checkbox label="超级管理员" name="role"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <p class="model">用户分组</p>
    <el-form-item label="">
      <el-checkbox-group v-model="form.group">
        <el-checkbox label="默认组" name="group"></el-checkbox>
        <el-checkbox label="梦想小镇运营组" name="group"></el-checkbox>
        <el-checkbox label="金华运营组" name="group"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item class="btn-wrap">
      <el-button type="primary" @click="submitForm('form')">保存</el-button>
      <el-button @click="backTo">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          role: [],
          group: []
        },
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
