<template>
  <a-modal v-model:visible="show" title="验证" :footer="null">
    <a-form
      :model="form"
      @finish="handleFinish"
      v-if="!showForm"
      ref="emaiFormRef"
    >
      <a-form-item name="email" v-if="!validateFlag">
        <a-input
          style="
            box-shadow: none;
            border: none;
            border-bottom: 1px solid #e9e9e9;
          "
          v-model:value="form.email"
          placeholder="输入邮箱"
          @change="onChange"
          allowClear
        >
          <template #suffix>
            <span style="color: #ff4d4f" v-if="alert1">请输入邮箱</span>
            <span style="color: #ff4d4f" v-if="alert2">邮箱格式不正确</span>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="studentAccount" v-if="validateFlag">
        <a-input
          style="
            box-shadow: none;
            border: none;
            border-bottom: 1px solid #e9e9e9;
          "
          v-model:value="form.studentAccount"
          placeholder="输入注册账号"
          @change="onChange"
          allowClear
        >
          <template #suffix>
            <span style="color: #ff4d4f" v-if="alert1">请输入账号</span>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="code">
        <a-input
          v-model:value="form.code"
          allowClear
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
    <a-form
      :rules="rules"
      :model="form"
      @finish="changePassword"
      v-if="showForm"
      ref="formRef"
    >
      <a-form-item has-feedback label="新密码" name="password">
        <a-input-password
          v-model:value="form.password"
          autocomplete="off"
          placeholder="请输入新密码"
        />
      </a-form-item>
      <a-form-item has-feedback label="确认密码" name="checkPassword">
        <a-input-password
          v-model:value="form.checkPassword"
          autocomplete="off"
          placeholder="确认密码"
        />
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
        <a-button type="primary" html-type="submit">修改</a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { getCurrentInstance, watch } from "@vue/runtime-core";
import md5 from "js-md5";
import { message } from "ant-design-vue";
export default {
  name: "EmailModal",
  props: ["show", "validateFlag"],
  setup(props, { emit }) {
    let time = ref(60);
    const showForm = ref(false);
    const formRef = ref();
    const emaiFormRef = ref();
    let timer;
    const flag = ref(false);
    const alert1 = ref(false);
    const alert2 = ref(false);
    const { proxy: ins } = getCurrentInstance();
    const form = reactive({
      studentAccount: "",
      password: "",
      checkPassword: "",
      email: "",
      code: "",
    });

    const handleCancel = () => {
      if (showForm.value) {
        formRef.value.resetFields();
      }
      form.studentAccount = "";
      form.email = "";
      form.code = "";
      clearInterval(timer);
      alert1.value = false;
      alert2.value = false;
      flag.value = false;
      emit("cancel");
    };
    const handleFinish = () => {
      const { code, email, studentAccount } = form;
      if (props.validateFlag) {
        ins.$http
          .post("/LoginStudent/VerifySecurityCode", { code, studentAccount })
          .then((res) => {
            if (res?.results) {
              emit("ok");
              showForm.value = true;
            }
          });
      } else {
        if (form.code === "") {
          message.error("请输入验证码", 1);
        } else {
          ins.$http
            .post("/EmailSecurityCode/VerifySecurityCode", { code, email })
            .then((res) => {
              if (res?.results) {
                emaiFormRef.value.resetFields();
                flag.value = false;
                clearInterval(timer);
                emit("ok");
                emit("saveEmail", email);
              }
            });
        }
      }
    };
    const validatorEmail = () => {
      if (props.validateFlag) {
        if (form.studentAccount === "") {
          alert1.value = true;
        }
      } else {
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
      }
    };
    const getCode = () => {
      validatorEmail();
      if (props.validateFlag) {
        if (!alert1.value) {
          flag.value = true;
          ins.$http
            .post("/LoginStudent/forgetPassword", {
              studentAccount: form.studentAccount,
            })
            .then((res) => {
              if (!res) {
                clearInterval(timer);
                flag.value = false;
              }
            });
        }
      } else {
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
      }
    };
    const onChange = () => {
      if (props.validateFlag) {
        if (form.studentAccount) {
          alert1.value = false;
        }
      } else {
        if (form.email) {
          alert1.value = false;
        }
      }
    };
    watch(
      () => flag.value,
      () => {
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
    let validateNewPassword = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("请输入密码");
      } else if (form.checkPassword !== "") {
        formRef.value.validateFields("checkpassword");
      } else if (value.length > 8 || value.length < 4) {
        return Promise.reject("密码长度不符合规则，建议4-8个字符");
      }
      return Promise.resolve();
    };
    let validatepassword2 = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("请输入确认密码");
      } else if (value !== form.password) {
        return Promise.reject("两次输入密码不匹配");
      } else {
        return Promise.resolve();
      }
    };
    const rules = {
      password: [
        { required: true, validator: validateNewPassword, trigger: "change" },
      ],
      checkPassword: [
        { required: true, validator: validatepassword2, trigger: "change" },
      ],
    };
    const changePassword = () => {
      const { studentAccount, password } = form;
      ins.$http
        .post("/LoginStudent/updatePassword ", {
          studentAccount,
          password: md5(password),
        })
        .then((res) => {
          if (res?.results) {
            formRef.value.resetFields();
            emit("closeModal");
            message.success("修改密码成功", 1);
          }
        });
    };
    return {
      handleCancel,
      handleFinish,
      changePassword,
      emaiFormRef,
      form,
      showForm,
      formRef,
      getCode,
      onChange,
      alert1,
      alert2,
      rules,
      flag,
      time,
    };
  },
};
</script>

<style>
</style>