<template>
  <div class="yf-vertical-layout">
    <img src="../../assets/zhengfeng.png" style="position: absolute" width="100%" height="100%"/>
    <Row
      type="flex"
      align="middle"
      justify="center"
      style="position: relative; flex: 1 1 70%"
    >
      <Col span="25">
        <Card shadow style="width: 400px;background-color: rgba(0, 0, 0,0.1);text-align: center">
          <p slot="title" >{{company}}</p>
          <Form>
            <FormItem  >
              <Input type="text" placeholder="请输入账号" size="large" v-model="username"></Input>
            </FormItem>
            <FormItem  >
              <Input type="password" placeholder="请输入密码" size="large" v-model="password"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" long  size="large" @click.native.prevent="handleLogin()">登陆</Button>
            </FormItem>
            <div class="error">
              <span v-if="error">
                {{errorMsg}}
              </span>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    name: "login",
    data() {
      return {
        username: "",
        password: "",
        error: false,
        errorMsg: "",
        company: ""
      }
    },
    methods: {
      handleLogin: function () {
        var validateParam = [
          {
            name: 'username', label: '账号'
          },
          {
            name: 'password', label: '密码'
          }
        ];
        if (validateParam.some(item => {
          if (this.$data[item.name] == "") {
            this.errorMsg = "您还没有输入" + item.label
            return true;
          } else {
            return false;
          }
        })
        ) {
          this.error = true;
          return;
        }
        let reqParam = {//过滤空格
          username: this.username,
          password: this.password,
        }

        //发送登陆请求
        this.$store.dispatch('Login', reqParam).then(res => {
          this.$router.push("/");
        }).catch(err => {
          this.error = true;
          this.errorMsg = "登陆异常"+err.data.mess;
        })

      }
    },
    created() {
      window.sessionStorage.clear();
      let code=  this.$route.query.compCode;
      if(!code){
        code="";
      }
      window.sessionStorage.setItem("COMPCODE",code.toString().toUpperCase());//给默认值可能为空
      this.$postMgr("/admin/queryComp").then(res=>{
       let compInfo ={
         compName : res.data.compName,
         groupID: res.data.groupID,
         compCode:res.data.compCode
       }
        this.company =res.data.compName;
        window.sessionStorage.setItem("COMPCODE",res.data.compCode);//为空时覆盖空值
        window.sessionStorage.setItem("compInfo",JSON.stringify(compInfo));
       }).catch(err=>{
         this.$router.push("/error");
       })
    },
    mounted() {

    }
  }
</script>

<style scoped>
  /* 垂直分割容器 */
  .yf-vertical-layout {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }

  .error {
    color: red;
  }
</style>
