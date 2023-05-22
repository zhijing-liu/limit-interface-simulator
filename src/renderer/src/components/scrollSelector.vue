<template lang="pug">
.scrollSelector(:class="{visible,'default-step1':visible}" :style="`width:${width}px`")
  Transition(name="fade")
    .options.noScrollBar.default-step1(v-if="visible" @click="visible=false")
      .option.hover-step2(v-for="option in options" :key="option.value" @click="()=>clickOption(option.value)") {{option.label}}
  .value.hover-step1(@click="visible=!visible") {{getSelected.label}}
</template>
<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
const props = withDefaults(
  defineProps<{
    options: { label: string; value: string | number }[]
    value: string | number
    width?: string | number
  }>(),
  {
    width: 'auto'
  }
)
const visible = ref(false)
const emits = defineEmits<{
  (e: 'update:value', value: string | number)
  (e: 'change', value: string | number)
}>()
const clickOption = (value: string | number): void => {
  emits('update:value', value)
  emits('change', value)
}
const getSelected = computed(() => props.options.find(({ value }) => value === props.value))
</script>

<style scoped lang="stylus">
.scrollSelector
  height 30px
  font-size 12px
  position relative
  border-radius 8px
  font-weight bold
  .options
    position absolute
    width 100%
    top 130%
    border-radius 8px
    overflow auto
    max-height 400px
    cursor pointer
    .option
      width 100%
      box-sizing border-box
      text-align center
      height 30px
      padding 5px 20px
  .value
    height 100%
    display flex
    align-items center
    padding 0 10px
    border-radius 8px
    cursor pointer
    justify-content center
</style>
