<template lang="pug">
#setting
  Content(:contents="settingContents")
    template(#header="{item,index,value}")
      .header
        .label {{item.label}}
    template(#body="{item,index,value}")
      .settings.default-step
        .setting.default-step0(v-for="setting in settingContents[index].data" )
          .left
            .label {{setting.label}} :
          .right
            Switch(v-if="setting.type==='switch'" v-model:active="setting.value" v-on="setting.event" v-bind="setting.bind")
            scrollSelector(v-else-if="setting.type==='selector'" v-model:value="setting.value" v-on="setting.event" v-bind="setting.bind")
            .colors(v-else-if="setting.type==='color'")
              .color(
                v-for="color in setting.bind.colors"
                :key="color"
                :style="`background-color:${color};`"
                @click="setting.value=color"
                :class="{selected:setting.value===color}"
                )
</template>
<script setup lang="ts">
import Content from '@/components/content.vue'
import { computed, reactive } from 'vue'
import { settingStore } from '@/store'
import { defaultColorList, fontList, loadDarkness, loadFont, loadThemeColor } from '@/style'
import Switch from '@/components/switch.vue'
import scrollSelector from '@/components/scrollSelector.vue'

const getSettingStore = settingStore()
const settingContents = reactive([
  {
    label: '主题样式',
    key: 'darkness',
    data: [
      {
        label: '深色模式',
        type: 'switch',
        value: computed({
          get: () => getSettingStore.darkness,
          set: (v: boolean) => (getSettingStore.darkness = v)
        }),
        bind: {},
        event: {
          change: (): void => {
            loadDarkness()
          }
        }
      },
      {
        label: '字体',
        type: 'selector',
        value: computed({
          get: () => getSettingStore.font,
          set: (v: string) => (getSettingStore.font = v)
        }),
        bind: {
          options: [...fontList],
          width: 130
        },
        event: {
          change: (): void => {
            loadFont()
          }
        }
      },
      {
        label: '主题色',
        type: 'color',
        value: computed({
          get: () => getSettingStore.themeColor,
          set: (v: string) => {
            getSettingStore.themeColor = v
            loadThemeColor()
          }
        }),
        bind: {
          colors: defaultColorList
        },
        event: {}
      }
    ]
  },
  {
    label: '请求2',
    key: 'req2',
    data: []
  },
  {
    label: '请求3',
    key: 'req3',
    data: []
  },
  {
    label: '请求4',
    key: 'req4',
    data: []
  },
  {
    label: '其他',
    key: 'others',
    data: []
  }
])
</script>

<style scoped lang="stylus">
#setting
  flex 1 0 0
  overflow hidden
  display flex
  flex-direction column
  .header
    display flex
    align-items center
    padding 30px
    .label
      font-size 30px
      font-weight bold
  .settings
    flex 1 0 0
    padding 20px
    border-radius 10px
    margin 20px
    .setting
      height 50px
      display flex
      padding 10px 20px
      box-sizing border-box
      border-radius 5px
      margin 5px 0
      align-items center
      .left
      .right
        flex 1 0 0
      .left
        display flex
        justify-content flex-start
        .label
          font-size 12px
          font-weight bold
      .right
        display flex
        justify-content flex-end
        .colors
          display flex
          height 25px
          .color
            width 40px
            height 100%
            margin 0 5px
            border-radius 6px
            opacity 0.7
            cursor pointer
            &:hover
              opacity 1
          .color.selected
            opacity 1
</style>
