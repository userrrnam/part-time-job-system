<template>
  <div class="title">
    <FundViewOutlined />
    <span style="margin:0 10px; fontSize: 16px">历史申请</span>
    <a-tooltip>
    <template #title>  
      <span>仅统计已下线的职位！</span>
      </template>
       <a style="color: #faad14"><QuestionCircleOutlined /></a>
    </a-tooltip>
  </div>
  <div id="myChart"></div>
</template>

<script>
import { getCurrentInstance, onMounted } from "vue";
import { FundViewOutlined, QuestionCircleOutlined } from "@ant-design/icons-vue";
export default {
  name: "AnlayseChart",
  components: { FundViewOutlined, QuestionCircleOutlined },
  setup() {
    const { proxy: ins } = getCurrentInstance();
    onMounted(() => {
      ins.$http.post("/StudentApplyJobPage/selectHistoryStatus").then((res) => {
        if (res.results) {
          const chartDom = document.getElementById("myChart");
          const myChart = ins.$echarts.init(chartDom);
          const { pass, noPass } = res.results;
          myChart.setOption({
            tooltip: {
              trigger: "item",
            },
            legend: {
              top: "5%",
              left: "center",
            },
            series: [
              {
                name: "Access From",
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 10,
                  borderColor: "#fff",
                  borderWidth: 2,
                },
                label: {
                  show: false,
                  position: "center",
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: "14",
                    fontWeight: "bold",
                  },
                },
                labelLine: {
                  show: false,
                },
                data: [
                  { value: pass, name: "通过" },
                  { value: noPass, name: "未通过" },
                ],
              },
            ],
          });
        }
      });
    });
  },
};
</script>

<style lang="less" scoped>
#myChart {
  width: 100%;
  height: 100%;
  padding: 10px;
}
</style>