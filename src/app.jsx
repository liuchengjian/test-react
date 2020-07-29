import React from 'react';
import ReactDOM from 'react-dom';
import Home from "page/home/index.jsx";
import Layout from "component/layout/index.jsx";
import {BrowserRouter as Router, Switch, Redirect, Route, Link} from 'react-router-dom'
import Login from "page/login/index.jsx";
import ErrorPage from "page/error/index.jsx";
import UserList from "page/user/index.jsx";
import ProductRouter from "page/product/router.jsx";
import OrderList from "page/order/index.jsx";

class App extends React.Component {
  render() {
    let LayoutRouter = (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/product" component={ProductRouter}/>
          <Route path="/product-category" component={ProductRouter}/>
          <Route path="/order/index" component={OrderList}/>
          <Route path="/user/index" component={UserList}/>
          <Redirect exact from="/user" to="/user/index"/>
          <Redirect exact from="/order" to="/order/index"/>
          <Route component={ErrorPage}/>
        </Switch>
      </Layout>
    );
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route path="/" render={props => LayoutRouter}/>
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("app",)
);
