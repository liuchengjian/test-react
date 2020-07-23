import React from 'react';
import PageTitle from "component/page-title/index.jsx";
import Product from "service/product-service.jsx";
import MUtil from 'utils/mm.jsx'
import CategorySelector from "page/product/index/category-selector.jsx";
import './save.css'

const _product = new Product();
const _mm = new MUtil();
export default class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.pid,
      categoryId: 0,
      secondCategoryId: 0,
      subImages: [],
      name: '',
      subtitle: '',
      price: '',
      stock: '',
      detail: '',
      defaultDetail: '',
      status: 1,//商品状态1 代售
    }
  }

  componentDidMount() {
    this.loadProduct();
  }

  loadProduct() {
    //有id表示是编辑
    if (this.state.id) {
      _product.getProduct(this.state.id).then((res) => {
        // console.log(JSON.stringify(res))
        let image = res.subImages.split(',');
        res.subImages = image.map((imgUrl) => {
          return {
            uri: imgUrl,
            url: res.imageHost + imgUrl,
          }
        });
        this.setState({
          categoryId: res.categoryId,
          secondCategoryId: res.parentCategoryId,
          subImages: res.subImages,
          name: res.name,
          subtitle: res.subtitle,
          price: res.price,
          stock: res.stock,
          detail: res.detail,
          status: res.status,
        })
      }, (errMsg) => {
        _mm.errorTips(errMsg);
      })
    }
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title={"商品详情"}/>
        <div className="form-horizontal">
          <div className="form-group">
            <label htmlFor="inputEmail3" className="col-sm-2 control-label">商品名称</label>
            <div className="col-sm-5">
              <p className="form-control-static">
                {this.state.name}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-2 control-label">商品描述</label>
            <div className="col-sm-5">
              <p className="form-control-static">
                {this.state.subtitle}
              </p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-2 control-label">商品描述</label>
            <CategorySelector
              readOnly
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.secondCategoryId}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-2 control-label">商品价格</label>
            <div className="col-sm-3">
              <div className="input-group">
                <input type="text"
                       className="form-control"
                       placeholder="请输入商品价格"
                       value={this.state.price}
                       readOnly
                />
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-2 control-label">库存</label>
            <div className="col-sm-3">
              <div className="input-group">
                <input type="text"
                       className="form-control"
                       placeholder="请输入库存"
                       value={this.state.stock}
                       readOnly
                />
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-2 control-label">商品图片</label>
            <div className="col-sm-10">
              {this.state.subImages.length ? this.state.subImages.map((image, index) =>
                <div className='img-con' key={index}>
                  <img className='img' src={image.url}/>
                </div>
              ) : <div>{"暂无图片"} </div>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-2 control-label">详情</label>
            <div className="col-sm-10" dangerouslySetInnerHTML={{__html: this.state.detail}}>
            </div>
          </div>

        </div>

      </div>
    );
  }

}
