<template>
  <div class="apply_contaniner">
    <Navigation />
    <Banner/>
  </div>
</template>

<script>
import Navigation from "@/components/nav/Navigation.vue";
import { getCurrentInstance, onBeforeMount } from 'vue'
import Banner from '@/views/home/components/banner/Banner.vue'
export default {
  name: "MyApply",
  components: { Navigation, Banner },
  setup() {
    const { proxy: ins } = getCurrentInstance();
    onBeforeMount(() => {
      ins.$http.post("/StudentHomePage/selectInformationHome").then(res => {
        console.log(res)
      })
    })
  }
};
</script>

<style lang="less" scoped>
</style>