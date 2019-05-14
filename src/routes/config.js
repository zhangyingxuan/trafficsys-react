export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
        {
            key: '/settings', title: '系统设置', icon: 'safety',
            subs: [
                { key: '/app/settings/user', title: '用户管理', component: 'UserList' },
                { key: '/app/settings/role', title: '角色管理', component: 'RoleList' },
                { key: '/app/settings/permission', title: '权限管理', component: 'PermissionList' },
                { key: '/app/settings/routerEnter', title: '路由拦截', component: 'RouterEnter', auth: 'auth/testPage' },
            ],
        },
        {
            key: '/app/extension', title: '功能扩展', icon: 'bars',
            subs: [
                { key: '/app/extension/queryParams', title: '问号形式参数', component: 'QueryParams', query: '?param1=1&param2=2' },
            ],
        },
    ],
    others: [] // 非菜单相关路由
}
