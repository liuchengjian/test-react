import React from 'react';
import PageTitle from "component/page-title/index.jsx";
import {Link} from "react-router-dom";
import Product from "service/product-service.jsx";
import MUtil from 'utils/mm.jsx'
import CategorySelector from "page/product/index/category-selector.jsx";
import FileUpLoader from "utils/fileupload/index.jsx";

const _product = new Product();
const _mm = new MUtil();
export default class ProductSave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: 0,
      secondCategoryId: 0,
    }
  }

  onCategoryChange(categoryId, parentCategoryId) {
    console.log(categoryId + "-----" + parentCategoryId)
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title={"添加商品"}/>
        <div className="form-horizontal">
          <div className="form-group">
            <label htmlFor="inputEmail3" className="col-sm-2 control-label">商品名称</label>
            <div className="col-sm-5">
              <input type="text" className="form-control" id="inputEmail3" placeholder="输入商品名称"/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-2 control-label">商品描述</label>
            <div className="col-sm-5">
              <input type="text" className="form-control" id="inputPassword3" placeholder="输入商品描述"/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-2 control-label">商品描述</label>
            <CategorySelector
              onCategoryChange={
                (categoryId, parentCategoryId) =>
                  this.onCategoryChange(categoryId, parentCategoryId)
              }/>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-2 control-label">商品价格</label>
            <div className="col-sm-3">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="请输入商品价格"/>
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-2 control-label">库存</label>
            <div className="col-sm-3">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="请输入库存"/>
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-2 control-label">商品图片</label>
            <div className="col-sm-10">
              <FileUpLoader/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-2 control-label">详情</label>
            <div className="col-sm-10">
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">提交</button>
            </div>
          </div>
        </div>

      </div>
    );
  }

}
