import axios from 'axios/index'

const userList = '/api/v1/base/users'

// 通过传递过来的page信息来获取相应的用户信息, 默认是page=1&pageSize=3
export function getUserList (params) {
  return axios({
    url: `${userList}/?page=${params.page}&pageSize=${params.pageSize}`,
    method: 'get',
    params
  })
}
