<template lang="pug">
Transition(name="fade")
  #curtain(
    v-show="getStateStore.curtainVisible"
    )
    img.logo(:src="logoImage")
</template>
<script setup lang="ts">
import { stateStore } from '@/store'
import logoImage from '@/assets/logo.svg'

const getStateStore = stateStore()
setTimeout(() => {
  getStateStore.curtainVisible = false
}, 1600)
</script>

<style scoped lang="stylus">
#curtain
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
  background-color var(--back-color)
  .logo
    width 40vh
    height 40vw
</style>
