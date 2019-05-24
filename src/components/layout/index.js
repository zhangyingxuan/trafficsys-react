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
import API from "../../api"

import {Route} from "react-router";
import NoFound from "../../views/noFound/NoFound";
const { Content, Footer } = Layout;
const TabPane = Tabs.TabPane;
const noAuthMenus = [{ id: 0, url: '/app/personalCenter', title: '个人设置', component: 'PersonalCenter' }]
// 默认展示的路由；链式菜单对象，用于动态生成tabs的时候使用
let canAccessMenus = [
    ...noAuthMenus
];

class MyLayout extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 1;
        this.state = {
            collapsed: false,
            user: {},
            activeKey: 'newTab0',
            // 左侧菜单
            menus: [],
            panes: [],
            pageRoutes: [],
            currentPath: ''
        };
    }

    componentWillMount() {
        // 线上调用，getUser 接口
        API.user.info().then(({data}) => {
            this.setState({
                user: data.user,
                menus: data.menus
            })

            // 组装canAccessMenus数据
            // canAccessMenus = []
            data.menus.forEach(menu => {
                if(menu.subs && menu.subs.length > 0) {
                    canAccessMenus.push(...menu.subs)
                } else {
                    canAccessMenus.push(menu)
                }
            })

            // 更新当前展示的pane
            this.updateCurrentPane(this.props.history.location.pathname)
        }).catch((err) => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.props.history.listen(route => {
            let routes = this.findRoutesByPath(route.pathname)

            // 更新当前展示的pane
            this.updateCurrentPane(route.pathname)
            this.setState({
                pageRoutes: { routes: routes }
            })
        })
    }

    /**
     *  通过路径寻找路由
     */
    findRoutesByPath(pathname) {
        let routes = []
        let menuList = [...this.state.menus, ...noAuthMenus]

        for(let i = 0; i < menuList.length; i++) {
            let menu = { ...menuList[i] }
            if(menu.url === pathname) {
                routes.push({
                    path: menu.url,
                    breadcrumbName: menu.title
                })
                break
            }

            if(menu.subs && menu.subs.length > 0) {
                for(let j = 0; j < menu.subs.length; j++) {
                    let subMenu = menu.subs[j]
                    if(subMenu.url === pathname) {
                        routes.push({
                            path: menu.url,
                            breadcrumbName: menu.title
                        })
                        routes.push({
                            path: subMenu.url,
                            breadcrumbName: subMenu.title
                        })
                        break
                    }
                }
            }
        }

        console.log(routes)
        return routes
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

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
        // let url = event.currentTarget.getAttribute('href');
        // this.updateCurrentPane(url)
    }

    updateCurrentPane(url) {
        let exitPane = this.getExitPane('url', url);
        if(exitPane != null) {
            this.setState({activeKey: exitPane.key, isFullScreen: exitPane.isFullScreen});
            return;
        }
        //创建新的tab项
        let matchMenus = canAccessMenus.filter((item) => item.url === url);
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

    render() {
        return (
            <Layout>
                <SiderCustom collapsed={this.state.collapsed}
                             menus={this.state.menus}
                             addTabs={this.handleClickMenuItem.bind(this)}/>
                <ThemePicker/>
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle}
                                  pageRoutes={this.state.pageRoutes}
                                  collapsed={this.state.collapsed}
                                  user={this.state.user || {}}/>
                    <Content style={{overflow: 'initial', flex: '1 1 0'}}>
                        {/*<Routes user={this.state.user}/>*/}

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
