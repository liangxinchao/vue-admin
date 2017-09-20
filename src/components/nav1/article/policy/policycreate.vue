<template> 
  <div id="policycreated">
    <el-form ref="form" :model="form" label-width="85px" label="right" class="publishForm">
      <p class="model">内容编辑</p>
      <el-form-item label="标题:" prop="title" required>
        <el-input v-model="form.title" placeholder="请填写文章标题"></el-input>
      </el-form-item>
      <el-form-item label="原文:">
        <el-input v-model="form.originUrl" placeholder="请填写原文链接"></el-input>
      </el-form-item>
      <el-form-item label="作者:" prop="author" required>
        <span>{{form.author}}</span>
        <el-button @click="chooseAuthor">选择</el-button>
      </el-form-item>
      <el-form-item label="摘要:" prop="brief">
        <el-input type="textarea" v-model="form.brief" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
      </el-form-item>
      <el-form-item label="正文:" style="width:986px;" prop='content'>
        <div id="policyContent" style="height:260px;"></div>
      </el-form-item>
      <p class="model">样式设置</p>
      <el-form-item label="主体:" prop="mainpart" required>
        <el-select v-model="form.mainpart" placeholder="请选择主体">
          <el-option label="政策主体" value="0"></el-option>
          <el-option label="国务院文件" value="1"></el-option>
          <el-option label="部委文件" value="2"></el-option>
          <el-option label="地方文件" value="3"></el-option>
          <el-option label="企业文件" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="属性:" prop="property" required>
        <el-select v-model="form.property" placeholder="请选择属性">
          <el-option label="政策属性" value="0"></el-option>
          <el-option label="国家政策" value="1"></el-option>
          <el-option label="园区政策" value="2"></el-option>
          <el-option label="孵化器政策" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型:" prop="type" required>
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option label="政策类型" value="0"></el-option>
          <el-option label="金融政策" value="1"></el-option>
          <el-option label="财税政策" value="2"></el-option>
          <el-option label="创业投资" value="3"></el-option>
          <el-option label="创业服务" value="4"></el-option>
          <el-option label="专利法规" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区域:" required>
        <el-select v-model="form.initprovince" placeholder="请选择省" @change="proChange">
          <el-option label="全国" value=""></el-option>
          <el-option v-for="province in formarea" :label="province.province.name" :value="province.province.name" :key="province.province.name"></el-option>
        </el-select>
        <el-select v-model="form.initcity" placeholder="请选择市" @change="cityChange">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="city in cities" :label="city.name" :value="city.name" :key="city.name"></el-option>
        </el-select>
        <el-select v-model="form.initarea" placeholder="请选择区">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="area in areas" :label="area.name" :value="area.name" :key="area.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="园区:">
        <el-select v-model="form.initpark" filterable placeholder="请选择">
        <el-option label="全部" value=""></el-option>
          <el-option v-for="park in formparks" :label="park.name" :value="park.id" :key="park.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="显示:" prop="privacy">
        <el-radio-group v-model="form.privacy">
          <el-radio label="0">是</el-radio>
          <el-radio label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="缩略图(web):">
        <el-col :span="24">
          <el-form-item prop="webThumbImg">
            <input type="file" @change="onFileChange" id="webThumbImg" class="hide"/>
            <input type="button" value="选择图片" @click="uploadthumb('webThumbImg')" />
            <div class="thumbset">
              <div class="thumbImg">
                <a href="javascript:void(0)" class="reselect" v-if="form.webThumbImg !== ''" @click="clearthumb('webThumbImg')">×</a>
                <img :src="form.webThumbImg"/>
              </div>
              <i class="el-icon-picture thumb-uploader-icon"></i>
            </div>
          </el-form-item>
        </el-col>
        <div class="el-upload__tip">图片小于200KB（jpg,gif,png,bmp格式）,尺寸不小于 180*126px</div>
      </el-form-item>
      <el-form-item label="缩略图(app):">
        <el-col :span="24">
          <el-form-item prop="appThumbImg">
            <input type="file" @change="onFileChange" id="appThumbImg" class="hide"/>
            <input type="button" value="选择图片" @click="uploadthumb('appThumbImg')" />
            <div class="thumbset">
              <div class="thumbImg">
                <a href="javascript:void(0)" class="reselect" v-if="form.appThumbImg !== ''" @click="clearthumb('appThumbImg')">×</a>
                <img :src="form.appThumbImg"/>
              </div>
              <i class="el-icon-picture thumb-uploader-icon"></i>
            </div>
          </el-form-item>
        </el-col>
        <div class="el-upload__tip">图片小于200KB（jpg,gif,png,bmp格式）,尺寸不小于 180*126px</div>
      </el-form-item>
      <p class="model">宣传设置</p>
      <el-form-item label="轮播:">
        <el-checkbox v-model="form.isbanner" label="政策轮播"></el-checkbox>
      </el-form-item>
      <el-form-item label="推荐:">
        <el-checkbox-group v-model="form.recomment">
          <el-checkbox label="置顶" name="recomment"></el-checkbox>
          <el-checkbox label="重要政策" name="recomment"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="关键字:">
        <el-tag :key="tag" v-for="tag in form.keywords" :closable="true" :close-transition="false" @close="delKeywords(tag)">{{tag}}</el-tag>
        <el-input class="small-ipt" v-if="keyInputVisible" v-model="keyInputValue" ref="saveTagInput" placeholder="请输入关键字" @keyup.enter.native="keywordsInput" @blur="keywordsInput"></el-input>
        <el-button v-else @click="addKeywords">+ 新增关键字</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import newsApi from '@/js/api.js';
  import axios from 'axios';
  import $ from 'jquery';
  export default {
    name: 'policycreated',
    data() {
      return {
        activeState: 'published',
        form: {
          title: '',
          originUrl: '',
          author: '',
          brief: '',
          content: '',
          mainpart: '',
          property: '',
          type: '',
          initprovince: '',
          initcity: '',
          initarea: '',
          initpark: '',
          privacy: '',
          webThumbImg: '',
          appThumbImg: '',
          isbanner: false,
          recomment: [],
          keywords: []
        },
        temp: {
          content: ''
        },
        uploadUrl: '',
        formarea: [],
        formparks: [],
        keyInputVisible: false,
        keyInputValue: ''
      }
    },
    methods: {
      setContent(html, text) {
        this.form.content = html;
        this.temp.content = text;
      },
      chooseAuthor: function(){
      },
      proChange: function () {
        this.form.initcity = '';
        this.form.initarea = '';
      },
      cityChange: function() {
        this.form.initarea = '';
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
      delKeywords(tag) {
        this.form.keywords.splice(this.form.keywords.indexOf(tag), 1);
      },
      keywordsInput() {
        let inputValue = this.keyInputValue;
        if (inputValue) {
          this.form.keywords.push(inputValue);
        }
        this.keyInputVisible = false;
        this.keyInputValue = '';
      },
      addKeywords() {
        this.keyInputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
    },
    computed: {
      cities: function() {
        if(!this.form.initprovince || !this.form.initcity){
          this.form.initcity = '';
        }
        for (var i = 0; i < this.formarea.length; i++) {
          if (this.formarea[i].province.name === this.form.initprovince) {
            if (this.formarea[i].province.hasOwnProperty('city')) {
              return this.formarea[i].province.city;
            }
          }
        }
        return [];
      },
      areas: function() {
        if(!this.form.initcity || !this.form.initarea){
          this.form.initarea = '';
        }
        for (var i = 0; i < this.cities.length; i++) {
          if (this.cities[i].name === this.form.initcity) {
            if (this.cities[i].hasOwnProperty('area')) {
              return this.cities[i].area;
            }
          }
        }
        return [];
      }
    },
    mounted() {
      newsApi.news.formOptions().then(res => {
        this.formarea = res.data.formOptions.overlayArea;
        this.formparks = res.data.formOptions.parks;
      });
      newsApi.pub.getUploadUniqueKey().then(res => {
        let self = this;
        self.uploadUrl = res.data.queryURL;
        let editor = new wangEditor('policyContent');
        editor.config.menus = ['source', '|', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily', 'fontsize', 'lineheight','indent', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright', '|', 'link', 'unlink', 'table', 'emotion', '|', 'img', '|', 'undo', 'redo', 'fullscreen'];
        editor.config.fontsizes = {1:'12px', 2:'14px', 3:'16px', 4:'20px', 5:'24px', 6:'28px', 7:'32px'};
        editor.config.hideLinkImg = true;
        editor.config.uploadImgFileName = 'upfile';
        editor.config.uploadImgUrl = self.uploadUrl + '?action=uploadImg';
        editor.onchange = function () {
          let text = editor.$txt.text().replace(/(^\s*)|(\s*$)/g, ""),
              html = editor.$txt.html();
          self.setContent(html, text);
        };
        editor.create();
      });
    }
  }
</script>

<style lang="scss" scoped>
  .publishForm{ margin:20px; width:60%; min-width:600px; 
    .model{ font-weight:bold; color:#20a0ff; border-left:3px solid #20a0ff; padding:1px 12px; }
    .el-tag{ display:inline-block; background-color:rgba(32,159,255,.1); border-color:rgba(32,159,255,.2); font-size:14px; color:#20a0ff; height:34px; line-height:34px; margin:0 10px 6px 0; padding:0 10px; }
    .small-ipt{ width:210px; }
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
    .el-upload__tip{ font-size:12px; color:rgb(131, 145, 165); margin-top:7px; line-height:54px; margin-bottom:-18px; }
  }
</style>
