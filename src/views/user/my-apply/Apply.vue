<template>
  <div class="apply_contaniner">
    <Navigation />
    <BreakCrumb>
    <template #title>
      我的申请
    </template>
    </BreakCrumb>
    <!-- <Banner /> -->
    <div class="apply_wrapper">
      <div class="apply_jobList">
        <Sketch @handlerStatus="handlerStatus" />
        <div class="apply_item">
          <ApplyItem ref="applyRef" />
        </div>
      </div>
      <div class="side_bar">
        <div class="apply_news">
          <RecentNews />
        </div>
        <div class="chart">
          <AnlayseChart />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Navigation from "@/components/nav/Navigation.vue";
import BreakCrumb from "@/components/bread-crumb/BreakCrumb.vue"
import Sketch from "./components/Sketch.vue";
import ApplyItem from "./components/ApplyItem.vue";
import Footer from "@/components/footer/Footer.vue";
import AnlayseChart from "./components/AnalyseChart.vue";
import RecentNews from "./components/RecentNews.vue";
export default {
  name: "MyApply",
  components: {
    Navigation,
    BreakCrumb,
    Footer,
    RecentNews,
    Sketch,
    ApplyItem,
    AnlayseChart,
  },
  setup() {
    const router = useRouter();
    const applyRef = ref();
    const goHome = () => {
      router.push("/home");
    };
    const handlerStatus = (e) => {
      applyRef.value.getApplyJob(e);
    };
    return {
      goHome,
      handlerStatus,
      applyRef,
    };
  },
};
</script>

<style lang="less" scoped>
.apply_contaniner {
  background-color: rgb(245, 245, 245);
  overflow-y: auto;
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
      min-height: calc(100vh - 100px);
      border-radius: 8px;
    }
    .side_bar {
      min-width: 320px;
      margin-left: 10px;
      .apply_news {
        width: 100%;
        height: 280px;
        padding: 10px;
        border-radius: 8px;
        background-color: white;
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
      .chart {
        width: 100%;
        height: 420px;
        margin-top: 10px;
        padding: 10px;
        background-color: white;
        border-radius: 8px;
        overflow: hidden;
      }
    }
  }
}
</style>