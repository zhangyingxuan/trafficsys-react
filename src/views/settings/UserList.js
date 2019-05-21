/**
 * Created by yingxuan.zhang 2019-5-13 10:44:42
 */
import React from 'react';
import {Input, Card, Row, Col, Button, Table, Modal, Tag, Popconfirm, Form, Pagination, Select} from 'antd';
import "./setttings.scss"
import API from "../../api"

const Search = Input.Search;

class UserList extends React.Component {
	constructor(props) {
		super(props)
		this.columns = [
			{
				title: '用户名',
				dataIndex: 'userName',
				key: 'userName',
			},
			{
				title: '姓名',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '邮箱',
				dataIndex: 'email',
				key: 'email',
			},
			{
				title: '电话',
				dataIndex: 'phone',
				key: 'phone',
			},
			{
				title: '角色',
				dataIndex: 'role',
				key: 'role',
			},
			{
				title: '备注',
				dataIndex: 'comment',
				key: 'comment',
			},
			{
				title: '操作',
				dataIndex: 'operation',
				render: (text, record) =>
					this.state.dataSource.length >= 1 ? (
						<React.Fragment>
							<a style={{margin: '0 10px'}} href="javascript:;"
							   onClick={this.showAddOrUpdateModal.bind(this, record)}>编辑</a>
							<Popconfirm title="确定删除吗？"
										cancelText="取消"
										okText="保存"
										onConfirm={() => this.handleDelete(record.id)}>
								<a href="javascript:;">删除</a>
							</Popconfirm>
						</React.Fragment>
					) : null,
			},
		];

		this.state = {
			resultData: {
				dataSource: [],
				pageSize: 10,   // 每页条数
				current: 1, // 当前页数
				total: 100, // 数据总数
			},
			loading: false,
			modalVisible: false,
			currentItem: {},
			currentChooseMenuItem: {},
			queryParams: {
				current: 1,
				pageSize: 8,
			},
			queryStr: '',
			defaultCheckedMenuKeys: []
		};
	}

	componentWillMount() {
		// 获取角色列表
		this.fetchUserList(this.state.queryStr, this.state.queryParams.current, this.state.queryParams.pageSize)
	}

	fetchUserList(searchValue, current, pageSize) {
		this.setState({loading: true})
		API.user.list({searchParams: searchValue, current, pageSize}).then(({data}) => {
			this.setState({
				loading: false,
				queryParams: data.data,
				resultData: data.data,
				dataSource: data.data.list
			})
		}).catch((err) => {
			console.log(err)
		})
	}

	/**
	 *  处理表格删除
	 * @param key
	 */
	handleDelete = key => {
		const dataSource = [...this.state.dataSource];

		// TODO 调用网络删除，该数据
		this.setState({dataSource: dataSource.filter(item => item.key !== key)});
	};

	/**
	 *
	 * @param currentItem
	 */
	showAddOrUpdateModal(currentItem) {
		if (currentItem.id) {
			this.props.form.setFieldsValue({...currentItem});
		} else {
			this.props.form.setFieldsValue({
				id: null,
				roleName: '',
				comment: ''
			});
		}

		// TODO 调用网络保存该数据
		this.setState({
			modalVisible: true,
			currentItem: currentItem
		});
	}

	handleOk = e => {
		this.setState({
			modalVisible: false,
		});
	};

	handleCancel = e => {
		this.setState({
			modalVisible: false,
		});
	};

	/**
	 *  处理选中树节点操作
	 * @param treeItemTitle
	 */
	handleSelectTreeItem(treeItem) {
		this.setState({
			currentChooseMenuItem: treeItem
		})
	}

	/**
	 *  处理 保存分配菜单
	 */
	handleDistributePermissionOk() {
		// TODO 网络请求，保存分配菜单
	}


	/**
	 *  处理页码修改
	 */
	handlePageChange(page, pageSize) {
		this.fetchUserList(this.state.queryStr, page, pageSize)
	}

	onSearchStrChange(e) {
		this.setState({
			queryStr: e.target.value
		})
	}

	/**
	 *  查询用户列表
	 * @param searchValue
	 * @param e
	 */
	handleSearch(searchValue, e) {
		this.fetchUserList(searchValue, this.state.queryParams.current, this.state.queryParams.pageSize)
	}

	/**
	 *  选中的节点更改时
	 * @param value
	 */
	handleChange(value) {
		console.log(`selected ${value}`);
	}

	/**
	 *  角色节点下拉列表
	 */
	initRoleNodeList() {
		return <div>daf</div>
	}

	render() {
		let modalTitle = this.state.currentItem.id ? '修改用户' : "新增用户"
		const formItemLayout = {
			labelCol: {
				xs: {span: 24},
				sm: {span: 8},
			},
			wrapperCol: {
				xs: {span: 24},
				sm: {span: 16},
			},
		};
		const {getFieldDecorator} = this.props.form;
		return (
			<Card bordered={false} className="role_card">
				<Row>
					<Col span={24}>
						<Search placeholder="用户名称"
								onChange={this.onSearchStrChange.bind(this)}
								onSearch={this.handleSearch.bind(this)}
								enterButton/>
						<Button className="add_button"
								color="red"
								type="primary" onClick={this.showAddOrUpdateModal.bind(this, {})}>
							新增用户
						</Button>
						<Modal
							title={modalTitle}
							visible={this.state.modalVisible}
							onOk={this.handleOk}
							cancelText="取消"
							okText="保存"
							onCancel={this.handleCancel}>
							<Form {...formItemLayout} onSubmit={this.handleSubmit}>
								<Form.Item label="用户名">
									{getFieldDecorator('userName', {
										rules: [
											{
												required: true,
												message: '请输入用户名称！',
											}
										],
									})(<Input/>)}
								</Form.Item>
								<Form.Item label="姓名">
									{getFieldDecorator('name', {
										rules: [
											{
												required: true,
												message: '请输入姓名！',
											}
										],
									})(<Input/>)}
								</Form.Item>
								<Form.Item label="角色">
									<Select
										mode="multiple"
										style={{ width: '100%' }}
										placeholder="Please select"
										defaultValue={['a10', 'c12']}
										onChange={this.handleChange.bind(this)}>
										{this.initRoleNodeList.bind(this)}
									</Select>
								</Form.Item>
								<Form.Item label="邮箱">
									{getFieldDecorator('email', {
										rules: [
											{
												required: true,
												message: '请输入邮箱！',
											}
										],
									})(<Input/>)}
								</Form.Item>
								<Form.Item label="手机号">
									{getFieldDecorator('roleName', {
										rules: [
											{
												required: true,
												message: '请输入手机号！',
											}
										],
									})(<Input/>)}
								</Form.Item>
								<Form.Item label="备注">
									{getFieldDecorator('comment', {
										rules: [
											{
												required: false,
												message: '请输入备注！',
											}
										],
									})(<Input/>)}
								</Form.Item>
							</Form>
						</Modal>
					</Col>
				</Row>
				<Table rowKey="id"
					   columns={this.columns}
					   loading={this.state.loading}
					   pagination={false}
					   dataSource={this.state.dataSource}/>
				<div className="pagination-container">
					<Pagination {...this.state.resultData}
								onChange={this.handlePageChange.bind(this)}></Pagination>
				</div>
			</Card>
		)
	}
}

const WrappedUserListForm = Form.create({name: 'userList_form'})(UserList);
export default WrappedUserListForm;
