  <template>
  <div class="company_home_wrapper">
    <a-card style="width: 40%">
      <template #title>
        <ScheduleOutlined />
        <span style="margin-left: 10px; font-size: 16px"
          >职位统计：单位 (个)</span
        >
      </template>
      <div class="sketch_container">
        <div class="sketch_item">
          <a-typography-title>{{ state.all }}</a-typography-title>
          <span>所有职位</span>
        </div>
        <div class="sketch_item">
          <a-typography-title>{{ state.start }}</a-typography-title>
          <span>上线职位</span>
        </div>
        <div class="sketch_item">
          <a-typography-title>{{ state.end }}</a-typography-title>
          <span>下线职位</span>
        </div>
      </div>
    </a-card>
    <a-card style="width: 60%">
      <template #title>
        <ScheduleOutlined />
        <span style="margin-left: 10px; font-size: 16px"
          >申请统计：单位 (个)</span
        >
      </template>
      <div class="sketch_container">
        <div class="sketch_item">
          <a-typography-title>{{ count.all }}</a-typography-title>
          <span>所有申请</span>
        </div>
        <div class="sketch_item">
          <a-typography-title>{{ count.approval }}</a-typography-title>
          <span>审核中</span>
        </div>
        <div class="sketch_item">
          <a-typography-title>{{ count.noPass }}</a-typography-title>
          <span>已拒绝</span>
        </div>
        <div class="sketch_item">
          <a-typography-title>{{ count.pass }}</a-typography-title>
          <span>已通过</span>
        </div>
      </div>
    </a-card>
  </div>
</template>
  


<script>
import { getCurrentInstance, onBeforeMount, reactive } from "vue";
import { ScheduleOutlined } from "@ant-design/icons-vue";
export default {
  name: "CompanyHome",
  components: { ScheduleOutlined },
  setup() {
    const { proxy: ins } = getCurrentInstance();
    const state = reactive({
      start: 0,
      end: 0,
      all: 0,
    });
    const count = reactive({
      all: 0,
      approval: 0,
      noPass: 0,
      pass: 0,
    });
    const getCount = () => {
      ins.$http.post("/CompanyHome/countPosition").then((res) => {
        if (res.results) {
          const { start, end, all } = res.results;
          state.start = start;
          state.end = end;
          state.all = all;
        }
      });
      ins.$http.post("/CompanyHome/countApproval").then((res) => {
        console.log(res);
        if (res.results) {
          const { all, approval, noPass, pass } = res.results;
          count.all = all;
          count.approval = approval;
          count.noPass = noPass;
          count.pass = pass;
        }
      });
    };
    onBeforeMount(() => {
      getCount();
    });
    return {
      state,
      count,
      getCount,
    };
  },
};
</script>

<style lang="less" scoped>
.company_home_wrapper {
  display: flex;
  .sketch_container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .sketch_item {
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>