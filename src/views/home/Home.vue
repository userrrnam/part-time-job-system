<template>
  <div class="home_container">
    <Navigation />
    <Banner />
    <div class="contant_info">
      <div class="work_list">
        <div class="work_item" v-for="(item, index) in 10" :key="index">
          <JobInfo />
        </div>
      </div>
      <div class="info_card">
        <UserCard />
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/nav/Navigation.vue";
import Banner from "./components/banner/Banner.vue";
import UserCard from "./components/user-info/UserCard.vue";
import JobInfo from "./components/work/JobInfo.vue";
export default {
  name: "Home",
  components: { Navigation, Banner, UserCard, JobInfo },
};
</script>

<style lang="less" scoped>
.home_container {
  width: 100%;
  height: 100%;
  overflow: auto;
  .contant_info {
    display: flex;
    width: calc(100% - 40%);
    height: 100%;
    margin: 10px auto 0;
    justify-content: space-between;
    align-items: flex-start;
    .work_list {
      width: 100%;
      margin-right: 10px;
      .work_item:not(:nth-child(1)) {
          margin-top: 10px;
      }
    }
    .info_card {
        position: sticky;
    }
  }
}
</style>