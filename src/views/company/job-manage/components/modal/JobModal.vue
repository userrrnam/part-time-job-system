<template>
  <a-modal v-model:visible="showModal" :title="title" :footer="null">
    <a-form :model="form" :rules="rules" ref="formRef" @finish="handleFinish">
      <a-form-item label="职位名称" name="jobName">
        <a-input
          v-model:value="form.jobName"
          :disabled="!addFlag && readOnly"
          placeholder="请输入职位名称"
          v-if="readOnly"
        />
        <span v-else>{{ form.jobName }}</span>
      </a-form-item>
      <a-form-item label="薪资待遇" name="salary">
        <a-input-number
          v-model:value="form.salary"
          allowClear
          :min="1"
          placeholder="请输入薪资"
          v-if="readOnly"
        />
        <span v-else>{{ form.salary }}</span>
      </a-form-item>
      <a-form-item label="招聘人数" name="recruitingNumber">
        <a-input-number
          v-model:value="form.recruitingNumber"
          allowClear
          :min="1"
          placeholder="请输入招聘人数"
          v-if="readOnly"
        />
        <span v-else>{{ form.recruitingNumber }}</span>
      </a-form-item>
      <a-form-item label="结算类型" name="calculate">
        <a-select
          placeholder="请选择结算类型"
          v-model:value="form.calculate"
          v-if="readOnly"
        >
          <a-select-option
            :value="item"
            v-for="(item, index) in calculateOptions"
            :key="index"
            >{{ item }}</a-select-option
          >
        </a-select>
        <span v-if="!readOnly">{{ form.calculate }}</span>
      </a-form-item>
      <a-form-item label="职业类型" name="jobType">
        <a-select
          placeholder="请选择职业类型"
          v-model:value="form.jobType"
          v-if="readOnly"
        >
          <a-select-option
            :value="item.value"
            v-for="(item, index) in jobType"
            :key="index"
            >{{ item.value }}</a-select-option
          >
        </a-select>
        <span v-if="!readOnly">{{ form.jobType }}</span>
      </a-form-item>
      <a-form-item label="工作城市" name="city">
        <a-cascader
          v-model:value="form.city"
          :options="options"
          v-if="readOnly"
          :disabled="!addFlag && readOnly"
          placeholder="选择期望城市"
        />
        <span v-if="!readOnly">{{ form.city }}</span>
      </a-form-item>
      <a-form-item label="工作要求" name="details">
        <a-textarea
          v-model:value="form.details"
          :rows="4"
          v-if="readOnly"
          placeholder="请输入"
        />
        <span v-else>{{ form.details }}</span>
      </a-form-item>

      <div style="text-align: right">
        <a-button
          style="margin-right: 8px"
          @click="handleCancel"
          v-if="readOnly"
          >取消</a-button
        >
        <a-button type="primary" html-type="submit">确认</a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script>
import options from "@/util/cascader-address-options.js";
import { useConsteEffect } from "@/views/home/components/banner/hooks.js";
import { reactive, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
export default {
  name: "JobModal",
  props: {
    title: {
      type: String,
      default: "标题",
    },
    showModal: {
      type: Boolean,
      default: false,
    },
    forms: {
      type: Object,
      default: null,
    },
    readOnly: {
      type: Boolean,
      default: true,
    },
    action: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const calculateOptions = ["日结", "周结", "月结"];
    const form = reactive(props.forms);
    const addFlag = ref(false);
    watch(
      () => props.action,
      () => {
        if (props.action === "add") {
          form.jobName = "";
          form.city = [];
          form.salary = "";
          form.recruitingNumber = "";
          form.details = "";
          form.jobType = "";
          form.calculate = "";
          addFlag.value = true;
        } else {
          addFlag.value = false;
        }
      },
      { immediate: true, deep: true }
    );
    const formRef = ref();
    const { jobType } = useConsteEffect();

    const handleOk = () => {
      emit("ok");
    };
    const handleCancel = () => {
      clearForm();
      emit("cancel");
    };
    const handleFinish = () => {
      emit("ok", form);
    };
    const clearForm = () => {
      formRef.value.resetFields();
    };
    const rules = {
      jobName: [{ required: true, message: "不能为空" }],
      salary: [{ required: true, message: "不能为空" }],
      recruitingNumber: [{ required: true, message: "不能为空" }],
      calculate: [{ required: true, message: "不能为空" }],
      jobType: [{ required: true, message: "不能为空" }],
      details: [{ required: true, message: "不能为空" }],
      city: [{ required: true, message: "不能为空" }],
    };
    return {
      rules,
      form,
      formRef,
      jobType,
      handleOk,
      addFlag,
      options,
      handleFinish,
      clearForm,
      handleCancel,
      calculateOptions,
    };
  },
};
</script>

<style lang="less" scoped>
</style>