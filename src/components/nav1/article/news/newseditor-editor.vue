<template>
	<div id="newspublish">
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
						<el-input v-model="form.originUrl" placeholder="请填写原文链接"></el-input>
					</el-form-item>
				</el-col>
			</el-form-item>
			<el-form-item label="作者:" prop="author">
				<span>{{form.author}}</span>
				<el-button @click="chooseAuthor">选择</el-button>
			</el-form-item>
			<el-form-item label="正文:" style="width:986px;" prop='content'>
	      <div id="newsContent1" style="height:260px;"></div>
	    </el-form-item>
			<el-form-item>
				<el-button type="primary" @click.prevent="onSubmit">保存</el-button>
				<el-button @click.prevent="onSubmit" v-if="newsData.state=='0' || newsData.state=='7'">发布</el-button>
				<el-button @click.prevent="onSubmit">预览</el-button>
				<el-button @click.prevent="onSubmit" v-if="newsData.state=='3'">下架</el-button>
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
	import newsApi from '@/js/api.js';
	import axios from 'axios';
	import $ from 'jquery';
  export default {
    name: 'newspublish',
    data() {
			return {
				newsData:{},
				form: {
					title: '',
					original: '',
					originUrl: '',
					author: '',
					content: ''
				},
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
          content: [
          	{ required: true, message: '文章不能为空！', trigger: 'blur'}
          ]
				},
				uploadUrl: '',
				dialogFormVisible: false,
				canceldata: {},
				unlinereason: '',
				reasontip: false
			}
		},
		methods: {
			setContent(html, text) {
        this.form.content = html;
        this.temp.content = text;
      },
			chooseAuthor: function(){
				this.$router.push({ path: '/nav1/article/news/selectauthor' });
			},
      onSubmit(e) {
      	const newsId = localStorage.getItem('newsId');
      	let option = e.target.innerText;
      	let vm = this;
      	let postdata = {
      		title: vm.form.title,
      		originUrl: vm.form.original == '0' ? '' : vm.form.originUrl,
      		authorId: vm.$store.state.selectauthor.id,
          authorType: vm.$store.state.selectauthor.authorType
      	};
      	const header = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="edge"/><meta name="renderer" content="webkit"><meta http-equiv="Content-Script-Type" content="text/javascript"/><meta name="format-detection" content="telephone=no"/><meta name="viewport" content="width=device-width,user-scalable=no"><title>Document</title></head><body><article>';
        const footer = '</article></body></html>';
        let editorcontent = header + vm.form.content + footer;
        let blob = new Blob([editorcontent], {'type': 'text/html'});
        let formData = new FormData();
        formData.append('upfile', blob, 'uploadfile.html');

        newsApi.news.postEdit(newsId).then(res => {
        	let nowState = this.newsData.state;
        	if(option == '保存' && nowState != '3'){
						axios.post(this.uploadUrl + '?action=uploadHTML', formData).then(res => {
		          postdata.content = res.data.url;
		          newsApi.news.patchModify(newsId, postdata).then(res => {
		          	vm.$notify({
				          title: '成功',
				          message: '保存成功!',
				          type: 'success'
				        });
				        this.$store.state.selectauthor = '';
		          })
		        })
	      	}else if(option == '发布' || (option == '保存' && nowState == '3')){
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
				          newsApi.news.patchModify(newsId, postdata).then(res => {
				          	vm.$notify({
						          title: '成功',
						          message: '发布成功!',
						          type: 'success'
						        });
						        this.$store.state.selectauthor = '';
						        this.$router.push({ path: '/nav1' });
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
		      	})	
	      	}else if(option == '预览'){
		      	this.$router.push({ path: '/nav1/article/news/newspreview' });
		      }else if(option == '下架'){
		      	this.dialogFormVisible = true;
		      }
        })
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
			}
		},
		mounted() {
			let vm = this;
      const newsId = localStorage.getItem('newsId');
      newsApi.pub.getUploadUniqueKey().then(res => {
      	let editor = new wangEditor('newsContent1');
      	editor.config.menus = ['source', '|', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily', 'fontsize', 'lineheight','indent', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright', '|', 'link', 'unlink', 'table', 'emotion', '|', 'img', '|', 'undo', 'redo', 'fullscreen'];
      	editor.config.fontsizes = {1:'12px', 2:'14px', 3:'16px', 4:'20px', 5:'24px', 6:'28px', 7:'32px'};
      	editor.config.hideLinkImg = true;
      	editor.config.uploadImgFileName = 'upfile';
      	this.uploadUrl = res.data.queryURL;
				editor.config.uploadImgUrl = res.data.queryURL + '?action=uploadImg';
				editor.onchange = function () {
          let text = editor.$txt.text().replace(/(^\s*)|(\s*$)/g, ""),
          		html = editor.$txt.html();
          vm.setContent(html, text);
        };
				editor.create();
				editor.$txt.html(vm.form.content);
      });
			newsApi.news.postEdit(newsId).then(res => {
				this.newsData = res.data;
				this.form.title = res.data.title;
				if(res.data.originUrl == ''){
					this.form.original = '0';
				}else{
					this.form.original = '1';
					this.form.originUrl = res.data.originUrl;
				}
				if(this.$store.state.selectauthor.name){
					this.form.author = this.$store.state.selectauthor.name;
				}else{
					if(res.data.author !== null){
						this.form.author = res.data.author.name;
					}
				}
				this.form.content = res.data.content;
				$('#newsContent1').load(res.data.content, function(){
					let initHtml = $('#newsContent1').html(),
							initText = $('#newsContent1').text().replace(/(^\s*)|(\s*$)/g, "");
					vm.setContent(initHtml, initText)
				});
			})
		}
  }
</script>

<style lang="scss" scoped>
	.publishForm{ margin:20px; width:60%; min-width:600px; 
		.model{ font-weight:bold; color:#20a0ff; border-left:3px solid #20a0ff; padding:1px 12px; }
		.small-ipt{ width:178px; }
	}
</style>