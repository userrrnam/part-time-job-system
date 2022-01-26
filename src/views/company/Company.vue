<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <div class="user">
        <a-dropdown>
          <span class="ant-dropdown-link" @click.prevent>
            {{ companyName?.substr(0, 4) }}
            <DownOutlined />
          </span>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <span>个人信息</span>
              </a-menu-item>
              <a-menu-item>
                <span>退出登录</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider breakpoint="lg">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          :mode="mode"
          :theme="theme"
          @click="menuHandler"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-menu-item key="0">
            <template #icon>
              <MailOutlined />
            </template>
            首页
          </a-menu-item>
          <a-menu-item key="1">
            <template #icon>
              <MailOutlined />
            </template>
            职位管理
          </a-menu-item>
          <a-menu-item key="2">
            <template #icon>
              <CalendarOutlined />
            </template>
            申请管理
          </a-menu-item>
          <a-menu-item key="3">
            <template #icon>
              <AppstoreOutlined />
            </template>
            公司信息
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content
          :style="{ margin: '24px 16px 0', minHeight: 'calc(100vh - 138px)' }"
        >
            <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center;">
          爱兼职 2022 Created by Ai Jian Zhi
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { useRouter } from "vue-router";
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { reactive, toRefs, getCurrentInstance, onBeforeMount, ref } from "vue";
export default {
  name: "CompanyHome",
  components: {
    MailOutlined,
    DownOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },
  setup() {
    const router = useRouter();
    const companyName = ref();
    const state = reactive({
      mode: "inline",
      theme: "light",
      selectedKeys: ["0"],
    });
    const { proxy: ins } = getCurrentInstance();
    const getCompanyInfo = () => {
      ins.$http
        .post("/CompanyInformation/selectOneCompanyUserInformation")
        .then((res) => {
          if (res.results) {
            companyName.value = res.results.companyName;
          }
        });
    };
    onBeforeMount(() => {
      getCompanyInfo();
    });
    const menuHandler = (params) => {
      const { key } = params;
      switch (key) {
        case "0":
          router.push("/company/home");
          break;
        case "1":
          router.push("/company/jobManage");
          break;
        case "2":
          router.push("/company/applyManage");
          break;
        case "3":
          router.push("/company/companyInfo");
          break;
      }
    };
    return {
      companyName,
      ...toRefs(state),
      menuHandler,
    };
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 44px;
  .logo {
    float: left;
    width: 120px;
    height: 31px;
    line-height: 44px;
    margin: 16px 24px 16px 0;
    img {
      width: 100%;
      transform: translateY(-40%);
    }
  }
  .user {
    float: right;
    line-height: 44px;
    color: white;
    .ant-dropdown-link {
      display: inline-block;
      height: 44px;
    }
  }
}
</style>