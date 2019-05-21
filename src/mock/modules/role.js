import isInteger from 'lodash/isInteger'

// 获取角色列表
export function list(params) {
    console.log(params)
    return {
        // isOpen: false,
        url: '/role/list',
        type: 'get',
        data: {
            'msg': 'success',
            'code': 0,
            'data': {
                'total': 2000,
                'pageSize': 10,
                'totalPage': 1,
                'current': params ? params.current++ : 1,
                'list': [
                    {
                        id: '1',
                        key: '1',
                        roleName: 'John Brown',
                        menus: [1,2],
                        comment: 'comment11'
                    },
                    {
                        id: '2',
                        key: '2',
                        roleName: 'Jim Green',
                        menus: [3,4],
                        comment: 'comment22'
                    },
                    {
                        id: '3',
                        key: '3',
                        roleName: 'Joe Black',
                        menus: [1,5],
                        comment: 'comment33'
                    }
                ]
            }
        }
    }
}

// 获取角色列表, 根据当前用户
export function roleMenuList(params) {
    return {
        isOpen: false,
        url: '/role/roleMenuList',
        type: 'get',
        data: {
            'msg': 'success',
            'code': 0,
            'data': "1,2"
        }
    }
}

// 添加角色
export function add() {
    return {
        // isOpen: false,
        url: '/sys/role/save',
        type: 'post',
        data: {
            'msg': 'success',
            'code': 0
        }
    }
}

// 修改角色
export function update() {
    return {
        // isOpen: false,
        url: '/sys/role/update',
        type: 'post',
        data: {
            'msg': 'success',
            'code': 0
        }
    }
}

// 删除角色
export function del() {
    return {
        // isOpen: false,
        url: '/sys/role/delete',
        type: 'post',
        data: {
            'msg': 'success',
            'code': 0
        }
    }
}
