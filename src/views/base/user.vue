<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="userList"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      rowKey="uuid"
      bordered>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
    </a-table>
  </div>
</template>

<script>
  import { getUserList } from '@/api/personel/user'
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      align: 'center',
      scopedSlots: { customRender: 'id' }
    },
    {
      title: '帐号',
      dataIndex: 'username',
      align: 'center',
      scopedSlots: { customRender: 'username' }
    },
    {
      title: '用户名',
      dataIndex: 'nickname',
      align: 'center',
      scopedSlots: { customRender: 'nickname' }
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      scopedSlots: { customRender: 'status' }
    }
  ]
  // 定义状态参数
  const statusMap = {
    1: {
      status: 'success',
      text: '启用中'
    },
    0: {
      status: 'error',
      text: '禁用中'
    }
  }
  export default {
    name: 'User',
    data () {
      return {
        userList: [],
        selectedRowKeys: [],
        pageInfo: {
          page: 1,
          pageSize: 3
        },
        columns
      }
    },
    methods: {
      handleGetUserList () {
        getUserList(this.pageInfo).then(
          res => {
            this.userList = res.data.userList
            console.log(this.userList)
          }
        )
      },
      onSelectChange (selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.selectedRowKeys = selectedRowKeys
      }
    },
    created () {
      this.handleGetUserList()
    },
    computed: {
      hasSelected () {
        return this.selectedRowKeys.length > 0
      }
    },
    filters: {
      statusFilter (type) {
        return statusMap[type].text
      },
      statusTypeFilter (type) {
        return statusMap[type].status
      }
    }
  }
</script>

<style scoped>

</style>
