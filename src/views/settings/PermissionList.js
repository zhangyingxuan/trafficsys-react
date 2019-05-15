/**
 * Created by yingxuan.zhang 2019-5-13 10:44:42
 */
import React from 'react';
import PermissionTree from './components/PermissionTree'
import PermissionForm from './components/PermissionForm'
import './PermissionList.scss'
import {Card, Col, Row, Tree} from 'antd';

class PermissionList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			permissionList: [],
			currentChoosePermission: {},
			loading: false
		};
	}

	componentWillMount() {

		this.setState({ loading: true });
		// 获取菜单数据
		setTimeout(() => {
			this.setState({
				loading: false,
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

	componentDidMount() {
	}

	/**
	 *  调用网络，刷新权限树
	 */
	handleRefreshTree() {

	}

	deepSearchSelectedTreeItem(permissionList, treeItemTitle) {
		if(permissionList == null || permissionList == undefined){
			return null
		}

		for(let i = 0; i < permissionList.length; i++) {
			let currentPermission = permissionList[i]
			if(currentPermission.title === treeItemTitle) {
				return currentPermission
			}
			let subPermission = this.deepSearchSelectedTreeItem(currentPermission.subs, treeItemTitle)
			if(subPermission) {
				return subPermission
			}
		}

		return null
	}

	/**
	 *  处理选中树节点操作
	 * @param treeItemTitle
	 */
	handleSelectTreeItem(treeItemTitle) {
		let permissionList = this.state.permissionList
		let selectedTreItem = this.deepSearchSelectedTreeItem(permissionList, treeItemTitle)

		this.setState({
			currentChoosePermission: selectedTreItem
		})
	}

	render() {
		return (
			<div className="permission-container">
				<Row gutter={6}>
					<Col span={12}>
						<Card title="权限树"
							  loading={this.state.loading}
							  bordered={false}>
							<PermissionTree className="permission-tree"
											loading={this.state.loading}
											permissionList={this.state.permissionList}
											refreshTree={this.handleRefreshTree.bind(this)}
											onSelectTreeItem={this.handleSelectTreeItem.bind(this)}></PermissionTree>
						</Card>
					</Col>
					<Col span={12}>
						<Card title="修改/添加菜单" bordered={false}>
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
