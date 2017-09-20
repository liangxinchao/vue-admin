import axios from 'axios';

const globalPath ='http://114.55.251.155:3099';

const token = localStorage.getItem('dreamuser') ? JSON.parse(localStorage.getItem('dreamuser')).token : '';

let Api = {
	pub:{
		getUploadUniqueKey: () => {
			return axios.post(`${globalPath}/news/getUploadUniqueKey?access_token=` + token);
		},
		getAllPark: () => {
			return axios.post(`${globalPath}/Activity/getAllPark`);
		}
	},
	user: {  
		login: (params) => {
			return axios.post(`${globalPath}/Account/managementLogin`, params).then(res => res.data);
		}
	},
	news: {
		formOptions: () => {
			return axios.get(`${globalPath}/News/formOptions?access_token=` + token);
		},
		postCreate: (params) => {
			return axios.post(`${globalPath}/News?access_token=` + token, params);
		},
		patchModify: (newsId, params) => {
			return axios.patch(`${globalPath}/News/` + newsId + `?access_token=` + token, params);
		},
		postListRemove: (params) => {
			return axios.post(`${globalPath}/News/find_index_remove?access_token=` + token, params);
		},
		postList: (params) => {
			return axios.post(`${globalPath}/News/find_list_admin?access_token=` + token, params);
		},
		postAccountList: (params) => {
			return axios.post(`${globalPath}/Account/find_list?access_token=` + token, params);
		},
		postPageAccountList: (params) => {
			return axios.post(`${globalPath}/Account/find_list_next?access_token=` + token, params);
		},
		deleteNews: (params) => {
			return axios.post(`${globalPath}/News/delete?access_token=` + token, params);
		},
		cancelNews: (params) => {
			return axios.post(`${globalPath}/News/cancel?access_token=` + token, params);
		},
		postNewsMediaList: (params) => {
			return axios.post(`${globalPath}/NewsMedia/find_list?access_token=` + token, params);
		},
		postNewsMediaAvatar: (params) => {
			return axios.post(`${globalPath}/NewsMedia?access_token=` + token, params);
		},
		postPageNewsMediaList: (params) => {
			return axios.post(`${globalPath}/NewsMedia/find_list_next?access_token=` + token, params);
		},
		MediaDelete: (params) => {
			return axios.post(`${globalPath}/NewsMedia/delete?access_token=` + token, params);
		},
	  NewsMediaDetail: (id) => {
			return axios.get(`${globalPath}/NewsMedia/`+ id +'?access_token=' + token);
		},
		MediaDetailKeep: (id, params) => {
			return axios.patch(`${globalPath}/NewsMedia/`+ id +'?access_token=' + token,params);
		},
		postPage: (params) => {
			return axios.post(`${globalPath}/News/find_list_next`, params);
		},
		postEdit: (id) => {
			return axios.get(`${globalPath}/News/` + id + '?access_token=' + token);
		},
		reportList: (params) => {
			return axios.post(`${globalPath}/Report/find_list?access_token=` + token, params);
		},
		reportPageList: (params) => {
			return axios.post(`${globalPath}/Report/find_list_next?access_token=` + token, params);
		},
		reportDetail: (params) => {
			return axios.post(`${globalPath}/Report/show?access_token=` + token, params);
		},
		reportCheck: (params) => {
			return axios.post(`${globalPath}/Report/check?access_token=` + token, params);
		}
	},
	activity: {
		postCreate: (params) => {
			return axios.post(`${globalPath}/Activity/createActivity?access_token=` + token, params);
		},
		postCreateDraft: (params) => {
			return axios.post(`${globalPath}/Activity/createActivityDraft?access_token=` + token, params);
		},
		postList: (params) => {  
			return axios.post(`${globalPath}/Activity/list`, params);
		},
		postDetail: (id) => {
			return axios.post(`${globalPath}/Activity/find_detail?access_token=` + token, {"id": id});
		},
		postDetailInfo: (params) => {
			return axios.post(`${globalPath}/Activity/saveActivityInfo?access_token=` + token, params);
		},
		postDetailUpdate: (params) => {
			return axios.post(`${globalPath}/Activity/updateActivity?access_token=` + token, params);
		},
		postDetailUpdateAndPublish: (params) => {
			return axios.post(`${globalPath}/Activity/updateActivityAndPublish?access_token=` + token, params);
		},
		postOff: (params) => {
			return axios.post(`${globalPath}/Activity/offActivity?access_token=` + token, params);
		},
		postOn: (params) => {
			return axios.post(`${globalPath}/Activity/onActivity?access_token=` + token, params);
		},
		postPass: (params) => {
			return axios.post(`${globalPath}/Activity/pass?access_token=` + token, params);
		},
		postDel: (params) => {
			return axios.post(`${globalPath}/Activity/delActivity?access_token=` + token, params);
		},
		postEnrollList: (params) => {
			return axios.post(`${globalPath}/Activity/getEnrollList`, params);
		},
		postEnrollListBrief: (params) => {
			return axios.post(`${globalPath}/Activity/getEnrollListBrief`, params);
		},
		postDelEnroll: (params) => {
			return axios.post(`${globalPath}/Activity/delActivityEnrollment?access_token=` + token, params);
		},
		postActivityReviewInfo: (params) => {
			return axios.post(`${globalPath}/Activity/getActivityReviewInfo?access_token=` + token, params);
		},
		postReportList: (params) => {
			return axios.post(`${globalPath}/ActivityReport/list`, params);
		},
		postReportReview: (params) => {
			return axios.post(`${globalPath}/ActivityReport/review?access_token=` + token, params);
		},
		postReportDetail: (params) => {
			return axios.post(`${globalPath}/ActivityReport/getReport?access_token=` + token, params);
		},
		postOnline: (params) => {
			return axios.post(`${globalPath}/Activity/onActivity?access_token=` + token, params);
		}
	},
	info:{
		pushSmsCreate: (params) => {
			return axios.post(`${globalPath}/SMS/createAndPublish?access_token=` + token, params);
		},
		pushSmsList: (params) => {
			return axios.post(`${globalPath}/SMS/list?access_token=` + token, params);
		},
		pushSmsDetail: (params) => {
			return axios.post(`${globalPath}/SMS/getSMS?access_token=` + token, params);
		},
		pushSmsWithdraw: (params) => {
			return axios.post(`${globalPath}/SMS/withdraw?access_token=` + token, params);
		},
		pushSmsReSend: (params) => {
			return axios.post(`${globalPath}/SMS/reSend?access_token=` + token, params);
		},
		pushRadioCreate: (params) => {
			return axios.post(`${globalPath}/Redio/createAndPublish?access_token=` + token, params);
		},
		pushRadioList: (params) => {
			return axios.post(`${globalPath}/Redio/list?access_token=` + token, params);
		},
		pushRadioDetail: (params) => {
			return axios.post(`${globalPath}/Redio/getRedio?access_token=` + token, params);
		},
		pushRadioWithdraw: (params) => {
			return axios.post(`${globalPath}/Redio/withdraw?access_token=` + token, params);
		},
		pushRadioReSend: (params) => {
			return axios.post(`${globalPath}/Redio/reSend?access_token=` + token, params);
		},
		pushMsgCreate: (params) => {
			return axios.post(`${globalPath}/MSG/createAndPublish?access_token=` + token, params);
		},
		pushMsgList: (params) => {
			return axios.post(`${globalPath}/MSG/list?access_token=` + token, params);
		},
		pushMsgDetail: (params) => {
			return axios.post(`${globalPath}/MSG/getMSG?access_token=` + token, params);
		},
		pushMsgWithdraw: (params) => {
			return axios.post(`${globalPath}/MSG/withdraw?access_token=` + token, params);
		},
		pushMsgReSend: (params) => {
			return axios.post(`${globalPath}/MSG/reSend?access_token=` + token, params);
		}
	}
}

export default Api
