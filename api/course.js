import request from '~/utils/request'

export default{

  // 4、获取视频播放凭证
  getVideoPlayAuth(videoId) {
    return request({
      // baseURL: 'http://localhost:8130',
      url: `/api/aliyun/vod/auth/getAuth/${videoId}`,
      method: 'get'
    })
  },

  // 3、获取课程详情

  getCourseDetail(courseId) {
    return request({
      url: `/api/edu/course/course/${courseId}`,
      method: 'get'
    })
  },

  // 2、获取课程嵌套列表
  getNestedList() {
    return request({
      url: '/api/edu/subject/nested-list',
      method: 'get'
    })
  },
  // 1、课程列表
  getCourseList(queryInfo) {
    return request({
      url: '/api/edu/course/list',
      method: 'get',
      params: queryInfo
    })
  }

}
