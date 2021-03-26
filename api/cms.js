import request from '~/utils/request'

export default{

  getListByTypeId(typeId) {
    return request({
      // baseURL: 'http://localhost:8140',
      url: `/api/cms/ad/list/${typeId}`,
      method: 'get'
    })
  }

}
