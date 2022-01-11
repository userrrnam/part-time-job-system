<template>
  <div class="job_container">
    <!-- 骨架屏 -->
    <div class="privew" v-if="flag">
      <a-skeleton active />
    </div>
    <div class="contant" v-if="!flag">
      <div class="job_info">
        <div class="job_title">
          <span>Java</span>
          <span> 成都 </span>
        </div>
        <div class="job_detail">
          <div>
            工资：
            <span class="salay">3000 ~ 4000</span>
          </div>
          <div class="job_require" @click="checkInfo">
            不限经验，大专学历,不限经验，大专学历不限经验，大专学历
          </div>
          <JobDetail :visible="showModal" @closeModal="closeModal()"/>
        </div>
      </div>
      <div class="company_info">
        <div class="company_logo">深圳华恩</div>
        <div class="company_detail">
          <div class="company_name">深圳市华恩装饰工程有限公司</div>
          <span class="number">招聘人数：20人</span>
        </div>
      </div>
      <a-button class="replay" @click="replyHandle">申请职位</a-button>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import JobDetail from './detail-modal/JobDetail.vue'
export default {
  name: "JobInfo",
  components: { JobDetail },
  setup() {
    const flag = ref(false);
    const showModal = ref(false);
    
    const handleChange = () => {
      flag.value = !flag.value;
    };
    // 查看职位要求
    const checkInfo = () => {
      showModal.value = true;
    }; 
      // 关闭对话框
    const closeModal = (value) => {
      showModal.value = false;
    }
    //申请职位
    const replyHandle = () => {
      console.log(1)
    }
    return {
      handleChange,
      checkInfo,
      showModal,
      closeModal,
      flag,
      replyHandle 
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
        margin-left: 20px;
        .company_name {
          font-size: 16px;
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
      background-color: #ff8a00;
      color: white;
      &:hover {
        border: 1px solid transparent;
      }
    }
  }
}
</style>