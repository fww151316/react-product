import React, { Component } from "react";
import { Form, Select, Input } from "antd";
const Item = Form.Item;
const Option = Select.Option;
class Addfrom extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
   
    render() {
        return (
            <Form>
                <Item>
                    <Select>
                    <Option value="0">一级分类</Option>
                        {
                            this.props.dataSource.map(item=>{
                                return <Option key={item._id}>{item.name}</Option>
                            })
                        }
                    </Select>
                </Item>
                <Item>
                <Input type="text" placeholder="输入分类名称" />
                </Item>
            </Form>
        );
    }
}

export default Addfrom;
