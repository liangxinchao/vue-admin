<template>
  <div>
    <el-form ref="form" :model="form" label-width="95px" label="right" class="manageForm">
      <p class="model">基本信息</p>
      <p class="info">
        <label>发布人：</label><span>菜根</span>
      </p>
      <p class="info">
        <label>发表时间：</label><span>2016-10-11 08:30</span>
      </p>
      <p class="info">
        <label>关联活动：</label><span>梦想小镇一周年庆祝活动</span>
      </p>
      <p class="info">
        <label>点赞数：</label><span>20</span>
      </p>
      <p class="model">回复内容</p>
      <p class="info">
        <label>回复内容：</label><span>张三李四陈李张黄我要评论，我要评论，我要评论，我要评论……</span>
      </p>
      <p class="model">关联评论</p>
      <p class="info">
        <label>评论内容：</label><span>张三李四陈李张黄我要评论，我要评论，我要评论，我要评论……</span>
      </p>
      <p class="model">下架信息</p>
      <p class="info">
        <label>下架人：</label><span>张三</span>
      </p>
      <p class="info">
        <label>下架时间：</label><span>2016-10-11 08:30</span>
      </p>
      <p class="info">
        <label>下架原因：</label><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</span>
      </p>
      <p class="model">举报详情</p>
      <el-table :data='tableData' highlight-current-row>
        <el-table-column prop="name" label="举报人"></el-table-column>
        <el-table-column prop="reason" label="举报原因"></el-table-column>
        <el-table-column prop="time" label="举报时间" min-width="115" sortable></el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="total"></el-pagination>
      </el-col>
      <el-form-item>
        <el-button type="primary" @click.prevent="onSubmit">下架</el-button>
        <el-button @click.prevent="onSubmit">回复</el-button>
        <el-button @click.prevent="onSubmit">恢复</el-button>
        <el-button @click.prevent="onSubmit">删除</el-button>
        <el-button @click.prevent="onSubmit">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import activityApi from '@/js/api.js';
  import functionApi from '@/js/function.js';
  export default {
    data() {
      return {
        manageData: {},
        tableData: [],
        form:{

        },
        currentPage: 1,
        total: 0,
        page: 1,
        pageindex: '',
        filterdata: {}
      }
    },
    methods: {
       handleCurrentChange(val) {
        this.currentPage = val;
        this.filterdata.filter.offset = (val-1)*10;
        let index = this.pageindex;
        this.filterdata.index = index;
      }
    },
    mounted() {
      const activityId = localStorage.getItem('articlecommentId');
      this.tableData = [
        {name: '张三三', reason: '反动言论', time: '2017-03-20'}
      ]
    }
  }
</script>

<style lang="scss" scoped>
  .manageForm{ margin:20px; width:60%; min-width:600px;
    .info{ margin-bottom:20px; font-size:14px; color:rgb(72, 87, 106); line-height:26px; overflow:hidden; vertical-align:middle; 
      label{ display:block; float:left; width:85px; text-align:right; }
      span{ display:block; float:left; width:580px; text-align:justify; }
    }
    .p-r{padding-right:10px;}
    .model{ font-weight:bold; color:#20a0ff; border-left:3px solid #20a0ff; padding:1px 12px; }
    .el-tag{ display:inline-block; background-color:rgba(32,159,255,.1); border-color:rgba(32,159,255,.2); font-size:14px; color:#20a0ff; height:34px; line-height:34px; margin:0 10px 6px 0; padding:0 10px; }
    .toolbar{
      .el-pagination{ float:right; }
    }
  }
</style>