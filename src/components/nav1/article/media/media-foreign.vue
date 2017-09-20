<template> 
  <div>
    <el-form :inline="true">
      <el-button class="created" @click="createMedia">创建媒体</el-button>
      <el-form-item class="label-search">
        <el-input placeholder="请输入搜索内容" icon="search" v-model="searchContent" :on-icon-click="filterBtn"></el-input>
      </el-form-item>
    </el-form>
    <el-table :data='tableData' highlight-current-row @selection-change="selsChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="name"  label="用户名"></el-table-column>
      <el-table-column prop="location" label="区域"></el-table-column>
      <el-table-column prop="website" label="网站"></el-table-column>
      <el-table-column prop="created" label="创建时间" width="150" sortable></el-table-column>
      <el-table-column label="操作" width="140">
        <template scope="scope">
          <el-button type="info" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="pagenum" layout="total, prev, pager, next,jumper" :total="total"></el-pagination>
    </el-col>
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
        sels:'',
        tableData: [],
        total: 0,
        filterdata: {},
        page: 1,
        pageindex: '',
        pagenum: 10,
        author: {}
      }
    },
    methods:{
      filterBtn() {
        this.filterdata.filter.name = this.searchContent;
        const index = this.pageindex;
        this.filterdata.index = index;
        this.getAccountList(this.filterdata);
      },
      getAccountList(t){
        newsApi.news.postNewsMediaList(t).then(res => {
          this.tableData = res.data.items;
          console.log(this.tableData);
          this.total = res.data.total;
          this.pageindex = res.data.index;
          for(let i = 0; i < this.tableData.length; i++){
             this.tableData[i].created = functionApi.moment.getListTime(this.tableData[i].created);
            if(this.tableData[i].location){
              this.tableData[i].location = this.tableData[i].location.province + '·' + this.tableData[i].location.city;  
            }else{
              this.tableData[i].location = "全国"
            }
          }
        })
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      handleSize(val) {
        this.pagenum = val;
      },
      handleCurrentChange(val) {
        this.filterdata.filter.offset = (val-1)*10;
        const index = this.pageindex;
        this.filterdata.index = index;
        newsApi.news.postPageNewsMediaList(this.filterdata).then(res => {
          this.tableData = res.data.items;
          for(let i=0; i<this.tableData.length; i++){
            if(this.tableData[i].location){
              this.tableData[i].location = this.tableData[i].location.province + '·' + this.tableData[i].location.city + '·' + this.tableData[i].location.area;  
            }else{
              this.tableData[i].location = "全国";
            }
          }
        })
      },
      selectauthorconfirm() {
        this.author.authorType="1";
        this.$store.dispatch('selectauthorconfirm', this.author);
        this.$router.go(-1);
      },
      cancel() {
        this.author = '';
        this.$router.go(-1);
      },
      handleEdit(index,row) {
        console.log(row.id);
        localStorage.setItem('newsId', row.id);
        this.$router.push({path:'/nav1/article/media/newsmediadetail'})
      },
      handleDel(index,row) {
        console.log(row.id);
        this.$confirm('此操作将永久删除该媒体, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          newsApi.news.MediaDelete({id:row.id}).then(res => {
            console.log(res.data);
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
      createMedia(){
        this.$router.push({ path: '/nav1/article/news/createmedia' });
      }
    },
    mounted() {
      const filterdata = {filter:{limit:10}};
      this.filterdata = filterdata;
      this.getAccountList(this.filterdata);
    }
  }
</script>

<style lang="scss" scoped>
  .label-search{ float:right; }
  .label-con{ display:inline-block; height:36px; line-height:36px; }
  .toolbar{
    .el-pagination{ float:right; }
  }
</style>
