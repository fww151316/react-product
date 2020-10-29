import React from 'react';
import './login.css'
import { Form, Input, Button, message} from 'antd';
import {reqLogin} from '../../api/index'
import { useHistory } from 'react-router-dom';
import StorageUtils from '../../utils/storageUtils'
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

function Login() {
    const history = useHistory()
    const onFinish = (values) => {
        reqLogin(values.username,values.password).then((res)=>{
            console.log(res)
            if(res.status =="0"){
                StorageUtils.saveUser(res.data)
                message.success('登录成功');
                history.push('/')
            }else{
                message.error(res.msg);
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="Login">
            <div className="Login-header">
                管理后台
            </div>
            <div className="Login-conten">
                登录
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default Login