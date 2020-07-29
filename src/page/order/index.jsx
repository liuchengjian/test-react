import React from 'react';
import PageTitle from "component/page-title/index.jsx";
import {Link} from "react-router-dom";
import Order from "service/order-service.jsx";
import MUtil from 'utils/mm.jsx'
import Pagination from "utils/pagination/index.jsx";
import TableList from "utils/table-list/index.jsx";
import OrderListSearch from "page/order/index-list-search.jsx";

const _order = new Order();
const _mm = new MUtil();

export default class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      list: [],
      listType: 'list',
    }
  }

  componentDidMount() {
    this.loadOrderList();
  }

  loadOrderList() {
    let listParams = {};
    listParams.listType = this.state.listType;
    listParams.pageNum = this.state.pageNum;
    if (listParams.listType === 'search') {
      listParams.oderNo = this.state.orderNumber;
    }
    _order.getOrderList(listParams).then
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

  onSearch(orderNo) {
    let listType = orderNo === '' ? 'list' : 'search';
    this.setState({
      listType: listType,
      pageNum: 1,
      orderNo: orderNo,
    }, () => {
      this.loadProductList()
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
      this.loadProductList()
    })
  }

  render() {
    const {list, pageNum, total} = this.state;
    let tableHeaderData = [
      '订单号',
      '收件人',
      '订单状态',
      '订单总价',
      '创建时间',
      '操作',
    ];
    let listBody = list.map((order, index) => {
      return (
        <tr key={index}>
          <td className='text-center'>
            <Link className='opear' to={'/order/detail/' + order.orderNumber}>{order.orderNo} </Link>
          </td>
          <td className='text-center'>{order.receiverName}</td>
          <td className='text-center'>{order.status}</td>
          <td className='text-center'>￥{order.price}</td>
          <td className='text-center'>{order.createTime}</td>
          <td className='text-center'>
            <Link className='opear' to={'/order/detail/' + order.orderNumber}>详情 </Link>
          </td>
        </tr>
      )
    });
    return (
      <div id="page-wrapper">
        <PageTitle title={"订单列表"}/>
        <OrderListSearch onSearch={(orderNo) => {
          this.onSearch(orderNo)
        }}/>
        <TableList
          tableHeaderData={tableHeaderData}
          children={listBody}
        />
        <Pagination current={pageNum}
                    total={total}
                    onChange={(current, index) => this.onPageChange(current)}/>
      </div>
    );
  }

}
