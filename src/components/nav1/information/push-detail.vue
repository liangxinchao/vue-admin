<template>
  <div>
    <el-form ref="form" :model="form" label-width="95px" label="right" class="manageForm">
      <p class="model">基本设置</p>
      <el-form-item label="推送标题:" prop="title" required>
        <el-input v-model="form.title" placeholder="请填写推送标题":disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="推送内容:" prop="content" required>
        <el-input type="textarea" v-model="form.content" :autosize="{ minRows: 2, maxRows: 4}" placeholder="推送内容不能超过58个字" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="推送:" prop="push">
        <el-col :span="20">
          <el-input v-model="form.push" :disabled="true"></el-input>
        </el-col>
      </el-form-item>
       <el-form-item label="选择APP:" required prop="apptype">
        <el-radio-group v-model="form.apptype">
          <el-radio label="2" :disabled="true">全部APP</el-radio>
          <el-radio label="0" :disabled="true">汇创业</el-radio>
          <el-radio label="1" :disabled="true">梦想小镇</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发送区域:">
        <el-col :span="20">
          <el-cascader style="width:100%;" expand-trigger="hover" v-model="form.park" :options="parkOptions" :disabled="true"></el-cascader>
        </el-col>
      </el-form-item>
      <el-form-item label="" v-if="parkSelect.length != 0">
        <el-row style="border-bottom:1px dashed #ccc;" v-for="(item, index) in parkSelect" :key="item">
          <el-col :span="1">{{index+1}}、</el-col>
          <el-col :span="16">{{item.province}}·{{item.city}}·{{item.zone}}·{{item.address}}</el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="接收人:" required prop="recepter">
        <el-radio-group v-model="form.recepter">
          <el-radio label="0" :disabled="true">全部用户</el-radio>
          <el-radio label="1" :disabled="true">部分用户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="m-t" label="" v-if="form.recepter == '1'" prop="setRecepter">
        <el-checkbox-group v-model="form.setRecepter">
          <el-checkbox label="p0" name="setRecepter" :disabled="true">注册用户</el-checkbox>
          <el-checkbox label="p1" name="setRecepter" :disabled="true">园区用户</el-checkbox>
          <el-checkbox label="e0" name="setRecepter" :disabled="true">注册企业</el-checkbox>
          <el-checkbox label="e1" name="setRecepter" :disabled="true">认证企业</el-checkbox>
          <el-checkbox label="e2" name="setRecepter" :disabled="true">园区企业</el-checkbox>
          <el-checkbox label="a1" name="setRecepter" :disabled="true">管理员</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="提交时间:">
        <el-col>{{form.created}}</el-col>
      </el-form-item>
       <el-form-item label="定时时间:">
        <el-col>{{form.sendTime}}</el-col>
      </el-form-item>
       <el-form-item label="操作人:">
        <el-col>{{name}}</el-col>
      </el-form-item>
       <el-form-item label="状态:">
        <el-col>{{pushDetail.state}}</el-col>
      </el-form-item>
    </el-form>
    <div class="btn-wrap">
      <el-button @click="handleModify" type="primary">转发</el-button>
      <el-button @click="handleReSend" type="primary" v-if="pushDetail.state=='发送失败'">重发</el-button>
      <el-button @click="withdraw" v-if="pushDetail.state=='待发送'">撤回</el-button>
      <el-button @click="backto">返回</el-button>
    </div>
  </div>
</template>

<script>
  import infoApi from '@/js/api.js';
  import functionApi from '@/js/function.js';
  import $ from 'jquery';
  export default {
    data() {
      return {
        pushDetail: {},
        name: '',
        form: {
          title: '',
          content: '',
          push: '',
          apptype: '',
          park: [],
          recepter: '',
          setRecepter: [],
          time: '',
          setDate: '',
          setTime: '',
          states: ['待发送', '已发送', '发送失败', '已撤回'],
        },
        parkOptions: [],
        parkSelect: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      }
    },
    methods: {
      handleModify(){
        localStorage.setItem('pushId', this.pushDetail.id);
        localStorage.setItem('pushType', 'push');
        this.$router.push({path:'/nav1/information/push/modify'});
      },
      handleReSend(){
        this.$confirm('确定要重发?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          infoApi.info.pushRadioReSend({id: this.pushDetail.id}).then(res => {
            this.$message.success('重发成功');
            setTimeout(() => {
              window.location.pathname = '/nav1/information/push/list'
            }, 1000)
          })
        })
      },
      withdraw(){
        this.$confirm('确定要撤回, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          infoApi.info.pushRadioWithdraw({id: this.pushDetail.id}).then(res => {
            this.$message.success('撤回成功');
            setTimeout(() => {
              window.location.pathname = '/nav1/information/push/list'
            }, 1000)
          })
        }).catch(() => {
          this.$message.info('已取消撤回');          
        });
      },
      backto() {
        this.$router.go(-1);
      },
      getDetail() {
        let id = localStorage.getItem('pushId');
        infoApi.info.pushRadioDetail({id: id}).then(res => {
          this.pushDetail = res.data;
          this.form.title = res.data.title;
          this.form.content = res.data.content;
          this.form.push = res.data.attachment.title;
          this.form.apptype = res.data.destApp.length > 1 ? '0' : res.data.destApp[0];
          this.parkSelect = res.data.destParks;
          this.form.created = functionApi.moment.getListTime(res.data.created);
          this.form.sendTime = functionApi.moment.getListTime(res.data.sendTime);
          this.name = res.data.account.username;
          if(res.data.destPeople.tags){
            this.form.recepter = '1';
            this.form.setRecepter = res.data.destPeople.tags;
          }else{
            this.form.recepter ='0';
          }
          const states = ['待发送', '已发送', '发送失败', '已撤回'];
          for(let i = 0; i < states.length; i++){
            if(res.data.state == i){
              this.pushDetail.state = states[i];
            }
          } 
        })
      }
    },
    mounted() {
      infoApi.pub.getAllPark().then(res => {
        this.parkOptions = res.data.area;
        for(let i = 0; i < this.parkOptions.length; i++){
          let province = this.parkOptions[i];
          province.value = province.label;
          for(let j = 0; j < province.children.length; j++){
            let city = province.children[j];
            city.value = city.label;
            for(let k = 0; k < city.children.length; k++){
              let area = city.children[k];
              area.value = area.label;
              for(let m = 0; m < area.children.length; m++){
                let park = area.children[m];
                park.value = park.label;
              }
            }
          }
        }
      });
      this.getDetail();
    }
  }
</script>

<style lang="scss" scoped>
  .manageForm{ margin:20px; width:60%; min-width:800px;
    .info{ margin-bottom:20px; font-size:14px; color:rgb(72, 87, 106); line-height:26px; overflow:hidden; vertical-align:middle; 
      label{ display:block; float:left; width:85px; text-align:right; }
      span{ display:block; float:left; width:580px; text-align:justify; }
    }
    .p-r{ padding-right:10px; }
    .m-t{ margin-top:-20px; }
    .model{ font-weight:bold; color:#20a0ff; border-left:3px solid #20a0ff; padding:1px 12px; }
    .el-tag{ display:inline-block; background-color:rgba(32,159,255,.1); border-color:rgba(32,159,255,.2); font-size:14px; color:#20a0ff; height:34px; line-height:34px; margin:0 10px 6px 0; padding:0 10px; }
  }
  .btn-wrap{ display:flex; width:100%; justify-content:center; padding:30px;
    .el-button{width:100px;margin:0 30px;}
  }
</style>