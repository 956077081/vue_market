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
  .page_main .ivu-row{
    margin-top: 10px;
    margin-right: 30px;
  }

</style>
<template>
  <div>
    <div>
      <div><p class="page_main_title">客户查询管理</p></div>
      <div class="page_main">
        <Row>
          <Col span="4" >
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
            <div class='ele_name'>行业</div>
          </Col>
          <Col span="4">
            <div ><Input type="text" placeholder="行业" v-model="param.profession"></Input></div>
          </Col>

          <Col span="4">
            <div class='ele_name'>创建开始时间</div>
          </Col>
          <Col span="4">
              <DatePicker type="date"  placeholder="创建开始时间" v-model="param.createTimeStart" ></DatePicker>
          </Col>
          <Col span="4">
            <div class='ele_name'>创建结束时间</div>
          </Col>
          <Col span="4">
            <DatePicker type="date" placeholder="创建结束时间"  v-model="param.createTimeEnd"></DatePicker>
          </Col>
        </Row>
        <Row style="padding-top: 20px">
          <div>
            <Col span="2" style="display: flex;">
              <Button @click="search">查询</Button>&nbsp;&nbsp;
              <Button @click="update">新增客户</Button>
            </Col>
          </div>
        </Row>
      </div>
    </div>
    <div class="cust_details">
      <Table :columns="columns1" :data="data2"></Table>
    </div>
    <Page class="head_page"  :total="40" size="small" show-elevator show-sizer/>
  </div>
</template>

<script>
  import CustSearch from "./custSearch";
  import CustList from "./custList";
  import dict from "../../assets/js/dict";

  export default {
    name: "custManager",
    data() {
      return {
        columns1: [
          {
            type: 'index',
            width: 100,
            align: 'center',
            title: '序号'
          },
          {
            title: '客户名称',
            key: 'name'
          },
          {
            title: '客户类型',
            key: 'name'
          },
          {
            title: '证件类型',
            key: 'age'
          },
          {
            title: '证件号码',
            key: 'address'
          },
          {
            title: '电话',
            key: 'address'
          },
          {
            title: '邮箱',
            key: 'address'
          },
          {
            title: '法人名称',
            key: 'updateTime'
          },
          {
            title: '地址',
            key: 'address'
          }

        ],
        data2: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          }
        ],
        param:{
          custName:'',
          idType:'01',
          idNum:'',
          profession:'',
          createTimeStart:'',
          createTimeEnd:'',
        },
        IdTypedict :dict.compIdTypes.concat(dict.peopIdTypes)
      }
    },
    components: {CustList, CustSearch},
    methods: {
      update() {
        this.$router.push("/cust/custDetails")
      },
      search(){
        console.log(dict.compIdTypes)
      }
    },
    created() {
    }
  }
</script>

<style scoped>

</style>
