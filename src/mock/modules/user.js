// 获取用户列表
export function list() {
    return {
        // isOpen: false,
        url: '/user/list',
        type: 'get',
        data: {
            "code": 0,
            "msg": "success",
            "data": {
                'total': 2000,
                'pageSize': 10,
                'totalPage': 1,
                "list": [
                    {
                    "id": 662738,
                    "userName": "jianming.lin",
                    "name": "林鉴明",
                    "phone": "15520107727",
                    "email": "jianming.lin@qq.com",
                    "roles": [2, 3],
                    "isAdmin": true,
                    "status": 1,
                    "createDate": 1541106001000,
                    "updateDate": 1547039183000,
                    "updateUser": 662738
                }, {
                    "id": 35461,
                    "userName": "admintest",
                    "name": "admintest",
                    "password": "F363A4F6A97E56F8",
                    "phone": "",
                    "email": "admin@qq.com",
                    "wechatNumber": "",
                    "isAdmin": true,
                    "status": 1,
                    "createDate": 1530079816000,
                    "updateDate": 1534993137000,
                    "comment": "",
                    "updateUser": 634,
                    "createUser": 634
                }, {
                    "id": 634,
                    "userName": "admin",
                    "name": "admin",
                    "password": "25E28E4F312771A7",
                    "phone": "18166568797,17384781485",
                    "email": "admintest@qq.com",
                    "wechatNumber": "",
                    "isAdmin": true,
                    "status": 1,
                    "createDate": 1530083420000,
                    "updateDate": 1544003179000,
                    "comment": "",
                    "updateUser": 634,
                    "createUser": 634
                }, {
                    "id": 630,
                    "userName": "haibo.zhang",
                    "name": "张海博",
                    "phone": "",
                    "email": "haibo.zhang@qq.com",
                    "isAdmin": true,
                    "status": 1,
                    "createDate": 1528939830000,
                    "updateDate": 1528939830000
                }, {
                    "id": 614,
                    "userName": "hongyi.fu",
                    "name": "付洪义",
                    "phone": "18514532021",
                    "email": "hongyi.fu@qq.com",
                    "isAdmin": true,
                    "status": 1,
                    "createDate": 1528939830000,
                    "updateDate": 1552985508000
                }, {
                    "id": 564,
                    "userName": "haiquan.lin",
                    "name": "林海泉",
                    "phone": "18166568797,13368132283",
                    "email": "haiquan.lin@qq.com",
                    "wechatNumber": "",
                    "isAdmin": true,
                    "status": 1,
                    "createDate": 1529908528000,
                    "updateDate": 1543996058000
                }, {
                    "id": 497,
                    "userName": "ling.huang02",
                    "name": "黄铃02",
                    "phone": "",
                    "email": "ling.huang02@qq.com",
                    "isAdmin": true,
                    "status": 1,
                    "createDate": 1528939830000,
                    "updateDate": 1528939830000
                }, {
                    "id": 482,
                    "userName": "hanxuan.zhang",
                    "name": "张瀚漩",
                    "phone": "",
                    "email": "hanxuan.zhang@qq.com",
                    "wechatNumber": "zhx-1116949",
                    "isAdmin": true,
                    "status": 1,
                    "createDate": 1528939830000,
                    "updateDate": 1553086834000,
                    "updateUser": 482
                }]
            }
        }
    }
}

// 获取用户信息
export function info() {
    return {
        // isOpen: false,
        url: '/user/info',
        type: 'get',
        data: {
            'msg': 'success',
            'code': 0,
            'user': {
                'userId': 1,
                'userName': 'admin',
                'name': 'admin',
                'password': '9ec9750e709431dad22365cabc5c625482e574c74adaebba7dd02f1129e4ce1d',
                'salt': 'YzcmCZNvbXocrsz9dm8e',
                'email': 'root@renren.io',
                'mobile': '13612345678',
                'status': 1,
                'roleIdList': null,
                'createUserId': 1,
                'createTime': '2016-11-11 11:11:11'
            },
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

// 修改密码
export function updatePassword() {
    return {
        // isOpen: false,
        url: '/sys/user/password',
        type: 'post',
        data: {
            'msg': 'success',
            'code': 0
        }
    }
}

// 添加用户
export function add() {
    return {
        // isOpen: false,
        url: '/sys/user/save',
        type: 'post',
        data: {
            'msg': 'success',
            'code': 0
        }
    }
}

// 修改用户
export function update() {
    return {
        // isOpen: false,
        url: '/sys/user/update',
        type: 'post',
        data: {
            'msg': 'success',
            'code': 0
        }
    }
}

// 删除用户
export function del() {
    return {
        // isOpen: false,
        url: '/sys/user/delete',
        type: 'post',
        data: {
            'msg': 'success',
            'code': 0
        }
    }
}
