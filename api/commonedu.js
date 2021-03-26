import request from '~/utils/request'

export default {

  getPageList(page, limit, courseId) {
    return request({
      url: `/api/edu/comment/list/${page}/${limit}`,
      method: 'get',
      params: { courseId }
    })
  },
  addComment(comment) {
    return request({
      url: `/api/edu/comment/auth/save`,
      method: 'post',
      data: comment
    })
  }
}
