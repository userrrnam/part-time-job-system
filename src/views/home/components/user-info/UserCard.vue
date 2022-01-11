<template>
  <div class="user_card_container">
    <div class="personal_contant">
      <div class="avatar">
        <a-avatar :size="58" style="background-color: #1890ff">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </div>
      <div class="info">
        <div class="name">何灿</div>
        <div class="other">
          <span class="age">11岁</span>
          <span class="line"></span>
          <span class="sex">男</span>
        </div>
      </div>
    </div>
    <div class="last_login_time margin_top">
      <span class="title">上次登录时间： </span>
      <div class="time">2021-10-30 14:24</div>
    </div>
    <div class="expact_position margin_top">
      <div class="title">求职期望</div>
      <div class="contant">
        <div class="work_info">
          <span>Java</span>
          <span>4000以上</span>
        </div>
        <div class="city">成都</div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserOutlined } from "@ant-design/icons-vue";
export default {
  name: "UserCard",
  components: { UserOutlined },
  setup() {
    return {};
  },
};
</script>

<style lang='less'>
.user_card_container {
  min-width: 200px;
  max-width: 400px;
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
        letter-spacing: 0.3rem;
        font-size: 16px;
      }
      .line {
        display: inline-block;
        width: 0;
        height: 10px;
        margin: 0 5px;
        border: 1px solid rgb(204, 204, 204);
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
        span:nth-child(2) {
          margin-left: 20px;
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