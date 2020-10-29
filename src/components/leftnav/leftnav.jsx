import React, { Component } from 'react';
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import menuList from '../../config/menuConfig'


const { SubMenu } = Menu;

class Leftnav extends Component {
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    
                    <Menu.Item key={item.key} icon={<PieChartOutlined />}>
                        <Link to={item.key}>{item.title} </Link>
                    </Menu.Item>
                )
            } else {
                const path = this.props.location.pathname;
                const cItem = item.children.find((cItem) => cItem.key === path);
                if (cItem) {
                    //如果找到，返回父亲的key，这个key值就是默认展开选项
                    this.openKey = item.key;
                }
                return (

                    <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    render() {
        const muct = this.getMenuNodes(menuList);
        const path = this.props.location.pathname;
        const openkey = this.openKey;
        console.log(path)
        console.log(openkey)
        return (
            <div>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openkey]}
                    mode="inline"
                    theme="dark"
                >
                    {muct}
                </Menu>
            </div>
        );
    }
}
export default withRouter (Leftnav)