<template>
  <div class="dynamic-list">
    <el-tabs v-model="activeState" type="border-card" class="tab" @tab-click="handleClick">
      <el-tab-pane label="话题列表" name="topiclist-self">
         <topic-list></topic-list>
      </el-tab-pane>
      <el-tab-pane label="已下架" name="topiclist-unline">
        <topic-unline></topic-unline>
      </el-tab-pane>
    </el-tabs>
    <el-button class="created" @click="topicreate">创建</el-button>
  </div>
</template>

<script>
	import TopicList  from './topiclist-list';
  import TopicUnline from './topiclist-unline';
	export default {
		data() {
			return{
				activeState: 'topiclist-self'
			}
		},
		components: {
			'topic-list': TopicList,
      'topic-unline': TopicUnline,
		},
		methods: {
			handleClick(tab, event) {
        this.$router.push({ path: '/nav1/dynamic/topiclist/' + this.activeState});
      },
      topicreate() {
        this.$router.push({path:'/nav1/dynamic/topiclist/create'})
			},
			routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/dynamic/topiclist/topiclist-self'){
          this.activeState = 'topiclist-self';
        }else if(currentPath == '/nav1/dynamic/topiclist/topiclist-unline'){
          this.activeState = 'topiclist-unline';
        }
      }
		},
		mounted() {
			this.routeChange();
		}
	}
</script>
<style lang="scss" scoped>
	 .dynamic-list{ position:relative;
    .created{ position:absolute; top:4px; right:25px; z-index:99; }
  }
</style>