<template>
  <div class="m-form">
    <div class="form-content">
      <div class="top-wrap">
        <img class="logo" :src="activityData.cover" />
        <div class="info">
          <h1 class="title">{{activityData.title}}</h1>
          <p class="tag" v-if="activityData.keywords != []">
            <span class="style" v-for="item in activityData.keywords">{{item}}</span>
          </p>
          <p class="tagItem">
            <span class="l-tag">
              <em class="pos">活动</em>{{activityData.timeOfActivity}}
            </span>
            <span>
              <em class="pos">报名</em>{{activityData.timeOfEnrollment}}
            </span>
          </p>
          <p class="tagItem">
            <em class="pos">地址</em>{{activityData.location}}
          </p>
          <p class="tagItem">
            <em class="pos">主办</em>{{activityData.sponsor}}
          </p>
          <p class="tagItem" v-if="activityData.coSponsor != ''">
            <em class="pos">协办</em>{{activityData.coSponsor}}
          </p>
          <p class="tagItem">
            <em class="pos">人数</em>
            已报名<b class="cpurple"> {{activityData.enrollCount}}</b> 人 / 
            <span v-if="activityData.numberOfExpected == '-1'">
              <b class="cpurple">不限人数</b>
            </span>
            <span v-else>
              限额 <b class="cpurple">{{activityData.numberOfExpected}}</b>  人
            </span>
          </p>
        </div>
      </div>
      <ul class="detail-wrap">
        <li>
          <div class="paperblock">
            <p class="detail">活动详情</p>
          </div>
          <div class="papercontent">
            <p class="c-detail" id="activitycontent"></p>
          </div>
        </li>
        <li v-if="guestsShow">
          <div class="paperblock">
            <p class="guest">活动嘉宾</p>
          </div>
          <div class="papercontent">
            <div class="guest-area">
              <swiper class="swiper" :options="Option">
                <swiper-slide v-for="item in activityData.guests" :key="item">
                  <img class="pic" :src="item.pic" />
                  <div class="mask">
                    <div class="info">
                      <p><b>姓名：</b>{{item.name}}</p>
                      <p><b>公司：</b>{{item.company}}</p>
                      <p><b>职业：</b>{{item.job}}</p>
                      <p><b>简介：</b>{{item.info}}</p>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
              <div v-if="swiperBtnShow">
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
            </div>
          </div>
        </li>
        <li v-if="processShow">
          <div class="paperblock">
            <p class="process">活动流程</p>
          </div>
          <div class="papercontent">
            <dl class="process-area">
              <dt v-for="item in activityData.process">
                <div class="line"></div>
                <div class="item">
                  <p class="process-time f-fl">{{item.start}}-{{item.end}}</p>
                  <p class="process-content f-fl">{{item.content}}</p>
                </div>
              </dt>
            </dl>
          </div>
        </li>
        <li v-if="enrollListShow">
          <div class="paperblock">
            <p class="number">报名人员</p>
          </div>
          <div class="papercontent">
            <dl class="person-area">
              <dd v-for="item in enrollList">
                <img class="avatar" v-if="item.avatar != ''" :src="item.avatar" />
                <img class="avatar" v-else src="../../../images/defaultAvatar.png" />
                <p class="name">{{item.name}}</p>
              </dd>
            </dl>
          </div>
        </li>
      </ul>
      <el-button class="backBtn" @click="backPage">返回</el-button>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import activityApi from '@/js/api.js';
  import functionApi from '@/js/function.js';
  export default {
    data () {
      return {
        activityData: {},
        guestsShow: true,
        processShow: true,
        Option: {
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          watchSlidesProgress : true,
          watchSlidesVisibility : true,
          slidesPerView: 4,
          spaceBetween: 10,
          grabCursor: true,
          paginationClickable: true,
          centeredSlides: false,
          speed: 1000,
          autoplay: false
        },
        swiperBtnShow: true,
        enrollListShow: true,
        enrollList: []
      }
    },
    methods:{
      backPage: function(){
        //localStorage.setItem('previewId',localStorage.getItem('activityId'))
        this.$router.go(-1);
      }
    },
    mounted: function(){
      const activityId = localStorage.getItem('activityId');
      //activityApi.activity.postDetail(activityId).then(res => {
        let previewdata= JSON.parse(localStorage.getItem('previewData'));
        if(previewdata){
          this.activityData = previewdata;
          console.log(this.activityData);
          this.activityData.enrollCount = 0;
          this.activityData.location = this.activityData.location.province + '·' + this.activityData.location.city + '·' + this.activityData.location.area;

        this.activityData.sponsor = this.activityData.sponsor.join(',');
         if(this.activityData.coSponsor != []){
          this.activityData.coSponsor = this.activityData.coSponsor.join(',');
        }else{
          this.activityData.coSponsor = '';
        }
        console.log(this.activityData.content)
         $('#activitycontent').load(this.activityData.content);
           $('#activitycontent').html(this.activityData.content)
        }else{
          activityApi.activity.postDetail(activityId).then(res => {
            this.activityData = res.data;
            console.log(this.activityData)
            const startOfActivityYear = functionApi.moment.getYear(this.activityData.startOfActivity);
        const startOfActivityMonth = functionApi.moment.getMonth(this.activityData.startOfActivity);
        const startOfActivityDay = functionApi.moment.getDay(this.activityData.startOfActivity);
        const endOfActivityYear = functionApi.moment.getYear(this.activityData.endOfActivity);
        const endOfActivityMonth = functionApi.moment.getMonth(this.activityData.endOfActivity);
        const endOfActivityDay = functionApi.moment.getDay(this.activityData.endOfActivity);
        if(startOfActivityYear !== endOfActivityYear){
          this.activityData.timeOfActivity = functionApi.moment.getYMDHM(this.activityData.startOfActivity) + ' - ' + functionApi.moment.getYMDHM(this.activityData.endOfActivity);
        }else{
          if(startOfActivityMonth == endOfActivityMonth && startOfActivityDay == endOfActivityDay){
            this.activityData.timeOfActivity = functionApi.moment.getMDHM(this.activityData.startOfActivity) + ' - ' + functionApi.moment.getHM(this.activityData.endOfActivity);
          }else{
            this.activityData.timeOfActivity = functionApi.moment.getMDHM(this.activityData.startOfActivity) + ' - ' + functionApi.moment.getMDHM(this.activityData.endOfActivity);
          }
        }
        this.activityData.location = this.activityData.location.province + '·' + this.activityData.location.city + '·' + this.activityData.location.area;

        this.activityData.sponsor = this.activityData.sponsor.join(',');
         if(this.activityData.coSponsor != []){
          this.activityData.coSponsor = this.activityData.coSponsor.join(',');
        }else{
          this.activityData.coSponsor = '';
        }
        console.log(this.activityData.content)
         $('#activitycontent').load(this.activityData.content);
          
            activityApi.activity.postEnrollListBrief({id: activityId}).then(res =>{
        this.enrollList = res.data;
        console.log(this.enrollList);
        if(res.data && res.data.length == 0){
          this.enrollListShow = false;
        }
      })
          })
        }
        
        //this.activityData = res.data;
        //console.log(this.activityData);
        
        const startOfActivityYear = functionApi.moment.getYear(this.activityData.startOfActivity);
        const startOfActivityMonth = functionApi.moment.getMonth(this.activityData.startOfActivity);
        const startOfActivityDay = functionApi.moment.getDay(this.activityData.startOfActivity);
        const endOfActivityYear = functionApi.moment.getYear(this.activityData.endOfActivity);
        const endOfActivityMonth = functionApi.moment.getMonth(this.activityData.endOfActivity);
        const endOfActivityDay = functionApi.moment.getDay(this.activityData.endOfActivity);
        if(startOfActivityYear !== endOfActivityYear){
          this.activityData.timeOfActivity = functionApi.moment.getYMDHM(this.activityData.startOfActivity) + ' - ' + functionApi.moment.getYMDHM(this.activityData.endOfActivity);
        }else{
          if(startOfActivityMonth == endOfActivityMonth && startOfActivityDay == endOfActivityDay){
            this.activityData.timeOfActivity = functionApi.moment.getMDHM(this.activityData.startOfActivity) + ' - ' + functionApi.moment.getHM(this.activityData.endOfActivity);
          }else{
            this.activityData.timeOfActivity = functionApi.moment.getMDHM(this.activityData.startOfActivity) + ' - ' + functionApi.moment.getMDHM(this.activityData.endOfActivity);
          }
        }

        const startOfEnrollmentYear = functionApi.moment.getYear(this.activityData.startOfEnrollment);
        const startOfEnrollmentMonth = functionApi.moment.getMonth(this.activityData.startOfEnrollment);
        const startOfEnrollmentDay = functionApi.moment.getDay(this.activityData.startOfEnrollment);
        const endOfEnrollmentYear = functionApi.moment.getYear(this.activityData.endOfEnrollment);
        const endOfEnrollmentMonth = functionApi.moment.getMonth(this.activityData.endOfEnrollment);
        const endOfEnrollmentDay = functionApi.moment.getDay(this.activityData.endOfEnrollment);
        if(startOfEnrollmentYear !== endOfEnrollmentYear){
          this.activityData.timeOfEnrollment = functionApi.moment.getYMDHM(this.activityData.startOfEnrollment) + ' - ' + functionApi.moment.getYMDHM(this.activityData.endOfEnrollment);
        }else{
          if(startOfEnrollmentMonth == endOfEnrollmentMonth && startOfEnrollmentDay == endOfEnrollmentDay){
            this.activityData.timeOfEnrollment = functionApi.moment.getMDHM(this.activityData.startOfEnrollment) + ' - ' + functionApi.moment.getHM(this.activityData.endOfEnrollment);
          }else{
            this.activityData.timeOfEnrollment = functionApi.moment.getMDHM(this.activityData.startOfEnrollment) + ' - ' + functionApi.moment.getMDHM(this.activityData.endOfEnrollment);
          }
        }

       /* this.activityData.location = this.activityData.location.province + '·' + this.activityData.location.city + '·' + this.activityData.location.area;*/

       
       
        
        

        if(this.activityData.guests && this.activityData.guests.length == 0){
          this.guestsShow = false;
        }
        if(this.activityData.guests && this.activityData.guests.length <= 4){
          this.swiperBtnShow = false;
        }

        if(this.activityData.process && this.activityData.process.length == 0){
          this.processShow = false;
        }
        
      //});
      
    }
  }
</script>

<style lang="scss" scoped>
  body, p, ul, li, h1, dl, dt, dd{ margin:0; padding:0; }
  .form-content{ box-sizing:border-box; width:920px; margin:0 auto;
    .top-wrap{ background:#fff; border:1px solid #e9eff2; padding:30px; overflow:hidden; margin-top:30px;
      .logo{ float:left; width:220px; height:308px; }
      .info{ float:left; margin-left:30px; width:600px;
        .title{ font-size:24px; line-height:44px; color:#3b4857; margin:0; padding:0; }
        .tag{ margin:15px 0 30px 0; 
          .style{ display: inline-block; font-size:14px; color:#6ecee6; height:28px; line-height:28px; padding:0 15px; margin-right:9px; border-radius:15px; border:1px solid #6ecee6; }
        }
        .tagItem{ font-size:14px; color:#3b4857; line-height:22px; margin-bottom:18px;
          .l-tag{ margin-right:30px; }
          .pos{ display:inline-block; font-size:12px; font-style:normal; color:#aab5c1; width:50px; height:22px; text-align:center; margin-right:10px; background:url('../../../images/tag.png') no-repeat; }
          .cpurple{ color:#6ecee6; }
        }
      }
    }
    ul.detail-wrap{ border:1px solid #e9eff2; margin:0; border-top:0;
      li{ list-style:none; 
        .paperblock{ background:#f8fafb; font-size:16px; color:#3b4857; font-weight:bold; overflow:hidden; padding:15px 0; border-bottom:1px solid #e9eff2; 
          p{ background:url('../../../images/preview.png') no-repeat; padding-left:50px; }
          .detail{ background-position: 28px 2px; }
          .guest{ background-position: 28px -18px; }
          .process{ background-position: 28px -37px; }
          .number{ background-position: 28px -60px; }
        }
        .papercontent{ position:relative; background:#fff; border-bottom:1px solid #e9eff2;
          .c-detail{ padding:20px 50px 35px 50px; 
            img{ max-width:100%; }
          }
          .guest-area{ padding:30px 50px 40px 50px; width:818px; height:240px;
            .swiper-slide{ position:relative;
              .pic{ width:180px; height:240px; }
              .mask{ display:none; position:absolute; top:0; left:0; width:180px; height:240px; background:#000; opacity:0.75;
                .info{ padding:15px 10px;
                  p{ font-size:12px; line-height:20px; color:#fff; }
                }
              }
              &:hover{
                .mask{ display:block; }
              }
            }
          }
          .process-area{ padding:1px 50px 47px 50px; 
            .line{ width:178px; height:28px; border-right:6px solid #e7ecf0; }
            .item{ border:1px solid #dde1e6; border-radius:7px; padding:20px 30px 19px 30px; overflow:hidden; 
              .process-time{ float:left; font-size:16px; line-height:20px; }
              .process-content{ float:left; font-size:16px; color:#3b4857; line-height:20px; background:url('../../../images/process-address.png') no-repeat 52px 0px; padding-left:120px; width:530px; text-align:justify; }
            }
          }
          .person-area{ padding:35px 49px 5px 50px; overflow:hidden;
            dd{ width:107px; float:left; margin:0 71px 25px 0; 
              .avatar{ width:99px; height:99px; border:4px solid #eaf1f5; border-radius:54px; }
              .name{ font-size:16px; line-height:46px; color:#3b4857; width:107px; text-align:center; }
            }
          }
        }
        &:last-child{
          .papercontent{ border-bottom:none; }
        }
      }
    }
    .backBtn{ margin:15px 0; }
  }
</style>