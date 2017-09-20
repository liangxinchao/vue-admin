<template>
  <el-form :model="form" ref="form" label-width="120px" label="right" class="manageForm">
    <p class="model">基本信息</p>
    <el-form-item label="入驻日期:">{{form.date}}</el-form-item>
    <el-form-item label="真实姓名：" class="small-ipt" required>
      <el-input v-model="form.realname"></el-input>
    </el-form-item>
    <el-form-item label="入驻企业：" required>{{form.company}}
      <el-button>选择</el-button>
    </el-form-item>
    <el-form-item label="入驻园区:" class="small-ipt" required>
      <el-cascader style="width:100%;" expand-trigger="hover" v-model="form.park" :options="parkOptions"></el-cascader>
    </el-form-item>
    <el-form-item label="性别:" required>
      <el-radio-group v-model="form.sex">
        <el-radio label="0">男</el-radio>
        <el-radio label="1">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="最高学历" required>
      <el-select v-model="form.education" placeholder="请选择学历">
        <el-option v-for="(item, index) in educations" :label="item" :value="item" :key="index"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="政治面貌" required>
      <el-select v-model="form.outlook" placeholder="请选择政治面貌">
        <el-option v-for="(item, index) in politicalOutlook" :label="item" :value="item" :key="index"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="人才类型" required>
      <el-select v-model="form.talent" placeholder="请选择人才类型">
        <el-option v-for="(item, index) in talentTypes" :label="item" :value="item" :key="index"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="资质证明:" v-if="form.talent != '无'" required>
      <input type="file" @change="onFileChange" id="qualifyImg" class="hide"/>
      <input type="button" value="选择图片" @click="uploadthumb('qualifyImg')" />
      <div class="thumbset">
        <div class="qualifyImg">
          <a href="javascript:void(0)" class="reselect" v-if="form.qualifyImg !== ''" @click="clearthumb('qualifyImg')">×</a>
          <img :src="form.qualifyImg" />
        </div>
        <i class="el-icon-picture thumb-uploader-icon"></i>
      </div>
    </el-form-item>
    <p class="model">户籍信息</p>
    <el-form-item label="户籍类型:" required>
      <el-radio-group v-model="form.register">
        <el-radio label="0">国内居民</el-radio>
        <el-radio label="1">港澳台居民</el-radio>
        <el-radio label="2">外籍人士</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="户籍地区:" required>
      <el-cascader expand-trigger="hover" placeholder="选择省市" :options="area" v-model="form.location1" v-if="form.register=='0'"></el-cascader>
      <el-select v-model="form.location2" placeholder="选择地区" v-if="form.register=='1'">
        <el-option v-for="(item, index) in location2" :label="item" :value="item" :key="index"></el-option>
      </el-select>
      <el-select v-model="form.location3" placeholder="选择国家" v-if="form.register=='2'">
        <el-option v-for="(item, index) in location3" :label="item" :value="item" :key="index"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="户籍地址:" class="small-ipt" required>
      <el-input v-model="form.address" placeholder="请填写您的户籍地址"></el-input>
    </el-form-item>
    <el-form-item label="现居住地:" required>
      <el-row>
        <el-col :span="10">
          <el-cascader expand-trigger="hover" placeholder="选择省市" :options="area" v-model="form.locationNow" v-if="form.register=='0'"></el-cascader>
        </el-col>
        <el-col :span="14">
          <el-input v-model="form.addressNow" placeholder="请填写您的户籍地址"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="证件类型:" required>
      <el-row>
        <el-col :span="10">
          <el-select v-model="form.certificates" placeholder="选择证件类型">
            <el-option v-for="(item, index) in certificates" :label="item" :value="item" :key="index"></el-option>
          </el-select>
        </el-col>
        <el-col :span="14">
          <el-input v-model="form.certificatesId" placeholder="请填写证件号码"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="身份证正面:" v-if="form.certificates== '身份证'" required>
      <input type="file" @change="onFileChange" id="frontIdImg" class="hide"/>
      <input type="button" value="选择图片" @click="uploadthumb('frontIdImg')" />
      <div class="thumbset">
        <div class="qualifyImg idImg">
          <a href="javascript:void(0)" class="reselect" v-if="form.frontIdImg !== ''" @click="clearthumb('frontIdImg')">×</a>
          <img class="idcard" :src="form.frontIdImg" />
        </div>
        <i class="el-icon-picture thumb-uploader-icon id-icon"></i>
      </div>
    </el-form-item>
    <el-form-item label="身份证背面:" v-if="form.certificates== '身份证'" required>
      <input type="file" @change="onFileChange" id="backIdImg" class="hide"/>
      <input type="button" value="选择图片" @click="uploadthumb('backIdImg')" />
      <div class="thumbset">
        <div class="qualifyImg idImg">
          <a href="javascript:void(0)" class="reselect" v-if="form.backIdImg !== ''" @click="clearthumb('backIdImg')">×</a>
          <img class="idcard" :src="form.backIdImg" />
        </div>
        <i class="el-icon-picture thumb-uploader-icon id-icon"></i>
      </div>
    </el-form-item>
    <el-form-item label="证件图片:" v-if="form.certificates== '护照'" required>
      <input type="file" @change="onFileChange" id="certifyImg" class="hide"/>
      <input type="button" value="选择图片" @click="uploadthumb('certifyImg')" />
      <div class="thumbset">
        <div class="qualifyImg idImg">
          <a href="javascript:void(0)" class="reselect" v-if="form.certifyImg !== ''" @click="clearthumb('certifyImg')">×</a>
          <img class="idcard" :src="form.certifyImg" />
        </div>
        <i class="el-icon-picture thumb-uploader-icon id-icon"></i>
      </div>
    </el-form-item>
    <p class="model">卡户信息</p>
    <el-form-item label="消费卡号:">{{form.consumeNum}}</el-form-item>
    <el-form-item label="门禁卡号:">{{form.dreamNum}}</el-form-item>
    <el-form-item class="btn-wrap">
      <el-button type="primary" @click="submitForm('form')">保存</el-button>
      <el-button @click="submitForm('form')">编辑</el-button>
      <el-button @click="backTo">取消</el-button>
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
          date: '2016-01-01',
          realname: '',
          company: '',
          park: [],
          sex: '0',
          education: '',
          outlook: '',
          talent: '',
          qualifyImg: '',
          register: '0',
          location1: [],
          location2: '',
          location3: '',
          address: '',
          locationNow: [],
          addressNow: '',
          certificates: '',
          certificatesId: '',
          frontIdImg: '',
          backIdImg: '',
          certifyImg: '',
          consumeNum: '123456',
          dreamNum: '888888'
        },
        parkOptions: [],
        educations: ['博士及以上学历', '硕士及研究生', '本科', '专科', '高中及同等学历', '初中及以下学历'],
        politicalOutlook: ['群众', '团员', '党员', '民主党派人士'],
        talentTypes: ['无', '留学归国人才', '国家“千人计划”人才', '省级“千人计划”人才'],
        uploadUrl: '',
        area: [],
        location2: ['香港', '澳门', '台湾'],
        location3: ['英国', '美国'],
        certificates: ['身份证', '护照', '回乡证', '台胞证']
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
      this.getArea();
      pubApi.pub.getAllPark().then(res => {
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
      .qualifyImg{ width:200px; max-height:200px; line-height:200px; text-align:center; position:absolute;
        &.idImg{ width:300px; height:170px; line-height:170px; }
        .reselect{ display:none; position:absolute; top:-9px; right:-9px; font-size:14px; font-weight:bold; width:18px; height:18px; line-height:18px; text-align:center; border-radius:9px; background-color:#f74c4c; color:#fff; text-decoration:none; }
        img{ width:200px; height:200px;
          &.idcard{ width:300px; height:170px; }
        }
        &:hover{
          .reselect{ display:block; }
        }
      }
      .thumb-uploader-icon{ border:none; font-size:50px; color:#8c939d; width:200px; height:200px; line-height:200px; text-align:center; cursor:pointer;
        &.id-icon{ width:300px; height:170px; line-height:170px; font-size:50px; }
      }
    }
  }
</style>
