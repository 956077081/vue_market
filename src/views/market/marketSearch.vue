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
    <div><p class="page_main_title">营销查询管理</p></div>
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
          <div class='ele_name'>服务期限</div>
        </Col>
        <Col span="8">
          <div class='ele_name'><Input type="text" placeholder="服务期限"></Input></div>
        </Col>
      </Row>
      <Row>
        <Col span="4">
          <div class='ele_name'>服务提供开始时间</div>
        </Col>
        <Col span="8">
          <div>
            <Input type="text" placeholder="服务提供开始时间"></Input>
          </div>
        </Col>
        <Col span="4">
          <div class='ele_name'>服务提供结束时间</div>
        </Col>
        <Col span="8">
          <div class='ele_name'><Input type="text" placeholder="服务提供结束时间"></Input></div>
        </Col>
      </Row>
      <Row style="padding-top: 20px">
        <div style="margin-left: 30px">
          <Col span="1">
            <Button>查询</Button>
          </Col>
          <Col span="1" style="margin-left: 30px">
            <Button  @click="update">开通服务</Button>
          </Col>
          <Col span="1" style="margin-left: 30px">
            <Button  @click="">续费</Button>
          </Col>
        </div>
      </Row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "marketSearch",
    methods:{
      update(){
         this.$router.push("/market/marketDetails")
      }
    }
  }
</script>

<style scoped>

</style>
