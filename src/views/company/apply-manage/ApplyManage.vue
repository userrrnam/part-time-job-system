<template>
  <div class="container">
    <a-page-header
      style="
        border: 1px solid rgb(235, 237, 240);
        background: white;
        margin-bottom: 20px;
      "
      title="申请管理"
      sub-title="This is a subtitle"
    />
    <ApplyTable />
  </div>
</template>

<script>
import ApplyTable from "./apply-table/ApplyTable.vue";
export default {
  name: "ApplyManage",
  components: { ApplyTable },
};
</script>

<style lang="less" scoped>
</style>