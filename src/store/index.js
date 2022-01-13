import { createStore } from 'vuex'

export default createStore({
  state: {
    //工作列表
    jobList: {},
    //列表分页信息
    pageConfig:{},
    //用户简介
    userInfo: {}
  },
  mutations: {
    saveJobList(state, value) {
      state.jobList = value;
    },
    savePageConfig(state, value) {
      state.pageConfig = value;
    },
    saveUserInfo(state, value) {
      state.userInfo = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
