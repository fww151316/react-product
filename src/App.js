import React, {Fragment}from 'react';
import 'antd/dist/antd.css';
import { Switch, Route,BrowserRouter } from 'react-router-dom';
import Login from './pages/lodin/login';
import Admin from './pages/admin/admin';
function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
           <Route path='/' component={Admin} />
          <Route exact path='/login' component={Login} />
         
        </Switch>
      </BrowserRouter>
      </Fragment>
  );
}

export default App;
