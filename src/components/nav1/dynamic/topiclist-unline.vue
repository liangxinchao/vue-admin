<template>
  <div>
     <el-form :inline="true">
		  <div class="animation-wrap" v-if="animationShow"></div>
			<el-form-item class="label-sel label-sel-date">
				<el-date-picker v-model="dateTime" type="daterange" placeholder="请选择时间范围" @change="filterDateBtn"></el-date-picker>
			</el-form-item>
			<el-form-item class="label-search">
				<el-input placeholder="请输入搜索内容" icon="search" v-model="searchContent" @click="filterBtn"></el-input>
			</el-form-item>
		</el-form>
		<el-table :data='tableData' highlight-current-row @selection-change="selsChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="content" label="话题标题"></el-table-column>
      <el-table-column prop="author" label="创建人"></el-table-column>
      <el-table-column prop="created" label="创建时间"></el-table-column>
      <el-table-column prop="data" label="参与/点击"></el-table-column>
      <el-table-column prop="created" label="下架时间" min-width="90" sortable></el-table-column> 
      <el-table-column label="操作" min-width="120">
        <template scope="scope">
          <el-button type="info" size="small" @click="handleEdit(scope.$index, scope.row)">管理</el-button>
          <el-button size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
    	<el-button type="danger" @click="" :disabled="this.sels.length===0">删除</el-button>
      <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="total"></el-pagination>
    </el-col>
  </div>
</template>
<script>
 	import activityApi from '@/js/api.js';
  import functionApi from '@/js/function.js';
	export default {
		data() {
			return {
        animationShow: false,
        dateTime: [],
        searchContent: '',
        tableData: [],
        sels: '',
        currentPage: 1,
        total: 0,
        page: 1,
        pageindex: '',
        filterdata:{}
	    }
		},
		methods:{
			filterBtn() {
				this.filterdata.index = this.pageindex;
        this.filterdata.filter.title = this.searchContent;
        this.getTopicList(this.filterdata);
			},
			filterDateBtn() {
        this.filterdata.index = this.pageindex;
        this.filterdata.filter.start = functionApi.moment.getListTime(this.dateTime[0]);
        this.filterdata.filter.end = functionApi.moment.getListTime(this.dateTime[1]);
      },
      selsChange(sels) {
        this.sels = sels;
      },
			handleEdit(index, row) {
				localStorage.setItem('topicId', row.id);
				this.$router.push({path:'/nav1/dynamic/topiclist/manage'});
  		},
  		handleCurrentChange(val) {
        this.currentPage = val;
        this.filterdata.filter.offset = (val-1)*10;
        let index = this.pageindex;
        this.filterdata.index = index;
      },
      getTopicList() {
      	this.tableData = [
      		{content:'评论11111111', author:'张三', relative:'梦想小镇周年庆', data:'12/20', created:'2017-03-26 08:00', recomment:'推荐/置顶'}
      	]
      }
		},
		mounted() {
			const filterdata = {
        filter: {
          limit: 10,
          offset: (this.page-1)*10
        }
      };
      this.filterdata = filterdata;
			this.getTopicList(this.filterdata);
		}
	}
</script>

<style lang="scss" scoped>
	.animation-wrap{ width:100%; height:100%; background:rgba(255,255,255,0.7) url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2603642376,976323263&fm=117&gp=0.jpg) no-repeat 500px 200px; background-size:40px; position:fixed; z-index:10000000100030303; }
	.label-sel{ width:60px; }
	.label-search{ float:right; }
	.label-con{ width:75px;display:inline-block; height:36px; line-height:36px; }
	.state-rec{width:120px;}
	.toolbar{
    .el-pagination{ float:right; }
  }
</style>