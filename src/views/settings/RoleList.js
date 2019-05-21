/**
 * Created by yingxuan.zhang 2019-5-13 10:44:42
 */
import React from 'react';
import {Input, Card, Row, Col, Button, Table, Modal, Tag, Popconfirm, Form, Pagination} from 'antd';
import "./setttings.scss"
import MenuTree from './components/MenuTree'
import API from "../../api"

const Search = Input.Search;

class RoleList extends React.Component {
    constructor(props) {
        super(props)
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'roleName',
                key: 'roleName',
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
                            <Button type="primary" onClick={this.showPermissionTree.bind(this, record)}>
                                分配菜单
                            </Button>

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
            permissionList: [],
            currentChooseMenuItem: {},
            permissionTreeModalVisible: false,
            currentRole: {},
            queryParams: {
                current: 1,
                pageSize: 8,
            },
            queryStr: '',
            checkedKeys: [3,4]
        };
    }

    componentWillMount() {
        this.setState({loading: true});
        // 获取菜单列表
        API.menu.list().then(({data}) => {
            this.setState({
                permissionList: data.data
            })
        }).catch((err) => {
            console.log(err)
        })

        // 获取角色列表
        this.fetchRoleList(this.state.queryStr, this.state.queryParams.current, this.state.queryParams.pageSize)
    }

    /**
     *  显示菜单树弹窗
     * @param currentRole
     */
    showPermissionTree(currentRole) {
        this.setState({
            permissionTreeModalVisible: true,
            currentRole: currentRole
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
     *  勾选框点击时，更新受控 勾选项
     * @param checkedKeys
     */
    handleCheckTreeItem(checkedKeys) {
        console.log(checkedKeys)
        this.setState({
            checkedKeys: checkedKeys
        })
    }

    /**
     *  处理 保存分配菜单
     */
    handleDistributePermissionOk() {
        // TODO 网络请求，保存分配菜单
    }

    handleDistributePermissionCancel() {
        this.setState({
            permissionTreeModalVisible: false
        })
    }

    /**
     *  处理页码修改
     */
    handlePageChange(page, pageSize) {
        this.fetchRoleList(this.state.queryStr, page, pageSize)
    }

    onSearchStrChange(e) {
        this.setState({
            queryStr: e.target.value
        })
    }

    handleSearch(searchValue, e) {
        this.fetchRoleList(searchValue, this.state.queryParams.current, this.state.queryParams.pageSize)
    }

    fetchRoleList(searchValue, current, pageSize) {
        this.setState({loading: true})
        API.role.list({searchParams: searchValue, current, pageSize}).then(({data}) => {
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

    render() {
        let modalTitle = this.state.currentItem.id ? '修改角色' : "新增角色"
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
                        <Search placeholder="角色名称"
                                onChange={this.onSearchStrChange.bind(this)}
                                onSearch={this.handleSearch.bind(this)}
                                enterButton/>
                        <Button className="add_button"
                                color="red"
                                type="primary" onClick={this.showAddOrUpdateModal.bind(this, {})}>
                            新增角色
                        </Button>
                        <Modal
                            title={modalTitle}
                            visible={this.state.modalVisible}
                            onOk={this.handleOk}
                            cancelText="取消"
                            okText="保存"
                            onCancel={this.handleCancel}>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item label="角色名称">
                                    {getFieldDecorator('roleName', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入角色名称！',
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
                <Table columns={this.columns}
                       loading={this.state.loading}
                       pagination={false}
                       dataSource={this.state.dataSource}/>
                <div className="pagination-container">
                    <Pagination {...this.state.resultData}
                                onChange={this.handlePageChange.bind(this)}></Pagination>
                </div>
                <Modal
                    title='分配菜单'
                    visible={this.state.permissionTreeModalVisible}
                    onOk={this.handleDistributePermissionOk.bind(this)}
                    cancelText="取消"
                    okText="确认"
                    onCancel={this.handleDistributePermissionCancel.bind(this)}>
                    <MenuTree permissionList={this.state.permissionList}
                              showEditBtn={false}
                              loading={this.state.loading}
                              checkedKeys={this.state.checkedKeys}
                              onSelectTreeItem={this.handleSelectTreeItem.bind(this)}
                              onCheckTreeItem={this.handleCheckTreeItem.bind(this)}
                              checkable={true}/>
                </Modal>
            </Card>
        )
    }
}

const WrappedRoleListForm = Form.create({name: 'roleList_form'})(RoleList);
export default WrappedRoleListForm;
