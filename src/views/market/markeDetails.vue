<style scoped>

</style>
<template>
  <div>
    <div class="page_main_title">{{getTitleName}}</div>
    <div class="page_main"
         style="margin-right: 50px;position: relative;margin-bottom: 0;height: 750px;overflow-x: hidden">
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
              <Input type="text" readonly></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="服务开始时间">
              <span slot="label"> <require-element name="服务开始时间"></require-element></span>
              <DatePicker type="date"  placeholder="Select date" style="width: 200px"></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="服务期限">
              <span slot="label"><require-element name="服务期限/月"> </require-element></span>
              <InputNumber :min="1" :max="999999" v-model="term" @keyup.native="term = Number(term.toFixed(0))"
                           style="width: 200px"/> &nbsp;&nbsp;&nbsp;月
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="打款方式">
              <Select  v-model="payType">
                <Option v-for="type in  patTypeDict" :value="type.key" :key="type.type">{{type.type}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="金额">
              <InputNumber :min="1" :max="999999" v-model="money" @keyup.native="money = Number(money.toFixed(2))"
                           style="width: 200px"></InputNumber> &nbsp;&nbsp;&nbsp;元
            </FormItem>
          </Col>
        </Row>
        <Row  v-if="payType == 'online'">
          <Col span="12">
            <FormItem label="线上支付类型">
              <Select v-model="payMethod">
                <Option value="0">支付宝</Option>
                <Option value="1">微信</Option>
                <Option value="2">银行卡</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="打款账号">
              <Input type="text" v-model="bankacco" maxlength="20"></Input>
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
  import RequireElement from "../../components/common/requireElement";
  import MarketList from "./marketList";

  export default {
    name: "marketDetails",
    components: {RequireElement,MarketList},
    data() {
      return {
        operate: 'insert',
        term: 0,
        money: 0,
        payType: '',
        payMethod: '',
        bankacco: '',
        patTypeDict: [
          {
            key: 'online',
            type: '线上支付'
          },
          {
            key: 'offine',
            type: '线下支付'
          }
        ]
      }
    },
    computed: {
      getTitleName: function () {
        if (this.operate == 'insert') {
          return '录入签约合同'
        }
        return '';
      }
    },
    methods: {
      clearPay() {
        this.payType = '';
        this.bankacco = '';
      }
    }
  }
</script>

<style scoped>

</style>
