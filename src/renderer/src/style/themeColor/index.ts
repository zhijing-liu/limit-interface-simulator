import { settingStore } from '@/store'

const themeColorElement: HTMLStyleElement = document.createElement('style')
document.head.appendChild(themeColorElement)
const getColor = (color: string): { r: number; g: number; b: number } => {
  let hex = color.replace('#', '')
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(function (h) {
        return h + h
      })
      .join('')
  }
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16)
  }
}
export const defaultColorList = ['#268785', '#EB7A77', '#F9B745', '#66BAB7', '#9B90C2']
export const loadThemeColor = (color = settingStore().themeColor): void => {
  localStorage.setItem('themeColor', settingStore().themeColor)
  const { r, g, b } = getColor(color)
  themeColorElement.textContent = `
  :root{
    --primary-color:rgba(${r},${g},${b},1);
    --primary-color-hover:rgba(${r},${g},${b},0.8);
  }
  `
}
