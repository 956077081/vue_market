<template>
  <div class="cust_details">
    <Table  :columns="columns1" :data="data2" ></Table>  </div>
</template>

<script>
  export default {
    name: "custList",
    data() {
      return {
        columns1: [
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
            title: '工商注册号',
            key: 'address'
          },
          {
            title: '注册资本',
            key: 'address'
          },
          {
            title: '客户创建时间',
            key: 'updateTime'
          },
          {
            title: '注册时间',
            key: 'address'
          },
          {
            title: '操作',
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
        ]
      }
    }
  }
</script>

<style scoped>

</style>
