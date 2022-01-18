<template>
  <div>
    <TagOutlined />
    <span style="marginleft: 10px">最新动态</span>
  </div>
  <div class="news_list">
    <div class="new_item" v-for="(item, index) in jobList" :key="index">
      <InfoCircleOutlined v-if="item.status === 0" style="color: #1890ff" />
      <CheckCircleOutlined v-if="item.status === 1" style="color: #52c41a" />
      <CloseCircleOutlined v-if="item.status === 2" style="color: #ff7875" />
      <span>{{ item.replyTime }}</span>
      <span>{{ item.jobName }}</span>
      <span class="company">{{ item.companyName }}</span>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onBeforeMount, reactive } from "vue";
import {
  CloseCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  TagOutlined,
} from "@ant-design/icons-vue";
export default {
  name: "RecentNews",
  components: {
    CloseCircleOutlined,
    InfoCircleOutlined,
    CheckCircleOutlined,
    TagOutlined,
  },
  setup() {
    const { proxy: ins } = getCurrentInstance();
    const jobList = reactive([]);
    onBeforeMount(() => {
      ins.$http
        .post("/StudentApplyJobPage/selectReplyApplyJobAll")
        .then((res) => {
          if (res.results) {
            jobList.length = 0;
            jobList.push(...res.results);
          }
        });
    });
    return {
      jobList,
    };
  },
};
</script>

<style lang="less" scoped>
.news_list {
  height: calc(370px - 50px);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  .new_item {
    width: 100%;
    margin: 10px 0;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .company {
      cursor: pointer;
      &:hover {
        color: #ff8a00;
      }
    }
    span {
      margin-right: 8px;
    }
  }
}
</style>