/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, {Component} from 'react';
import {Icon, Layout, Menu} from 'antd';
import {NavLink, withRouter} from 'react-router-dom';
const {Sider} = Layout;

class SiderCustom extends Component {
    static getDerivedStateFromProps(props, state) {
        if (props.collapsed !== state.collapsed) {
            const state1 = SiderCustom.setMenuOpen(props);
            const state2 = SiderCustom.onCollapse(props.collapsed);
            return {
                ...state1,
                ...state2,
                firstHide: state.collapsed !== props.collapsed && props.collapsed, // 两个不等时赋值props属性值否则为false
                openKey: state.openKey || (!props.collapsed && state1.openKey)
            }
        }
        return null;
    }

    static setMenuOpen = props => {
        const {pathname} = props.location;
        return {
            openKey: pathname.substr(0, pathname.lastIndexOf('/')),
            selectedKey: pathname
        };
    };
    static onCollapse = (collapsed) => {
        return {
            collapsed,
            // firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        };
    };
    state = {
        mode: 'inline',
        openKey: '',
        selectedKey: '',
        firstHide: true, // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
    };

    componentDidMount() {
        // this.setMenuOpen(this.props);
        const state = SiderCustom.setMenuOpen(this.props);
        this.setState(state);
    }

    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
        const {popoverHide} = this.props; // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    };
    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };

    createMenu(data) {
        const childMenuData = data.subs;
        let childMenu = <div></div>;
        if (childMenuData && childMenuData.length) {
            childMenu = childMenuData.map((item) => {
                return this.createMenu(item);
            });
            return <Menu.SubMenu key={data.title} title={
                <span>
                    {data.icon && <Icon type={data.icon}/>}
                    <span className="nav-text">{data.title}</span>
                </span>
            }>{childMenu}</Menu.SubMenu>
        } else {
            return <Menu.Item key={data.title}>
                <NavLink to={data.url} onClick={this.props.addTabs}>
                    {data.icon && <Icon type={data.icon}/>}
                    <span className="nav-text">{data.title}</span>
                </NavLink>
            </Menu.Item>
        }
    }

    render() {
        const {selectedKey, openKey, firstHide, collapsed} = this.state;
        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={collapsed}
                style={{overflowY: 'auto'}}
            >
                <div className="logo"/>

                <Menu menus={this.props.menus}
                      onClick={this.menuClick}
                      mode="inline"
                      selectedKeys={[selectedKey]}
                      theme="dark"
                      openKeys={firstHide ? null : [openKey]}
                      onOpenChange={this.openMenu}>
                    {
                        this.props.menus && this.props.menus.map(item =>
                            this.createMenu(item)
                        )
                    }
                </Menu>
                <style>
                    {`
                    #nprogress .spinner{
                        left: ${collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
                </style>
            </Sider>
        )
    }
}

export default withRouter(SiderCustom);
