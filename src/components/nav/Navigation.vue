<template>
  <div class="nav_container">
    <img class="logo" src="@/assets/e08da34488b114bd4c665ba2fa520a31.svg"/>
    <div class="contant">
      <div class="left">
        <span>首页</span>
      </div>
      <div class="right">

        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            Hover me
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">个人信息</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">我的申请</a>
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
export default {
  name: "Navigation",
  components: {
    DownOutlined,
  },
  setup() {},
};
</script>

<style lang="less" scoped>
.nav_container {
  width: 100%;
  height: 44px;
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
    margin-left: 10px;
  }
}
</style>