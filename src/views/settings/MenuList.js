/**
 * Created by yingxuan.zhang 2019-5-13 10:44:42
 */
import React from 'react';
import MenuTree from './components/MenuTree'
import PermissionForm from './components/MenuForm'
import './MenuList.scss'
import {Button, Card, Col, Input, Row, Tree} from 'antd';
import API from "../../api"
const Search = Input.Search;

class MenuList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			permissionList: [],
			currentChooseMenuItem: {},
			loading: false
		};
	}

	componentWillMount() {
		this.setState({ loading: true });

		API.menu.list().then(({data}) => {
			this.setState({
				loading: false,
				permissionList: data.data,
				currentChooseMenuItem: data.data && data.data.length > 0
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

	/**
	 *  处理选中树节点操作
	 * @param treeItemTitle
	 */
	handleSelectTreeItem(treeItem) {

		this.setState({
			currentChooseMenuItem: treeItem
		})
	}

	addOrUpdateRole() {

	}
	onChange = e => {
		const value = e.target.value;
		// const expandedKeys = dataList
		//     .map(item => {
		//         if (item.title.indexOf(value) > -1) {
		//             return getParentKey(item.key, gData);
		//         }
		//         return null;
		//     })
		//     .filter((item, i, self) => item && self.indexOf(item) === i);
		// this.setState({
		//     expandedKeys,
		//     searchValue: value,
		//     autoExpandParent: true,
		// });
	};

	render() {
		return (
			<div className="permission-container">
				<Row gutter={6}>
					<Col span={12}>
						<Card title="权限树"
							  loading={this.state.loading}
							  bordered={false}>

							<div style={{display: 'flex'}}>
								<Search style={{ margin: '0 10px 8px 0' }} placeholder="Search" onChange={this.onChange} />
								<Button className="role_add"
										color="red"
										type="primary" onClick={this.addOrUpdateRole.bind(this, {})}>
									新增一级菜单
								</Button>
							</div>
							<MenuTree className="permission-tree"
									  showEditBtn={true}
									  checkable={false}
									  loading={this.state.loading}
									  permissionList={this.state.permissionList}
									  refreshTree={this.handleRefreshTree.bind(this)}
									  onSelectTreeItem={this.handleSelectTreeItem.bind(this)}></MenuTree>
						</Card>
					</Col>
					<Col span={12}>
						<Card title="修改/添加菜单" bordered={false}>
							<PermissionForm className="permission-form"
											permissionItem={this.state.currentChooseMenuItem}></PermissionForm>
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}

export default MenuList;
