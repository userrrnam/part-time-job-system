<template>
  <div class="container">
    <a-card style="width: 30%">
      <template #title>
        <ScheduleOutlined />
        <span style="margin-left: 10px; font-size: 16px"
          >职位统计：单位 (个)</span
        >
      </template>
      <div class="sketch_container">
        <div class="sketch_item">
          <a-typography-title>{{ state.start }}</a-typography-title>
          <span>上线职位</span>
        </div>
        <div class="sketch_item">
          <a-typography-title>{{ state.end }}</a-typography-title>
          <span>下线职位</span>
        </div>
      </div>
    </a-card>
    <div class="main">
      <JobTable @refreshCount="getCount"/>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onBeforeMount, reactive } from "vue";
import { ScheduleOutlined } from "@ant-design/icons-vue";
import JobTable from "./components/jobTable.vue";
export default {
  name: "JobMange",
  components: { ScheduleOutlined, JobTable },
  setup() {
    const { proxy: ins } = getCurrentInstance();
    const state = reactive({
      start: "",
      end: "",
    });
    const getCount = () => {
      ins.$http.post("/CompanyPosition/countPosition").then((res) => {
        if (res.results) {
          const { start, end } = res.results;
          state.start = start;
          state.end = end;
        }
      });
    };
    onBeforeMount(() => {
      getCount();
    });
    return {
      state,
      getCount
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  .sketch_container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .sketch_item {
      text-align: center;
      cursor: pointer;
    }
  }
  .main {
    margin-top: 20px;
  }
}
</style>