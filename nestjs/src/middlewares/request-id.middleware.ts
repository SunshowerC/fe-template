import httpContext from 'express-http-context'
import * as uuid from 'uuid'
import { NextFunction, Request, Response } from 'express'
import { SEQ_ID_HEADER } from 'src/config/header'
import { isLocal } from 'src/config'
import { appLogger } from 'src/services/logger/app-logger.service'

/**
 * 添加请求序列头
 */
export const addRequestId = (req: Request, res: Response, next: NextFunction) => {
  // 首先取原请求头中的 request id，若不存在则通过 uuidv（根据时间戳生成）设置
  const requestId = req.headers[SEQ_ID_HEADER.toLowerCase()] || uuid.v4()
  httpContext.set(SEQ_ID_HEADER, requestId)

  req.headers[SEQ_ID_HEADER.toLowerCase()] = requestId

  // const redirectUri =
  //   req.headers[REDIRECT_URI_HEADER.toLowerCase()] ||
  //   req.headers.origin ||
  //   oauth2Config.redirect_uri
  // httpContext.set(REDIRECT_URI_HEADER, redirectUri)

  if (isLocal) {
    res.setHeader('Access-Control-Allow-Origin', req.headers?.origin ?? '')
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
    )
  }

  appLogger.info(`http req: ${req.url}`)

  // TODO: 绑定事件，没有解绑会导致内存泄漏？
  // res.on('finish', ()=>{
  //   appLogger.info(`http resp: ${req.url}`, {
  //     reqId: requestId
  //   })
  // })

  // finish 后会 close
  // res.on('close', ()=>{
  //   appLogger.error(`response close`, {
  //     reqId: requestId
  //   })
  // })

  // res.on('error', ()=>{
  //   appLogger.error(`response error`, {
  //     reqId: requestId
  //   })
  // })

  next()
}
