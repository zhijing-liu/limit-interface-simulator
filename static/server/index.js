import express, { json } from 'express'
// const config = JSON.parse(process.argv[2] ?? '{}')
import { join } from 'path'
import { format } from 'url'
const config = {
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

const getParamsPath = (list) => {
  const paramList = []
  for (const { key, necessary = false, infinite = false } of list ?? []) {
    let p = `:${key}`
    if (infinite) {
      p += '(*)'
    }
    if (!necessary) {
      p += '?'
    }
    paramList.push(p)
  }
  return paramList.join('/')
}
const contrastObject = (pole, data) => {
  for (const key in pole) {
    if (data[key] === undefined) {
      return false
    }
    const poleType = typeof pole[key]
    const dataType = typeof data[key]
    if (poleType === dataType) {
      if (poleType === 'object') {
        if (!contrastObject(pole[key], data[key])) {
          return false
        }
      }
    } else {
      return false
    }
  }
  return true
}
const contrastBody = (rule, body) => {
  if (rule) {
    const { type, strict, necessary, structure } = rule
    if (!necessary && Object.values(body ?? {}).length === 0) {
      return true
    }
    if (type === 'json') {
      if (strict) {
        return JSON.stringify(structure) === JSON.stringify(body)
      } else {
        return contrastObject(structure, body)
      }
    } else if (type === 'string') {
      if (strict) {
        return structure === body
      } else {
        return typeof body === 'string'
      }
    }
  }
  return true
}
const contrastQuery = (rule, query) => {
  if (rule) {
    const { strict, necessary, structure } = rule
    if (!necessary && Object.values(query ?? {}).length === 0) {
      return true
    }
    if (strict) {
      return JSON.stringify(structure) === JSON.stringify(query)
    } else {
      return contrastObject(structure, query)
    }
  }
  return true
}
const createApp = async (port, { staticPath, pathMap }) => {
  const app = express()
  app.use(json())
  for (const path in pathMap) {
    const fullPath = join('\\', staticPath, path)
    const { getReq, postReq, putReq, deleteReq } = pathMap[path]
    // 路径请求
    if (getReq) {
      const { reqData, resMap } = getReq
      app.get(format(`${join(fullPath)}/${getParamsPath(reqData.params)}`), (req, res) => {
        if (!contrastBody(reqData.body, req.body)) {
          res.send({
            ...resMap.checkError,
            error: 'body checked false'
          })
          return
        }
        if (!contrastQuery(reqData.query, req.query)) {
          res.send({
            ...resMap.checkError,
            error: 'query checked false'
          })
          return
        }
        res.send(resMap.default)
      })
    }
  }
  app.listen(port, '::', () => {
    console.log(port, 'start')
  })
}
for (const port in config.ObjectMap) {
  createApp(port, config.ObjectMap[port])
}
