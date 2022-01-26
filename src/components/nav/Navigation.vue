<template>
  <div class="nav_container">
    <div class="contant">
      <div class="left">
        <img class="logo" src="@/assets/logo.png" @click="goHome()" />
      </div>
      <slot name="mid"></slot>
      <div class="search_job">
        <a-input-search
          v-model:value="searchValue"
          placeholder="搜索职位"
          @search="onSearch"
          allowClear
        />
      </div>
      <div class="right">
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            <UserOutlined
              style="font-size: 22px; color: white; margin-right: 5px"
            />
            <CaretDownOutlined style="font-size: 12px; color: white" />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item
                v-for="item in menu"
                :key="item.key"
                @click="changeHandler(item.key)"
              >
                {{ item.name }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { removeToken } from "@/util/storage.js";
import { message, Modal } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { reactive, ref, getCurrentInstance, createVNode } from "vue";
import {
  UserOutlined,
  CaretDownOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
export default {
  name: "Navigation",
  components: {
    CaretDownOutlined,
    UserOutlined,
    ExclamationCircleOutlined,
  },
  setup() {
    const searchValue = ref();
    const router = useRouter();
    const store = useStore();
    const { proxy: ins } = getCurrentInstance();
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
          Modal.confirm({
            title: "提示",
            icon: createVNode(ExclamationCircleOutlined),
            content: "是否退出登录？",
            okText: "确认",
            cancelText: "取消",
            onOk: () => {
              removeToken();
              setTimeout(() => {
                router.replace("/user/login");
                message.success("退出成功", 1);
              }, 500);
            }
          });
          break;
      }
    };
    const goHome = () => {
      router.push("/home");
    };
    const onSearch = () => {
      if (router.currentRoute.value.fullPath !== "/home") {
        router.push("/home");
      }
      ins.$http
        .post("/StudentHomePage/selectCompanyByCondition", {
          jobName: searchValue.value,
          page: 1,
          size: 8,
        })
        .then((res) => {
          store.commit("saveJobList", res.results);
        });
    };
    return {
      menu,
      onSearch,
      store,
      goHome,
      searchValue,
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
  .search_job {
    .ant-input-search {
      width: 400px;
      border-radius: 15px;
      &:hover {
        border: 1px solid #000;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .anticon-user {
    font-size: 18px;
    margin-right: 5px;
  }
}
</style>