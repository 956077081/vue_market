<template>
  <div class="cust_details">
    <Table  :columns="columns1" :data="data2" ></Table>
  </div>
</template>

<script>
  export default {
    name: "custList",
    data() {
      return {
        columns1: [
          {
            type: 'index',
            width: 100,
            align: 'center',
            title: '序号'
          },
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
            title: '电话',
            key: 'address'
          },
          {
            title: '邮箱',
            key: 'address'
          },
          {
            title: '法人名称',
            key: 'updateTime'
          },
          {
            title: '地址',
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
        ],
        custList:[]
      }
    },
    props:{

    }
  }
</script>

<style scoped>

</style>
