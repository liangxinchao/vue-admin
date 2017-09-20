<template>
  <div>
  	<el-form :inline="true">
	    <el-form-item class="label-search">
        <el-input placeholder="请输入搜索内容" icon="search" v-model="searchContent" :on-icon-click="filterBtn"></el-input>
      </el-form-item>
  	</el-form>
  	<el-table :data='tableData' highlight-current-row>
			<el-table-column prop="target.title"  label="文章标题"></el-table-column>
			<el-table-column prop="target.location" label="区域"></el-table-column>
			<el-table-column prop="target.type" label="文章类型"></el-table-column>
			<el-table-column prop="author.name" label="审核人"></el-table-column>
			<el-table-column prop="account.name" label="举报人"></el-table-column>
			<el-table-column prop="created" label="举报时间" min-width="95" sortable></el-table-column>
			<el-table-column prop="created" label="处理时间" min-width="95" sortable></el-table-column>
			<el-table-column label="操作" min-width="50">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination-wrap">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>		
  </div>
</template>

<script>
  import newsApi from '@/js/api.js';
  import functionApi from '@/js/function.js';
  export default {
    data() {
      return {
        searchContent: '',
        currentPage: 1,
        tableData: [],
        total: 0,
        filterdata: {},
        page: 1,
        pageindex: ''
      }
    },
    methods:{
    	filterBtn() {
      	this.filterdata.filter.title = this.searchContent;
        this.filterdata.filter.type = this.typevalue.toString();
        const index = this.pageindex;
        this.filterdata.index = index;
        this.getReportList(this.filterdata);
    	},
    	getReportList(t){
      	newsApi.news.reportList(t).then(res => {
          this.searchContent = '';
      		this.tableData = res.data.items;
      		this.total = res.data.total;
				  const stateLists = ['城市创业', '行业资讯', '创业公司', '创业资讯'];
      		this.pageindex = res.data.index;
      		for(let i = 0; i < this.tableData.length; i++){
            this.tableData[i].created = functionApi.moment.getListTime(this.tableData[i].created);
            this.tableData[i].target.location = this.tableData[i].target.location.province + '·'
              + this.tableData[i].target.location.city;
            for(let j = 0; j < stateLists.length; j++){
              if(this.tableData[i].target.type == j){
                this.tableData[i].target.type = stateLists[j];
              }
            }
          }
        })
    	},
      handleCurrentChange(val) {
      	this.filterdata.filter.offset = (val - 1)*10;
      	const index = this.pageindex;
      	this.filterdata.index = index;
      	newsApi.news.reportPageList(this.filterdata).then(res => {
      		this.tableData = res.data.items;
          const stateLists = ['城市创业', '行业资讯', '创业公司', '创业资讯'];
          this.pageindex = res.data.index;
          for(let i = 0; i < this.tableData.length; i++){
            this.tableData[i].target.updated = functionApi.moment.getListTime(this.tableData[i].target.updated);
            this.tableData[i].created = functionApi.moment.getListTime(this.tableData[i].created);
            this.tableData[i].target.location = this.tableData[i].target.location.province + '·'
              + this.tableData[i].target.location.city;
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
        this.$router.push({ path: '/nav1/article/report/reportdetail' });
      }
    },
    mounted() {
      const filterdata = {index:'', filter:{limit:10, states:["1","2"], offset: (this.page - 1) * 10, targetType:'2'}};
      this.filterdata = filterdata;
    	this.getReportList(this.filterdata);
    }
  }
</script>

<style lang="scss" scoped>
	.label-sel{ width:130px; }
  .label-search{ float:right; }
	.label-con{ display:inline-block; height:36px; line-height:36px; }
	.pagination-wrap{ margin-left:100px; float:right; margin-top:20px; }
</style>
