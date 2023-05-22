export interface W extends Window {
  systemActions: {
    reload: () => Promise<void>
    minimize: () => Promise<void>
    fullscreen: () => Promise<void>
    outFullscreen: () => Promise<void>
    exit: () => Promise<void>
    minWindow: () => Promise<void>
    maxWindow: () => Promise<void>
    openLink: (link: string) => Promise<void>
  }
}
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
