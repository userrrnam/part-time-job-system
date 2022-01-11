<template>
  <div class="resiger_container">
    <div class="header">
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240); background: white;f"
        title="大学生兼职网"
        sub-title="注册账号!"
        @back="goBack"
      />
    </div>
    <a-form
      ref="formRef"
      name="custom-validation"
      class="register_form"
      :model="formState"
      :rules="rules"
      v-bind="layout"
      @finish="handleFinish"
      @validate="handleValidate"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item has-feedback label="Username" name="username">
        <a-input v-model:value="formState.username" autocomplete="off" />
      </a-form-item>
      <a-form-item has-feedback label="Password" name="pass">
        <a-input
          v-model:value="formState.pass"
          type="password"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item has-feedback label="Confirm" name="checkPass">
        <a-input
          v-model:value="formState.checkPass"
          type="password"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item has-feedback label="Age" name="age">
        <a-input-number v-model:value="formState.age" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
        <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "Register",
  setup() {
    const formRef = ref();
    const router = useRouter();
    const formState = reactive({
      username: "",
      pass: "",
      checkPass: "",
      age: undefined,
    });
    let checkAge = async (_rule, value) => {
      if (!value) {
        return Promise.reject("Please input the age");
      }
      if (!Number.isInteger(value)) {
        return Promise.reject("Please input digits");
      } else {
        if (value < 18) {
          return Promise.reject("Age must be greater than 18");
        } else {
          return Promise.resolve();
        }
      }
    };
    let validatePass = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("Please input the password");
      } else {
        if (formState.checkPass !== "") {
          formRef.value.validateFields("checkPass");
        }
        return Promise.resolve();
      }
    };
    let validatePass2 = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("Please input the password again");
      } else if (value !== formState.pass) {
        return Promise.reject("Two inputs don't match!");
      } else {
        return Promise.resolve();
      }
    };

    const rules = {
      pass: [{ required: true, validator: validatePass, trigger: "change" }],
      checkPass: [{ validator: validatePass2, trigger: "change" }],
      age: [{ validator: checkAge, trigger: "change" }],
    };
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    const handleFinish = (values) => {
      console.log(values, formState);
    };
    const handleFinishFailed = (errors) => {
      console.log(errors);
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    const handleValidate = (...args) => {
      console.log(args);
    };
    const goBack = () => {
      router.push("/user/login");
    };
    return {
      formState,
      formRef,
      rules,
      layout,
      handleFinishFailed,
      handleFinish,
      resetForm,
      handleValidate,
      goBack,
    };
  },
};
</script>

<style lang="less" scoped>
.resiger_container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .register_form {
    width: 100%;
    margin: 0 auto;
    height: calc(100% - 44px);
    background-color: white;
  }
}
</style>