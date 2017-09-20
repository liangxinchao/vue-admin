<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="95px" label="right" class="manageForm">
      <p class="model">基本设置</p>
      <el-form-item label="推送标题:" prop="title" required>
        <el-input v-model="form.title" placeholder="请填写推送标题"></el-input>
      </el-form-item>
      <el-form-item label="推送内容:" prop="content" required>
        <el-input type="textarea" :maxlength="58" v-model="form.content" :autosize="{ minRows: 2, maxRows: 4}" placeholder="推送内容不能超过58个字"></el-input>
        <p class="tip">还可输入<i>{{58-form.content.length}}</i>字</p>
      </el-form-item>
      <el-form-item label="推送:" prop="push">
        <el-col :span="20">
          <el-input v-model="form.push" placeholder="请选择推送内容"></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-button @click="infoselect">选择</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="选择APP:" required prop="apptype">
        <el-radio-group v-model="form.apptype">
          <el-radio label="2">全部APP</el-radio>
          <el-radio label="0">汇创业</el-radio>
          <el-radio label="1">梦想小镇</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发送区域:">
        <el-col :span="20">
          <el-cascader style="width:100%;" expand-trigger="hover" v-model="form.park" :options="parkOptions"></el-cascader>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-button type="primary" size="small" @click="addPark">+添加</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="" v-if="form.parkSelect.length != 0">
        <el-row style="border-bottom:1px dashed #ccc;" v-for="(item, index) in form.parkSelect" :key="item">
          <el-col :span="1">{{index+1}}、</el-col>
          <el-col :span="16">{{item.province}}·{{item.city}}·{{item.zone}}·{{item.address}}</el-col>
          <el-col :span="3" :offset="1">
            <el-button size="small" @click="delPark(index)">删除</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="接收人:" required prop="recepter">
        <el-radio-group v-model="form.recepter">
          <el-radio label="0">全部用户</el-radio>
          <el-radio label="1">部分用户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="m-t" label="" v-if="form.recepter == '1'" prop="setRecepter">
        <el-checkbox-group v-model="form.setRecepter">
          <el-checkbox label="p0" name="setRecepter">注册用户</el-checkbox>
          <el-checkbox label="p1" name="setRecepter">园区用户</el-checkbox>
          <el-checkbox label="e0" name="setRecepter">注册企业</el-checkbox>
          <el-checkbox label="e1" name="setRecepter">认证企业</el-checkbox>
          <el-checkbox label="e2" name="setRecepter">园区企业</el-checkbox>
          <el-checkbox label="a1" name="setRecepter">管理员</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="发送时间:" required>
        <el-col :span="4">
          <el-form-item prop="time">
            <el-radio-group v-model="form.time">
              <el-radio label="0">立即</el-radio>
              <el-radio label="1">定时</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1" v-if="form.time == '1'">
          <el-form-item prop="setDate">
            <el-date-picker v-model="form.setDate" type="date" placeholder="年-月-日" :picker-options="pickerOptions"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="1" v-if="form.time == '1'">
          <el-form-item prop="setTime">
            <el-time-picker v-model="form.setTime" format="HH:mm" placeholder="时:分"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="onSubmit">发送</el-button>
        <el-button @click="backlist">返回</el-button>
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
        form: this.$store.state.info.pushformModify,
        rules: {
          title: [
            { required: true, message: '请填写推送标题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请填写推送内容', trigger: 'blur' },
            { min: 1, max: 58, message: '内容不能超过58个汉字', trigger: 'blur' }
          ],
          apptype: [
            { required: true, message: '请选择APP类型', trigger: 'change' }
          ],
          recepter: [
            { required: true, message: '请选择接收人', trigger: 'change' }
          ],
          setRecepter: [
            { type: 'array', required: true, message: '请至少选择一个接收者', trigger: 'change' }
          ],
          time: [
            { required: true, message: '请选择发送时间', trigger: 'change' }
          ],
          setDate: [
            { type:'date', required: true, message: '请选择发送日期', trigger: 'change' }
          ],
          setTime: [
            { type:'date', required: true, message: '请选择发送时间', trigger: 'change' }
          ]
        },
        parkOptions: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        attachment: {}
      }
    },
    methods: {
      infoselect() {
        this.$store.dispatch('createform', this.form);
        this.$router.push({path:'/nav1/information/push/select'})
      },
      addPark(){
        if(this.form.park.length == 0) return false;
        let park = {
          province: this.form.park[0],
          city: this.form.park[1],
          zone: this.form.park[2],
          address: this.form.park[3]
        };
        if(this.form.parkSelect.length != 0){
          for(let i = 0; i < this.form.parkSelect.length; i++){
            if(this.form.parkSelect[i].province == park.province && this.form.parkSelect[i].city == park.city&&this.form.parkSelect[i].zone == park.zone && this.form.parkSelect[i].address ==park.address){
              this.$message.error('已经添加过该园区');
              return false;
            }
          }
        }
        this.form.parkSelect.push(park);
        this.form.park = [];
      },
      delPark(index){
        this.$confirm('确定删除该园区吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form.parkSelect.splice(index, 1);
        });
      },
      onSubmit(){
        let postdata = {
          title: this.form.title,
          content: this.form.content,
          shareUrl: '',
          attachment: JSON.stringify(this.$store.state.selectpush) == "{}" ? this.attachment : this.$store.state.selectpush,
          destApp: this.form.apptype == '2' ? ['0','1'] : [this.form.apptype],
          destParks: this.form.parkSelect,
          destPeople: this.form.recepter == '0' ? {all: 'all'} : {tags: this.form.setRecepter},
          sendTime: this.form.time == '0'? new Date() : (functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(this.form.setDate) + ' ' + functionApi.moment.getHM(this.form.setTime)))
        };
        this.$refs['form'].validate((valid) => {
          if(valid){
            infoApi.info.pushRadioCreate(postdata).then(res => {
              this.$store.state.selectpush.id = '';
              this.$store.state.selectpush.type = '';
              this.$store.state.selectpush.title = '';
              this.$store.state.selectpush.content = '';
              this.$message.success('推送发送成功!');
              setTimeout(() => {
                window.location.pathname = '/nav1/information/push/list'
              }, 1000)
            })
          }else{
            return false;
          }
        });
      },
      backlist(){
        setTimeout(() => {
          window.location.pathname='/nav1/information/push/list'
        }, 1000)
      },
      getDetail() {
        let id = localStorage.getItem('pushId');
        let type = localStorage.getItem('pushType');
        if(type == 'push'){
           infoApi.info.pushRadioDetail({id: id}).then(res => {
            this.form.title = res.data.title;
            this.form.content = res.data.content;
            if(JSON.stringify(this.$store.state.selectpush) == "{}"){
              this.form.push = res.data.attachment.title;
            }else{
              this.form.push = this.$store.state.selectpush.title;
            }
            this.attachment = res.data.attachment;
            this.form.apptype = res.data.destApp.length > 1 ? '0' : res.data.destApp[0];
            this.form.parkSelect = res.data.destParks;
            if(res.data.destPeople.tags){
              this.form.recepter = '1';
              this.form.setRecepter = res.data.destPeople.tags;
            }else{
              this.form.recepter ='0';
            }
          })
         }else if(type == 'activity'){
          infoApi.activity.postDetail(id).then(res => {
            this.form.title = res.data.title;
            this.form.content = res.data.brief;
            if(JSON.stringify(this.$store.state.selectpush) == "{}"){
              this.form.push = res.data.title;
            }else{
              this.form.push = this.$store.state.selectpush.title;
            }
            this.attachment = {
              id: id,
              title: res.data.title,
              content: res.data.content,
              type: '1'
            }
          })
        }
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
    .tip{ margin:0; position:absolute; bottom:-10px; right:10px; font-size:12px; color:#ccc; 
      i{ color:#ff4949; font-style:normal; }
    }
  }
</style>