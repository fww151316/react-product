import React, { Component } from 'react';
import { Card, Button, Table, Modal } from 'antd';
import { reqCate } from '../../../api/index'
import Addfrom from './addfrom'
import Updet from './updet';

class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      parentId: '0',
      parentName: '',
      visible: 0
    }
  }
  getCate = async () => {
    var parentId = this.state.parentId || '0'
    const res = await reqCate(parentId)
    if (res.status == '0') {
      const dataSource = res.data
      if (parentId == '0') {
        this.setState({ dataSource })
      } else {
        this.setState({ dataSource })
      }
    }
  }

  componentDidMount() {
    this.getCate();
  }
  showCate = (Cate) => {
    this.setState({
      parentId: Cate._id,
      parentName: Cate.name
    }, () => {
      this.getCate();
    })
  }

  showAcate = () => {
    this.setState({
      parentId: "0",
    }, () => {
      this.getCate();
    })
  }

  //添加
  showModal = () => {
    this.setState({
      visible: 1,
    });
  };
  //添加
  addfen = () => {
    this.setState({
      visible: 0,
    });
  };
  //修改
  showModal2 = () => {
    this.setState({
      visible: 2,
    });
  };

  //修改
  updatfen = () => {
    this.setState({
      visible: 0,
    });
  };




  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: 0,
    });
  };


  render() {
    const { dataSource, parentId, parentName } = this.state
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        render: (Cate) => <div>
          <span onClick={this.showModal2}>修改分类</span>&nbsp;&nbsp;&nbsp;&nbsp;
            {
            this.state.parentId == '0' ? (
              <span onClick={() => this.showCate(Cate)}>查看子分类</span>) : null
          }
        </div>,
      },
    ];

    const title = parentId === "0" ? ('一级列表') : (
      <div>
        <span onClick={() => this.showAcate()}>一级分类列表</span>---
        <span>{parentName}</span>
      </div>
    );

    return (
      <Card title={title} extra={<Button type="primary" onClick={this.showModal}>添加</Button>}>
        <Table
          rowKey='_id'
          dataSource={dataSource}
          columns={columns}
          pagination={{ defaultPageSize: 2, showQuickJumper: true }}
        />;

        <Modal
          title="添加分类"
          visible={this.state.visible == 1}
          onOk={this.addfen}
          onCancel={this.handleCancel}
        >
          <Addfrom
            setForm={(form)=>{this.form = form}}
            dataSource={dataSource}
            parentId={parentId}
          />
        </Modal>

        <Modal
          title="修改分类"
          visible={this.state.visible == 2}
          onOk={this.updatfen}
          onCancel={this.handleCancel}
        >
          <Updet />
        </Modal>
      </Card>
    );
  }
}

export default Category;