<template>
  <div class="user_card_container">
    <div class="personal_contant">
      <div class="avatar">
        <a-avatar :size="58" style="background-color: #1890ff" >
          <!-- <template #icon><UserOutlined /></template> -->
          {{ userInfo.name.substr(-2, 2) }}
        </a-avatar>
      </div>
      <div class="info">
        <div class="name">{{ userInfo.name }}</div>
        <div class="other">
          <span class="age">{{ userInfo.age }} 岁</span>
          <span class="line"></span>
          <img src="@/assets/man.png" v-if="!userInfo.sex">
          <img src="@/assets/wuman.png" v-else>
        </div>
      </div>
    </div>
    <div class="last_login_time margin_top">
      <span class="title">上次登录时间： </span>
      <div class="time">{{ userInfo.lastTime }}</div>
    </div>
    <div class="expact_position margin_top">
      <div class="title">求职期望</div>
      <div class="contant">
        <div class="work_info">
          <span>{{ userInfo.occupation }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserOutlined } from "@ant-design/icons-vue";
import { useStore } from 'vuex'
import { getCurrentInstance, onBeforeMount, reactive } from "vue";
export default {
  name: "UserCard",
  components: { UserOutlined },
  setup() {
    const { proxy: ins } = getCurrentInstance();
    const store = useStore();
    const userInfo = reactive({
      name: "",
      age: "",
      sex: false,
      occupation: "",
      lastTime: "",
    });
    onBeforeMount(() => {
      ins.$http.post("/StudentHomePage/selectInformationHome").then((res) => {
        if (res.results) {
          const { name, age, sex, occupation, lastLoginTime } = res.results;
          userInfo.name = name;
          userInfo.age = age;
          userInfo.occupation = occupation;
          userInfo.lastTime = lastLoginTime;
          userInfo.sex = sex;
          store.commit("saveUserInfo", userInfo);
        }
      });
    });
    return {
      userInfo,
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
        width: 14px;
        height: 14px;
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
  .expact_position {
    .title {
      font-size: 16px;
    }
    .contant {
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
      .work_info {
        span {
          color: #ff8a00;
        }
      }
      .city {
        margin-left: 10px;
      }
    }
  }
}
</style>