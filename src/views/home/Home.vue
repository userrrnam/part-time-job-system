<template>
  <div class="home_container">
    <Navigation />
    <Banner />
    <div class="contant_info">
      <a-spin :spinning="store.state.loading">
        <div class="work_list" v-if="store.state.jobList">
          <div
            class="work_item"
            v-for="(item, index) in store.state.jobList"
            :key="index"
          >
            <JobInfo :workInfo="item" :index="index" />
          </div>
          <div class="pageation">
            <a-pagination
              size="small"
              :total="store.state.pageConfig.totalCount"
              v-model:pageSize="pageConfig.size"
              v-model:current="currentPage"
              @change="changePage"
              :show-total="(total) => `共 ${total} 条`"
            />
          </div>
        </div>
        <div class="not_data" v-if="!store.state.jobList">
          <a-empty description="暂无数据" />
        </div>
      </a-spin>
      <div class="info_card">
        <UserCard />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { getCurrentInstance, reactive, ref, onMounted } from "vue";
import { useStore } from "vuex";
import Navigation from "@/components/nav/Navigation.vue";
import Banner from "./components/banner/Banner.vue";
import UserCard from "./components/user-info/UserCard.vue";
import JobInfo from "./components/work/JobInfo.vue";
import Footer from "@/components/footer/Footer.vue";
export default {
  name: "Home",
  components: { Navigation, Banner, UserCard, JobInfo, Footer },
  setup() {
    const currentPage = ref(1);
    const store = useStore();
    const { proxy: ins } = getCurrentInstance();
    let workInfo = reactive([]);
    const pageConfig = reactive({
      page: 1,
      size: 8,
    });
    const pageResult = reactive({
      totalCount: "",
      totalPages: "",
    });
    const getWorkInfo = (param) => {
      ins.$http.post("/StudentHomePage/selectCompany", param).then((res) => {
        pageResult.totalCount = res.totalCount;
        pageResult.totalPages = res.totalPages;
        if (res.results) {
          workInfo.length = 0;
          workInfo.push(...res.results);
          workInfo?.forEach((vals) => {
            if (store.state.cityName) {
              store.state.cityName.forEach((item) => {
                if (item.value == vals.city) {
                  vals.cityName = item.label;
                }
              });
            }
          });
          store.commit("saveJobList", workInfo);
          store.commit("savePageConfig", pageResult);
        } else {
          store.commit("saveJobList", null);
        }
      });
    };
    onMounted(() => {
      getWorkInfo(pageConfig);
    });

    const changePage = (page, pageSize) => {
      pageConfig.page = page;
      pageConfig.size = pageSize;
      getWorkInfo(pageConfig);
    };
    return {
      workInfo,
      pageConfig,
      currentPage,
      store,
      getWorkInfo,
      pageResult,
      changePage,
    };
  },
};
</script>

<style lang="less" scoped>
.home_container {
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: calc(100vh - 80px);
  .contant_info {
    display: flex;
    width: calc(100% - 40%);
    min-height: calc(100vh - 284px);
    margin: 10px auto 0;
    justify-content: space-between;
    align-items: flex-start;
    .ant-spin-nested-loading {
      width: 100%;
      margin-right: 10px;
      :deep(.ant-spin) {
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .work_list {
      width: 100%;
      height: 100%;
      overflow: auto;
      margin-right: 10px;
      .work_item:not(:nth-child(1)) {
        margin-top: 15px;
      }
      .pageation {
        float: right;
        margin: 10px 0;
      }
    }
    .not_data {
      width: 100%;
      min-height: 650px;
      border-radius: 8px;
      display: flex;
      background: white;
      justify-content: center;
      align-items: center;
      margin: 0 10px 10px 0;
    }
    .info_card {
      position: sticky;
    }
  }
}
</style>