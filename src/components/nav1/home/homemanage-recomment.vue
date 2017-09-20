<template>
	<div>
   <p class="model">资讯推荐</p> 
   <div class="imgs-wrap">
     <div class="imgbox" v-for="(i,index) in [1,2,3,4,0,7,7,8]" @click="selectNew(index)">
      <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=246912836,1223468464&fm=117&gp=0.jpg" class="banner-img">
     </div>
   </div>
    <p class="model">活动推荐</p> 
   <div class="imgs-wrap">
     <div class="imgbox" v-for="(i,index) in [1,2,3,4,0,7,7,8]" @click="selectActi(index)">
      <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=246912836,1223468464&fm=117&gp=0.jpg" class="banner-img">
     </div>
   </div>
  </div>
</template>

<script>
  export default {
    data() {
			return {
				activeName: 'first'
			}
		},
    methods:{
      selectNew(index) {
        this.$router.push({path:'/nav1/home/manage/linkselect'})
      },
      selectActi(index) {

      }
    },
    mounted() {
    }
  }
</script>
<style lang="scss">
  .model{ font-weight:bold; color:#20a0ff; border-left:3px solid #20a0ff; padding:1px 12px; }
  .imgs-wrap{display:flex;flex-wrap:wrap;margin-left:40px;
    .imgbox{width:250px;height:142px;margin:10px;background:#eee;
      .banner-img{width:250px;height:142px;}
    }
  }
</style>