<style scoped>
  .tableCss /deep/ .ivu-table-cell{
     padding-right: 4px;
    padding-left: 5px;
    width: 100%;
  }
  .page_main /deep/ .ivu-card-head p{
    font-size: 14px;
  }
</style>
<template>
  <div >
    <div><p class="page_main_title">消息提醒</p></div>
    <div ref="mess" class="page_main" style="margin-bottom: 20px;">
      <Row :gutter="8">
        <Col span="12">
          <Card title="近期创建合同">
            <Table class="tableCss" :max-height="tableHeight" :columns="newContractColumn" :data="newContracts">
              <template slot-scope="{ row, index }" slot="startTime">
               {{ formatTime(row.startTime)}}
              </template>
              <template slot-scope="{ row, index }" slot="endTime">
                {{ formatTime(row.endTime)}}
              </template>
            </Table>
          </Card>
        </Col>
        <Col span="12">
          <Card title="合同即将到期提醒">
            <Table class="tableCss" :max-height="tableHeight" :columns="overContractColumn" :data="overContracts">
              <template slot-scope="{ row, index }" slot="endTime">
                {{ formatTime(row.endTime)}}
              </template>
            </Table>
          </Card>
        </Col>

      </Row>
      <Row :gutter="8" style="top: 5px">
        <Col span="12">
          <Card title="有效已过期合同">
            <Table class="tableCss" :max-height="tableHeight" :columns="hasOverContract" :data="hasOverContracts" >
              <template slot-scope="{ row, index }" slot="endTime">
                {{ formatTime(row.endTime)}}
              </template>
            </Table>
          </Card>
        </Col>
        <Col span="12">
          <Card title="合同最新打款提醒">
            <Table class="tableCss" :max-height="tableHeight" :columns="newPayDetailsColumns" :data="newPayDetails" >
              <template slot-scope="{ row, index }" slot="createTime">
                {{ formatTime(row.createTime)}}
              </template>
            </Table>
          </Card>
        </Col>
      </Row>
      <Row :gutter="8" style="top: 5px">
        <Col span="12">
          <Card title="近期添加客户">
            <Table class="tableCss" :max-height="tableHeight" :columns="newCustColumns" :data="newCust">
              <template slot-scope="{ row, index }" slot="createTime">
                {{ formatTime(row.createTime)}}
              </template>
            </Table>

          </Card>
        </Col>

      </Row>


    </div>
  </div>
</template>

<script>
  import {formatDate} from "../../assets/js/util";
  export default {
    name: "claimMess",
    data() {
      return {
        tableHeight:290,
        newContractColumn: [
          {
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
          }, {
            key: 'totalMoney',
            title: '合同金额',
          },
          {
            key: 'startTime',
            title: '合同开始日期',
            slot: 'startTime'
          },
          {
            key: 'endTime',
            title: '合同结束时间',
            slot: 'endTime'
          },
          {
            key: 'operatorName',
            title: '操作人'
          }
        ],
        overContractColumn: [
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
            title: '合同编号',
            key: 'contractName'
          }
          ,{
            key: 'totalMoney',
            title: '合同金额',
          },
          {
            key: 'endTime',
            title: '合同到期日期',
            slot: 'endTime'
          },
          {
            key: 'operatorName',
            title: '操作人'
          }
        ],
        hasOverContract: [
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
            title: '合同编号',
            key: 'contractName'
          },
          {
            key: 'endTime',
            title: '合同到期日期',
            slot: 'endTime'
          },
          {
            key: 'operatorName',
            title: '操作人'
          }
        ],
        newCustColumns:[
          {
            type:'index',
            width:100,
            title:'序号',
            align:'center'
          },
          {
            key:'custName',
            title: '客户名称',
          },
          {
            key: 'idNum',
            title: '证件号码',
          },
          {
            key: 'phone',
            title: '联系电话'
          },
          {
            key: 'createTime',
            title: '创建时间',
            slot:'createTime'
          }
        ],
        newPayDetailsColumns:[
          {
            type:'index',
            width:100,
            title:'序号',
            align:'center'
          },
          {
            key:'custName',
            title: '客户名称',
          },
          {
            key:'idNum',
            title: '证件号码'
          },
          {
            key:'contractName',
            title: '合同编号'
          },
          {
             key:'payMoney',
             title: '打款金额'
          },
          {
              key:'createTime',
              title: '打款时间',
              slot:'createTime'
          }
        ],
        newContracts: [],
        overContracts: [],
        hasOverContracts:[],
        newCust:[],
        newPayDetails:[],
      }
    },
    methods: {
      queryRecentNewContracts() {
        this.$postMgr("/contract/recentNewContracts").then(res => {
          this.newContracts = res.data
        })
      },
      queryRecentOverContracts() {
        this.$postMgr("/contract/recentOverContracts").then(res => {
          this.overContracts = res.data;
        })
      },
      queryRecentNewCust(){
        this.$postMgr("/customer/recentNewCust").then(res => {
          this.newCust=res.data;
        })
      },
      queryRecentNewPayDetails(){
        this.$postMgr("/account/recentNewPayDetails").then(res => {
          this.newPayDetails=res.data;
        })
      },
      queryHasOverContract(){
        this.$postMgr("/contract/hasOverContracts").then(res => {
          this.hasOverContracts=res.data;
        })
      },
      formatTime(datatime){
      return   formatDate(new Date(datatime),'yyyy/MM/dd')
      }
    },
    mounted() {
      this.queryRecentNewContracts();
      this.queryRecentOverContracts();
      this.queryHasOverContract();
      this.queryRecentNewCust();
      this.queryRecentNewPayDetails();
    }
  }
</script>

