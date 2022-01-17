<template>
  <div class="user_card_container">
    <div class="personal_contant">
      <div class="avatar">
        <a-avatar :size="58" style="background-color: #1890ff">
          <!-- <template #icon><UserOutlined /></template> -->
          {{ userInfo.name.substr(-2, 2) }}
        </a-avatar>
      </div>
      <div class="info">
        <div class="name">{{ userInfo.name }}</div>
        <div class="other">
          <span class="age">{{ userInfo.age }} 岁</span>
          <span class="line"></span>
          <img src="@/assets/man.png" v-if="!userInfo.sex" />
          <img src="@/assets/wuman.png" v-else />
        </div>
      </div>
    </div>
    <div class="last_login_time margin_top">
      <span class="title">上次登录时间： </span>
      <div class="time">{{ userInfo.lastTime }}</div>
    </div>
  </div>
  <div class="expact_position" @click="changeInfoHandler">
    <div class="title">
      <BulbOutlined style="color: rgb(244, 200, 7); marginright: 5px" />
      <span>求职期望</span>
    </div>
    <div class="contant">
      <div class="work_info">
        <span>{{ userInfo.occupation }}</span>
        <span class="line"></span>
        <span>{{ userInfo.calculate }}</span>
        <span class="line"></span>
        <span>{{ store.state.location }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { UserOutlined, BulbOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getCurrentInstance, onBeforeMount, reactive } from "vue";
export default {
  name: "UserCard",
  components: { UserOutlined, BulbOutlined },
  setup() {
    const { proxy: ins } = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const userInfo = reactive({
      name: "",
      age: "",
      sex: false,
      occupation: "",
      lastTime: "",
      calculate: "",
    });
    onBeforeMount(() => {
      ins.$http.post("/StudentHomePage/selectInformationHome").then((res) => {
        if (res.results) {
          const { name, age, sex, occupation, lastLoginTime, city, calculate } = res.results;
          userInfo.name = name;
          userInfo.age = age;
          userInfo.occupation = occupation;
          userInfo.lastTime = lastLoginTime;
          userInfo.sex = sex;
          userInfo.calculate = calculate;
          store.commit("saveUserInfo", userInfo);
          store.commit("saveCity", city);
        }
      });
    });
    const changeInfoHandler = () => {
      router.push("/user/person");
    };
    return {
      userInfo,
      store,
      changeInfoHandler,
    };
  },
};
</script>

<style lang='less'>
.user_card_container {
  min-width: 230px;
  height: 100%;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  .personal_contant {
    display: flex;
    align-items: center;
    .info {
      margin: 0 20px;
      .name {
        font-size: 16px;
      }
      .line {
        display: inline-block;
        width: 0;
        height: 10px;
        margin: 0 5px;
        border: 1px solid rgb(204, 204, 204);
      }
      img {
        display: inline-block;
        width: 16px;
        height: 16px;
      }
    }
  }
  .margin_top {
    margin-top: 20px;
  }
  .last_login_time {
    .title {
      font-size: 14px;
    }
    .time {
      margin-top: 10px;
      color: rgb(204, 204, 204);
    }
  }
}
.expact_position {
  padding: 20px;
  margin-top: 10px;
  cursor: pointer;
  background-color: white;
  border-radius: 8px;
  transition: all 0.1s ease-in;
  &:hover {
    background-color: rgb(250, 250, 250);
  }
  .title {
    font-size: 16px;
    span {
      margin-right: 5px;
    }
  }
  .contant {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;

    .work_info {
      span:nth-child(1) {
        margin-left: 0;
      }
      span {
        margin: 5px;
      }
      .line {
        display: inline-block;
        width: 0;
        height: 10px;
        margin: 0 5px;
        border: 1px solid rgb(204, 204, 204);
      }
    }
    .city {
      margin-left: 10px;
    }
  }
}
</style>