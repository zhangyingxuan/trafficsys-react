import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'

// 获取列表,分页
export function list (params) {
  return request({
    url: requestUrl('/pp/papp/list'),
    method: 'get',
    params: requestParam({}, 'get')
  })
}
