import React from 'react';
import PageTitle from "component/page-title/index.jsx";
import {Link} from "react-router-dom";
import Pagination from "utils/pagination/index.jsx";
import User from "service/user-service.jsx";
import MUtil from 'utils/mm.jsx'
import TableList from "utils/table-list/index.jsx";

const _user = new User();
const _mm = new MUtil();

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
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
        list: res.list,
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
    const {list, pageNum, total} = this.state;
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

    return (
      <div id="page-wrapper">
        <PageTitle title={"用户列表"}/>
        <TableList
          tableHeaderData={['ID', '用户名', '邮箱', '电话', '注册时间']}
          children={listBody}
        />
        <Pagination current={pageNum}
                    total={total}
                    onChange={(current, index) => this.onPageChange(current)}/>
      </div>
    );
  }

}
