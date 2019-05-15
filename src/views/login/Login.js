import React from 'react'
import './Login.scss'
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import API from "../../api"
import {encryptByAES} from '../../utils'
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
                let params = {
                    'username': values.userName,
                    // 密码AES加密 2018-11-29 09:36:01
                    'password': encryptByAES(values.password, 'Gyh21C89ee1QDuqG').toString(),
                    // 'uuid': this.dataForm.uuid,
                    // 'captcha': this.dataForm.captcha
                }

                API.common.login(params).then(({data}) => {
                    this.isLogging = false;
                    if (data && data.code === 0) {
                        // this.$cookie.set('token', data.token, { expires: `${data.expire || 0}s` })
                        sessionStorage.setItem("userName", values.userName)
                        let toPath = this.props.toPath === '' ? '/app/settings/user' : this.props.toPath
                        this.props.history.push(toPath);
                    } else {
                        // this.getCaptcha()
                        message.error(data.msg);
                    }

                }).catch((err) => {
                    // TODO 异常处理
                    sessionStorage.setItem("userName", values.userName)
                    let toPath = this.props.toPath === '' ? '/app/settings/user' : this.props.toPath
                    this.props.history.push(toPath);
                })

                this.isLogging = true;

                // if (values.userName == "admin" && values.password == "admin") {
                //     this.isLogging = false;
                //     sessionStorage.setItem("userName", "admin")
                //     let toPath = this.props.toPath === '' ? '/app/settings/user' : this.props.toPath
                //     this.props.history.push(toPath);
                // }
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

const WrappedNormalLoginForm = Form.create({ name: 'login_form' })(NormalLoginForm);

const loginState = ({loginState}) => ({
    toPath: loginState.toPath
})

export default withRouter(connect(
    loginState
)(WrappedNormalLoginForm))
