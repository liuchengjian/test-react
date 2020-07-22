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

  /**
   * 品类分类
   */
  getCategoryList(parentCategoryId) {
    return _mm.request({
      type: 'post',
      url: '/manage/category/get_category.do',
      data: {categoryId: parentCategoryId || 0}
    });
  }

  checkProductResult(product) {
    let result = {
      success: true,
      msg: "通过"
    };
    if (typeof product.name !== "string" || product.name.length === 0) {
      return {
        success: false,
        msg: "商品名称不能为空"
      }
    }
    if (typeof product.subtitle !== "string" || product.subtitle.length === 0) {
      return {
        success: false,
        msg: "商品描述不能为空"
      }
    }
    if (typeof product.categoryId !== "number" || !(product.categoryId > 0)) {
      return {
        success: false,
        msg: "请选择商品品类"
      }
    }
    if (typeof product.price !== "number" || !(product.price >= 0)) {
      return {
        success: false,
        msg: "请输入正确的商品价格"
      }
    }
    if (typeof product.stock !== "number" || !(product.stock >= 0)) {
      return {
        success: false,
        msg: "请输入正确的库存数量"
      }
    }

    return result;
  };

  saveProduct(product) {
    return _mm.request({
      type: 'GET',
      url: '/manage/product/save.do',
      data: product
    });
  }

  getProduct(productId) {
    return _mm.request({
      type: 'GET',
      url: '/manage/product/detail.do',
      data: {
        productId: productId || 0
      }
    });
  }
}
