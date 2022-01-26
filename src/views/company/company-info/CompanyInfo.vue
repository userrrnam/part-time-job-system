<template>
  <div class="company_container">
    <div class="left_menu">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        :mode="mode"
        :theme="theme"
        @click="menuHandler"
        :style="{ height: '100%', borderRight: 0, width: '240px' }"
      >
        <a-menu-item key="0"> 基本信息 </a-menu-item>
        <a-menu-item key="1"> 密码管理 </a-menu-item>
      </a-menu>
    </div>
    <div class="right_contant">
      <BaseInfo v-if="!flag" />
      <ModifyPassword v-if="flag" />
    </div>
  </div>
</template>

<script>
import { toRefs, reactive, ref } from "vue";
import BaseInfo from "./BaseInfo.vue";
import ModifyPassword from "./ModifyPasswrod.vue";
export default {
  name: "CompnayInfo",
  components: { BaseInfo, ModifyPassword },
  setup() {
    const state = reactive({
      mode: "inline",
      theme: "light",
      selectedKeys: ["0"],
    });
    const flag = ref(false);
    const menuHandler = (params) => {
      const { key } = params;
      switch (key) {
        case "0":
          flag.value = false;
          break;
        case "1":
          flag.value = true;
          break;
      }
    };
    return {
      menuHandler,
      flag,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
.company_container {
  display: flex;
  height: 100%;
  padding: 16px 0;
  background: white;
  margin-bottom: 10px;
  .left_menu {
    height: 100%;
    border-right: 1px solid #f0f0f0;
  }
  .right_contant {
    width: 100%;
    padding: 0 40px;
  }
}
</style>