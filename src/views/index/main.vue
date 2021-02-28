<style scoped>
  .header_nav {
    margin-right: 20px;
    position: relative;
    float: right;
    display: flex;
  }

  .ivu-layout-header {
    background-color: black;
  }

  .ivu-layout-header .ivu-menu {
    background-color: black;
  }

  .ivu-layout-sider-children {
    background: #2b343d;
  }

  .layout {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0px;
    margin: 0px;
    left: 0px;
    right: 0px;
  }
</style>
<template>
  <div class="layout">
    <Layout>
      <Header :style=" { height: '60px'}">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <MenuItem name="company">
            <p style="font-size: larger">{{this.company}}</p>
          </MenuItem>
          <div class="header_nav">
            <MenuItem name="1" >
              修改密码
            </MenuItem>
            <MenuItem name="2" style="padding: 0px">
              <Icon type="md-person" style="  font-size: 25px;"></Icon>
              {{this.$store.getters.userName}}
            </MenuItem>
            <MenuItem name="3" style="padding-right: 0px;padding-top: 0px;padding-bottom: 0px"  >
              <span  @click="loginOut">退出</span>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout  :style="{
        width: '100%',
        position: 'fixed',
        top: '60px',
        left: '0px',
        bottom: '0px',
      }">
        <Sider style=" overflow-x: hidden;">
          <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']" @on-select="menuSelect">
            <Submenu name="1">
              <template slot="title">
                首页
              </template>
              <MenuItem name="1-1" :to="'/'">
                消息提醒
              </MenuItem>
              <MenuItem name="1-2" :to="'/head/dataAnaly'">
                数据分析
              </MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                客户管理
              </template>
              <MenuItem name="custManager" :to="'/cust'">
                客户管理查询
              </MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                合同管理
              </template>
              <MenuItem name="3-1" :to="'/contract'">
                合同查询管理
              </MenuItem>
            </Submenu>
            <MenuItem name="4">
              报表管理
            </MenuItem>
            <MenuItem name="5">
              系统管理管理
            </MenuItem>
          </Menu>
        </Sider>
        <Content style="height: auto">
          <contain></contain>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  import {STATIC_CONFIG} from "../../assets/js/config";
  import custManager from "../cust/custManager";
  import custDetails from "../cust/custDetails";
  import Contain from "./contain";

  export default {
    components: {
      Contain,
      custManager, custDetails
    },
    name: "mainContent",
    data() {
      return {
        company: STATIC_CONFIG.company,
        userlog: require("../../assets/pic/user.png"),
        curContain: '',
      }
    },
    methods: {
      menuSelect: function (name) {
        // // this.$router.push("/cust");
        // this.curContain =name;
      },
      loginOut(){
        this.$store.dispatch('loginOut');
        this.$router.push("/login");
      }
    },

  }
</script>

