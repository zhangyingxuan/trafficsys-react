import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'

// 获取验证码
export function captcha (uuid) {
  return request({
    url: requestUrl('/captcha?uuid=' + uuid),
    method: 'get',
  })
}

// 登录
export function login (params) {
  return request({
    url: requestUrl('/login'),
    method: 'post',
    data: requestParam(params)
  })
}

// 退出
export function logout () {
  return request({
    url: requestUrl('/sys/logout'),
    method: 'post',
    data: requestParam()
  })
}
