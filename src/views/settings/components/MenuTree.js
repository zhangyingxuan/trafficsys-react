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
            searchValue: "",
            expandedKeys: []
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
     *  初始化 treeNode
     * @param permissionList
     * @returns {*}
     */
    renderPermissionTreeNode(permissionList) {
        return permissionList && permissionList.map((permissionItem) => {

            let ChildList
            if (permissionItem.subs && permissionItem.subs.length > 0) {
                ChildList = permissionItem.subs.map((permissionItem) => {
                    // icon={<Icon type={permissionItem.icon}/>}
                    return <TreeNode title={permissionItem.title}
                                     key={permissionItem.title}/>
                })
            }
            return (
                <TreeNode icon={<Icon type={permissionItem.icon}/>}
                          title={permissionItem.title}
                          key={permissionItem.title}>
                    {ChildList}
                </TreeNode>
            )
        })
    }

    handleSelectTreeItem(selectedKeys, e) {
        console.log(e)
        // console.log(selectedKeys)
        // e:{selected: bool, selectedNodes, node, event}
        this.props.onSelectTreeItem(selectedKeys[0])
    }

    onChange = e => {
        const value = e.target.value;
        // const expandedKeys = dataList
        //     .map(item => {
        //         if (item.title.indexOf(value) > -1) {
        //             return getParentKey(item.key, gData);
        //         }
        //         return null;
        //     })
        //     .filter((item, i, self) => item && self.indexOf(item) === i);
        // this.setState({
        //     expandedKeys,
        //     searchValue: value,
        //     autoExpandParent: true,
        // });
    };

    render() {
        return (
            <React.Fragment>
                <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
                <Tree
                    showIcon
                    autoExpandParent={this.state.autoExpandParent}
                    defaultExpandAll
                    blockNode
                    draggable
                    onSelect={this.handleSelectTreeItem.bind(this)}
                    switcherIcon={<Icon type="down"/>}>

                    {this.renderPermissionTreeNode(this.props.permissionList)}

                </Tree>
            </React.Fragment>
        )
    }
}

export default MenuTree;
