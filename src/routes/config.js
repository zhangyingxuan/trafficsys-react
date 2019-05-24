export default {
    menus: [ // 菜单相关路由
        {id: 1, url: '/app/dashboard', title: '首页', icon: 'mobile', component: 'Dashboard', permissions: 'save;list;update'},
        {
            id: 2,
            url: '/settings', title: '系统设置', icon: 'safety',permissions: 'save;list;update',
            subs: [
                {id: 3, url: '/app/settings/user', title: '用户管理', component: 'UserList',permissions: 'save;list;update'},
                {id: 4, url: '/app/settings/role', title: '角色管理', component: 'RoleList',permissions: 'save;list;update'},
                {id: 5, url: '/app/settings/menu', title: '菜单管理', component: 'MenuList',permissions: 'save;list;update'},
                {id: 6, url: '/app/settings/routerEnter', title: '路由拦截', component: 'RouterEnter', auth: 'auth/testPage', permissions: 'save;list;update'},
            ],
        },
        {
            id: 7, url: '/app/extension', title: '功能扩展', icon: 'bars',permissions: 'save;list;update',
            subs: [{id: 8, url: '/app/extension/queryParams', title: '问号形式参数', component: 'QueryParams', query: '?param1=1&param2=2', permissions: 'save;list;update' }]
        }
    ],
    others: [] // 非菜单相关路由
}
