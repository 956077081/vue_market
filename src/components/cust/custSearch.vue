<style scoped>

  .page_main .ele_name {
    position: relative;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
  }
</style>
<template>
  <div>
    <div><p class="page_main_title">客户查询管理</p></div>
    <div class="page_main">
      <Row>
        <Col span="4">
          <div class='ele_name'>公司名称</div>
        </Col>
        <Col span="8">
          <div>
            <Input type="text" placeholder="公司名称"></Input>
          </div>
        </Col>
        <Col span="4">
          <div class='ele_name'>统一社会信用代码</div>
        </Col>
        <Col span="8">
          <div class='ele_name'><Input type="text" placeholder="统一社会信用代码"></Input></div>
        </Col>
      </Row>
      <Row>
        <Col span="4">
          <div class='ele_name'>组织机构代码</div>
        </Col>
        <Col span="8">
          <div>
            <Input type="text" placeholder="组织机构代码"></Input>
          </div>
        </Col>
        <Col span="4">
          <div class='ele_name'>行业</div>
        </Col>
        <Col span="8">
          <div class='ele_name'><Input type="text" placeholder="行业"></Input></div>
        </Col>
      </Row>
      <Row style="padding-top: 20px">
        <div style="margin-left: 30px">
          <Col span="1">
            <Button>查询</Button>
          </Col>
          <Col span="1" style="margin-left: 30px">
            <Button  @click="update">新增客户</Button>
          </Col>
        </div>
      </Row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "custSearch",
    methods:{
      update(){
        this.$emit('updatePage','custDetails');
      }
    }
  }
</script>

<style scoped>

</style>
