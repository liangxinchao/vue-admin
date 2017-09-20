<template> 
  <div class="policylist">
    <el-tabs v-model="activeState" type="border-card" class="tab" @tab-click="handleClick">
      <el-tab-pane label="已发布" name="published">
        <policy-published></policy-published>
      </el-tab-pane>
      <el-tab-pane label="草稿" name="draft">
        <policy-draft></policy-draft>
      </el-tab-pane>
      <el-tab-pane label="已下架" name="unline">
        <policy-unline></policy-unline>
      </el-tab-pane>
    </el-tabs>
    <el-button class="created" @click="policycreate">创建</el-button>
  </div>
</template>

<script>
  import PolicyPublished  from './policy-published';
  import PolicyDraft from './policy-draft';
  import PolicyUnline from './policy-unline';
  export default {
    components:{
      'policy-published': PolicyPublished,
      'policy-draft': PolicyDraft,
      'policy-unline': PolicyUnline
    },
    data() {
      return {
        activeState: 'published'
      }
    },
    methods: {
      policycreate() {
        this.$router.push({ path: '/nav1/article/policy/policycreate' });
      },
      handleClick(tab, event) {
        this.$router.push({ path: '/nav1/article/policy/policylist/' + this.activeState});
      },
      routeChange() {
        let currentPath = window.location.pathname;
        if(currentPath == '/nav1/article/policy/policylist/published'){
          this.activeState = 'published';
        }else if(currentPath == '/nav1/article/policy/policylist/draft'){
          this.activeState = 'draft';
        }else if(currentPath == '/nav1/article/policy/policylist/unline'){
          this.activeState = 'unline';
        }
      }
    },
    mounted() {
      this.routeChange();
    }
  }
</script>

<style lang="scss" scoped>
  .policylist{ position:relative;
    .created{ position:absolute; top:4px; right:25px; z-index:99; }
  }
</style>
