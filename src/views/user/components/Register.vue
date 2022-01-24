<template>
  <a-drawer
    title="创建一个新的账号"
    :width="720"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
    :closable="false"
  >
    <a-form
      :model="form"
      :rules="rules"
      layout="vertical"
      ref="formRef"
      v-if="!results"
      @finish="handleFinish"
    >
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="学生账号" name="studentAccount">
            <a-input
              v-model:value="form.studentAccount"
              allowClear
              placeholder="请输入用户名"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="性别" name="sex">
            <a-select placeholder="请选择性别" v-model:value="form.sex">
              <a-select-option value="0">男</a-select-option>
              <a-select-option value="1">女</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="年龄" name="age">
            <a-input-number v-model:value="form.age" :min="1" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item has-feedback label="密码" name="password">
            <a-input-password
              v-model:value="form.password"
              autocomplete="off"
              placeholder="请输入密码"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item has-feedback label="确认密码" name="checkpassword">
            <a-input-password
              v-model:value="form.checkpassword"
              autocomplete="off"
              placeholder="确认密码"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="期望工作城市" name="city">
            <a-cascader
              v-model:value="form.city"
              :options="options"
              placeholder="选择期望城市"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="结算类型" name="calculate">
            <a-select
              placeholder="请选择结算类型"
              v-model:value="form.calculate"
            >
              <a-select-option
                :value="item"
                v-for="(item, index) in calculateOptions"
                :key="index"
                >{{ item }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="真实姓名" name="name">
            <a-input v-model:value="form.name" placeholder="请输入真实姓名" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="电话" name="phone">
            <a-input v-model:value="form.phone" placeholder="请输入电话" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="邮箱" name="email">
            <a-input v-model:value="form.email" placeholder="请输入邮箱" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="期望工作类型" name="occupation">
            <a-select
              placeholder="请选择职业类型"
              v-model:value="form.occupation"
            >
              <a-select-option
                :value="item.value"
                v-for="(item, index) in jobType"
                :key="index"
                >{{ item.value }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="个人介绍" name="details">
            <a-textarea
              v-model:value="form.details"
              :rows="4"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
        <a-button type="primary" html-type="submit">注册</a-button>
      </div>
    </a-form>
    <a-result
      v-if="results"
      status="success"
      title="账号创建成功!"
      sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    >
      <template #extra>
        <a-button type="primary" @click="goLogin">去登录</a-button>
      </template>
    </a-result>
  </a-drawer>
</template>

<script>
import { reactive, inject, ref, getCurrentInstance } from "vue";
import { useConsteEffect } from "@/views/home/components/banner/hooks.js";
import options from "@/util/cascader-address-options.js";
import md5 from 'js-md5';
export default {
  name: "Register",
  setup() {
    const formRef = ref();
    const visible = inject("visible");
    const { proxy: ins } = getCurrentInstance();
    const { jobType } = useConsteEffect();
    const results = ref(false);
    const form = reactive({
      //学生账号
      studentAccount: "",
      //真实姓名
      name: "",
      //性别
      sex: "0",
      //邮箱
      email: "",
      //电话
      phone: "",
      //密码
      password: "",
      //年龄
      age: "",
      //确认密码
      checkpassword: "",
      city: [],
      //结算方式
      calculate: "日结",
      //职业选择
      occupation: "",
      //个人介绍
      details: "",
    });
    const calculateOptions = reactive(["日结", "周结", "月结"]);
    let validatepassword = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("请输入密码");
      } else if (form.checkpassword !== "") {
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
    let validatorName = async (_, value) => {
      if (value === "") {
        return Promise.reject("请输入用户名");
      } else {
        return ins.$http
          .post("/RegisterStudentUser/selectByStudentAccount", {
            studentAccount: form.studentAccount,
          })
          .then((res) => {
            if (res.results) {
              return Promise.reject("该账户已存在");
            }
            return Promise.resolve();
          });
      }
    };
    let validatorPhone = async (_, value) => {
      if (value === "") {
        return Promise.reject("请输入手机号码");
      } else if (!/^1[2-9]\d{9}$/.test(value)) {
        return Promise.reject("手机号格式不正确");
      }
      return Promise.resolve();
    };
    const rules = {
      studentAccount: [
        { required: true, validator: validatorName, trigger: "blur" },
      ],
      password: [
        { required: true, validator: validatepassword, trigger: "change" },
      ],
      checkpassword: [
        { required: true, validator: validatepassword2, trigger: "change" },
      ],
      city: [{ required: true, message: "请选择城市" }],
      sex: [{ required: true, message: "请选择性别" }],
      calculate: [{ required: true, message: "请选择结算类型" }],
      occupation: [{ required: true, message: "请选择工作类型" }],
      age: [{ required: true, message: "请输入年龄" }],
      phone: [{ required: true, validator: validatorPhone, trigger: "change" }],
      email: [{ type: "email", message: "不是有效的电子邮件" }],
      name: [{ required: true, message: "请输入真实姓名" }],
    };
    const onClose = () => {
      formRef.value.resetFields();
      visible.value = false;
    };
    const goLogin = () => {
      visible.value = false;
    }
    const handleFinish = () => {
      delete form.checkpassword;
      const { city, sex, occupation,password, ...res } = form;
      const state = {
        city: city[city.length - 1],
        sex: sex === "0" ? false : true,
        password: md5(password),
        occupation: occupation === "不限" ? "" : occupation,
        ...res,
      };
      ins.$http.post("/RegisterStudentUser/insertOneStudnetUser", state).then(
        (res) => {
          console.log(res);
          results.value = true;
        },
        (err) => {
          results.value = false;
          throw new Error(err);
        }
      );
    };
    return {
      form,
      rules,
      visible,
      formRef,
      goLogin,
      onClose,
      visible,
      results,
      options,
      calculateOptions,
      jobType,
      handleFinish,
    };
  },
};
</script>

<style lang='less' scoped>
</style>