import { contextBridge, ipcRenderer } from 'electron'
// import { electronAPI } from '@electron-toolkit/preload'
// import { createServe } from './serve'
// createServe()
import { spawn } from 'child_process'
export const reload = async (): Promise<void> => {
  return ipcRenderer.invoke('reload')
}
export const minimize = async (): Promise<void> => {
  return ipcRenderer.invoke('minimize')
}
export const fullscreen = async (): Promise<void> => {
  return ipcRenderer.invoke('fullscreen')
}
export const outFullscreen = async (): Promise<void> => {
  return ipcRenderer.invoke('outFullscreen')
}
export const maxWindow = async (): Promise<void> => {
  return ipcRenderer.invoke('maxWindow')
}
export const minWindow = async (): Promise<void> => {
  return ipcRenderer.invoke('minWindow')
}
export const exit = async (): Promise<void> => {
  return ipcRenderer.invoke('exit')
}
export const openLink = async (link: string): Promise<void> => {
  spawn('cmd', ['/c', 'start', '', link], { detached: true })
}
contextBridge.exposeInMainWorld('systemActions', {
  reload,
  minimize,
  fullscreen,
  outFullscreen,
  exit,
  minWindow,
  maxWindow,
  openLink
})
// contextBridge.exposeInMainWorld('api', {})
