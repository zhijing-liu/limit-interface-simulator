<template lang="pug">
#header(:class="{darknessChanging:getStateStore.darknessChanging}")
  Menu
#Body(:class="{darknessChanging:getStateStore.darknessChanging}")
  LeftMenu
  #main
    RouterView(#default="{Component,route}")
      Transition(name="fade")
        .routerView(:key="route.name")
          Component(:is="Component")
#footer(:class="{darknessChanging:getStateStore.darknessChanging}")
Curtain
darknessChanging
</template>
<script setup lang="ts">
import Menu from '@/components/menu/index.vue'
import LeftMenu from '@/components/leftMenu/index.vue'
import Curtain from '@/components/curain/index.vue'
import darknessChanging from '@/components/darknessChanging/index.vue'
import { stateStore } from './store'
const getStateStore = stateStore()
</script>

<style lang="stylus" scoped>
#Body
  flex 1 0 0
  display flex
  overflow hidden
  #main
    flex 1 0 0
    overflow hidden
    position relative
    padding 10px
    .routerView
      position absolute
      width 100%
      height 100%
      top 0
      bottom 0
      display flex
      flex-direction column
      overflow hidden
</style>
