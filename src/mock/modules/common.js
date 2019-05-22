import isInteger from 'lodash/isInteger'

// 登录
export function login() {
    return {
        isOpen: true,
        url: '/login',
        type: 'post',
        data: {
            "code": 0,
            "msg": "success",
            "data": {
                "menu": [{
                    "sequence": 0,
                    "children": [{
                        "path": "/requestList",
                        "sequence": 0,
                        "title": "告警清单列表",
                        "parentId": 5
                    }, {
                        "path": "/warningList",
                        "sequence": 1,
                        "title": "告警发送列表",
                        "parentId": 5
                    }, {"path": "disBillList", "sequence": 3, "title": "告警台账管理", "parentId": 5}],
                    "icon": "el-icon-warning",
                    "id": 5,
                    "title": "告警管理"
                }, {
                    "sequence": 1,
                    "children": [{
                        "path": "/appList",
                        "sequence": 0,
                        "title": "告警系统接入",
                        "parentId": 7
                    }, {"path": "/eventAccess", "sequence": 2, "title": "告警事件接入", "parentId": 7}],
                    "icon": "el-icon-menu",
                    "id": 7,
                    "title": "告警接入"
                }, {
                    "sequence": 2,
                    "children": [{
                        "path": "/eventAccessedList",
                        "sequence": 0,
                        "title": "告警事件-规则分配",
                        "parentId": 8
                    }, {"path": "/ruleList", "sequence": 1, "title": "告警规则列表", "parentId": 8}, {
                        "path": "/emailList",
                        "sequence": 2,
                        "title": "邮箱管理",
                        "parentId": 8
                    }],
                    "icon": "el-icon-tickets",
                    "id": 8,
                    "title": "告警规则管理"
                }, {
                    "sequence": 3,
                    "children": [{"path": "/userGroupList", "sequence": 1, "title": "用户组列表", "parentId": 6}],
                    "icon": "el-icon-mobile-phone",
                    "id": 6,
                    "title": "用户组管理"
                }, {
                    "sequence": 4,
                    "children": [{
                        "path": "/adminList",
                        "sequence": 0,
                        "title": "管理员列表",
                        "parentId": 9
                    }, {"path": "/roleList", "sequence": 1, "title": "角色列表", "parentId": 9}, {
                        "path": "/permissionList",
                        "sequence": 2,
                        "title": "权限列表",
                        "parentId": 9
                    }, {"path": "/operationLog", "sequence": 3, "title": "日志列表", "parentId": 9}, {
                        "path": "/userList",
                        "sequence": 4,
                        "title": "用户列表",
                        "parentId": 9
                    }, {"path": "dictList", "sequence": 6, "title": "数据字典列表", "parentId": 9}],
                    "icon": "el-icon-setting",
                    "id": 9,
                    "title": "系统设置"
                }, {
                    "sequence": 5,
                    "children": [{"path": "/statisticsList", "sequence": 0, "title": "统计详情", "parentId": 73}],
                    "icon": "el-icon-document",
                    "id": 73,
                    "title": "日常统计"
                }], "user": {
                    "id": 634,
                    "userLogonName": "admin",
                    "userName": "admin",
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
                    "createUser": 634,
                    "permissions": [{
                        "id": 10,
                        "parentId": 5,
                        "permissionName": "告警发送列表",
                        "permission": "warn",
                        "url": "/warningList",
                        "icon": "edit-icon",
                        "sequence": 1,
                        "status": 1,
                        "comment": "",
                        "createDate": 1529373565000,
                        "updateDate": 1529404961000,
                        "updateUser": 530
                    }, {
                        "id": 12,
                        "parentId": 6,
                        "permissionName": "用户组列表",
                        "permission": "user",
                        "url": "/userGroupList",
                        "icon": "",
                        "sequence": 1,
                        "status": 1,
                        "comment": "",
                        "createDate": 1529373563000
                    }, {
                        "id": 13,
                        "parentId": 7,
                        "permissionName": "告警系统接入",
                        "permission": "app",
                        "url": "/appList",
                        "icon": "",
                        "sequence": 0,
                        "status": 1,
                        "comment": "",
                        "createDate": 1526987669000,
                        "updateDate": 1552705477000,
                        "updateUser": 662738
                    }, {
                        "id": 16,
                        "parentId": 7,
                        "permissionName": "告警事件接入",
                        "permission": "event",
                        "url": "/eventAccess",
                        "icon": "",
                        "sequence": 2,
                        "status": 1,
                        "comment": "",
                        "createDate": 1529373562000,
                        "updateDate": 1552705482000,
                        "updateUser": 662738
                    }, {
                        "id": 17,
                        "parentId": 8,
                        "permissionName": "告警规则列表",
                        "permission": "rule",
                        "url": "/ruleList",
                        "icon": "",
                        "sequence": 1,
                        "status": 1,
                        "comment": "",
                        "createDate": 1529373561000,
                        "updateDate": 1530005185000,
                        "updateUser": 634
                    }, {
                        "id": 61,
                        "parentId": 9,
                        "permissionName": "管理员列表",
                        "permission": "admin",
                        "url": "/adminList",
                        "icon": "",
                        "sequence": 0,
                        "status": 1,
                        "createDate": 1529825986000,
                        "updateDate": 1529313206000,
                        "createUser": 634,
                        "updateUser": 530
                    }, {
                        "id": 18,
                        "parentId": 9,
                        "permissionName": "角色列表",
                        "permission": "role",
                        "url": "/roleList",
                        "icon": "",
                        "sequence": 1,
                        "status": 1,
                        "comment": "",
                        "createDate": 1529825989000,
                        "updateDate": 1528162281000,
                        "updateUser": 8
                    }, {
                        "id": 19,
                        "parentId": 9,
                        "permissionName": "权限列表",
                        "permission": "perm",
                        "url": "/permissionList",
                        "icon": "",
                        "sequence": 2,
                        "status": 1,
                        "comment": "",
                        "createDate": 1529825992000,
                        "updateDate": 1528162272000,
                        "updateUser": 8
                    }, {
                        "id": 65,
                        "parentId": 9,
                        "permissionName": "日志列表",
                        "permission": "operationLog",
                        "url": "/operationLog",
                        "icon": "",
                        "sequence": 3,
                        "status": 1,
                        "createDate": 1531204276000,
                        "updateDate": 1531551754000,
                        "createUser": 634,
                        "updateUser": 634
                    }, {
                        "id": 67,
                        "parentId": 9,
                        "permissionName": "用户列表",
                        "permission": "contact",
                        "url": "/userList",
                        "icon": "",
                        "sequence": 4,
                        "status": 1,
                        "createDate": 1536134654000,
                        "updateDate": 1536134980000,
                        "createUser": 634,
                        "updateUser": 634
                    }, {
                        "id": 69,
                        "parentId": 9,
                        "permissionName": "数据字典列表",
                        "permission": "dict",
                        "url": "dictList",
                        "icon": "",
                        "sequence": 6,
                        "status": 1,
                        "createDate": 1543819891000,
                        "updateDate": 1543820206000,
                        "createUser": 564,
                        "updateUser": 564
                    }, {
                        "id": 74,
                        "parentId": 73,
                        "permissionName": "统计详情",
                        "permission": "statistics",
                        "url": "/statisticsList",
                        "icon": "",
                        "sequence": 0,
                        "status": 1,
                        "createDate": 1553742644000,
                        "updateDate": 1553742644000,
                        "createUser": 662738,
                        "updateUser": 662738
                    }],
                    "userGroups": [{
                        "id": 26,
                        "userGroupName": "admin",
                        "userGroupNumber": "fff",
                        "status": 1,
                        "comment": "",
                        "createDate": 1526971419000,
                        "updateDate": 1530083752000,
                        "createUser": 8,
                        "updateUser": 634
                    }]
                }
            }
        }
    }
}

export function captcha(uuid) {
    return {
        isOpen: true,
        url: '/captcha',
        type: 'get',
        data: {
            'msg': 'success',
            'code': 0,
            'expire': 43200,
            'base64Str': 'iVBORw0KGgoAAAANSUhEUgAAAIYAAAAiCAIAAAAVljY+AAACYElEQVR42u3YO0sDQRAA4KRWiJYqWghaWwsiKAEbwdJeRLGWkCIoWlioBCutFAQtLCW9aCGCtSCk9xeIWOrCwbHsY3b2vZfsMMW9OI79mJvdrf3lSCxqeQgyCSqebu8zSVbRjuf2DclBI2nvfxaZC8UvyehjvUyMR5nLm4dCFaEZHDtTM5mExVDCKElKFeYxrySXe78hAY4fXlAkY+sLDj1kMDyJUIV/BviG3dkjJpWfPdk7K9K5ynzj2kBFTDKy2NJVkY1+SBLeA0PitVAwKigSg0IBhl52K1kS5ypKGFoF6iVaKjYk9DFDImTDeNh3eLdNBa+iaO94FbiZ40nIMa1iRuJk0uW8z8MqQUm0qoQuFNkDyJZuQHJwOh1dRT0JRqoAk6vwJMaNhJCU6WlCDLQWLAlSRTkDxpMIF/ZhSJQq5XVP5UJUzEnmmm9MygwwJPhTZHsv0uzfRZPQKvwtHyrY1TumUHgYciojAcpC2MzpK8LtL2FxWJLQheLWw82Giv2SHt5wRHpgFiWrH1c2ky5+9Okr9Y2VTOKXZLu1BZMwpwmRACrKiRawmwIsDIG/nHKdiA+ehP990RWTFonNdCsYicH3w4USoH942ZzX8sCQNL7GkyJ5Pb8gCbxk7b2bFokMxvhVcUlkUywAJlESt1GqRK8S5q4QJkWSpU4/Fp79bjytAvT2iv24IpLQNpYkQo9MEiEKEnhFUj2SSqsQEiFAeJXQJN3eRJHKV32fNEOSyIZ+8Em0IqSKbNy1OkqKJG4jSqHgC2gYScKraP3ThpQkERWaJz7Jz10nkyDDCck/u/A9Wqbzvj8AAAAASUVORK5CYII='
        }
    }
}

// 退出
export function logout() {
    return {
        // isOpen: false,
        url: '/sys/logout',
        type: 'post',
        data: {
            'msg': 'success',
            'code': 0
        }
    }
}
