<template>
  <div>
    <el-form :inline="true">
      <div class="animation-wrap" v-if="animationShow"></div>
      <label class="label-con">状态：</label>
      <el-form-item class="label-sel">
        <el-select v-model="messageState" placeholder="请选择" @change="filterBtn">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, index) in states" :label="item" :value="index" :key="index"></el-option>
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
      <el-table-column prop="count" label="条数"></el-table-column>
      <el-table-column prop="created" label="提交时间" width="155" sortable></el-table-column>
      <el-table-column prop="sendTime" label="定时时间" width="155" sortable></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="content" label="短信内容"></el-table-column>
      <el-table-column label="操作" width="160">
        <template scope="scope">
          <el-button class="btn-top" size="small" @click="handleModify(scope.row)">转发</el-button>
          <el-button class="btn-top" size="small" @click="" :disabled="scope.row.state=='待发送'||scope.row.state=='已撤回'">重发</el-button><br>
          <el-button class="btn-top" size="small" @click="widthdraw(scope.row.id)" :disabled="scope.row.state!='待发送'">撤回</el-button>
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
        messageState: '',
        states: ['待发送', '已发送', '发送失败','已撤回'],
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
      handleModify(row){
        localStorage.setItem('messageId', row.id);
        this.$router.push({path:'/nav1/information/message/modify'})
      },
      handleDetail(row) {
        localStorage.setItem('messageId', row.id);
         this.$router.push({path:'/nav1/information/message/detail'})
      },
      widthdraw(id) {
        this.$confirm('确定要撤回该短信吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          infoApi.info.pushSmsWithdraw({id:id}).then(res => {
            console.log(res.data);
            this.$message({
            type: 'success',
            message: '撤回成功!'
          });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消撤回'
          });          
        });
      },
      filterBtn() {
        this.filterdata.title = this.searchContent;
        this.getTableList(this.filterdata)
      },
      filterDateBtn() {
        this.filterdata.start = functionApi.moment.getListTime(this.dateTime[0]);
        this.filterdata.end = functionApi.moment.getListTime(this.dateTime[1]);
      },
      getTableList(t){
       infoApi.info.pushSmsList(t).then(res => {
          this.tableData = res.data.smsList;
          this.total = res.data.count;
          for(let i=0;i<this.tableData.length;i++){
            this.tableData[i].index = i + 1;
            this.tableData[i].created = functionApi.moment.getListTime(this.tableData[i].created);
            this.tableData[i].sendTime = functionApi.moment.getListTime(this.tableData[i].sendTime);
            for(let j = 0;j<this.states.length;j++){
              if(this.tableData[i].state == j){
                this.tableData[i].state = this.states[j]
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