<template>
  <div>
    <el-form :inline="true">
      <label class="label-con">文章类型：</label>
      <el-form-item class="label-sel">
        <el-select v-model="typevalue" placeholder="请选择" @change="filterBtn" >
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, index) in newstype" :label="item.label" :value="index" :key="index">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="label-search">
        <el-input placeholder="请输入搜索内容" icon="search" v-model="searchContent" :on-icon-click="filterBtn"></el-input>
      </el-form-item>
    </el-form>
    <el-table :data='tableData' highlight-current-row @selection-change="selsChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column prop="location" label="区域"></el-table-column>
      <el-table-column prop="type" label="文章类型"></el-table-column>
      <el-table-column prop="author.name" label="作者"></el-table-column>
      <el-table-column prop="account.name" label="编辑"></el-table-column>
      <el-table-column prop="updated" label="下架时间" min-width="90" sortable></el-table-column>
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
        newstype: [
          {label: '城市创业'}, {label: '行业资讯'}, {label: '创业公司'}, {label: '创业资讯'}
        ],
        typevalue: '',
        searchContent:'',
        currentPage: 1,
        sels:'',
        tableData:[],
        total:0,
        filterdata:{},
        page:1,
        pageindex:''
      }
    },
    methods:{
      filterBtn() {
        this.pagedata.filter.title = this.searchContent;
        this.pagedata.filter.type = this.typevalue.toString();
        const index = this.pageindex;
        this.pagedata.index = index;
        this.getNewsList(this.pagedata)
      },
      getNewsList(t){
        newsApi.news.postList(t).then(res => {
          this.tableData = res.data.items;
          this.tabledata = res.data.items;
          var stateLists = ['城市创业', '行业资讯', '创业公司', '创业资讯'];
          this.total = res.data.total;
          this.pageindex = res.data.index;
          for(var i = 0; i < this.tableData.length; i++){
            if(this.tableData[i].location.province == '' && this.tableData[i].location.city == ''){
              this.tableData[i].location = '全国';
            }else if(this.tableData[i].location.province != '' && this.tableData[i].location.city == ''){
              this.tableData[i].location = this.tableData[i].location.province;
            }else{
              this.tableData[i].location = this.tableData[i].location.province + '·' + this.tableData[i].location.city;
            }
            this.tableData[i].updated = functionApi.moment.getListTime(this.tableData[i].updated);
            for(var j = 0; j < stateLists.length; j++){
              if(this.tableData[i].type == j){
                this.tableData[i].type = stateLists[j];
              }
            }
          }
        })
      },
      handleCurrentChange(val) {
        this.pagedata.filter.offset = (val-1)*10;
        const index = this.pageindex;
        this.pagedata.index = index;
        newsApi.news.postPage(this.pagedata).then(res => {
          this.tableData = res.data.items;
          var stateLists = ['城市创业', '行业资讯', '创业公司', '创业资讯'];
          this.total = res.data.total;
          this.pageindex = res.data.index;
          for(var i = 0; i < this.tableData.length; i++){
            this.tableData[i].location = this.tableData[i].location.province + '·' + this.tableData[i].location.city;
            this.tableData[i].created = functionApi.moment.getListTime(this.tableData[i].created);
            for(var j = 0; j < stateLists.length; j++){
              if(this.tableData[i].type == j){
                this.tableData[i].type = stateLists[j];
              }
            }
          }
          this.tabledata = res.data.items;
        })
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      handleEdit(index, row) {
        localStorage.setItem('newsId', row.id);
        this.$router.push({path: '/nav1/article/news/newseditor'});
      },
      handleDel(index,row) {
        let deletedata = {id: row.id}
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
      },
      handleEdit(index, row) {
        localStorage.setItem('newsId', row.id);
        this.$router.push({ path: '/nav1/article/news/newseditor' });
      },
    },
    mounted() {
      const pagedata = {index:'', filter:{limit:10,states:["7"] ,offset: (this.page-1)*10}};
      this.pagedata = pagedata;
      this.getNewsList(pagedata);
    }
  }
</script>

<style lang="scss" scoped>
  .label-sel{ width:130px; }
  .label-search{ float:right; }
  .label-con{ display:inline-block; height:36px; line-height:36px; }
  .toolbar{
    .el-pagination{ float:right; }
  }
</style>
