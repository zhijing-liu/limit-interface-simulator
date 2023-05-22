import { ElectronAPI } from '@electron-toolkit/preload'
import { minimize, reload, fullscreen, outFullscreen, exit, openLink } from "./index";

declare global {
  interface Window {
    systemActions: {
      reload:typeof reload
      minimize:typeof minimize,
      fullscreen:typeof fullscreen,
      outFullscreen:typeof outFullscreen,
      exit:typeof exit,
      openLink:typeof openLink,
    }
  }
}
