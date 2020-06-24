import React from 'react';
import './index.css'
import User from "../../service/userservice.jsx";
const _user = new User();
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
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

    onSubmit(e) {
        _user.login({
            username: this.state.username,
            password: this.state.password
        }).then((res) => {
        }, (err) => {

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
                                />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                       className="form-control"
                                       name="password"
                                       placeholder="请输入密码"
                                       onChange={e => this.onChange(e)}
                                />
                            </div>
                            <button className="btn btn-lg btn-primary btn-block"
                                    onClick={e => this.onSubmit(e)}
                            >Submit
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}
