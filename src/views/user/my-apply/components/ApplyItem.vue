<template>
  <div class="apply_item_wrapper">
    <a-card style="width: 100%; border-radius: 8px">
      <div class="toolBar">
        <a-row>
          <a-col :span="12">
            城市地区：<a-cascader
              v-model:value="stateParams.city"
              :options="options"
              placeholder="期望城市"
          /></a-col>
          <a-col :span="12">
            职业类型：<a-select
              placeholder="请选择工作类型"
              v-model:value="stateParams.jobType"
              :options="jobType"
            >
            </a-select
          ></a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            结算类型：<a-select
              placeholder="请选择结算类型"
              v-model:value="stateParams.calculate"
              :options="clearingForm"
            >
            </a-select>
          </a-col>
        </a-row>
      </div>
      <div class="apply_list">
        <a-spin :spinning="flag" v-if="applyList">
          <WorkInfo
            v-for="(item, index) in applyList"
            :key="index"
            :job="item"
            :index="index"
          />
          <div class="not_data" v-if="applyList?.length === 0">
            <a-empty description="暂无数据" />
          </div>
        </a-spin>
        <div class="pageation" v-if="applyList?.length !== 0">
          <a-pagination
            size="small"
            :total="totalCount"
            v-model:pageSize="pageConfig.size"
            v-model:current="currentPage"
            @change="changePage"
            :show-total="(total) => `共 ${total} 条`"
          />
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { reactive, getCurrentInstance, ref, onBeforeMount, watch } from "vue";
import { useStore } from "vuex";
import { useConsteEffect } from "@/views/home/components/banner/hooks.js";
import options from "@/util/cascader-address-options.js";
import WorkInfo from "./applyWork/WorkItem.vue";
import Modal from "@/views/home/components/work/detail-modal/Modal.vue";
export default {
  name: "ApplyItem",
  components: { Modal, WorkInfo },
  setup() {
    const currentPage = ref(1);
    const { proxy: ins } = getCurrentInstance();
    const { jobType, clearingForm } = useConsteEffect();
    const store = useStore();
    const flag = ref(false);
    const showModal = ref(false);
    const totalCount = ref(0);
    const applyList = reactive([]);
    const pageConfig = reactive({
      page: 1,
      size: 8,
    });
    const stateParams = reactive({
      //城市
      city: [],
      //职业选择
      jobType: "不限",
      //结算方式
      calculate: "不限",
    });
    onBeforeMount(() => {
      getApplyJob();
    });
    watch(
      [() => stateParams, pageConfig],
      () => {
        const { city, jobType, calculate } = stateParams;
        getApplyJob({
          city: city[city.length - 1],
          jobType: jobType === "不限" ? "" : jobType,
          calculate: calculate === "不限" ? "" : calculate,
        });
      },
      { deep: true }
    );
    const getApplyJob = (params) => {
      flag.value = true;
      setTimeout(() => {
        ins.$http
          .post("/StudentApplyJobPage/selectApplyJob", {
            ...params,
            ...pageConfig,
          })
          .then((res) => {
            flag.value = false;
            totalCount.value = res.totalCount;
            if (res.results) {
              res.results.forEach(vals => {
                const province = vals.city.substr(0,2);
                const city = vals.city.substr(0, 4);
                options.filter(provinces => {
                  if(provinces.value == province) {
                    provinces.children.forEach(cities => {
                      if (cities.value === city) {
                        cities.children.forEach(item => {
                          if (item.value === vals.city) {
                            vals.cityName = item.label;
                          }
                        })
                      }
                    })
                  }
                })
              })
              applyList.length = 0;
              applyList.push(...res.results);
            } else {
              applyList.length = 0;
            }
          });
      }, 500);
    };
    const changePage = (page, pageSize) => {
      pageConfig.page = page;
      pageConfig.size = pageSize;
    };
    return {
      store,
      getApplyJob,
      stateParams,
      changePage,
      currentPage,
      showModal,
      flag,
      options,
      totalCount,
      applyList,
      jobType,
      pageConfig,
      clearingForm,
    };
  },
};
</script>

<style lang="less" scoped>
.apply_item_wrapper {
  margin-top: 10px;
  .toolBar {
    width: 100%;
    .ant-select,
    :deep(.ant-cascader-picker) {
      width: 70%;
      margin-bottom: 10px;
    }
  }
  .apply_list {
    .not_data {
      height: 530px;
      justify-content: center;
      display: flex;
      align-items: center;
    }
  }
  .pageation {
    float: right;
    margin-top: 20px;
  }
}
</style>