<template>
  <div class="dynamic-list">
    <el-tabs v-model="activeState" type="border-card" class="tab" @tab-click="handleClick">
      <el-tab-pane label="回复管理" name="replylist-self">
         <reply-list></reply-list>
      </el-tab-pane>
      <el-tab-pane label="已下架" name="replylist-unline">
        <reply-unline></reply-unline>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
	import replyList  from './reply-list';
  import replyUnline from './reply-unline';
	export default {
		data() {
			return{
				activeState: 'replylist-self'
			}
		},
		components: {
			'reply-list': replyList,
      'reply-unline': replyUnline
		},
		methods: {
			handleClick(tab, event) {
        this.$router.push({ path: '/nav1/dynamic/replylist/' + this.activeState});
      },
      replyreate() {
        this.$router.push({path:'/nav1/dynamic/replylist/create'})
			},
			routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/dynamic/replylist/replylist-self'){
          this.activeState = 'replylist-self';
        }else if(currentPath == '/nav1/dynamic/replylist/replylist-unline'){
          this.activeState = 'replylist-unline';
        }
      }
		},
		mounted() {
			this.routeChange();
		}
	}
</script>