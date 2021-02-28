<style scoped>
  .head_page {
    position: relative;
    padding-top: 20px;
    font-size: medium;
  }
  .page_main .ele_name {
    position: relative;
    text-align: right;
    margin-right: 40px;
  }

  .page_main .ivu-row {
    margin-top: 10px;
    margin-right: 30px;
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
                <Option v-for="contractStatus  in contractStatusList" :key="contractStatus.value" :value="contractStatus.value" >{{contractStatus.label}}</Option>
              </Select>
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
        <Button size="small" @click="viewContractDetails(row.code)">查看详情</Button>
        <Button size="small" @click="updateContract(row.code)">修改</Button>
      </template>
    </Table>
  </div>
  <Page :current="param.currPage" :page-size="param.pageSize" @on-change="changePage"
        @on-page-size-change="changePageSize" class="head_page" :total="param.count" size="small" show-elevator
        show-sizer/>
  </div>
</template>

<script>
  import {formatDate} from "../../assets/js/util";

  const dicts = dict.compIdTypes.concat(dict.peopIdTypes);
  import {dict,getDictLable} from "../../assets/js/dict";

  export default {
    name: "contractManager",
    data() {
      return {
        param: {
          custName: '',
          idType: '',
          idNum: '',
          status,
          startEndTime: null,
          endEndTime: null,
          operatorName:'',
          currPage:1,
          pageSize:10,
          count:0
        },
        contractColumns:[
          {
            type: 'index',
            type: 'index',
            width: 100,
            align: 'center',
            title: '序号'
          },
          {
            title: '合同名称',
            key :'contractName'
          },
          {
            title: '客户名称',
            key :'custName'
          },
          {
            title: '客户证件类型',
            key :'idType',
            slot:'idType'
          },
          {
            title: '客户证件号码',
            key :'idNum'
          },
          {
            title: '金额',
            key: 'totalMoney'
          },
          {
            title: '状态',
            key: 'status',
            slot:'status'
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
            title:'到期时间',
            key: 'endTime',
            slot: 'endTime'
          },
          {
            title:'操作员',
            key: 'operatorName'
          },
          {
            title:'操作',
            key: 'operate',
            slot: 'operate'
          }
        ],
        contractList:[],
        IdTypedict: dicts,
        contractStatusList:dict.contractStatus
      }
    },
    methods:{
      changePage(curr) {
        this.param.currPage = curr;
        this.search()
      },
      changePageSize(num) {
        this.param.currPage =1;
        this.param.pageSize =num;
        this.search();
      },
      search() {
        this.$postMgr('/contract/list', this.param,'get').then(res => {
          this.contractList = res.data.content;
          console.log(this.contractList)
          if(this.contractList != null && this.contractList.length >0  ){
            this.param.count=  res.data.totalSize;
          }
        }).catch(err => {
          this.$Message.error({
            background: true,
            content: '查询失败！'
          });
        })
      },
      getIdtypeLable(custType,idType){
        if(custType =='00'){
            return  getDictLable('peopIdTypes',idType);
        }else{
          return  getDictLable('compIdTypes',idType);
        }
      },getDict(type,value){
          return getDictLable(type,value);
      },
      formatTime(time){
        if(time !=null){
          return  formatDate(new Date(time),'yyyy-MM-dd');
        }
      },
      viewContractDetails(code){

      },
      updateContract(code){

      },
      insertContract(){
        this.$router.push({path:'/contract/contractDetails',query:{operate:'create'}});
      }
    },
    created() {
      this.search()
    }
  }
</script>

<style scoped>

</style>
