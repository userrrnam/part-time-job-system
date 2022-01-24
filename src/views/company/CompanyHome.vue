<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" />
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
          <div style="minheight: 90vh">
            <router-view />
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
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
  SettingOutlined,
} from "@ant-design/icons-vue";
import { reactive, toRefs } from "vue";
export default {
  name: "CompanyHome",
  components: {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      mode: "inline",
      theme: "light",
      selectedKeys: ["0"],
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
    margin: 16px 24px 16px 0;
    img {
      width: 100%;
      transform: translateY(-40%);
    }
  }
}
</style>