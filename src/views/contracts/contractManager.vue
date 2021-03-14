<style scoped>
  .head_page {
    position: relative;
    padding-top: 20px;
    font-size: medium;
  }


  .font_move {
    position: relative;
    padding-top: 5px;
    width: 200px;
  }
</style>
<template>
  <div>
    <div>
      <div><p class="page_main_title">合同查询管理</p></div>
      <div class="page_main">
        <Row>
          <Col span="4">
            <div class='ele_name'>客户名称</div>
          </Col>
          <Col span="4">
            <div>
              <Input type="text" placeholder="客户名称" v-model="param.custName"></Input>
            </div>
          </Col>

          <Col span="4">
            <div class='ele_name'>证件类型</div>
          </Col>
          <Col span="4">
            <div>
              <Select v-model="param.idType">
                <Option value="">请选择</Option>
                <Option v-for="idType in IdTypedict " :value="idType.value" :key="idType.value">
                  {{idType.label}}
                </Option>
              </Select>
            </div>
          </Col>
          <Col span="4">
            <div class='ele_name'>证件号码</div>
          </Col>
          <Col span="4">
            <div>
              <Input type="text" placeholder="证件号码" v-model="param.idNum"></Input>
            </div>
          </Col>
        </Row>
        <Row>

          <Col span="4">
            <div class='ele_name'>合同状态</div>
          </Col>

          <Col span="4">
            <div>
              <Select v-model="param.status">
                <Option value="">请选择</Option>
                <Option v-for="contractStatus  in contractStatusList" :key="contractStatus.value"
                        :value="contractStatus.value">{{contractStatus.label}}
                </Option>
              </Select>
            </div>
          </Col>
          <Col span="4">
            <div class='ele_name'>合同编号</div>
          </Col>
          <Col span="4">
            <div>
              <Input type="text" placeholder="合同编号" v-model="param.contractName"></Input>
            </div>
          </Col>
          <Col span="4">
            <div class='ele_name'>操作员名称</div>
          </Col>
          <Col span="4">
            <div>
              <Input type="text" placeholder="操作员名称" v-model="param.operatorName"></Input>
            </div>
          </Col>

        </Row>
        <Row>
          <Col span="4">
            <div class='ele_name'>合同到期时间</div>
          </Col>
          <Col span="4">
            <div>
              <DatePicker type="date" placeholder="开始时间" v-model="param.startEndTime"></DatePicker>
              ~
            </div>
          </Col>
          <Col span="8">
            <div>
              <DatePicker type="date" placeholder="结束时间" v-model="param.endEndTime"></DatePicker>
            </div>
          </Col>
        </Row>
        <Row style="padding-top: 20px">
          <div>
            <Col span="2" style="display: flex;">
              <Button @click="search">查询</Button>&nbsp;&nbsp;
              <Button @click="insertContract">新增合同</Button>
            </Col>
          </div>
        </Row>
      </div>
    </div>
    <div>
      <Table :columns="contractColumns" :data="contractList">
        <template slot-scope="{ row, index }" slot="idType">
          {{getIdtypeLable(row.custType,row.idType)}}
        </template>
        <template slot-scope="{ row, index }" slot="status">
          {{getDict('contractStatus',row.status)}}
        </template>
        <template slot-scope="{ row, index }" slot="startTime">
          {{formatTime(row.startTime)}}
        </template>
        <template slot-scope="{ row, index }" slot="endTime">
          {{formatTime(row.endTime)}}
        </template>
        <template slot-scope="{ row, index }" slot="operate">
          <Button  size="small" @click="viewContractDetails(row.code)">查看详情</Button>
          <Button v-if="row.status =='01'"  size="small" @click="updateContract(row.code)">修改</Button>
          <Button v-if="row.status =='01'" size="small" @click="deleteContract(row.code)">失效</Button>
          <Button v-if="row.status =='01'" @click="continueContract(row)">打款</Button>
        </template>
      </Table>
    </div>
    <Page :current="param.currPage" :page-size="param.pageSize" @on-change="changePage"
          @on-page-size-change="changePageSize" class="head_page" :total="param.count" size="small" :page-size-opts="pageOps" show-elevator
          show-sizer/>

    <Modal v-model="isConContract" title="合同打款" width="1000" @on-ok="conSignContract" @on-cancel="closeSign">
      <Form :label-width="100">
        <Row>
          <Col span="8">
            <FormItem label="操作类型">
              <Select v-model="signAccount.type" @on-change="onchangeAccountType">
                <Option v-for="type in accountType" :value="type.value" :key="type.value">{{type.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8" >
            <FormItem label="打款类型" v-if="signAccount.type==0 ">
              <Select v-model="signAccount.payType" @on-change="onchangePayType">
              <Option v-for="type in payTypeDict" :value="type.value" :key="type.value" >{{type.label}}</Option>
             </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="打款方式" v-if="signAccount.type==0 &&  signAccount.payType =='00'">
              <Select v-model="signAccount.payMethod">
                <Option v-for="type in payMethodDict" :value="type.value" :key="type.value">{{type.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8" >
            <FormItem label="金额">
              <div style="display: flex">
              <InputNumber style="width: auto" :min="0" :max="999999999"
                           v-model="signAccount.payMoney"
                           @keyup.native="filterMoney"></InputNumber>&nbsp;&nbsp; <p class="font_move"> 元</p>
              </div>
            </FormItem>
          </Col>
          <Col span="8" >
            <FormItem label="账户" >
              <Input v-model="signAccount.accountNum" maxlength="32"
                     placeholder="账户" style="width: 200px"></Input>
            </FormItem>
          </Col>
        </Row>

      </Form>
    </Modal>

  </div>


</template>

<script>
  import {formatDate} from "../../assets/js/util";

  const dicts = dict.compIdTypes.concat(dict.peopIdTypes);
  import {dict, getDictLable} from "../../assets/js/dict";
  import {closeLoading, showloading} from "../../assets/js/common";

  export default {
    inject: ['reload'],
    name: "contractManager",
    data() {
      return {
        isConContract: false,
        pageOps:[5,10,20,30,40],
        param: {
          custName: '',
          idType: '',
          idNum: '',
          status,
          startEndTime: null,
          endEndTime: null,
          operatorName: '',
          contractName:'',
          currPage: 1,
          pageSize: 5,
          count: 0
        },
        contractColumns: [
          {
            type: 'index',
            type: 'index',
            width: 100,
            align: 'center',
            title: '序号'
          },
          {
            title: '合同编号',
            key: 'contractName'
          },
          {
            title: '客户名称',
            key: 'custName'
          },
          {
            title: '客户证件类型',
            key: 'idType',
            slot: 'idType'
          },
          {
            title: '客户证件号码',
            key: 'idNum'
          },
          {
            title: '金额',
            key: 'totalMoney'
          },
          {
            title: '状态',
            key: 'status',
            slot: 'status'
          },
          {
            title: '期限/月',
            key: 'term'

          },
          {
            title: '开始时间',
            key: 'startTime',
            slot: 'startTime'
          },
          {
            title: '到期日期',
            key: 'endTime',
            slot: 'endTime'
          },
          {
            title: '操作员',
            key: 'operatorName'
          },
          {
            title: '操作',
            key: 'operate',
            slot: 'operate'
          }
        ],
        contractList: [],
        IdTypedict: dicts,
        contractStatusList: dict.contractStatus,
        accountType: dict.accountType,
        payTypeDict: dict.payType,
        payMethodDict: dict.payMethod,
        signAccount: {
          contractCode:'',
          type: '0',
          payType: '01',
          payMethod: '',
          payMoney: 0,
          accountNum: '',
        },

      }
    },
    methods: {
      changePage(curr) {
        this.param.currPage = curr;
        this.search()
      },
      changePageSize(num) {
        this.param.currPage = 1;
        this.param.pageSize = num;
        this.search();
      },
      search() {
        this.$postMgr('/contract/list', this.param, 'get').then(res => {
          this.contractList = res.data.content;
          if (this.contractList != null && this.contractList.length > 0) {
            this.param.count = res.data.totalSize;
          }
        }).catch(err => {
          this.$Message.error({
            background: true,
            content: '查询失败！'
          });
        })
      },
      getIdtypeLable(custType, idType) {
        if (custType == '00') {
          return getDictLable('peopIdTypes', idType);
        } else {
          return getDictLable('compIdTypes', idType);
        }
      }, getDict(type, value) {
        return getDictLable(type, value);
      },
      formatTime(time) {
        if (time != null) {
          return formatDate(new Date(time), 'yyyy-MM-dd');
        }
      },
      filterMoney() {
        if (this.signAccount.payMoney != null && this.signAccount.payMoney != "") {
          this.signAccount.payMoney = Number(this.signAccount.payMoney.toFixed(2))
        }
      },
      viewContractDetails(code) {
        this.$router.push({path: '/contract/contractView', query: {'code': code}});
      },
      updateContract(code) {
        this.$router.push({path: '/contract/contractDetails', query: {operate: 'update', code: code}});
      },
      deleteContract(code) {
        this.$postMgr("/contract/delete", {code: code}).then(res => {
          this.$Message.success({
            background: true,
            content: '合同置失效成功！'
          });
          this.search();
        }).catch(err => {
          this.$Message.error({
            background: true,
            content: '合同置失效失败！'
          });
        })
      },
      insertContract() {
        this.$router.push({path: '/contract/contractDetails', query: {operate: 'create'}});
      },
      conSignContract() {
        this.$postMgr("/account/insert",this.signAccount).then(res=>{
          this.$Message.success({
            background: true,
            content:'资金添加成功！',
          })
        }).catch(err=>{
          console.log("失败",err)
          this.$Message.error({
            background: true,
            duration:3,
            content:'合同打款金额操作失败！'+err.data.mess
          })
        });
        this.reload();
      },
      closeSign() {
        this.signAccount.contractCode ='';
      },
      continueContract(row) {//续签合同
        this.signAccount.contractCode=row.code;
        this.isConContract = true;
        this.$router.push("/contract");
      },
      onchangeAccountType(){
         if(this.signAccount.type ==1){
           this.signAccount.payType='';
           this.signAccount.payMethod='';
         }
      },
      onchangePayType(){
        if(this.signAccount.payType =='01'){
            this.signAccount.payMethod='';
        }
      }
    },
    created() {
      this.search();
    }
  }
</script>

<style scoped>

</style>
