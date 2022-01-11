<template>
  <div class="footer_container">
      <span>联系方式: 123994324</span>
      <span>官方客服： 2324-234-23412</span>
  </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style lang="less" scoped>
    .footer_container{
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(40, 43, 45);
        color: white;
        span {
            margin: 0 20px;
        }
    }
</style>