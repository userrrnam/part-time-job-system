<template>
  <div class="modal_wrapper">
    <div>
      <a-modal v-model:visible="visible" :title="title" @cancel="handleCance" closable :footer="null">
        <slot name="content"></slot>
        <p>{{content}}</p>
      </a-modal>
    </div>
  </div>
</template>

<script>
export default {
  props: ["visible", 'content', 'title'],
  setup(_, { emit }) {
    const handleCance = () => {
      emit("closeModal");
    };
    return {
      handleCance,
    };
  },
};
</script>
<style lang="less" scoped>
</style>