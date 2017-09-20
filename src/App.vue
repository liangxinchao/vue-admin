<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  body {
    margin: 0px;
    padding: 0px;
    background: #1F2D3D;
    font-family: sans-serif, Microsoft YaHei, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,  SimSun;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }
  
  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }
  
  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }
  
  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }
  
  .toolbar {
    background: #fff;
    padding: 10px;
    .el-form-item {
      margin-bottom: 10px;
    }
  }

  table{ width:100%;
    th,td{ text-align:center; }
    th{
      .cell{ text-align:center; }
    }
  }
  .show{ display:block; }
  .hide{ display:none; }
</style>
