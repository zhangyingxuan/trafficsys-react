/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, {Component} from 'react';
import {Menu, Icon, Layout, PageHeader, Row, Col} from 'antd';
import {queryString} from '../../utils';
import {withRouter} from 'react-router-dom';

const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const routes = [
    {
        path: 'index',
        breadcrumbName: 'First-level Menu',
    },
    {
        path: 'first',
        breadcrumbName: 'Second-level Menu',
    },
    {
        path: 'second',
        breadcrumbName: 'Third-level Menu',
    },
];

class HeaderCustom extends Component {
    state = {
        user: '',
        visible: false,
    };

    componentDidMount() {
        const QueryString = queryString();
        const _user = JSON.parse(localStorage.getItem('user')) || '测试';
        if (!_user && QueryString.hasOwnProperty('code')) {
            // TODO 网络处理
        } else {
            this.setState({
                user: _user
            });
        }
    };

    menuClick = e => {
        console.log(e);
        e.key === 'logout' && this.logout();
    };
    logout = () => {
        sessionStorage.removeItem('userName');
        this.props.history.push('/login')
    };
    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };

    handleBack() {
        this.props.history.go(-1)
    }

    render() {
        return (
            <Header className="custom-theme header">
                <Row>
                    <Col span={1}>
                        <Icon
                            className="header__trigger custom-trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                        />
                    </Col>
                    <Col span={13}>
                        <PageHeader breadcrumb={{ routes }}
                                    // title="Title"
                                    // onBack={this.handleBack.bind(this)}
                                    // subTitle="This is a subtitle"
                        />
                    </Col>
                    <Col span={10}>
                    <Menu
                        mode="horizontal"
                        style={{lineHeight: '64px', float: 'right', marginRight: '40px'}}
                        onClick={this.menuClick}>
                        <SubMenu title={<span className="avatar">你好 - {this.props.user.userName}<i
                            className="on bottom b-white"/></span>}>
                            <MenuItemGroup title="用户中心">
                                <Menu.Item key="setting:2">个人信息</Menu.Item>
                                <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup title="设置中心">
                                <Menu.Item key="setting:3">个人设置</Menu.Item>
                                <Menu.Item key="setting:4">系统设置</Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                    </Menu>
                    </Col>
                </Row>
            </Header>
        )
    }
}

export default withRouter(HeaderCustom);
