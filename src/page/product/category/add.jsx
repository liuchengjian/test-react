import React from 'react';
import PageTitle from "component/page-title/index.jsx";
import Product from "service/product-service.jsx";
import MUtil from 'utils/mm.jsx'

const _product = new Product();
const _mm = new MUtil();

export default class CategoryAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      parentId: 0,
      categoryName: '',
    }
  }

  componentDidMount() {
    this.loadCategoryList();
  }

  /**
   * 显示品类列表
   */
  loadCategoryList() {
    _product.getCategoryList(0).then
    (res => {
      // alert(JSON.stringify(res))
      this.setState({
        categoryList: res
      })
    }, errMsg => {
      _mm.errorTips(errMsg)
    });
  }

  onValueChange(e) {
    let name = e.target.name,
      value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  onSubmit() {
    let categoryName = this.state.categoryName.trim();
    if (categoryName) {
      // alert(categoryName)
      _product.addCategory({
        parentId: this.state.parentId,
        categoryName: categoryName,
      }).then((res) => {
          _mm.successTips(res);
          this.props.history.push('/product-category/index');
        },
        (errMsg) => {
          _mm.errorTips(errMsg)
        })
    } else {
      _mm.errorTips('请输入品类名称')
    }
  }

  render() {
    const {categoryList} = this.state;
    return (
      <div id="page-wrapper">
        <PageTitle title={"品类列表"}/>
        <div className="row">
          <div className="col-md-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label htmlFor="inputEmail3" className="col-sm-2 control-label">所属品类</label>
                <div className="col-sm-5">
                  <select name='parentId'
                          className='form-control'
                          onChange={(e) => this.onValueChange(e)}
                  >
                    <option value='0'>根品类/</option>
                    {categoryList && categoryList.map((category, index) => {
                      return <option value={category.id} key={index}>根品类/{category.name}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputEmail3" className="col-sm-2 control-label">商品名称</label>
                <div className="col-sm-5">
                  <input type="text"
                         className="form-control"
                         id="inputEmail3" placeholder="输入品类名称"
                         name='categoryName'
                         value={this.state.categoryName}
                         onChange={(e) => this.onValueChange(e)}
                  />
                </div>
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
      </div>
    );
  }

}
