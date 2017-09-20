<template>
  <div>
    <el-form :inline="true">
      <el-form-item class="label-search">
        <el-input placeholder="请输入搜索内容" icon="search" v-model="searchContent" :on-icon-click="filterBtn"></el-input>
      </el-form-item>
    </el-form>
    <el-table :data='tableData' highlight-current-row @selection-change="selsChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column prop="location" label="区域"></el-table-column>
      <el-table-column prop="account.name" label="编辑"></el-table-column>
      <el-table-column prop="created" label="创建时间" min-width="90" sortable></el-table-column> 
      <el-table-column label="操作" min-width="120">
        <template scope="scope">
          <el-button size="small">预览</el-button>
          <el-button type="info" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="10" layout="total, prev, pager, next,jumper" :total="total"></el-pagination>
    </el-col>
  </div>
</template>

<script>
  import newsApi from '@/js/api.js';
  import functionApi from '@/js/function.js';
export default {
    name: 'newslist',
    data() {
      return {
        state: [
          { value:'1', label: '已发布' }, {value:'0', label:'草稿' }, { value:'5', label: '已删除' }
        ],
        searchContent: '',
        currentPage: 1,
        sels: '',
        tableData: [],
        total: 0,
        filterdata: {},
        page: 1,
        pageindex: ''
      }
    },
    methods: {
      filterBtn() {
        this.filterdata.filter.title = this.searchContent;
        const index = this.pageindex;
        this.filterdata.index = index;
        this.getNewsList(this.filterdata);
      },
      getNewsList(t){
      	newsApi.news.postList(t).then(res => {
      		this.tableData = res.data.items;
          this.total = res.data.total;
          this.pageindex = res.data.index;
          for(let i = 0; i < this.tableData.length; i++){
            if(this.tableData[i].location.province == '' && this.tableData[i].location.city == ''){
              this.tableData[i].location = '全国';
            }else if(this.tableData[i].location.province != '' && this.tableData[i].location.city == ''){
              this.tableData[i].location = this.tableData[i].location.province;
            }else{
              this.tableData[i].location = this.tableData[i].location.province + '·' + this.tableData[i].location.city;
            }
            this.tableData[i].created = functionApi.moment.getListTime(this.tableData[i].created);
          }
      		this.total = res.data.total;
      		this.pageindex = res.data.index;      		
        })
    	},
      handleCurrentChange(val) {
        this.filterdata.filter.offset = (val-1)*10;
        const index = this.pageindex;
        this.filterdata.index = index;
        newsApi.news.postPage(this.filterdata).then(res => {
          this.tableData = res.data.items;
          for(let i = 0; i < this.tableData.length; i++){
            this.tableData[i].location = this.tableData[i].location.province + '·' + this.tableData[i].location.city;
            this.tableData[i].created = functionApi.moment.getListTime(this.tableData[i].created);
          }
        })
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      handleEdit(index, row) {
        localStorage.setItem('newsId', row.id);
        this.$router.push({ path: '/nav1/article/news/newseditor' });
      },
      handleDel(index, row) {
        let deletedata={id:row.id}
        this.$confirm('此操作将永久删除该草稿, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          newsApi.news.deleteNews(deletedata).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!' 
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });     
        });
      }
    },
    mounted() {
      const filterdata = {index:'', filter:{limit:10, states:["0"], offset: (this.page-1)*10}};
      this.filterdata = filterdata;
    	this.getNewsList(this.filterdata);
    }
  }
</script>

<style lang="scss" scoped>
  .label-search{ float:right; }
  .toolbar{
    .el-pagination{ float:right; }
  }
</style>
