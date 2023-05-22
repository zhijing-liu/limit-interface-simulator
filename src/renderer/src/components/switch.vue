<template lang="pug">
.switch.cursor(@click="click")
  .line
  .punctuation(:style="`background-color:${active?'#24936E':'#DB4D6D'};`" :class="{active}")
</template>

<script setup lang="ts">
import {} from 'vue'

const props = defineProps<{
  active: boolean
}>()
const emits = defineEmits<{
  (e: 'update:active', active: boolean)
  (e: 'change', active: boolean)
}>()
const click = (): void => {
  const result = !props.active
  emits('update:active', result)
  emits('change', result)
}
</script>

<style scoped lang="stylus">
.switch
  width 40px
  height 20px
  display flex
  justify-content center
  flex-direction column
  position relative
  .line
    margin 0 3px
    box-sizing border-box
    border 3px solid #666666
    background-color #BBBBBB
    border-radius 4px
    height 8px
  .punctuation
    position absolute
    height 20px
    width 20px
    border-radius 50%
    box-sizing border-box
    border 2px solid #666666
    transition-property width,height,margin
    transition-duration 0.3s
    transform translateX(0)
  .punctuation.active
    transform translateX(20px)
</style>
