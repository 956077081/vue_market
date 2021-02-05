<style scoped>

</style>
<template>
  <div>
    <div class="page_main_title">{{getTitleName}}</div>
    <div class="page_main" style="margin-right: 50px;position: relative">
      <Form :label-width="200">
        <Row>
          <Col span="12">
            <FormItem label="公司名称">
              <span slot="label"> <require-element name="公司名称"></require-element></span>
              <Input type="text"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="组织结构代码">
              <span slot="label"> <require-element name="组织结构代码"></require-element></span>
              <Input type="text"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="法人名称">
              <span slot="label"> <require-element name="法人名称"></require-element></span>
              <Input type="text"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="法人证件号码">
              <span slot="label"><require-element name="法人证件号码"></require-element></span>
              <Input type="text"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="统一社会信用代码">
              <Input type="text"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="注册资本">
              <Input type="text"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="注册时间">
              <Input type="text"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="行业">
              <Input type="text"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="地址">
              <Input type="text"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="联系电话">
              <Input type="text"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col style="text-align: center;margin-top: 30px">
            <Button size="large" style="background-color:#b6b7ba ">保存</Button>
            <Button size="large" style="margin-left: 30px;background-color:#b6b7ba">返回</Button>
          </Col>
        </Row>
      </Form>
    </div>
  </div>

</template>

<script>
  import RequireElement from "../common/requireElement";

  export default {
    name: "custDetails",
    components: {RequireElement},
    data() {
      return {
        operate: 'insert'
      }
    },
    computed: {
      getTitleName: function () {
        if (this.operate == 'insert') {
          return '新增客户'
        }
        return '';
      }
    }
  }
</script>

<style scoped>

</style>
