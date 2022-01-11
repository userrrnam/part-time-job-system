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
        <a-space>
          <a-select
            ref="select"
            v-model:value="value1.label"
            style="width: 120px"
            :options="salarys"
            size="small"
            @focus="focus"
            @change="handleChange"
          ></a-select>
        </a-space>
        <span class="profession">职位要求：</span>
        <a-space>
          <a-select
            ref="select"
            v-model:value="value2.label"
            style="width: 120px"
            :options="profession"
            size="small"
            @focus="focus"
            @change="handleChange"
          ></a-select>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useConsteEffect } from "./hooks";
export default {
  name: "Banner",
  setup() {
    const { cityList, salarys, profession } = useConsteEffect();
    const chooseCity = (value) => {
      console.log(value.key, value.name);
    };
    const handleChange = (value) => {
      console.log(value);
    };
    const focus = () => {
      console.log(1);
    };
    return {
      cityList,
      chooseCity,
      profession,
      value1: reactive({ value: "00", label: "不限" }),
      value2: reactive({ value: "00", label: "不限" }),
      salarys,
      focus,
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