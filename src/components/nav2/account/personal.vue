<template>
  <div class="personaluser">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="个人用户" name="personal">
        <personal-user></personal-user>
      </el-tab-pane>
      <el-tab-pane label="园区用户" name="park">
        <park-user></park-user>
      </el-tab-pane>
    </el-tabs>
    <el-button class="created" @click="usercreate">创建</el-button>
  </div>
</template>

<script>
  import PersonalUser from './personal-personaluser';
  import ParkUser from './personal-parkuser';
  export default {
    components:{
      'personal-user': PersonalUser,
      'park-user': ParkUser
    },
    data() {
      return {
        activeName: 'personal'
      }
    },
    methods: {
      usercreate(){
        this.$router.push({ path: '/nav2/account/personal/create' });
      },
      handleClick(tab, event) {
        this.$router.push({ path: '/nav2/account/personal/' + this.activeName});
      },
      routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav2/account/personal/personal'){
          this.activeName = 'personal';
        }else if(currentPath == '/nav2/account/personal/park'){
          this.activeName = 'park';
        }
      }
    },
    mounted() {
      this.routeChange();
    }
  }
</script>

<style lang="scss" scoped>
  .personaluser{ position:relative;
    .created{ position:absolute; top:4px; right:25px; z-index:99; }
  }
</style>