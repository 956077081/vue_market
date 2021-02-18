<template>
  <div class="cust_details">
    <Table  :columns="columns1" :data="data2" ></Table>  </div>
</template>

<script>
  export default {
    name: "marketList",
    data() {
      return {
        columns1: [
          {
            title: '公司名称',
            key: 'name'
          },
          {
            title: '组织机构代码',
            key: 'age'
          },
          {
            title: '法定代表人',
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
