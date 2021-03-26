import request from '~/utils/request'

export default{
// 7、删除订单
  delete(orderId) {
    return request({
      url: `/api/trade/order/auth/delete/${orderId}`,
      method: 'delete'
    })
  },
  // 6、我的订单列表

  orderList() {
    return request({
      url: `/api/trade/order/auth/list`,
      method: 'get'
    })
  },

  // 5、查看支付状态

  queryPayStatus(orderNo) {
    return request({
      url: `/api/trade/order/query-pay-status/${orderNo}`,
      method: 'get'
    })
  },

  // 4、去支付
  toPay(orderNo) {
    return request({
      url: `/api/trade/weixin-pay/auth/create-native/${orderNo}`,
      method: 'get'
    })
  },
  // 3、查看订单是否购买过
  getOrderStatus(courseId) {
    return request({
      url: `/api/trade/order/auth/get-order-status/${courseId}`,
      method: 'get'
    })
  },
  // 2、查看订单
  getOrderInfo(orderNo) {
    return request({
      url: `/api/trade/order/auth/get-order/${orderNo}`,
      method: 'get'
    })
  },
  // 1、创建订单
  createOrder(courseId) {
    return request({
      url: `/api/trade/order/auth/create-order/${courseId}`,
      method: 'get'
    })
  }
}
