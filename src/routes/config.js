export default {
    menus: [ // 菜单相关路由
        { url: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
        {
            url: '/settings', title: '系统设置', icon: 'safety',
            subs: [
                { url: '/app/settings/user', title: '用户管理', component: 'UserList' },
                { url: '/app/settings/role', title: '角色管理', component: 'RoleList' },
                { url: '/app/settings/permission', title: '菜单管理', component: 'MenuList' },
                { url: '/app/settings/routerEnter', title: '路由拦截', component: 'RouterEnter', auth: 'auth/testPage' },
            ],
        },
        {
            url: '/app/extension', title: '功能扩展', icon: 'bars',
            subs: [
                { url: '/app/extension/queryParams', title: '问号形式参数', component: 'QueryParams', query: '?param1=1&param2=2' },
            ],
        },
    ],
    others: [] // 非菜单相关路由
}
