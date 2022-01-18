<template>
  <router-view />
</template>
<script>
import { useStore } from "vuex";
export default {
  name: "App",
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
body {
  overflow-x: hidden;
}
#app {
  width: 100vw;
  background: rgba(245, 245, 245);
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(30px);
    opacity: 0;
  }
  .down-up-enter-active {
    transition: all 0.3s ease-out;
  }

  .down-up-leave-active {
    transition: all 0.3s ease-out;
  }

  .down-up-enter-from,
  .down-up-leave-to {
    transform: translateY(-44px);
    opacity: 0;
  }
}
</style>
