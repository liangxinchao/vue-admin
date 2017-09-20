<template>
  <div class="content">
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'content',
  }
</script>

<style scoped lang='scss'>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
