<style scoped>
  .header_nav {
    float: right;
    margin-right: 20px;
    position: relative;
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
  <div>
    <div class="layout">
      <Layout>
        <Header :style=" { height: '60px'}">
          <Menu mode="horizontal" theme="dark">
            <MenuItem name="company">
              <p style="font-size: larger">{{this.company}}</p>
            </MenuItem>
            <div class="header_nav">
              <MenuItem name="1" style="width:150px;font-size: medium;text-align: center">
                <p size="large" @click="showUpdateWord">修改密码</p>
              </MenuItem>
              <MenuItem name="2" style="padding: 0px;font-size: medium">
                <Icon type="md-person" style="  font-size: 25px;"></Icon>
                {{this.$store.getters.userName}}
              </MenuItem>
              <MenuItem name="3" style="padding:0px;font-size: medium;width: 100px;text-align: center">
                <span @click="loginOut">退出</span>
              </MenuItem>
            </div>
          </Menu>
        </Header>
        <Layout :style="{
        width: '100%',
        position: 'fixed',
        top: '60px',
        left: '0px',
        bottom: '0px',
      }">
          <Sider style=" overflow-x: hidden;">
            <Menu :active-name="$route.path" theme="dark" width="auto" :open-names="activeMent" @on-select="menuSelect">
              <Submenu v-for="menu in menutList"  :key="menu.url"  :name="menu.url">
                <template slot="title">
                  {{menu.name}}
                </template>
                <template  v-if="menu.sub != null && menu.sub.length >0">
                  <MenuItem v-for="subitem in menu.sub" :key="subitem.url" :name="subitem.url" :to="subitem.url" >
                      {{subitem.name}}
                  </MenuItem>
                </template>
              </Submenu>
            </Menu>
          </Sider>
          <Content style="padding: 10px ">
            <contain></contain>
          </Content>
        </Layout>
      </Layout>
    </div>
    <div>
      <Modal  v-model="isupdatePassword"  :closable="false"  footer-hide		>
          <template slot="header">
           <p style="font-size: large"> 修改密码</p>
          </template>
          <Form :label-width="100" style="font-size: large">
            <FormItem  >
              <template slot="label">
               <require-element name="新密码"></require-element>
              </template>
              <Input type="password" v-model="newpassword" placeholder="新密码"></Input>
            </FormItem>
            <FormItem  >
              <template slot="label">
                <require-element name="再次输入"></require-element>
              </template>
              <Input type="password" v-model="againpassword" placeholder="再次输入新密码" @keyup.native="validPassword()"></Input>
            </FormItem>
            <FormItem label="">
              <p style="color: red;font-size: medium" >{{userpassWord.errmsg}}</p>
            </FormItem>
            <div style="text-align: center">
              <Button size="large" @click="savePassword">确定</Button>
              <Button size="large" @click="canclePassword">取消</Button>
            </div>
          </Form>
        <div slot="footer"></div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import custManager from "../cust/custManager";
  import custDetails from "../cust/custDetails";
  import Contain from "./contain";
  import {getCompInfo} from "../../assets/js/project";
  import RequireElement from "../../components/common/requireElement";

  export default {
    components: {
      RequireElement,
      Contain,
      custManager, custDetails
    },
    name: "mainContent",
    data() {
      return {
        isupdatePassword: false,
        company: getCompInfo().compName,
        userlog: require("../../assets/pic/user.png"),
        curContain: '',
        newpassword:'',
        againpassword:'',
        userpassWord:{
          errmsg:''
        },
        menutList:this.$store.getters.menus
      }
    },
    methods: {
      menuAuth(parentUrl,childurl){
        console.log(parentUrl,childurl)
        let  length = this.menutList.length;
          for(let i=0;i<length ;i++){
            if(this.menutList[i].url ==parentUrl && this.menutList[i].url==childurl){
              return  true;
            }
          }
        return false;
      },
      savePassword(){
            if(this.newpassword ==null || this.newpassword.trim() ==''){
                this.userpassWord.errmsg ="新密码不能为空"
               return ;
             }
            if(this.newpassword != this.againpassword){
              this.userpassWord.errmsg= "密码不一致，请重新输入！";
              return ;
            }
            if(this.newpassword.trim().length <8){
              this.userpassWord.errmsg= "密码长度不得小于8位";
              return;
            }
            let param ={
              code:this.$store.getters.userCode,
              passWord: this.newpassword.trim()
            }
            this.$postMgr("/user/updateWord",param).then(res=>{
              this.$Message.success({
                content:'密码修改成功！',
                background:true,
                duration:3
              })
            }).catch(err=>{
              this.$Message.error({
                content:'修改异常，请重新操作！',
                background:true,
                duration:3
              })
            })
           //  初始化清除
        this.isupdatePassword= false;
        this.newpassword ="";
         this.againpassword ="";
      },
      canclePassword(){
        this.isupdatePassword =false;
        this.newpassword ="";
        this.againpassword="";
      },
      showUpdateWord(){
        this.isupdatePassword =true;
      },
      menuSelect: function (name) {
      },
      loginOut() {
        this.$store.dispatch('loginOut');
        this.$router.push({path: "/login", query: {compCode: getCompInfo().compCode}});
      },
      validPassword(){
        if(this.newpassword != this.againpassword){
          this.userpassWord.errmsg= "密码不一致，请重新输入！"
        }else{
          this.userpassWord.errmsg="";
        }
      }
    },
    created() {
    },
    computed: {
      activeMent() {
        let router = this.$route.path;
        let routs = router.split('/');
        return routs;
      }
    }
  }
</script>

