<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="jobList"
      :rowKey="(record) => record.jobId"
      :loading="loading"
      @change="handleTableChange"
    >
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #title>
        <div class="hearder">
          <a-button type="primary" @click="addJob">
            <template #icon><PlusOutlined /></template>
            新增
          </a-button>
        </div>
      </template>
      <template #customTitle>
        <span> 职位名称 </span>
      </template>
      <template #action="{ record }">
        <a-popconfirm
          v-if="record.status"
          title="审核中的职位会被自动拒绝，确定要下线吗?"
          @confirm="onOrDownline(record.jobId)"
        >
          <a>下线</a>
        </a-popconfirm>
        <a-popconfirm
          v-if="!record.status"
          title="确定要上线吗?"
          @confirm="onOrDownline(record.jobId)"
        >
          <a>上线</a>
        </a-popconfirm>
        <a @click="editItem(record.jobId)" style="margin-left: 20px">编辑</a>
        <a @click="checkItem(record.jobId)" style="margin-left: 20px">查看</a>
      </template>
    </a-table>
    <JobModal
      :forms="jobInfo"
      :showModal="showModal"
      @ok="handleOk"
      :readOnly="readOnly"
      @cancel="closeModal"
      title="工作详情"
    />
  </div>
</template>

<script>
import { reactive, getCurrentInstance, onBeforeMount, ref } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import JobModal from "./modal/JobModal.vue";
const columns = [
  {
    dataIndex: "jobName",
    key: "jobName",
    slots: { title: "customTitle", customRender: "jobName" },
  },
  {
    title: "薪酬",
    dataIndex: "salary",
    key: "salary",
  },
  {
    title: "创建时间",
    dataIndex: "updateTime",
    key: "updateTime",
  },

  {
    title: "操作",
    key: "action",
    slots: { customRender: "action" },
  },
];
export default {
  name: "jobTable",
  components: { PlusOutlined, JobModal },
  setup(_, { emit }) {
    //职位
    const jobList = reactive([]);
    const showModal = ref(false);
    const jobInfo = reactive({});
    const readOnly = ref(false);
    const loading = ref(false);
    const pageConfig = {
      page: 1,
      size: 10,
    };
    const { proxy: ins } = getCurrentInstance();
    const getJobTable = () => {
      ins.$http
        .post("/CompanyPosition/selectPosition", pageConfig)
        .then((res) => {
          if (res.results) {
            jobList.length = 0;
            jobList.push(...res.results);
            loading.value = false;
          }
        });
    };
    onBeforeMount(() => {
      getJobTable();
    });

    const onOrDownline = (vals) => {
      loading.value = true;
      ins.$http
        .post("/CompanyPosition/updatePositionStatus", { jobId: vals })
        .then((_) => {
          emit("refreshCount");
          setTimeout(() => {
            getJobTable();
            message.success("操作成功", 1);
          }, 500);
        });
    };
    //新增职位
    const addJob = () => {
      showModal.value = true;
    };
    //编辑职位
    const editItem = (vals) => {
      readOnly.value = true;
      showModal.value = true;
      getJob(vals);
    };
    //查看职位
    const checkItem = (vals) => {
      readOnly.value = false;
      getJob(vals);
    };
    const getJob = (id) => {
      ins.$http
        .post("/CompanyPosition/selectOnePosition", { jobId: id })
        .then((res) => {
          showModal.value = true;
          Object.assign(jobInfo, res.results);
        });
    };
    const handleTableChange = (page) => {
      console.log(page);
    };
    const closeModal = () => {
      console.log("close");
      showModal.value = false;
    };
    const handleOk = (form) => {
      if(readOnly.value){ 
        console.log(form);
      }
      showModal.value = false;
    };
    return {
      onOrDownline,
      checkItem,
      readOnly,
      addJob,
      editItem,
      closeModal,
      handleOk,
      jobInfo,
      showModal,
      loading,
      columns,
      jobList,
      handleTableChange,
    };
  },
};
</script>

<style lang="less" scoped>
.hearder {
  padding: 10px;
}
</style>