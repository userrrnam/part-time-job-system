<template>
  <a-modal
    v-model:visible="visible"
    title="修改密码"
    :footer="null"
    @cancel="handleCancel"
    :zIndex="999999"
  >
    <a-form
      :model="passwordParams"
      :rules="rules"
      layout="vertical"
      ref="formRef"
      @finish="handleFinish"
    >
      <a-form-item has-feedback label="原密码" name="password">
        <a-input-password
          v-model:value="passwordParams.password"
          autocomplete="off"
          placeholder="请输入原密码"
        />
      </a-form-item>
      <a-form-item has-feedback label="新密码" name="newPassword">
        <a-input-password
          v-model:value="passwordParams.newPassword"
          autocomplete="off"
          :disabled="disabled"
          placeholder="请输入新密码"
        />
      </a-form-item>
      <a-form-item has-feedback label="确认新密码" name="checkpassword">
        <a-input-password
          v-model:value="passwordParams.checkpassword"
          autocomplete="off"
          :disabled="disabled"
          placeholder="确认新密码"
        />
      </a-form-item>
      <div class="footer">
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" html-type="submit">修改</a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script>
import { getCurrentInstance, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { removeToken } from "@/util/storage.js";
import { message } from "ant-design-vue";
import md5 from "js-md5";
export default {
  name: "PassWord",
  props: ["visible"],
  setup(_, { emit }) {
    const { proxy: ins } = getCurrentInstance();
    const formRef = ref();
    const router = useRouter();
    const disabled = ref(true);
    //修改密码
    const passwordParams = reactive({
      password: "",
      newPassword: "",
      checkpassword: "",
    });
    let validatepassword = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("请输入原密码");
      } else {
        return ins.$http
          .post("/StudentInformation/selectPassword", {
            password: md5(passwordParams.password),
          })
          .then((res) => {
            if (res.results === 1) {
              disabled.value = false;
              return Promise.resolve();
            } else {
              disabled.value = true;
              return Promise.reject("密码错误，请重试！");
            }
          });
      }
    };
    let validateNewPassword = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("请输入密码");
      } else if (passwordParams.checkpassword !== "") {
        formRef.value.validateFields("checkpassword");
      } else if (value.length > 8 || value.length < 4) {
        return Promise.reject("密码长度不符合规则，建议4-8个字符");
      }
      return Promise.resolve();
    };
    let validatepassword2 = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("请输入确认密码");
      } else if (value !== passwordParams.newPassword) {
        return Promise.reject("两次输入密码不匹配");
      } else {
        return Promise.resolve();
      }
    };
    const rules = {
      password: [
        { required: true, validator: validatepassword, trigger: "change" },
      ],
      newPassword: [
        { required: true, validator: validateNewPassword, trigger: "change" },
      ],
      checkpassword: [
        { required: true, validator: validatepassword2, trigger: "change" },
      ],
    };

    const handleCancel = () => {
      formRef.value.resetFields();
      disabled.value = true;
      emit("closeModal");
    };
    const handleFinish = () => {
      ins.$http
        .post("/StudentInformation/updateStudentInformation", {
          password: md5(passwordParams.newPassword),
        })
        .then((_) => {
          message.success("密码修改成功", 1);
          removeToken();
          emit("closeModal");
          setTimeout(() => {
            router.replace("/user/login");
            message.error("密码已更新，请重新登录!");
          }, 2000);
        });
    };
    return {
      passwordParams,
      formRef,
      disabled,
      rules,
      handleFinish,
      handleCancel,
    };
  },
};
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  text-align: center;
  button {
    margin: 0 10px;
  }
}
</style>