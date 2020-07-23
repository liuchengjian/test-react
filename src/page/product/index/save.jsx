import React from 'react';
import PageTitle from "component/page-title/index.jsx";
import {Link} from "react-router-dom";
import Product from "service/product-service.jsx";
import MUtil from 'utils/mm.jsx'
import CategorySelector from "page/product/index/category-selector.jsx";
import FileUpLoader from "utils/fileupload/index.jsx";
import './save.css'
import RichEditor from "utils/rich-editor/index.jsx";

const _product = new Product();
const _mm = new MUtil();
export default class ProductSave extends React.Component {
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
        res.defaultDetail = res.detail;
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
          defaultDetail: res.defaultDetail,
        })
      }, (errMsg) => {
        _mm.errorTips(errMsg);
      })
    }
  }

  onCategoryChange(categoryId, parentCategoryId) {
    this.setState({
      categoryId: categoryId,
      parentCategoryId: parentCategoryId,
    });
  }

  /**
   * 上传图片成功
   * @param res
   */
  uploadSuccess(res) {
    let images = this.state.subImages;
    images.push(res);
    this.setState({
      subImages: images
    });
  }

  /**
   * 上传图片失败
   * @param err
   */
  uploadError(errMsg) {
    _mm.errorTips(errMsg);
  }

  /**
   * 删除图片
   */
  onImageDel(e) {
    let index = parseInt(e.target.getAttribute('index')),
      subImages = this.state.subImages;
    subImages.splice(index, 1);
    this.setState({
      subImages: subImages,
    })
  }

  onValueChange(e) {
    let name = e.target.name,
      value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  onRichEditorValueChange(value) {
    // console.log(value)
    this.setState({
      detail: value
    })
  }

  getSubImagesStr() {
    return this.state.subImages.map((image) => image.uri).join(',');
  }


  /**
   * 提交表单
   */
  onSubmit() {
    let product = {
        name: this.state.name,
        subtitle: this.state.subtitle,
        categoryId: parseInt(this.state.categoryId),
        subImages: this.getSubImagesStr(),
        detail: this.state.detail,
        price: parseFloat(this.state.price),
        stock: parseInt(this.state.stock),
        status: this.state.status,
      },
      checkProductResult = _product.checkProductResult(product);
    if (this.state.id) {
      product.id = this.state.id;
    }
    // console.log(JSON.stringify(product))
    if (checkProductResult.success) {
      _product.saveProduct(product).then((res) => {
        _mm.successTips(res);
        this.props.history.push('/product/index');
      }, (errMsg) => {
        _mm.errorTips(errMsg);
      });
    } else {
      _mm.errorTips(checkProductResult.msg);
    }
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title={this.state.id ? "编辑商品" : "添加商品"}/>
        <div className="form-horizontal">
          <div className="form-group">
            <label htmlFor="inputEmail3" className="col-sm-2 control-label">商品名称</label>
            <div className="col-sm-5">
              <input type="text"
                     className="form-control"
                     id="inputEmail3" placeholder="输入商品名称"
                     name='name'
                     value={this.state.name}
                     onChange={(e) => this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-2 control-label">商品描述</label>
            <div className="col-sm-5">
              <input type="text"
                     className="form-control"
                     id="inputPassword3"
                     name='subtitle'
                     value={this.state.subtitle}
                     placeholder="输入商品描述"
                     onChange={(e) => this.onValueChange(e)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-2 control-label">商品描述</label>
            <CategorySelector
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.secondCategoryId}
              onCategoryChange={
                (categoryId, parentCategoryId) =>
                  this.onCategoryChange(categoryId, parentCategoryId)
              }/>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-2 control-label">商品价格</label>
            <div className="col-sm-3">
              <div className="input-group">
                <input type="text"
                       className="form-control"
                       placeholder="请输入商品价格"
                       value={this.state.price}
                       name='price'
                       onChange={(e) => this.onValueChange(e)}
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
                       name='stock'
                       value={this.state.stock}
                       onChange={(e) => this.onValueChange(e)}
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
                  <i className='fa fa-close close' index={index} onClick={(e) => this.onImageDel(e)}></i>
                </div>
              ) : <div>{"请上传图片"} </div>}
            </div>
            <div className="col-md-offset-2 col-sm-10 file-upload-con">
              <FileUpLoader
                uploadSuccess={(res) => this.uploadSuccess(res)}
                uploadError={(err) => this.uploadError(err)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-2 control-label">详情</label>
            <div className="col-sm-10">
              <RichEditor
                defaultDetail={this.state.defaultDetail}
                detail={this.state.detail}
                onValueChange={(value) => this.onRichEditorValueChange(value)}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit"
                      className="btn btn-default"
                      onClick={(e) => this.onSubmit()}
              >提交
              </button>
            </div>
          </div>
        </div>

      </div>
    );
  }

}
