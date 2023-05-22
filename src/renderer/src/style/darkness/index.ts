import { settingStore, stateStore } from '../../store'

type darknessLoader = Record<string, { default: string }>
export const darknessMap: { dark: () => darknessLoader; light: () => darknessLoader } = {
  dark: () =>
    (import.meta as any).globEager(`./dark/*.styl`, {
      query: '?inline'
    }),
  light: () =>
    (import.meta as any).globEager(`./light/*.styl`, {
      query: '?inline'
    })
}
const darknessElement: HTMLStyleElement = document.createElement('style')
document.head.appendChild(darknessElement)
export const loadDarkness = (
  darkness = settingStore().darkness,
  showDarknessChanging = true
): void => {
  const load = (): void => {
    const moduleMap: darknessLoader = darknessMap[darkness ? 'dark' : 'light']()
    const darknessModules = Object.values(moduleMap).map((module) => module.default)
    if (darknessModules.length > 0) {
      darknessElement.textContent = darknessModules.join('\n')
    }
  }
  localStorage.setItem('darkness', JSON.stringify(settingStore().darkness))
  if (showDarknessChanging) {
    stateStore().darknessChanging = true
    setTimeout(() => {
      load()
    })
  } else {
    load()
  }
}
