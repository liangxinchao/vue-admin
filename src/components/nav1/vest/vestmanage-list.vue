<template>
  <div>
    <el-form :inline="true">
      <div class="animation-wrap" v-if="animationShow"></div>
      <label class="label-con">马甲类型：</label>
      <el-form-item class="label-sel">
        <el-select v-model="vestType" placeholder="请选择" @change="filterBtn">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, index) in types" :label="item" :value="index" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="label-search">
        <el-input placeholder="请输入搜索内容" icon="search" v-model="searchContent" @click="filterBtn"></el-input>
      </el-form-item>
    </el-form>
    <el-table :data='tableData' highlight-current-row @selection-change="selsChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="name1" label="用户名"></el-table-column>
      <el-table-column prop="name2" label="昵称"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="author" label="创建人"></el-table-column>
      <el-table-column prop="location" label="所在区域"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column label="操作" min-width="100">
        <template scope="scope">
          <el-button type="info" size="small" @click="handleEdit(scope.$index, scope.row)">管理</el-button>
          <el-button size="small">停用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="" :disabled="this.sels.length===0">停用</el-button>
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
        vestType: '',
        types: ['创业者', '投资人', '运营', '市场', '技术', '设计师', '自媒体人', '自由职业者', '人资', '财务'],
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
        this.getTableList(this.filterdata)
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      getTableList(t){
        this.tableData = [
          {name1:'创业君', name2:'小创业君', type:'创业者', author:'张三', location:'浙江·杭州', sex:'男', age:'30'}
        ]
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.filterdata.filter.offset = (val-1)*10;
        let index = this.pageindex;
        this.filterdata.index = index;
      },
      handleEdit(index, row) {
        localStorage.setItem('vestId', row.id);
        this.$router.push({path:'/nav1/vest/vestmanage/manage'});
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