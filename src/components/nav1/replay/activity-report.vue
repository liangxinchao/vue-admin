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
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="author" label="发表人"></el-table-column>
      <el-table-column prop="report" label="举报"></el-table-column>
      <el-table-column prop="create" label="发表时间" min-width="115" sortable></el-table-column>
      <el-table-column label="操作" min-width="100">
        <template scope="scope">
          <el-button type="info" size="small" @click="handleEdit(scope.$index, scope.row)">管理</el-button>
          <el-button size="small">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="" :disabled="this.sels.length===0">下架</el-button>
      <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="total"></el-pagination>
    </el-col>
  </div>
</template>

<script>
  import activityApi from '@/js/api.js';
  import functionApi from '@/js/function.js';
  import vue from 'vue';
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
        filterdata: {}
      }
    },
    methods:{
      filterBtn() {
        this.filterdata.index = this.pageindex;
        this.filterdata.filter.title = this.searchContent;
        this.getTableList(this.filterdata);
      },
      filterDateBtn() {
        this.filterdata.index = this.pageindex;
        this.filterdata.filter.start = functionApi.moment.getListTime(this.dateTime[0]);
        this.filterdata.filter.end = functionApi.moment.getListTime(this.dateTime[1]);
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      getTableList(t){
        this.tableData = [
          {content:'评论11111111', author:'张三', report:'20', create:'2017-03-26'}
        ]
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.filterdata.filter.offset = (val-1)*10;
        let index = this.pageindex;
        this.filterdata.index = index;
      },
      handleEdit(index, row) {
        localStorage.setItem('activityReplayId', row.id);
        this.$router.push({path:'/nav1/replay/activity/manage'});
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
      this.getTableList(this.filterdata);
    }
  }
</script>

<style lang="scss" scoped>
  .animation-wrap{ width:100%; height:100%; background:rgba(255,255,255,0.7) url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2603642376,976323263&fm=117&gp=0.jpg) no-repeat 500px 200px; background-size:40px; position:fixed; z-index:10000000100030303; }
  .label-sel{ width:120px; }
  .label-sel-date{ width:180px; }
  .label-search{ float:right; }
  .label-con{ display:inline-block; height:36px; line-height:36px; }
  .toolbar{
    .el-pagination{ float:right; }
  }
</style>