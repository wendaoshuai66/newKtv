import React, {Component} from 'react'
import Header from "../../components/header/header"
import { Table, message, Popconfirm } from 'antd';

class GoodsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    deleteItem(id) {
        fetch('/ktv/delgoods?id=' + id).then(res => res.json()).then(d => {
            if (d === 'ok') {
                this.setState({ data: this.state.data.filter(v => v.id !== id)})
                message.success('delete success', 0.5)
            } else {
                message.error('server error', .5)
            }
        })
    }
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id'
            }, {
                title: '名称',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '价格',
                dataIndex: 'price',
                key: 'price'
            }, {
                title: '图片',
                dataIndex: 'img',
                key: 'img'
            }, {
                title: '热度',
                dataIndex: 'hot',
                key: 'hot'
            }, {
                title: '数量',
                dataIndex: 'count',
                key: 'count'
            }, {
                title: '单位',
                dataIndex: 'unit',
                key: 'unit'
            }, {
                title: '类别',
                key: 'tid',
                render: (v) => (
                    v.cid === 0 ? "酒水" : "零食"
                )
            }, {
                title: "操作",
                key: "options",
                render: (v) => (
                    <Popconfirm title="Are you sure delete this task?" onConfirm={ () => this.deleteItem(v.id) }>
                        <a>删除</a>
                    </Popconfirm>
                )
            }
        ]
        const {data} = this.state
        return (
            <Header select={"goods_delete"} sub={"goods"}>
                <Table rowKey="goods" dataSource={data} columns={columns}/>
            </Header>
        )
    }
    componentDidMount() {
        fetch('/ktv/good')
            .then(res => res.json())
            .then(d => this.setState({data: d}))
    }
}

export default GoodsList;
