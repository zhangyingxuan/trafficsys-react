/**
 * Created by yingxuan.zhang 2019-5-13 10:44:42
 */
import React from 'react';
import {Tree, Icon, Input} from 'antd';

const Search = Input.Search;

const {TreeNode} = Tree;

class MenuTree extends React.Component {
    constructor(props) {
        super(props);
        this.renderPermissionTreeNode.bind(this)
        this.state = {
            autoExpandParent: false,
            searchValue: ""
        };
    }

    /**
     *  监听
     * @param nextProps
     * @param nextContext
     */
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.permissionList && (nextProps.permissionList.length !== this.props.permissionList.length)) {
            this.setState({
                autoExpandParent: true
            })
        }
    }

    /**
     *  添加删除节点
     */
    handleDeleteNode (permissionItem, e) {
        e.preventDefault()
        e.stopPropagation()
    }

    /**
     *  处理添加 node
     */
    handleAddNode (permissionItem, e) {
        e.preventDefault()
        e.stopPropagation()
        // 1.本地树结构，添加子菜单
    }

    /**
     *  初始化 treeNode
     * @param permissionList
     * @returns {*}
     */
    renderPermissionTreeNode(permissionList) {
        return permissionList && permissionList.map((permissionItem) => {
            let style = {display: this.props.showEditBtn ? '' : 'none'}
            let ChildList
            if (permissionItem.subs && permissionItem.subs.length > 0) {
                ChildList = permissionItem.subs.map((permissionSubItem) => {
                    let deleteNode = <a href="#" style={style} onClick={this.handleDeleteNode.bind(this, permissionSubItem)} className="menu-item-delete">删除</a>
                    let titleSubNode = <span className="menu-item-row"><span className="menu-item-title">{permissionSubItem.title}</span>{deleteNode}</span>
                    // icon={<Icon type={permissionItem.icon}/>}
                    return <TreeNode title={titleSubNode}
                                     key={permissionSubItem.title}/>
                })
            }


            let deleteNode = <a href="#" style={style} onClick={this.handleDeleteNode.bind(this, permissionItem)} className="menu-item-delete">删除</a>
            let addSubNode = <a href="#" style={style} onClick={this.handleAddNode.bind(this, permissionItem)} className="menu-item-add">添加子菜单</a>
            let titleNode = <span className="menu-item-row"><span className="menu-item-title">{permissionItem.title}</span>{addSubNode}{deleteNode}</span>
            return (
                <TreeNode icon={<Icon type={permissionItem.icon}/>}
                          title={titleNode}
                          key={permissionItem.title}>
                    {ChildList}
                </TreeNode>
            )
        })
    }


    deepSearchSelectedTreeItem(permissionList, treeItemTitle) {
        if(permissionList === null || permissionList === undefined){
            return null
        }

        for(let i = 0; i < permissionList.length; i++) {
            let currentPermission = permissionList[i]
            if(currentPermission.title === treeItemTitle) {
                return currentPermission
            }
            let subPermission = this.deepSearchSelectedTreeItem(currentPermission.subs, treeItemTitle)
            if(subPermission) {
                return subPermission
            }
        }

        return null
    }

    handleSelectTreeItem(selectedKeys, e) {
        let permissionList = this.props.permissionList
        let selectedTree = this.deepSearchSelectedTreeItem(permissionList, selectedKeys[0])
        // console.log(selectedKeys)
        // e:{selected: bool, selectedNodes, node, event}
        this.props.onSelectTreeItem(selectedTree)
    }

    handleCheckTreeItem = (checkedKeys, info) => {
        this.props.onCheckTreeItem(checkedKeys)
    };

    render() {
        return (
            <React.Fragment>
                <Tree
                    showIcon
                    checkable={this.props.checkable}
                    // checkStrictly
                    autoExpandParent={this.state.autoExpandParent}
                    defaultExpandAll
                    blockNode
                    draggable
                    checkedKeys={this.props.checkedKeys}
                    onSelect={this.handleSelectTreeItem.bind(this)}
                    onCheck={this.handleCheckTreeItem.bind(this)}
                    switcherIcon={<Icon type="down"/>}>

                    {this.renderPermissionTreeNode(this.props.permissionList)}

                </Tree>
            </React.Fragment>
        )
    }
}

export default MenuTree;
