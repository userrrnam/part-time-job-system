<template>
  <div class="modal_wrapper">
    <div>
      <a-modal v-model:visible="visible" title="Basic Modal" @cancel="handleCance" closable :footer="null">
        <p>Some contents...</p>
        <p>Some contents...</p>
      </a-modal>
    </div>
  </div>
</template>

<script>
export default {
  props: ["visible", 'content'],
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