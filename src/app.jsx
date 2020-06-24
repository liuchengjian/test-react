import React from 'react';
import ReactDOM from 'react-dom';
import Home from "page/home/index.jsx";
import Layout from "component/layout/index.jsx";
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
import Login from "page/login/index.jsx";

class App extends React.Component {
    render() {
        let LayoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/product" component={Home}/>
                    <Route path="/product-category" component={Home}/>
                    <Route path="/order/index" component={Home}/>
                </Switch>
            </Layout>
        );
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={ props => LayoutRouter}/>
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("app",)
);
