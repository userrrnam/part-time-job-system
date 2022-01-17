<template>
  <div class="banner_container">
    <div class="wrapper">
      <div class="hot_city">
        <span>地区：</span>
        <a
          class="tips"
          v-for="(item, index) in store.state.cityName"
          :key="item.key"
          :class="{active: index === areaCurrentIndex}"
          @click="chooseCity(item, index)"
        >
          {{ item.label }}
        </a>
      </div>
      <div class="select_contant">
        <span class="professionType">职业类型：</span>
        <a
          class="tips"
          v-for="(item,index) in jobType"
          :class="{active: index === JobCurrentIndex }"
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
          :class="{active: index === salaryCurrentIndex }"
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
import provinces from "china-division/dist/provinces.json";
import cities from "china-division/dist/cities.json";
import areas from "china-division/dist/areas.json";

areas.forEach((area) => {
  const matchCity = cities.filter((city) => city.code === area.cityCode)[0];
  if (matchCity) {
    matchCity.children = matchCity.children || [];
    matchCity.children.push({
      label: area.name,
      value: area.code,
    });
  }
});

cities.forEach((city) => {
  const matchProvince = provinces.filter(
    (province) => province.code === city.provinceCode
  )[0];
  if (matchProvince) {
    matchProvince.children = matchProvince.children || [];
    matchProvince.children.push({
      label: city.name,
      value: city.code,
      children: city.children,
    });
  }
});
const options = provinces.map((province) => ({
  label: province.name,
  value: province.code,
  children: province.children,
}));

export default {
  name: "Banner",
  setup() {
    const { jobType } = useConsteEffect();
    const expectSalary = ref("");
    const { proxy: ins } = getCurrentInstance();
    const store = useStore();
    const JobCurrentIndex = ref(0);
    const areaCurrentIndex = ref(0);
    const salaryCurrentIndex = ref(0);
    const clearingForm = reactive([
      {
        key: "00",
        value: "全部",
      },
      {
        key: "01",
        value: "日结",
      },
      {
        key: "02",
        value: "周结",
      },
      {
        key: "03",
        value: "月结",
      },
    ]);
    const pageConfig = reactive({
      totalCount: "",
      totalPages: "",
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
      getJobList({ city: vals.value });
    };
    const chooseJobType = (val, index) => {
      JobCurrentIndex.value = index;
      if (val.key === "00") {
        getJobList();
      } else {
        getJobList({ jobType: val.value });
      }
    };
    const chooseCalculate = (item, index) => {
      salaryCurrentIndex.value = index;
      if (item.key === "00") {
        getJobList();
      } else {
        getJobList({ calculate: item.value });
      }
    };
    const value = ref([]);
    const cityCode = ref();
    const cityList = ref([]);

    watch(
      () => store.state.city,
      () => {
        const city = store.state.city.substr(0, 2);
        const cityCode = store.state.city;
        cityList.value.length = 0;
        provinces.forEach((province) => {
          if (province.code === city) {
            province.children.filter((citys) => {
              if (citys.value == cityCode) {
                store.commit("saveLocation", citys.label);
                citys.children.forEach((areas) => {
                  cityList.value.push(areas);
                  store.commit("saveCityName", [{label: '全市', key: '00'},...cityList.value]);
                });
              }
            });
          }
        });
      }
    );

    return {
      cityList,
      store,
      options,
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
    .active{
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