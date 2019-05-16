import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'

// 查询
export function all (params) {
  return request({
    url: requestUrl('/pp/pusergroup/all'),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

// 添加
export function add (params) {
  return request({
    url: requestUrl('/pp/pusergroup/save'),
    method: 'post',
    data: requestParam(params)
  })
}

// 修改
export function update (params) {
  return request({
    url: requestUrl('/pp/pusergroup/update'),
    method: 'post',
    data: requestParam(params)
  })
}

// 删除
export function del (params) {
  return request({
    url: requestUrl('/pp/pusergroup/delete'),
    method: 'post',
    data: requestParam(params, 'post', false)
  })
}

// 搜索
export function query (params) {
  return request({
    url: requestUrl('/pp/pusergroup/query'),
    method: 'post',
    data: params
  })
}

// 获取组成员信息
export function groupInfo (number) {
  return request({
    url: requestUrl('/pp/pusergroup/info' + (isInteger(number) ? `/${number}` : '')),
    method: 'get',
    params: requestParam({}, 'get')
  })
}
