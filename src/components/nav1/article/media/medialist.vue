<template> 
  <div>
    <el-tabs v-model="activeState" type="border-card" class="tab">
      <el-tab-pane label="外部媒体" name="foreign">
        <media-foreign></media-foreign>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import MediaForeign from './media-foreign';
  export default {
    components:{
      'media-foreign': MediaForeign
    },
    data() {
      return {
        activeState: 'foreign'
      }
    }
  }
</script>
