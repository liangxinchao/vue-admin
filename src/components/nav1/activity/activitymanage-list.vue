<template>
  <div>
    <el-form :inline="true">
		  <div class="animation-wrap" v-if="animationShow"></div>
			<label class="label-con">门票状态：</label>
			<el-form-item class="label-sel">
				<el-select v-model="stateType" placeholder="请选择" @change="filterBtn">
					<el-option label="全部" value=""></el-option>
					<el-option v-for="(item, index) in states" :label="item" :value="index" :key="index"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item class="label-search">
				<el-input placeholder="请输入搜索内容" icon="search" v-model="searchContent" @click="filterBtn"></el-input>
			</el-form-item>
		</el-form>
		<el-table :data='tableData' highlight-current-row @selection-change="selsChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="accountname" label="昵称" ></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="company" label="公司名称"></el-table-column>
      <el-table-column prop="enrollTime" label="报名时间" width="115" sortable></el-table-column> 
      <el-table-column prop="state" label="状态"></el-table-column> 
      <el-table-column label="操作" width="200">
        <template scope="scope">
          <el-button type="info" size="small">私信</el-button>
          <el-button type="info" size="small" @click="scanDialog(scope.row)">查看</el-button>
          <el-button size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="报名详情" v-model="scanDialogVisible" size="tiny">
      <div class="content">
        <el-form :model="scanform" label-width="100px">
          <el-form-item label="用户名：" >
            <span>{{scanform.accountname}}</span>
          </el-form-item>
          <el-form-item label="姓名：">
            <span>{{scanform.name}}</span>
          </el-form-item>
          <el-form-item label="账户属性：">
            <span>{{scanform.accountType}}</span>
          </el-form-item>
          <el-form-item label="手机号码：">
            <span>{{scanform.phone}}</span>
          </el-form-item>
          <el-form-item label="公司名称：">
            <span>{{scanform.company}}</span>
          </el-form-item>
          <el-form-item label="报名时间：">
            <span>{{scanform.enrollTime}}</span>
          </el-form-item>
          <el-form-item label="票号：">
            <span>{{scanform.id}}</span>
          </el-form-item>
          <el-form-item label="状态：">
            <span>{{scanform.signState}}</span>
          </el-form-item>
        </el-form>
        <qrcode class="qrcode" :size="qrcodeSize" :value="qrcodeValue"></qrcode>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="scanDialogVisible = false">确 定</el-button>
        <el-button @click="scanDialogVisible = false">返回</el-button>
      </span>
    </el-dialog>
    <el-col :span="24" class="toolbar">
      <el-button type="info" @click="export2Excel" :disabled="this.sels.length===0">导出excel</el-button>
      <el-button type="danger" @click="delSels" :disabled="this.sels.length===0">删除</el-button>
      <el-button type="success" @click="" :disabled="this.sels.length===0">发送通知</el-button>
      <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="total"></el-pagination>
    </el-col>
  </div>
</template>

<script>
	import activityApi from '@/js/api.js';
	import functionApi from '@/js/function.js';
  import Qrcode from 'v-qrcode/src/index';
	import vue from 'vue';
	export default {
    components: {
      Qrcode
    },
		data() {
			return {
        animationShow: false,
        stateType: '',
        states: ['有效票', '无效票'],
        searchContent: '',
        tableData: [],
        scanDialogVisible: false,
        qrcodeValue: '',
        scanform: {
          accountname: '',
          name: '',
          accountType: '',
          phone: '',
          company: '',
          enrollTime: '',
          id: '',
          signState: ''
        },
        qrcodeSize: 120,
        sels: '',
        currentPage: 1,
        total: 0,
        page: 1,
        filterdata: {},
        enrollStates: [{label:'待审核', value:"0"}, {label:'已通过', value:"1"}, {label:'已取消', value:"2"}]
	    }
		},
		methods:{
			filterBtn() {
				if(this.stateType.toString() != ''){
					this.filterdata.states = [this.stateType.toString()];
				}
				this.filterdatar.title = this.searchContent;
				this.getEnrollList(this.filterdata);
			},
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
          const tHeader = ['昵称', '姓名','手机号码',  '公司名称', '报名时间', '状态'];
          const filterVal = ['accountname', 'name', 'phone', 'company', 'enrollTime', 'state'];
          const data = this.formatJson(filterVal, selsData);
          export_json_to_excel(tHeader, data, '活动报名名单');
        })
      },
      delSels: function(){
        const ids = this.sels.map(item => item.id);
        this.$confirm('此操作将永久删除选中项的名单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for(let i = 0; i < ids.length; i++){
             activityApi.activity.postDelEnroll({id: ids[i]}).then(res => {
              this.handleDelVisible = false;
              this.$message.success('删除成功!');
            }).catch(() => {
              this.$message.info('删除失败!');
            })
          }
        }).catch(() => {
          this.$message.info('已取消删除!');
        });
      },
			getEnrollList(t){
        activityApi.activity.postEnrollList(t).then(res => {
          this.tableData = res.data.enrollList;
          console.log(this.tableData)
          this.total = res.data.count;
          for(let i = 0; i < this.tableData.length; i++){
            this.tableData[i].accountname = this.tableData[i].account.name;
            /*this.tableData[i].name = '暂无';
            this.tableData[i].phone = '暂无';
            this.tableData[i].company = '暂无';*/
          	this.tableData[i].enrollTime = functionApi.moment.getListTime(this.tableData[i].enrollTime);
            for(let j = 0; j < this.enrollStates.length; j++){
              if(this.tableData[i].state == this.enrollStates[j].value){
                this.tableData[i].state = this.enrollStates[j].label;
              }
            }
          }
        }).catch(res => {
          console.log(res)
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.filterdata.skip = (val-1)*10;
        this.getEnrollList(this.filterdata);
      },
			scanDialog(row) {
        this.scanDialogVisible = true;
        let enrollId = row.id;
        let value = {
         "id": localStorage.getItem("activityId"),
         "enrollCode": enrollId
        }
        this.qrcodeValue = JSON.stringify(value);
        for(let i = 0; i < this.tableData.length; i++){
          if(this.tableData[i].id == enrollId){
            this.scanform.accountname = this.tableData[i].account.name;
            this.scanform.name = this.tableData[i].name;

            let aTypes = [{value: 'a0', label: '超级管理员'}, {value: 'a1', label: '普通管理员'}, {value: 'a2', label: '马甲'}, {value: 'p0', label: '注册用户'}, {value: 'p1', label: '园区用户'}, {value: 'p2', label: '投资人'}, {value: 'p3', label: '政府工作人员'}, {value: 'e0', label: '注册企业'}, {value: 'e1', label: '认证企业'}, {value: 'e2', label: '园区企业'}, {value: 'e3', label: '孵化器'}, {value: 'e4', label: '投资机构'}, {value: 'e5', label: '服务企业（商家）'}]
            if(this.tableData[i].account.accountType){
              for(let j = 0; j < aTypes.length; j++){
                if(this.tableData[i].account.accountType == aTypes[j].value){
                  this.scanform.accountType = aTypes[j].label;
                }
              }
            }else{
              this.scanform.accountType = '暂无';
            }

            this.scanform.phone = this.tableData[i].phone;
            this.scanform.company = this.tableData[i].company;
            this.scanform.enrollTime = functionApi.moment.getListTime(this.tableData[i].enrollTime);
            this.scanform.id = this.tableData[i].id;

            if(this.tableData[i].signState == '0'){
              this.scanform.signState = '无效票';
            }else{
              this.scanform.signState = '有效票';
            }
          }
        }
  		},
      handleDel(row) {
        this.$confirm('此操作将永久删除该条报名名单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          activityApi.activity.postDelEnroll({id: row.id}).then(res => {
            this.handleDelVisible = false;
            this.$message.success('删除成功!');
          }).catch(() => {
            this.$message.info('删除失败!');
          })
        }).catch(() => {
          this.$message.info('已取消删除!');      
        });
      }
		},
		mounted() {
			const filterdata = {
        id: localStorage.getItem('activityId'),
        limit: 10,
        skip: (this.page-1)*10
      };
      this.filterdata = filterdata;
			this.getEnrollList(this.filterdata);
		}
	}
</script>

<style lang="scss" scoped>
	.animation-wrap{ width:100%; height:100%; background:rgba(255,255,255,0.7) url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2603642376,976323263&fm=117&gp=0.jpg) no-repeat 500px 200px; background-size:40px; position:fixed; z-index:10000000100030303; }
	.label-sel{ width:120px; }
	.label-sel-date{ width:193px; }
	.label-search{ float:right; }
	.label-con{ display:inline-block; height:36px; line-height:36px; }
	.toolbar{
    .el-pagination{ float:right; }
  }
  .content{ position:relative; overflow:hidden;
    .el-form-item { margin-bottom:12px; }
    .qrcode{ position:absolute; top:0; right:0; }
    .el-dialog__footer{ text-align:center; }
  }
</style>


