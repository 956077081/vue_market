<template>
  <div style="height: 100%">
    <div class="page_main_title" ></div>
    <div >
      <Row>
        <Col span="12" style="margin-bottom: 5px;display: flex; justify-content: space-evenly;">
          <Button>显示年度报表</Button><InputNumber/>
          <Button>显示季度报表</Button><InputNumber/>
          <Button>显示月报表</Button><InputNumber/>
        </Col>
        <Col span="" style="text-align: center;font-size: large">年度报表</Col>
      </Row>
      <Row>
        <Col span="24">
          <accoun-pay-form style="height: 550px;"></accoun-pay-form>
        </Col>
        <Col span="4">&nbsp;</Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import AccounPayForm from "../../components/common/accounPayForm";

  export default {
    name: "reportForms",
    components: {AccounPayForm}
  }
</script>

<style scoped>

</style>
