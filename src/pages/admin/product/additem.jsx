import React, { Component } from 'react';
import { Form, Input, InputNumber, Button, Select, Cascader, message, Upload } from 'antd';
import { reqCate, reqAddpro } from '../../../api';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';

const Option = Select.Option;
const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const Additem = () => {
    const history = useHistory()
    const [options, setOptions] = useState([])
    const [fileList, setFileList] = useState([])

    // const fileList = [];
    const fuan = ({ file, fileList }) => {
        // console.log(file)
        // console.log(fileList[0].response.data)
        setFileList([...fileList])
        if (file.status == 'done') {
            // console.log(fileList[0].response.data)
            if (file.response.status == 0) {
                message.success('添加成功');
            }
        }
    }

    const onFinish = (values) => {
        // console.log(values)
      
        reqAddpro(values.user.fenlen[1], values.user.fenlen[0], values.user.name, values.user.introduction, values.user.xx, values.user.age, fileList[0].response.data.name).then(res => {
            if (res.status == '0') {
                message.success('添加成功');
                history.push('/product/product')
            } else {
                message.error(res.msg);
            }
        })
    };

    useEffect(() => {
        reqCate("0").then(res => {
            const fen = res.data
            console.log(fen)
            if (res.status == 0) {
                const list = []
                fen.map(item => {
                    list.push({ 'value': item._id, 'label': item.name })
                })
                setOptions(list)
            }
        })

    }, [])
    useEffect(() => {
        const list2 = []
        options.map(item => {
            reqCate(item.value).then(res => {
                const children = []
                res.data.map(im => {
                    children.push({ 'value': im._id, 'label': im.name })
                })
                item.children = children
                list2.push(item)
            })
            setOptions(list2)
        })
    }, [options])




    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <h3 style={{ fontSize: "18px", fontWeight: '900' }}>添加商品</h3>
            <Form.Item
                name={['user', 'name']}
                label="商品名称"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label="商品描述">
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                name={['user', 'age']}
                label="商品价格"
                rules={[
                    {
                        type: 'number',
                        min: 0,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item name={['user', 'fenlen']} label="商品分类">

                <Cascader style={{ width: '70%' }} options={options} placeholder="Select Address" />
            </Form.Item>

            <span style={{ marginLeft: '50px' }}>商品图片:</span>
            <Upload
                action="http://localhost:5000/manage/img/upload"
                accept='image/*'  /*只接收图片格式*/
                name='image' /*请求参数名*/
                listType="picture-card"
                defaultFileList={[...fileList]}
                onChange={fuan}
                fileList={fileList}  /*所有已上传图片文件对象的数组*/
            >
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>


            <Form.Item name={['user', 'xx']} label="详细信息">
                <Input.TextArea />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    添加
          </Button>
            </Form.Item>


        </Form>
    );
};

export default Additem;