<template>
  <a-modal v-model:visible="show" title="邮箱验证" :footer="null">
    <a-form :model="form" @finish="handleFinish">
      <a-form-item name="email">
        <a-input
          style="
            box-shadow: none;
            border: none;
            border-bottom: 1px solid #e9e9e9;
          "
          v-model:value="form.email"
          placeholder="邮箱"
          @change="onChange"
          allowClear
        >
          <template #suffix>
            <span style="color: #ff4d4f" v-if="alert1">请输入邮箱</span>
            <span style="color: #ff4d4f" v-if="alert2">邮箱格式不正确</span>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="code">
        <a-input
          v-model:value="form.code"
          style="
            box-shadow: none;
            border: none;
            border-bottom: 1px solid #e9e9e9;
          "
          placeholder="请输入验证码"
        >
          <template #suffix>
            <a @click="getCode" v-if="!flag">获取验证码</a>
            <span style="color: #808080" v-else
              >重新发送验证码 {{ time }} s</span
            >
          </template>
        </a-input>
      </a-form-item>
      <div
        :style="{
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <a-button style="margin-right: 8px" @click="handleCancel"
          >取消</a-button
        >
        <a-button type="primary" html-type="submit">验证</a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { getCurrentInstance, watch } from "@vue/runtime-core";
export default {
  name: "EmailModal",
  props: ["show"],
  setup(_, { emit }) {
    let time = ref(60);
    const flag = ref(false);
    const alert1 = ref(false);
    const alert2 = ref(false);
    const { proxy: ins } = getCurrentInstance();
    const form = reactive({
      email: "",
      code: "",
    });

    const handleCancel = () => {
      flag.value = false;
      emit("cancel");
    };
    const handleFinish = () => {
      const { code, email } = form;
      ins.$http
        .post("/EmailSecurityCode/VerifySecurityCode", { code, email })
        .then((res) => {
          console.log(res);
        });
      emit("ok");
    };
    const validatorEmail = () => {
      if (form.email === "") {
        alert1.value = true;
        alert2.value = false;
      } else if (
        !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
          form.email
        )
      ) {
        alert1.value = false;
        alert2.value = true;
      } else {
        alert1.value = false;
        alert2.value = false;
      }
    };
    const getCode = () => {
      validatorEmail();
      if (!alert1.value && !alert2.value) {
        flag.value = true;
        ins.$http
          .post("/EmailSecurityCode/sendEmailSecurityCode", {
            email: form.email,
          })
          .then((res) => {
            console.log(res);
          });
      }
    };
    const onChange = () => {
      if (form.email) {
        alert1.value = false;
      }
    };
    watch(
      () => flag.value,
      () => {
        let timer;
        if (flag.value) {
          timer = setInterval(() => {
            if (time.value === 0) {
              flag.value = false;
              clearInterval(timer);
              time.value = 60;
            } else {
              time.value--;
            }
          }, 1000);
        }
      }
    );
    return {
      handleCancel,
      handleFinish,
      form,
      getCode,
      onChange,
      alert1,
      alert2,
      flag,
      time,
    };
  },
};
</script>

<style>
</style>