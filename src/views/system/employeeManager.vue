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
              <Input type="text" v-model="param.cardNum"  placeholder="员工编号"></Input>
            </div>
          </Col>
          <Col span="4">
            <div class='ele_name'>角色类型</div>
          </Col>
          <Col span="4">
            <div>
              <Select v-model="employ.roleType">
                <Option value="">请选择</Option>
                <Option v-for=" role in roleTypeDict" :value="role.value" :key="role.value"> {{role.label}}</Option>
              </Select>
            </div>
          </Col>
        </Row>

       <Row style="padding-top:5px;padding-bottom: 5px">
          <Col span="4">
            <Button  style="margin-left: 20px" @click="search">查询</Button>&nbsp;&nbsp;
            <Button @click="insert">新增员工</Button>
          </Col>
      </Row>
      </div>
      <div >
          <Table :columns="employColumns"></Table>
      </div>
      <Page :current="param.currPage" :page-size="param.pageSize" @on-change="changePage"
            @on-page-size-change="changePageSize" class="head_page" :total="param.count"  show-elevator
            show-sizer/>
    </div>
    <Modal v-model="insertModal" title="新增员工" width="800"  @on-ok="ok" @on-cancel="cancle">
      <Form :label-width="100">
      <Row>
          <Col span="12">
              <FormItem  label="员工编号">
                <Input  v-model="employ.cardNum" placeholder="请输入员工编号（数字或字母）" ></Input>
              </FormItem>
          </Col>
        <Col span="12">
          <FormItem   label="姓名">
            <Input  v-model="employ.custName" placeholder="姓名"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem  label="证件号码">
            <Input  v-model="employ.idNum" placeholder="证件号码"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem  label="手机号码">
            <Input v-model="employ.phone" placeholder="手机号码"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem  label="角色类型" >
            <CheckboxGroup v-model="roleType" style="padding-left: 20px">
              <Checkbox v-for="role in roleTypeDict" :label="role.value" :key="role.value">{{role.label}}</Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Col>
        </Row>
        <Row>
          <Col span="24">
            <p style="color: red">注：员工编号将作为此系统登录账号（默认密码11111111），请选择输入数字和英文格式</p>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import {getDictByType} from "../../assets/js/dict";

  export default {
    inject: ['reload'],
    name: "employeeManager",
    data(){
      return{
        insertModal:false,
        validDict:getDictByType('validStatus'),
        roleTypeDict:getDictByType('roleType'),
        employColumns:[
          {
            type:'index',
            title:'序号',
            align:'center',
            width:100
          },
          {
            key: 'cardNum',
            title: '员工编号'
          },
          {
            key:"custName",
            title:'姓名'
          },
          {
            key:'idNum',
            title:'身份证号码'
          },
          {
            key:'roleType',
            title: '角色类型'
          },
          {
            key:'createTime',
            title: '创建时间'
          }
        ],
        param:{
          currPage:1,
          pageSize:5,
          total:10,
          custName:'',
          cardNum:'',
          idNum:'',
          roleType:''
        },
        employ:{
          cardNum: '',
          custName:'',
          idNum:'',
          phone:'',
          status:'1'
        },
        roleType:[
          'emp'
        ]
      }
    },
    methods:{
      changePage(){

      },
      changePageSize(){

      },
      search(){

      },
      insert(){
        this.insertModal=true;
      },
      ok(){
        var parma ={
          'employee':this.employ,
          'sysRoleType':this.roleType
        };
        console.log(parma)
        this.$postMgr("/employee/insert",parma).then(res=>{
          this.$Message.success({
            content:'创建员工成功！',
            background: true
          });
          this.reload();
        }).catch(err=>{
          console.log(err)
          this.$Message.error({
               content :'创建员工失败'+err.data,
              background: true
          });
          this.reload();
        });
      },
      cancle(){

      }

    }

  }
</script>

<style scoped>

</style>
