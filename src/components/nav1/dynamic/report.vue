<template>
  <div class="dynamic-list">
    <el-tabs v-model="activeState" type="border-card" class="tab" @tab-click="handleClick">
      <el-tab-pane label="动态举报" name="reportlist-dynamic">
         <report-dynamic></report-dynamic>
      </el-tab-pane>
      <el-tab-pane label="回复举报" name="reportlist-reply">
        <report-reply></report-reply>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
	import reportDynamic  from './report-dynamic';
  import reportReply from './report-reply';
	export default {
		data() {
			return{
				activeState: 'reportlist-dynamic'
			}
		},
		components: {
			'report-dynamic': reportDynamic,
      'report-reply': reportReply,
		},
		methods: {
			handleClick(tab, event) {
        this.$router.push({ path: '/nav1/dynamic/reportlist/' + this.activeState});
      },
			routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/dynamic/reportlist/reportlist-dynamic'){
          this.activeState = 'reportlist-dynamic';
        }else if(currentPath == '/nav1/dynamic/reportlist/reportlist-reply'){
          this.activeState = 'reportlist-reply';
        }
      }
		},
		mounted() {
			this.routeChange();
		}
	}
</script>