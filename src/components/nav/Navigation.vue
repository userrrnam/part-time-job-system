<template>
  <div class="nav_container">
    <img class="logo" src="@/assets/e08da34488b114bd4c665ba2fa520a31.svg" />
    <div class="contant">
      <div class="left">
        <span>首页</span>
      </div>
      <div class="right">
        <a-avatar style="color: #f56a00; background-color: #fde3cf">U</a-avatar>
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            Hover me
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item v-for="item in menu" :key="item.key">
                <a @click="changeHandler(item.key)">{{ item.name }}</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { DownOutlined } from "@ant-design/icons-vue";
import { removeToken } from "@/util/storage.js";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { reactive } from "@vue/reactivity";
export default {
  name: "Navigation",
  components: {
    DownOutlined,
  },
  setup() {
    const router = useRouter();
    const menu = reactive([
      {
        key: "01",
        name: "个人信息",
      },
      {
        key: "02",
        name: "我的申请",
      },
      {
        key: "03",
        name: "退出登录",
      },
    ]);
    const changeHandler = (value) => {
      switch (value) {
        case "01":
          router.push("/user/person");
          break;
        case "02":
          router.push("/user/apply");
          break;
        case "03":
          removeToken();
          setTimeout(() => {
            router.replace("/user/login");
            message.success("退出成功", 1);
          }, 500);
          break;
      }
    };
    return {
      menu,
      changeHandler,
    };
  },
};
</script>

<style lang="less" scoped>
.nav_container {
  width: 100%;
  height: 44px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: white;
  border-bottom: 1px solid rgb(245, 245, 245);
  .logo {
    position: absolute;
    top: 1%;
    left: 5%;
  }
  .contant {
    width: calc(100% - 40%);
    height: 100%;
    margin: 0 auto;
    display: flex;
    background-color: white;
    justify-content: space-between;
    align-items: center;
  }
  .left {
    position: relative;
    font-size: 16px;
    span {
      margin-left: 20px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-dropdown-link {
    color: #000;
    margin-left: 10px;
  }
}
</style>