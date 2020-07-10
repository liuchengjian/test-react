import React from 'react';
import ReactDOM from 'react-dom';
import Home from "page/home/index.jsx";
import Layout from "component/layout/index.jsx";
import {BrowserRouter as Router, Switch, Redirect, Route, Link} from 'react-router-dom'
import Login from "page/login/index.jsx";
import ErrorPage from "page/error/index.jsx";
import UserList from "page/user/index.jsx";
import ProductRouter from "page/product/router.jsx";

class App extends React.Component {
  render() {
    let LayoutRouter = (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/product" component={ProductRouter}/>
          <Route path="/product-category" component={Home}/>
          <Route path="/order/index" component={Home}/>
          <Route path="/user/index" component={UserList}/>
          <Redirect exact from="/user" to="/user/index"/>
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
