import { Injectable, LoggerService } from "@nestjs/common";
import { winsonLogger } from "./winston";
import httpContext from 'express-http-context'
import { PROFILE_HEADER, SEQ_ID_HEADER } from "src/config/header";

/**
 * 设置基础信息, seqId, operator
 */
export const getBaseInfo = (extra: any = {}) => {
  const reqId = httpContext.get(SEQ_ID_HEADER) || 'non-req-scope'
  const profile = httpContext.get(PROFILE_HEADER) || {
    operator: 'system'
  }

  if(typeof extra === 'string') {
    extra = {
      module: extra
    }
  }

  return Object.assign({}, extra , {
    reqId,
    operator: profile.email
  })
}


@Injectable()
export class AppLogger implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: any, extra: any = {}) {
    // nest 默认格式是：
    // [Nest] <process id> - <date time> <log level> [<optionalParams[0]>] <message> 。例如
    // [Nest] 33326  - 2021-08-12 10:05:12 ├F10: PM┤     LOG [InstanceLoader] AppModule dependencies initialized +30ms
    // console.log('log', message, optionalParams)
    
    const extraData = getBaseInfo(extra)
    
    winsonLogger.info(message, extraData)
  }


  debug(msg: any, extra?: any) {
    const extraData = getBaseInfo(extra)

    winsonLogger.debug(msg, extraData)
  }

  info(msg: any, extra?: any) {
    const extraData = getBaseInfo(extra)

    winsonLogger.info(msg, extraData)
  }

  error(msg: any, extra?: any) {
    const extraData = getBaseInfo(extra)

    winsonLogger.error(msg, extraData)

    // Sentry.captureMessage(msg, {
    //   level: Sentry.Severity.Warning,
    //   extra: extraData,
    //   user: {
    //     email: extraData?.operator
    //   }
    // })
  }

  warn(msg: any, extra?: any) {
    const extraData = getBaseInfo(extra)
    winsonLogger.warn(msg, extraData)
    // if(sentry) {
    // Sentry.captureMessage(msg, {
    //   level: Sentry.Severity.Warning,
    //   extra: extraData,
    //   user: {
    //     email: extraData?.operator
    //   }
    // })
    // }
  }

  /**
   * Write a 'verbose' level log.
   */
  // verbose?(message: any, extra: any) {}
} 

export const appLogger = new AppLogger()