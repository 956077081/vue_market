<template>
  <div >
    <div class="page_main_title">合同详情</div>
    <div class="page_main" style="margin: 0 50px;position: relative; border: 2px solid #dcdee2;background-color: #f8f8f9">
      <Form :label-width="200">
        <Row>
          <Divider orientation="left"><p style="font-size: small"> 客户信息</p></Divider>
          <Col span="8">
            <FormItem>
              <span slot="label"><require-element name="客户名称"></require-element></span>
              {{customer.custName}}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <span slot="label"><require-element name="客户类型"></require-element></span>
              {{getDict('custTypeDict',customer.custType)}}

            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <span slot="label"><require-element name="证件类型"></require-element></span>
              {{getIdTypeDictValue()}}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <span slot="label"><require-element name="证件号码"></require-element></span>
              {{customer.idNum}}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <span slot="label">联系方式</span>
              {{customer.phone}}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <span slot="label">性别</span>
              {{getDict('sex',customer.sex)}}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <span slot="label">年龄</span>
              {{customer.age}}
            </FormItem>
          </Col>
        </Row>
        <Divider orientation="left"><p style="font-size: small"> 合同详情</p></Divider>
        <Row>
          <Col span="8">
            <FormItem>
              <span slot="label"><require-element name="合同编号"></require-element></span>
              {{contractDetails.contractName}}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <span slot="label"><require-element name="金额"></require-element></span>
              {{contractDetails.totalMoney}}元
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <span slot="label"><require-element name="合同开始日期"></require-element></span>
              {{formatDate(contractDetails.startTime)}}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <span slot="label">期限</span>
              {{contractDetails.term}} 月
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <span slot="label"><require-element name="到期日期"></require-element></span>
              {{formatDate(contractDetails.endTime)}}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <Divider orientation="left"><p style="font-size: small"> 打款账户详情</p></Divider>
            <div style="text-align:center;position: relative;">
              <Table  size="small" :columns="accountColumns" :data="accountList" :max-height="600">
                <template slot-scope="{ row, index }" slot="type">
                  {{getDict('accountType',row.type)}}
                </template>
                <template slot-scope="{ row, index }" slot="payType">
                  {{getDict('payType',row.payType)}}
                </template>
                <template slot-scope="{ row, index }" slot="payMethod">
                  {{getDict('payMethod',row.payMethod)}}
                </template>
                <template slot-scope="{ row, index }" slot="createTime">
                  {{formatDateTime(row.createTime)}}
                </template>
              </Table>
            </div>
          </Col>
        </Row>
        <Row>
          <Col style="text-align: center;margin-top: 30px">
              <Button @click="callBack"> 返回</Button>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>

<script>
  import {getDictLable} from "../../assets/js/dict";
  import RequireElement from "../../components/common/requireElement";
  import {formatDate} from "../../assets/js/util"
  export default {
    components: {RequireElement},
    name: "contractView",
    data() {
      return {
        code: '',
        contractDetails: {
          contractName: '',
          startTime: null,
          endTime: null,
          term: 0,
          totalMoney: 0,
          managerCode: this.$store.getters.userCode,
          operatorCode: this.$store.getters.userCode,
          operatorName: this.$store.getters.userName
        },
        accountList: [],
        accountColumns: [
          {
            type: 'index',
            type: 'index',
            width: 100,
            align: 'center',
            title: '序号'
          },
          {key: 'type',title: '操作',slot: 'type'},
          {key: 'payMoney', title: '金额'},
          {key: 'payType', title: '支付类型',slot:'payType'},
          {key: 'payMethod', title: '支付方式',slot:'payMethod'},
          {key: 'accountNum', title: '打款账号'},
          {key: 'operatorName', title: '操作员'},
          {key: 'createTime', title: '打款/扣款时间',slot:'createTime'}
        ],
        customer: {
          code: '',
          custCode: '',
          custName: '',
          custType: '',
          idType: '',
          idNum: '',
          sex: null,
          age: null,
          phone: '',
        }
      }
    },
    created() {
      let contractCode= this.$route.query.code;
      if(contractCode == null ||contractCode == undefined|| contractCode ==''){
        this.$message.error({
          background: true,
          content: '合同详情查询错误！'
        })
        this.$router.push("/contract");
      }
      this.code = contractCode;
    },
    mounted() {
      this.$postMgr("/contract/get/"+this.code).then(res=>{
        console.log(res)
        this.customer =res.data.customer;
        this.accountList=res.data.accountMoneyDetails;
        this.contractDetails =res.data.contractdetails;
        console.log( this.customer )
      }).catch(err=>{
        this.$Message.error({
          background: true,
          content: '合同详情查询错误！'
        })
      })
    },
    methods: {
      callBack() {
        this.$router.push("/contract")
      },
      getDict(type, value) {
        return getDictLable(type, value);
      },
      getIdTypeDictValue() {
        if (this.customer.custType == "00") {
          return getDictLable('peopIdTypes', this.customer.idType);
        } else if (this.customer.custType == "01") {
          return getDictLable('compIdTypes', this.customer.idType);
        }
        return '';
      },
      formatDateTime(date){
        if( date != undefined && date != null &&date != ''){
          return  formatDate( new Date(date),'yyyy-MM-dd hh:mm:ss')
        }
      },
      formatDate(date){
        if( date != undefined && date != null &&date != ''){
          return  formatDate( new Date(date),'yyyy-MM-dd')
        }
      }
    }
  }
</script>

<style scoped>

</style>
