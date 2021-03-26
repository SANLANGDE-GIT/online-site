import request from '~/utils/request'

export default{

  // 4、获取用户信息
  getUserInfo() {
    return request({
      // baseURL: 'http://localhost:8160',
      url: '/api/ucenter/member/get-user-info',
      method: 'GET'
      // headers: {
      //   'token': localStorage.getItem('guli-token') }
    })
  },
  // 3、用户登录
  login(member) {
    return request({
      url: `/api/ucenter/member/login`,
      method: 'POST',
      data: member
    })
  },
  // 2、用户注册
  register(member) {
    return request({
      url: `/api/ucenter/member/register`,
      method: 'POST',
      data: member
    })
  },
  // 1、发送短信
  sendMessage(mobile) {
    return request({
      url: `/api/sms/send/${mobile}`,
      method: 'get'
    })
  }

}
