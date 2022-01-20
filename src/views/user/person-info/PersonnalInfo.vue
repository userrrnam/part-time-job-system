<template>
  <div class="person_contaniner">
    <Navigation />
    <div class="contant">
      <div class="bg_img">
        <img src="@/assets/bg-img.jpg" />
      </div>
      <div class="personal_info_contant">
        <div class="avatar">
          <a-avatar
            :size="150"
            shape="square"
            :style="{ backgroundColor: info.avtarColor }"
          >
            {{ info.name?.substr(-2, 2) }}
          </a-avatar>
        </div>
        <div class="infomation">
          <div>账号：{{ info.studentAccount }}</div>
           <a-divider />
          <div>姓名：{{ info.name }}</div>
           <a-divider />
          <div>性别：{{ info.sex ? "女" : "男" }}</div>
           <a-divider />
          <div>年龄：{{ info.age }}</div>
           <a-divider />
          <div>期望职业类型：{{ info.occupation }}</div>
           <a-divider />
          <div>电话：{{ info.phone }}</div>
           <a-divider />
          <div>邮箱：{{ info.email }}</div>
           <a-divider />
          <div>期望结算类型：{{ info.calculate }}</div>
           <a-divider />
          <div>期望城市: {{ info.city }}</div>
           <a-divider />
          <div>个人介绍：{{ info.details ? info.details : "无" }}</div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { getCurrentInstance, onBeforeMount, reactive } from "vue";
import Navigation from "@/components/nav/Navigation.vue";
import Footer from "@/components/footer/Footer.vue";
export default {
  name: "PersonalInfo",
  components: { Navigation, Footer },
  setup() {
    const { proxy: ins } = getCurrentInstance();
    const info = reactive({});
    const infoKey = reactive([])
    const getPersonalInfo = () => {
      ins.$http
        .post("/StudentInformation/selectOneStudentUserInformation")
        .then((res) => {
          if (res.results) {
            Object.assign(info, res.results);
            console.log(Object.keys(info));
            
            info.avtarColor = info.sex ? "#f56a00" : "#1890ff";
          }
        });
    };
    onBeforeMount(() => {
      getPersonalInfo();
    });
    return {
      info,
    };
  },
};
</script>

<style lang="less" scoped>
.person_contaniner {
  width: 100%;
  .contant {
    width: calc(100% - 50%);
    min-height: calc(100vh - 44px);
    margin: 44px auto 0;
    background-color: white;
    .bg_img {
      width: 100%;
      height: 250px;
      overflow: hidden;
      img {
        width: 100%;
        transform: translateY(-20%);
      }
    }
    .personal_info_contant {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 20px;
      .avatar {
        height: 150px;
        margin-right: 10px;
        transform: translateY(-30%);
        :deep(.ant-avatar-string) {
          font-size: 36px;
        }
      }
      .infomation {
        padding: 0 20px;
        width: calc(100% - 150px);
      }
    }
  }
}
</style>