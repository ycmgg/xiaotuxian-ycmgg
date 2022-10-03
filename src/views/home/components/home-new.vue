<template>
  <div class="home-new" ref="target">
    <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
      <template #right><xtx-more path="/" /></template>
      <!-- 面板内容 -->
      <transition name="fade">
        <ul v-if="goods.length" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <RouterLink :to="`/product/${item.id}`">
              <img :src="item.picture" alt="" />
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
          </li>
        </ul>
        <home-skeleton v-else bg="#f0f9f4"/>
      </transition>
    </HomePanel>
  </div>
</template>

<script>
import { findNew } from '@/api/home'
import { useLazyData } from '@/hooks'
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'
export default {
  name: 'HomeNew',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    const { target, result } = useLazyData(findNew)
    return { goods: result, target }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
