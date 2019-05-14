/**
 * Created by yingxuan.zhang 2019-5-13 10:44:42
 */
import React from 'react';
import PermissionTree from './components/PermissionTree'
import PermissionForm from './components/PermissionForm'
import './PermissionList.scss'
import { Card, Col, Row } from 'antd';

class PermissionList extends React.Component {
	constructor(props) {
		super(props);
		this.handleSelectTreeItem.bind(this)
		this.state = {
			permissionList: [],
			currentChoosePermission: {}
		};
	}

	componentDidMount() {
		// 获取菜单数据
		setTimeout(() => {
			this.setState({
				permissionList: [ // 菜单相关路由
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
					}
				]
			})
			this.setState({
				currentChoosePermission: this.permissionList && this.permissionList.length > 0
					? this.permissionList[0] : {}
			})
		}, 300)
	}

	handleSelectTreeItem(treeItem) {
		console.log(treeItem)
	}

	render() {
		return (
			<div className="permission-container">
				<Row gutter={16}>
					<Col span={12}>
						<Card title="Card title" bordered={false}>
							<PermissionTree className="permission-tree"
											permissionList={this.state.permissionList}
											onSelectTreeItem={this.handleSelectTreeItem}></PermissionTree>
						</Card>
					</Col>
					<Col span={12}>
						<Card title="Card title" bordered={false}>
							<PermissionForm className="permission-form"
											permissionItem={this.state.currentChoosePermission}></PermissionForm>
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}

export default PermissionList;
