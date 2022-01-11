<template>
  <div class="login_container">
    <img src="@/assets/looking_job.png" />
    <!-- <img src="@/assets/looking_person.png" > -->
    <div class="login_contant">
      <div class="login_wrapper">
        <div class="title">
          <a-menu
            v-model:selectedKeys="current"
            mode="horizontal"
            @click="changeSelect($event)"
          >
            <a-menu-item v-for="item in roleType" :key="item.key">
              {{ item.value }}
            </a-menu-item>
            <!-- <a-menu-item key="job"> 我要找兼职 </a-menu-item>
            <a-menu-item key="person"> 我要招人 </a-menu-item> -->
          </a-menu>
        </div>
        <a-form
          :model="formState"
          name="normal_login"
          ref="formRef"
          class="login-form"
          @finish="onFinish"
        >
          <a-form-item
            name="studentAccount"
            :rules="[{ required: true, message: '请输入账号!' }]"
          >
            <a-input
              v-model:value="formState.studentAccount"
              placeholder="账号"
              autocomplete="off"
            >
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            name="password"
            :rules="[{ required: true, message: '请输入密码!' }]"
          >
            <a-input-password
              v-model:value="formState.password"
              placeholder="密码"
              autocomplete="off"
            >
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
        <a class="register_button" @click="toRegister" v-if="!flag"
          >没有账号?</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { setToken } from "@/util/storage.js";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
export default {
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const router = useRouter();
    const flag = ref(false);
    const formRef = ref();
    const current = ref(["01"]);
    const { proxy: ins } = getCurrentInstance();

    const roleType = reactive([
      {
        key: "01",
        value: "我要找兼职",
      },
      {
        key: "02",
        value: "我要招人",
      },
    ]);

    const changeSelect = (e) => {
      if (e.key === "01") {
        flag.value = false;
      } else {
        flag.value = true;
        formRef.value.resetFields();
      }
    };
    const formState = reactive({
      studentAccount: "",
      password: "",
    });
    const onFinish = (values) => {
      ins.$http.post("/LoginStudent/SelectOneStudentUser", values).then(
        (res) => {
          if (res) {
            const { results } = res;
            setToken(results.token);
            message.success("登录成功!", 1);
            router.push("/home");
          }
        },
        (err) => {
          formRef.value.resetFields();
          message.error('账号或密码错误', 1);
        }
      );
    };
    const toRegister = () => {
      router.push("/user/register");
    };
    return {
      current,
      roleType,
      formRef,
      toRegister,
      changeSelect,
      formState,
      onFinish,
      flag,
    };
  },
};
</script>

<style lang="less" scoped>
.login_container {
  display: flex;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  img {
    top: -15%;
    left: -15%;
    position: absolute;
  }
  .login_contant {
    width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    background: white;
    height: 100%;
    .login_wrapper {
      width: 300px;
      position: relative;
      .title {
        ul {
          display: flex;
          justify-content: center;
        }
        .a-menu-item {
          font-size: 24px;
        }
      }
      .login-form {
        margin-top: 20px;
        position: relative;
        .login-form-button {
          width: 100%;
        }
      }
      .register_button {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>