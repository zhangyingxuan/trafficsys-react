import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'

// 规则列表
export function rules (params) {
  return request({
    url: requestUrl('/pp/palarmrule/rules'),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

// 获取应用规则信息
export function info (id) {
  return request({
    url: requestUrl('/pp/palarmrule/info/' + id),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

// 添加规则
export function add (params) {
  return request({
    url: requestUrl('/pp/palarmrule/save'),
    method: 'post',
    data: requestParam(params)
  })
}

// 更新规则
export function update (params) {
  return request({
    url: requestUrl('/pp/palarmrule/update'),
    method: 'post',
    data: requestParam(params)
  })
}

// 删除规则
export function del (params) {
  return request({
    url: requestUrl('/pp/palarmrule/delete'),
    method: 'post',
    data: requestParam(params, 'post', false)
  })
}
