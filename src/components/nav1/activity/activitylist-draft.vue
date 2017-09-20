<template>
  <div>
    <el-form :inline="true">
		  <div class="animation-wrap" v-if="animationShow"></div>
			<label class="label-con">收费类型：</label>
			<el-form-item class="label-sel">
				<el-select v-model="costType" placeholder="请选择" @change="filterBtn">
					<el-option label="全部" value=""></el-option>
					<el-option v-for="(item, index) in types" :label="item" :value="index" :key="index"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item class="label-sel label-sel-date">
				<el-date-picker v-model="dateTime" type="daterange" placeholder="请选择时间范围" @change="filterDateBtn"></el-date-picker>
			</el-form-item>
			<el-form-item class="label-search">
				<el-input placeholder="请输入搜索内容" icon="search" v-model="searchContent" @click="filterBtn"></el-input>
			</el-form-item>
		</el-form>
		<el-table :data='tableData' highlight-current-row @selection-change="selsChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="title" label="活动标题" min-width="180"></el-table-column>
      <el-table-column prop="location" label="区域"></el-table-column>
      <el-table-column prop="cost" label="收费类型"></el-table-column>
      <el-table-column prop="accountName" label="发布者"></el-table-column>
      <el-table-column prop="ActivityTime" label="活动时间" width="115" sortable></el-table-column> 
      <el-table-column prop="created" label="创建时间" width="115" sortable></el-table-column> 
      <el-table-column label="操作" width="146">
        <template scope="scope">
          <el-button type="info" size="small" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="delSels" :disabled="this.sels.length===0">删除</el-button>
      <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="total"></el-pagination>
    </el-col>
  </div>
</template>

<script>
	import activityApi from '@/js/api.js';
	import functionApi from '@/js/function.js';
	import areaList from '@/js/area.js';
	import vue from 'vue';
	export default {
		data() {
			return {
        animationShow: false,
        costType: '',
        types: ['免费', '收费'],
        area: [],
        areaValue: [],
        stateType: '',
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
			filterBtn() {
				this.filterdata.cost = this.costType.toString();	
				this.filterdata.title = this.searchContent;
				console.log(this.filterdata);
				this.getActivityList(this.filterdata)
			},
      filterDateBtn() {
        this.filterdata.start = functionApi.moment.getListTime(this.dateTime[0]);
        this.filterdata.end = functionApi.moment.getListTime(this.dateTime[1]);
      },
			selsChange: function (sels) {
        this.sels = sels;
      },
      delSels: function(){
        const ids = this.sels.map(item => item.id);
        this.$confirm('此操作将永久删除选中活动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for(let i = 0; i < ids.length; i++){
            activityApi.activity.postDel({id: ids[i]}).then(res => {
              this.$message.success('删除成功!');
              setTimeout(() => {
                window.location.pathname = '/nav1/activity/activitylist/draft';
              }, 1000)
            })
          }
        }).catch(() => {
          this.$message.info('已取消删除！');
        });
      },
			getActivityList(t){
        activityApi.activity.postList(t).then(res => {
          this.tableData = res.data.activityList;
					this.total = res.data.count;
          for(let i = 0; i < this.tableData.length; i++){
            this.tableData[i].accountName = this.tableData[i].account.name;
            this.tableData[i].cost = this.tableData[i].cost == 0 ? '免费': '收费';
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
			handleEdit(row) {
        localStorage.removeItem('previewData');
        localStorage.setItem('activityId', row.id);
				this.$router.push({path:'/nav1/activity/activitylist/manage'});
  		},
			handleDel(row) {
				this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					activityApi.activity.postDel({id: row.id}).then(res => {
            this.$message.success('删除成功!');
            setTimeout(() => {
              window.location.pathname = '/nav1/activity/activitylist/draft';
            }, 1000)
					}).catch(() => {
						this.$message.info('删除失败!');        
					})
        }).catch(() => {
          this.$message.info('已取消删除!');      
        });
			},
	    getArea() {
	    	this.area = areaList().area;
	    	for(let i = 0; i < this.area.length; i++){
	    		this.area[i].value = this.area[i].label;
	    		for(let j = 0; j < this.area[i].children.length; j++){
	    			this.area[i].children[j].value = this.area[i].children[j].label;
	    			this.area[i].children[j].children = '';
	    		}
	    	}
	    }
		},
		mounted() {
			this.getArea();
      const filterdata = {
        limit: 10,
        skip: (this.page-1)*10,
        states: ['0'],
        privacy:['0','1']
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
</style>


