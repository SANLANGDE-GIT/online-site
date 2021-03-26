import request from '~/utils/request'

export default{
  // 讲师详细信息
  teacherInfo(id) {
    return request({
      url: `/api/edu/teacher/teacher/${id}`,
      method: 'get'
    })
  },
  // 讲师列表
  getTeacherList() {
    return request({
      url: '/api/edu/teacher/list',
      method: 'get'
    })
  }

}
