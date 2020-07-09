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
      list: [],
      firstLoading: true,
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
        list: res.list,
      }, () => {
        this.setState({
          firstLoading: false,
        })
      })
    }, errMsg => {
      this.setState({
        list: [],
      });
      _mm.errorTips(errMsg)
    });
  }

  /**
   * 当页数发生变化时
   * @param current
   */
  onPageChange(current) {
    this.setState({
      pageNum: current,
    }, () => {
      this.loadUserList()
    })
  }

  render() {
    const {list, pageNum, total, firstLoading} = this.state;
    let listBody = list.map((item, index) => {
      return (
        <tr key={index}>
          <th className='text-center'>{item.id}</th>
          <th className='text-center'>{item.username}</th>
          <th className='text-center'>{item.email}</th>
          <th className='text-center'>{item.phone}</th>
          <th className='text-center'>{new Date(item.createTime).toLocaleString()}</th>
        </tr>
      )
    });
    let listError =
      <tr>
        <th colSpan={5} className='text-center'>{firstLoading ? "加载数据中~~" : "没有找到相应的数据~"}</th>
      </tr>;
    let tableBody = list.length > 0 ? listBody : listError;
    return (
      <div id="page-wrapper">
        <PageTitle title={"用户列表"}/>
        <div className='row'>
          <div className='col-md-12'>
            <table className="table table-striped table-bordered">
              <thead>
              <tr>
                <th className='text-center'>{"ID"}</th>
                <th className='text-center'>{"用户名"}</th>
                <th className='text-center'>{"邮箱"}</th>
                <th className='text-center'>{"电话"}</th>
                <th className='text-center'>{"注册时间"}</th>
              </tr>
              </thead>
              <tbody>
              {tableBody}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination current={pageNum}
                    total={total}
                    onChange={(current, index) => this.onPageChange(current)}/>
      </div>
    );
  }

}
