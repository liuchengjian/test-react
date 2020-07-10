import MUtil from "utils/mm.jsx";

const _mm = new MUtil();

export default class Product {
  /**
   * 获取用户列表
   * @param pageNum
   * @returns {*|Promise|Promise<unknown>}
   */
  getProductList(listParams) {
    let url = '',
      data = {};
    if (listParams.listType === 'list') {
      url = '/manage/product/list.do';
      data.pageNum = listParams.pageNum;
    } else if (listParams.listType === 'search') {
      url = '/manage/product/search.do';
      data.pageNum = listParams.pageNum;
      data[listParams.searchType] = listParams.keyword;
    }

    return _mm.request({
      type: 'post',
      url: url,
      data: data
    });
  }

  setProductStatus(productId, status) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/set_sale_status.do',
      data: {productId: productId, status: status}
    });
  }


}
