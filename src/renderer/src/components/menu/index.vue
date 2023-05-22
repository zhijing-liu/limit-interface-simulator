<template lang="pug">
#menu.default-step.weight
  img.logo.hover-step0(:src="logoImage" @click="getStateStore.curtainVisible=true")
  .title.hover-step1 limit-interface-simulator
  .buttons
    img.button.hover-step0(:src="minimizeImage" @click="minimize")
    img.button.hover-step0(:src="getGlobalStore.maxWindow?minWindowImage:maxWindowImage" @click="maxWindow")
    img.button.hover-step0(:src="powerOffImage" @click="exit")
</template>
<script setup lang="ts">
import logoImage from '@/assets/logo.svg'
import minimizeImage from '@/assets/image/minimize.png'
import powerOffImage from '@/assets/image/powerOff.png'
import maxWindowImage from '@/assets/image/maxWindow.png'
import minWindowImage from '@/assets/image/minWindow.png'
import { globalStore, stateStore } from '@/store'

import type { W } from '@/env'

const getGlobalStore = globalStore()
const getStateStore = stateStore()
const minimize = (): void => {
  ;(window as W).systemActions.minimize()
}
const maxWindow = (): void => {
  if (getGlobalStore.maxWindow) {
    ;(window as W).systemActions.minWindow()
  } else {
    ;(window as W).systemActions.maxWindow()
  }
  getGlobalStore.maxWindow = !getGlobalStore.maxWindow
}
const exit = (): void => {
  ;(window as W).systemActions.exit()
}
</script>

<style scoped lang="stylus">
#menu
  display flex
  height 60px
  justify-content space-between
  padding 0 20px
  box-sizing border-box
  align-items center
  .logo
    height 30px
    padding 4px 10px
    transition background-color 0.8s
    border-radius 8px
    cursor pointer
  .title
    text-transform uppercase
    font-size 20px
    padding 8px 15px
    transition background-color 0.8s
    cursor pointer
    border-radius 8px
  .buttons
    display flex
    .button
      width 25px
      height 25px
      margin 3px
      cursor pointer
      padding 10px
      transition all 0.3s
      border-radius 15px
      &:hover
        padding 7px
        width 31px
        height 31px
</style>
