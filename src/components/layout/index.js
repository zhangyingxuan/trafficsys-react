import React from 'react';
import Routes from '../../routes';
import SiderCustom from "./SiderCustom"
import HeaderCustom from "./HeaderCustom"
import { ThemePicker } from '../widget';
import { Tabs, Avatar, Menu, Icon } from 'antd';

import 'antd/dist/antd.css';
import '../../res/styles/index.scss';
import {Layout} from 'antd';
const { Content, Footer } = Layout;
const TabPane = Tabs.TabPane;

class MyLayout extends React.Component {
    state = {
        collapsed: false,
        title: '',
        auth: {
            data: {}
        },
        activeKey: 'newTab0',
        panes: []
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


    onChange = (activeKey) => {
        let exitPane = this.getExitPane('key', activeKey);
        if(exitPane !== null) {
            this.props.history.push(exitPane.url);
            this.setState({ activeKey });
        }
    }
    getExitPane = (propertyName, value) => {
        let matchPanes = this.state.panes.filter((item) => item[propertyName] === value);
        if(matchPanes.length > 0) {
            return matchPanes[0];
        }
        return null;
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
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

                        {/*<Tabs*/}
                            {/*onChange={this.onChange}*/}
                            {/*activeKey={this.state.activeKey}*/}
                            {/*type="editable-card"*/}
                            {/*onEdit={this.onEdit}*/}
                        {/*>*/}
                            {/*{this.state.panes.map(pane => (*/}
                                {/*<TabPane tab={pane.title} key={pane.key} closable={pane.closable}>*/}
                                    {/*{pane.content}*/}
                                {/*</TabPane>*/}
                            {/*))}*/}
                        {/*</Tabs>*/}


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
