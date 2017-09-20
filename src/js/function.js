import moment from 'moment';

let functionUtil = {
	moment: {
		getUnix: (date) => {
			return moment(date).format('X');
		},
		getListTime: (date) => {
			return moment(date).format('YYYY-MM-DD HH:mm');
		},
		getDateFormate: (date) => {
			return moment(date).format('YYYY-MM-DD');
		},
		getListTime2: (date) => {
			return moment(date).format('YYYY/MM/DD HH:mm');
		},
		toGMTFormate: (format) => {
			return moment(format).toDate();
		},
		getYear: (date) => {
			return moment(date).format('YYYY');
		},
		getMonth: (date) => {
			return moment(date).format('MM');
		},
		getDay: (date) => {
			return moment(date).format('DD');
		},
		getMonthDay: (date) => {
			return moment(date).format('MM-DD');
		},
		getHM: (date) => {
			return moment(date).format('HH:mm');
		},
		getYMDHM: (date) => {
			return moment(date).format('YYYY年MM月DD日 HH:mm');
		},
		getYM: (date) => {
			return moment(date).format('YYYY年MM月DD日');
		},
		getYMDHM2: (date) => {
			return moment(date).format('YYYY/MM/DD HH:mm');
		},
		getMDHM: (date) => {
			return moment(date).format('MM月DD日 HH:mm');
		}
	}
}

export default  functionUtil