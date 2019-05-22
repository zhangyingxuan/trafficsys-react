import React from 'react';
import SiderCustom from "./SiderCustom"
import HeaderCustom from "./HeaderCustom"
import { ThemePicker } from '../widget';
import { Tabs } from 'antd';
import AllComponents from '../../views';

import 'antd/dist/antd.css';
import '../../res/styles/index.scss';
import {Layout} from 'antd';
import Routes from '../../routes'

import {Route} from "react-router";
import NoFound from "../../views/noFound/NoFound";
const { Content, Footer } = Layout;
const TabPane = Tabs.TabPane;
const menuList = [];//链式菜单对象，用于动态生成tabs的时候使用

class MyLayout extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 1;
        this.state = {
            collapsed: false,
            title: '',
            auth: {
                data: {}
            },
            activeKey: 'newTab0',
            panes: []
        };
    }

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

    test =(pathname) =>{
        // let _this = this;
        // //menuConfig是菜单的配置文件
        // for(let i=0;i<menuConfig.length;i++){
        //     if(menuConfig[i].children){
        //         let child = menuConfig[i].children;
        //         for(let j=0;j<child.length;j++){
        //             if(child[j].key===pathname){
        //                 //调用header子组件方法，改变title
        //                 _this.refs.header.updateCurrentTitle(child[j].title);
        //                 return;
        //             }
        //         }
        //     }else{
        //         let item = menuConfig[i];
        //         if(item.key===pathname){
        //             //调用header子组件方法，改变title
        //             _this.refs.header.updateCurrentTitle(item.title);
        //             return;
        //         }
        //     }
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //test方法是父组件方法
        //global.constants.history是上一步定义的全局变量
        this.test(this.props.history.location.pathname);
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

    remove = (targetKey) => {
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        let length = panes.length;
        if(length > 0) {
            let activeKey = this.state.panes[length - 1].key;
            this.setState({ panes, activeKey });
            // 根据当前可选 pane 中选取前后pane
            // let paneIndex = this.state.panes.length > 1 ?
            this.props.history.push(this.state.panes[length - 1].url);
        }
    }

    handleClickMenuItem = (event) => {
        // console.log(event)

        let url = event.currentTarget.getAttribute('href');
        let exitPane = this.getExitPane('url', url);
        if(exitPane != null) {
            this.setState({activeKey: exitPane.key, isFullScreen: exitPane.isFullScreen});
            return;
        }
        //创建新的tab项
        let matchMenus = menuList.filter((item) => item.url === url);
        if(matchMenus.length > 0) {
            let activeKey = `newTab${this.newTabIndex++}`;
            this.setState((prevState) => {
                matchMenus[0].key = activeKey;
                prevState.panes.push(matchMenus[0]);
                return {
                    panes: prevState.panes,
                    activeKey,
                    isFullScreen: matchMenus[0].isFullScreen
                }
            })
        }
    }

    handleAddMenu(menu) {
        // console.log("handleAddMenu")
        menuList.push(menu)
    }

    render() {
        return (
            <Layout>
                <SiderCustom collapsed={this.state.collapsed}
                             addTabs={this.handleClickMenuItem.bind(this)}
                             addMenu={this.handleAddMenu.bind(this)}/>
                <ThemePicker/>
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={this.state.auth.data || {}}/>
                    <Content style={{overflow: 'initial', flex: '1 1 0'}}>
                        {/*<Routes auth={this.state.auth}/>*/}

                        <Tabs
                            onChange={this.onChange}
                            hideAdd
                            activeKey={this.state.activeKey}
                            type="editable-card"
                            onEdit={this.onEdit}
                        >
                            {this.state.panes.map(
                                pane => {
                                    let route = null;
                                    if(AllComponents.hasOwnProperty(pane.component)) {
                                        route = <Route path={pane.url} exact component={AllComponents[pane.component]} />;
                                    } else {
                                        route = <Route component={NoFound}/>;
                                    }
                                    return <TabPane tab={pane.title} key={pane.key}>
                                        {route}
                                    </TabPane>
                                }
                            )}
                        </Tabs>


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
