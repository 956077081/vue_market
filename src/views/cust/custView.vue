<template>
  <div>
    <div class="page_main_title">客户详情</div>
    <div class="page_main" style="margin-right: 50px;position: relative;">
      <Row>
      <Form :label-width="200" :disabled="true">
          <Col span="12">
            <FormItem label="客户类型">
              <span slot="label"> 客户类型 </span>
              {{ dictValue('custTypeDict',customer.custType)}}
            </FormItem>
          </Col>
        <template v-if="customer.custType =='01'">
            <Col span="12">
              <FormItem label="公司名称">
                <span slot="label">公司名称</span>
                <span>{{customer.custName}}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="证件类型">
                <span slot="label"> 证件类型</span>
                <span>  {{ dictValue('compIdTypes',customer.idType)}}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="证件号码">
                <span slot="label">证件号码</span>
                <span>{{customer.idNum}}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="法人名称">
                <span slot="label">法人名称</span>
                <span>{{customer.lawName}}</span>
              </FormItem>
            </Col>

            <Col span="12">
              <FormItem label="法人身份证件号码">
                <span slot="label">法人身份证件号码</span>
                <span>{{customer.lawNum}}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="法人手机号码">
                <span slot="label">法人手机号码</span>
                <span>{{customer.lawMobile}}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="注册资本">
                <span>{{customer.registerMoney}}&nbsp;元</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="邮箱">
                <span>{{customer.email}}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="公司注册时间">
                <span>{{customer.registerTime}}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="行业">
                <span>{{customer.profession}}</span>
              </FormItem>
            </Col>
        </template>
        <template v-if="customer.custType== '00'">
            <Col span="12">
              <FormItem label="客户名称">
                <span slot="label"> 客户名称</span>
                <span>{{customer.custName}}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="证件类型">
                <span slot="label"> 证件类型</span>
                <span>  {{ dictValue('peopIdTypes',customer.idType)}}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="证件号码">
                <span slot="label">证件号码</span>
                <span>{{customer.idNum}}</span>
              </FormItem>
            </Col>
          <Col span="12">
            <FormItem label="性别">
              <span slot="label">性别</span>
              <span>{{dictValue('sex',customer.sex)}}</span>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="年龄">
              <span slot="label">年龄</span>
              <span>{{customer.age}}</span>
            </FormItem>
          </Col>
            <Col span="12">
              <FormItem label="邮箱">
                <span>{{customer.email}}</span>
              </FormItem>
            </Col>

        </template>
          <Col span="12">
            <FormItem label="地址">
              <span>{{customer.address}}</span>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="联系电话">
              <span>{{customer.phone}}</span>
            </FormItem>
          </Col>
      </Form>
     </Row>
      <Row>
        <Col span="24" style="text-align: center"><Button  @click="callBack">返回</Button></Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import {postMgr} from "../../assets/js/http";

  export default {
    name: "custView",
    data() {
      return {
        customer: {
          operatorCode: '',
          operatorName: '',
          custName: '',
          custType: "01",
          idType: '11',
          idNum: '',
          lawName: '',
          lawNum: '',
          registerTime: '',
          registerMoney: 0,
          profession: '',
          address: '',
          lawMobile: '',
          phone: '',
          email: '',
          age:null ,
          sex:null
        }

      }
    },
    methods: {
      dictValue(type, value) {
        return this.$getDictLable(type, value);
      },
      callBack() {
        this.$router.push('/cust/custmanager')
      },

    },created() {
      postMgr('/customer/get/'+this.$route.query.code).then(res=>{
        this.customer = res.data ;
        }).catch(err=>{
        this.$Message.error({
          background: true,
          content: '查询错误!'
        })
        this.$router.push('/cust/custmanager');
      })
    }
  }
</script>

<style scoped>

</style>
