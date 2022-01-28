<template>
  <a-modal v-model:visible="show" title="审核" :footer="null">
    <a-form
      :model="state"
      :rules="rules"
      layout="vertical"
      @finish="handleFinish"
      ref="formRef"
    >
      <a-form-item label="审核意见" name="status"
        ><a-radio-group v-model:value="state.status">
          <a-radio :value="1">通过</a-radio>
          <a-radio :value="2">拒绝</a-radio>
        </a-radio-group></a-form-item
      >
      <a-form-item label="联系电话" name="phone">
        <a-input
          v-model:value="state.phone"
          placeholder="请输入电话"
          allowClear
        />
      </a-form-item>
      <a-form-item label="审核反馈" name="message">
        <a-textarea
          v-model:value="state.message"
          :row="5"
          placeholder="回复"
          allowClear
        />
      </a-form-item>
      <div
        :style="{
          width: '100%',
          textAlign: 'right',
          borderTop: '1px solid #ee9e9',
          padding: '10px 16px',
          background: '#fff',
        }"
      >
        <a-button style="margin-right: 8px" @click="handleCancel"
          >取消</a-button
        >
        <a-button type="primary" html-type="submit">提交</a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
export default {
  name: "AuditModal",
  props: ["show"],
  setup(_, { emit }) {
    const formRef = ref();
    const state = reactive({
      message: "",
      phone: "",
      status: 1,
    });
    const handleFinish = () => {
      emit("ok", state);
    };
    const handleCancel = () => {
      formRef.value.resetFields();
      emit("cancel");
    };
    let validatorPhone = async (_, value) => {
      if (state.status === 1) {
        if (value === "") {
          return Promise.reject("请输入手机号码");
        } else if (!/^1[2-9]\d{9}$/.test(value)) {
          return Promise.reject("手机号格式不正确");
        }
      }
      return Promise.resolve();
    };
    const rules = {
      phone: [{ validator: validatorPhone, trigger: "change" }],
      message: [{ required: true, message: "请输入审核回复！"}],
    };
    return {
      handleFinish,
      rules,
      state,
      handleCancel,
    };
  },
};
</script>
 
<style lang="less" scoped>
.ant-modal-content {
  .ant-modal-body {
    padding: 24px 24px 0 24px;
  }
}
</style>