<template>
  <div class="home_container">
    <Navigation />
    <Banner />
    <div class="contant_info">
      <div class="work_list">
        <div class="work_item" v-for="(item, index) in 10" :key="index">
          <JobInfo />
        </div>
        <div class="pageation">
          <a-pagination
            size="small"
            :total="50"
            :show-total="(total) => `Total ${total} items`"
          />
        </div>
      </div>
      <div class="info_card">
        <UserCard />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navigation from "@/components/nav/Navigation.vue";
import Banner from "./components/banner/Banner.vue";
import UserCard from "./components/user-info/UserCard.vue";
import JobInfo from "./components/work/JobInfo.vue";
import Footer from "@/components/footer/Footer.vue";
export default {
  name: "Home",
  components: { Navigation, Banner, UserCard, JobInfo, Footer },
};
</script>

<style lang="less" scoped>
.home_container {
  width: 100%;
  // overflow: hidden;
  .contant_info {
    display: flex;
    width: calc(100% - 40%);
    height: calc(100% - 235px);
    margin: 10px auto 0;
    justify-content: space-between;
    align-items: flex-start;
    .work_list {
      width: 100%;
      height: 100%;
      margin-right: 10px;
      .work_item:not(:nth-child(1)) {
        margin-top: 10px;
      }
      .pageation {
        float: right;
        margin: 10px 0;
      }
    }
    .info_card {
      position: sticky;
    }
  }
}
</style>