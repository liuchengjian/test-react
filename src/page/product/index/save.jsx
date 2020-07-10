import React from 'react';
import PageTitle from "component/page-title/index.jsx";
import {Link} from "react-router-dom";
import Product from "service/product-service.jsx";
import MUtil from 'utils/mm.jsx'
const _product = new Product();
const _mm = new MUtil();
export default class ProductSave extends React.Component {

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title={"添加商品"}/>
        <div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">商品名称</label>
            <input type="text" className="form-control" id="exampleInputEmail1" placeholder="输入商品名称"/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputFile">File input</label>
            <input type="file" id="exampleInputFile"/>
              <p className="help-block">Example block-level help text here.</p>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </div>
    );
  }

}
