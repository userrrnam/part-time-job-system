import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router'
import store from './store'
import axios from './util/axios.js'
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);
import 'default-passive-events'
const app = createApp(App)
app.config.globalProperties.$http = axios;
app.config.globalProperties.$echarts = echarts;
app.use(Antd).use(store).use(router).mount('#app')
