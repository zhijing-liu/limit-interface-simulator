<template lang="pug">
.points
  .point(v-for="point in count" :class="{in:(point+start-1)===value}" @click="emits('update:value',point+start-1)")
</template>
<script setup lang="ts">
import {} from 'vue'
const props = withDefaults(
  defineProps<{
    count: number
    start?: number
    value: number
  }>(),
  {
    start: 0
  }
)
const emits = defineEmits<{
  (e: 'update:value', value: number): void
}>()
</script>

<style scoped lang="stylus">
.points
  display flex
  justify-content space-around
  padding 20px
  align-items center
  height 20px
  .point
    height 10px
    width 10px
    background-color #DDDDDD
    border-radius 50%
    transition-property width,height,margin
    transition-duration 0.3s
    margin 2px
    cursor pointer
  .point.in
    width 14px
    height 14px
    margin 0
    background-color var(--primary-color)
</style>
