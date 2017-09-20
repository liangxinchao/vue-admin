<template>
  <div>
     <el-form :inline="true">
      <div class="animation-wrap" v-if="animationShow"></div> 
      <el-button :plain="true" type="danger">下架</el-button>
    <el-button @click="addBtn">添加</el-button>
    </el-form>
    <el-table :data='tableData' highlight-current-row @selection-change="selsChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="content" label="轮播图名称"></el-table-column>
      <el-table-column prop="author" label="链接地址"></el-table-column>
      <el-table-column prop="created" label="位置"></el-table-column>
      <el-table-column prop="data" label="发表时间"></el-table-column>
      <el-table-column label="操作" min-width="120">
        <template scope="scope">
          <el-button type="info" size="small" @click="addBtn(scope.$index, scope.row)">管理</el-button>
          <el-button size="small">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
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
            tableData: [],
            sels: '',
            currentPage: 1,
            total: 0,
            page: 1,
            pageindex: '',
            dateTime: [],
            filterdata:{}
        }
    },
    methods:{
      selsChange() {
      },
      addBtn() {
        this.$router.push({path:'/nav1/home/manage/banner-create'})
      },
      handleEdit(index, row) {
        //localStorage.setItem('dynamicId', row.id);
        this.$router.push({path:'/nav1/dynamic/topiclist/manage'})
          },
          handleCurrentChange(val) {
        this.currentPage = val;
        this.filterdata.filter.offset = (val-1)*10;
        let index = this.pageindex;
        this.filterdata.index = index;
      },
      getDynamicList() {
        this.tableData=[
           {content:'评论11111111', author:'张三', relative:'梦想小镇周年庆', data:'12/20', created:'2017-03-26'}
        ]
      },
        handleCurrentChange(){
        },
    },
    mounted() {
       const filterdata = {
        filter: {
          limit: 10,
          offset: (this.page-1)*10
        }
      };
      this.filterdata = filterdata;
      this.getDynamicList(this.filterdata);
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