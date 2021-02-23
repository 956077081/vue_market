<style scoped>

</style>
<template>
  <div >
    <div class="page_main_title">{{getTitleName}}</div>
    <div class="page_main" style="margin-right: 50px;position: relative;">
      <Form :label-width="200">
        <Row>
          <Col span="12">
            <FormItem label="客户类型">
              <span slot="label"> <require-element name="客户类型"> </require-element></span>
              <Select v-model="customer.custType" @on-change="changeCustType">
                <Option v-for="custType in custTypeDict" :key="custType.value" :value ="custType.value">{{custType.label}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <template v-if="customer.custType =='01'">
          <Row>
            <Col span="12">
              <FormItem label="公司名称">
                <span slot="label"> <require-element name="公司名称"></require-element></span>
                <Input type="text" v-model="customer.custName"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="证件类型">
                <span slot="label"> <require-element name="证件类型"></require-element></span>
                <Select v-model="customer.idType">
                  <Option v-for="commIdType in compIdTypes " :value="commIdType.value" :key="commIdType.value">
                    {{commIdType.label}}
                  </Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="证件号码">
                <span slot="label"> <require-element name="证件号码"></require-element></span>
                <Input type="text" v-model="customer.idNum"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="法人名称">
                <span slot="label">法人名称</span>
                <Input type="text" v-model="customer.lawName"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>

            <Col span="12">
              <FormItem label="法人身份证件号码">
                <span slot="label">法人身份证件号码</span>
                <Input type="text" v-model="customer.lawNum"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="法人手机号码">
                <span slot="label">法人手机号码</span>
                <Input type="text" v-model="customer.lawMobile"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="注册资本">
                <InputNumber style="width: auto" :min="0" :max="999999999"
                             v-model="customer.registerMoney"></InputNumber>&nbsp;元
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="邮箱">
                <Input type="email" v-model="customer.email"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="公司注册时间" >
                <DatePicker type="date" style="width: 200px"  v-model="customer.registerTime" ></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="行业">
                <Input type="text"  v-model="customer.profession"></Input>
              </FormItem>
            </Col>
          </Row>
        </template>
        <template v-if="customer.custType== '00'">
          <Row>
            <Col span="12">
              <FormItem label="客户名称">
                <span slot="label"> <require-element name="客户名称"></require-element></span>
                <Input type="text" v-model="customer.custName"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="证件类型">
                <span slot="label"> <require-element name="证件类型"></require-element></span>
                <Select v-model="customer.idType">
                  <Option v-for="peopIdType in peopIdTypes " :value="peopIdType.value" :key="peopIdType.value">
                    {{peopIdType.label}}
                  </Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="证件号码">
                <span slot="label"> <require-element name="证件号码"></require-element></span>
                <Input type="text" v-model="customer.idNum"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="邮箱">
                <Input type="email" v-model="customer.email"></Input>
              </FormItem>
            </Col>
          </Row>
        </template>
        <Row>
          <Col span="12">
            <FormItem label="地址">
              <Input type="text" v-model="customer.address"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="联系电话">
              <Input type="text" v-model="customer.phone"></Input>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col style="text-align: center;margin-top: 30px">
            <Button size="large" style="background-color:#b6b7ba " @click="save">保存</Button>
            <Button size="large" style="margin-left: 30px;background-color:#b6b7ba" @click="callBack">返回</Button>
          </Col>
        </Row>
      </Form>
    </div>
  </div>

</template>

<script>
  import RequireElement from "../../components/common/requireElement";
  import dict from "../../assets/js/dict";
  export default {
    name: "custDetails",
    components: {RequireElement},
    data() {
      return {
        operate: 'insert',
        customer: {
          operatorCode: this.$store.getters.userCode,
          operatorName: this.$store.getters.userName,
          custName: '',
          custType: "01",
          idType: '',
          idNum: '',
          lawName: '',
          lawNum: '',
          registerTime: '',
          registerMoney: 0,
          profession: '',
          address: '',
          lawMobile: '',
          phone: '',
          email: ''
        },
        compIdTypes: dict.compIdTypes,
        peopIdTypes: dict.peopIdTypes,
        custTypeDict:dict.custTypeDict
      }
    },
    computed: {
      getTitleName: function () {
        if(this.operate == 'create') {
          return '新增客户';
        }else if(this.operate == 'view'){
          return  '查看客户详情';
        }else  if(this.operate == 'update'){
          return  '修改客户';
        }
        this.$router.push("/cust");
        this.$Message.error({
          background: true,
          content: '页面发生错误！'
        })
      }
    },
    created() {
      this.operate = this.$route.query.operate;
    },
    methods: {
      changeCustType() {

      },
      callBack() {
        this.$router.push('/cust/custmanager')
      },
      save() {
        if(!this.checkParam()){
          this.$Message.info({
            background: true,
            content: '客户基本信息【名称、证件类型、证件号码】不能为空！'
          });
          return;
        }
        this.$postMgr('/customer/create', this.customer).then(res => {
          if(res.data!= true){
            this.$Message.error({
              background: true,
              content: '创建客户失败,'+res.mess
            });
            return;
          }
          this.$Message.info({
            background: true,
            content: '创建客户成功！'
          });
          this.$router.push('/cust/custmanager')
        }).catch(res=>{
          this.$Message.error({
            background: true,
            content: '创建客户失败！'
          });
        })
      },
      checkParam(){
        if(this.customer.custName.trim() == '' ||this.customer.custType.trim() == ''||this.customer.idType.trim() == ''||this.customer.idNum.trim() == '' ){
            return false;
        }
        return  true;
      }
    }
  }

</script>

<style scoped>

</style>
