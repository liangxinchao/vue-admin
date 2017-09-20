<template>
  <div>
    <el-tabs v-model="activeState" type="border-card" class="tab" >
      <el-tab-pane label="选择文章" name="selarticle">
         <sel-article></sel-article>
      </el-tab-pane>
      <el-tab-pane label="选择活动" name="selactivity">
        <sel-activity></sel-activity>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
	import SelArticle  from './push-select-article';
  import SelActivity from './push-select-activity';
	export default {
		data() {
			return{
				activeState: 'selarticle'
			}
		},
		components: {
			'sel-article': SelArticle,
      'sel-activity': SelActivity,
		},
		methods: {
			handleClick(tab, event) {
        this.$router.push({ path: '/nav1/activity/reportmanage/' + this.activeState});
      },
			/*routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/activity/reportmanage/nohandle'){
          this.activeState = 'nohandle';
        }else if(currentPath == '/nav1/activity/reportmanage/handle'){
          this.activeState = 'handle';
        }
      }*/
		},
		mounted() {
			//this.routeChange();
		}
	}
</script>