import request from '~/utils/request'

export default{
// 4、删除收藏
  remove(courseId) {
    return request({
      url: `/api/edu/course-collect/auth/remove/${courseId}`,
      method: 'get'
    })
  },
  // 3、收藏列表
  collectList() {
    return request({
      url: '/api/edu/course-collect/auth/list',
      method: 'get'
    })
  },
  // 2、添加收藏
  addCollect(courseId) {
    return request({
      url: `/api/edu/course-collect/auth/collect-course/${courseId}`,
      method: 'get'
    })
  },
  // 1、是否收藏
  isCollectCourse(courseId) {
    return request({
      url: `/api/edu/course-collect/auth/is-collect-course/${courseId}`,
      method: 'get'
    })
  }
}
