<template>
  <router-view />
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  touch-action: pan-y;
}
body {
  overflow-x: hidden;
}
#app {
  width: 100vw;
  background: rgba(245, 245, 245);
}
</style>
