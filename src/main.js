import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router'
import store from './store'
import axios from './util/axios.js'
const app = createApp(App)
app.config.globalProperties.$http = axios
app.use(Antd).use(store).use(router).mount('#app')
