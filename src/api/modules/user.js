import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'

// 获取用户列表
export function list (params) {
  return request({
    url: requestUrl('/user/list'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 获取用户信息
export function info (id) {
  return request({
    url: requestUrl('/user/info' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

// 修改密码
export function updatePassword (params) {
  return request({
    url: requestUrl('/user/password'),
    method: 'post',
    data: requestParam(params)
  })
}

// 添加用户
export function addOrUpdate (params) {
  return request({
    url: requestUrl('/user/addOrUpdate'),
    method: 'post',
    data: requestParam(params)
  })
}

// 删除用户
export function del (params) {
  return request({
    url: requestUrl('/user/delete'),
    method: 'post',
    data: requestParam(params, 'post', false)
  })
}

// 修改用户
export function update (params) {
  return request({
    url: requestUrl('/user/update'),
    method: 'post',
    data: requestParam(params)
  })
}
