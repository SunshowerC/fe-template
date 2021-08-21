

export enum CaseFormat {
  NotTransform = 1,
  CamelCase = 2,
  SnakeCase = 3
}

export const CustomFormatKey = '_CUSTOM_FORMAT_KEY'


export const REQ_TRANSFORM = {
  case: CaseFormat.NotTransform 
}

export const RESP_TRANSFORM = {
  case: CaseFormat.NotTransform
}

export const SQL_TRANSFORM = {
  
}
