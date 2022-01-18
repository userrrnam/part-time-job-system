import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    loading: false,
    showNav: false,
    //工作列表
    jobList: {},
    //列表分页信息
    pageConfig: {},
    //用户简介
    userInfo: {},
    //城市code
    city: '',
    //城市名
    cityName: '',
    //用户所在地
    location: '',
    //查询条件
    selectJobParams: {},
    //省、市、区/县
    locations: [],
  },
  mutations: {
    changLoading(state, value) {
      if (!value) {
        setTimeout(() => {
          state.loading = value;
        }, 300);
      } else {
        state.loading = value;
      }
    },
    changeShow(state, value) {
      state.showNav = value;
    },
    saveJobList(state, value) {
      state.jobList = value;
    },
    savePageConfig(state, value) {
      state.pageConfig = value;
    },
    saveUserInfo(state, value) {
      state.userInfo = value;
    },
    saveCity(state, value) {
      state.city = value;
    },
    saveCityName(state, value) {
      state.cityName = value;
    },
    saveLocation(state, value) {
      state.location = value;
    },
    savaSelectJobParams(state, value) {
      state.selectJobParams = value;
    },
    saveLocations(state, value) {
      state.locations = value;
    }
  },
  actions: {},
  modules: {}
})