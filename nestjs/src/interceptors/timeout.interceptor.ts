import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Request } from 'express'
import { timeout,map } from 'rxjs/operators'
import { isLocal } from 'src/config'
import { appLogger } from 'src/services/logger/app-logger.service'

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest<Request>()
    const timeoutValue = req.headers.timeout ? +req.headers.timeout : 20 * 1000
    // 开发环境下，不设置 timeout，以方便断点调试

    
    if (isLocal) {
      return next.handle()
    }
    return next.handle().pipe(timeout(timeoutValue))
  }
}
