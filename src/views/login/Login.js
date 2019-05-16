import React from 'react'
import './Login.scss'
import {Form, Icon, Input, Button, Checkbox, message, Row, Col} from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import API from "../../api"
import {encryptByAES, getUUID} from '../../utils'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.isLogging = false;
        this.state = {
            captchaImgStream: ''
        }
    }

    componentWillMount() {
        this.fetchCaptcha()
    }

    fetchCaptcha() {
        console.log("fetchCaptcha")
        API.common.captcha(getUUID()).then(({data}) => {
            this.setState({
                captchaImgStream: 'data:image/png;base64,' + data.base64Str
            })
        }).catch((err) => {
            console.log(err)
        })
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

                this.isLogging = true;
                API.common.login(params).then(({data}) => {
                    this.isLogging = false;
                    if (data && data.code === 0) {
                        // this.$cookie.set('token', data.token, { expires: `${data.expire || 0}s` })
                        sessionStorage.setItem("userName", values.userName)
                        let toPath = this.props.toPath === '' ? '/app/settings/user' : this.props.toPath
                        this.props.history.push(toPath);
                    } else {
                        this.fetchCaptcha()
                        message.error(data.msg);
                    }

                }).catch((err) => {
                    // TODO 异常处理
                    message.error(err)
                })
            }
        });
    }

    componentDidMount() {
        this.props.form.setFieldsValue({
            userName: 'admin',
            password: 'admin',
            captcha: 'admin',
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
                                        <Input size="large"
                                               prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="账号"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: '请输入密码!'}],
                                    })(
                                        <Input size="large"
                                               prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               type="password"
                                               placeholder="密码"/>
                                    )}
                                </FormItem>
                                <Row>
                                    <Col span={14}>
                                        <FormItem>
                                            {getFieldDecorator('captcha', {
                                                rules: [{required: true, message: '请输入验证码!'}],
                                            })(
                                                <Input size="large"
                                                       prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                       placeholder="验证码"/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={10}>
                                        <img id="validateImg" src={this.state.captchaImgStream}
                                             onClick={this.fetchCaptcha.bind(this)} alt="点击刷新"/>
                                    </Col>
                                </Row>
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
                                    {/*Or <a href="">注册账号!</a>*/}
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: 'login_form'})(NormalLoginForm);

const loginState = ({loginState}) => ({
    toPath: loginState.toPath
})

export default withRouter(connect(
    loginState
)(WrappedNormalLoginForm))
