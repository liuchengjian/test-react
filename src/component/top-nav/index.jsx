import React from 'react';
import {Link} from "react-router-dom";
import MUtil from 'utils/mm.jsx'

const _mm = new MUtil();
export default class TopNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: _mm.getStorage("userInfo").username || "",
        }
    }

    loginOut() {

    }

    render() {
        return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/">
                        <b>欢迎</b>MMALL
                    </Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i>
                            <span>欢迎,{this.state.username}</span>
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-messages">
                            {/*<li className="divider"></li>*/}
                            <li>
                                <a onClick={() => this.loginOut()}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
        );
    }
}
