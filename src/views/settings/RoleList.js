/**
 * Created by yingxuan.zhang 2019-5-13 10:44:42
 */
import React from 'react';
import {Input, Card, Row, Col, Button, Table, Divider, Tag, Popconfirm} from 'antd';
import "./RoleList.scss"

const Search = Input.Search;

class NotFound extends React.Component {
    constructor(props) {
        super(props)
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'roleName',
                key: 'roleName',
            },
            {
                title: '备注',
                dataIndex: 'comment',
                key: 'comment',
            },
            {
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                render: tags => (
                    <span>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                  </span>
                ),
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="确定删除吗？" onConfirm={() => this.handleDelete(record.key)}>
                            <a href="javascript:;">Delete</a>
                        </Popconfirm>
                    ) : null,
            },
        ];

        this.state = {
            dataSource: [],
            loading: false
        };
    }

    componentWillMount() {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({
                loading: false,
                dataSource: [
                    {
                        key: '1',
                        roleName: 'John Brown',
                        tags: ['nice', 'developer'],
                        comment: 'comment11'
                    },
                    {
                        key: '2',
                        roleName: 'Jim Green',
                        tags: ['loser'],
                        comment: 'comment22'
                    },
                    {
                        key: '3',
                        roleName: 'Joe Black',
                        tags: ['cool', 'teacher'],
                        comment: 'comment33'
                    },
                ]
            })
        }, 300)
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];

        // TODO 调用网络删除，该数据
        this.setState({dataSource: dataSource.filter(item => item.key !== key)});
    };

    handleAdd() {
    }

    render() {
        return (
            <Card bordered={false} className="role_card">
                <Row>
                    <Col span={24}>
                        <Search placeholder="角色名称" onSearch={value => console.log(value)} enterButton/>
                        <Button className="role_add"
                                color="red"
                                type="primary" onClick={this.handleAdd.bind(this)}>
                            新增角色
                        </Button>
                    </Col>
                </Row>
                <Table columns={this.columns}
                       loading={this.state.loading}
                       dataSource={this.state.dataSource}/>
            </Card>
        )
    }
}

export default NotFound;
