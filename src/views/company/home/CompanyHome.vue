<template>
  <a-card style="width: 30%">
    <template #title>
      <ScheduleOutlined />
      <span style="margin-left: 10px; font-size: 16px"
        >职位统计：单位 (个)</span
      >
    </template>
    <div class="sketch_container">
      <div class="sketch_item">
        <a-typography-title>{{ state.all }}</a-typography-title>
        <span>所有职位</span>
      </div>
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
</template>

<script>
import { getCurrentInstance, onBeforeMount, reactive } from "vue";
import { ScheduleOutlined } from "@ant-design/icons-vue";
export default {
  name: "CompanyHome",
  components: { ScheduleOutlined },
  setup() {
    const { proxy: ins } = getCurrentInstance();
    const state = reactive({
      start: 0,
      end: 0,
      all: 0,
    });
    const getCount = () => {
      ins.$http.post("/CompanyHome/countPosition").then((res) => {
        if (res.results) {
          const { start, end, all } = res.results;
          state.start = start;
          state.end = end;
          state.all = all;
          console.log(res.results);
        }
      });
      ins.$http.post("/CompanyHome/countApproval").then((res) => {
        console.log(res);
      });
    };
    onBeforeMount(() => {
      getCount();
    });
    return {
      state,
      getCount,
    };
  },
};
</script>

<style lang="less" scoped>
.sketch_container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .sketch_item {
    text-align: center;
    cursor: pointer;
  }
}
</style>