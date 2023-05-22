<template lang="pug">
Transition(name="fade-slow" @after-enter="load")
  #darknessChanging(v-show="getStateStore.darknessChanging" :class="{dark}")
    .darknessAction(@click="dark=!dark" )
      .moon
        .moonMask
      .sunshine(v-for="sunshine in 9" :style="`transform:translate(-50% ,10px) rotate(${sunshine * 40}deg);`")
      .star(v-for="star in stars" :style="star")
        .starLT
        .starLB
        .starRT
        .starRB
</template>
<script setup lang="ts">
import { stateStore, settingStore } from '@/store'
import { computed, ref, watch } from 'vue'
import { random } from '@/utils'

const dark = ref(true)
const getStateStore = stateStore()
const getSettingStore = settingStore()

const load = (): void => {
  dark.value = !dark.value
  setTimeout(() => {
    getStateStore.darknessChanging = false
  }, 1000)
}
const getStarStyle = (): string => {
  const size = random(100, 100)
  return `transform:translate(-${3 * random(20, 0)}vw,${3 * random(15, -5)}vh);width:${
    (14 * size) / 100
  }px;height:${(20 * size) / 100}px;filter: blur(${random(10, -5)}px);`
}
const stars = computed(() => {
  const arr = []
  if (getSettingStore.darkness) {
    for (let i = 0; i < random(10, 5); i++) {
      arr.push(getStarStyle())
    }
  }
  return arr
})
watch(
  computed(() => getSettingStore.darkness),
  () => {
    dark.value = !getSettingStore.darkness
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="stylus">
$light=#fff5c7
$dark=#222222
#darknessChanging
  //cursor none
  position fixed
  top 0
  right 0
  left 0
  bottom 0
  display flex
  z-index 1000
  flex-direction column
  justify-content center
  align-items center
  background-color $light
  transition background-color 0.8s
  .darknessAction
    transform translate(0px,-10vh)
    transition transform  0.8s
    height 50px
    .moon
      width 50px
      height 50px
      position relative
      border-radius 50%
      background-color #FBE251
      transition background-color 0.8s
      transition-delay 0s
      border 0
      .moonMask
        width 100%
        height 100%
        border-radius 50%
        position absolute
        background-color $light
        transform rotate(120deg) translateX(-30%)
        transform-origin center 0
        transition transform 0.8s,background-color 0.8s
        transition-delay 0s
    .sunshine
      position absolute
      height 20px
      width 6px
      background-color #FBE251
      left 50%
      transform-origin 0 -35px
      border-radius 50%
      transition width 0.8s,height 0.8s
      transition-delay 0.3s
    .star
      background-color $light
      height 20px
      width 14px
      //overflow hidden
      position relative
      .starLT
      .starLB
      .starRT
      .starRB
        background-color $light
        transition background-color 0.8s
        transition-delay 0s
        position absolute
        width 55%
        height 55%
      .starLT
        border-radius 0 0 100% 0
        transform translate(-6%,-6%)
      .starLB
        border-radius 0 100% 0 0
        transform translate(-6%,99%)
      .starRT
        border-radius 0 0 0 100%
        transform translate(99%,-6%)
      .starRB
        border-radius 100% 0 0 0
        transform translate(99%,99%)
  //*
  //  pointer-events none
#darknessChanging.dark
  background-color $dark
  .darknessAction
    transform translate(20vw,-30vh)
    .moon
      background-color #DDDDDD
      transition-delay 0.3s
      .moonMask
        transition-delay 0.3s,0s
        transform rotate(56deg) translateX(10%)
        background-color $dark
    .sunshine
      width 0
      height 0
      transition-delay 0s
    .star
      .starLT
      .starLB
      .starRT
      .starRB
        background-color $dark
</style>
