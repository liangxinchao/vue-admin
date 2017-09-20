<template>
  <div id="newscreated">
    <el-form ref="form" :model="form" :rules="rules" label-width="85px" label="right" class="publishForm">
    	<p class="model">内容编辑</p>
    	<el-form-item label="标题:" prop="title">
				<el-input v-model="form.title" placeholder="请填写文章标题"></el-input>
			</el-form-item>
			<el-form-item label="原创:" required>
				<el-col :span="6">
					<el-form-item prop="original">
						<el-radio-group v-model="form.original">
							<el-radio label="0">原创</el-radio>
							<el-radio label="1">转载</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="18" v-if="form.original == 1">
					<el-form-item prop="originUrl">
						<el-input v-model="form.originUrl" placeholder="请填写原文链接" ></el-input>
					</el-form-item>
				</el-col>
			</el-form-item>
			<el-form-item label="作者:" prop="author">
				<span>{{form.author}}</span>
				<el-button @click="chooseAuthor">选择</el-button>
			</el-form-item>
			<el-form-item label="摘要:" prop="brief">
				<el-input type="textarea" v-model="form.brief" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
			</el-form-item>
			<el-form-item label="正文:" style="width:986px;" prop='content'>
	      <div id="newsContent" style="height:260px;"></div>
	    </el-form-item>
			<p class="model">样式设置</p>
			<el-form-item label="类型:" prop="type">
				<el-select v-model="form.type" placeholder="请选择文章类型">
					<el-option v-for="(formtype, index) in formtypes" :label="formtype" :value="index+''" :key="index"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="区域:" style="width:986px;" required>
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
			<el-form-item label="样式:" prop="style">
				<el-select v-model="form.style" placeholder="请选择样式">
					<el-option v-for="(formstyle, index) in formstyles" :label="formstyle" :value="index+1+''" :key="index"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="缩略图(web):" v-if="form.style=='1'">
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
			<el-form-item label="缩略图(web):" v-if="form.style=='2'">
				<el-col :span="8">
					<el-form-item prop="webThumbImg1">
						<input type="file" @change="onFileChange" id="webThumbImg1" class="hide"/>
						<input type="button" value="选择图片" @click="uploadthumb('webThumbImg1')" />
						<div class="thumbset">
		          <div class="thumbImg">
		            <a href="javascript:void(0)" class="reselect" v-if="form.webThumbImg1 !== ''" @click="clearthumb('webThumbImg1')">×</a>
		            <img :src="form.webThumbImg1"/>
		          </div>
		  				<i class="el-icon-picture thumb-uploader-icon"></i>
		        </div>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item prop="webThumbImg2">
						<input type="file" @change="onFileChange" id="webThumbImg2" class="hide"/>
						<input type="button" value="选择图片" @click="uploadthumb('webThumbImg2')" />
						<div class="thumbset">
		          <div class="thumbImg">
		            <a href="javascript:void(0)" class="reselect" v-if="form.webThumbImg2 !== ''" @click="clearthumb('webThumbImg2')">×</a>
		            <img :src="form.webThumbImg2"/>
		          </div>
		  				<i class="el-icon-picture thumb-uploader-icon"></i>
		        </div>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item prop="webThumbImg3">
						<input type="file" @change="onFileChange" id="webThumbImg3" class="hide"/>
						<input type="button" value="选择图片" @click="uploadthumb('webThumbImg3')" />
						<div class="thumbset">
		          <div class="thumbImg">
		            <a href="javascript:void(0)" class="reselect" v-if="form.webThumbImg3 !== ''" @click="clearthumb('webThumbImg3')">×</a>
		            <img :src="form.webThumbImg3"/>
		          </div>
		  				<i class="el-icon-picture thumb-uploader-icon"></i>
		        </div>
					</el-form-item>
				</el-col>
        <div class="el-upload__tip">图片小于200KB（jpg,gif,png,bmp格式）,尺寸不小于 180*126px</div>
			</el-form-item>
			<el-form-item label="缩略图(app):" v-if="form.style=='1'">
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
			<el-form-item label="缩略图(app):" v-if="form.style=='2'">
				<el-col :span="8">
					<el-form-item prop="appThumbImg1">
						<input type="file" @change="onFileChange" id="appThumbImg1" class="hide"/>
						<input type="button" value="选择图片" @click="uploadthumb('appThumbImg1')" />
						<div class="thumbset">
		          <div class="thumbImg">
		            <a href="javascript:void(0)" class="reselect" v-if="form.appThumbImg1 !== ''" @click="clearthumb('appThumbImg1')">×</a>
		            <img :src="form.appThumbImg1"/>
		          </div>
		  				<i class="el-icon-picture thumb-uploader-icon"></i>
		        </div>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item prop="appThumbImg2">
						<input type="file" @change="onFileChange" id="appThumbImg2" class="hide"/>
						<input type="button" value="选择图片" @click="uploadthumb('appThumbImg2')" />
						<div class="thumbset">
		          <div class="thumbImg">
		            <a href="javascript:void(0)" class="reselect" v-if="form.appThumbImg2 !== ''" @click="clearthumb('appThumbImg2')">×</a>
		            <img :src="form.appThumbImg2"/>
		          </div>
		  				<i class="el-icon-picture thumb-uploader-icon"></i>
		        </div>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item prop="appThumbImg3">
						<input type="file" @change="onFileChange" id="appThumbImg3" class="hide"/>
						<input type="button" value="选择图片" @click="uploadthumb('appThumbImg3')" />
						<div class="thumbset">
		          <div class="thumbImg">
		            <a href="javascript:void(0)" class="reselect" v-if="form.appThumbImg3 !== ''" @click="clearthumb('appThumbImg3')">×</a>
		            <img :src="form.appThumbImg3"/>
		          </div>
		  				<i class="el-icon-picture thumb-uploader-icon"></i>
		        </div>
					</el-form-item>
				</el-col>
        <div class="el-upload__tip">图片小于200KB（jpg,gif,png,bmp格式）,尺寸不小于 180*126px</div>
			</el-form-item>
			<p class="model">宣传设置</p>
			<el-form-item label="轮播:">
				<el-checkbox v-model="form.isbanner" label="资讯轮播"></el-checkbox>
			</el-form-item>
			<el-form-item label="推荐:">
				<el-checkbox-group v-model="form.recomment">
					<el-checkbox label="置顶" name="recomment"></el-checkbox>
					<el-checkbox label="推荐" name="recomment"></el-checkbox>
					<el-checkbox label="热门" name="recomment"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="关键字:">
				<el-tag :key="tag" v-for="tag in form.keywords" :closable="true" :close-transition="false" @close="delKeywords(tag)">{{tag}}</el-tag>
				<el-input class="small-ipt" v-if="keyInputVisible" v-model="keyInputValue" ref="saveTagInput" placeholder="请输入关键字" @keyup.enter.native="keywordsInput" @blur="keywordsInput"></el-input>
				<el-button v-else @click="addKeywords">+ 新增关键字</el-button>
			</el-form-item>
			<el-form-item label="封面图(web):" v-if="form.isbanner == true" required>
				<el-col :span="24">
					<el-form-item prop="webCoverImg">
						<input type="file" @change="onFileChange" id="webCoverImg" class="hide"/>
						<input type="button" value="选择图片" @click="uploadthumb('webCoverImg')" />
						<div class="thumbset">
		          <div class="thumbImg coverImg">
		            <a href="javascript:void(0)" class="reselect" v-if="form.webCoverImg !== ''" @click="clearthumb('webCoverImg')">×</a>
		            <img class="cover" :src="form.webCoverImg"/>
		          </div>
		  				<i class="el-icon-picture thumb-uploader-icon cover-icon"></i>
		        </div>
					</el-form-item>
				</el-col>
        <div class="el-upload__tip">适用于轮播图，图片不大于5M（jpg,gif,png,bmp格式），尺寸不小于 800*473px！</div>
			</el-form-item>
			<el-form-item label="封面图(app):" v-if="form.isbanner == true" required>
				<el-col :span="24">
					<el-form-item prop="appCoverImg">
						<input type="file" @change="onFileChange" id="appCoverImg" class="hide"/>
						<input type="button" value="选择图片" @click="uploadthumb('appCoverImg')" />
						<div class="thumbset">
		          <div class="thumbImg coverImg">
		            <a href="javascript:void(0)" class="reselect" v-if="form.appCoverImg !== ''" @click="clearthumb('appCoverImg')">×</a>
		            <img class="cover" :src="form.appCoverImg"/>
		          </div>
		  				<i class="el-icon-picture thumb-uploader-icon cover-icon"></i>
		        </div>
					</el-form-item>
				</el-col>
        <div class="el-upload__tip">适用于轮播图，图片不大于5M（jpg,gif,png,bmp格式），尺寸不小于 800*473px！</div>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click.prevent="onSubmit">立即创建</el-button>
				<el-button @click.prevent="onSubmit">保存草稿</el-button>
			</el-form-item>
    </el-form>
  </div>
</template>

<script>
	import newsApi from '@/js/api.js';
	import axios from 'axios';
	import $ from 'jquery';
  export default {
    name: 'newscreated',
    data() {
			return {
				form: this.$store.state.news.form,
				temp: {
					content: ''
				},
				rules: {
					title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' }
          ],
          original: [
            { required: true, message: '请选择原创或转载', trigger: 'change' }
          ],
          originUrl: [
            { required: true, message: '请填写原文链接', trigger: 'change' }
          ],
          author: [
            { required: true, message: '请选择作者', trigger: 'change' }
          ],
          brief: [
            { required: true, message: '请输入文章摘要', trigger: 'blur' },
            { min: 0, max: 120, message: '摘要不超过120个字', trigger: 'blur' }
          ],
          content: [
          	{ required: true, message: '正文不能为空！', trigger: 'blur'}
          ],
          type: [
            { required: true, message: '请选择资讯类型', trigger: 'change' }
          ],
          webThumbImg: [
            { required: true, message: '请选择web缩略图', trigger: 'change' }
          ],
          webThumbImg1: [
            { required: true, message: '请选择web缩略图1', trigger: 'change' }
          ],
          webThumbImg2: [
            { required: true, message: '请选择web缩略图2', trigger: 'change' }
          ],
          webThumbImg3: [
            { required: true, message: '请选择web缩略图3', trigger: 'change' }
          ],
          appThumbImg: [
            { required: true, message: '请选择app缩略图', trigger: 'change' }
          ],
          appThumbImg1: [
            { required: true, message: '请选择app缩略图1', trigger: 'change' }
          ],
          appThumbImg2: [
            { required: true, message: '请选择app缩略图2', trigger: 'change' }
          ],
          appThumbImg3: [
            { required: true, message: '请选择app缩略图3', trigger: 'change' }
          ],
          privacy: [
            { required: true, message: '请选择是否显示', trigger: 'change' }
          ],
          style: [
            { required: true, message: '请选择显示样式', trigger: 'change' }
          ],
          webCoverImg: [
            { required: true, message: '请选择web封面图', trigger: 'change' }
          ],
          appCoverImg: [
						{ required: true, message: '请选择app封面图', trigger: 'change' }
          ]
				},
				formarea: [],
				formparks: [],
				formstyles: [],
				formtypes: [],
				uploadUrl: '',
        dialogImageUrl: '',
        dialogVisible: false,
        authorInfo:{},
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
				this.$store.dispatch('createform', this.form);
				this.$router.push({ path: '/nav1/article/news/selectauthor' });
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
      onSubmit(e) {
      	let vm = this;
      	let option = e.target.innerText;
        let postdata = {
          title: vm.form.title,
          originUrl: vm.form.original == '0' ? '' : vm.form.originUrl,
          authorId: vm.$store.state.selectauthor.id,
          authorType: vm.$store.state.selectauthor.authorType,
          brief: vm.form.brief,
          type: vm.form.type,
          location : {province:vm.form.initprovince, city:vm.form.initcity, area:vm.form.initarea},
          parkId: vm.form.initpark,
          privacy: vm.form.privacy,
          style: vm.form.style,
          thumbWeb: vm.form.style == 1 ? [vm.form.webThumbImg] : [vm.form.webThumbImg1, vm.form.webThumbImg2, vm.form.webThumbImg3],
          thumbApp: vm.form.style == 1 ? [vm.form.appThumbImg] : [vm.form.appThumbImg1, vm.form.appThumbImg2, vm.form.appThumbImg3],
          tag: {
          	loop: vm.form.isbanner == false ? 0 : 1,
          	top: $.inArray("置顶", vm.form.recomment) == -1 ? 0 : 1,
          	rec: $.inArray("推荐", vm.form.recomment) == -1 ? 0 : 1,
          	hot: $.inArray("热门", vm.form.recomment) == -1 ? 0 : 1
          },
					keywords: vm.form.keywords,
					coverWeb: vm.form.webCoverImg,
					coverApp: vm.form.appCoverImg
        };
        const header = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="edge"/><meta name="renderer" content="webkit"><meta http-equiv="Content-Script-Type" content="text/javascript"/><meta name="format-detection" content="telephone=no"/><meta name="viewport" content="width=device-width,user-scalable=no"><title>Document</title></head><body><article>';
        const footer = '</article></body></html>';
        let editorcontent = header + vm.form.content + footer;
        let blob = new Blob([editorcontent], {'type': 'text/html'});
        let formData = new FormData();
        formData.append('upfile', blob, 'uploadfile.html');
        if(option == '立即创建'){
        	this.$store.dispatch('onSubmit', this.location);
        	postdata.state = "3";
        	this.$refs['form'].validate((valid) => {
	          if (valid) {
	          	if (!this.temp.content) {
	              if ((this.form.content.indexOf('<iframe') == -1 || this.form.content.indexOf('</iframe>') == -1) && (this.form.content.indexOf('<img') == -1)) {
	                this.$message.error('文章内容不能为空！');
	                return;
	              }
	              return;
	            }
	            axios.post(this.uploadUrl + '?action=uploadHTML', formData).then(res => {
	              postdata.content = res.data.url;
	              newsApi.news.postCreate(postdata).then(res => {
	              	this.$notify({
					          title: '成功',
					          message: '成功发布了一篇资讯!',
					          type: 'success'
					        });
					        this.$store.state.selectauthor = '';
	              	location.pathname = '/nav1';
	              })
	            })
	          } else {
	            this.$notify({
			          title: '警告',
			          message: '请填写完整的表单信息!',
			          type: 'warning'
			        });
	            return false;
	          }
	        });
        }else{
        	this.$refs['form'].resetFields();
        	postdata.state = "0";
        	axios.post(this.uploadUrl + '?action=uploadHTML', formData).then(res => {
            postdata.content = res.data.url;
            newsApi.news.postCreate(postdata).then(res => {
            	this.$notify({
			          title: '成功',
			          message: '保存草稿成功!',
			          type: 'success'
			        });
			        this.$store.state.selectauthor = '';
            	location.pathname = '/nav1/article/news/newslist/draft';
            })
          })
        }
			}
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
			this.form.author = this.$store.state.selectauthor.name;
			newsApi.news.formOptions().then(res => {
				this.formarea = res.data.formOptions.overlayArea;
				console.log(this.formarea)
				this.formparks = res.data.formOptions.parks;
				this.formstyles = res.data.formOptions.styles;
				this.formtypes = res.data.formOptions.types;
			});
			newsApi.pub.getUploadUniqueKey().then(res => {
				let self = this;
      	self.uploadUrl = res.data.queryURL;
      	let editor = new wangEditor('newsContent');
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
		},
		beforeDestroy() {
      axios.post(this.uploadUrl + '?action=disconnect');
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