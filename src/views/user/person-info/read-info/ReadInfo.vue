<template>
  <div><span>姓名：</span>{{ info.name }}</div>
  <a-divider />
  <div><span>性别：</span>{{ info.sex === "0" ? "女" : "男" }}</div>
  <a-divider />
  <div><span>年龄：</span>{{ info.age }}</div>
  <a-divider />
  <div><span>电话：</span>{{ info.phone }}</div>
  <a-divider />
  <div><span>个人邮箱：</span>{{ info.email }}</div>
  <a-divider />
  <div><span>期望职业类型：</span>{{ info.occupation }}</div>
  <a-divider />
  <div><span>期望结算类型：</span>{{ info.calculate }}</div>
  <a-divider />
  <div><span>期望城市：</span> {{ cityName }}</div>
  <a-divider />
  <div><span>个人介绍：</span>{{ info.details ? info.details : "无" }}</div>
</template>

<script>
export default {
  name: "ReadInfo",
  props: ["info", "cityName"],
  setup() {},
};
</script>

<style scoped>
span {
  font-weight: 600;
}
</style>