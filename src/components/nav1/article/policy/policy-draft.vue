<template> 
  <div>
    <el-form :inline="true">
      <div class="animation-wrap" v-if="animationShow"></div>
      <el-form-item class="label-search">
        <el-input placeholder="请输入搜索内容" icon="search" v-model="searchContent" :on-icon-click="filterBtn" @keyup.enter.native="filterBtn"></el-input>
      </el-form-item>
    </el-form>
    <el-table highlight-current-row :data='tableData' @selection-change="selsChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="title" label="政策标题"></el-table-column>
      <el-table-column prop="type" label="政策类型"></el-table-column>
      <el-table-column prop="author.name" label="发布机构"></el-table-column>
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
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="10" layout="total, prev, pager, next,jumper" :total="total"></el-pagination>
    </el-col>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        animationShow: false,
        searchContent: '',
        tableData: [],
        sels:'',
        currentPage: 1,
        total: 0,
        pagedata: {},
        page: 1,
        pageindex: ''
      }
    },
    methods:{
      filterBtn() {},
      handleEdit(index, row) {
        localStorage.setItem('policyId', row.id);
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      handleUnline(index, row) {
        this.dialogFormVisible = true;
        this.canceldata = {id: row.id};
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.pagedata.filter.offset = (val-1)*10;
        let index = this.pageindex;
        this.pagedata.index = index;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .animation-wrap{ width:100%; height:100%; background:rgba(255,255,255,0.7) url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2603642376,976323263&fm=117&gp=0.jpg) no-repeat 500px 200px; background-size:40px; position:fixed; z-index:10000000100030303; }
  .label-sel{ width:130px; }
  .label-search{ float:right; }
  .label-con{ display:inline-block; height:36px; line-height:36px; }
</style>
