import { app, shell, BrowserWindow, screen, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

const load = async (): Promise<void> => {
  // 设置id
  electronApp.setAppUserModelId('com.interface-simulator')
  // app 监听
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  const createWindow = (): BrowserWindow =>
    new BrowserWindow({
      width: screen.getPrimaryDisplay().workAreaSize.width * (!app.isPackaged ? 0.75 : 0.5),
      height: screen.getPrimaryDisplay().workAreaSize.height * 0.75,
      minWidth: 800,
      minHeight: 600,
      show: false,
      frame: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })
  // app 初始化
  await app.whenReady()
  // 创建window
  const mainWindow = createWindow()
  const focusAndPerform = (methodName) => {
    return () => {
      mainWindow.webContents.focus()
      mainWindow.webContents[methodName]?.()
    }
  }
  // 判断是否打开控制台
  !app.isPackaged && mainWindow.webContents.openDevTools()
  // window 监听
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  // 多窗口管理
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  // 创建view
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    await mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    await mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  ipcMain.handle('reload', () => {
    focusAndPerform('reload')
  })
  ipcMain.handle('fullscreen', () => {
    mainWindow.setFullScreen(true)
  })
  ipcMain.handle('outFullscreen', () => {
    mainWindow.setFullScreen(false)
  })
  ipcMain.handle('minimize', () => {
    mainWindow.minimize()
  })
  ipcMain.handle('exit', () => {
    app.quit()
  })
  ipcMain.handle('maxWindow', () => {
    mainWindow.maximize()
  })
  ipcMain.handle('minWindow', () => {
    mainWindow.restore()
  })
}
load().then(() => {
  console.log('app start')
})
