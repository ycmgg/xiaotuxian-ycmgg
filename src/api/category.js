import request from '@/utlis/request'

export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
