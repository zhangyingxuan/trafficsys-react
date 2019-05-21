import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'

// 获取导航菜单列表 / 权限
export function nav () {
  return request({
    url: requestUrl('/menu/nav'),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

// 获取菜单列表
export function list () {
  return request({
    url: requestUrl('/menu/list'),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

// 添加菜单
export function addOrUpdate (params) {
  return request({
    url: requestUrl('/menu/save'),
    method: 'post',
    data: requestParam(params)
  })
}

// 删除菜单
export function del (id) {
  return request({
    url: requestUrl('/menu/delete' + (isInteger(id) ? `/${id}` : '')),
    method: 'post',
    data: requestParam()
  })
}
