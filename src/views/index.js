/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */
import React from 'react';

import Dashboard from './dashboard';
import PermissionList from './settings/PermissionList';
import RoleList from './settings/RoleList';
import UserList from './settings/UserList';

// const Dashboard = React.lazy(() => import('./dashboard'));
// const Login = React.lazy(() => import('./login/Login1.js'));
// const NoFound = React.lazy(() => import('./noFound/NoFound.js'));
// const PermissionList = React.lazy(() => import('./settings/PermissionList'));
// const RoleList = React.lazy(() => import('./settings/RoleList'));
// const UserList = React.lazy(() => import('./settings/UserList'));

export default {
    Dashboard,
    PermissionList,
    RoleList,
    UserList,
}
