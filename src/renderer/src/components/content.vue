<template lang="pug">
.contentMask
  .contents(@mousedown="mousedown" ref="contentsIns")
    .content(
      v-for="(item,index) in contents"
      :key="item.key"
      :style="getContentStyle(index)"
    )
      .header
        slot(name="header" :item="item" :index="index" :value="value")
      .body
        slot(name="body" :item="item" :index="index" :value="value")
  Points.points(v-model:value="value" :count="contents.length")
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Points from './Points.vue'
const props = defineProps<{
  contents: { label: string; key: string | number; [key: string]: any }[]
}>()
const value = ref(0)
const getContentStyle = (index): string => {
  let style = `z-index:${1000 - index};`
  if (value.value > index) {
    style += `transform:translateX(-${(value.value - index) * 100}%);opacity:${
      1 - value.value + index
    };`
  } else {
    style += `transform:translateX(0%);opacity:1;`
  }
  return style
}
const contentsIns = ref()
const mousedown = (event: MouseEvent): void => {
  const rect = contentsIns.value.getBoundingClientRect()
  contentsIns.value.classList.add('dragging')
  const startProgress = value.value
  const max = props.contents.length - 1
  const move = (e: MouseEvent): void => {
    const v = startProgress + ((event.x - e.x) / rect.width) * 2
    value.value = Math.min(Math.max(0, v), max)
  }
  const stop = (): void => {
    document.body.removeEventListener('mousemove', move)
    document.body.removeEventListener('mouseup', stop)
    document.body.removeEventListener('mouseleave', stop)
    contentsIns.value.classList.remove('dragging')
    value.value = Math.round(value.value)
  }
  document.body.addEventListener('mousemove', move)
  document.body.addEventListener('mouseup', stop)
  document.body.addEventListener('mouseleave', stop)
}
</script>

<style scoped lang="stylus">
.contentMask
  flex 1
  display flex
  flex-direction column
  .contents
    flex 1 0 0
    position relative
    .content
      display flex
      flex-direction column
      height 100%
      width 100%
      flex 1 0 100%
      top 0
      left 0
      position absolute
      background-color var(--back-color)
      opacity 1
      transition-property transform , opacity
      transition-duration 0.3s , 0.3s
      transform translateX(0%)
      .header
        height 20%
        display flex
        .label
          font-size 34px
      .body
        flex 1 0 0
        overflow auto
        display flex
        flex-direction column
  .contents.dragging
    .content
      transition-duration 0s , 0s
  .points
    width 120px
    align-self center
</style>
