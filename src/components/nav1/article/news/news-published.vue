<template>
	<div>
		<el-form :inline="true">
		  <div class="animation-wrap" v-if="animationShow"></div>
			<label class="label-con">文章类型：</label>
			<el-form-item class="label-sel">
				<el-select v-model="typevalue" placeholder="请选择" @change="filterBtn" >
					<el-option label="全部" value=""></el-option>
					<el-option v-for="(item, index) in newstype" :label="item.label" :value="index" :key="index">
					</el-option>
				</el-select>
			</el-form-item>
			<label class="label-con">推荐状态：</label>
			<el-form-item class="label-sel">
				<el-select v-model="tagvalue" placeholder="请选择" @change="filterBtn">
					<el-option label="全部" value=""></el-option>
					<el-option v-for="(item, index) in tag" :label="item.label" :value="item.value" :key="index">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item class="label-search">
				<el-input placeholder="请输入搜索内容" icon="search" v-model="searchContent" :on-icon-click="filterBtn" @keyup.enter.native="filterBtn"></el-input>
			</el-form-item>
		</el-form>
		<el-table :data='tableData' highlight-current-row>
			<el-table-column prop="title" label="文章标题"></el-table-column>
			<el-table-column prop="location" label="区域"></el-table-column>
			<el-table-column prop="type" label="文章类型"></el-table-column>
			<el-table-column prop="author.name" label="作者"></el-table-column>
			<el-table-column prop="account.name" label="编辑"></el-table-column>
			<el-table-column prop="created" label="发布时间" min-width="90" sortable></el-table-column> 
			<el-table-column label="操作" min-width="120">
				<template scope="scope">
					<el-button size="small">推送</el-button>
					<el-button type="info" size="small"  @click="handleEdit(scope.$index, scope.row)">管理</el-button>
					<el-button type="danger" size="small" @click="handleUnline(scope.$index, scope.row)">下架</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination-wrap">
			<el-pagination  @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="10" layout="total, prev, pager, next,jumper" :total="total"></el-pagination>
		</div>
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
	import functionApi from '@/js/function.js';
  export default {
    name: 'newslist',
    data() {
      return {
        animationShow: false,
        newstype: [
          {label: '城市创业'}, {label: '行业资讯'}, {label: '创业公司'}, {label: '创业资讯'}
        ],
        tag: [
          {value:'1', label:'置顶'}, {value:'0', label:'热门'}, {value:'2', label:'推荐'}
        ],
        typevalue: '', 
        tagvalue: '', 
        searchContent: '',
        currentPage: 1,
        tableData: [],
        total: 0,
        pagedata: {},
        page: 1,
        pageindex: '',
        dialogFormVisible: false,
        pagesize: 10,
        canceldata: {},
        unlinereason: '',
        reasontip: false
      }
    },
    methods:{
      filterBtn() {
        this.pagedata.filter.type = this.typevalue.toString();
        this.pagedata.filter.tag = this.tagvalue;
        this.pagedata.filter.title = this.searchContent;
        let index = this.pageindex;
        this.pagedata.index = index;
        console.log(this.pagedata);
        this.getNewsList(this.pagedata);
      },
      getNewsList(t){
        this.animationShow = true;
        newsApi.news.postList(t).then(res => {
          this.animationShow = false;
          this.tableData = res.data.items;
          this.total = res.data.total;
          this.pageindex = res.data.index;
          const stateLists = ['城市创业', '行业资讯', '创业公司', '创业资讯'];
          for(let i = 0; i < this.tableData.length; i++){
            if(this.tableData[i].location.province == '' && this.tableData[i].location.city == ''){
              this.tableData[i].location = '全国';
            }else if(this.tableData[i].location.province != '' && this.tableData[i].location.city == ''){
              this.tableData[i].location = this.tableData[i].location.province;
            }else{
              this.tableData[i].location = this.tableData[i].location.province + '·' + this.tableData[i].location.city;
            }
            this.tableData[i].created = functionApi.moment.getListTime(this.tableData[i].created);
            for(let j = 0; j < stateLists.length; j++){
              if(this.tableData[i].type == j){
                this.tableData[i].type = stateLists[j];
              }
            }
          }
        }).catch(res => {
          this.animationShow = false;
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.pagedata.filter.offset = (val-1)*10;
        let index = this.pageindex;
        this.pagedata.index = index;
        newsApi.news.postPage(this.pagedata).then(res => {
          this.tableData = res.data.items;
          const stateLists = ['城市创业', '行业资讯', '创业公司', '创业资讯'];
          for(let i = 0; i < this.tableData.length; i++){
            this.tableData[i].location = this.tableData[i].location.province + '·' + this.tableData[i].location.city;
            this.tableData[i].created = functionApi.moment.getListTime(this.tableData[i].created);
            for(let j = 0; j < stateLists.length; j++){
              if(this.tableData[i].type == j){
                this.tableData[i].type = stateLists[j];
              }
            }
          }
        })
      },
      handleEdit(index, row) {
        localStorage.setItem('newsId', row.id);
        this.$router.push({path: '/nav1/article/news/newseditor'});
      },
      handleUnline(index, row) {
        this.dialogFormVisible = true;
        this.canceldata = {id: row.id};
      },
      unlineconfirm(index, row) {
        this.canceldata.remark = this.unlinereason;
        if(this.unlinereason !== ''){
          this.reasontip = false;
          newsApi.news.cancelNews(this.canceldata).then(res => {
            this.dialogFormVisible = false;
            this.$notify({
              title: '成功',
              message: '下架成功!',
              type: 'success'
            });
          })
        }else{
          this.reasontip = true;
          return false;
        }
      }
    },
    mounted() {
      const pagedata = { filter:{limit:10, states:["3"], offset: (this.page-1)*10}};
      this.pagedata = pagedata;
      newsApi.news.postListRemove({index:this.pageindex}).then(res => {
          console.log(res.data);
      })
      this.getNewsList(this.pagedata);
    }
  }
</script>

<style lang="scss" scoped>
	.animation-wrap{ width:100%; height:100%; background:rgba(255,255,255,0.7) url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2603642376,976323263&fm=117&gp=0.jpg) no-repeat 500px 200px; background-size:40px; position:fixed; z-index:10000000100030303; }
	.label-sel{ width:130px; }
	.label-search{ float:right; }
	.label-con{ display:inline-block; height:36px; line-height:36px; }
	.pagination-wrap{ margin-left:100px; float:right; margin-top:20px; }
</style>
