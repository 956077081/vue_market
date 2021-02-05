<style scoped>
  .header_nav {
    margin-right: 20px;
    width: 200px;
    position: relative;
    float: right;
  }
  .ivu-layout-header{
    background-color: black;
  }
  .ivu-layout-header .ivu-menu{
    background-color: black;
  }
</style>
<template>
  <div class="layout">
    <Layout>
      <Header >
        <Menu mode="horizontal" theme="dark" active-name="1" >
            <MenuItem name="company" >
                <p style="font-size: larger">{{this.company}}</p>
            </MenuItem>
          <div class="header_nav">
            <MenuItem name="1" style="right: 20px">
              修改密码
            </MenuItem>
            <MenuItem name="2" style="padding: 0px">
              <Icon type="md-person" style="  font-size: 25px;" ></Icon>
              张三
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider  style="background: #ffffff; overflow-x: hidden">
          <Menu active-name="2-1" theme="light" width="auto" :open-names="['2']"   @on-select="menuSelect">
            <Submenu name="1">
              <template slot="title">
                首页
              </template>
              <MenuItem name="1-1">
                消息提醒
              </MenuItem>
              <MenuItem name="1-2">
                数据分析
              </MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                客户管理
              </template>
              <MenuItem name="custManager"  >
                客户管理查询
              </MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                营销管理
              </template>
              <MenuItem name="3-1">
                营销查询管理
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
        <Content>
          <component :is="this.curContain" @updatePage="updatePage"></component>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  import {STATIC_CONFIG} from "../../assets/js/config";
  import custManager from "../cust/custManager";
  import custDetails from "../cust/custDetails";
  export default {
    components:{
      custManager,custDetails
    },
    name: "mainContent",
    data(){
      return{
        company: STATIC_CONFIG.company,
        userlog: require("../../assets/pic/user.png"),
        curContain: ''
      }
    },
    methods:{
      menuSelect:function(name) {
        this.curContain =name;
      },
      updatePage(page){
        this.curContain =page;
      }
    },

  }
</script>

