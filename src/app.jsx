import React from 'react';
import ReactDOM from 'react-dom';
import Home from "page/home/index.jsx";
import Layout from "component/layout/index.jsx";
import {Switch, Redirect, Route, BrowserRouter as Router} from "react-router-dom";
import Login from "page/login/index.jsx";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" component={Login}/>
                    {/*<Route path="/" render={props => (*/}
                    {/*    <Layout>*/}
                    {/*        <Switch>*/}
                    {/*            <Route exact path="/" component={Home}/>*/}
                    {/*            <Route path="/product" component={Home}/>*/}
                    {/*            <Route path="/product-category" component={Home}/>*/}
                    {/*            /!*<Redirect from="*" to="/"/>*!/*/}
                    {/*        </Switch>*/}
                    {/*    </Layout>)}*/}
                    {/*/>*/}

                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("app",)
);
