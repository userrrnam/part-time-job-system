<template>
  <div class="contant">
    <div class="job_info">
      <div class="job_title">
        <span>{{ job.jobName }}</span>
        <span> {{ job.cityName }} </span>
      </div>
      <div class="job_detail">
        <div>
          <span class="salay">{{ job.salary }}元 / 日</span>
          <span class="line"></span>
          <span class="salay calculate">{{ job.calculate }}</span>
          <span class="line"></span>
        </div>
        <span class="job_require" @click="checkInfo">
          {{ job.details }}
        </span>
        <Modal
          :visible="showModal"
          @closeModal="closeModal()"
          :content="job.details"
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
        {{ job.companyName.slice(0, 4) }}
      </a-avatar>
      <div class="company_detail">
        <div class="company_name" @click="checkCompany(job.companyId)">
          {{ job.companyName }}
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
        <span class="number">招聘人数：{{ job.recruitingNumber }} 人</span>
      </div>
    </div>

    <a-popover>
      <template #title>
        <MessageOutlined />
        <span style="marginLeft: 8px">申请反馈</span>
      </template>
      <template #content>
        <p v-if="job.status === 3">职位审核中，请耐心等待！</p>
        <div v-else>{{ job.message }}</div>
      </template>
      <a class="audit icon" v-if="job.status === 3">
        <ClockCircleOutlined />审核中
      </a>
      <a class="pass icon" v-if="job.status === 1">
        <CheckCircleOutlined />已通过</a
      >
      <a class="noPass icon" v-if="job.status === 2"
        ><CloseCircleOutlined />未通过</a
      >
    </a-popover>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, ref } from "vue";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  MessageOutlined,
} from "@ant-design/icons-vue";
import Modal from "@/views/home/components/work/detail-modal/Modal.vue";
export default {
  name: "WorkItem",
  components: {
    Modal,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ClockCircleOutlined,
    MessageOutlined,
  },
  props: ["job", "index"],
  setup() {
    const { proxy: ins } = getCurrentInstance();
    const showModal = ref(false);
    const displyModal = ref(false);
    const companyDetailInfo = reactive({});
    const colorList = ["#daefff", "#daffea", "#ffe3e3", "#ffeada"];
    const fontColor = ["#61bff9", "#7acba1", "#f8ad82", "#f97d61"];
    const checkCompany = (value) => {
      ins.$http
        .post("/StudentHomePage/selectCompanyInformationById", {
          companyId: value,
        })
        .then((res) => {
          console.log(res);
          if (res.results) {
            Object.assign(companyDetailInfo, res.results);
          }
        });
      displyModal.value = true;
    };
    const closeModal = () => {
      showModal.value = false;
    };
    const checkInfo = () => {
      showModal.value = true;
    };
    const closeCompanyModal = () => {
      displyModal.value = false;
    };
    return {
      colorList,
      fontColor,
      showModal,
      displyModal,
      companyDetailInfo,
      checkInfo,
      closeCompanyModal,
      checkCompany,
      closeModal,
    };
  },
};
</script>

<style lang="less" scoped>
.contant {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px;
  background: white;
  border-radius: 8px;
  border-bottom: 1px solid #eee;
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
        display: inline-block;
        color: #ff8a00;
      }
      .line {
        display: inline-block;
        width: 0;
        height: 10px;
        margin: 0 8px;
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
  .pass {
    color: #52c41a;
  }
  .noPass {
    color: #ff4d4f;
  }
  .audit {
    color: #999;
  }
  .icon {
    span {
      margin-right: 8px;
    }
  }
}
</style>