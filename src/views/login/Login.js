import React from 'react'
import './Login.scss'
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.isLogging = false;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.isLogging = true;

                if (values.userName == "admin" && values.password == "admin") {
                    this.isLogging = false;
                    sessionStorage.setItem("userName", "admin")
                    let toPath = this.props.toPath === '' ? '/app/settings/user' : this.props.toPath
                    this.props.history.push(toPath);
                }
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="site-wrapper site-page--login login-bg">
                <div className="login-header">
                    <div>背景图片</div>
                    <div>XXXX公司</div>
                </div>
                <div className="site-content__wrapper">
                    <div className="site-content">
                        <div className="brand-info">
                            <h2 className="brand-info__text">演示系统demo111</h2>
                            <p className="brand-info__intro">Powered by 827516789@qq.com</p>
                        </div>
                        <div className="login-main">
                            <h3 className="login-title">用户登录</h3>
                            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                        rules: [{required: true, message: '请输入用户名!'}],
                                    })(
                                        <Input size="large" prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="账号"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: '请输入密码!'}],
                                    })(
                                        <Input size="large" prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                               placeholder="密码"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(
                                        <Checkbox>Remember me</Checkbox>
                                    )}
                                    <a className="login-form-forgot" href="">忘记密码</a>
                                    <Button type="primary" htmlType="submit" className="login-form-button"
                                            loading={this.isLogging ? true : false}>
                                        {this.isLogging ? 'Loging' : 'Login'}
                                    </Button>
                                    Or <a href="">注册账号!</a>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const loginState = ({loginState}) => ({
    toPath: loginState.toPath
})

export default withRouter(connect(
    loginState
)(WrappedNormalLoginForm))
