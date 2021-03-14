<style scoped>
  input:disabled {
    color: red;
  }

  .cust_head .cust_head_consule .consule_label {
    text-align: right;
    margin-right: 10px;
    margin-top: 5px;
    font-size: small;
  }

  .cust_head .cust_head_consule {
    margin-top: 5px;
  }

  .foot_page {
    position: relative;
    top: 30px;
  }
</style>
<template>
  <div>
    <div class="page_main_title"> {{title}}</div>
    <div class="page_main" style="margin-right: 50px;position: relative;">
      <Form :label-width="200">
        <Row>
          <Divider orientation="left"><p style="font-size: small"> 客户信息</p></Divider>
          <Col span="8">
            <FormItem>
              <span slot="label"><require-element name="客户名称"></require-element></span>
              <div style="display: flex">
                <Input v-model="customer.custName" :disabled="true"></Input>
                <Button v-if="operate !='update'" style="margin-left: 20px" size="small" @click="displayCustView">选择客户</Button>
              </div>
              <Modal v-model="displayCustPage" width="1000" title="请选择客户" @on-ok="retCust" @on-cancel="cancleCust">
                <div class="cust_head">
                  <Row class="cust_head_consule">
                    <Col span="2" class="consule_label">
                      <span>客户类型</span>
                    </Col>
                    <Col span="4">
                      <Select v-model="custParam.custType" @on-change="changeCustType2">
                        <Option v-for=" cust in custTypes" :key="cust.value" :value="cust.value"> {{cust.label}}
                        </Option>
                      </Select>
                    </Col>
                    <Col span="2" class="consule_label">
                      <span>客户名称</span>
                    </Col>
                    <Col span="4">
                      <Input v-model="custParam.custName"></Input>
                    </Col>
                    <Col span="2" class="consule_label">
                      <span> 证件类型</span>
                    </Col>
                    <Col span="4">
                      <Select v-model="custParam.idType">
                        <Option v-for=" idType in getIdTypeDict2" :key="idType.value" :value="idType.value">
                          {{idType.label}}
                        </Option>
                      </Select>
                    </Col>
                  </Row>
                  <Row class="cust_head_consule">
                    <Col span="2" class="consule_label">
                      <span>证件号码</span>
                    </Col>
                    <Col span="4">
                      <Input></Input>
                    </Col>
                  </Row>
                  <Row style="top: 5px">
                    <Col span="24">
                      <Button @click="searchCust">查询</Button>
                    </Col>
                  </Row>
                </div>
                <Table :columns="custColumns" :data="custList" highlight-row :max-height="400" style="top: 10px;"
                       @on-row-click="selectCust"></Table>
                <Page :current="custParam.currPage" :page-size="custParam.pageSize" @on-change="changePage"
                      @on-page-size-change="changePageSize" class="foot_page" :total="custParam.count" size="small"
                      show-elevator
                      show-sizer/>
              </Modal>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <span slot="label"><require-element name="客户类型"></require-element></span>
              <Select v-model="customer.custType" :disabled="true" @on-change="changeCustType1">
                <Option v-for=" cust in custTypes" :key="cust.value" :value="cust.value"> {{cust.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <span slot="label"><require-element name="证件类型"></require-element></span>
              <Select v-model="customer.idType" :disabled="true">
                <Option v-for=" idType in getIdTypeDict" :key="idType.value" :value="idType.value"> {{idType.label}}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <span slot="label"><require-element name="证件号码"></require-element></span>
              <Input v-model="customer.idNum" :disabled="true"></Input>
            </FormItem>
          </Col>
          <Divider orientation="left"><p style="font-size: small"> 合同详情</p></Divider>
          <Col span="8">
            <FormItem>
              <span slot="label"><require-element name="合同编号"></require-element></span>
              <Input v-model="contractDetails.contractName"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <span slot="label"><require-element name="金额"></require-element></span>
              <InputNumber style="width: auto" :min="0" :max="999999999" :disabled="operate == 'update'"
                           v-model="contractDetails.totalMoney"
                           @keyup.native="filterMoney" ></InputNumber>&nbsp;元
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <span slot="label"><require-element name="合同开始日期"></require-element></span>
              <DatePicker type="date" style="width: 200px" v-model="contractDetails.startTime"></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <span slot="label">期限</span>
              <Input style="width: auto" v-model="contractDetails.term" @keyup.native="filterTerm"></Input>
              &nbsp;
              月
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <span slot="label"><require-element name="到期日期"></require-element></span>
              <DatePicker type="date" style="width: 200px" v-model="contractDetails.endTime"></DatePicker>
            </FormItem>
          </Col>
<!--          修改页面不显示打款详情-->
          <template v-if="operate != 'update'">
            <Divider orientation="left"><p style="font-size: small"> 打款账户详情</p></Divider>
            <Col span="8">
              <FormItem>
                <span slot="label"><require-element name="支付类型"></require-element></span>
                <Select v-model="account.payType">
                  <Option v-for=" type in payTypes" :key="type.value" :value="type.value">
                    {{type.label}}
                  </Option>
                </Select></FormItem>
            </Col>
            <Col span="8" v-if="isHiddenPayMethod">
              <FormItem>
                <span slot="label">支付方式</span>
                <Select v-model="account.payMethod">
                  <Option v-for=" meth in payMethods" :key="meth.value" :value="meth.value">
                    {{meth.label}}
                  </Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem>
                <span slot="label">打款账号</span>
                <Input v-model="account.accountNum"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem>
                <span slot="label">打款金额</span>
                <InputNumber style="width: auto" :min="0" :max="999999999" :disabled="operate == 'update'"
                             v-model="account.payMoney"
                             @keyup.native="filterMoney(account.payMoney)" ></InputNumber>&nbsp;元
              </FormItem>
            </Col>
          </template>
        </Row>
        <Row>
          <Col style="text-align: center;margin-top: 30px">
            <Button v-if="this.operate == 'create'" size="large" @click="save">保存</Button>
            <Button v-if="this.operate == 'update'" size="large" @click="update">保存</Button>
            <Button size="large" style="margin-left: 30px;" @click="callBack">返回</Button>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>

<script>

  import RequireElement from "../../components/common/requireElement";
  import {getDictByType} from "../../assets/js/dict";

  export default {
    name: "contractDetails",
    components: {RequireElement},
    data() {
      return {
        operate: '',
        contractDetails: {
          code: '',
          contractName: '',
          startTime: null,
          endTime: null,
          totalMoney:0,
          term: 0,
          managerCode: '',
          operatorCode: '',
          operatorName: ''
        },
        account: {
          payMoney: 0,
          payType: '',
          payMethod: '',
          accountNum: '',
          operatorCode: '',
          operatorName: ''
        },
        customer: {
          code: '',
          custCode: '',
          custName: '',
          custType: '',
          idType: '',
          idNum: ''
        },
        custParam: {
          custType: '',
          custName: '',
          idType: '',
          idNum: '',
          currPage: 1,
          pageSize: 10,
          total: 0
        },
        custColumns: [
          {
            type: 'index',
            width: 100,
            align: 'center',
            title: '序号'
          },
          {
            title: '客户名称',
            key: 'custName'
          },
          {
            title: '客户类型',
            key: 'custType'
          },
          {
            title: '证件类型',
            key: 'idType'
          },
          {
            title: '证件号码',
            key: 'idNum'
          },
          {
            title: '法人名称',
            key: 'lawName'
          },
          {
            title: '电话号码',
            key: 'phone'
          }
        ],
        custList: [],
        title: '',
        payTypes: getDictByType('payType'),
        payMethods: getDictByType('payMethod'),
        custTypes: getDictByType('custTypeDict'),
        displayCustPage: false
      }
    },
    created() {
      let operate = this.$route.query.operate;
      this.operate = operate;
      if (operate == 'create') {
        this.createContractName();
        this.title = '合同录入';
      } else if (operate == 'update') {
        this.code = this.$route.query.code;
        this.title = '合同修改';
      } else {
        this.$router.push("/contract");
        this.$Message.error({
          background: true,
          content: '页面发生错误！'
        })
      }

    },
    mounted() {
      if (this.operate == 'update') {
        this.queryContract();
      }
    },
    computed: {
      isHiddenPayMethod() {
        if (this.account.payType == '00') {
          return true;
        }
        //线下清空支付方式
        this.account.payMethod = '';
        return false;
      },
      getIdTypeDict() {
        if (this.customer.custType == '00') {
          return getDictByType('peopIdTypes');
        } else {
          return getDictByType('compIdTypes');
        }
        return [];
      },
      getIdTypeDict2() {

        if (this.custParam.custType == '00') {
          return getDictByType('peopIdTypes');
        } else {
          return getDictByType('compIdTypes');
        }
        return [];
      }
    },
    methods: {

      filterMoney(money) {

        if (money != null && money != "") {
          money = Number(money).toFixed(2);
        }
      },
      filterTerm() {
        this.contractDetails.term = this.contractDetails.term.replace(/[^\.\d]/g, '');
        this.contractDetails.term = this.contractDetails.term.replace('.', '');
        if (this.contractDetails.term.length > 4) {
          this.contractDetails.term = this.contractDetails.term.substr(0, 4);
          this.$Message.info({
            content: '期限长度不能大于4位'
          })
        }

        if (this.contractDetails.startTime != null && this.contractDetails.startTime != "") {
          this.contractDetails.term = Number(this.contractDetails.term).toFixed(0);
          if (this.contractDetails.term != 0) {
            let date = new Date();
            date.setTime(this.contractDetails.startTime.getTime())
            if (date instanceof Date && !isNaN(this.contractDetails.term)) {
              let givenMonth = date.getMonth();
              let newMonth = givenMonth + Number(this.contractDetails.term);
              date.setMonth(newMonth);
              this.contractDetails.endTime = date;
            } else {
              this.contractDetails.endTime = '';
            }
          }
        }
      },
      changeCustType1() {
        this.customer.idType = '';
      },
      changeCustType2() {
        this.custParam.idType = '';
      },
      selectCust(data, index) {
        this.customer.custType = data.custType;
        this.customer.custName = data.custName;
        this.customer.idType = data.idType;
        this.customer.idNum = data.idNum;
        this.customer.code = data.code;
      },
      retCust() {
        // console.log(this.customer)
      },
      cancleCust() {
        this.customer.custType = '';
        this.customer.custName = '';
        this.customer.idType = '';
        this.customer.idNum = '';
        this.customer.code = '';
      },
      save() {
        if (this.validate()&&this.validateAccount()) {
          let param = {
            'contractdetails': this.contractDetails,
            'account': this.account,
            'customer': this.customer
          };
          this.$postMgr("/contract/save", param).then(res => {
            this.$Message.success({
              background: true,
              content: '合同保存成功！'
            });
            this.$router.push("/contract");
          }).catch(err => {
            this.$Message.error({
              background: true,
              content: '保存合同失败,'+err.data.mess
            });
          })
        }
      },
      queryContract() {
        this.$postMgr("/contract/get/" + this.code).then(res => {
          this.contractDetails = res.data.contractdetails;
          this.customer = res.data.customer;
          this.account.payMoney =this.contractDetails.totalMoney;
        }).catch(err => {
          this.$Message.error({
            background: true,
            content: '合同查询失败！'
          })
          this.$router.push("/contract");
        })
      },
      changePage(curr) {
        this.custParam.currPage = curr;
        this.searchCust()
      },
      changePageSize(num) {
        this.custParam.currPage = 1;
        this.custParam.pageSize = num;
        this.searchCust();
      },
      searchCust() {
        this.$postMgr('/customer/list', this.custParam, 'get').then(res => {
          this.custList = res.data.content;
          if (this.custList != null && this.custList.length > 0) {
            this.custParam.count = res.data.totalSize;
          }
        }).catch(err => {
          this.$Message.error({
            background: true,
            content: '查询客户失败！'
          });
        })
      },
      validate() {
        if (this.customer.code == "" || this.customer.code == null) {
          this.$Message.error({
            background: true,
            content: '请选择该合同的客户！'
          })
          return false;
        }
        if (this.contractDetails.totalMoney == null || this.contractDetails.contractName == "" || this.contractDetails.startTime == "" | this.contractDetails.endTime == "") {
          this.$Message.error({
            background: true,
            content: '合同模块必填字段不能为空！'
          })
          return false;
        }

        if (this.contractDetails.startTime > this.contractDetails.endTime) {
          this.$Message.error({
            background: true,
            content: '到期日期应该大于合同开始日期！'
          })
          return false;
        }
        return true;
      },
      validateAccount(){
          if(this.account.payType == ""){
            this.$Message.error({
              background: true,
              content: '打款必填字段不能为空！'
            })
            return false;
          }
          return true;
      },
      update() {
        if(!this.validate()){
          return;
        }
        this.$postMgr("/contract/update",{'contractdetails':this.contractDetails}).then(res=>{
            this.$router.push("/contract")
        }).catch(err=>{
          this.$Message.error({
            background: true,
            content: '合同修改保存失败！'
          })
        })
      },
      callBack() {
        this.$router.push("/contract")
      },
      createContractName() {
        this.$postMgr('/contract/getContractName', {'custCode': this.customer.code}).then(res => {
          this.contractDetails.contractName = res.data;
        }).catch(err => {
          this.contractDetails.contractName = '';
        })
      },
      displayCustView() {
        this.searchCust();
        this.displayCustPage = true;
      }
    }
  }
</script>

<style scoped>

</style>
