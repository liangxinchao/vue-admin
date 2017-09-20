<template>
  <div class="enrollform">
    <el-form-item class="small-ipt sign-wrap" style="width:986px;">
      <el-row class="sign-item">
        <el-col :span="4">
          <el-checkbox v-model="signsel" disabled></el-checkbox>
          <span>&nbsp;必填</span>
          <span class="sign-name">姓名</span>
        </el-col>
        <el-col :span="11">
          <el-input placeholder="报名用户姓名或昵称" disabled></el-input>
        </el-col>
      </el-row>
      <el-row class="sign-item">
        <el-col :span="4">
          <el-checkbox v-model="signsel" disabled></el-checkbox>
          <span>&nbsp;必填</span>
          <span class="sign-name">手机</span>
        </el-col>
        <el-col :span="11">
          <el-input placeholder="报名用户的手机号" disabled></el-input>
        </el-col>
      </el-row>
      <el-row class="sign-item">
        <el-col :span="4">
          <el-checkbox v-model="signsel" disabled></el-checkbox>
          <span>&nbsp;必填</span>
          <span class="sign-name">邮箱</span>
        </el-col>
        <el-col :span="11">
          <el-input placeholder="报名用户的邮箱" disabled></el-input>
        </el-col>
      </el-row>
      <el-row class="add-sel">
        <p class="title">常用栏位</p>
        <el-button v-for="(i, index) in signSellist" class="sign-btn" @click="addBtn(index, i)" :key="index">{{i}}</el-button>
      </el-row>
    </el-form-item>
    <el-form-item>
      <p class="sign-point">其他<span>如未添加栏位，即不需要报名人提供额外信息</span></p>
    </el-form-item>
    <el-form-item style="width:986px;" v-for="(item,index) in itemlists" :key="index">
      <el-row>
        <el-col :span="2">
          <el-checkbox v-model="item.value1"></el-checkbox>
          <span>&nbsp;必填</span>
        </el-col>
        <el-col :span="2" class="ipt-name">
          <el-input v-model="item.value2"></el-input>
        </el-col>
        <el-col :span="9">
          <el-input v-model="item.value3" placeholder="提示信息写在这里"></el-input>
        </el-col>
        <el-col :span="2" class="ipt-del">
          <el-button @click="delBtn(index)">删除</el-button>
        </el-col>
        <el-col :span="11" offset="4" v-if="item.tagShow">
          <el-row>选项列表</el-row>
          <el-tag v-for="tag in item.Tags" :closable="true" :close-transition="false" @close="handleClose(tag, item)" :key="tag" type="primary">{{tag}}</el-tag>
          <el-input class="small-ipt"  v-if="item.tagInputShow"  v-model="item.tagInputValue" ref="saveTagInput" @keyup.enter.native="handleInput(item)"  @blur="handleInput(item)"></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput(item)">+ New Tag</el-button>
        </el-col> 
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button @click="dialogFormVisible = true">预览</el-button>
    </el-form-item>
    <el-dialog v-model="dialogFormVisible" class="model">
      <label class="form-title">预览活动表单</label>
      <el-row class="sign-item1">
        <el-col class="input-title">
          <label class="input-title">姓名</label>
        </el-col>
        <el-col :span="14">
          <el-input  placeholder="报名用户姓名或昵称" :disabled="true"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="input-title">
          <label class="input-title">手机号</label>
        </el-col>
        <el-col :span="14">
          <el-input  placeholder="报名用户手机号" :disabled="true"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="input-title">
          <label class="input-title">电子邮箱</label>
        </el-col>
        <el-col :span="14">
          <el-input  placeholder="报名用户电子邮箱" :disabled="true"></el-input>
        </el-col>
      </el-row>
      <p class="form-title" v-if="itemlists.length != 0">其他</p>
      <p class="sign-point" v-if="itemlists.length == 0">
        <span>如未添加栏位，即不需要报名人提供额外信息</span>
      </p>
      <el-row v-for="(item,index) in itemlists" style="width:600px;" :key="index">
        <el-col class="input-title">
          <label class="input-title">{{item.value2}}
            <span v-if="item.tagShow">{{item.value3}}</span>
          </label>
        </el-col>
        <el-input class="el-input" v-model="item.value3" v-if="!item.tagShow"></el-input>
        <el-select class="sign-item" v-model="item.selectValue" v-if="item.Tags">
          <el-option v-for="i in item.Tags" :value="i" :label="i" :key="index"></el-option>
        </el-select>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        signsel: true,
        signSellist: ['职位', '学历', '年龄', '公司', '部门', '其他', '月收入', '附件'],
        itemlists: [],
        dialogFormVisible: false,
        selectValue: ''
      }
    },
    methods: { 
      addBtn(index, i) {
        if(index == 1){
          this.itemlists.push({
            value1: '',
            value2: i,
            value3: '',
            tagShow: true,
            Tags: ['小学', '中学', '大专', '高中', '大专', '本科', '研究生以上'],
            tagInputValue: '',
            tagInputShow: "",
            selectValue: ''
          });
        }else if(index == 2){
          this.itemlists.push({
            value1: '',
            value2: i,
            value3: '',
            tagShow: true,
            Tags: ['15岁以下', '16-20岁', '21-25岁', '26-30岁', '31-40岁', '40岁以上'],
            tagInputValue: '',
            tagInputShow: "",
            selectValue: ''
          });
        }else if(index == 6) {
          this.itemlists.push({
            value1: '',
            value2: i,
            value3: '',
            tagShow: true,
            Tags: ['少于3000', '3000-5000', '5000-10000', '10000-20000', '20000以上'],
            tagInputValue: '',
            tagInputShow: "",
            selectValue: ''
          })
        }else{
          this.itemlists.push({
            value1: '',
            value2: i,
            value3: '',
            tagShow: false,
            selectValue: ""
          });
        }
      },
      delBtn(index) {
        this.itemlists.splice(index, 1);
      },
      handleClose(tag,item) {
        item.Tags.splice(item.Tags.indexOf(tag), 1);
      },
      showInput(item) {
        item.tagInputShow = true;
      },
      handleInput(item) {
        if (item.tagInputValue) {
          item.Tags.push(item.tagInputValue);
        }
        item.tagInputShow = false;
        item.tagInputValue = '';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .enrollform{
    .sign-point{ margin:0; line-height:20px; 
      span{ font-size:12px; color:#999; margin-left:15px; }
    }
    .sign-name{ margin-left:20px; margin-right:20px; }
    .sign-item{ margin-bottom:15px; }
    .sign-item1{ margin-top:15px; }
    .sign-wrap{ position:relative; }
    .add-sel{ position:absolute; top:0; right:0; width:240px; display:flex; flex-wrap:wrap; border-left:1px solid #ccc;
      .title{ width:240px; margin:0 0 5px 10px; }
      .sign-btn{ width:40%; margin-bottom:15px; margin-left:10px; }
    }
    .ipt-name{ padding:0 10px; }
    .ipt-del{ padding-left:10px; }
    .small-ipt{ width:208px; }
    .el-tag{ display:inline-block; background-color:rgba(32,159,255,.1); border-color:rgba(32,159,255,.2); font-size:14px; color:#20a0ff; height:34px; line-height:34px; margin:0 10px 6px 0; padding:0 10px; }
    .el-input{ margin-bottom:15px; }
    .form-title{ font-weight:bold; padding-bottom:1px; }
    .input-title{ padding-bottom:5px; 
      span{ font-size:12px; color:#999; }
    }
  }
</style>
