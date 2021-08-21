import 'src/services/logger/log-outgoing-req'
import httpContext from 'express-http-context'
import { INestApplication } from '@nestjs/common'
import { addRequestId } from '../middlewares/request-id.middleware'
import { TimeoutInterceptor } from 'src/interceptors/timeout.interceptor'
import bodyParser from 'body-parser'
import { CaseFormatMiddleware } from 'src/middlewares/case-format.middleware'

export const appConfigure = (app: INestApplication)=>{
  
  // @important 必须要 有 bodyParse, 否则 httpContext 会有问题
  app.use(
    bodyParser.json({
      limit: '100mb'
    })
  )
  app.use(
    bodyParser.urlencoded({
      limit: '20mb'
    })
  )

  app.use(httpContext.middleware)

  app.use(addRequestId, CaseFormatMiddleware)
  app.useGlobalInterceptors(new TimeoutInterceptor())
}

