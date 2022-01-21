<template>
  <div class="person_contaniner">
    <Navigation />
    <BreakCrumb>
      <template #title> 个人信息 </template>
    </BreakCrumb>
    <div class="contant">
      <div class="bg_img">
        <img src="@/assets/bg-img.jpg" />
      </div>
      <div class="personal_info_contant">
        <div class="avatar">
          <a-avatar
            :size="150"
            shape="square"
            :style="{ backgroundColor: info.avtarColor }"
          >
            {{ info.name?.substr(-2, 2) }}
          </a-avatar>
        </div>
        <div class="infomation">
          <div class="studentAccount">
            <div>
              <span class="account">账号：</span>{{ info.studentAccount }}
              <span class="account">密码：*******</span>
              <a-tooltip>
                <template #title>
                  <span>修改密码</span>
                </template>
                <a @click="changePass()">
                  <LockOutlined style="marginleft: 10px; cursor: pointer" />
                </a>
              </a-tooltip>
            </div>
            <a-button @click="editHandler()" v-if="!editFlag">
              <template #icon><EditOutlined /></template>
              编辑个人资料
            </a-button>
          </div>
          <a-divider />
          <div class="read_only" v-if="!editFlag">
            <ReadInfo :info="info" :cityName="cityName" />
          </div>
          <div class="edit_info" v-if="editFlag">
            <EditInfo
              :info="info"
              @editInfos="editInfosClick"
              @cancelEdit="cancelEdit"
              @submitInfo="submitInfo"
            />
          </div>
        </div>
      </div>
    </div>
    <PassWord :visible="visible" @closeModal="closeModal" />
    <Footer />
  </div>
</template>

<script>
import { getCurrentInstance, onBeforeMount, reactive, ref } from "vue";
import { EditOutlined, LockOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import options from "@/util/cascader-address-options.js";
import BreakCrumb from "@/components/bread-crumb/BreakCrumb.vue";
import Navigation from "@/components/nav/Navigation.vue";
import ReadInfo from "./read-info/ReadInfo.vue";
import PassWord from "./PassWord.vue";
import Footer from "@/components/footer/Footer.vue";
import EditInfo from "./edit-info/EditInfo.vue";
export default {
  name: "PersonalInfo",
  components: {
    Navigation,
    BreakCrumb,
    Footer,
    EditInfo,
    LockOutlined,
    EditOutlined,
    ReadInfo,
    PassWord,
  },
  setup() {
    const { proxy: ins } = getCurrentInstance();
    const info = reactive({});
    const editFlag = ref(false);
    const cityName = ref();
    const visible = ref(false);
    const editInfo = reactive({});
    const getPersonalInfo = () => {
      ins.$http
        .post("/StudentInformation/selectOneStudentUserInformation")
        .then((res) => {
          if (res.results) {
            res.results.sex = res.results.sex ? "0" : "1";
            Object.assign(info, res.results);
            info.avtarColor = info.sex === "0" ? "#f56a00" : "#1890ff";
            const provincesCode = res.results.city?.substr(0, 2);
            const cityCode = res.results.city?.substr(0, 4);
            const areasCode = res.results.city;
            options.forEach((province) => {
              if (province.value === provincesCode) {
                province.children.forEach((citys) => {
                  if (citys.value == cityCode) {
                    citys.children.forEach((areas) => {
                      if (areas.value === areasCode) {
                        cityName.value = `${province.label}/${citys.label}/${areas.label}`;
                      }
                    });
                  }
                });
              }
            });
            editFlag.value = false;
          }
        });
    };
    onBeforeMount(() => {
      getPersonalInfo();
    });
    const editInfosClick = (value) => {
      Object.assign(editInfo, value);
    };
    const editHandler = () => {
      editFlag.value = true;
    };
    const cancelEdit = () => {
      editFlag.value = false;
    };

    const changePass = () => {
      visible.value = true;
    };
    const closeModal = () => {
      visible.value = false;
    };
    const submitInfo = () => {
      const {
        sex,
        city,
        age,
        calculate,
        name,
        details,
        email,
        phone,
        occupation,
      } = editInfo;
      const state = {
        sex: sex === "0" ? true : false,
        city: city[city.length - 1],
        age,
        calculate,
        name,
        details,
        email,
        phone,
        occupation,
      };
      ins.$http
        .post("/StudentInformation/updateStudentInformation ", state)
        .then(
          (_) => {
            message.success("修改成功", 1);
            getPersonalInfo();
          },
          (_) => {
            message.error("修改失败，稍后再试！", 1);
          }
        );
    };
    return {
      info,
      editFlag,
      editInfo,
      cityName,
      visible,
      editHandler,
      changePass,
      editInfosClick,
      closeModal,
      cancelEdit,
      submitInfo,
    };
  },
};
</script>

<style lang="less" scoped>
.person_contaniner {
  width: 100%;
  .contant {
    width: calc(100% - 50%);
    min-height: calc(100vh - 44px);
    margin: 10px auto 0;
    background-color: white;
    .bg_img {
      width: 100%;
      height: 250px;
      overflow: hidden;
      img {
        width: 100%;
        transform: translateY(-20%);
      }
    }
    .personal_info_contant {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 20px;
      .avatar {
        height: 150px;
        margin-right: 10px;
        transform: translateY(-30%);
        :deep(.ant-avatar-string) {
          font-size: 36px;
        }
      }
      .infomation {
        padding: 0 20px;
        width: calc(100% - 150px);
        .studentAccount {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .account {
            font-weight: 600;
            &:nth-child(2) {
              margin-left: 20px;
            }
          }
          .submit_button {
            button:nth-child(1) {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>