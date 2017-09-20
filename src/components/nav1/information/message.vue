<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="发送短信" name="create">
      <message-create></message-create>
    </el-tab-pane>
    <el-tab-pane label="已发短信" name="list">
      <message-list></message-list>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import MessageCreate from './message-create';
  import MessageList from './message-list';
  export default {
    components:{
      'message-create': MessageCreate,
      'message-list': MessageList
    },
    data() {
      return {
        activeName: 'create'
      }
    },
    methods: {
      handleClick(tab, event) {
        this.$router.push({ path: '/nav1/information/message/' + this.activeName});
      },
      routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/information/message/create'){
          this.activeName = 'create';
        }else if(currentPath == '/nav1/information/message/list'){
          this.activeName = 'list';
        }
      }
    },
    mounted() {
      this.routeChange();
    }
  }
</script>