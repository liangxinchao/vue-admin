<template>
  <div>
    <el-form :inline="true">
      <label class="label-con">性质：</label>
      <el-form-item class="label-sel">
        <el-select v-model="selectType" placeholder="请选择活动状态" @change="filterBtn">
          <el-option :label="item.label" :value="item.value" v-for="(item,index) in states " :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="label-search">
        <el-input placeholder="请输入搜索内容" icon="search" v-model="searchContent" :on-icon-click="filterBtn"></el-input>
      </el-form-item>
    </el-form>
    <el-table :data='tableData' highlight-current-row @current-change="handleCurrent">
      <el-table-column type='index' width="60"></el-table-column>
      <el-table-column prop="username" label="文章名称"></el-table-column>
      <el-table-column prop="profile.nickname" label="文章类型"></el-table-column>
      <el-table-column prop="type" label="发布时间"></el-table-column>
    </el-table>
    <div class="pagination-wrap">
       <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagenum" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </div> 
    <div class="confirm-wrap">
       <el-button class="confirm btn" @click="selectauthorconfirm">确定</el-button>
       <el-button class="btn" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
  import newsApi from '@/js/api.js';
  export default {
    data() {
      return {
        selectType: '',
        searchContent: '',
        currentPage: 1,
        tableData: [],
        total: 0,
        filterdata: {},
        page: 1,
        pageindex: '',
        pagenum: 10,
        author: {},
        states: [{label:'待审核', value:"1"}, {label:'报名中', value:"4"}, {label:'预热中', value:"5"}, {label:'进行中', value:"6"}, {label:'已结束', value:"7"},{label:'已取消', value:"10"}, {label:'已下架', value:"11"}],
      }
    },
    methods:{
      filterBtn() {
        this.filterdata.filter.type = this.selectType.toString();                      
        this.filterdata.filter.username = this.searchContent;
        let index = this.pageindex;
        this.filterdata.index = index;
        this.getAccountList(this.filterdata);
      },
      getAccountList(t){
        newsApi.news.postAccountList(t).then(res => {
          this.tableData = res.data.items;
          this.total = res.data.total;
          this.pageindex=res.data.index;
          for(let i = 0;i < this.tableData.length;i++){
           for(let j = 0; j < this.states.length; j++){
              if(this.tableData[i].state == this.states[j].value){
                this.tableData[i].state = this.states[j].label;
              }
            }
          }
        })
      },
      handleSize(val) {
        this.pagenum = val;
      },
      handleCurrentChange(val) {
        this.author={};
        this.filterdata.filter.offset = (val - 1)*10;
        const index = this.pageindex;
        this.filterdata.index = index;
        newsApi.news.postPageAccountList(this.filterdata).then(res => {
          this.tableData = res.data.items;
          const states = ['城市创业','行业资讯','创业公司','创业资讯'];
          for(let i = 0;i < this.tableData.length;i++){
            for(let j = 0; j < type.length; j++){
              if(this.tableData[i].type == j){
                this.tableData[i].type = type[j];
              }
            }
          }
        })
      },
      handleCurrent(val) {
        if(val){
          if(val.type=='用户'){
            this.author.id = val.id;
            this.author.type = val.type;
            if(val.profile){
              this.author.name = val.profile.nickname;
            }else{
              this.author.name='我加的名字1'
            }
          }else if(val.type=='企业'){
            this.author.id = val.id;
            this.author.type = val.type;
            if(val.profile){
              this.author.name = val.profile.nickname; 
            }else{
             this.author.name='我加的名字2';
            }
          }else{
            this.author.id = val.id;
            this.author.type = val.type;
            if(val.profile){
              this.author.name=val.profile.nickname;
            }else{
              this.author.name="我加的名字3"
            }
          }
          console.log(this.author.name)
        }
      },
      handleSizeChange(val) {
        this.pagenum = val;
      },
      selectauthorconfirm() {
        this.author.authorType="0";
        console.log(this.author);
        this.$store.dispatch('selectauthorconfirm', this.author);
        this.$router.go(-1)
      },
      cancel() {
        this.author = {};
        this.$router.go(-1);
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
  .label-con{ display:inline-block; height:36px; line-height:36px; }
  .label-sel{ width:156px; }
  .label-search{ float:right; }
  .pagination-wrap{ margin-left:100px; float:right; margin-top:20px; }
  .confirm-wrap{ margin-top:90px; text-align:center;
    .btn{ margin-right:12px; width:90px; }
  }
</style>
