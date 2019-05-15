import React from 'react';
import Routes from '../../routes';
import SiderCustom from "./SiderCustom"
import HeaderCustom from "./HeaderCustom"
import { ThemePicker } from '../widget';

import 'antd/dist/antd.css';
import '../../res/styles/index.scss';
import {Layout} from 'antd';
const { Content, Footer } = Layout;

class MyLayout extends React.Component {
    state = {
        collapsed: false,
        title: '',
        auth: {
            data: {}
        }
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    componentWillMount() {
        // 线上调用，getUser 接口

        setTimeout(() => {
            this.setState({
                auth: {
                    data: {
                        userName: "admin"
                    }
                }
            })
        }, 300)
    }

    componentDidMount() {
    }

    render() {
        return (
            <Layout>
                {<SiderCustom collapsed={this.state.collapsed}/>}
                <ThemePicker/>
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={this.state.auth.data || {}}/>
                    <Content style={{margin: '0 16px', overflow: 'initial', flex: '1 1 0'}}>
                        <Routes auth={this.state.auth}/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        trafficsys-web ©{new Date().getFullYear()} Created by 827516789@qq.com
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default MyLayout;
