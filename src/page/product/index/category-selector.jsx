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

  componentWillReceiveProps(nextProps) {
    // console.log(JSON.stringify(nextProps.parentCategoryId))
    let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
      parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
    if (!categoryIdChange && !parentCategoryIdChange) {
      return;
    }
    if (nextProps.parentCategoryId === 0) {
      //一级品类
      this.setState({
        firstCategoryId: nextProps.categoryId,
        secondCategoryId: 0,
      })
    } else {
      //二级级品类
      this.setState({
        firstCategoryId: nextProps.parentCategoryId,
        secondCategoryId: nextProps.categoryId,
      }, () => {
        parentCategoryIdChange && this.loadSecondCategory()
      })
    }


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
    if (this.props.readOnly) {
      return;
    }
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
    if (this.props.readOnly) {
      return;
    }
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
          readOnly={this.props.readOnly}
          value={this.state.firstCategoryId}
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
          readOnly={this.props.readOnly}
          value={this.state.secondCategoryId}
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
