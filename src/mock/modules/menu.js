import isInteger from 'lodash/isInteger'

// 获取导航菜单列表 / 权限
export function nav() {
    return {
        // isOpen: false,
        url: '/sys/menu/nav',
        type: 'get',
        data: {
            'msg': 'success',
            'menuList': [{
                'menuId': 1,
                'parentId': 0,
                'parentName': null,
                'name': '系统管理',
                'url': null,
                'perms': null,
                'type': 0,
                'icon': 'fa fa-cog',
                'orderNum': 0,
                'open': null,
                'list': [{
                    'menuId': 2,
                    'parentId': 1,
                    'parentName': null,
                    'name': '管理员列表',
                    'url': 'modules/sys/user.html',
                    'perms': null,
                    'type': 1,
                    'icon': 'fa fa-user',
                    'orderNum': 1,
                    'open': null,
                    'list': null
                },
                    {
                        'menuId': 3,
                        'parentId': 1,
                        'parentName': null,
                        'name': '角色管理',
                        'url': 'modules/sys/role.html',
                        'perms': null,
                        'type': 1,
                        'icon': 'fa fa-user-secret',
                        'orderNum': 2,
                        'open': null,
                        'list': null
                    },
                    {
                        'menuId': 4,
                        'parentId': 1,
                        'parentName': null,
                        'name': '菜单管理',
                        'url': 'modules/sys/menu.html',
                        'perms': null,
                        'type': 1,
                        'icon': 'fa fa-th-list',
                        'orderNum': 3,
                        'open': null,
                        'list': null
                    },
                    {
                        'menuId': 5,
                        'parentId': 1,
                        'parentName': null,
                        'name': 'SQL监控',
                        'url': 'druid/sql.html',
                        'perms': null,
                        'type': 1,
                        'icon': 'fa fa-bug',
                        'orderNum': 4,
                        'open': null,
                        'list': null
                    },
                    {
                        'menuId': 6,
                        'parentId': 1,
                        'parentName': null,
                        'name': '定时任务',
                        'url': 'modules/job/schedule.html',
                        'perms': null,
                        'type': 1,
                        'icon': 'fa fa-tasks',
                        'orderNum': 5,
                        'open': null,
                        'list': null
                    },
                    {
                        'menuId': 27,
                        'parentId': 1,
                        'parentName': null,
                        'name': '参数管理',
                        'url': 'modules/sys/config.html',
                        'perms': 'sys:config:list,sys:config:info,sys:config:save,sys:config:update,sys:config:delete',
                        'type': 1,
                        'icon': 'fa fa-sun-o',
                        'orderNum': 6,
                        'open': null,
                        'list': null
                    },
                    {
                        'menuId': 30,
                        'parentId': 1,
                        'parentName': null,
                        'name': '文件上传',
                        'url': 'modules/oss/oss.html',
                        'perms': 'sys:oss:all',
                        'type': 1,
                        'icon': 'fa fa-file-image-o',
                        'orderNum': 6,
                        'open': null,
                        'list': null
                    },
                    {
                        'menuId': 29,
                        'parentId': 1,
                        'parentName': null,
                        'name': '系统日志',
                        'url': 'modules/sys/log.html',
                        'perms': 'sys:log:list',
                        'type': 1,
                        'icon': 'fa fa-file-text-o',
                        'orderNum': 7,
                        'open': null,
                        'list': null
                    }]
            }],
            'code': 0,
            'permissions': ['sys:schedule:info', 'sys:menu:update', 'sys:menu:delete', 'sys:config:info', 'sys:menu:list', 'sys:config:save', 'sys:config:update', 'sys:schedule:resume', 'sys:user:delete', 'sys:config:list', 'sys:user:update', 'sys:role:list', 'sys:menu:info', 'sys:menu:select', 'sys:schedule:update', 'sys:schedule:save', 'sys:role:select', 'sys:user:list', 'sys:menu:save', 'sys:role:save', 'sys:schedule:log', 'sys:role:info', 'sys:schedule:delete', 'sys:role:update', 'sys:schedule:list', 'sys:user:info', 'sys:schedule:run', 'sys:config:delete', 'sys:role:delete', 'sys:user:save', 'sys:schedule:pause', 'sys:log:list', 'sys:oss:all']
        }
    }
}

// 获取菜单列表
export function list() {
    return {
        isOpen: false,
        url: '/menu/list',
        type: 'get',
        data: {
            'code': 0,
            'msg': 'success',
            data: [ // 菜单相关路由
                {id: 1, url: '/app/dashboard', title: '首页', icon: 'mobile', component: 'Dashboard', permissions: 'save;list;update'},
                {
                    id: 2,
                    url: '/settings', title: '系统设置', icon: 'safety',permissions: 'save;list;update',
                    subs: [
                        {id: 3, url: '/app/settings/user', title: '用户管理', component: 'UserList',permissions: 'save;list;update'},
                        {id: 4, url: '/app/settings/role', title: '角色管理', component: 'RoleList',permissions: 'save;list;update'},
                        {id: 5, url: '/app/settings/menu', title: '菜单管理', component: 'MenuList',permissions: 'save;list;update'},
                        {id: 6, url: '/app/settings/routerEnter', title: '路由拦截', component: 'RouterEnter', auth: 'auth/testPage', permissions: 'save;list;update'},
                    ]
                },
                {
                    id: 7, url: '/app/extension', title: '功能扩展', icon: 'bars',permissions: 'save;list;update',
                    subs: [{id: 8, url: '/app/extension/queryParams', title: '问号形式参数', component: 'QueryParams', query: '?param1=1&param2=2', permissions: 'save;list;update' }]
                }
            ]
        }
    }
}

// 获取上级菜单
export function select() {
    return {
        isOpen: false,
        url: '/sys/menu/select',
        type: 'get',
        data: {}
    }
}

// 获取菜单信息
export function info(id) {
    return {
        isOpen: false,
        url: '/sys/menu/info' + (isInteger(id) ? `/${id}` : ''),
        type: 'get',
        data: {}
    }
}

// 添加菜单
export function add(params) {
    return {
        isOpen: false,
        url: '/sys/menu/save',
        type: 'post',
        data: {}
    }
}

// 修改菜单
export function update(params) {
    return {
        isOpen: false,
        url: '/sys/menu/update',
        type: 'post',
        data: {}
    }
}

// 删除菜单
export function del(id) {
    return {
        isOpen: false,
        url: '/sys/menu/delete' + (isInteger(id) ? `/${id}` : ''),
        type: 'post',
        data: {}
    }
}
