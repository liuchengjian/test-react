import React from 'react';
import PageTitle from "component/page-title/index.jsx";
import Product from "service/product-service.jsx";
import MUtil from 'utils/mm.jsx'
import TableList from "utils/table-list/index.jsx";
import {Link} from "react-router-dom";

const _product = new Product();
const _mm = new MUtil();

export default class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      parentCategoryId: this.props.match.params.categoryId || 0,
    }
  }

  componentDidMount() {
    this.loadCategoryList();
  }

  componentDidUpdate(prevProps, prevState) {
    let oldPath = prevProps.location.pathname,
      newPath = this.props.location.pathname,
      newId = this.props.match.params.categoryId || 0;
    if (oldPath !== newPath) {
      this.setState({
        parentCategoryId: newId,
      }, () => {
        this.loadCategoryList();
      })
    }
  }

  loadCategoryList() {
    _product.getCategoryList(this.state.parentCategoryId).then
    (res => {
      // alert(JSON.stringify(res))
      this.setState({
        list: res
      })
    }, errMsg => {
      _mm.errorTips(errMsg)
    });
  }

  onUpdateName(id, name) {
    let newName = window.prompt('请输入新品类名称', name);
    if (newName) {
      _product.updateCategoryName({categoryId: id, categoryName: newName})
        .then((res) => {
          _mm.successTips(res);
          this.loadCategoryList();
        }, (errMsg) => {
          _mm.errorTips(errMsg)
        })
    }
  }

  render() {
    const {list} = this.state;
    let listBody = list.map((item, index) => {
      return (
        <tr key={index}>
          <th className='text-center'>{item.id}</th>
          <th className='text-center'>{item.name}</th>
          <th className='text-center'>
            <a className='opear' onClick={() => this.onUpdateName(item.id, item.name)}>修改名称</a>
            {item.parentId === 0
              ? <Link to={'/product-category/index/' + item.id}>查看子品类</Link>
              : null}
          </th>
        </tr>
      )
    });

    return (
      <div id="page-wrapper">
        <PageTitle title={"品类列表"}>
          <div className="page-header-right">
            <Link className='btn btn-primary' to='/product-category/add'>
              <i className='fa fa-plus'></i>
              <span>添加品类</span>
            </Link>
          </div>
        </PageTitle>
        <div className="row">
          <div className="col-md-12">
            <p>父品类类ID:{this.state.parentCategoryId}</p>
          </div>
        </div>
        <TableList
          tableHeaderData={['品类ID', '品类名称', '操作']}
          children={listBody}
        />
      </div>
    );
  }

}
