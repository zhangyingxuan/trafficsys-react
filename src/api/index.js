import * as common from './modules/common'
import * as user from './modules/user'
import * as role from './modules/role'
import * as menu from './modules/menu'
import * as log from './modules/log'
import * as config from './modules/config'
import * as oss from './modules/oss'
import * as schedule from './modules/schedule'
import * as puser from './modules/puser'
import * as pusergroup from './modules/pusergroup'
import * as pusergroupmemner from './modules/pusergroupmemner'
import * as papp from './modules/papp'
import * as palarmrule from './modules/palarmrule'

export default {
    common,     // 公共
    user,       // 管理员管理
    role,       // 角色管理
    menu,       // 菜单管理
    log,        // 系统日志
    config, // 参数管理
    oss,  // 文件服务
    schedule, // 定时任务
    puser,  // 成员组关联
    pusergroup, // 组管理
    pusergroupmemner, // 成员组管理
    papp, // 应用
    palarmrule
}
