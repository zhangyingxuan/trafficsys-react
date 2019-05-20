import create from './create'
import * as common from './modules/common'
import * as user from './modules/user'
import * as role from './modules/role'
import * as menu from './modules/menu'
import * as log from './modules/log'
import * as config from './modules/config'
import * as oss from './modules/oss'
import * as schedule from './modules/schedule'

console.log('\n%c!<-------------------- 接口拦截, mock模拟数据 start -------------------->', 'color:red')

// tips
// 1. 关闭[业务模块集]拦截, create方法[第2个参数]设置. (默认开启)
// 2. 关闭[业务模块对象]拦截, 通过模块返回对象中的[isOpen属性, 默认开启]设置. (默认开启)

create(common, true)      // 公共
create(user, true)        // 管理员管理
create(role, true)        // 角色管理
create(menu, true)        // 菜单管理
create(log, true)         // 系统日志
create(config, true)      // 参数管理
create(oss, true)         // 文件服务
create(schedule, true)    // 定时任务

console.log('%c!<-------------------- 接口拦截, mock模拟数据  end  -------------------->\n', 'color:red')

// import Mock from "mockjs";
//
// Mock.mock(new RegExp('/menu/list'), 'get', {
//     'code': 0,
//     'msg': 'success',
//     data: [ // 菜单相关路由
//         {url: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard'},
//         {
//             url: '/settings', title: '系统设置', icon: 'safety',
//             subs: [
//                 {url: '/app/settings/user', title: '用户管理', component: 'UserList'},
//                 {url: '/app/settings/role', title: '角色管理', component: 'RoleList'},
//                 {url: '/app/settings/menu', title: '菜单管理', component: 'MenuList'},
//                 {
//                     url: '/app/settings/routerEnter',
//                     title: '路由拦截',
//                     component: 'RouterEnter',
//                     auth: 'auth/testPage'
//                 },
//             ],
//         },
//         {
//             url: '/app/extension', title: '功能扩展', icon: 'bars',
//             subs: [
//                 {
//                     url: '/app/extension/queryParams',
//                     title: '问号形式参数',
//                     component: 'QueryParams',
//                     query: '?param1=1&param2=2'
//                 },
//             ],
//         }
//     ]
// })
// Mock.mock(new RegExp('/role/list'), 'get', {
//     'msg': 'success',
//     'code': 0,
//     'data': {
//         'totalCount': 2,
//         'pageSize': 10,
//         'totalPage': 1,
//         'currPage': 1,
//         'list': [
//             {
//                 id: '1',
//                 key: '1',
//                 roleName: 'John Brown',
//                 comment: 'comment11'
//             },
//             {
//                 id: '2',
//                 key: '2',
//                 roleName: 'Jim Green',
//                 comment: 'comment22'
//             },
//             {
//                 id: '3',
//                 key: '3',
//                 roleName: 'Joe Black',
//                 comment: 'comment33'
//             }
//         ]
//     }
// })
