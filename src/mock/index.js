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
