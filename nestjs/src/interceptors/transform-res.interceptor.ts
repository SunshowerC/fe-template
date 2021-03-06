import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { appLogger } from 'src/services/logger/app-logger.service'
import { appVersion } from 'src/config'
import { ServerResponse } from 'http'
import { APP_VERSION_HEADER } from 'src/config/header'

export const transformResp = (respObj: any) => {

  appLogger.info('respons end')
  // 没有必要将 header 响应（如果有）
  if (respObj && respObj.header) {
    delete respObj.header
  }
  if (respObj && (respObj.code || respObj.code === 0)) {
    return respObj
  }
  return {
    code: 0,
    msg: 'ok',
    result: respObj
  }
}

@Injectable()
export class TransformRespInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response: ServerResponse = context.switchToHttp().getResponse()

    response.setHeader(APP_VERSION_HEADER, appVersion)


    return next.handle().pipe(map(transformResp))
  }
}
