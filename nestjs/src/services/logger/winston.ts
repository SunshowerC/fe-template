
// <date> - [log level][request-id] - <file name|module> <message> <extra data>

import {format, transports, createLogger} from 'winston'
import dayjs from 'dayjs'
import { isLocal, logPath } from 'src/config'
import { FileTransportOptions } from 'winston/lib/winston/transports'
import DailyRotateFile from 'winston-daily-rotate-file'

const formatConf = [
  format.timestamp({
    // format: 'YYYY-MM-DD HH:mm:ss'
    format: (() => {
      return dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS(ZZ)')
      }) 
  }),
  // isLocal ? format.colorize() : null,
  format.printf((infoObj) => {

    const { timestamp, message, level, module, reqId, ...extra } = infoObj
    const moduleStr =  module ? `[${module}]` : ''
    return `${timestamp} - [${level}]${moduleStr}[${reqId}] - ${message} ${JSON.stringify(extra)}`
  
  })
].filter(Boolean) as any[]

const opt = {
  datePattern: 'YYYY-MM-DD',
  dirname: logPath,
  maxFiles: 14
}

const levels = ['error', 'warn', 'info', 'debug']

const rotateTransports = levels.map((level) => {
  const symLinkOpt =
    level === 'debug'
      ? {
          createSymlink: true,
          symlinkName: 'all.log'
        }
      : {}

  return new DailyRotateFile({
    filename: `${level}.log.%DATE%`,
    level,
    ...opt,
    ...symLinkOpt
  })
})

const logger = createLogger({
  level: 'debug',
  format:  format.combine(
    ...formatConf
  ),
  transports: [
    ...rotateTransports
    
  ],
  // 如果是本地环境，抛出打印出错误信息。否则会被Winston 捕获并日志
  exceptionHandlers:  undefined  // : [rotateTransports[0]]
})

logger.add(
  new transports.Console({
  })
)

export const winsonLogger = logger