import React from 'react';
import PageTitle from "component/page-title/index.jsx";
import {Link} from "react-router-dom";
import Pagination from "utils/pagination/index.jsx";
import User from "../../service/userservice.jsx";
import MUtil from 'utils/mm.jsx'

const _user = new User();
const _mm = new MUtil();

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      total: 0,
      list: [],
    }
  }

  componentDidMount() {
    this.loadUserList();
  }

  loadUserList() {
    _user.getUserList(this.state.pageNum).then
    (res => {
      this.setState({
        pageNum: res.pageNum,
        total: res.total,
        list: res.list
      })
    }, errMsg => {
      _mm.errorTips(errMsg)
    });
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title={"用户列表"}/>
        <div className='row'>
          <div className='col-md-12'>
            <table className="table table-striped table-bordered">
              <thead>
              <tr>
                <th>{"用户名"}</th>
                <th>{"邮箱"}</th>
                <th>{"电话"}</th>
                <th>{"是否是管理员"}</th>
                <th>{"创建时间"}</th>
              </tr>
              </thead>
              <tbody>
              {this.state.list.map((item, index) => {
                return (
                  <tr key={index}>
                    <th>{item.username}</th>
                    <th>{item.email}</th>
                    <th>{item.phone}</th>
                    <th>{item.role === 1 ? "是" : "否"}</th>
                    <th>{item.createTime}</th>
                  </tr>
                )
              })}

              </tbody>
            </table>
          </div>
        </div>
        <Pagination current={this.state.pageNum} total={this.state.total}/>
      </div>
    );
  }

}
