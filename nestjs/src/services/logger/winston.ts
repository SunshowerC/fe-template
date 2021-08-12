
// <date> - [log level][request-id] - <file name|module> <message> <extra data>

import {format, transports, createLogger} from 'winston'
import dayjs from 'dayjs'
import { isLocal } from 'src/config'
import { FileTransportOptions } from 'winston/lib/winston/transports'

const formatConf = [
  format.timestamp({
    // format: 'YYYY-MM-DD HH:mm:ss'
    format: (() => {
      return dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS(ZZ)')
      }) 
  }),
  isLocal ? format.colorize() : null,
  format.printf((infoObj) => {

    const { timestamp, message, level, module, reqId, ...extra } = infoObj
    const moduleStr =  module ? `[${module}]` : ''
    return `${timestamp} - [${level}]${moduleStr}[${reqId}] - ${message} ${JSON.stringify(extra)}`
  
  })
].filter(Boolean) as any[]

// TODO: rotate log
const logFileConf: FileTransportOptions = {
  rotationFormat: ()=>{
    return '.' + dayjs().format('YYYY-MM-DD')
  } ,
  maxsize: 7,
}

const logger = createLogger({
  level: 'debug',
  format:  format.combine(
    ...formatConf
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error', ...logFileConf }),
    new transports.File({ filename: 'logs/warn.log', level: 'warn', ...logFileConf }),
    new transports.File({ filename: 'logs/all.log', ...logFileConf }),
  ],
  // 如果是本地环境，抛出打印出错误信息。否则会被Winston 捕获并日志
  exceptionHandlers:  undefined  // : [rotateTransports[0]]
})

logger.add(
  new transports.Console({
  })
)

export const winsonLogger = logger