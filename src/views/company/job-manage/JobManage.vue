<template>
  <div class="container">
    <a-page-header
      style="
        border: 1px solid rgb(235, 237, 240);
        background: white;
        margin-bottom: 20px;
      "
      title="职位管理"
      sub-title="This is a subtitle"
    />
    <JobTable />
  </div>
</template>

<script>
import JobTable from "./components/jobTable.vue";
export default {
  name: "JobMange",
  components: { JobTable },
};
</script>

<style lang="less" scoped>
</style>