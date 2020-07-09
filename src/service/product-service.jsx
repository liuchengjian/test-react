import MUtil from "utils/mm.jsx";

const _mm = new MUtil();

export default class Product {
  /**
   * 获取用户列表
   * @param pageNum
   * @returns {*|Promise|Promise<unknown>}
   */
  getProductList(pageNum) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/list.do',
      data: {pageNum: pageNum}
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
