<template>
  <div>
    <el-tabs v-model="activeState" type="border-card" class="tab" @tab-click="handleClick">
      <el-tab-pane label="未处理" name="nohandle">
        <activity-nohandle></activity-nohandle>
      </el-tab-pane>
      <el-tab-pane label="已处理" name="handle">
        <activity-handle></activity-handle>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
	import ActivityHandle  from './activityreport-handle';
  import ActivityNohandle from './activityreport-nohandle';
	export default {
		data() {
			return{
				activeState: 'nohandle'
			}
		},
		components: {
			'activity-nohandle': ActivityNohandle,
      'activity-handle': ActivityHandle,
		},
		methods: {
			handleClick(tab, event) {
        this.$router.push({ path: '/nav1/activity/reportmanage/' + this.activeState});
      },
			routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/activity/reportmanage/nohandle'){
          this.activeState = 'nohandle';
        }else if(currentPath == '/nav1/activity/reportmanage/handle'){
          this.activeState = 'handle';
        }
      }
		},
		mounted() {
			this.routeChange();
		}
	}
</script>