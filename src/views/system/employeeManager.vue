<template>
  <div>
    <div>
      <div class="page_main_title">员工管理</div>
      <div class="page_main">
        <Row>
          <Col span="4">
            <div class='ele_name'>员工名称</div>
          </Col>
          <Col span="4">
            <div>
              <Input type="text" v-model="param.custName" placeholder="员工名称"></Input>
            </div>
          </Col>
          <Col span="4">
            <div class='ele_name'>员工编号</div>
          </Col>
          <Col span="4">
            <div>
              <Input type="text" v-model="param.cardNum" placeholder="员工编号"></Input>
            </div>
          </Col>
          <Col span="4">
            <div class='ele_name'>角色类型</div>
          </Col>
          <Col span="4">
            <div>
              <Select v-model="param.roleType" clearable>
                <Option value="">请选择</Option>
                <Option v-for=" role in roleTypeDict" :value="role.value" :key="role.value"> {{role.label}}</Option>
              </Select>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span="4">
            <div class='ele_name'>员工状态</div>
          </Col>
          <Col span="4">
            <div>
              <Select  v-model="param.status" clearable>
                <Option v-for="empstatus in empStatusDict" :key="empstatus.value" :value="empstatus.value">{{empstatus.label}}</Option>
              </Select>
            </div>
          </Col>
        </Row>
        <Row style="padding-top:5px;padding-bottom: 5px">
          <Col span="4">
            <Button style="margin-left: 20px" @click="search">查询</Button>&nbsp;&nbsp;
            <Button @click="insert">新增员工</Button>
          </Col>
        </Row>
      </div>
      <div>
        <Table :columns="employColumns" :data="employdata">

          <template slot-scope="{row,index}" slot="createTime">
            {{foarmatData(row.createTime)}}
          </template>
          <template slot-scope="{row,index}" slot="operate">
            <Button v-if="row.status=='0'" @click="opsEmpStatus(row.userCode,'1')">启用</Button>
            <Button v-if="row.status=='1'"  @click="opsEmpStatus(row.userCode,'0')">关闭</Button>
          </template>
          <template slot-scope="{row,index}" slot="status">
            {{getDictValue(row.status)}}
          </template>
        </Table>
      </div>
      <Page :current="param.currPage" :page-size="param.pageSize" :page-size-opts="[10,20,30,40]"
            @on-change="changePage"
            @on-page-size-change="changePageSize" class="head_page" :total="param.total" show-elevator
            show-sizer/>
    </div>
    <Modal v-model="insertModal" title="新增员工" width="800" @on-ok="ok" @on-cancel="cancle">
      <Form :label-width="100">
        <Row>
          <Col span="12">
            <FormItem label="员工编号">
              <Input :maxlength="20" v-model="employ.cardNum" @keyup.native="inputCardNum"
                     placeholder="请输入员工编号（数字或字母）"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="姓名">
              <Input v-model="employ.custName" placeholder="姓名"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="证件号码">
              <Input v-model="employ.idNum" placeholder="证件号码"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="手机号码">
              <Input v-model="employ.phone" placeholder="手机号码"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="角色类型">
              <CheckboxGroup v-model="roleType" style="padding-left: 20px">
                <Checkbox v-for="role in roleTypeDict" :label="role.value" :key="role.value">{{role.label}}</Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <p style="color: red">注：员工编号将作为此系统登录账号（默认密码11111111），请选择输入数字或英文格式</p>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import {getDictByType, getDictLable} from "../../assets/js/dict";
  import {formatDate} from "../../assets/js/util";

  export default {
    inject: ['reload'],
    name: "employeeManager",
    data() {
      return {
        insertModal: false,
        validDict: getDictByType('validStatus'),
        roleTypeDict: getDictByType('roleType'),
        empStatusDict:getDictByType('validStatus'),
        employColumns: [
          {
            type: 'index',
            title: '序号',
            align: 'center',
            width: 100
          },
          {
            key: 'cardNum',
            title: '员工编号'
          },
          {
            key: "custName",
            title: '姓名'
          },
          {
            key: 'idNum',
            title: '身份证号码'
          },
          {
            key: 'phone',
            title: '手机号码'
          },
          {
            key: 'roleName',
            title: '角色类型'
          },
          {
            key: 'status',
            title: '有效状态',
            slot:'status'
          },
          {
            key: 'createTime',
            title: '创建时间',
            slot: 'createTime'
          },
          {
            key:'operate',
            title:'操作',
            slot:'operate'
          }
        ],
        employdata: [],
        param: {
          currPage: 1,
          pageSize: 10,
          total: 0,
          custName: '',
          cardNum: '',
          roleType: '',
          status:''
        },
        employ: {
          cardNum: '',
          custName: '',
          idNum: '',
          phone: '',
          status: '1'
        },
        roleType: [
          'emp'
        ]
      }
    },
    created() {
      this.search();
    },
    methods: {
      getDictValue(status){
      return   getDictLable('validStatus',status)
      },
      opsEmpStatus(usercode,status){
        let param={
          usercode:usercode,
          opsStatus:status
        }
        this.$postMgr("/employee/opsStatus",param,'get').then(res=>{
          this.$Message.success({
            content: '修改成功！',
            background: true
          });
          this.reload();
        })
      },
      changePage(currpage) {
        this.param.currPage = currpage;
        this.search();
      },
      changePageSize(pageSize) {
        this.param.pageSize = pageSize;
        this.param.currPage = 1;
        this.search();
      },
      inputCardNum() {
        if (this.employ.cardNum != null && this.employ.cardNum != "") {
          this.employ.cardNum = this.employ.cardNum.replace(/([^\w\.\/]|[/_])/ig, '');//非字母数据替换空  /i不论大小写 /g 查找除上次的配结果
        }
      },
      search() {
        this.$postMgr("/employee/list", this.param, "get").then(res => {
          this.param.total = res.data.totalSize;
          this.employdata = res.data.content;
        })
      },
      insert() {
        this.insertModal = true;
      },
      ok() {
        let parma = {
          'employee': this.employ,
          'sysRoleType': this.roleType
        };
        this.$postMgr("/employee/insert", parma).then(res => {
          this.$Message.success({
            content: '创建员工成功！',
            background: true
          });
          this.reload();
        }).catch(err => {
          console.log(err)
          this.$Message.error({
            content: '创建员工失败' + err.data.mess,
            background: true,
            duration: 3,
          });
          this.resetEmploy();
        });
      },
      cancle() {
        this.resetEmploy();
      },
      resetEmploy(){
        this.employ=new Object();
        this.employ.status ='1';
      },
      foarmatData(time) {
        if (time != null) {
          return formatDate(new Date(time), 'yyyy-MM-dd')
        }
      }
    }

  }
</script>

<style scoped>

</style>
