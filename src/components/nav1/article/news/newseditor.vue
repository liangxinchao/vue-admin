<template>
	<el-tabs v-model="activeName" type="border-card">
    <el-tab-pane label="管理" name="first">
    	<newsManage></newsManage>
    </el-tab-pane>
    <el-tab-pane label="编辑" name="second">
    	<newsEditor></newsEditor>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
	import newsEditor from './newseditor-editor';
	import newsManage from './newseditor-manage';
  export default {
  	components:{
			newsEditor,
			newsManage
		},
    data() {
			return {
				activeName: 'first'
			}
		},
    methods:{
      getactived() {
        if(this.$store.state.selectauthor.name){
          this.activeName = 'second'
        }
      }  
    },
    mounted() {
      this.getactived()
    }
  }
</script>