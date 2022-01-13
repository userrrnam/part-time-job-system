<template>
  <div class="job_container">
    <!-- 骨架屏 -->
    <div class="privew" v-if="!workInfo">
      <a-skeleton active />
    </div>
    <div class="contant" v-if="workInfo">
      <div class="job_info">
        <div class="job_title">
          <span>{{ workInfo.jobName }}</span>
          <span> {{ workInfo.city }} </span>
        </div>
        <div class="job_detail">
          <div>
            工资：
            <span class="salay"
              >{{ workInfo.minSalary }} ~ {{ workInfo.maxSalary }}</span
            >
          </div>
          <div class="job_require" @click="checkInfo">
            {{ workInfo.details }}
          </div>
          <JobDetail
            :visible="showModal"
            @closeModal="closeModal()"
            :content="workInfo.details"
          />
        </div>
      </div>
      <div class="company_info">
        <a-avatar
          shape="square"
          :size="60"
          :style="{
            backgroundColor: colorList[index % 4],
            color: fontColor[index % 4],
          }"
        >
          {{ workInfo.companyName.slice(0, 4) }}
        </a-avatar>
        <div class="company_detail">
          <div class="company_name">{{ workInfo.companyName }}</div>
          <span class="number"
            >招聘人数：{{ workInfo.recruitingNumber }}人</span
          >
        </div>
      </div>
      <a-button class="replay" @click="replyHandle">申请职位</a-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, getCurrentInstance } from "vue";
import { message } from 'ant-design-vue'
import JobDetail from "./detail-modal/JobDetail.vue";
export default {
  name: "JobInfo",
  props: ["workInfo", "index"],
  components: { JobDetail },
  setup(props, { emit }) {
    const showModal = ref(false);
    const colorList = ["#daefff", "#daffea", "#ffe3e3", "#ffeada"];
    const fontColor = ["#61bff9", "#7acba1",  "#f8ad82","#f97d61"];
    const { proxy: ins } = getCurrentInstance();
    const job = toRefs(props.workInfo);
    const replayParams = reactive({
      companyId: '',
      jobId: '',
    })
    // 查看职位要求
    const checkInfo = () => {
      showModal.value = true;
    };
    // 关闭对话框
    const closeModal = (value) => {
      showModal.value = false;
    };
    //申请职位
    const replyHandle = () => {
      replayParams.companyId = job.companyId.value;
      replayParams.jobId = job.jobId.value;
      ins.$http.post('/StudentHomePage/applyJob',replayParams).then((res) => {
        if (!res.results) {
          message.success("申请成功！");
          emit("refreshPage", {page: 1, size: 8});
        }
      })
    };
    return {
      checkInfo,
      colorList,
      fontColor,
      showModal,
      closeModal,
      replyHandle,
    };
  },
};
</script>

<style lang="less" scoped>
.job_container {
  .contant {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 20px;
    background: white;
    border-radius: 8px;
    .job_info {
      width: 350px;
      .job_title {
        span:nth-child(1) {
          font-size: 16px;
        }
        span:nth-child(2) {
          margin-left: 30px;
          color: #999;
        }
      }
      .job_detail {
        display: flex;
        font-size: 12px;
        margin-top: 10px;
        .salay {
          display: inline-block;
          width: 100px;
          color: #ff8a00;
        }
        .job_require {
          max-width: 200px;
          margin-left: 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &:hover {
            color: #ff8a00;
            cursor: pointer;
          }
        }
      }
    }
    .company_info {
      display: flex;
      .company_logo {
        text-align: center;
        width: 65px;
        height: 65px;
        padding: 5px;
        font-size: 20px;
        border-radius: 5px;
        background-color: rgb(218, 239, 255);
        color: rgb(115, 197, 250);
      }
      .company_detail {
        position: relative;
        min-width: 100px;
        margin-left: 20px;
        .company_name {
          font-size: 15px;
          font-weight: 600;
        }
        .number {
          position: absolute;
          bottom: 0;
          left: 0;
          font-size: 12px;
          color: #999;
        }
      }
    }
    .replay {
      border-radius: 5px;
      background-color: #ff8a00;
      color: white;
      &:hover {
        border: 1px solid transparent;
      }
    }
  }
}
</style>