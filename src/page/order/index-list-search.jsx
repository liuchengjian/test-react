import React from 'react';
import Order from "service/order-service.jsx";
import MUtil from 'utils/mm.jsx'

const _order = new Order();
const _mm = new MUtil();

export default class OrderListSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNumber: '',

    };
  }

  onValueChange(event) {
    let name = event.target.name,
      value = event.target.value.trim();
    this.setState({
      [name]: value,
    })
  }
  onSearchKeywordUp(e) {
    if(e.keyCode===13){
      this.onSearch();
    }
  }
  onSearch() {
    this.props.onSearch(this.state.orderNumber);
  }

  render() {
    return (
      <div className="row search-wrap">
        <div className="col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select className="form-control"
                      onChange={(event) => this.onValueChange(event)}>
                <option>按订单号查询</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" className="form-control"
                     placeholder="请输入订单号"
                     name='orderNumber'
                     onChange={(event) => this.onValueChange(event)}
                     onKeyUp={(e)=>this.onSearchKeywordUp(e)}
              />
            </div>
            <button
              className="btn btn-primary" onClick={() => this.onSearch()}>搜索
            </button>
          </div>
        </div>
      </div>
    );
  }

}
