<template>
  <div id="activitypublish">
    <el-form ref="form" :model="form" :rules="rules" label-width="130px" label="right" class="publishForm">
    	<p class="model">基本信息</p>
    	<el-form-item label="活动标题:" prop="title">
				<el-input v-model="form.title" placeholder="请填写活动标题"></el-input>
			</el-form-item>
			<el-form-item label="活动地点:" required>
				<el-col :span="7" class="p-r">
					<el-form-item prop="location">
						<el-cascader expand-trigger="hover" :options="area" v-model="form.location"></el-cascader>
					</el-form-item>
				</el-col>
				<el-col :span="17">
					<el-form-item prop="address">
						<el-input v-model="form.address" placeholder="请填写详细地址"></el-input>
					</el-form-item>
				</el-col>
			</el-form-item>
			<el-form-item label="活动时间:" required style="width:855px; margin-bottom:0;">
				<el-col :span="11">开始时间</el-col>
				<el-col :span="10">结束时间</el-col>
			</el-form-item>
			<el-form-item label="" required style="width:855px;">
				<el-col :span="5">
	        <el-form-item prop="activityStartTimeDate">
	          <el-date-picker v-model="form.activityStartTimeDate" type="date" placeholder="年-月-日"  :picker-options="pickerOptions"></el-date-picker>
	        </el-form-item>
	      </el-col>
	      <el-col :span="5">
	        <el-form-item prop="activityStartTimeTime">
	        	<el-time-picker v-model="form.activityStartTimeTime" format="HH:mm" placeholder="时:分">
  					</el-time-picker>
	         </el-form-item> 
	      </el-col>
	      <el-col :span="1" style="text-align:center;">—</el-col>
	      <el-col :span="5">
	        <el-form-item prop="activityEndTimeDate">
	          <el-date-picker v-model="form.activityEndTimeDate" type="date" placeholder="年-月-日"  :picker-options="pickerOptions"></el-date-picker>
	        </el-form-item>
	      </el-col>
	      <el-col :span="5">
	        <el-form-item prop="activityEndTimeTime">
						<el-time-picker v-model="form.activityEndTimeTime" format="HH:mm"
					    placeholder="时:分">
					  </el-time-picker>
	        </el-form-item>
	      </el-col>
			</el-form-item>
			<el-form-item style="margin-top:-15px;">
				<el-checkbox v-model="form.setEnrollEndTime" label="设置报名截止时间"></el-checkbox>
			</el-form-item>
			<el-form-item label="报名截止时间:" required style="width:855px;" v-if="form.setEnrollEndTime">
				<el-col :span="5">
	        <el-form-item prop="enrollEndTimeDate">
	          <el-date-picker v-model="form.enrollEndTimeDate" type="date" placeholder="年-月-日"></el-date-picker>
	        </el-form-item>
	      </el-col>
	      <el-col :span="7">
	        <el-form-item prop="enrollEndTimeTime">
	        <el-time-picker v-model="form.enrollEndTimeTime" format="HH:mm" placeholder="时:分">
  					</el-time-picker>
	        </el-form-item>
	      </el-col>
			</el-form-item>
			<el-form-item label="上传海报:" prop="coverImg" required>
				<el-col :span="14">
					<input type="file" @change="onFileChange" id="coverImg" class="hide"/>
					<div class="thumbset">
	          <div class="thumbImg">
	            <a href="javascript:void(0)" class="reselect" v-if="form.coverImg !== ''" @click="clearthumb('coverImg')">×</a>
	            <img :src="form.coverImg"/>
	          </div>
	  				<i class="el-icon-picture thumb-uploader-icon"></i>
	  				<div class="el-upload__tip">图片必须为 jpg、gif、png、bmp 格式，尺寸不可小于276*386px</div>
	        </div>
				</el-col>
				<el-col :span="10">
						<el-button @click="uploadthumb('coverImg')">选择图片</el-button><br>
					<a href="javascript:void(0)" class="poster" @click="imageDialogVisible = true">没有准备海报?</a>
				</el-col>
				<el-dialog title="选择一张图片作为海报：" v-model="imageDialogVisible" size="small" style="min-width:672px;">
		      <div class="posterContent">
		        <ul>
		        	<li v-for="(item, index) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]">
		        		<a href="javascript:void(0)" :id="'poster' + index" @click="choosePoster(index)">
		        			<img :src="'http://121.196.233.212:3001/images/activityCover/'+ item +'.png'"/>
		        		</a>
		        	</li>
		        </ul>
		      </div>
		      <span slot="footer" class="dialog-footer">
		        <el-button type="primary" @click="surePoster">确 定</el-button>
		        <el-button @click="imageDialogVisible = false">取消</el-button>
		      </span>
		    </el-dialog>
			</el-form-item>
			<el-form-item label="活动人数:" class="small-ipt" prop="num">
				<el-input v-model="form.num">
					<template slot="append">人</template>
				</el-input>
			</el-form-item>
			<el-form-item label="活动主题:" class="small-ipt" prop="subject" required>
				<el-select v-model="form.subject" placeholder="请选择" :options="form.subject">
			    <el-option v-for="(item, index) in activitySubject" :label="item" :value="item" :key="index"></el-option>
			  </el-select>
			</el-form-item>
			<el-form-item label="活动形式:" class="small-ipt" prop="pattern" required>
				<el-select v-model="form.pattern" placeholder="请选择">
			    <el-option v-for="(item, index) in activityPattern" :label="item" :value="item" :key="index"></el-option>
			  </el-select>
			</el-form-item>
			<el-form-item label="主办单位:" prop="sponsorTags" required>
				<el-tag :key="tag" v-for="tag in form.sponsorTags" :closable="true" :close-transition="false" @close="handleClose(tag, 'sponsorTags')">{{tag}}</el-tag>
				<el-input class="small-ipt" v-if="sponsorInput" v-model="sponsorInputValue" ref="sponsorInput" @keyup.enter.native="handleSponsorInput" @blur="handleSponsorInput"></el-input>
				<el-button v-else @click="showInput('sponsorInput')">+新增主办单位</el-button>
			</el-form-item>
			<!-- <el-form-item label="协办单位:">
				<el-tag :key="tag" v-for="tag in form.coSponsorTags" :closable="true" :close-transition="false" @close="handleClose(tag, 'coSponsorTags')">{{tag}}</el-tag>
				<el-input class="small-ipt" v-if="coSponsorInput" v-model="coSponsorInputValue" ref="coSponsorInput" @keyup.enter.native="handleCoSponsorInput" @blur="handleCoSponsorInput"></el-input>
				<el-button v-else @click="showInput('coSponsorInput')">+新增协办单位</el-button>
			</el-form-item> -->
			<el-form-item label="活动详情:" style="width:1050px;" prop='content' required>
	      <div id="activityContent" style="height:260px;"></div>
	    </el-form-item>
	    <el-form-item label="活动嘉宾:" style="width:986px;">
	    	<el-col :span="4">
      		<div class="guestsuploadimg">
      			<input type="file" @change="onFileChange" id="guestAvatar" class="hide"/>
      			<div class="img" @click="uploadthumb('guestAvatar')">
      				<img :src="form.guestAvatar"/>
      			</div>
      			<a href="javascript:void(0)" class="addimg"></a>
      		</div>
	    	</el-col>
	    	<el-col :span="18">
	    		<el-row>
	    			<el-col :span="8" class="h-31">嘉宾姓名</el-col>
	    			<el-col :span="8" class="h-31">嘉宾公司</el-col>
	    			<el-col :span="8" class="h-31">嘉宾职位</el-col>
	    		</el-row>
	    		<el-row>
	    			<el-col :span="7">
	    				<el-input size="small" v-model="form.guestName" placeholder="请填写嘉宾姓名"></el-input>
	    			</el-col>
	    			<el-col :span="7" :offset="1">
	    				<el-input size="small" v-model="form.guestCompany" placeholder="请填写嘉宾公司"></el-input>
	    			</el-col>
	    			<el-col :span="7" :offset="1">
	    				<el-input size="small" v-model="form.guestPosition" placeholder="请填写嘉宾职位"></el-input>
	    			</el-col>
	    		</el-row>
	    		<el-row>
	    			<el-col :span="23" style="margin-top:5px;">
	    				<el-input type="textarea" v-model="form.guestInfo"></el-input>
	    			</el-col>
	    		</el-row>
	    	</el-col>
	    	<el-col :span="2">
	    		<el-button type="primary" size="small" @click="addGuest()">+添加嘉宾</el-button>
	    	</el-col>
	    </el-form-item>
	    <el-form-item style="width:986px;" v-for="(guest, index) in guestLists" :key="guest">
	    	<el-col :span="24" style="border:1px solid #ccc;">
	    		<el-col :span="4">
		    		<div class="guestsuploadimg">
	      			<div class="img">
	      				<img :src="guest.pic"/>
	      			</div>
	      		</div>
		    	</el-col>
		    	<el-col :span="16">
		    		<el-row>
		    			<el-col :span="6">姓名：{{guest.name}}</el-col>
		    			<el-col :span="6" :offset="1">公司：{{guest.company}}</el-col>
		    			<el-col :span="6" :offset="1">职位：{{guest.job}}</el-col>
		    		</el-row>
		    		<el-row>
		    			<el-col :span="22">简介：{{guest.info}}</el-col>
		    		</el-row>
		    	</el-col>
		    	<el-col :span="3">
		    		<el-button type="primary" size="small" @click="editGuest(index)">编辑</el-button>
		    		<el-dialog size="guestDialog" v-model="editGuestShow">
		    			<el-form>
		    				<el-form-item>
		    					<el-col :span="6">
		    						<input type="file" @change="onFileChange" id="guestAvatar0" class="hide"/>
		    					<div >
						          <div class="guest-box">
						           <a href="javascript:void(0)" class="reselectguest" v-if="form.guestAvatar0 !== ''" @click="clearthumb('guestAvatar0')">×</a>
						            <img  style="width:125px;height:125px;background:#eee" :src="form.guestAvatar0"/>
						          </div>
						  				<div style="width:200px;">
							        <a href="javascript:void(0)"  @click="uploadthumb('guestAvatar0')">上传<span class="size">(140px*190px)</span>
							        </a>
										</div>
										<div>
											
										</div>
						        </div>
		    					</el-col>
		    					<el-col :span="16">
		    					<el-row>
		    						<el-col :span="6" class="guest-input"><el-input placeholder="请填写姓名" v-model="form.guestName0"></el-input></el-col>
		    						<el-col :span="6" style="margin:0px 20px;"><el-input placeholder="请填写职位" v-model="form.guestPosition0"></el-input ></el-col>
		    						<el-col :span="6" ><el-input placeholder="请填写单位简称" v-model="form.guestCompany0"></el-input ></el-col>
		    					</el-row>
									<el-row>
			    			<el-col :span="23" class="s-textarea" style="margin-top:20px;">
			    				<el-input type="textarea" :rows="8"  placeholder="请填写嘉宾简介" v-model="form.guestInfo0"></el-input>
			    			</el-col>
			    		</el-row>
		    					</el-col>
		    				</el-form-item>
		    			</el-form>
		    			<div  class="dialog-footer" style="margin-left:300px;margin-top:50px">
			    			<el-button @click="modifyGuestSure">确定</el-button>
			    			<el-button @click="editGuestShow=false">取消</el-button>
				      </div>
			    		<div>
			    		</div>
			    	</el-dialog>
		    		<el-button type="primary" size="small" @click="deleteGuest(index)">删除</el-button>
		    	</el-col>
	    	</el-col>
	    </el-form-item>
	    <el-form-item label="活动流程:" style="width:986px;">
	    	<el-row>
	    		<el-col :span="5">开始时间</el-col>
		    	<el-col :span="5">结束时间</el-col>
		    	<el-col :span="14">活动内容</el-col>
	    	</el-row>
	    	<el-row>
	    		<el-col :span="4">
	    			<el-time-picker v-model="form.processStarttime" format="HH:mm" placeholder="时:分"></el-time-picker>
	    		</el-col>
	    		<el-col :span="1" style="text-align:center;">=></el-col>
	    		<el-col :span="4">
	    			<el-time-picker v-model="form.processEndtime" format="HH:mm" :picker-options="{minTime:form.processStarttime}" placeholder="时:分"></el-time-picker>
	    		</el-col>
	    		<el-col :span="11" :offset="1">
	    			<el-input v-model="form.processContent"></el-input>
	    		</el-col>
	    		<el-col :span="2" :offset="1">
	    			<el-button type="primary" size="small" @click="addProcess()">+添加流程</el-button>
	    		</el-col>
	    	</el-row>
	    </el-form-item>
	    <el-form-item style="width:986px;" v-for="(item, index) in processLists" :key="item">
	    	<el-row style="border-bottom:1px dashed #ccc;">
	    		<el-col :span="1">{{index+1}}、</el-col>
	    		<el-col :span="3">{{item.start}} - {{item.end}}</el-col>
	    		<el-col :span="14" :offset="1">{{item.content}}</el-col>
	    		<el-col :span="2" :offset="1">
	    			<el-button size="small" @click="modifyProcess(index)">修改</el-button>
	    		</el-col>
	    		<el-col :span="2">
	    			<el-button size="small" @click="deleteProcess(index)">删除</el-button>
	    		</el-col>
	    	</el-row>
	    	<el-dialog size="small" v-model="processModifyDialog">
	    		<el-form>
	    			<el-form-item>
	    				<el-row>
	    					<el-col :span="7">开始时间</el-col>
	    					<el-col :span="6">结束时间</el-col>
	    					<el-col :span="10">活动内容</el-col>
	    				</el-row>
	    			</el-form-item>
	    			<el-form-item>
	    				<el-row>
	    					<el-col :span="6">
			    				<el-time-picker v-model="form.processStarttime0" format="HH:mm" placeholder="时:分"></el-time-picker>
			    			</el-col>
			    			<el-col :span="1">=></el-col>
			    			<el-col :span="6">
				    			<el-time-picker v-model="form.processEndtime0" format="HH:mm" :picker-options="{minTime:form.processStarttime0}" placeholder="时:分"></el-time-picker>
			    			</el-col>
			    			<el-col :span="10">
			    				<el-input v-model="form.processContent0"></el-input>
			    			</el-col>
			    		</el-row>
	    			</el-form-item>
	    		</el-form>
	    		<span slot="footer" class="dialog-footer">
	    			<el-button @click="processModifyDialog = false">取消</el-button>
		        <el-button type="primary" @click="modifyProcessSure">确 定</el-button>
		      </span>
	    	</el-dialog>
	    </el-form-item>
	    <el-form-item label="活动联系人" class="small-ipt" prop="contact" required>
	    	<el-input v-model="form.contact" placeholder="请填写此活动联系人姓名"></el-input>
	    </el-form-item>
	    <el-form-item label="联系方式" class="small-ipt" prop="phonenumber" required>
	    	<el-input v-model="form.phonenumber" placeholder="请填写此活动联系人电话"></el-input>
	    </el-form-item>
	    <p class="model">报名表单</p>
	    <div class="enrollform">
		    <el-form-item class="small-ipt sign-wrap" style="width:986px;">
		      <el-row class="sign-item" v-for="item in enrollform" key="1">
		        <el-col :span="4">
		          <el-checkbox v-model="item.require" disabled></el-checkbox>
		          <span>&nbsp;必填</span>
		          <span class="sign-name">{{item.label}}</span>
		        </el-col>
		        <el-col :span="11">
		          <el-input :placeholder="item.placeholder" disabled></el-input>
		        </el-col>
		      </el-row>
		    </el-form-item>
		  </div>
	    <p class="model">活动设置</p>
	    <el-form-item label="活动类型:" prop="cost" required>
				<el-radio-group v-model="form.cost">
					<el-radio label="0">免费活动</el-radio>
					<el-radio label="1">收费活动
						<span class="tip">（暂不支持线上收款，如是收费活动请在活动详情注明收费方式。）</span>
					</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="隐私设置:">
				<el-checkbox v-model="form.privacy">设为私密活动
					<span class="tip">（本活动为内部活动，将不会在【汇创业】网站公开展示。）</span>
				</el-checkbox>
			</el-form-item>
			<el-form-item label="是否审核:" required>
				<el-radio-group v-model="form.verify">
					<el-radio label="0" disabled>否</el-radio>
					<el-radio label="1" disabled>是
						<span class="tip">（报名人需要经过我审核）</span>
					</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click.prevent="onSubmit">马上发布</el-button>
				<el-button @click.prevent="onSubmit">保存草稿</el-button>
				<el-button @click.prevent="onSubmit">预览</el-button>
			</el-form-item>
    </el-form>
  </div>
</template>

<script>
import $ from 'jquery';
	import activityApi from '@/js/api.js';
	import areaList from '@/js/area.js';
	import functionApi from '@/js/function.js';
	import axios from 'axios';
	
  export default {
    name: 'activitypublish',
    data() {
    	var validateDate = (rule, value, callback) => {
    		var startOfActivity = functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(this.form.activityStartTimeDate) + ' ' 
    			+ functionApi.moment.getHM(this.form.activityStartTimeTime));
        var endOfActivity = functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(this.form.activityEndTimeDate) + ' ' + functionApi.moment.getHM(this.form.activityEndTimeTime));
        var startOfActivityUnix = functionApi.moment.getUnix(startOfActivity);
        var endOfActivityUnix = functionApi.moment.getUnix(endOfActivity);
        if(this.form.activityStartTimeDate != '' && this.form.activityStartTimeTime != '' && this.form.activityEndTimeDate != '' && this.form.activityEndTimeTime != '' && startOfActivityUnix >= endOfActivityUnix ){
        	callback(new Error('结束时间要晚于开始时间'));
        }else{
        	callback();
        }
    	};
    	var validateEnroll = (rule, value, callback) => {
    		var startOfActivity = functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(this.form.activityStartTimeDate) + ' ' 
    			+ functionApi.moment.getHM(this.form.activityStartTimeTime));
    		var enrollOfActivity = functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(this.form.enrollEndTimeDate) + ' ' 
    			+ functionApi.moment.getHM(this.form.enrollEndTimeTime));

    		var startOfActivityUnix = functionApi.moment.getUnix(startOfActivity);
    		var enrollOfActivityUnix = functionApi.moment.getUnix(enrollOfActivity);
    		if(this.form.activityStartTimeDate != '' && this.form.activityStartTimeTime != '' && this.form.enrollEndTimeDate != '' && this.form.enrollEndTimeTime != '' && startOfActivityUnix < enrollOfActivityUnix ){
        	callback(new Error('报名截止时间要早于活动开始时间'));
        }else{
        	callback();
        }
    	};
    	var validateNum = (rule, value, callback) => {
    		if(!value){
    			this.form.num = '';
    			callback();
    		}else{
    			if(!(/^[1-9]\d*$/.test(value))){
    				callback(new Error('请输入正整数'));
    			}else{
    				callback();
    			}
    		}
    	};
    	var validatePhone = (rule, value, callback) => {
        if(value === ''){
          callback(new Error('请输入手机号'));
        }else if(!value.match(/^13\d{9}$|^14\d{9}$|^15\d{9}$|^16\d{9}$|^17\d{9}$|^18\d{9}$/) && !value.match(/^\d{3}-\d{8}|\d{4}-\d{7}$/)){
          callback(new Error('请输入正确格式的电话或手机号'));
        }else{
        	callback();
        }
      };
			return {
				editGuestShow:false,
				enrollform: [
					{name:'name', label:'姓名', need:true, require:true, placeholder: '报名用户姓名或昵称'},
					{name:'phone', label:'电话', need:true, require:true, placeholder: '报名用户的手机号'},
					{name:'company', label:'公司', need:true, require:true, placeholder: '报名用户所在公司'}
				],
				form: {
					title: '',
					location: [],
					guestAvatar0:'',
					guestName0:'',
					guestPosition0:'',
					guestCompany0:'',
					guestInfo0:'',
					address: '',
					activityStartTimeDate: '',
					activityStartTimeTime: '',
					activityEndTimeDate: '',
					activityEndTimeTime: '',
					setEnrollEndTime: false,
					enrollEndTimeDate: '',
					enrollEndTimeTime: '',
					coverImg: '',
					num: '',
					subject: '',
        	pattern: '',
					sponsorTags: [],
					coSponsorTags: [],
					content: '',
					guestAvatar: '',
					guestName: '',
					guestCompany: '',
					guestPosition: '',
					guestInfo: '',
					processStarttime: '',
					processEndtime: '',
					processContent: '',
					processStarttime0: '',
					processEndtime0: '',
					processContent0: '',
					contact: '',
					phonenumber: '',
					cost: '0',
					privacy: false,
					verify: '0'
				},
				temp: {
					content: ''
				},
				rules: {
					title: [
            { required: true, message: '请输入活动标题', trigger: 'blur' }
          ],
      		location: [
            {type: 'array', required: true, message: '请选择省/市', trigger: 'change' }
          ],
					activityStartTimeDate: [
						{ type: 'date', required: true, message: '请选择活动开始日期', trigger: 'change' }
          ],
          activityStartTimeTime: [
						{ type: 'date', required: true, message: '请选择活动开始时刻', trigger: 'change' }
          ],
          activityEndTimeDate: [
						{ type: 'date', required: true, message: '请选择活动结束日期', trigger: 'change' }
          ],
          activityEndTimeTime: [
						{ type: 'date', required: true, message: '请选择活动结束时刻', trigger: 'change' },
						{ validator: validateDate, trigger: 'blur, change' }
          ],
          address: [
							{ required: true, message: '请填写详细地址', trigger: 'blur' }
          ],
          enrollEndTimeDate: [
						{ type: 'date', required: true, message: '请选择报名截止日期', trigger: 'change' }
          ],
          enrollEndTimeTime: [
						{ type: 'date', required: true, message: '请选择报名截止时刻', trigger: 'change' },
						{ validator: validateEnroll, trigger: 'blur, change' }
          ],
					coverImg: [
            { required: true, message: '请上传海报', trigger: 'change' }
          ],
          num: [
 						{ validator: validateNum, trigger: 'blur' }
          ],
          subject: [
						{  required: true, message: '请选择活动主题', trigger: 'change' }
          ],
          pattern: [
						{ required: true, message: '请选择活动形式', trigger: 'change' }
          ],
          sponsorTags: [
						{ type: 'array', required: true, message: '请添加主办单位', trigger: 'blur' }
          ],
          content: [
          	{ required: true, message: '活动详情不能为空！', trigger: 'blur'}
          ],
          contact: [
						{ required: true, message: '活动联系人不能为空！', trigger: 'blur'}
          ],
          phonenumber: [
						{ validator: validatePhone, trigger: 'blur' }
          ],
          cost: [
						{ required: true, message: '请选择活动类型！', trigger: 'change'}
          ]
				},
				area: [],
				activityArea: [],
				uploadUrl: '',
				imageDialogVisible: false,
				activitySubject: ['创业', '金融', '互联网', '科技', '教育', '运动', '交友', '公益', '营销', '职场', '艺术', '旅行', '音乐', '电影', '读书', '时尚', '健康'],
				activityPattern: ['会议', '课程', '论坛', '讲座', '沙龙', '派对', '聚会', '展览', '分享会', '发布会'],
        sponsorInput: false,
        sponsorInputValue: '',
        coSponsorInput: false,
        coSponsorInputValue: '',
        guestLists: [],
        processLists: [],
        processModifyDialog: false,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
			}
		},
		methods: {
			editGuest(index){
	    	//let vm = this;
	    	let vm = this;
	    	localStorage.setItem('guestIndex', index);
	    	vm.form.guestAvatar0 = vm.guestLists[index].pic;
	    	vm.form.guestName0 = vm.guestLists[index].name;
	    	vm.form.guestCompany0 = vm.guestLists[index].company;
	    	vm.form.guestPosition0 = vm.guestLists[index].job;
	    	vm.form.guestInfo0 = vm.guestLists[index].info;
	    	this.editGuestShow = true;
	    },
			 modifyGuestSure(){
	    	let vm = this;
	    	const index = localStorage.getItem('guestIndex');
	    	if(vm.form.guestName0 !== '' && vm.form.guestInfo0 !== ''){
	    		vm.guestLists[index].pic = vm.form.guestAvatar0 == ''? 'http://121.196.233.212:3001/images/guest-null.png':vm.form.guestAvatar0;;
	    		vm.guestLists[index].name = vm.form.guestName0;
	    		vm.guestLists[index].company = vm.form.guestCompany0;
	    		vm.guestLists[index].job = vm.form.guestPosition0;
	    		vm.guestLists[index].info = vm.form.guestInfo0;
	    		this.editGuestShow = false;
	      }else{
	      	this.$message.error('姓名、简介为必填项');
	      	return false;
	      }
	    },
			getArea() {
	    	this.area = areaList().area;
	    	for(let i = 0; i < this.area.length; i++){
	    		this.area[i].value = this.area[i].label;
	    		for(let j = 0;j < this.area[i].children.length; j++){
	    			this.area[i].children[j].value = this.area[i].children[j].label;
	    			this.area[i].children[j].children = '';
	    		}
	    	}
	    },
			setContent(html, text) {
        this.form.content = html;
        this.temp.content = text;
      },
			onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        var fileObj = files[0];
        var vm = this;
        var name = e.target.getAttribute('id');
        var form = new FormData();
        form.append("upfile", fileObj);
        var xhr = new XMLHttpRequest();
        xhr.open('post', vm.uploadUrl + '?action=uploadthumb', true);
        xhr.onload = function () {
          var res = JSON.parse(xhr.response);
          vm.form[name] = res.url;
        };
        var reader = new FileReader();
        if (!files.length){
          return;
        }
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
          xhr.send(form);
        };
      },
      uploadthumb(imgId){
        var fileInput = document.getElementById(imgId);
        fileInput.click();
        fileInput.value = ''
        //document.getElementById('coverImg').form.reset();
      },
      clearthumb(imgSrc){
        var vm = this;
        vm.form[imgSrc] = '';
        //document.getElementById('coverImg').value='';
      },
      choosePoster(index){
				for(let i = 0; i < 16; i++){
					document.getElementById('poster' + i).removeAttribute('class');
				}
				document.getElementById('poster' + index).setAttribute('class', 'select');
				localStorage.setItem('posterIndex', index);
			},
			surePoster(){
				this.imageDialogVisible = false;
				let index = localStorage.getItem('posterIndex');
				this.form.coverImg = 'http://121.196.233.212:3001/images/activityCover/'+ index +'.png';
			},
			handleClose(tag, tags) {
        this.form[tags].splice(this.form[tags].indexOf(tag), 1);
      },
      showInput(input) {
        this[input] = true;
        this.$nextTick(_ => {
          this.$refs[input].$refs.input.focus();
        });
      },
      handleSponsorInput() {
        let sponsorInputValue = this.sponsorInputValue;
        if (sponsorInputValue) {
          this.form.sponsorTags.push(sponsorInputValue);
        }
        this.sponsorInput = false;
        this.sponsorInputValue = '';
      },
      handleCoSponsorInput() {
        let coSponsorInputValue = this.coSponsorInputValue;
        if (coSponsorInputValue) {
          this.form.coSponsorTags.push(coSponsorInputValue);
        }
        this.coSponsorInput = false;
        this.coSponsorInputValue = '';
      },
      addGuest(){
      	var vm = this;
	      if(vm.form.guestName !== '' && vm.form.guestInfo !== ''){
	        var list = {
	          pic: vm.form.guestAvatar,
	          name: vm.form.guestName,
	          company: vm.form.guestCompany,
	          job: vm.form.guestPosition,
	          info: vm.form.guestInfo
	        };
	        if(vm.form.guestAvatar==''){
	        	list.pic = 'http://121.196.233.212:3001/images/guest-null.png';
	        }
	        if (vm.form.guestName.replace(/\s/g, "").length ==0 || vm.form.guestInfo.replace(/\s/g, "").length ==0){ 
      		this.$message.error('姓名、简介为必填项');
					return;
				}
	        vm.guestLists.push(list);
	        vm.form.guestAvatar = '';
	        vm.form.guestName = '';
	        vm.form.guestCompany = '';
	        vm.form.guestPosition = '';
	        vm.form.guestInfo = '';
	      }else{
	      	this.$message.error('姓名，简介为必填项');
	      	return false;
	      }
	    },
	    deleteGuest(index){
	      let vm = this;
	      vm.guestLists.splice(index, 1);
	    },
	    addProcess(){
				let vm = this;
				let starttime = functionApi.moment.getUnix(vm.form.processStarttime);
				let endtime = functionApi.moment.getUnix(vm.form.processEndtime);
	      if(vm.form.processStarttime!=='' && vm.form.processEndtime!=='' && vm.form.processContent!=='' && starttime < endtime){
	        var list = {
	          start: functionApi.moment.getHM(vm.form.processStarttime),
	          end: functionApi.moment.getHM(vm.form.processEndtime),
	          content: vm.form.processContent
	        };
	        vm.processLists.push(list);
	        vm.form.processStarttime = '';
	        vm.form.processEndtime = '';
	        vm.form.processContent = '';
	      }else if(vm.form.processStarttime!=='' && vm.form.processEndtime!=='' && vm.form.processContent!=='' && starttime >= endtime){
	      	this.$message.error('结束时间要晚于开始时间');
	      	return false;
	      }else{
	      	this.$message.error('请填写完整的活动流程');
	      	return false;
	      }
	    },
	    modifyProcess(index){
	    	let vm = this;
	    	localStorage.setItem('processIndex', index);
	    	vm.form.processStarttime0 = functionApi.moment.toGMTFormate('2017-05-02 ' + vm.processLists[index].start);
	    	vm.form.processEndtime0 = functionApi.moment.toGMTFormate('2017-05-02 ' + vm.processLists[index].end);
	    	vm.form.processContent0 = vm.processLists[index].content;
	    	this.processModifyDialog = true;
	    },
	    modifyProcessSure(){
	    	let vm = this;
	    	const index = localStorage.getItem('processIndex');
	    	let starttime = functionApi.moment.getUnix(vm.form.processStarttime0);
				let endtime = functionApi.moment.getUnix(vm.form.processEndtime0);
	    	if(vm.form.processStarttime0!=='' && vm.form.processEndtime0!=='' && vm.form.processContent0!=='' && starttime<endtime){
	    		vm.processLists[index].start = functionApi.moment.getHM(vm.form.processStarttime0);
			    vm.processLists[index].end = functionApi.moment.getHM(vm.form.processEndtime0);
			    vm.processLists[index].content = vm.form.processContent0;
			    this.processModifyDialog = false;
	    	}else if(vm.form.processStarttime0!=='' && vm.form.processEndtime0!=='' && vm.form.processContent0!=='' && starttime>=endtime){
					this.$message.error('结束时间要晚于开始时间');
	      	return false;
	    	}else{
	    		this.$message.error('请填写完整的活动流程');
	      	return false;
	    	}
	    },
	    deleteProcess(index){
	      var vm = this;
	      vm.processLists.splice(index, 1);
	    },
      onSubmit(e) {
      	let vm = this;
      	let option = e.target.innerText;
        let postdata = {
          title: vm.form.title,
          location: {province:vm.form.location[0], city:vm.form.location[1], area:vm.form.address},
        	startOfActivity: functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(vm.form.activityStartTimeDate) + ' ' +
        	functionApi.moment.getHM(vm.form.activityStartTimeTime)),
        	endOfActivity: functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(vm.form.activityEndTimeDate) + ' ' +
        	functionApi.moment.getHM(vm.form.activityEndTimeTime)),
        	endOfEnrollment: vm.form.setEnrollEndTime ? functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(vm.form.enrollEndTimeDate) + ' ' + 
        		functionApi.moment.getHM(vm.form.enrollEndTimeTime)) : functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(vm.form.activityStartTimeDate) + ' ' +
        		functionApi.moment.getHM(vm.form.activityStartTimeTime)),
        	cover: vm.form.coverImg,
        	numberOfExpected: vm.form.num == '' ? -1 : vm.form.num,
        	subject: vm.form.subject,
        	pattern: vm.form.pattern,
        	sponsor: vm.form.sponsorTags,
        	coSponsor: vm.form.coSponsorTags,
        	guests: vm.guestLists,
        	process: vm.processLists,
        	contact: vm.form.contact,
        	phonenumber: vm.form.phonenumber,
        	cost: vm.form.cost,
        	privacy: vm.form.privacy == true ? '1' : '0',
        	isEnrollNeedCheck: vm.form.verify,
        	brief: vm.temp.content.substring(0, 53)
        };

	      let activityForm = {};
      	for(let i = 0; i < vm.enrollform.length; i++){
      		let name = vm.enrollform[i].name
      		activityForm[name] = {
      			need: vm.enrollform[i].need == true ? '1' : '0',
      			require: vm.enrollform[i].require == true ? '1' : '0',
      			placeholder: vm.enrollform[i].placeholder
      		}
      	}
      	postdata.activityForm = activityForm;

        const header = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="edge"/><meta name="renderer" content="webkit"><meta http-equiv="Content-Script-Type" content="text/javascript"/><meta name="format-detection" content="telephone=no"/><meta name="viewport" content="width=device-width,user-scalable=no"><title>Document</title></head><body style="margin:0;"><article>';
        const footer = '</article></body></html>';
        let editorcontent = header + $('#activityContent')[0].innerHTML + footer;
        let blob = new Blob([editorcontent], {'type': 'text/html'});
        let formData = new FormData();
        formData.append('upfile', blob, 'uploadfile.html');
        
        if(option == '马上发布'){
        	this.$refs['form'].validate((valid) => {
        		if(valid){
        			if (!this.temp.content) {
	              if ((this.form.content.indexOf('<iframe') == -1 || this.form.content.indexOf('</iframe>') == -1) && (this.form.content.indexOf('<img') == -1)) {
	                this.$message.error('活动详情不能为空！');
	                return;
	              }
	              
	            }
	            axios.post(this.uploadUrl + '?action=uploadHTML', formData).then(res => {
	              postdata.content = res.url;
	              activityApi.activity.postCreate(postdata).then(res => {
	              	this.$message.success('成功发布了一个活动!');
			            setTimeout(() => {
			              window.location.pathname='/nav1/activity/activitylist/all'
			            }, 1000)
				        })
	            })
        		}else{
			        this.$message.error('请填写必需的表单信息!');
	            return false;
	          }
        	})
        }else if(option == '保存草稿'){
        	delete this.rules.address;
        	delete this.rules.enrollEndTimeDate;
        	delete this.rules.enrollEndTimeTime;
        	delete this.rules.coverImg;
        	delete this.rules.num;
        	delete this.rules.subject;
        	delete this.rules.pattern;
        	delete this.rules.sponsorTags;
        	delete this.rules.content;
        	delete this.rules.contact;
        	delete this.rules.phonenumber;
        	delete this.rules.cost;
	        this.$refs['form'].validate((valid) => {
	        	if(valid){
		        	axios.post(this.uploadUrl + '?action=uploadHTML', formData).then(res => {
		            postdata.content = res.data.url;
		            activityApi.activity.postCreateDraft(postdata).then(res => {
		            	this.$message.success('保存草稿成功!');
			            setTimeout(() => {
			              window.location.pathname = '/nav1/activity/activitylist/draft'
			            }, 1000)
		            })
		          })
		        }else{
							this.$message.error('请填写必需的表单信息!');
		          return false;
		        }
	        })
        }else{
        	delete this.rules.address;
        	delete this.rules.enrollEndTimeDate;
        	delete this.rules.enrollEndTimeTime;
        	delete this.rules.coverImg;
        	delete this.rules.num;
        	delete this.rules.subject;
        	delete this.rules.pattern;
        	delete this.rules.sponsorTags;
        	delete this.rules.content;
        	delete this.rules.contact;
        	delete this.rules.phonenumber;
        	delete this.rules.cost;
	        this.$refs['form'].validate((valid) => {
	        	if(valid){
		        	axios.post(this.uploadUrl + '?action=uploadHTML', formData).then(res => {
		            postdata.content = res.data.url;
		           //postdata.content = $('#activityContent').html();
		            localStorage.setItem('previewData',JSON.stringify(postdata));
		            this.$router.push({ path: '/nav1/activity/activitylist/preview' });
		            /*activityApi.activity.postCreateDraft(postdata).then(res => {
		            	localStorage.setItem('activityId', this.activityData.id);
		            	
		            })*/
		          })
		        }else{
							this.$message.error('请填写必需的表单信息!');
		          return false;
		        }
	        })
        }
			}
		},
		mounted() {
			this.getArea();
			activityApi.pub.getUploadUniqueKey().then(res => {
				let self = this;
      	self.uploadUrl = res.data.queryURL;
      	let editor = new wangEditor('activityContent');
      	editor.config.uploadImgFileName = 'upfile';
				editor.config.uploadImgUrl = self.uploadUrl + '?action=uploadImg';
				editor.onchange = function () {
          let text = editor.$txt.text().replace(/(^\s*)|(\s*$)/g, ""),
          		html = editor.$txt.html();
          self.setContent(html, text);
        };
				editor.create();
				let previewdata= JSON.parse(localStorage.getItem('previewData'));
				if(previewdata){
					this.activityData = previewdata;
					//console.log(this.activityData.content);
					//this.nextTick()
					//$('#activitycontent').html(this.activityData.content)
				}else{
					if(localStorage.getItem('previewId')){
							activityApi.activity.postDetail(previewId).then(res => {
				this.activityData = this.activityData;
				this.state = this.activityData.state;
				
		  });
					}else{
						return false
					}
				
				}    
				let vm = this;
			
			
			this.form.title = this.activityData.title;
			this.form.location = [this.activityData.location.province, this.activityData.location.city];
			this.form.address = this.activityData.location.area;
			this.form.activityStartTimeDate = functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(this.activityData.startOfActivity));
			this.form.activityStartTimeTime = functionApi.moment.toGMTFormate('2017-09-05'+' '+functionApi.moment.getHM(this.activityData.startOfActivity));
			this.form.activityEndTimeDate = functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(this.activityData.endOfActivity));
			this.form.activityEndTimeTime = functionApi.moment.toGMTFormate('2017-09-05'+' '+functionApi.moment.getHM(this.activityData.endOfActivity));
			if(this.activityData.endOfEnrollment){
				this.form.setEnrollEndTime = true;
			}
			this.form.enrollEndTimeDate = functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(this.activityData.endOfEnrollment));
					this.form.enrollEndTimeTime = functionApi.moment.toGMTFormate('2017-09-05'+' '+functionApi.moment.getHM(this.activityData.endOfEnrollment));
			this.form.coverImg = this.activityData.cover;
			if(this.activityData.numberOfExpected == -1){
						this.form.num = ''
			}else{
				this.form.num = this.activityData.numberOfExpected;
			}
			this.form.subject = this.activityData.subject;
			this.form.pattern = this.activityData.pattern;
			this.form.sponsorTags = this.activityData.sponsor;
			this.form.coSponsorTags = this.activityData.coSponsor;

			$('#activityContent').load(this.activityData.content + " article", function(){
						let initHtml = $('article').html();
						let	initText = $('article').text();
						vm.setContent(initHtml, initText);
					});
			setTimeout(
				() => {
					this.guestLists = this.activityData.guests ? this.activityData.guests : [];

					if(this.activityData.process){
						this.processLists = this.activityData.process;
					}else{
								this.processLists = [];
					}
				},1000)

			

			this.form.contact = this.activityData.contact;
			this.form.phonenumber = this.activityData.phonenumber;

			if(this.activityData.activityForm){
						this.enrollform = [
							{
								name: 'name',
								label: '姓名',
								need: this.activityData.activityForm.name.need == '1' ? true : false,
								require: this.activityData.activityForm.name.require == '1' ? true : false,
								placeholder: this.activityData.activityForm.name.placeholder
							},
							{
								name:'phone',
								label:'电话',
								need: this.activityData.activityForm.phone.need == '1' ? true : false,
								require: this.activityData.activityForm.phone.require == '1' ? true : false,
								placeholder: this.activityData.activityForm.phone.placeholder
							},
							{
								name:'company',
								label:'公司',
								need: this.activityData.activityForm.company.need == '1' ? true : false,
								require: this.activityData.activityForm.company.require == '1' ? true : false,
								placeholder: this.activityData.activityForm.company.placeholder
							}
						]
					}
			this.form.cost = this.activityData.cost;
			if(this.activityData.privacy == 1){
				this.form.privacy = true;
			}else{
						this.form.privacy = false;
			}
			this.form.verify = this.activityData.isEnrollNeedCheck;
      });
		}
  }
</script>

<style lang="scss" scoped>
	.publishForm{ margin:20px; width:62%; min-width:760px; 
		.model{ font-weight:bold; color:#20a0ff; border-left:3px solid #20a0ff; padding:1px 12px; }
		.p-r{padding-right:10px;}
		.poster{text-decoration:none; color:#666;
			&:hover{color:#20a0ff;}
		}
		.small-ipt{ width:308px; }
		.el-date-editor.el-input{ width:145px; }
		.el-tag{ display:inline-block; background-color:rgba(32,159,255,.1); border-color:rgba(32,159,255,.2); font-size:14px; color:#20a0ff; height:34px; line-height:34px; margin:0 10px 6px 0; padding:0 10px; }
		.tip{ font-size:12px; color:#999; margin-left:10px;}
		.thumbset{ overflow:hidden;
      .thumbImg{ width:276px; max-height:386px; line-height:386px; text-align:center; position:absolute; z-index:99;
        .reselect{ display:none; position:absolute; top:-9px; right:-9px; font-size:14px; font-weight:bold; width:18px; height:18px; line-height:18px; text-align:center; border-radius:9px; background-color:#f74c4c; color:#fff; text-decoration:none; }
        img{ width:276px; height:386px; }
        &:hover{
          .reselect{ display:block; }
        }
      }
      .thumb-uploader-icon{font-size:100px; color:#8c939d; opacity:0.5; width:276px; height:386px; line-height:386px; text-align:center; cursor:pointer;}
    }
    .h-31{line-height:31px;}
    .guestsuploadimg{ position:relative; width:125px; height:125px; line-height:125px; text-align:center; background-color:#f9f9fa;
			.img{ position:absolute; top:0; left:0; z-index:2; width:125px; height:125px;
        img{ width:125px; height:125px; }
      }
      .addimg{ display:block; position:absolute; top:0; z-index:1; width:125px; height:125px; box-sizing:border-box; background-color:#f9f9fa; background:url('../../../images/guestUpload.png') no-repeat; background-size:cover; text-align:center; }
    }
    .enrollform{
	    .sign-point{ margin:0; line-height:20px; 
	      span{ font-size:12px; color:#999; margin-left:15px; }
	    }
	    .sign-name{ margin-left:20px; margin-right:20px; }
	    .sign-item{ margin-bottom:15px; }
	    .sign-item1{ margin-top:15px; }
	    .sign-wrap{ position:relative; }
	    .add-sel{ position:absolute; top:0; right:0; width:240px; display:flex; flex-wrap:wrap; border-left:1px solid #ccc;
	      .title{ width:240px; margin:0 0 5px 10px; }
	      .sign-btn{ width:40%; margin-bottom:15px; margin-left:10px; }
	    }
	    .ipt-name{ padding:0 10px; }
	    .ipt-del{ padding-left:10px; }
	    .small-ipt{ width:208px; }
	    .el-tag{ display:inline-block; background-color:rgba(32,159,255,.1); border-color:rgba(32,159,255,.2); font-size:14px; color:#20a0ff; height:34px; line-height:34px; margin:0 10px 6px 0; padding:0 10px; }
	    .el-input{ margin-bottom:15px; }
	    .form-title{ font-weight:bold; padding-bottom:1px; }
	    .input-title{ padding-bottom:5px; 
	      span{ font-size:12px; color:#999; }
	    }
	  }
	  .guest-box{position:relative;
			.reselectguest{position:absolute;text-decoration:none;color:#fff;right:50px;display:block;width:15px;height:15px;background:red;line-height:15px;border-radius:50%;text-align:center;top:-4px;display:none;
			}
			&:hover .reselectguest{display:block}
    }
	  .posterContent{ margin-top:-10px; margin-bottom:-20px;
	  	ul{ margin:0; padding:0; overflow:hidden;
	  		li{ list-style:none; float:left; margin-right:10px; margin-bottom:10px;
	  			a{ display:block; width:69px; height:96px; -moz-box-sizing:border-box; -webkit-box-sizing:border-box; box-sizing:border-box;
	  				img{ width:100%; height:100%; }
	  				&.select{ border:5px solid #ff4949; }
	  			}
					&:nth-child(8){margin-right:0;}
		  	}
	  	}
	  }
	}
	.guest-form{min-width:800px;min-height:600px;
		.reselectguest{position:absolute;}
		.thumbset{overflow:hidden;width:125px!important;height:125px!important;}
		.upload{height:50px!important;}
		.thumb-uploader-icon{width:20px!important;height:100px!important;background:#ccc}
		.thumbImg{width:125px!important;height:125px!important;
			img{width:125px!important;height:125px!important;background:red}
		}
	}
</style>