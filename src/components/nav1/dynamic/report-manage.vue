<template>
  <el-form :model="ruleForm" ref="ruleForm" label-width="100px" label="right" class="manageForm">
    <p class="model">基本信息</p>
    <p class="info">
      <label>发布人：</label><span>菜根科技</span>
    </p>
    <p class="info">
      <label>发表时间：</label><span>2016-05-30</span>
    </p>
    <p class="info">
      <label>回复数：</label><span>12</span>
    </p>
    <p class="info">
      <label>点击数：</label><span>50</span>
    </p>
    <p class="info">
      <label>举报数：</label><span>10</span>
    </p>
    <p class="model">动态内容</p>
    <p class="info">
      <label>动态内容：</label>
      <span>
        <p class="main-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
        <img class="dynamic-img" src="http://pic11.nipic.com/20101214/213291_155243023914_2.jpg" v-for="i in [1,2,3,4,3,5]">
      </span>
    </p>
    <p class="model">回复内容</p>
    <p class="info">
      <label>回复内容：</label><span>@菜根科技：我要评论我要评论</span>
    </p>
    <p class="model">举报详情</p>
    <el-table :data='tableData' highlight-current-row>
      <el-table-column prop="content" label="举报人"></el-table-column>
      <el-table-column prop="reason" label="举报原因"></el-table-column>
      <el-table-column prop="created" label="举报时间" min-width="130"></el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="total"></el-pagination>
    </el-col>
    <div class="btn-wrap"> 
      <el-button type="info" @click="submitForm()" class="check-btn">下架</el-button>
      <el-button class="btn-back" @click="backTo">返回</el-button>
    </div>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        sels: '',
        currentPage: 1,
        total: 0,
        page: 1,
        pageindex: '',
        filterdata:{},
      }
    },
    methods:{ 
      handleCurrentChange(val) {
        this.currentPage = val;
        this.filterdata.filter.offset = (val-1)*10;
        let index = this.pageindex;
        this.filterdata.index = index;
      },
      getReportList() {
        this.tableData=[
           {content:'评论11111111', reason:'张三', created:'2017-03-26'}
        ]
      },
      submitForm() {

      },
      backTo() {
        this.$router.go(-1);
      }
    },
    mounted() {
      const filterdata = {
        filter: {limit: 10,offset: (this.page-1)*10}
      };
      this.filterdata = filterdata;
      this.getReportList()
    }
  }
</script>

<style lang="scss" scoped>
  .manageForm{ margin:20px; width:80%; min-width:600px;
    .info{ margin-bottom:20px; font-size:14px; color:rgb(72, 87, 106); line-height:26px; overflow:hidden; vertical-align:middle; 
      label{ display:block; float:left; width:85px; text-align:right; }
      span{ display:block; float:left; width:70%; text-align:justify; 
        .main-content{ margin:0; }
        .dynamic-img{ margin:10px 10px 10px 0; }
      }
    }
    .p-r{ padding-right:10px; }
    .model{ font-weight:bold; color:#20a0ff; border-left:3px solid #20a0ff; padding:1px 12px; }
    .el-tag{ display:inline-block; background-color:rgba(32,159,255,.1); border-color:rgba(32,159,255,.2); font-size:14px; color:#20a0ff; height:34px; line-height:34px; margin:0 10px 6px 0; padding:0 10px; }
    .toolbar{
      .el-pagination{ float:right; }
    }
  }
</style>
