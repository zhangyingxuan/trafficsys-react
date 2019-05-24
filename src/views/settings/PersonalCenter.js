/**
 * Created by yingxuan.zhang 2019-5-13 10:44:42
 */
import React from 'react';
import {Input, Card, Form} from 'antd';
import "./setttings.scss"
import API from "../../api"

class PersonalCenter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        };
    }

    componentWillMount() {
        // 获取角色列表
        this.fetchUserInfo()
    }

    fetchUserInfo() {
        this.setState({loading: true})
        API.user.info().then(({data}) => {
            this.setState({
                loading: false,
            })

            this.props.form.setFieldsValue({...data.user});
        }).catch((err) => {
            console.log(err)
        })
    }


    render() {
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
            <Card bordered={false}
                  className="role_card">
                <Form {...formItemLayout}
                      style={{width: '60%'}}
                      onSubmit={this.handleSubmit}>
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
            </Card>
        )
    }
}

const WrappedUserListForm = Form.create({name: 'userInfo_form'})(PersonalCenter);
export default WrappedUserListForm;
