<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="4" class="logo">
        <img src="../../images/logo.png" /><span>汇创业<i class="txt">管理后台</i></span>
      </el-col>
      <el-col :span="16">
        <el-menu theme="dark" unique-opened :default-active="'/' + $route.path.split('/')[1]" mode="horizontal"  router>
          <el-menu-item :index="nav.path" v-for='(nav,index) in $router.options.routes' :key="index" v-if='!nav.hidden'>{{nav.name}}</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4" class="userinfo">
        <span class="username">{{username}}</span>
        <i class="fa fa-sign-out logout" @click='logout'></i>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <el-col :span="3">
        <aside>
          <el-row v-for="(nav, index) in $router.options.routes" v-if='!nav.hidden && $route.matched.length && $route.matched[0].path===nav.path' :key="index">
            <el-col :span="24">
              <el-menu :default-active="routerpath" class="el-menu-vertical-demo" theme="dark" unique-opened router>
                <template v-for="(item, index) in nav.children" v-if="!item.hidden">
                  <el-submenu :index="item.path"  v-if="!item.leaf">
                    <template slot="title"><i :class="'fa fa-'+item.icon"></i>{{item.name}}</template>
                    <el-menu-item :index='nav.path + "/"+item.path+"/"+child.path' v-for='(child, index) in item.children' v-if="!child.hidden" :key="index">
                      {{child.name}}
                    </el-menu-item>
                  </el-submenu>
                  <el-menu-item v-if="item.leaf && item.children.length > 0" :index='nav.path + "/"+item.path+"/"+item.children[1].path'><i :class="'fa fa-'+item.icon"></i>{{item.children[1].name}}</el-menu-item>
                </template>
              </el-menu>
            </el-col>
          </el-row>
        </aside>
      </el-col>
      <el-col :span="21">
        <section class="content-container">
         <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">
                {{item.name}}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition>
              <router-view></router-view>
            </transition>
          </el-col>
        </section>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
  export default{
    data(){
      return{
        routerpath: '',
        username:'',
      }
    },
    methods:{
      getRouterpath(){
        let nowpathArr = this.$route.path.split('/');
        let newpathArr = [];
        for(let i = 0; i < 4; i++){
          newpathArr.push(nowpathArr[i]);
        }
        this.routerpath = newpathArr.join('/');
      },
      getUsername(){
        let user = localStorage.getItem('dreamuser');
        if (user) {
          user = JSON.parse(user);
          this.username = user.name;
        }
      },
      logout(){
        var _this = this;
        this.$confirm('确认退出登录吗?', '提示', {
        }).then(() => {
          localStorage.removeItem('dreamuser');
          _this.$router.push('/login');
        }).catch(() => {

        });
      }
    },
    mounted() {
      this.getRouterpath()
      this.getUsername();
    }
  }
</script>

<style scoped lang="scss">
  .container{ position:absolute; top:0px; bottom:0px; width:100%;
    .header{ height:60px; line-height:60px; background:#324157; color:#c0ccda;
      .logo{ font-size:20px; font-family:"汉仪雪君体简";
        img{ width:40px; float:left; margin:10px 10px 10px 2px; }
        .txt{ color:#20a0ff; font-style:normal; opacity:0.9; }
      }
      .userinfo{ text-align:right; padding-right:35px;
        .username{ font-size:16px; color:#fff; }
        .logout{ color:#fff; margin-left:8px; vertical-align:middle; }
      }
    }
    .main{ background:#324057;
      aside{ border-top:1px solid #1f2d3d;
        .fa{ margin-right:10px; }
      }
      .content-container{ background:#f1f2f7; padding:20px; min-height:650px; height:auto; overflow:hidden;
        .breadcrumb-container{ margin-bottom:15px;
          .title{ width:200px; float:left; color:#475669; }
          .breadcrumb-inner{ float:right; }
        }
        .content-wrapper{ background-color:#fff; box-sizing:border-box; }
      }
    }
  }
</style>