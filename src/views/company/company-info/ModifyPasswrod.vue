<template>
  <div class="modify_container">
    <div class="title">修改密码</div>
    <div class="info">
      <a-form
        layout="vertical"
        :model="form"
        @finish="handleFinish"
        ref="formRef"
        :rules="rules"
      >
        <a-col :span="8">
          <a-form-item has-feedback label="原密码" name="oldPassword">
            <a-input-password
              v-model:value="form.oldPassword"
              placeholder="请输入原密码"
              allowClear
              autocomplete="off"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item has-feedback label="新密码" name="newPassword">
            <a-input-password
              v-model:value="form.newPassword"
              placeholder="请输入原密码"
              autocomplete="off"
              :disabled="!flag"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item has-feedback label="原密码" name="checkPassword">
            <a-input-password
              v-model:value="form.checkPassword"
              placeholder="请输入原密码"
              :disabled="!flag"
              autocomplete="off"
            />
          </a-form-item>
        </a-col>
        <a-button type="primary" html-type="submit">修改</a-button>
      </a-form>
    </div>
  </div>
</template>

<script>
import { reactive, getCurrentInstance, ref } from "vue";
import { message } from "ant-design-vue";
import md5 from "js-md5";
export default {
  name: "ModifyPasswrod",
  setup() {
    const formRef = ref();
    const flag = ref(false);
    const { proxy: ins } = getCurrentInstance();
    const form = reactive({
      oldPassword: "",
      newPassword: "",
      checkPassword: "",
    });
    const handleFinish = () => {
      const { newPassword } = form;
      ins.$http
        .post("/CompanyInformation/updateCompanyInformation", {
          password: md5(newPassword),
        })
        .then((res) => {
          if (res.results) {
            message.success("修改成功", 1);
            formRef.value.resetFields();
            flag.value = false;
          }
        });
    };
    let validateOldPassword = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("请输入原密码");
      } else {
        return ins.$http
          .post("/CompanyInformation/selectPassword", {
            password: md5(form.oldPassword),
          })
          .then((res) => {
            if (res.results) {
              flag.value = true;
              return Promise.resolve();
            }
            flag.value = false;
            return Promise.reject("密码错误");
          });
      }
    };
    let validatepassword = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("请新输入密码");
      } else if (form.checkPassword !== "") {
        formRef.value.validateFields("checkPassword");
      } else if (value.length > 8 || value.length < 4) {
        return Promise.reject("密码长度不符合规则，建议4-8个字符");
      }
      return Promise.resolve();
    };
    let validatepassword2 = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("请输入确认密码");
      } else if (value !== form.newPassword) {
        return Promise.reject("两次输入密码不匹配");
      } else {
        return Promise.resolve();
      }
    };
    const rules = {
      oldPassword: [
        { required: true, validator: validateOldPassword, trigger: "change" },
      ],
      newPassword: [
        { required: true, validator: validatepassword, trigger: "change" },
      ],
      checkPassword: [
        { required: true, validator: validatepassword2, trigger: "change" },
      ],
    };
    return {
      form,
      handleFinish,
      formRef,
      flag,
      rules,
    };
  },
};
</script>

<style lang="less" scoped>
.modify_container {
  .title {
    font-size: 20px;
  }
  .info {
    margin-top: 40px;
  }
}
</style>