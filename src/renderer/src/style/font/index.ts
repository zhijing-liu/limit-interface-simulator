// softSweet Aa日系软萌甜心体
import './font.styl'
import { settingStore } from '@/store'

const fontElement: HTMLStyleElement = document.createElement('style')
document.head.appendChild(fontElement)

export const fontList = [
  {
    label: '默认',
    value: 'sans-serif'
  },
  {
    label: '粉圆',
    value: 'fen-yuan'
  },
  {
    label: 'JetBrains-Mono',
    value: 'JetBrainsMono'
  },
  {
    label: '瘦金体',
    value: 'shou-jin'
  }
]
export const loadFont = (name = settingStore().font): void => {
  localStorage.setItem('font', settingStore().font)
  fontElement.textContent = `
  * {
    font-family: '${name}'
  }
  `
}
