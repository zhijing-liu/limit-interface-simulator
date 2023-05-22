<template lang="pug">
#leftMenu(:class="{active}")
  .top.hover-step1(@click.stop="active=!active")
    img.icon(:src="menuImage" )
    Transition(name="fade")
      .identification(v-show="active")
        .title LIMIT
        .subtTitle -- BY ZHIJING
  .center
    .item.hover-step2.cursor.default-step1(
      v-for="item in menuItemList"
      :key="item.key"
      :class="{active:route.name===item.key}"
      @click="()=>clickItem(item)"
      )
      img.icon(:src="item.icon")
      .label.weight {{item.label}}
  .bottom
    .item.hover-step2.cursor.default-step1(
      v-for="item in bottomItemList"
      :key="item.key"
      :class="{active:route.name===item.key}"
      @click="()=>clickItem(item)"
    )
      img.icon(:src="item.icon")
      .label.weight {{item.label}}
</template>
<script setup lang="ts">
import { ref } from 'vue'
import menuImage from '@/assets/image/menu.png'
import settingImage from '@/assets/image/setting.png'

const active = ref(false)
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const menuItemList = [
  {
    key: 'projects',
    icon: settingImage,
    label: '项目列表'
  }
]
const bottomItemList = [
  {
    key: 'setting',
    icon: settingImage,
    label: '设置'
  },
  {
    key: 'about',
    icon: settingImage,
    label: '关于'
  }
]
const clickItem = (item: { key: string }): void => {
  router.push({ name: item.key })
}
</script>

<style scoped lang="stylus">
#leftMenu
  width 60px
  overflow hidden
  display flex
  flex-direction column
  box-sizing border-box
  padding 10px
  transition-property width
  transition-timing-function ease-in-out
  transition-duration 0.3s
  margin 10px
  border-radius 12px
  >.top
    display flex
    align-items center
    overflow hidden
    height 40px
    transition-property height,background-color
    transition-duration 0.3s
    border-radius 10px
    >.icon
      width 30px
      height 30px
      padding 5px
      cursor pointer
      border-radius 8px
      transition-property padding
      transition-duration 0.3s
    >.identification
      display flex
      flex-direction column
      font-weight bold
      text-transform uppercase
      padding 10px
      flex 1 0 0
      >.title
        font-size 30px
      >.subTitle
        font-size 12px
        text-align right
  >.bottom,
  >.center
    .item
      padding 10px
      height 20px
      border-radius 8px
      margin 8px 0
      transition-property border-radius,height,height
      transition-duration 0.3s
      display flex
      overflow hidden
      align-items center
      >.icon
        width 20px
        height 20px
      >.label
        flex 1 0 0
        overflow hidden
        padding 0 10px
        font-size 12px
    .item.active
      background-color var(--primary-color)
      pointer-events none
  >.center
    flex 1 0 0
    display flex
    flex-direction column
    padding 40px 0
#leftMenu.active
  width 240px
  .top
    height 80px
    cursor pointer
    >.icon
      pointer-events none
      padding 5px 10px
  >.bottom,
  >.center
    .item.active
      height 30px
</style>
