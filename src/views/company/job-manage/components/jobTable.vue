<template>
  <a-table
    :columns="columns"
    :data-source="jobList"
    :rowKey="(record) => record.jobId"
    :loading="loading"
    :pagination="pagination"
    @change="handleTableChange"
  >
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #title>
      <div class="header">
        <a-button type="primary" @click="addJob">
          <template #icon><PlusOutlined /></template>
          新增
        </a-button>
        <a-select
          ref="select"
          v-model:value="value1"
          style="width: 120px"
          :options="options1"
          @change="handleChange"
        >
        </a-select>
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
    ref="modalRef"
    :forms="jobInfo"
    :showModal="showModal"
    @ok="handleOk"
    :action="action"
    :readOnly="readOnly"
    @cancel="closeModal"
    :title="title"
  />
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
  setup() {
    //职位
    const jobList = reactive([]);
    const showModal = ref(false);
    const jobInfo = reactive({});
    const modalRef = ref();
    const pagination = reactive({
      total: 0,
      pageSize: 0,
      current: 1,
      showTotal: (total) => `总共 ${total} 条`,
    });
    const options1 = ref([
      {
        value: "",
        label: "全部",
      },
      {
        value: 0,
        label: "已上线",
      },
      {
        value: 1,
        label: "已下线",
      },
    ]);
    const action = ref(); //['edit', 'add', 'check']
    const addJobInfo = reactive({
      jobName: "",
      city: [],
      salary: "",
      recruitingNumber: "",
      details: "",
      jobType: "",
      calculate: "",
    });
    const readOnly = ref(false);
    const title = ref("工作详情");
    const loading = ref(false);
    const pageConfig = {
      page: 1,
      size: 10,
    };
    const { proxy: ins } = getCurrentInstance();
    const getJobTable = () => {
      loading.value = true;
      ins.$http
        .post("/CompanyPosition/selectPosition", {
          status: flag.value,
          ...pageConfig,
        })
        .then((res) => {
          if (res.results) {
            pagination.total = res.totalCount;
            pagination.pageSize = res.size;
            jobList.length = 0;
            jobList.push(...res.results);
            loading.value = false;
          }
        });
    };
    onBeforeMount(() => {
      getJobTable();
    });
    // 筛选线上或线下
    const flag = ref("");
    const handleChange = (value) => {
      if (value === 0) {
        flag.value = true;
      } else if (value === 1) {
        flag.value = false;
      } else {
        flag.value = "";
      }
      getJobTable();
    };
    const onOrDownline = (vals) => {
      loading.value = true;
      ins.$http
        .post("/CompanyPosition/updatePositionStatus", { jobId: vals })
        .then((_) => {
          setTimeout(() => {
            getJobTable();
            message.success("操作成功", 1);
          }, 500);
        });
    };
    //新增职位
    const addJob = () => {
      ModalConfig(true, true, "新增职位", "add");
    };
    //编辑职位
    const editItem = (vals) => {
      ModalConfig(true, true, "编辑职位", "edit");
      getJob(vals);
    };
    //查看职位
    const checkItem = (vals) => {
      ModalConfig(true, false, "职位详情", "check");
      getJob(vals);
    };
    /**
     * @params show showModal
     * @params read readOnly
     * @params T title
     * @params A action
     */
    const ModalConfig = (show, read, T, A) => {
      //T title , A action
      showModal.value = show;
      readOnly.value = read;
      title.value = T;
      action.value = A;
    };
    const getJob = (id) => {
      ins.$http
        .post("/CompanyPosition/selectOnePosition", { jobId: id })
        .then((res) => {
          showModal.value = true;
          Object.assign(jobInfo, res.results);
          jobInfo.jobType = jobInfo.jobType === "" ? "不限" : jobInfo.jobType;
          jobInfo.city = [
            jobInfo.city.substr(0, 2),
            jobInfo.city.substr(0, 4),
            jobInfo.city,
          ];
        });
    };
    const handleTableChange = (page) => {
      const { current } = page;
      pagination.current = current;
      pageConfig.page = current;
      getJobTable();
    };
    const closeModal = () => {
      showModal.value = false;
    };
    const handleOk = (form) => {
      if (action.value === "edit") {
        const {
          calculate,
          details,
          jobName,
          jobType,
          recruitingNumber,
          salary,
          jobId,
        } = form;

        ins.$http
          .post("/CompanyPosition/updatePosition", {
            calculate,
            details,
            jobName,
            jobType: jobType === "不限" ? "" : jobType,
            recruitingNumber,
            salary,
            jobId,
          })
          .then((res) => {
            if (res.results) {
              getJobTable();
              message.success("修改成功", 1);
              showModal.value = false;
            }
          });
      } else if (action.value === "add") {
        const { city, jobType, ...res } = form;
        ins.$http
          .post("/CompanyPosition/insertPosition", {
            city: city[city.length - 1],
            jobType: jobType === "不限" ? "" : jobType,
            ...res,
          })
          .then((res) => {
            if (res.results) {
              getJobTable();
              modalRef.value.clearForm();
              message.success("新增成功", 1);
              showModal.value = false;
            }
          });
      } else {
        showModal.value = false;
      }
    };
    return {
      value1: ref("全部"),
      onOrDownline,
      handleChange,
      checkItem,
      readOnly,
      addJob,
      title,
      addJobInfo,
      modalRef,
      pagination,
      editItem,
      closeModal,
      handleOk,
      jobInfo,
      showModal,
      action,
      loading,
      columns,
      jobList,
      handleTableChange,
      options1,
    };
  },
};
</script>

<style lang="less" scoped>
.header {
  padding: 0 20px;
  button {
    margin-right: 20px;
  }
}
</style>