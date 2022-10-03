import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'
// 分类模块
export default {
  namespaced: true,
  state: () => {
    return {
      list: topCategory.map(val => ({ name: val }))
    }
  },
  mutations: {
    setList (state, Category) {
      state.list = Category
    },
    show (state, id) {
      const category = state.list.find(val => val.id === id)
      category.open = true
    },
    hide (state, id) {
      const category = state.list.find(val => val.id === id)
      category.open = false
    }
  },
  actions: {
    async getList (state) {
      const { result } = await findAllCategory()
      result.forEach(val => {
        val.open = false
      })
      state.commit('setList', result)
    }
  }
}
