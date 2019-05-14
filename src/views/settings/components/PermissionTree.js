/**
 * Created by yingxuan.zhang 2019-5-13 10:44:42
 */
import React from 'react';
import {Tree, Icon} from 'antd';

const {TreeNode} = Tree;

class PermissionTree extends React.Component {
    constructor(props) {
        super(props);
        this.initPermissionTree.bind(this)
        this.handleSelectTreeItem.bind(this)
        this.state = {};
    }

    initPermissionTree(permissionList) {
        return permissionList && permissionList.map((permissionItem) => {

            let ChildList
            if (permissionItem.subs && permissionItem.subs.length > 0) {
                ChildList = permissionItem.subs.map((permissionItem) => {
                    return <TreeNode icon={<Icon type="meh-o"/>} title="leaf" key="0-0-0"/>

                    {/*<TreeNode icon={<Icon type={permissionItem.icon} />}*/
                    }
                    {/*title={permissionItem.title}*/
                    }
                    {/*key={permissionItem.title} />*/
                    }
                })
            }
            return (
                <TreeNode icon={<Icon type={permissionItem.icon}/>} title={permissionItem.title}
                          key={permissionItem.title}>
                    ChildList
                </TreeNode>
            )
        })
    }

    handleSelectTreeItem(selectedKeys, e) {
        console.log(e)
        console.log(selectedKeys)
        // e:{selected: bool, selectedNodes, node, event}
    }

    render() {
        return (
            <Tree
                showIcon
                defaultExpandAll
                autoExpandParent
                blockNode
                draggable
                showLine
                onSelect={this.handleSelectTreeItem}
                switcherIcon={<Icon type="down"/>}>

                {
                    this.initPermissionTree(this.props.permissionList)
                }
                {/*<TreeNode icon={<Icon type="smile-o" />} title="parent 1" key="0-0">*/}
                {/*<TreeNode icon={<Icon type="meh-o" />} title="leaf" key="0-0-0" />*/}
                {/*<TreeNode*/}
                {/*icon={({ selected }) => <Icon type={selected ? 'frown' : 'frown-o'} />}*/}
                {/*title="leaf"*/}
                {/*key="0-0-1"*/}
                {/*/>*/}
                {/*</TreeNode>*/}
            </Tree>
        )
    }
}

export default PermissionTree;
