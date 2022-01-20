<template>
  <a-card style="width: 100%; border-radius: 8px">
    <template #title> <ScheduleOutlined /> <span style="marginLeft: 10px; fontSize: 16px">申请统计：单位 (个)</span> </template>
    <div class="sketch_container">
      <div class="sketch_item" @click="selectJob()">
        <a-typography-title>{{ results?.all }}</a-typography-title>
        <span>全部</span>
      </div>
      <div class="sketch_item" @click="selectJob(1)">
        <a-typography-title>{{ results.pass }}</a-typography-title>
        <span>已通过</span>
      </div>
      <div class="sketch_item" @click="selectJob(2)">
        <a-typography-title>{{ results.noPass }}</a-typography-title>
        <span>未通过</span>
      </div>
      <div class="sketch_item" @click="selectJob(3)">
        <a-typography-title>{{ results.audit }}</a-typography-title>
        <span>审核中</span>
      </div>
    </div>
  </a-card>
</template>

<script>
import { reactive, getCurrentInstance, onBeforeMount } from "vue";
import { ScheduleOutlined } from "@ant-design/icons-vue";
export default {
  name: "Skatch",
  components: { ScheduleOutlined },
  setup(_, { emit }) {
    const { proxy: ins } = getCurrentInstance();
    const results = reactive({});
    onBeforeMount(() => {
      ins.$http.post("/StudentApplyJobPage/selectStatus").then((res) => {
        if (res.results) {
          Object.assign(results, res.results);
        }
      });
    });
    const selectJob = (e) => {
      emit("handlerStatus", { status: e });
    };
    return {
      results,
      selectJob,
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