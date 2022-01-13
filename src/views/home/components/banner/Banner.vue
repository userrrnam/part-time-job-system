<template>
  <div class="banner_container">
    <div class="wrapper">
      <div class="hot_city">
        <span>热门城市：</span>
        <a v-for="item in cityList" :key="item.key" @click="chooseCity(item)">
          {{ item.name }}
        </a>
      </div>
      <div class="select_contant">
        <span class="salarys">期望薪资：</span>
        <a-input-number
          v-model:value="expectSalary"
          placeholder="输入期望薪资"
          style="width: 120px"
          :min="0"
          @pressEnter="pressEnter"
        />
        <span class="profession">职位要求：</span>
        <a-space>
          <a-select
            ref="select"
            allowClear
            placeholder="选择职位"
            v-model:value="jobType.label"
            style="width: 120px"
            :options="jobType"
            @change="handleChange"
          ></a-select>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, ref } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { useConsteEffect } from "./hooks";
export default {
  name: "Banner",
  setup() {
    const { cityList, salarys, jobType } = useConsteEffect();
    const expectSalary = ref("");
    const { proxy: ins } = getCurrentInstance();
    const store = useStore();
    const pageConfig = reactive({
      totalCount: "",
      totalPages: "",
    });
    const chooseParams = reactive({
      expectSalary: "",
      city: "",
      jobType: "",
    });
    //条件查询职位
    const getJobList = (params) => {
      ins.$http
        .post("/StudentHomePage/selectCompanyByCondition ", {
          ...params,
          page: 1,
          size: 10,
        })
        .then((res) => {
          pageConfig.totalCount = res.totalCount;
          pageConfig.totalPages = res.totalPages;
          store.commit("saveJobList", res.results);
          store.commit("savePageConfig", pageConfig);
        });
    };
    const chooseCity = (value) => {
      if (value.name === "全国") {
        chooseParams.city = ''
        getJobList(chooseParams);
      } else {
        chooseParams.city = value.name;
        getJobList(chooseParams);
      }
    };
    const handleChange = (_, option) => {
      chooseParams.jobType = option?.label;
      getJobList(chooseParams);
    };
    const pressEnter = () => {
      if (typeof expectSalary.value === "number" || !expectSalary.value) {
        chooseParams.expectSalary = expectSalary.value;
        getJobList(chooseParams);
      } else {
        message.error("请输入数字", 1);
      }
    };
    return {
      cityList,
      expectSalary,
      chooseCity,
      jobType,
      salarys,
      pressEnter,
      handleChange,
    };
  },
};
</script>

<style lang="less" scoped>
.banner_container {
  width: 100%;
  background-color: white;
  height: 150px;
  margin-top: 44px;
  .wrapper {
    width: calc(100% - 40%);
    height: 100%;
    margin: 0 auto;
    padding: 20px;
    .hot_city {
      width: 75%;
      margin-top: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 600;
      a {
        color: #000;
        margin-right: 15px;
      }
    }
    .select_contant {
      margin: 20px 0;
      .profession {
        margin-left: 20px;
      }
    }
  }
}
</style>