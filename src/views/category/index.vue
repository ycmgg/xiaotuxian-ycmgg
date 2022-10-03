<template>
  <div>
    <xtx-bread>
      <xtx-bread-item to="/">首页</xtx-bread-item>
      <xtx-bread-item to="/category/1005000">电器</xtx-bread-item>
      <xtx-bread-item>空调</xtx-bread-item>
    </xtx-bread>
  </div>
</template>
<script>
import xtxBread from '@/components/library/xtx-bread.vue'
import XtxBreadItem from '@/components/library/xtx-bread-item.vue'
export default {
  components: { xtxBread, XtxBreadItem },
  name: 'TopCategory'
}
</script>
<style scoped lang="less"></style>
