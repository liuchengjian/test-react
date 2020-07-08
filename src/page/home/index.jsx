import React from 'react';
import './index.css';
import PageTitle from "component/page-title/index.jsx";
import {Link} from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: '21231',
      productCount: '123241',
      orderCount: '123',
    }
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title={"首页"}/>
        <div className="row">
          <div className="col-md-4">
            <Link className='color-box brown' to={"./user"}>
              <p className={'count'}>{this.state.userCount}</p>
              <p className={'desc'}>
                <i className='fa fa-user-o'></i>
                <span>{"用户总数"}</span>
              </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={"./product"} className='color-box blue'>
              <p className={'count'}>{this.state.productCount}</p>
              <p className={'desc'}>
                <i className='fa fa-list'></i>
                <span>{"商品总数"}</span>
              </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={"./order"} className='color-box green'>
              <p className={'count'}>{this.state.orderCount}</p>
              <p className={'desc'}>
                <i className='fa fa-check-square-o'></i>
                <span>{"订单总数"}</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

}
