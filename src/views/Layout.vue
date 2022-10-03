<template>
<!-- 顶部 -->
<AppTopnav/>
<!-- 顶部分类吸附 -->
<AppHeaderSticky/>
<!-- 顶部分类 -->
<AppHeader/>
<main>
    <router-view/>
</main>
<!-- 底部 -->
<AppFooter/>
</template>

<script>
import AppTopnav from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
import { useStore } from 'vuex'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'layout',
  components: {
    AppTopnav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style scoped lang='less'>
</style>
