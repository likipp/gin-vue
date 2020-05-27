<template>
  <div>
    <!--    <span style="margin-left: 8px">-->
    <!--      <template v-if="hasSelected">-->
    <!--        {{ `已选择 ${selectedRowKeys.length} 项` }}-->
    <!--      </template>-->
    <!--    </span>-->
    <a-button type="primary" icon="plus" @click="$refs.createModal.add()">新建</a-button>
    <a-button type="dashed" @click="tableOption">{{ optionAlertShow && '关闭' || '开启' }} alert</a-button>
    <a-alert message="this.selectedRowKeys.length" type="info" show-icon />
    <a-table
      :columns="columns"
      :data-source="userList"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      rowKey="uuid"
      bordered>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="action">
        <template>
          <a-button type="primary">
            <a-icon type="edit"></a-icon>
            编辑</a-button>
        </template>
        <a-dropdown>
          <a-button type="link" style="margin-left: 5px">
            更多<a-icon type="down" />
          </a-button>
          <a-menu slot="overlay">
            <a-menu-item>
              <a-button type="dashed">
                禁用<a-icon type="stop" />
              </a-button>
            </a-menu-item>
            <a-menu-item>
              <a-button type="danger">
                删除<a-icon type="delete" />
              </a-button>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
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
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      scopedSlots: { customRender: 'action' }
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
        columns,
        optionAlertShow: false
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
      },
      tableOption () {
        if (!this.optionAlertShow) {
          this.options = {
            alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
            rowSelection: {
              selectedRowKeys: this.selectedRowKeys,
              onChange: this.onSelectChange
            }
          }
          this.optionAlertShow = true
        } else {
          this.options = {
            alert: false,
            rowSelection: null
          }
          this.optionAlertShow = false
        }
      }
    },
    created () {
      this.handleGetUserList()
      this.tableOption()
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
