<template>
  <div>
    <el-tabs v-model="activeState" type="border-card" class="tab" @tab-click="handleClick">
      <el-tab-pane label="未审核" name="nocheck">
         <activity-nocheck></activity-nocheck>
      </el-tab-pane>
      <el-tab-pane label="已审核" name="check">
        <activity-check></activity-check>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
	import ActivityCheck  from './activity-check';
  import ActivityNocheck from './activity-nocheck';

	export default {
		data() {
			return{
				activeState: 'nocheck'
			}
		},
		components: {
			'activity-nocheck': ActivityNocheck,
      'activity-check': ActivityCheck,
		},
		methods: {
			handleClick(tab, event) {
        this.$router.push({ path: '/nav1/activity/activityaudit/' + this.activeState});
      },
			routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/activity/activityaudit/nocheck'){
          this.activeState = 'nocheck';
        }else if(currentPath == '/nav1/activity/activityaudit/check'){
          this.activeState = 'check';
        }
      }
		},
		mounted() {
			this.routeChange();
		}
	}
</script>