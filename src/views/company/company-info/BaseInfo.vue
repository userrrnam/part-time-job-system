<template>
  <div class="base_container">
    <div class="title">基本信息</div>
    <div class="info">
      <a-form
        :model="form"
        :rules="rules"
        layout="vertical"
        @finish="handleFinish"
      >
        <a-col :span="12">
          <a-form-item label="公司名称" name="companyName">
            <span>{{ form.companyName }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="公司账号">
            <span>{{ form.companyAccount }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="公司邮箱" name="email">
            <a-input
              v-model:value="form.email"
              placeholder="请输入公司邮箱"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="公司地址" name="address">
            <a-input
              v-model:value="form.address"
              placeholder="请输入公司名称"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="公司简介" name="details">
            <a-textarea
              v-model:value="form.details"
              autoSize
              allowClear
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <div>
          <a-button type="primary" html-type="submit">修改</a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onBeforeMount, reactive } from "vue";
import { message } from 'ant-design-vue'
export default {
  name: "BaseInfo",
  setup() {
    const { proxy: ins } = getCurrentInstance();
    const form = reactive({});
    const getCompanyInfo = () => {
      ins.$http
        .post("/CompanyInformation/selectOneCompanyUserInformation")
        .then((res) => {
          if (res.results) {
            Object.assign(form, res.results);
          }
        });
    };
    onBeforeMount(() => {
      getCompanyInfo();
    });
    const handleFinish = () => {
      const { email, details, address } = form;
      ins.$http
        .post("/CompanyInformation/updateCompanyInformation", {
          email,
          details,
          address, 
        })
        .then((res) => {
          if (res.results) {
            message.success("修改成功", 1);
          }
        });
    };
    const rules = {
      address: [{ required: true, message: "请输入地址" }],
      details: [{ required: true, message: "请输入公司简介" }],
      email: [{required: true, type: "email", message: "输入正确邮件" }],
    };
    return {
      form,
      rules,
      handleFinish,
    };
  },
};
</script>

<style lang="less" scoped>
.base_container {
  .title {
    font-size: 20px;
  }
  .info {
    margin-top: 40px;
  }
}
</style>