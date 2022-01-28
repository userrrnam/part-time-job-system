<template>
  <a-modal v-model:visible="showModal" title="申请详情" class="modal">
    <div><span>申请人：</span>{{ applyDetails?.name }}</div>
    <div><span>年龄：</span>{{ applyDetails?.age }} 岁</div>
    <div><span>电话：</span>{{ applyDetails?.phone }}</div>
    <div><span>邮箱：</span>{{ applyDetails?.email }}</div>
    <div><span>申请职位：</span>{{ applyDetails?.jobName }}</div>
    <div><span>申请时间：</span>{{ applyDetails?.createTime }}</div>
    <div><span>职位所在城市：</span>{{ applyDetails?.jobCity }}</div>
    <div><span>期望城市：</span>{{ applyDetails?.city }}</div>
    <div><span>个人介绍：</span>{{ applyDetails?.details }}</div>
    <template #footer>
      <a-button type="primary" @click="handleOk">确认</a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  name: "ApplyModal",
  props: ["showModal", "applyDetails"],
  setup(_, { emit }) {
    const handleOk = () => {
      emit("ok");
    };
    const handleCancel = () => {
      meit("cancel");
    };
    return {
      handleOk,
      handleCancel,
    };
  },
};
</script>

<style lang='less' scoped>
.ant-modal-body {
  div:not(:nth-child(1)) {
    margin: 20px 0;
  }
  span {
    font-weight: 600;
  }
}
</style>