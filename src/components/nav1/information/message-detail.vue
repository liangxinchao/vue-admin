<template>
  <div>
    <el-form ref="form" :model="form" label-width="95px" label="right" class="manageForm">
      <p class="model">基本设置</p>
      <el-form-item label="短信内容:" prop="content" required>
        <el-input type="textarea" v-model="form.content" :maxlength="225" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请填写短信内容。" :disabled="true"></el-input>
        <p class="tip">还可输入<i>{{225-form.content.length}}</i>字</p>
      </el-form-item>
      <el-form-item style="margin-top:-15px;">
        <p style="margin-top:10px; font-size:12px; line-height:12px; color:#ccc;">注意：根据运营商政策规定，建议每次提交小于等于225个字符（含签名、空格、字母、符号等）</p>
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
        <el-radio-group v-model="form.recepter">
          <el-radio label="0" :disabled="true">全部用户</el-radio>
          <el-radio label="1" :disabled="true">部分用户</el-radio>
          <el-radio label="2" :disabled="true">指定用户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="m-t" label="" v-if="form.recepter == '1'" prop="setRecepter">
        <el-checkbox-group v-model="form.setRecepter">
          <el-checkbox label="p0" name="setRecepter" :disabled="true">注册用户</el-checkbox>
          <el-checkbox label="p1" name="setRecepter" :disabled="true">园区用户</el-checkbox>
          <el-checkbox label="a1" name="setRecepter" :disabled="true">管理员</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="m-t" label="" v-if="form.recepter == '2'">
        <el-col :span="24">
          <el-form-item prop="user">
            <el-input type="textarea" placeholder="填写手机号码，并以‘/’分开" v-model="form.user" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <p class="model">发送设置</p>
      <el-form-item label="选择签名:" prop="sign" required>
        <el-radio-group v-model="form.sign">
          <el-radio label="0" :disabled="true">汇创业</el-radio>
          <el-radio label="1" :disabled="true">梦想小镇</el-radio>
          <el-radio label="2" :disabled="true">不设置签名</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发送时间:" required>
        <el-col :span="10">
          {{form.created}}
        </el-col>
      </el-form-item>
      <el-form-item label="定时时间:" required>
        <el-col :span="10">
          {{form.setTime}}
        </el-col>
      </el-form-item>
      <el-form-item label="操作人:">
        <el-col>{{name}}</el-col>
      </el-form-item>
       <el-form-item label="状态:">
        <el-col>{{messageDetail.state}}</el-col>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleModify" type="primary">转发</el-button>
        <el-button type="primary" v-if="messageDetail.state=='发送失败'">重发</el-button>
        <el-button @click="widthdraw()" type="primary" v-if="messageDetail.state=='待发送'">撤回</el-button>
        <el-button @click.prevent="backto">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import infoApi from '@/js/api.js';
  import functionApi from '@/js/function.js';
  import $ from 'jquery';
  export default {
    data() {
      return {
        name:'',
        form:{
          content: '',
          park: [],
          recepter: '',
          setRecepter: [],
          user: '',
          time: '',
          setDate: '',
          setTime: '',
          sign: ''
        },
        messageDetail:{},
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
      backto() {
        this.$router.push({path:'/nav1/information/message/list'});
      },
      handleModify(){
        localStorage.setItem('messageId', this.messageDetail.id);
        this.$router.push({path:'/nav1/information/message/modify'});
      },
      widthdraw() {
        this.$confirm('确定要撤回该短信吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          infoApi.info.pushSmsWithdraw({id: this.messageDetail.id}).then(res => {
            this.$message.success('撤回成功!');
            setTimeout(() => {
              window.location.pathname='/nav1/information/message/list'
            }, 1000)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消撤回'
          });          
        });
      },
      getDetail() {
        let id = localStorage.getItem('messageId');
        infoApi.info.pushSmsDetail({id:id}).then(res => {
          this.messageDetail = res.data;
          console.log(res.data);
          this.form.content = res.data.content;
          this.parkSelect = res.data.destParks;
          if(res.data.destPeople.all){
            this.form.recepter = '0'
          }else if(res.data.destPeople.tags){
            this.form.recepter = '1';
            this.form.setRecepter = res.data.destPeople.tags;
          }else{
            this.form.recepter = '2';
            this.form.user = res.data.destPeople.alias.join('/')
          }
          this.form.created = functionApi.moment.getListTime(res.data.created);
          this.form.setTime = functionApi.moment.getListTime(res.data.setTime); 
          this.form.sign = res.data.sign;
          this.name = res.data.account.username;
           const states = ['待发送', '已发送', '发送失败', '已撤回'];
          for(let i = 0; i < states.length; i++){
            if(res.data.state == i){
              this.messageDetail.state = states[i];
            }
          }
        })
      }
    },
    mounted() {
      this.getDetail();
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
  .tip{ margin:0; position:absolute; bottom:-10px; right:10px; font-size:12px; color:#ccc; 
      i{ color:#ff4949; font-style:normal; }
    }
</style>