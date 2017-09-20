<template>
	<div>
    <el-form ref="form" :model="form" label-width="95px" label="right" class="manageForm">
      <p class="model">基本信息</p>
      <p class="info">
        <label>活动标题：</label><span>{{activityData.title}}</span>
      </p>
      <p class="info">
        <label>发布人：</label><span>{{activityData.account}}</span>
      </p>
      <p class="info">
        <label>活动状态：</label><span>{{activityData.state}}</span>
      </p>
      <p class="info">
        <label>发布时间：</label><span>{{activityData.created}}</span>
      </p>
      <p class="info">
        <label>活动时间：</label><span>{{activityData.timeOfActivity}}</span>
      </p>
      <p class="info">
        <label>报名时间：</label><span>{{activityData.timeOfEnrollment}}</span>
      </p>
      <p class="info">
        <label>活动地点：</label><span>{{activityData.location}}</span>
      </p>
      <p class="info">
        <label>主办单位：</label><span>{{activityData.sponsor}}</span>
      </p>
      <p class="info" v-if="activityData.coSponsor != ''">
        <label>协办单位：</label><span>{{activityData.coSponsor}}</span>
      </p>
      <p class="info">
        <label>活动限额：</label><span>{{activityData.numberOfExpected}}人</span>
      </p>
      <p class="info" v-if="activityData.state != '待审核'">
        <label>报名人数：</label><span>{{activityData.enrollCount}}人</span>
      </p>
      <div v-if="activityData.state == '已下架'">
        <p class="model" >下架信息</p>
        <p class="info" v-if="activityData.coSponsor != ''">
          <label>下架时间：</label><span>{{activityData.coSponsor}}</span>
        </p>
        <p class="info">
          <label>下架人：</label><span>{{activityData.numberOfExpected}}人</span>
        </p>
        <p class="info">
          <label>下架原因：</label><span>{{activityData.enrollCount}}人</span>
        </p>
      </div>
      <p class="model">宣传设置</p>
      <el-form-item label="园区:">
        <el-cascader style="width:50%;" expand-trigger="hover" v-model="form.park" :options="parkOptions"></el-cascader>
      </el-form-item>
      <el-form-item label="摘要:" prop="brief">
        <el-input type="textarea" v-model="form.brief" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请填写摘要，摘要不超过120个字,如果不填会默认抓取正文前54个字。"></el-input>
      </el-form-item>
      <el-form-item label="关键字:">
        <el-tag :key="tag" v-for="tag in form.keywords" :closable="true" :close-transition="false" @close="delKeywords(tag)">{{tag}}</el-tag>
        <el-input v-if="keyInputVisible" class="small-ipt" v-model="keyInputValue" ref="saveTagInput" @keyup.enter.native="keywordsInput" @blur="keywordsInput"></el-input>
        <el-button v-else @click="addKeywords">+新增关键字</el-button>
      </el-form-item>
      <p class="model">网页推广</p>
      <el-form-item label="显示:">
        <el-radio-group v-model="form.iswebshow">
          <el-radio label="0">是</el-radio>
          <el-radio label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="轮播:">
        <el-checkbox v-model="form.iswebbanner">活动轮播</el-checkbox>
      </el-form-item>
      <el-form-item label="推荐:">
        <el-checkbox-group v-model="form.webrecomment">
          <el-checkbox label="置顶" name="webrecomment"></el-checkbox>
          <el-checkbox label="推荐" name="webrecomment"></el-checkbox>
          <el-checkbox label="热门" name="webrecomment"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="宣传图:" prop="webCoverImg">
        <input type="file" @change="onFileChange" id="webCoverImg" class="hide"/>
        <input type="button" value="选择图片" @click="uploadthumb('webCoverImg')" />
        <div class="thumbset">
          <div class="thumbImg coverImg">
            <a href="javascript:void(0)" class="reselect" v-if="form.webCoverImg !== ''" @click="clearthumb('webCoverImg')">×</a>
            <img class="cover" :src="form.webCoverImg"/>
          </div>
          <i class="el-icon-picture thumb-uploader-icon cover-icon"></i>
        </div>
        <div class="el-upload__tip">适用于轮播图，图片不大于5M（jpg,gif,png,bmp格式），尺寸不小于 800*473px！</div>
      </el-form-item>
      <p class="model">App推广</p>
      <el-form-item label="显示:">
        <el-radio-group v-model="form.isappshow">
          <el-radio label="0">是</el-radio>
          <el-radio label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="轮播:">
        <el-checkbox v-model="form.isappbanner">活动轮播</el-checkbox>
      </el-form-item>
      <el-form-item label="推荐:">
        <el-checkbox-group v-model="form.apprecomment">
          <el-checkbox label="置顶" name="apprecomment"></el-checkbox>
          <el-checkbox label="推荐" name="apprecomment"></el-checkbox>
          <el-checkbox label="热门" name="apprecomment"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="宣传图:" prop="appCoverImg">
        <input type="file" @change="onFileChange" id="appCoverImg" class="hide"/>
        <input type="button" value="选择图片" @click="uploadthumb('appCoverImg')" />
        <div class="thumbset">
          <div class="thumbImg coverImg">
            <a href="javascript:void(0)" class="reselect" v-if="form.appCoverImg !== ''" @click="clearthumb('appCoverImg')">×</a>
            <img class="cover" :src="form.appCoverImg"/>
          </div>
          <i class="el-icon-picture thumb-uploader-icon cover-icon"></i>
        </div>
        <div class="el-upload__tip">适用于轮播图，图片不大于5M（jpg,gif,png,bmp格式），尺寸不小于 800*473px！</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="onSubmit" v-if="activityData.state!='待审核' && activityData.state!='已下架'">保存</el-button>
        <el-button type="primary" @click.prevent="onSubmit" v-if="activityData.state=='已下架'">上架</el-button>
        <el-button @click.prevent="onSubmit" v-if="activityData.state=='报名中' || activityData.state=='预热中' || activityData.state=='进行中'">推送</el-button>
        <el-button @click.prevent="onSubmit" v-if="activityData.state=='报名中' || activityData.state=='预热中' || activityData.state=='进行中' || activityData.state=='已结束'">下架</el-button>
        <el-button @click.prevent="onSubmit">返回</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="请填写下架原因" v-model="unlineFormShow">
      <el-form :model="unlineform" :rules="unlinerules" ref="unlineform">
        <el-form-item prop="content">
          <el-input type="textarea" v-model="unlineform.content" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="unlineFormShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmUnlineBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import activityApi from '@/js/api.js';
  import functionApi from '@/js/function.js';
  import $ from 'jquery';
  export default {
    data() {
      return {
        activityData: {},
        unlineFormShow: false,
        unlineform: {
          content:''
        },
        unlinerules:{
          content:[
            { required: true, message: '下架原因', trigger: 'blur' }
          ]
        },
        form: {
          park: [],
          brief: '',
          keywords: [],
          iswebshow: '1',
          iswebbanner: false,
          webrecomment: [],
          webCoverImg: '',
          isappshow: '1',
          isappbanner: false,
          apprecomment: [],
          appCoverImg: ''
        },
        disabled: false,
        parkOptions: [],
        keyInputVisible: false,
        keyInputValue: '',
        uploadUrl: ''
      }
    },
    methods: {
      delKeywords(tag) {
        this.form.keywords.splice(this.form.keywords.indexOf(tag), 1);
      },
      addKeywords() {
        this.keyInputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      keywordsInput() {
        let keyInputValue = this.keyInputValue;
        if (keyInputValue && keyInputValue.length <= 5 && this.form.keywords.length <= 2) {
          this.form.keywords.push(keyInputValue);
          this.keyInputVisible = false;
          this.keyInputValue = '';
        }else if(keyInputValue && (keyInputValue.length > 5 || this.form.keywords.length > 2)){
          this.$message({
            message: '关键字长度不超过5,总个数不超过3',
            type: 'warning'
          });
        }else{
          this.keyInputVisible = false;
          this.keyInputValue = '';
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
        document.getElementById('appCoverImg').value = '';
        document.getElementById('webCoverImg').value = '';
      },
      onSubmit(e){
        let vm = this;
        let option = e.target.innerText;
        let postdata = {
          id: localStorage.getItem('activityId'),
          park: {
            province: vm.form.park ? vm.form.park[0] : '',
            city: vm.form.park ? vm.form.park[1] : '',
            zone: vm.form.park ? vm.form.park[2] : '',
            address: vm.form.park ? vm.form.park[3] : ''
          },
          brief: vm.form.brief,
          keywords: vm.form.keywords,
          webShow: vm.form.iswebshow,
          webCarousel: vm.form.iswebbanner == true ? '0' : '1',
          webTag: {
            hot: $.inArray("热门", vm.form.webrecomment) == -1 ? '0' : '1',
            rec: $.inArray("推荐", vm.form.webrecomment) == -1 ? '0' : '1',
            top: $.inArray("置顶", vm.form.webrecomment) == -1 ? '0' : '1'
          },
          webCover: vm.form.webCoverImg,
          appShow: vm.form.isappshow,
          appCarousel: vm.form.isappbanner == true ? '0' : '1',
          appTag: {
            hot: $.inArray("热门", vm.form.apprecomment) == -1 ? '0' : '1',
            rec: $.inArray("推荐", vm.form.apprecomment) == -1 ? '0' : '1',
            top: $.inArray("置顶", vm.form.apprecomment) == -1 ? '0' : '1'
          },
          appCover: vm.form.appCoverImg
        };
        if(option == '保存'){
          activityApi.activity.postDetailInfo(postdata).then(res => {
            this.$message.success('保存成功!');
          })
        }else if(option == '返回'){
          vm.$router.go(-1);
        }else if(option == '下架'){
          this.unlineFormShow = true;
        }else if(option == '上架'){
          this.$confirm('确定要上架吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            activityApi.activity.postOnline({id:this.activityData.id}).then(res => {
              this.$message.success('上架成功!');
              this.$router.push({path:'/nav1/activity/activitylist/online'});
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消上架'
            });          
          });
        }else if(option == '推送'){
          alert('推送！');
        }
      },
      confirmUnlineBtn() {
         this.$refs['unlineform'].validate((valid) => {
          if (valid) {
            this.unlineform.id = this.activityData.id;
            activityApi.activity.postOff(this.unlineform).then((res) =>{
              this.unlineFormShow = false;
              this.$message.success('下架成功!');
              this.$router.push({path:'/nav1/activity/activitylist/unline'});
            })
          } else {
            return false;
          }
        });
      }
    },
    mounted() {
      const activityId = localStorage.getItem('activityId');
      const activityState = [{label:'待审核', value:"1"}, {label:'报名中', value:"4"}, {label:'预热中', value:"5"}, {label:'进行中', value:"6"}, {label:'已结束', value:"7"}, {label:'已取消', value:"10"}, {label:'已下架', value:"11"}];
      activityApi.pub.getAllPark().then(res => {
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
      activityApi.pub.getUploadUniqueKey().then(res => {
        let self = this;
        self.uploadUrl = res.data.queryURL;
      });
      activityApi.activity.postDetail(activityId).then(res => {
        this.activityData = res.data;
        this.activityData.account = this.activityData.account.name;
        for(let i = 0; i < activityState.length; i++){
          if(this.activityData.state == activityState[i].value){
            this.activityData.state = activityState[i].label;
          }
        }
        if(this.activityData.state == '待审核' || this.activityData.state == '已取消'){
          this.disabled = true;
        }else{
          this.disabled = false;
        }
        this.activityData.created = functionApi.moment.getListTime(this.activityData.created);

        const startOfActivityYear = functionApi.moment.getYear(this.activityData.startOfActivity);
        const startOfActivityMonth = functionApi.moment.getMonth(this.activityData.startOfActivity);
        const startOfActivityDay = functionApi.moment.getDay(this.activityData.startOfActivity);
        const endOfActivityYear = functionApi.moment.getYear(this.activityData.endOfActivity);
        const endOfActivityMonth = functionApi.moment.getMonth(this.activityData.endOfActivity);
        const endOfActivityDay = functionApi.moment.getDay(this.activityData.endOfActivity);
        if(startOfActivityYear !== endOfActivityYear){
          this.activityData.timeOfActivity = functionApi.moment.getYMDHM(this.activityData.startOfActivity) + ' - ' + functionApi.moment.getYMDHM(this.activityData.endOfActivity);
        }else{
          if(startOfActivityMonth == endOfActivityMonth && startOfActivityDay == endOfActivityDay){
            this.activityData.timeOfActivity = functionApi.moment.getMDHM(this.activityData.startOfActivity) + ' - ' + functionApi.moment.getHM(this.activityData.endOfActivity);
          }else{
            this.activityData.timeOfActivity = functionApi.moment.getMDHM(this.activityData.startOfActivity) + ' - ' + functionApi.moment.getMDHM(this.activityData.endOfActivity);
          }
        }
        if(this.activityData.state == '待审核'){
          this.activityData.timeOfEnrollment = '截止到' + functionApi.moment.getYMDHM(this.activityData.endOfEnrollment);
        }else{
          const startOfEnrollmentYear = functionApi.moment.getYear(this.activityData.startOfEnrollment);
          const startOfEnrollmentMonth = functionApi.moment.getMonth(this.activityData.startOfEnrollment);
          const startOfEnrollmentDay = functionApi.moment.getDay(this.activityData.startOfEnrollment);
          const endOfEnrollmentYear = functionApi.moment.getYear(this.activityData.endOfEnrollment);
          const endOfEnrollmentMonth = functionApi.moment.getMonth(this.activityData.endOfEnrollment);
          const endOfEnrollmentDay = functionApi.moment.getDay(this.activityData.endOfEnrollment);
          if(startOfEnrollmentYear !== endOfEnrollmentYear){
            this.activityData.timeOfEnrollment = functionApi.moment.getYMDHM(this.activityData.startOfEnrollment) + ' - ' + functionApi.moment.getYMDHM(this.activityData.endOfEnrollment);
          }else{
            if(startOfEnrollmentMonth == endOfEnrollmentMonth && startOfEnrollmentDay == endOfEnrollmentDay){
              this.activityData.timeOfEnrollment = functionApi.moment.getMDHM(this.activityData.startOfEnrollment) + ' - ' + functionApi.moment.getHM(this.activityData.endOfEnrollment);
            }else{
              this.activityData.timeOfEnrollment = functionApi.moment.getMDHM(this.activityData.startOfEnrollment) + ' - ' + functionApi.moment.getMDHM(this.activityData.endOfEnrollment);
            }
          }
        }

        this.activityData.location = this.activityData.location.province + '·' + this.activityData.location.city + '·' + this.activityData.location.area;
        this.activityData.sponsor = this.activityData.sponsor.join(',');

        if(this.activityData.coSponsor == []){
          this.activityData.coSponsor = '';
        }else{
          this.activityData.coSponsor = this.activityData.coSponsor.join(',');
        }
        
        this.activityData.numberOfExpected = this.activityData.numberOfExpected == -1 ? "不限人数" :this.activityData.numberOfExpected;
        if(this.activityData.park){
          this.form.park = [this.activityData.park.province, this.activityData.park.city, this.activityData.park.zone, this.activityData.park.address];
        }
        
        this.form.brief = this.activityData.brief;
        this.form.keywords = this.activityData.keywords ? this.activityData.keywords : [];

        this.form.iswebshow = this.activityData.webShow ? this.activityData.webShow : '1';
        if(this.activityData.webCarousel && this.activityData.webCarousel == '0'){
          this.form.iswebbanner = true;
        }else if(this.activityData.webCarousel && this.activityData.webCarousel == '1'){
          this.form.iswebbanner = false;
        }

        if(this.activityData.webTag && this.activityData.webTag.top == '1'){
          this.form.webrecomment.push('置顶');
        }
        if(this.activityData.webTag && this.activityData.webTag.rec == '1'){
          this.form.webrecomment.push('推荐');
        }
        if(this.activityData.webTag && this.activityData.webTag.hot == '1'){
          this.form.webrecomment.push('热门');
        }
        this.form.webCoverImg = this.activityData.webCover ? this.activityData.webCover : ''; 

        this.form.isappshow = this.activityData.appShow ? this.activityData.appShow : '1';
        if(this.activityData.appCarousel && this.activityData.appCarousel == '0'){
          this.form.isappbanner = true;
        }else if(this.activityData.appCarousel && this.activityData.appCarousel == '1'){
          this.form.isappbanner = false;
        }
        
        if(this.activityData.appTag && this.activityData.appTag.top == '1'){
          this.form.apprecomment.push('置顶');
        }
        if(this.activityData.appTag && this.activityData.appTag.rec == '1'){
          this.form.apprecomment.push('推荐');
        }
        if(this.activityData.appTag && this.activityData.appTag.hot == '1'){
          this.form.apprecomment.push('热门');
        }
        this.form.appCoverImg = this.activityData.appCover ? this.activityData.appCover : '';
      })
    }
  }
</script>

<style lang="scss" scoped>
  .manageForm{ margin:20px; width:60%; min-width:600px;
    .info{ margin-bottom:20px; font-size:14px; color:rgb(72, 87, 106); line-height:26px; vertical-align:middle; 
      label{ display:inline-block; width:85px; text-align:right; }
      span{ display:inline-block; }
    }
    .p-r{padding-right:10px;}
    .model{ font-weight:bold; color:#20a0ff; border-left:3px solid #20a0ff; padding:1px 12px; }
    .el-tag{ display:inline-block; background-color:rgba(32,159,255,.1); border-color:rgba(32,159,255,.2); font-size:14px; color:#20a0ff; height:34px; line-height:34px; margin:0 10px 6px 0; padding:0 10px; }
    .small-ipt{ width:178px; }
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