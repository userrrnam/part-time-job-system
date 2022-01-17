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
          <span> {{ workInfo.cityName }} </span>
        </div>
        <div class="job_detail">
          <div>
            <span class="salay">{{ workInfo.salary }} 元 / 日</span>
            <span class="line"></span>
            <span class="salay calculate">{{ workInfo.calculate }}</span>
            <span class="line"></span>
          </div>
          <span class="job_require" @click="checkInfo">
            {{ workInfo.details }}
          </span>
          <Modal
            :visible="showModal"
            @closeModal="closeModal()"
            :content="workInfo.details"
            title="职位要求"
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
          <div class="company_name" @click="checkCompany(workInfo.companyId)">
            {{ workInfo.companyName }}
          </div>
          <Modal
            :visible="displyModal"
            @closeModal="closeCompanyModal()"
            title="公司详情"
          >
            <template #content>
              <a-typography>
                <a-typography-title :level="5">公司名称</a-typography-title>
                <a-typography-paragraph>
                  {{ companyDetailInfo.companyName }}
                </a-typography-paragraph>
                <a-typography-title :level="5">公司简介</a-typography-title>
                <a-typography-paragraph>
                  {{ companyDetailInfo.details }}
                </a-typography-paragraph>
                <a-typography-title :level="5">公司邮箱</a-typography-title>
                <a-typography-paragraph>
                  {{ companyDetailInfo.email }}
                </a-typography-paragraph>
                <a-typography-title :level="5">公司地址</a-typography-title>
                <a-typography-paragraph>
                  {{ companyDetailInfo.address }}
                </a-typography-paragraph>
              </a-typography>
            </template>
          </Modal>
          <span class="number"
            >招聘人数：{{ workInfo.recruitingNumber }} 人</span
          >
        </div>
      </div>
      <a-button
        class="replay"
        @click="replyHandle(workInfo.jobId, workInfo.companyId)"
        >申请职位</a-button
      >
    </div>
  </div>
</template>

<script>
import { reactive, ref, getCurrentInstance } from "vue";
import { message } from "ant-design-vue";
import Modal from "./detail-modal/Modal.vue";
export default {
  name: "JobInfo",
  props: ["workInfo", "index"],
  components: { Modal },
  setup(_, { emit }) {
    const showModal = ref(false);
    const colorList = ["#daefff", "#daffea", "#ffe3e3", "#ffeada"];
    const fontColor = ["#61bff9", "#7acba1", "#f8ad82", "#f97d61"];
    const { proxy: ins } = getCurrentInstance();
    const replayParams = reactive({
      companyId: "",
      jobId: "",
    });
    // 查看职位要求
    const checkInfo = () => {
      showModal.value = true;
    };
    // 关闭对话框
    const closeModal = () => {
      showModal.value = false;
    };
    //申请职位
    const replyHandle = (e, v) => {
      replayParams.companyId = v;
      replayParams.jobId = e;
      ins.$http.post("/StudentHomePage/applyJob", replayParams).then((res) => {
        if (!res.results) {
          message.success("申请成功！");
          emit("refreshPage", { page: 1, size: 8 });
        }
      });
    };
    //查看公司详情
    let displyModal = ref(false);
    const companyDetailInfo = reactive({
      companyName: "",
      address: "",
      email: "",
      details: "",
    });
    const checkCompany = (value) => {
      ins.$http
        .post("/StudentHomePage/selectCompanyInformationById", {
          companyId: value,
        })
        .then((res) => {
          if (res.results) {
            const { address, companyName, email, details } = res.results;
            companyDetailInfo.companyName = companyName;
            companyDetailInfo.address = address;
            companyDetailInfo.email = email;
            companyDetailInfo.details = details;
          }
        });
      displyModal.value = true;
    };
    //关闭modal
    const closeCompanyModal = () => {
      displyModal.value = false;
    };

    return {
      checkInfo,
      colorList,
      fontColor,
      showModal,
      closeModal,
      replyHandle,
      checkCompany,
      displyModal,
      closeCompanyModal,
      companyDetailInfo,
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
          font-weight: 600;
          font-size: 12px;
          margin: 0 5px;
          display: inline-block;
          color: #ff8a00;
        }
        .line {
          display: inline-block;
          width: 0;
          height: 10px;
          margin: 0 5px;
          border: 1px solid rgb(204, 204, 204);
        }
        .job_require {
          max-width: 200px;
          margin-left: 5px;
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
        margin-left: 20px;

        .company_name {
          width: 180px;
          cursor: pointer;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 15px;
          font-weight: 600;
          &:hover {
            color: #ff8a00;
          }
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