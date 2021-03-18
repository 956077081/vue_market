<style scoped>
  .head_page {
    position: relative;
    padding-top: 20px;
    font-size: medium;
  }

</style>
<template>
  <div>
    <div>
      <div><p class="page_main_title">客户查询管理</p></div>
      <div class="page_main">
        <Row>
          <Col span="4">
            <div class='ele_name'>客户名称</div>
          </Col>
          <Col span="4">
            <div>
              <Input type="text"  placeholder="客户名称" v-model="param.custName"></Input>
            </div>
          </Col>
          <Col span="4">
            <div class='ele_name'>证件类型</div>
          </Col>
          <Col span="4">
            <div>
              <Select v-model="param.idType" clearable>testdict

                <Option v-for="idType in idTypeDict " :value="idType.value" :key="idType.value">
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
            <div class='ele_name'>行业</div>
          </Col>
          <Col span="4">
            <div><Input type="text" placeholder="行业" v-model="param.profession"></Input></div>
          </Col>

          <Col span="4">
            <div class='ele_name'>创建开始时间</div>
          </Col>
          <Col span="4">
            <DatePicker type="date" placeholder="创建开始时间" v-model="param.createTimeStart"></DatePicker>
          </Col>
          <Col span="4">
            <div class='ele_name'>创建结束时间</div>
          </Col>
          <Col span="4">
            <DatePicker type="date" placeholder="创建结束时间" v-model="param.createTimeEnd"></DatePicker>
          </Col>
        </Row>
        <Row style="padding-top:5px;padding-bottom: 5px">
            <Col span="8" >
             <Button style="margin-left: 20px" @click="search">查询</Button>&nbsp;&nbsp;
              <Button @click="insertCust">新增客户</Button>&nbsp;
              <Button @click="sendMsg">发送短信</Button>
            </Col>
        </Row>
      </div>
    </div>
    <div >
      <Table ref="custList" :columns="columns1" :data="custList" >
        <template slot-scope="{ row, index }" slot="custType">
        {{row.custType| getCustTypeLabel}}
        </template>
        <template slot-scope="{ row, index }" slot="idType">
          {{getIdTypeLable(row.idType)}}
        </template>
        <template slot-scope="{ row, index }" slot="createTime">
          {{row.createTime|formatTime}}
        </template>
        <template slot-scope="{ row, index }" slot="operater" style="text-align: center">
          <Button size="small" @click="viewDetails(row.code)">查看详情</Button>
          <Button size="small" @click="updateCust(row.code)">修改</Button>
        </template>
      </Table>
    </div>
    <Page :current="param.currPage" :page-size="param.pageSize" @on-change="changePage"
          @on-page-size-change="changePageSize" class="head_page" :total="param.count" size="small" show-elevator
          show-sizer/>

    <Modal v-model="isSendSms" title="发送短信" width="500" @on-ok="send" @on-cancel="closeSend">
      <Form>
        <FormItem label="">功能即将上线敬请稍等</FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
  import { getDictByType} from "../../assets/js/dict";
   import {formatDate} from "../../assets/js/util";

  export default {
    name: "custManager",
    data() {
      return {
        isSendSms:false,
        columns1: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
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
            key: 'custType',
            slot:'custType'
          },
          {
            title: '证件类型',
            key: 'idType',
            slot:'idType'
          },
          {
            title: '证件号码',
            key: 'idNum'
          },
          {
            title: '电话',
            key: 'phone'
          },
          {
            title: '邮箱',
            key: 'email'
          },
          {
            title: '法人名称',
            key: 'lawName'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '创建时间',
            key: 'createTime',
            slot:'createTime'
          },
          {
            title: '操作员',
            key: 'operatorName'
          },
          {
            title: '操作',
            key: 'operater',
            slot:'operater'
          }

        ],
        idTypeDict:getDictByType('compIdTypes').concat(getDictByType('peopIdTypes')),
        param: {
          custName: '',
          idType: '',
          idNum: '',
          profession: '',
          createTimeStart: null,
          createTimeEnd: null,
          pageSize: 10,
          currPage: 1,
          count: 0
        },
        custList: [],
        compTypeDict:getDictByType('compIdTypes'),
        pepTypeDict:getDictByType('peopIdTypes')
      }
    },
    filters:{

      getCustTypeLabel(value){
        if(value == undefined || value == null ){
          return '' ;
        }
     let custdict= getDictByType('custTypeDict');
        for (let i =0;i<custdict.length;i++ ){
          if(custdict[i].value ==value){
            return custdict[i].label;
          }
        }
      },
      formatTime(time){
        if(time !=null){
          return  formatDate(new Date(time),'yyyy-MM-dd hh:mm:ss');
        }
      }
    },
    methods: {
      getIdTypeLable(value){
        if(value == undefined || value == null ){
          return '' ;
        }

        for (let i=0;i<this.idTypeDict.length;i++){
          if(this.idTypeDict[i].value ==value){
            return this.idTypeDict[i].label;
          }
        }
      },
      insertCust() {
        this.$router.push({path:"/cust/custDetails",query:{operate:'create'}})
      },
      sendMsg(){
       let  custs=   this.$refs.custList.getSelection();
       if(custs.length ==1 ){//单人发送
          this.isSendSms =true;
       }else if (custs.length>1){//多人发送
         this.isSendSms =true;
       }
      },
      send(){//发送短信

      },
      closeSend(){//取消发送

      },
      search() {
        this.$postMgr('/customer/list', this.param,'get').then(res => {
          this.custList = res.data.content;
          if(this.custList != null && this.custList.length >0  ){
            this.param.count=  res.data.totalSize;
          }
        }).catch(err => {
          this.$Message.error({
            background: true,
            content: '查询失败！'
          });
        })
      },
      changePage(curr) {
        this.param.currPage = curr;
        this.search()
      },
      changePageSize(num) {
        this.param.currPage =1;
        this.param.pageSize =num;
        this.search();
      },
      viewDetails(code){
        this.$router.push({path:'/cust/custView',query:{code:code}})
      },
      deleteCust(){

      },
      updateCust(code){
        this.$router.push({path:'/cust/custDetails',query:{operate:'update',code:code}})
      }
    },
    created() {
      this.search();
    }
  }
</script>

<style scoped>

</style>
