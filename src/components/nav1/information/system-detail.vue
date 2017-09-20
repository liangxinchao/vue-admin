<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px" label="right" class="manageForm">
      <p class="model">基本设置</p>
      <el-form-item label="消息类型:" required>
        <el-col :span="9">
          <el-form-item prop="type">
             <el-select v-model="form.type" placeholder="选择类型" :disabled="true">
              <el-option label="公告" value="公告"></el-option>
              <el-option label="快讯" value="快讯"></el-option>
              <el-option label="普通消息" value="普通消息"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-checkbox label="首页滚动显示" v-model="form.setScroll" :disabled="true"></el-checkbox>
        </el-col>
      </el-form-item>
      <el-form-item label="消息标题:" prop="title" required>
        <el-input v-model="form.title" placeholder="请填写推送标题" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="消息内容:" prop="content" required>
        <el-input type="textarea" v-model="form.content" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请填写消息内容" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="推送:">
        <el-col :span="20">
          <el-form-item prop="push">
            <el-input v-model="form.push" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="选择平台:" prop="apptype" required>
        <el-radio-group v-model="form.apptype" :disabled="true">
          <el-radio label="2">全部</el-radio>
          <el-radio label="0">汇创业</el-radio>
          <el-radio label="1">梦想小镇</el-radio>
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
      <el-form-item label="接收人:" prop="recepter" required>
        <el-radio-group v-model="form.recepter" :disabled="true">
          <el-radio label="0">全部用户</el-radio>
          <el-radio label="1">部分用户</el-radio>
          <el-radio label="2">指定用户</el-radio>
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
      <el-form-item class="m-t" label="" v-if="form.recepter == '2'">
        <el-col :span="20">
          <el-form-item prop="user">
            <el-input v-model="form.user"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-button>选择</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="是否推送APP:" prop="pushapp" required>
        <el-radio-group v-model="form.pushapp" :disabled="true">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="提交时间:">
        <el-col>{{systemDetail.created}}</el-col>
      </el-form-item>
       <el-form-item label="定时时间:">
        <el-col>{{systemDetail.setTime}}</el-col>
      </el-form-item>
       <el-form-item label="操作人:">
        <el-col>{{username}}</el-col>
      </el-form-item>
       <el-form-item label="状态:">
        <el-col>{{systemDetail.state}}</el-col>
      </el-form-item>
      <el-form-item class="btn-wrap">
        <el-button @click="handleModify" type="primary">转发</el-button>
        <el-button @click="handleReSend" v-if="systemDetail.state=='发送失败'">重发</el-button>
        <el-button @click="withdraw" v-if="systemDetail.state=='待发送'">撤回</el-button>
        <el-button @click="backto">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import infoApi from '@/js/api.js';
  import functionApi from '@/js/function.js';
  export default {
    data() {
      return {
        systemDetail:{},
        form: {
          type: '',
          setScroll: false,
          title: '',
          content: '',
          push: '',
          apptype: '',
          park: [],
          recepter: '',
          setRecepter: [],
          user: '',
          time: '',
          setDate: '',
          setTime: '',
          pushapp: ''
        },
        username:'',
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
      handleModify(row){
        localStorage.setItem('systemId', this.systemDetail.id);
        this.$router.push({path:'/nav1/information/system/modify'})
      },
      handleReSend(row){
        this.$confirm('确定要重发?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          infoApi.info.pushMsgReSend({id: this.systemDetail.id}).then(res => {
            this.$message.success('重发成功');
            setTimeout(() => {
              window.location.pathname = '/nav1/information/system/list'
            }, 1000)
          })
        })
      },
      withdraw(row){
        this.$confirm('确定要撤回, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          infoApi.info.pushMsgWithdraw({id: this.systemDetail.id}).then(res => {
            this.$message.success('撤回成功');
            setTimeout(() => {
              window.location.pathname = '/nav1/information/system/list'
            }, 1000)
          })
        }).catch(() => {
          this.$message.info('已取消撤回');          
        });
      },
      backto() {
        this.$router.go(-1);
      },
      getDetail(){
        let id = localStorage.getItem('systemId');
        infoApi.info.pushMsgDetail({id: id}).then(res => {
          this.systemDetail = res.data;
          this.form.type = res.data.type;
          this.form.setScroll = res.data.isBanner == '1' ? true : false;
          this.form.title = res.data.title;
          this.form.content = res.data.content;
          this.form.push = res.data.attachment.title;
          if(res.data.destApp[0] == '0'){
            this.form.apptype = '0';
          }else if(res.data.destApp[0] == '1'){
            this.form.apptype = '1';
          }else{
            this.form.apptype = '2';
          }
          this.parkSelect = res.data.destParks;

          if(res.data.destPeople.all){
            this.form.recepter = '0';
          }else if(res.data.destPeople.tags){
            this.form.recepter = '1';
            this.form.setRecepter = res.data.destPeople.tags;
          }else if(res.data.destPeople.alias){
            this.form.recepter = '2';
            this.form.user = res.data.destPeople.alias.join('/');
          }

          this.systemDetail.created = functionApi.moment.getListTime(res.data.created);
          this.systemDetail.setTime = functionApi.moment.getListTime(res.data.setTime);
          this.username = res.data.account.username;
          this.form.pushapp = res.data.isRedio;
          const states = ['待发送', '已发送', '发送失败', '已撤回'];
          for(let i = 0; i < states.length; i++){
            if(res.data.state == i){
              this.systemDetail.state = states[i];
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
    .el-button{ width:100px; margin:0 30px; }
  }
</style>