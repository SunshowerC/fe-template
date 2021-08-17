
import appRoot from 'app-root-path'
import { resolve } from 'path'
import pkgJson from '../../package.json'


export const appVersion = pkgJson.version


export const apiPrefix = '/api'

export const env = process.env.ENV
export const isLive = env === 'live'
export const isLocal = process.env.NODE_ENV === 'development' || process.env.ENV === 'local'

export const rootPath = appRoot.toString()


export const logPath =
  process.env.LOG_PATH?.startsWith('/') ?
  process.env.LOG_PATH :
  resolve(rootPath, process.env.LOG_PATH || './logs') 