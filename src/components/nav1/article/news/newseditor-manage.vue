<template>
  <div id="newsmanage">
    <el-form ref="form" :model="form" :rules="rules" label-width="95px" label="right" class="manageForm">
    	<p class="model">基本信息</p>
    	<p class="info">
    		<label>标题：</label><span>{{newsData.title}}</span>
 			</p>
 			<p class="info">
    		<label>编辑：</label><span>{{newsData.account}}</span>
 			</p>
 			<p class="info">
    		<label>状态：</label><span>{{newsData.state}}</span>
 			</p>
 			<p class="info">
    		<label>创建时间：</label><span>{{newsData.created}}</span>
 			</p>
 			<p class="info" v-if="newsData.updated && newsData.state=='已发布'">
    		<label>更新时间：</label><span>{{newsData.updated}}</span>
 			</p>
 			<p class="info" v-if="newsData.updated && newsData.state=='已下架'">
    		<label>下架时间：</label><span>{{newsData.updated}}</span>
 			</p>
 			<p class="info" v-if="newsData.remark && newsData.state=='已下架'">
    		<label>下架原因：</label><span>{{newsData.remark}}</span>
 			</p>
			<p class="model">发布样式</p>
			<el-form-item label="类型:" prop="type">
				<el-select v-model="form.type" placeholder="请选择文章类型">
					<el-option v-for="(formtype, index) in formtypes" :label="formtype" :value="index+''" :key="index"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="区域:" style="width:986px;" required>
				<el-select v-model="form.initprovince" placeholder="请选择省" @change='proChange'>
					<el-option label="全国" value=""></el-option>
					<el-option v-for="province in formarea" :label="province.province.name" :value="province.province.name" :key="province.province.name"></el-option>
				</el-select>
				<el-select v-model="form.initcity" placeholder="请选择市" @change='cityChange'>
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
			<el-form-item label="摘要:" prop="brief">
				<el-input type="textarea" v-model="form.brief" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
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
			<el-form-item label="缩略图(web):" v-if="form.style=='1'" required>
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
			<el-form-item label="缩略图(web):" v-if="form.style=='2'" required>
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
			<el-form-item label="缩略图(app):" v-if="form.style=='1'" required>
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
			<el-form-item label="缩略图(app):" v-if="form.style=='2'" required>
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
			<el-form-item label="自定义阅读:">
				<el-input v-model="form.fakeRead" class="small-ipt">
					<template slot="append">次</template>
				</el-input>
			</el-form-item>
			<p class="info" v-if="newsData.state=='已发布' || newsData.state=='已下架'">
    		<label>实际阅读：</label><span>{{form.readnum}}次</span>
 			</p>
 			<p class="info" v-if="newsData.state=='已发布' || newsData.state=='已下架'">
    		<label>收藏：</label><span>{{form.favornum}}人</span>
 			</p>
 			<p class="info" v-if="newsData.state=='已发布' || newsData.state=='已下架'">
    		<label>评论：</label><span>{{form.commentnum}}条</span>
 			</p>
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
				<el-button type="primary" @click.prevent="onSubmit">保存</el-button>
				<el-button @click.prevent="onSubmit">预览</el-button>
				<el-button @click.prevent="onSubmit" v-if="newsData.state=='已发布'">下架</el-button>
			</el-form-item>
    </el-form>
    <el-dialog title="请填写下架原因" v-model="dialogFormVisible">
    	<el-form>
    		<el-form-item>
    			<el-input type="textarea" v-model="unlinereason" auto-complete="off"></el-input>
          <div class="el-form-item__error" v-if="reasontip">请填写下架原因</div>
    		</el-form-item>
    	</el-form>
    	<div slot="footer" class="dialog-footer">
    		<el-button @click="dialogFormVisible = false">取 消</el-button>
    		<el-button type="primary" @click="unlineconfirm">确 定</el-button>
    	</div>
    </el-dialog>
  </div>
</template>

<script>
	import $ from 'jquery';
	import newsApi from '@/js/api.js';
	import functionApi from '@/js/function.js';
  export default {
    data() {
			return {
				flag:1,
				flag1:1,
				newsData: {},
				location:{},
				form: {
					type: '',
					initprovince: '',
					initcity: '',
					initarea: '',
					initpark: '',
					brief: '',
					privacy: '',
					style: '',
					webThumbImg: '',
					webThumbImg1: '',
					webThumbImg2: '',
					webThumbImg3: '',
					appThumbImg: '',
					appThumbImg1: '',
					appThumbImg2: '',
					appThumbImg3: '',
					webCoverImg: '',
					appCoverImg: '',
					isbanner: false,
					recomment: [],
					keywords: [],
					fakeRead: 0,
					readnum: '0',
					favornum: '0',
					commentnum: '0'
				},
				rules: {
					type: [
            { required: true, message: '请选择资讯类型', trigger: 'change' }
          ],
          brief: [
            { required: true, message: '请输入文章摘要', trigger: 'blur' },
            { min: 0, max: 120, message: '摘要不超过120个字', trigger: 'blur' }
          ],
          privacy: [
            { required: true, message: '请选择是否显示', trigger: 'change' }
          ],
          style: [
            { required: true, message: '请选择显示样式', trigger: 'change' }
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
          webCoverImg: [
            { required: true, message: '请选择web封面图', trigger: 'change' }
          ],
          appCoverImg: [
						{ required: true, message: '请选择app封面图', trigger: 'change' }
          ],
          fakeRead: [
						{ type: 'number', message: '自定义阅读数为数字值'}
          ]
				},
				formarea: '',
				formstyles: [],
				formtypes: [],
				formparks: [],
				uploadUrl: '',
				dialogFormVisible: false,
				canceldata: {},
				unlinereason: '',
				reasontip: false,
				keyInputVisible: false,
				keyInputValue: ''
			}
		},
		methods: {
			proChange: function () {
				if(this.flag == 0){
					this.form.initcity = '';
        	this.form.initarea = '';
				}
        this.flag = 0;
      },
      cityChange: function () {
      	if(this.flag1 == 0){
      		this.form.initarea = '';
      	}
      	this.flag1 = 0
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
      	const newsId = localStorage.getItem('newsId');
    		let option = e.target.innerText;
    		let vm = this;
  			let postdata = {
          type: vm.form.type,
          location: {province:vm.form.initprovince, city:vm.form.initcity, area:vm.form.initarea},
          parkId: vm.form.initpark,
          brief: vm.form.brief,
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
					fakeRead: vm.form.fakeRead,
					coverWeb: vm.form.webCoverImg,
					coverApp: vm.form.appCoverImg
        };
    		if(option == '保存'){
	     		this.$refs['form'].validate((valid) => {
	     			if (valid) {
	     				newsApi.news.patchModify(newsId, postdata).then(res => {
		          	this.$notify({
				          title: '成功',
				          message: '修改成功!',
				          type: 'success'
				        });
		          	this.$router.push({ path: '/nav1' });
		          })
	     			} else {
	            this.$notify({
			          title: '警告',
			          message: '请填写完整的表单信息!',
			          type: 'warning'
			        });
	            return false;
	          }
	     		})
    		}else if(option == '预览'){
	      	this.$router.push({ path: '/nav1/article/news/newspreview' });
	      }else if(option == '下架'){
	      	this.dialogFormVisible = true;
	      }
			},
			unlineconfirm(){
				const newsId = localStorage.getItem('newsId');
				this.canceldata.id = newsId;
				this.canceldata.remark = this.unlinereason;
				if(this.unlinereason !== ''){
          this.reasontip = false;
          newsApi.news.cancelNews(this.canceldata).then(res => {
            this.dialogFormVisible = false;
            alert('下架成功');
            location.pathname = '/nav1/article/news/newslist/unline';
          })
        }else{
          this.reasontip = true;
          return false;
        }
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
				console.log(this.formarea);
				this.formparks = res.data.formOptions.parks;
				console.log(this.formparks);
				this.formstyles = res.data.formOptions.styles;
				this.formtypes = res.data.formOptions.types;
			});
			const newsId = localStorage.getItem('newsId');
			newsApi.pub.getUploadUniqueKey().then(res => {
      	this.uploadUrl = res.data.queryURL;
      })
			newsApi.news.postEdit(newsId).then(res => {
				this.newsData = res.data;
				this.newsData.account = this.newsData.account.name;
				if(this.newsData.state == "0"){
					this.newsData.state = "草稿"
				}else if(this.newsData.state == "3"){
					this.newsData.state = "已发布"
				}else if(this.newsData.state == "7"){
					this.newsData.state = "已下架"
				}
				this.newsData.created = functionApi.moment.getListTime(this.newsData.created);
				this.newsData.updated = this.newsData.updated ? functionApi.moment.getListTime(this.newsData.updated) : false;
				this.form.type = res.data.type;
				this.form.initprovince = res.data.location.province;
				this.form.initcity = res.data.location.city;
				this.form.initarea = res.data.location.area;
				this.form.initpark = res.data.parkId;
				this.form.brief = res.data.brief;
				this.form.privacy = res.data.privacy;
				this.form.style = res.data.style;
				if(res.data.style == '1'){
					this.form.webThumbImg = res.data.thumbWeb[0];
					this.form.appThumbImg = res.data.thumbApp[0];
				}else if(res.data.style == '2'){
					this.form.webThumbImg1 = res.data.thumbWeb[0];
					this.form.webThumbImg2 = res.data.thumbWeb[1];
					this.form.webThumbImg3 = res.data.thumbWeb[2];
					this.form.appThumbImg1 = res.data.thumbApp[0];
					this.form.appThumbImg2 = res.data.thumbApp[1];
					this.form.appThumbImg3 = res.data.thumbApp[2];
				}
				this.form.isbanner = res.data.tag.loop == '0' ? false : true;
				if(res.data.tag.top == '1'){
					this.form.recomment.push('置顶');
				}
				if(res.data.tag.rec == '1'){
					this.form.recomment.push('推荐');
				}
				if(res.data.tag.hot == '1'){
					this.form.recomment.push('热门');
				}
				this.form.keywords = res.data.keywords;
				this.form.readnum = res.data.actions[0] ? res.data.actions[0] : '0';
				this.form.favornum = res.data.actions[2] ? res.data.actions[2] : '0';
				this.form.commentnum = res.data.actions[10] ? res.data.actions[10] : '0';
				if(res.data.tag.loop == '1'){
					this.form.webCoverImg = res.data.coverWeb;
					this.form.appCoverImg = res.data.coverApp;
				}
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