<template>
  <div class="nav_container">
    <div class="contant">
      <div class="left">
        <img class="logo" src="@/assets/logo.png" />
      </div>
      <div class="right">
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            <UserOutlined style="fontsize: 22px; color: white; marginRight: 5px" />
            <CaretDownOutlined
              style="fontsize: 12px; color: white;"
            />
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
import { useStore } from "vuex";
import { reactive } from "@vue/reactivity";
import { UserOutlined, CaretDownOutlined } from "@ant-design/icons-vue";
export default {
  name: "Navigation",
  components: {
    DownOutlined,
    CaretDownOutlined,
    UserOutlined,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
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
      store,
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
  box-shadow: 0 0 10px rgb(0 0 0 / 15%);
  color: white;
  background-color: rgb(36, 41, 47);
  overflow: hidden;
  .contant {
    width: calc(100% - 40%);
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .left {
    position: relative;
    font-size: 16px;
    .logo {
      cursor: pointer;
      position: relative;
      width: 200px;
      color: white;
      left: -20%;
    }
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