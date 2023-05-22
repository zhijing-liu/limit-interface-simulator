<template lang="pug">
#about
  img.logo(:src="logoImage")
  .title limit 接口模拟器
  .linkButton.weight(@click="openLink")
    span 官网地址
    img.icon(:src="linkImage")
</template>
<script setup lang="ts">
import logoImage from '@/assets/logo.svg'
import linkImage from '@/assets/image/link.png'
import type { W } from '@/env'
const openLink = (): void => {
  ;(window as W).systemActions.openLink('http://limit-music.online')
}
</script>

<style scoped lang="stylus">
#about
  flex 1 0 0
  display flex
  flex-direction column
  align-items center
  justify-content center
  font-family 'pinyin'
  .logo
    width 100px
    height 100px
  .title
    font-size 22px
    font-weight bold
    letter-spacing 4px
    text-transform uppercase
  .linkButton
    width 140px
    height 50px
    margin-top 100px
    background-color var(--primary-color)
    display flex
    align-items center
    justify-content space-around
    font-size 19px
    padding 0 10px
    cursor pointer
    .icon
      height 26px
    &:hover
      background-color var(--primary-color-hover)
</style>
