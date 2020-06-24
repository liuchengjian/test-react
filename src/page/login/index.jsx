import React from 'react';
import './index.css'
import User from "../../service/userservice.jsx";

const _user = new User();
import MUtil from 'utils/mm.jsx'

const _mm = new MUtil();
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            redirect: _mm.getUrlParam('redirect') || '/',
        }
    }

    componentWillMount() {
        document.title = "登录 - MMALL";
    }

    onKeyUp(e) {
        if (e.keyCode === 13) {
            //点回车键的时候提交
            this.onSubmit();
        }
    }

    onChange(e) {
        // console.log(e.target.name);
        let inputName = e.target.name;
        let inputValue = e.target.value;
        this.setState({
            [inputName]: inputValue,
        });
    }

    onSubmit() {
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        };
        let checkResult = _user.checkLoginInfo(loginInfo);
        if (!checkResult.success) {
            _mm.errorTips(checkResult.msg);
            return;
        }
        _user.login(loginInfo).then((res) => {
            // console.log(this.state.redirect);
            _mm.setStorage("userInfo", res);
            this.props.history.push(this.state.redirect);
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        });
    }

    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录--MMALL管理系统</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input type="text"
                                       className="form-control"
                                       name="username"
                                       placeholder="请输入用户名"
                                       onChange={e => this.onChange(e)}
                                       onKeyUp={e => this.onKeyUp(e)}
                                />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                       className="form-control"
                                       name="password"
                                       placeholder="请输入密码"
                                       onChange={e => this.onChange(e)}
                                       onKeyUp={e => this.onKeyUp(e)}
                                />
                            </div>
                            <button className="btn btn-lg btn-primary btn-block"
                                    onClick={e => this.onSubmit()}
                            >Submit
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}
