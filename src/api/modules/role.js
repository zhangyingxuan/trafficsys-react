import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'

// 获取角色列表
export function list (params) {
  return request({
    url: requestUrl('/role/list'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 获取角色列表, 根据当前用户
export function roleMenuList (params) {
  return request({
    url: requestUrl('/role/roleMenuList'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 添加角色
export function addOrUpdate (params) {
  return request({
    url: requestUrl('/role/addOrUpdate'),
    method: 'post',
    data: requestParam(params)
  })
}

// 删除角色
export function del (params) {
  return request({
    url: requestUrl('/role/delete'),
    method: 'post',
    data: requestParam(params, 'post', false)
  })
}
