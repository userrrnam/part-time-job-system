<template>
  <div class="edit_wrapper">
    <a-form :model="infos" :rules="rules" @finish="handleFinish">
      <a-form-item label="姓名" name="name">
        <a-input v-model:value="infos.name" style="width: calc(100% - 85%)" />
      </a-form-item>
      <a-divider />
      <a-form-item label="性别" name="sex">
        <a-radio-group name="radioGroup" v-model:value="infos.sex">
          <a-radio value="1">男</a-radio>
          <a-radio value="0">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-divider />
      <a-form-item label="年龄" name="age">
        <a-input-number v-model:value="infos.age" :min="1" />
      </a-form-item>
      <a-divider />
      <a-form-item label="电话" name="phone">
        <a-input v-model:value="infos.phone" style="width: calc(100% - 68%)" />
      </a-form-item>
      <a-divider />
      <a-form-item label="个人邮箱" name="email">
        <a-input v-model:value="infos.email" style="width: calc(100% - 68%)" />
      </a-form-item>
      <a-divider />
      <a-form-item label="期望职业类型" name="occupation">
        <a-select
          placeholder="请选择工作类型"
          v-model:value="infos.occupation"
          style="width: calc(100% - 60%)"
        >
          <a-select-option
            :value="item.value"
            v-for="(item, index) in jobType"
            :key="index"
            >{{ item.value }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-divider />
      <a-form-item
        label="期望结算类型"
        name="calculate"
        style="width: calc(100% - 70%)"
      >
        <a-select placeholder="请选择结算类型" v-model:value="infos.calculate">
          <a-select-option
            :value="item"
            v-for="(item, index) in calculateOptions"
            :key="index"
            >{{ item }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-divider />
      <a-form-item label="期望工作城市" name="city">
        <a-cascader
          v-model:value="infos.city"
          :options="options"
          placeholder="选择期望城市"
          style="width: calc(100% - 60%)"
        />
      </a-form-item>
      <a-divider />
      <a-form-item label="个人介绍" name="details">
        <a-textarea
          v-model:value="infos.details"
          :rows="4"
          placeholder="请输入"
        />
      </a-form-item>
      <a-divider />
      <div class="footer">
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" html-type="submit">修改</a-button>
      </div>
    </a-form>
  </div>
</template>

<script>
import { onBeforeMount, reactive, watch } from "vue";
import { useConsteEffect } from "@/views/home/components/banner/hooks.js";
import options from "@/util/cascader-address-options.js";
export default {
  name: "EditInfo",
  props: ["info"],
  setup(props, { emit }) {
    const infos = reactive({});
    const { jobType } = useConsteEffect();
    const calculateOptions = reactive(["日结", "周结", "月结"]);
    watch(
      () => infos,
      () => {
        emit("editInfos", infos);
      },
      { deep: true }
    );
    onBeforeMount(() => {
      Object.assign(infos, props.info);
      infos.city = [
        infos.city.substr(0, 2),
        infos.city.substr(0, 4),
        infos.city,
      ];
    });
    let validatorPhone = async (_, value) => {
      if (value === "") {
        return Promise.reject("请输入手机号码");
      } else if (!/^1[2-9]\d{9}$/.test(value)) {
        return Promise.reject("手机号格式不正确");
      }
      return Promise.resolve();
    };
    const rules = {
      city: [{ required: true, message: "请选择城市" }],
      sex: [{ required: true, message: "请选择性别" }],
      calculate: [{ required: true, message: "请选择结算类型" }],
      occupation: [{ required: true, message: "请选择工作类型" }],
      age: [{ required: true, message: "请输入年龄" }],
      phone: [{ required: true, validator: validatorPhone, trigger: "change" }],
      email: [{ type: "email", message: "不是有效的电子邮件" }],
      name: [{ required: true, message: "请输入真实姓名" }],
    };
    const handleCancel = () => {
      emit("cancelEdit");
    };
    const handleFinish = () => {
      emit("submitInfo");
    };
    return {
      infos,
      rules,
      jobType,
      options,
      handleCancel,
      handleFinish,
      calculateOptions,
    };
  },
};
</script>

<style lang="less" scoped>
.edit_wrapper {
  .footer {
    text-align: center;
    button {
      margin: 0 20px;
    }
  }
}
</style>