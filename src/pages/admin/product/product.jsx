import React, { Component } from 'react';
import { Card, Button, Table } from 'antd';
import { reqProuduct } from '../../../api/index'
import { useHistory, Link } from 'react-router-dom';
class Product extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dataSource:[]
        }
    }


    getProlist = async () => {
        const res = await reqProuduct(1,20)
        console.log(res)
        if(res.status == 0){
            this.setState({dataSource:res.data.list})
        }
    }

    componentDidMount() {
        this.getProlist();
    }
    render(product) {
        const {dataSource} = this.state
      

        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '描述',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '状态',
                dataIndex: '',
                key: 'x',
                render: () => <a>上架</a>,
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: (product) => <div>    
                    <Button type="primary" onClick={() => this.props.history.push('/details', {product})}>详情</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button type="primary" onClick={() => this.props.history.push('/updata', {product})}>修改</Button>
                </div>,
            },
        ];

        return (
            <div>
                <Card title="商品管理" extra={<Button type="primary"><Link to='/additem'>添加</Link></Button>} >
                    <Table 
                     rowKey='_id'
                    dataSource={dataSource} 
                    columns={columns} 
                    pagination={{ defaultPageSize: 2}}
                     />;
                </Card>

            </div>
        );
    }
}

export default Product;