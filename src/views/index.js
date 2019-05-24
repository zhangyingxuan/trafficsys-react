/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */
import Dashboard from './dashboard';
import MenuList from './settings/MenuList';
import RoleList from './settings/RoleList';
import UserList from './settings/UserList';
import PersonalCenter from './settings/PersonalCenter';

// const Dashboard = React.lazy(() => import('./dashboard'));
// const Login = React.lazy(() => import('./login/Login1.js'));
// const NoFound = React.lazy(() => import('./noFound/NoFound.js'));
// const MenuList = React.lazy(() => import('./settings/MenuList'));
// const RoleList = React.lazy(() => import('./settings/RoleList'));
// const UserList = React.lazy(() => import('./settings/UserList'));

export default {
    Dashboard,
    MenuList,
    RoleList,
    UserList,
    PersonalCenter
}
