/**
 * Created by yingxuan.zhang 2019-5-13 10:44:42
 */
import React from 'react';
import {Input, Card, Row, Col, Button, Table, Modal, Tag, Popconfirm, Form} from 'antd';
import "./RoleList.scss"
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
                                分配权限
                            </Button>

                            <a style={{margin: '0 10px'}} href="javascript:;" onClick={this.showAddOrUpdateModal.bind(this, record)}>编辑</a>
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
            dataSource: [],
            loading: false,
            modalVisible: false,
            currentItem: {},
            permissionList: [],
            permissionTreeModalVisible: false,
            currentRole: {}
        };
    }

    componentWillMount() {
        this.setState({ loading: true });
        // 获取菜单列表
        // API.menu.list().then(({data}) => {
        //     this.setState({
        //         loading: false,
        //         permissionList: data.data
        //     })
        // }).catch((err) => {
        //     console.log(err)
        // })

        // 获取角色列表
        API.role.list().then(({data}) => {
            this.setState({
                loading: false,
                dataSource: data.data
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    /**
     *  显示权限树弹窗
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
        if(currentItem.id) {
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
     *  处理 保存分配权限
     */
    handleDistributePermissionOk() {
        // TODO 网络请求，保存分配权限
    }
    handleDistributePermissionCancel() {
        this.setState({
            permissionTreeModalVisible: false
        })
    }

    render() {
        let modalTitle = this.state.currentItem.id ?  '修改角色' : "新增角色"
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <Card bordered={false} className="role_card">
                <Row>
                    <Col span={24}>
                        <Search placeholder="角色名称" onSearch={value => console.log(value)} enterButton/>
                        <Button className="role_add"
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
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label="备注">
                                    {getFieldDecorator('comment', {
                                        rules: [
                                            {
                                                required: false,
                                                message: '请输入备注！',
                                            }
                                        ],
                                    })(<Input />)}
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Col>
                </Row>
                <Table columns={this.columns}
                       loading={this.state.loading}
                       dataSource={this.state.dataSource}/>

                <Modal
                    title={modalTitle}
                    visible={this.state.permissionTreeModalVisible}
                    onOk={this.handleDistributePermissionOk.bind(this)}
                    cancelText="取消"
                    okText="保存"
                    onCancel={this.handleDistributePermissionCancel.bind(this)}>
                    <MenuTree permissionList={this.state.permissionList}/>
                </Modal>
            </Card>
        )
    }
}
const WrappedRoleListForm = Form.create({ name: 'roleList_form' })(RoleList);
export default WrappedRoleListForm;
