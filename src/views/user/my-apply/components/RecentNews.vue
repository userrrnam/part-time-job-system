<template>
  <div class="news_container">
    <TagOutlined />
    <span style="marginLeft: 10px; fontSize: 16px">最新动态</span>
    <a @click="refreshList" class="refresh_icon" :class="{ animation: active }"><UndoOutlined/></a>
  </div>
  <div class="refresh_tips" v-if="flag">
    <LoadingOutlined /> 更新中...
  </div>
  <div class="news_list" ref="newsListRef">
      <div class="new_item" v-for="(item, index) in jobList" :key="index">
        <InfoCircleOutlined v-if="item.status === 0" style="color: #1890ff" />
        <CheckCircleOutlined v-if="item.status === 1" style="color: #52c41a" />
        <CloseCircleOutlined v-if="item.status === 2" style="color: #ff7875" />
        <span>{{ item.replyTime }}</span>
        <span>{{ item.jobName }}</span>
        <a-popover>
          <template #content>
            <p>{{ item.companyName }}</p>
          </template>
          <span class="company">{{ item.companyName }}</span>
        </a-popover>
      </div>
      <div class="no_data" v-if="jobList?.length === 0">
        <a-empty description="暂无数据" />
      </div>
  </div>
</template>

<script>
import { getCurrentInstance, onBeforeMount, reactive, ref } from "vue";
import { useStore } from "vuex";
import {
  CloseCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  TagOutlined,
  UndoOutlined,
  LoadingOutlined
} from "@ant-design/icons-vue";
export default {
  name: "RecentNews",
  components: {
    CloseCircleOutlined,
    InfoCircleOutlined,
    CheckCircleOutlined,
    TagOutlined,
    UndoOutlined,
    LoadingOutlined
  },
  setup() {
    const { proxy: ins } = getCurrentInstance();
    const jobList = reactive([]);
    const store = useStore();
    const flag = ref(false);
    const newsListRef = ref();
    const active = ref(false);
    const getRecentNews = () => {
      flag.value = true;
      active.value = true;
      setTimeout(() => {
        ins.$http.post("/StudentApplyJobPage/selectReplyApplyJobAll").then(
          (res) => {
            flag.value = false;
            active.value = false;
            if (res.results) {
              jobList.length = 0;
              jobList.push(...res.results);
            }
          },
          (err) => {
            active.value = false;
            throw new Error(err);
          }
        );
      }, 800);
    };
    onBeforeMount(() => {
      getRecentNews();
    });
    const refreshList = () => {
      newsListRef.value.scrollTop = 0;
     
      getRecentNews();
    };
    return {
      jobList,
      store,
      flag,
      newsListRef,
      refreshList,
      active,
    };
  },
};
</script>

<style lang="less" scoped>
.news_container {
  .refresh_icon {
    float: right;
  }
  .animation {
    transition: 0.8s all ease;
    transform: rotate(360deg);
  }
}
.refresh_tips{
  width: 100%;
  font-size: 12px;
  text-align: center;
}
.news_list {
  height: calc(100% - 30px);
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
  .no_data {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>