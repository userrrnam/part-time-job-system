<template>
  <div class="banner_container">
    <div class="wrapper">
      <div class="hot_city">
        <span>地区：</span>
        <a
          class="tips"
          v-for="(item, index) in store.state.cityName"
          :key="item.key"
          :class="{ active: index === areaCurrentIndex }"
          @click="chooseCity(item, index)"
        >
          {{ item.label }}
        </a>
      </div>
      <div class="select_contant">
        <span class="professionType">职业类型：</span>
        <a
          class="tips"
          v-for="(item, index) in jobType"
          :class="{ active: index === JobCurrentIndex }"
          :key="item.key"
          @click="chooseJobType(item, index)"
        >
          {{ item.value }}
        </a>
        <br />
        <span class="salarysType">结算类型：</span>
        <a
          class="tips"
          v-for="(item, index) in clearingForm"
          :key="item.key"
          :class="{ active: index === salaryCurrentIndex }"
          @click="chooseCalculate(item, index)"
        >
          {{ item.value }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { useConsteEffect } from "./hooks";
import options from '@/util/cascader-address-options.js'
export default {
  name: "Banner",
  setup() {
    const { jobType, clearingForm } = useConsteEffect();
    const expectSalary = ref("");
    const { proxy: ins } = getCurrentInstance();
    const store = useStore();
    const JobCurrentIndex = ref(0);
    const areaCurrentIndex = ref(0);
    const salaryCurrentIndex = ref(0);
    const value = ref([]);
    const cityCode = ref();
    const cityList = ref([]);
    const pageConfig = reactive({
      totalCount: "",
      totalPages: "",
    });
    const selectJobParams = reactive({
      city: "",
      jobType: "",
      calculate: "",
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
          res.results?.forEach((vals) => {
            cityList.value.filter((item) => {
              if (item.value == vals.city) {
                vals.cityName = item.label;
              }
            });
          });
          store.commit("saveJobList", res.results);
          store.commit("savePageConfig", pageConfig);
        });
    };
    const chooseCity = (vals, index) => {
      areaCurrentIndex.value = index;
      if (vals.value === "00") {
        selectJobParams.city = "";
      } else {
        selectJobParams.city = vals.value;
      }
      getJobList(selectJobParams);
    };
    const chooseJobType = (val, index) => {
      JobCurrentIndex.value = index;
      if (val.value === "不限") {
        selectJobParams.jobType = "";
      } else {
        selectJobParams.jobType = val.value;
      }
      getJobList(selectJobParams);
    };
    const chooseCalculate = (item, index) => {
      salaryCurrentIndex.value = index;
      if (item.value === "不限") {
        selectJobParams.calculate = "";
      } else {
        selectJobParams.calculate = item.value;
      }
      getJobList(selectJobParams);
    };

    watch(
      () => store.state.city,
      () => {
        const provincesCode = store.state.city?.substr(0, 2);
        const cityCode = store.state.city?.substr(0, 4);
        const areasCode = store.state.city;
        options.forEach((province) => {
          if (province.value === provincesCode) {
            province.children.forEach((citys) => {
              if (citys.value == cityCode) {
                citys.children.forEach((areas) => {
                  if (areas.value === areasCode) {
                    store.commit("saveLocations", [
                      province.label,
                      "/",
                      citys.label,
                      "/",
                      areas.label,
                    ]);
                  }
                  cityList.value.push(areas);
                });
              }
            });
          }
        });
        store.commit("saveCityName", [
          { label: "不限", value: "00" },
          ...cityList.value,
        ]);
      }
    );
    watch(
      () => selectJobParams,
      () => {
        store.commit("savaSelectJobParams", selectJobParams);
      },
      { deep: true }
    );
    return {
      cityList,
      store,
      value,
      clearingForm,
      chooseJobType,
      chooseCalculate,
      cityCode,
      JobCurrentIndex,
      salaryCurrentIndex,
      areaCurrentIndex,
      expectSalary,
      chooseCity,
      jobType,
    };
  },
};
</script>

<style lang="less" scoped>
.banner_container {
  width: 100%;
  background-color: white;
  margin-top: 44px;
  .wrapper {
    width: calc(100% - 40%);
    height: 100%;
    margin: 0 auto;
    padding: 20px;
    .search_job {
      width: 100%;
      .search {
        width: 580px;
      }
    }
    .tips {
      display: inline-block;
      color: #999;
      font-weight: 500;
      margin-right: 15px;
      margin-top: 5px;
      &:hover {
        color: #ff8a00;
      }
    }
    .active {
      color: #ff8a00;
    }
    .hot_city {
      margin-top: 20px;
      font-weight: 500;
    }
    .select_contant {
      margin: 10px 0;
      .profession,
      .salarysType {
        display: inline-block;
        margin-top: 10px;
      }
    }
  }
}
</style>