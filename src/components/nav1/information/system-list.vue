<template>
  <div>
    <el-form :inline="true">
      <div class="animation-wrap" v-if="animationShow"></div>
      <label class="label-con">类型：</label>
      <el-form-item class="label-sel">
        <el-select v-model="newsType" placeholder="请选择" @change="filterBtn">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, index) in types" :label="item" :value="index" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <label class="label-con">状态：</label>
      <el-form-item class="label-sel">
        <el-select v-model="newsState" placeholder="请选择" @change="filterBtn">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, index) in states" :label="item" :value="index" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <label class="label-con">滚动设置：</label>
      <el-form-item class="label-sel">
        <el-select v-model="scroll" placeholder="请选择" @change="filterBtn">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, index) in scrollType" :label="item" :value="index" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="label-sel label-sel-date">
        <el-date-picker v-model="dateTime" type="daterange" placeholder="请选择时间范围" @change="filterDateBtn"></el-date-picker>
      </el-form-item>
      <el-form-item class="label-search">
        <el-input placeholder="请输入搜索内容" icon="search" v-model="searchContent" @click="filterBtn"></el-input>
      </el-form-item>
    </el-form>
    <el-table :data='tableData' highlight-current-row>
      <el-table-column prop="index" label="序号"></el-table-column>
      <el-table-column prop="created" label="提交时间" width="115" sortable></el-table-column>
      <el-table-column prop="sendTime" label="定时时间" width="115" sortable></el-table-column>
      <el-table-column prop="scroll" label="滚动设置"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="title" label="推送标题"></el-table-column>
      <el-table-column prop="content" label="推送内容" width="220"></el-table-column>
      <el-table-column label="操作" width="160">
        <template scope="scope">
          <el-button class="btn-top" size="small" @click="handleModify(scope.row)">转发</el-button>
          <el-button class="btn-top" size="small" @click="handleReSend(scope.row)" :disabled="scope.row.state!='发送失败'">重发</el-button><br>
          <el-button class="btn-top" size="small" @click="withdraw(scope.row)" :disabled="scope.row.state!='待发送'">撤回</el-button>
          <el-button class="btn-top" type="info" size="small" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="total"></el-pagination>
    </el-col>
  </div>
</template>

<script>
  import infoApi from '@/js/api.js';
  import functionApi from '@/js/function.js';
  import vue from 'vue';
  export default {
    data() {
      return {
        animationShow: false,
        newsType: '',
        types: ['公告', '快讯', '普通消息'],
        newsState: '',
        states: ['待发送', '已发送', '发送失败', '已撤回'],
        scroll: '',
        scrollType: ['是', '否'],
        dateTime: [],
        searchContent: '',
        tableData: [],
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
      filterDateBtn() {
        this.filterdata.index = this.pageindex;
        this.filterdata.filter.start = functionApi.moment.getListTime(this.dateTime[0]);
        this.filterdata.filter.end = functionApi.moment.getListTime(this.dateTime[1]);
      },
      handleModify(row){
        localStorage.setItem('systemId', row.id);
        this.$router.push({path:'/nav1/information/system/modify'})
      },
      handleReSend(row){
        this.$confirm('确定要重发?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          infoApi.info.pushMsgReSend({id: row.id}).then(res => {
            this.$message.success('重发成功');
            setTimeout(() => {
              window.location.pathname = '/nav1/information/system/list'
            }, 1000)
          })
        })
      },
      withdraw(row){
        this.$confirm('确定要撤回, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          infoApi.info.pushMsgWithdraw({id:row.id}).then(res => {
            this.$message.success('撤回成功');
            setTimeout(() => {
              window.location.pathname = '/nav1/information/system/list'
            }, 1000)
          })
        }).catch(() => {
          this.$message.info('已取消撤回');          
        });
      },
      handleDetail(row){
        localStorage.setItem('systemId', row.id);
        this.$router.push({path:'/nav1/information/system/detail'})
      },
      getTableList(t){
        infoApi.info.pushMsgList(t).then(res => {
          this.tableData = res.data.msgList;
          this.total = res.data.count;
          for(let i = 0; i < this.tableData.length; i++){
            this.tableData[i].index = i + 1;
            this.tableData[i].created = functionApi.moment.getListTime(this.tableData[i].created);
            this.tableData[i].sendTime = functionApi.moment.getListTime(this.tableData[i].sendTime);
            if(this.tableData[i].isBanner == 1){
              this.tableData[i].scroll = '是';
            }else{
              this.tableData[i].scroll = '否';
            }
            for(let j = 0; j < this.states.length; j++){
              if(this.tableData[i].state == j){
                this.tableData[i].state = this.states[j];
              }
            }
          }
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.filterdata.skip = (val-1)*10;
        this.getTableList(this.filterdata);
      }
    },
    mounted() {
      const filterdata = {
        limit: 10,
        skip: (this.page-1)*10
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
  .btn-top{ margin:5px 0; }
  .toolbar{
    .el-pagination{ float:right; }
  }
</style>