import MUtil from "utils/mm.jsx";

const _mm = new MUtil();

export default class Order {
  /**
   * 获取用户列表
   * @param pageNum
   * @returns {*|Promise|Promise<unknown>}
   */
  getOrderList(listParams) {
    let url = '',
      data = {};
    if (listParams.listType === 'list') {
      url = '/manage/order/list.do';
      data.pageNum = listParams.pageNum;
    } else if (listParams.listType === 'search') {
      url = '/manage/order/search.do';
      data.pageNum = listParams.pageNum;
      data.orderNo = listParams.orderNo;
    }

    return _mm.request({
      type: 'post',
      url: url,
      data: data
    });
  }


}
