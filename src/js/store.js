import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  // 存储状态值
  state: {
    user: JSON.parse(localStorage.getItem('user')),
    selectauthor: {},
    selectpush: {},
    news: {
      form: {
        title: '',
        original: '',
        originUrl: '',
        author: '',
        brief: '',
        content: '',
        type: '',
        initprovince: '',
        initcity: '',
        initarea: '',
        initpark: '',
        privacy: '',
        style: '',
        webThumbImg: '',
        webThumbImg1: '',
        webThumbImg2: '',
        webThumbImg3: '',
        appThumbImg: '',
        appThumbImg1: '',
        appThumbImg2: '',
        appThumbImg3: '',
        isbanner: false,
        webCoverImg: '',
        appCoverImg: '',
        recomment: [],
        keywords: []
      },
    },
    info: {
      pushform: {
        title: '',
        content: '',
        push: '',
        apptype: '',
        park: [],
        parkSelect: [],
        recepter: '',
        setRecepter: [],
        time: '',
        setDate: '',
        setTime: ''
      },
      pushformModify: {
        title: '',
        content: '',
        push: '',
        apptype: '',
        park: [],
        parkSelect: [],
        recepter: '',
        setRecepter: [],
        time: '',
        setDate: '',
        setTime: ''
      },
      sysform: {
        type: '',
        setScroll: false,
        title: '',
        content: '',
        push: '',
        apptype: '',
        park: [],
        parkSelect: [],
        recepter: '',
        setRecepter: [],
        user: '',
        time: '',
        setDate: '',
        setTime: '',
        pushapp: ''
      },
      sysformModify: {
        type: '',
        setScroll: false,
        title: '',
        content: '',
        push: '',
        apptype: '',
        park: [],
        parkSelect: [],
        recepter: '',
        setRecepter: [],
        user: '',
        time: '',
        setDate: '',
        setTime: '',
        pushapp: ''
      },
    }
  },
  mutations: {
    createform(state, form){  
      state.createform = form;
    },
    selectauthorconfirm(state, author){
      state.selectauthor = author;
    },
    selectpushconfirm(state, push){
      state.selectpush = push;
    }
  },
  actions: {
    createform({commit},form){
      commit('createform', form);
    },
    selectauthorconfirm({commit}, author){
      if(author.type == "用户"){
        author.type = '0';
      }else if(author.type == "企业"){
        author.type = '1';
      }else{
        author.type = '2';
      }
      commit('selectauthorconfirm', author)
    },
    selectpushconfirm({commit}, push){
      commit('selectpushconfirm', push)
    }
  }
  // getters: {}
})

export default store