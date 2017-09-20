<template>
  <div>
    <el-form :inline="true">
		  <div class="animation-wrap" v-if="animationShow"></div>
			<label class="label-con">状态：</label>
			<el-form-item class="label-sel">
				<el-select v-model="stateType" placeholder="请选择" @change="filterBtn">
					<el-option v-for="(item, index) in states" :label="item.label" :value="item.value" :key="index"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item class="label-search">
				<el-input placeholder="请输入搜索内容" icon="search" v-model="searchContent" @change="filterBtn" @click="filterBtn"></el-input>
			</el-form-item>
		</el-form>
		<el-table :data='tableData' highlight-current-row @current-change="handleCurrent">
      <el-table-column prop="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="title" label="活动标题" min-width="180"></el-table-column>
      <el-table-column prop="state" label="活动状态"></el-table-column> 
      <el-table-column prop="created" label="发布时间" sortable></el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </el-col>
    <div class="btn-wrap">
			<el-button class="btn" type="primary" @click="selectpushconfirm">确定</el-button>
			<el-button class="btn" @click="cancel">取消</el-button>
		</div>
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
        stateType: '',
        states: [{label:'全部', value:""}, {label:'报名中', value:"4"}, {label:'预热中', value:"5"}, {label:'进行中', value:"6"}],
        searchContent: '',
        tableData: [],
        currentPage: 1,
        total: 0,
        page: 1,
        filterdata: {},
        push: {}
	    }
		},
		methods:{
			filterBtn() {
				if(this.stateType == ''){
					this.filterdata.states = ['4','5','6'];
				}else{
					this.filterdata.states = [this.stateType.toString()];
				}
				this.filterdata.title = this.searchContent;
				this.getActivityList(this.filterdata)
			},
			getActivityList(t){
        activityApi.activity.postList(t).then(res => {
          this.tableData = res.data.activityList;
					this.total = res.data.count;
          for(let i = 0; i < this.tableData.length; i++){
          	this.tableData[i].index = i + 1;
            for(let j = 0; j < this.states.length; j++){
              if(this.tableData[i].state == this.states[j].value){
                this.tableData[i].state = this.states[j].label;
              }
            }
            this.tableData[i].created = functionApi.moment.getListTime(this.tableData[i].created);
          }
        }).catch(res => {
          console.log(res)
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.filterdata.skip = (val-1)*10;
				this.getActivityList(this.filterdata)
      },
      handleCurrent(val) {
      	this.push.id = val.id;
      	this.push.title = val.title;
      	this.push.content = val.content;
      },
      selectpushconfirm() {
      	this.push.type = '1';
      	this.$store.dispatch('selectpushconfirm', this.push);
      	this.$router.go(-1);
      },
      cancel() {
      	this.$router.go(-1);
      }
		},
		mounted() {
      const filterdata = {
        limit: 10,
        skip: (this.page-1)*10,
        states: ['4','5','6']
      };
      this.filterdata = filterdata;
			this.getActivityList(this.filterdata);
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
  .btn-wrap{ display:flex; justify-content:center; margin-top:80px;
		.btn{ width:100px; margin-right:40px; }
	}
</style>


