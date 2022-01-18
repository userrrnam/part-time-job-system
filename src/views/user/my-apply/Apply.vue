<template>
  <div class="apply_contaniner">
    <Navigation />
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item @click="goHome" style="cursor: pointer"
          >爱兼职</a-breadcrumb-item
        >
        <a-breadcrumb-item>我的申请</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <!-- <Banner /> -->
    <div class="apply_wrapper">
      <div class="apply_jobList">
        <a-tabs
          v-model:activeKey="activeKey"
          @tabClick="tabChange"

        >
          <a-tab-pane
            :tab="item.value"
            v-for="item in tabParams"
            :key="item.key"
          >
            <div class="apply_item">nihao</div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="apply_news">
        <RecentNews />
      
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { getCurrentInstance, onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Navigation from "@/components/nav/Navigation.vue";
import Footer from "@/components/footer/Footer.vue";
import RecentNews from './components/RecentNews.vue';
export default {
  name: "MyApply",
  components: { Navigation, Footer, RecentNews },
  setup() {
    const { proxy: ins } = getCurrentInstance();
    const tabParams = reactive([
      {
        key: "1",
        value: "全部",
      },
      {
        key: "2",
        value: "已通过",
      },
      {
        key: "3",
        value: "审核中",
      },
      {
        key: "4",
        value: "未通过",
      },
    ]);
    const router = useRouter();
    onBeforeMount(() => {
      ins.$http.post("/StudentApplyJobPage/selectStatus").then((res) => {
        console.log(res);
      });
    });
    const goHome = () => {
      router.push("/home");
    };
    const tabChange = (e) => {
      console.log(1, e);
    };
    return {
      goHome,
      tabParams,
      tabChange,
      activeKey: ref("1"),
    };
  },
};
</script>

<style lang="less" scoped>
.apply_contaniner {
  background-color: rgb(245, 245, 245);
  overflow: hidden;
  .breadcrumb {
    height: 44px;
    margin-top: 44px;
    background: white;
    .ant-breadcrumb {
      width: calc(100% - 40%);
      line-height: 44px;
      margin: 0 auto;
    }
  }
  .apply_wrapper {
    display: flex;
    width: calc(100% - 40%);
    justify-content: center;
    margin: 0 auto;
    padding: 10px 0;
    .apply_jobList {
      width: 100%;
      height: calc(100vh - 88px);
      border-radius: 8px;
      background-color: white;
    }
    .apply_news {
      min-width: 400px;
      height: 370px;
      padding: 10px;
      border-radius: 8px;
      background-color: white;
      margin-left: 10px;
      overflow: hidden;
      P {
        height: 30px;
        font-weight: 600;
        margin-bottom: 0;
      }
      .news_list {
        height: calc(370px - 50px);
        overflow: auto;
        &::-webkit-scrollbar {
          width: 0 !important;
        }
        .new_item {
          margin: 10px 0;
        }
      }
    }
  }
}
</style>