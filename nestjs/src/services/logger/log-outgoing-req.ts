import { IncomingMessage } from 'http'
import { appLogger } from './app-logger.service'

function outgoingReqInterceptor(httpModule) {
  const original = httpModule.request
  httpModule.request = function(options, ...restArgu) {
    let api = options.href?.split('?').shift()
    if (!api) {
      const { protocol, hostname, port, path } = options
      api = [protocol, '//', hostname, ':', port, path].join('')
    }
    
    appLogger.info(`outgoing req: ${api}`)

    const lastIdx = restArgu.length - 1
    const originalCb = typeof restArgu[lastIdx] === 'function' ? restArgu[lastIdx] : () => null

    return original(options, (res: IncomingMessage, ...restResp) => {
      
      appLogger.info(`outgoing resp: ${api}`)
      originalCb(res, ...restResp)
    })
  }
}

outgoingReqInterceptor(require('http'))
outgoingReqInterceptor(require('https'))

// import {request} from 'https'
