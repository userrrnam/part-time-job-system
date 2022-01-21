<template>
  <div class="breadcrumb">
    <a-breadcrumb>
      <a-breadcrumb-item @click="goHome" style="cursor: pointer"
        >爱兼职</a-breadcrumb-item
      >
      <a-breadcrumb-item>
          <slot name="title"></slot>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: "BreakCrumb",
  setup() {
      const router = useRouter();
      const goHome = () => {
          router.push("/home");
      }
      return {
          goHome
      }
  }
};
</script>

<style lang="less" scoped>
.breadcrumb {
  height: 44px;
  margin-top: 44px;
  background: white;
  .ant-breadcrumb {
    width: calc(100% - 40%);
    line-height: 44px;
    margin: 0 auto;
  }
}
</style>