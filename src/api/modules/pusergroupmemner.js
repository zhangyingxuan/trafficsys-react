import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'

// 获取组成员信息
export function groupInfo (id) {
  return request({
    url: requestUrl('/pp/pusergroupmemner/info/' + id),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

// 添加
export function add (params) {
  return request({
    url: requestUrl('/pp/pusergroupmemner/save'),
    method: 'post',
    data: requestParam(params)
  })
}

// 删除
export function del (params) {
  return request({
    url: requestUrl('/pp/pusergroupmemner/delete'),
    method: 'post',
    data: requestParam(params, 'post', false)
  })
}
