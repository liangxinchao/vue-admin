<template>
  <div>
    <el-form :inline="true">
      <el-form-item class="label-search">
        <el-input placeholder="请输入搜索内容" icon="search" v-model="searchContent" :on-icon-click="filterBtn"></el-input>
      </el-form-item>
    </el-form>
    <el-table :data='tableData' highlight-current-row @current-change="handleCurrent">
      <el-table-column type='index' width="60"></el-table-column>
      <el-table-column prop="name"  label="名称"></el-table-column>
      <el-table-column prop="location" label="所在区域"></el-table-column>
      <el-table-column prop="website" label="网站/邮箱"  min-width="120"></el-table-column>
    </el-table>
    <div class="pagination-wrap">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagenum" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <div class="confirm-wrap">
      <el-button class="confirm btn" type="primary" @click="selectauthorconfirm">确定</el-button>
      <el-button class="btn" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
  import newsApi from '@/js/api.js';
  export default {
    data() {
      return {
        searchContent: '',
        currentPage: 1,
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
            if(this.tableData[i].location){
              this.tableData[i].location = this.tableData[i].location.province + '·' + this.tableData[i].location.city + '·' + this.tableData[i].location.area;  
            }else{
              this.tableData[i].location = "全国"
            }
          }
        })
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
      handleCurrent(val) {
        this.author.name = val.name;
        this.author.id = val.id;
      },
      handleSizeChange(val) {
        this.pagenum = val;
      },
      selectauthorconfirm() {
        this.author.authorType = "1";
        this.$store.dispatch('selectauthorconfirm', this.author);
        this.$router.go(-1);
      },
      cancel() {
        this.author = '';
        this.$router.go(-1);
      },
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
  .pagination-wrap{ margin-left:100px; float:right; margin-top:20px; }
  .confirm-wrap{ margin-top:90px; text-align:center;
    .btn{ margin-right:12px; width:90px; }
  }
</style>
