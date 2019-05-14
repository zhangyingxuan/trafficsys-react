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
        title: ''
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        const { auth = { data: {} }, responsive = { data: {} } } = this.props;
        console.log(auth);
        return (
            <Layout>
                {<SiderCustom collapsed={this.state.collapsed}/>}
                <ThemePicker/>
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data || {}}/>
                    <Content style={{margin: '0 16px', overflow: 'initial', flex: '1 1 0'}}>
                        <Routes auth={auth}/>
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
