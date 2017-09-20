<template>
  <div class="dynamic-list">
    <el-tabs v-model="activeState" type="border-card" class="tab" @tab-click="handleClick">
      <el-tab-pane label="动态列表" name="dynamiclist-self">
         <dynamic-list></dynamic-list>
      </el-tab-pane>
      <el-tab-pane label="已下架" name="dynamiclist-unline">
        <dynamic-unline></dynamic-unline>
      </el-tab-pane>
    </el-tabs>
    <el-button class="created" @click="dynamiccreate">创建</el-button>
  </div>
</template>

<script>
	import DynamicList  from './dynamiclist-list';
  import DynamicUnline from './dynamiclist-unline';
	export default {
		data() {
			return{
				activeState: 'dynamiclist-self'
			}
		},
		components: {
			'dynamic-list': DynamicList,
      'dynamic-unline': DynamicUnline,
		},
		methods: {
			dynamiccreate() {
				this.$router.push({path:'/nav1/dynamic/dynamiclist/create'})
			},
			handleClick(tab, event) {
		    this.$router.push({ path: '/nav1/dynamic/dynamiclist/' + this.activeState});
		  },
			routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/dynamic/dynamiclist/dynamiclist-self'){
          this.activeState = 'dynamiclist-self';
        }else if(currentPath == '/nav1/dynamic/dynamiclist/dynamiclist-unline'){
          this.activeState = 'dynamiclist-unline';
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