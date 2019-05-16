/**
 * Created by yingxuan.zhang 2019-5-13 10:44:42
 */
import React from 'react';
import MenuTree from './components/MenuTree'
import PermissionForm from './components/MenuForm'
import './MenuList.scss'
import {Card, Col, Row, Tree} from 'antd';
import API from "../../api"

class MenuList extends React.Component {
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

		API.menu.list().then(({data}) => {
			this.setState({
				loading: false,
				permissionList: data.data,
				currentChoosePermission: data.data && data.data.length > 0
					? data.data[0] : {}
			})
		}).catch((err) => {
			console.log(err)
		})
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
							<MenuTree className="permission-tree"
									  loading={this.state.loading}
									  permissionList={this.state.permissionList}
									  refreshTree={this.handleRefreshTree.bind(this)}
									  onSelectTreeItem={this.handleSelectTreeItem.bind(this)}></MenuTree>
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

export default MenuList;
