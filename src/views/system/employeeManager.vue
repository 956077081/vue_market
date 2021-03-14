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
              <Input type="text" placeholder="员工名称"></Input>
            </div>
          </Col>
          <Col span="4">
            <div class='ele_name'>员工编号</div>
          </Col>
          <Col span="4">
            <div>
              <Input type="text" placeholder="员工编号"></Input>
            </div>
          </Col>
          <Col span="4">
            <div class='ele_name'>员工身份证号码</div>
          </Col>
          <Col span="4">
            <div>
              <Input type="text" placeholder="员工身份证号码"></Input>
            </div>
          </Col>
          <Col span="4">
            <div class='ele_name'>角色类型</div>
          </Col>
          <Col span="4">
            <div>
              <Input type="text" placeholder="角色类型"></Input>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "employeeManager"
  }
</script>

<style scoped>

</style>
