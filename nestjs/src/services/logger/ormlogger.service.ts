import { resolve } from 'path'
import { createLogger, format } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { Logger } from 'typeorm'
import { LoggerOptions } from 'typeorm/logger/LoggerOptions'
import { appLogger } from './app-logger.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OrmLogger implements Logger {
  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(private options?: LoggerOptions) {}

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  /**
   * Logs query and parameters used in it.
   * 日志触发是查询前，结果还未响应就开始记录。
   * 所以基本可以简单认为 resp 日志时间 - sql 日志时间即为 sql 查询时间
   */
  // logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
  logQuery(query: string, parameters?: any[]) {
    if (
      this.options === 'all' ||
      this.options === true ||
      (this.options instanceof Array && this.options.indexOf('query') !== -1)
    ) {
      // 如果 sql 日志太 tm 长了，就忽略掉中间一部分。
      if (query.length > 10000) {
        query = `${query.slice(0, 1000)} ...... ${query.slice(-1000)}`
      }
      const sql =
        query +
        (parameters && parameters.length
          ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}`
          : '')
      this.write(`[QUERY]: ${sql}`)
    }
  }

  /**
   * Logs query that is failed.
   */
  logQueryError(error: string, query: string, parameters?: any[]) {
    if (
      this.options === 'all' ||
      this.options === true ||
      (this.options instanceof Array && this.options.indexOf('error') !== -1)
    ) {
      const sql =
        query +
        (parameters && parameters.length
          ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}`
          : '')

      appLogger.error(`[FAILED QUERY]: ${sql}`, {
        error
      })
    }
  }

  /**
   * Logs query that is slow.
   * TODO: 为什么 logQuerySlow 没有 httpContext ??
   */
  logQuerySlow(time: number, query: string, parameters?: any[]) {
    const sql =
      query +
      (parameters && parameters.length ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}` : '')

    appLogger.error(`[SLOW SQL QUERY]: ${sql}`, {
      costTime: time
    })
  }

  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message: string) {
    if (
      this.options === 'all' ||
      (this.options instanceof Array && this.options.indexOf('schema') !== -1)
    ) {
      this.write(message)
    }
  }

  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string) {
    this.write(message)
  }

  /**
   * Perform logging using given logger, or by default to the console.
   * Log has its own level and message.
   */
  log(level: 'log' | 'info' | 'warn', message: any) {
    switch (level) {
      case 'log':
        if (
          this.options === 'all' ||
          (this.options instanceof Array && this.options.indexOf('log') !== -1)
        )
          this.write(`[LOG]: ${message}`)
        break
      case 'info':
        if (
          this.options === 'all' ||
          (this.options instanceof Array && this.options.indexOf('info') !== -1)
        )
          this.write(`[INFO]: ${message}`)
        break
      case 'warn':
        if (
          this.options === 'all' ||
          (this.options instanceof Array && this.options.indexOf('warn') !== -1)
        )
          this.write(`[WARN]: ${message}`)
        break
      default:
        this.write(`[Unknown]: ${message}`)
    }
  }

  // -------------------------------------------------------------------------
  // Protected Methods
  // -------------------------------------------------------------------------

  /**
   * Writes given strings into the log file.
   */
  protected write(strings: string | string[]) {
    strings = strings instanceof Array ? strings : [strings]

    appLogger.info(`${strings.join('\r\n')}\r\n`)
  }

  /**
   * Converts parameters to a string.
   * Sometimes parameters can have circular objects and therefor we are handle this case too.
   */
  protected stringifyParams(parameters: any[]) {
    try {
      return JSON.stringify(parameters)
    } catch (error) {
      // most probably circular objects in parameters
      return parameters
    }
  }
}
