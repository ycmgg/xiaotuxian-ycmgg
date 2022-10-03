<template>
  <div class="home-category" @mouseleave="categoryId=null">
    <ul class="menu">
      <li :class="{active:categoryId===i.id}" v-for="i in menuList" :key="i.id" @mouseenter="categoryId = i.id">
        <RouterLink :to="`/categoty/${i.id}`">{{ i.name }}</RouterLink>
        <template v-if="i.children">
          <RouterLink
            v-for="val in i.children"
            :key="val.id"
            :to="`/categoty/sub/${val.id}`"
            >{{ val.name }}</RouterLink
          >
        </template>
        <template v-else>
          <XtxSkeleton width="60px" height="18px" style="margin-right:5px" bg="rgba(255,255,255,0.2)" />
          <XtxSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
        </template>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4 v-if="currCategory">{{currCategory.id === 'brand' ? '品牌':'分类'}} 推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul
        v-if="currCategory && currCategory.goods && currCategory.goods.length"
      >
        <li v-for="itme in currCategory.goods" :key="itme.id">
          <RouterLink to="/">
            <img :src="itme.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ itme.name }}</p>
              <p class="desc ellipsis">{{ itme.desc }}</p>
              <p class="price"><i>¥</i>{{ itme.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 品牌 -->
     <ul v-if="currCategory && currCategory.brands">
        <li class="brand" v-for="val in currCategory.brands" :key="val.id">
          <RouterLink to="/">
            <img
              :src="val.picture"
              alt=""
            />
            <div class="info">
              <p class="place"><i class="iconfont icon-dingwei"></i>北京</p>
              <p class="name ellipsis">{{val.name}}</p>
              <p class="desc ellipsis-2">{{val.nameEn}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { findBrand } from '@/api/home'
import { useStore } from 'vuex'
export default {
  name: 'HomeCategory',
  setup () {
    const store = useStore()
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-chilren', name: '品牌推荐' }],
      brands: []
    })
    const menuList = computed(() => {
      const list = store.state.category.list.map((val) => {
        return {
          id: val.id,
          name: val.name,
          children: val.children && val.children.slice(0, 2),
          goods: val.goods
        }
      })
      list.push(brand)
      return list
    })
    // 弹层数据
    const categoryId = ref(null)
    const currCategory = computed(() => {
      return menuList.value.find((val) => val.id === categoryId.value)
    })

    // 品牌数据
    findBrand().then(data => {
      brand.brands = data.result
    })
    return { menuList, categoryId, currCategory }
  }
}
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,&.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
        li.brand {
        height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
            }
            .place {
              color: #999;
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
//骨架动画
.xtx-skeleton {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
