<template>
  <a-table
    :columns="columns"
    :data-source="applyList"
    :rowKey="(_, index) => index"
    :pagination="pagination"
    @change="handleTableChange"
  >
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #title>
      <div class="header">
        学生姓名：<a-input
          v-model:value="filterParams.name"
          style="width: 200px; margin-right: 20px"
          placeholder="输入姓名"
          allowClear
        />
        职位名称：<a-input
          v-model:value="filterParams.jobName"
          style="width: 200px"
          placeholder="输入姓名"
          allowClear
        />
        <a-button type="primary" @click="handleFilter">
          <template #icon><SearchOutlined /></template>
        </a-button>
      </div>
    </template>
    <template #customTitle>
      <span> 职位名称</span>
    </template>
    <template #action="{ record }">
      <span v-if="record.status === 1" style="color:#52c41a">已通过</span>
      <span v-if="record.status === 2" style="color: #ff4d4f">已拒绝</span>
      <a v-if="record.status === 3" @click="audit(record)">审核</a>
      <a @click="checkItem(record)" style="margin-left: 20px">查看</a>
    </template>
  </a-table>
  <ApplyModal
    :showModal="showModal"
    @ok="handleOk"
    @cancel="handleCancel"
    :applyDetails="applyDetails"
  />
  <AuditModal :show="show" @ok="handleAudit" @cancel="handleCancel" />
</template>
<script>
import {
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
} from "@vue/runtime-core";
import { SearchOutlined } from "@ant-design/icons-vue";
import ApplyModal from "../apply-modal/ApplyModal.vue";
import AuditModal from "../audit-modal/AuditModal.vue";
import { message } from "ant-design-vue";
const columns = [
  {
    dataIndex: "jobName",
    key: "jobName",
    slots: { title: "customTitle", customRender: "jobName" },
  },
  {
    title: "申请人",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "申请时间",
    dataIndex: "createTime",
    key: "createTime",
  },

  {
    title: "操作",
    key: "action",
    slots: { customRender: "action" },
  },
];
export default {
  name: "ApplyTable",
  components: { ApplyModal, SearchOutlined, AuditModal },
  setup() {
    const { proxy: ins } = getCurrentInstance();
    const showModal = ref(false);
    const applyList = reactive([]);
    const show = ref(false);
    const auditItem = ref();
    const applyDetails = ref();
    const filterParams = reactive({
      //工作姓名
      jobName: "",
      //学生姓名
      name: "",
    });
    const pagination = reactive({
      total: 0,
      pageSize: 0,
      current: 1,
      showTotal: (total) => `总共 ${total} 条`,
    });
    const pageConfig = {
      page: 1,
      size: 10,
    };
    const getApplyList = () => {
      ins.$http
        .post("/ApprovalInformation/selectApprovalInformation", {
          ...filterParams,
          ...pageConfig,
        })
        .then((res) => {
          if (res?.results) {
            pagination.total = res.totalCount;
            pagination.pageSize = res.size;
            applyList.length = 0;
            applyList.push(...res.results);
          }
        });
    };
    onMounted(() => {
      getApplyList();
    });
    const handleTableChange = (page) => {
      const { current } = page;
      pagination.current = current;
      pageConfig.page = current;
      getApplyList();
    };
    const checkItem = (vals) => {
      applyDetails.value = vals;
      showModal.value = true;
    };
    const handleOk = () => {
      showModal.value = false;
    };
    const handleCancel = () => {
      show.value = false;
      showModal.value = false;
    };
    const handleFilter = () => {
      getApplyList();
    };
    const audit = (value) => {
      show.value = true;
      auditItem.value = value;
    };
    const handleAudit = (value) => {
      const { id, jobId, jobUpdateTime } = auditItem.value;
      ins.$http
        .post("/ApprovalInformation/updateApprovalInformation", {
          jobUpdateTime,
          id,
          jobId,
          ...value,
        })
        .then((res) => {
          if (res.results) {
            message.success("审核完成", 1);
            getApplyList();
          }
        });
      show.value = false;
    };
    return {
      show,
      handleFilter,
      columns,
      audit,
      handleAudit,
      applyList,
      checkItem,
      pagination,
      handleTableChange,
      showModal,
      handleOk,
      handleCancel,
      filterParams,
      applyDetails,
    };
  },
};
</script>

<style lang="less" scoped>
.header {
  padding: 0 20px;
}
</style>