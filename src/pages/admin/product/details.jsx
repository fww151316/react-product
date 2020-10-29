import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './details.css'
import { reqInfo } from '../../../api';
class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fu: '1',
            zi: '',
            img:"http://localhost:5000/upload/"
        }
    }

    qu = () => {
        const list = this.props.location.state.product
            reqInfo(list.pCategoryId).then(res => {
                this.setState({ fu: [...res.data.name] })
            })
            reqInfo(list.categoryId).then(res => {
                this.setState({ zi: res.data.name })
            })
        }
   
   
    componentDidMount() {
        this.qu();
    }

    render() {
        // console.log(this.props.location.state.product)
        const list = this.props.location.state.product
        const s = this.state.img +list.imgs
        return (
            <div>
                <Row>
                    <Col span={18} push={6}>
                        {list.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Col>
                    <Col span={6} pull={18}>
                        商品名称:
                    </Col>
                </Row>
                <Row>
                    <Col span={18} push={6}>
                        {list.desc} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Col>
                    <Col span={6} pull={18}>
                        商品描述:
                    </Col>
                </Row>
                <Row>
                    <Col span={18} push={6}>
                        {list.price} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Col>
                    <Col span={6} pull={18}>
                        商品价格:
                    </Col>
                </Row>
                <Row>
                    <Col span={18} push={6}>
                        {this.state.fu}/{this.state.zi} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Col>
                    <Col span={6} pull={18}>
                        商品分类:
                    </Col>
                </Row>
                <Row>
                    <Col span={18} push={6}>
                        
                        <img src={s} alt=""/>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Col>
                    <Col span={6} pull={18}>
                        商品图片:
                    </Col>
                </Row>
                <Row>
                    <Col span={18} push={6}>
                        {list.detail} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Col>
                    <Col span={6} pull={18}>
                        商品详细信息:
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Details;