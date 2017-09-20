<template>
  <div>
     <el-form :inline="true">
		  <div class="animation-wrap" v-if="animationShow"></div>
			<label class="label-con">收费类型：</label>
			<el-form-item class="label-sel">
				<el-select v-model="costType" placeholder="请选择" @change="filterBtn">
					<el-option label="全部" value=""></el-option>
					<el-option v-for="(item, index) in types" :label="item" :value="index" :key="index">
					</el-option>
				</el-select>
			</el-form-item>
			<label class="label-con">区域：</label>
			<el-form-item class="label-sel">
				<el-cascader expand-trigger="hover" :options="area" v-model="areaValue" @change="filterBtn"></el-cascader>
			</el-form-item>
			<el-form-item class="label-sel label-sel-date">
				<el-date-picker v-model="dateTime" type="daterange" placeholder="请选择时间范围" @change="filterDateBtn"></el-date-picker>
			</el-form-item>
			<el-form-item class="label-search">
				<el-input placeholder="请输入搜索内容" icon="search" v-model="searchContent" @change="filterBtn"></el-input>
			</el-form-item>
		</el-form>
		<el-table :data='tableData' highlight-current-row @selection-change="selsChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="title" label="活动标题"></el-table-column>
      <el-table-column prop="location" label="区域"></el-table-column>
      <el-table-column prop="cost" label="收费类型"></el-table-column>
      <el-table-column prop="accountName" label="发布者"></el-table-column>
      <el-table-column prop="ActivityTime" label="活动时间" width="115" sortable></el-table-column> 
      <el-table-column prop="created" label="发布时间" width="115" sortable></el-table-column>
      <el-table-column label="操作" width="140">
        <template scope="scope">
          <el-button type="info" size="small" @click="handleEdit(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="info" @click="export2Excel" :disabled="this.sels.length===0">导出Excel</el-button>
      <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="total"></el-pagination>
    </el-col>
  </div>
</template>
<script>
	import areaList from '@/js/area.js';
	import activityApi from '@/js/api.js';
  import functionApi from '@/js/function.js';
	export default {
		data() {
			return {
        animationShow: false,
        costType: '',
        types: ['免费', '收费'],
        area:[],
        areaValue: [],
        dateTime: [],
        searchContent: '',
        tableData: [],
        sels: '',
        currentPage: 1,
        total: 0,
        page: 1,
        filterdata: {}
	    }
		},
		methods:{
			selsChange: function (sels) {
        this.sels = sels;
      },
      formatJson(filterVal, jsonData) {
	      return jsonData.map(v => filterVal.map(j => v[j]))
	    },
      export2Excel: function(){
      	const ids = this.sels.map(item => item.id);
      	let selsData = [];
      	for(let i = 0; i < ids.length; i++){
      		for(let j = 0; j < this.tableData.length; j++){
      			if(ids[i] == this.tableData[j].id){
      				selsData.push(this.tableData[j]);
      			}
      		}
      	}
				require.ensure([], () => {
					const { export_json_to_excel } = require('@/js/export2Excel');
	        const tHeader = ['活动标题', '区域', '收费类型', '发布者', '活动时间', '发布时间'];
	        const filterVal = ['title', 'location', 'cost', 'accountName', 'ActivityTime', 'created'];
	        const data = this.formatJson(filterVal, selsData);
	        export_json_to_excel(tHeader, data, '活动未审核列表');
	      })
      },
			filterBtn() {
				this.filterdata.cost = this.costType.toString();
				if(this.areaValue.length!=0){
					this.filterdata.location = {province: this.areaValue[0], city: this.areaValue[1]}
				}
				this.filterdata.title = this.searchContent;
				//this.getActivityList(this.filterdata)
			},
			filterDateBtn() {
        this.filterdata.start = functionApi.moment.getListTime(this.dateTime[0]);
        this.filterdata.end = functionApi.moment.getListTime(this.dateTime[1]);
      },
			handleEdit(row) {
				localStorage.setItem('activityId',row.id)
				this.$router.push({path:'/nav1/activity/activityaudit/detail'})
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.filterdata.skip = (val-1)*10;
				this.getActivityList(this.filterdata)
      },
      getArea() {
	    	this.area = areaList().area;
	    	for(let i = 0;i<this.area.length;i++){
	    		this.area[i].value=this.area[i].label;
	    		for(let j = 0;j < this.area[i].children.length;j++){
	    			this.area[i].children[j].value = this.area[i].children[j].label;
	    			this.area[i].children[j].children = '';
	    		}
	    	}
    	},
			getActivityList(t){
        activityApi.activity.postList(t).then(res => {
          this.tableData = res.data.activityList;
					this.total = res.data.count;
          for(let i = 0; i < this.tableData.length; i++){
            this.tableData[i].cost = this.tableData[i].cost == 0 ? '免费': '收费';
            this.tableData[i].accountName = this.tableData[i].account.name;
            this.tableData[i].created = functionApi.moment.getListTime(this.tableData[i].created);
            let startDate = functionApi.moment.getDateFormate(this.tableData[i].startOfActivity);
						let endDate = functionApi.moment.getDateFormate(this.tableData[i].endOfActivity);
						if(startDate == endDate){
							this.tableData[i].ActivityTime = functionApi.moment.getListTime2(this.tableData[i].startOfActivity) + '-' + functionApi.moment.getHM(this.tableData[i].endOfActivity);
						}else{
							this.tableData[i].ActivityTime = functionApi.moment.getListTime2(this.tableData[i].startOfActivity) + '-' + functionApi.moment.getListTime2(this.tableData[i].endOfActivity);
						}
            if(!this.tableData[i].location){
              this.tableData[i].location = '全国';
            }
            this.tableData[i].location = this.tableData[i].location.province + '·' + this.tableData[i].location.city;  
						this.tableData[i].cost == '0' ? '免费' : '收费';
          }
        }).catch(res => {
          console.log(res)
        })
      }
		},
		mounted() {
			this.getArea();
			const filterdata = {
        limit: 10,
        skip: (this.page-1)*10,
        isReview: ['0'],
        privacy:['0','1']
      };
      this.filterdata = filterdata;
      this.getActivityList(this.filterdata);
		}
	}
</script>

<style lang="scss" scoped>
	.animation-wrap{ width:100%; height:100%; background:rgba(255,255,255,0.7) url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2603642376,976323263&fm=117&gp=0.jpg) no-repeat 500px 200px; background-size:40px; position:fixed; z-index:10000000100030303; }
	.label-sel{ width:130px; }
	.label-search{ float:right; }
	.label-con{ display:inline-block; height:36px; line-height:36px; }
	.toolbar{
    .el-pagination{ float:right; }
  }
</style>
