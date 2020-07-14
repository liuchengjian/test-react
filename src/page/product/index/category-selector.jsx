import React from 'react';
import './select.css'
import Product from "service/product-service.jsx";
import MUtil from 'utils/mm.jsx'

const _product = new Product();
const _mm = new MUtil();
export default class CategorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCategoryList: [],
      firstCategoryId: 0,
      secondCategoryList: [],
      secondCategoryId: 0,
    }
  }

  componentDidMount() {
    this.loadFirstCategory();
  }

  loadFirstCategory() {
    _product.getCategoryList().then
    (res => {
      this.setState({
        firstCategoryList: res
      })
    }, errMsg => {
      _mm.errorTips(errMsg)
    });
  }

  loadSecondCategory() {
    _product.getCategoryList(this.state.firstCategoryId).then
    (res => {
      this.setState({
        secondCategoryList: res
      })
    }, errMsg => {
      _mm.errorTips(errMsg)
    });
  }

  onPropsCategoryChange() {
    let categoryChangeable = typeof this.props.onCategoryChange === 'function';
    if (typeof this.state.secondCategoryId) {
      categoryChangeable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
    } else {
      categoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
    }
  }

  onFirstCategoryChange(e) {
    let newValue = e.target.value || 0;
    this.setState({
      firstCategoryId: newValue,
      secondCategoryId: 0,
      secondCategoryList: [],
    }, () => {
      //更新二级品类
      this.loadSecondCategory();
      this.onPropsCategoryChange();
    })
  }

  onSecondCategoryChange(e) {
    let newValue = e.target.value || 0;
    this.setState({
      secondCategoryId: newValue,
    }, () => {
      this.onPropsCategoryChange();
    })
  }


  render() {
    const {firstCategoryList, secondCategoryList} = this.state;
    return (
      <div className="col-sm-10">
        <select
          className='form-control cate-select'
          onChange={(e) => this.onFirstCategoryChange(e)}
        >
          <option value=''>请选择一级分类</option>
          {firstCategoryList.map(
            (category, index) =>
              <option key={index}
                      value={category.id}>
                {category.name}
              </option>)
          }
        </select>
        <select
          className='form-control cate-select'
          onChange={(e) => this.onSecondCategoryChange(e)}
        >
          <option value=''>请选择二级分类</option>
          {secondCategoryList && secondCategoryList.map(
            (category, index) =>
              <option key={index}
                      value={category.id}>
                {category.name}
              </option>)
          }
        </select>
      </div>
    );
  }

}