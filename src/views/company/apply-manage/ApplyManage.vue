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
import { getCityName } from '@/util/city.js'
import { onMounted } from '@vue/runtime-core';
export default {
  name: "ApplyManage",
  components: { ApplyTable },
  setup(){
    onMounted(() => {
      const {cityName } = getCityName('510104')
      console.log(cityName);
    })
  }
};
</script>

<style lang="less" scoped>
</style>