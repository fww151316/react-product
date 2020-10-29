import React from 'react';
import StorageUtils from '../../utils/storageUtils'
import { Redirect, Route ,Switch} from 'react-router-dom';
import { Layout } from 'antd';
import Header from '../../components/header/header'
import Leftnav from '../../components/leftnav/leftnav';
import Home from './home/home'
import Category from "./product/category";
import Product from "./product/product";
import User from "./user/user";
import Role from "./role/role";
import Pie from "./charts/pie";
import Line from "./charts/line";
import Bar from "./charts/bar";
import Additem from './product/additem';
import Updata from './product/updata';
import Details from './product/details';

const { Footer, Sider, Content } = Layout;

function Admin (){
    if(!StorageUtils.getUser()){
        return <Redirect to='/login' />
    }
    return(
        <Layout style={{ height: "100%" }}>
        <Sider>
            <Leftnav />
        </Sider>
        <Layout>
          <Header>
              <Header />
          </Header>
          <Content style={{ backgroundColor: "#fff" }}>
              <Switch>
              <Route path="/home" component={Home} />
              <Route path="/product/category" component={Category} />
              <Route path="/product/product" component={Product} />
              <Route path='/additem' component={Additem} />
              <Route path='/updata' component={Updata} />
              <Route path='/details' component={Details} />
              <Route path="/user" component={User} />
              <Route path="/role" component={Role} />
              <Route path="/charts/pie" component={Pie} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/bar" component={Bar} />
              
              <Redirect to="/home" />
              </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    )
}
export default Admin