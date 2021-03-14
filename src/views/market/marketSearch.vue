<style scoped>
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
        <div >
          <Col span="2"  style="display: flex;">
            <Button >查询</Button>&nbsp;&nbsp; <Button  @click="update">创建合同</Button>&nbsp;&nbsp;<Button  @click="">创建子合同</Button>
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
