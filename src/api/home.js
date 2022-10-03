import request from '@/utlis/request'

// 获取品牌数据
export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}

// 获取轮播图数据
export const findBanner = () => {
  return request('/home/banner', 'get')
}

// 获取新鲜好物
export const findNew = () => {
  return request('home/new', 'get')
}

// 获取人气推荐
export const findHot = () => {
  return request('home/hot', 'get')
}

// 产品区块
export const findGoods = () => {
  return request('/home/goods', 'get')
}

// 最新专题
export const findSpecial = (limit = 3) => {
  return request('/home/special', 'get', { limit })
}
