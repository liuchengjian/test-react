import React from 'react';
import PageTitle from "component/page-title/index.jsx";
import {Link} from "react-router-dom";
import Product from "service/product-service.jsx";
import MUtil from 'utils/mm.jsx'
import Pagination from "utils/pagination/index.jsx";
import TableList from "utils/table-list/index.jsx";
import './index.css'

const _product = new Product();
const _mm = new MUtil();

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      list: [],
      firstLoading: true,
    }
  }

  componentDidMount() {
    this.loadProductList();
  }

  loadProductList() {
    _product.getProductList(this.state.pageNum).then
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
      this.loadProductList()
    })
  }

  onClick(e, productId, status) {
    let newStatus = status === 1 ? 2 : 1,
      tip = status === 1 ? "确定要下架该商品" : "确定要下架该商品";
    if (window.confirm(tip)) {
      _product.setProductStatus(productId, newStatus).then
      (res => {
        _mm.successTips(res);
        this.loadProductList();
      }, errMsg => {
        _mm.errorTips(errMsg);
      });
    }
  }

  render() {

    const {list, pageNum, total} = this.state;
    let tableHeaderData = [
      {name: '商品ID', width: '10%'},
      {name: '商品信息', width: '50%'},
      {name: '价格', width: '10%'},
      {name: '状态', width: '15%'},
      {name: '操作', width: '15%'},
    ];
    let listBody = list.map((product, index) => {
      return (
        <tr key={index}>
          <td className='text-center'>{product.id}</td>
          <td className='text-center'>
            <p>{product.name}</p>
            <p>{product.subtitle}</p>
          </td>
          <td className='text-center'>￥{product.price}</td>
          <td className='text-center'>
            <p> {product.status === 1 ? '在售' : '已下架'}</p>
            <button className='btn btn-xs btn-warning'
                    onClick={(e) => this.onClick(e, product.id, product.status)}>{product.status === 1 ? '下架' : '上架'}</button>
          </td>
          <td className='text-center'>
            <Link className='opear' to={'/product/detail/' + product.id}>详情 </Link>
            <Link className='opear' to={'/product/save/' + product.id}>编辑 </Link>
          </td>
        </tr>
      )
    });
    return (
      <div id="page-wrapper">
        <PageTitle title={"商品列表"}/>
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
