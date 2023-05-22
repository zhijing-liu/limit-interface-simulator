import { defineStore } from 'pinia'

export const globalStore = defineStore('global', {
  state: () => ({
    maxWindow: false,
    req: {
      ObjectMap: {
        8000: {
          name: 'test',
          staticPath: 'path',
          returnTemplate: [
            {
              key: 'code'
            },
            {
              key: 'data'
            },
            {
              key: 'msg'
            }
          ],
          pathMap: {
            '/first': {
              getReq: {
                reqData: {
                  body: {
                    type: 'json',
                    strict: false,
                    necessary: false,
                    structure: {
                      data: 1
                    }
                  },
                  params: [{ key: 'data', necessary: false, infinite: true }],
                  query: {
                    strict: false,
                    necessary: false,
                    structure: {
                      data: '1'
                    }
                  }
                },
                resMap: {
                  checkError: {
                    code: 1,
                    data: 1,
                    msg: 1
                  },
                  default: {
                    code: 0,
                    data: 0,
                    msg: 0
                  }
                }
              }
            }
          }
        }
      }
    }
  })
})
export const settingStore = defineStore('setting', {
  state: (): {
    darkness: boolean
    font: string
    themeColor: string
  } => ({
    darkness: JSON.parse(localStorage.getItem('darkness') ?? 'true'),
    font: localStorage.getItem('font') ?? 'sans-serif',
    themeColor: localStorage.getItem('themeColor') ?? '#268785'
  })
})
export const stateStore = defineStore('state', {
  state: (): { curtainVisible: boolean; darknessChanging: boolean } => ({
    darknessChanging: false,
    curtainVisible: true
  })
})
